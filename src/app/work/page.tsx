import type { Metadata } from 'next';
import { sanityFetch } from '@/sanity/client';
import { PROJECTS_QUERY, WORK_META_QUERY, toProject, toPageMeta } from '@/sanity/queries';
import { WorkGrid } from '../../components/WorkGrid';

export const revalidate = 3600;

const DEFAULT_META = { title: 'Photo Archive', caption: 'A curated collection of moments frozen in time.' };

export const metadata: Metadata = {
  title: 'Work | Dean Oriade',
  description: 'A photo and film archive by Dean Oriade, spanning architecture, portraits, and client work.',
  alternates: { canonical: '/work' },
};

export default async function Work() {
  const [rawProjects, rawMeta] = await Promise.all([
    sanityFetch<any[]>(PROJECTS_QUERY),
    sanityFetch<any>(WORK_META_QUERY),
  ]);

  const projects = (rawProjects || []).map(toProject);
  const meta = toPageMeta(rawMeta, DEFAULT_META);

  return <WorkGrid projects={projects} meta={meta} />;
}
