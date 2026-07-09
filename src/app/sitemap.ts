import type { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/client';
import { PROJECT_SLUGS_QUERY, STRATEGY_SLUGS_QUERY, JOURNAL_SLUGS_QUERY } from '@/sanity/queries';

const SITE_URL = 'https://deanoriade.ca';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, strategySlugs, journalSlugs] = await Promise.all([
    sanityFetch<string[]>(PROJECT_SLUGS_QUERY),
    sanityFetch<string[]>(STRATEGY_SLUGS_QUERY),
    sanityFetch<string[]>(JOURNAL_SLUGS_QUERY),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/work`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/strategy`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/ventures`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/lotus-media`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/rosse`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/journal`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = (projectSlugs || []).map((slug) => ({
    url: `${SITE_URL}/work/project/${slug}`,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const strategyRoutes: MetadataRoute.Sitemap = (strategySlugs || []).map((slug) => ({
    url: `${SITE_URL}/strategy/${slug}`,
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  const journalRoutes: MetadataRoute.Sitemap = (journalSlugs || []).map((slug) => ({
    url: `${SITE_URL}/journal/${slug}`,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...strategyRoutes, ...journalRoutes];
}
