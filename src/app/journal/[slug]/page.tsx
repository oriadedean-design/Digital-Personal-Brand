import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { sanityFetch } from '@/sanity/client';
import { JOURNAL_POST_QUERY, JOURNAL_SLUGS_QUERY, toJournalEntry } from '@/sanity/queries';
import { ArticleJsonLd, BreadcrumbListJsonLd } from '../../../components/JsonLd';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(JOURNAL_SLUGS_QUERY);
  return (slugs || []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const raw = await sanityFetch<any>(JOURNAL_POST_QUERY, { slug });
  if (!raw) return {};
  const entry = toJournalEntry(raw);

  const title = raw.seoTitle || `${entry.title} | Dean Oriade`;
  const description = raw.seoDescription || entry.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/journal/${entry.slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: entry.date,
      images: entry.coverImage ? [{ url: entry.coverImage.url }] : undefined,
    },
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const raw = await sanityFetch<any>(JOURNAL_POST_QUERY, { slug });

  if (!raw || raw.published === false) notFound();
  const entry = toJournalEntry(raw);

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-0 pt-8 md:pt-16 pb-28 md:pb-24 animate-fade-in">
      <ArticleJsonLd entry={entry} />
      <BreadcrumbListJsonLd
        items={[
          { name: 'Journal', url: 'https://deanoriade.ca/journal' },
          { name: entry.title, url: `https://deanoriade.ca/journal/${entry.slug}` },
        ]}
      />

      <Link
        href="/journal"
        className="inline-flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase tracking-widest hover:text-neutral-300 transition-colors mb-10 md:mb-14"
      >
        ← Journal
      </Link>

      <header className="mb-10 md:mb-14">
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
          {entry.category}
        </span>
        <h1 className="font-serif text-3xl md:text-5xl mt-3 mb-6 leading-tight">
          {entry.title}
        </h1>
        <div className="flex items-center gap-3 pb-8 border-b border-white/10">
          <span className="font-mono text-xs text-neutral-500">{entry.date}</span>
          {entry.estimatedReadingTime && (
            <span className="font-mono text-xs text-neutral-600">· {entry.estimatedReadingTime} min read</span>
          )}
        </div>
      </header>

      {entry.coverImage && (
        <div className="mb-10 md:mb-14 rounded-lg overflow-hidden">
          <Image
            src={entry.coverImage.url}
            alt={entry.coverImage.alt}
            width={entry.coverImage.width || 1200}
            height={entry.coverImage.height || 800}
            sizes="(max-width: 768px) 100vw, 672px"
            className="w-full h-auto"
          />
        </div>
      )}

      <div className="prose prose-invert prose-base md:prose-lg font-serif leading-relaxed text-neutral-300 max-w-none">
        {entry.body && entry.body.length > 0 ? (
          <PortableText value={entry.body} />
        ) : (
          <p>{entry.excerpt}</p>
        )}
      </div>
    </div>
  );
}
