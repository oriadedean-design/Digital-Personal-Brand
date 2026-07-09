import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/client';
import { PROJECTS_QUERY, PROJECT_SLUGS_QUERY, JOURNAL_LIST_QUERY, toProject, toJournalEntry } from '@/sanity/queries';
import { ProjectDetailView } from '../../../../components/ProjectDetailView';
import { ProjectJsonLd, BreadcrumbListJsonLd } from '../../../../components/JsonLd';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(PROJECT_SLUGS_QUERY);
  return (slugs || []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rawProjects = await sanityFetch<any[]>(PROJECTS_QUERY);
  const project = (rawProjects || []).map(toProject).find((p) => p.slug === slug);
  if (!project) return {};

  const title = project.seoTitle || `${project.title} | Dean Oriade`;
  const description = project.seoDescription || project.description || `${project.title}, ${project.category} by Dean Oriade.`;

  return {
    title,
    description,
    alternates: { canonical: `/work/project/${project.slug}` },
    openGraph: {
      title,
      description,
      images: project.thumbnail.url ? [{ url: project.thumbnail.url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: project.thumbnail.url ? [project.thumbnail.url] : undefined,
    },
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const [rawProjects, rawJournal] = await Promise.all([
    sanityFetch<any[]>(PROJECTS_QUERY),
    sanityFetch<any[]>(JOURNAL_LIST_QUERY),
  ]);

  const projects = (rawProjects || []).map(toProject);
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects.length > 1 ? projects[(currentIndex + 1) % projects.length] : null;
  const journalEntries = (rawJournal || []).map(toJournalEntry);
  const relatedJournal = journalEntries[0] || null;

  return (
    <>
      <ProjectJsonLd project={project} />
      <BreadcrumbListJsonLd
        items={[
          { name: 'Work', url: 'https://deanoriade.ca/work' },
          { name: project.title, url: `https://deanoriade.ca/work/project/${project.slug}` },
        ]}
      />
      <ProjectDetailView project={project} nextProject={nextProject} relatedJournal={relatedJournal} />
    </>
  );
}
