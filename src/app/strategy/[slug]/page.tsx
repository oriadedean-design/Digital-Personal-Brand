import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/client';
import { STRATEGY_QUERY, STRATEGY_SLUGS_QUERY, toStrategyItem } from '@/sanity/queries';
import { StrategyDetailView } from '../../../components/StrategyDetailView';
import { BreadcrumbListJsonLd } from '../../../components/JsonLd';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(STRATEGY_SLUGS_QUERY);
  return (slugs || []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rawItems = await sanityFetch<any[]>(STRATEGY_QUERY);
  const item = (rawItems || []).map(toStrategyItem).find((s) => s.slug === slug);
  if (!item) return {};

  const title = `${item.company} | Dean Oriade`;
  const description = item.description || `${item.role} at ${item.company}.`;

  return {
    title,
    description,
    alternates: { canonical: `/strategy/${item.slug}` },
    openGraph: {
      title,
      description,
      images: item.image?.url ? [{ url: item.image.url }] : undefined,
    },
  };
}

export default async function StrategyDetail({ params }: Props) {
  const { slug } = await params;
  const rawItems = await sanityFetch<any[]>(STRATEGY_QUERY);
  const item = (rawItems || []).map(toStrategyItem).find((s) => s.slug === slug);

  if (!item) notFound();

  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: 'Strategy', url: 'https://deanoriade.ca/strategy' },
          { name: item.company, url: `https://deanoriade.ca/strategy/${item.slug}` },
        ]}
      />
      <StrategyDetailView item={item} />
    </>
  );
}
