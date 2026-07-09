import type { Metadata } from 'next';
import { sanityFetch } from '@/sanity/client';
import { ABOUT_META_QUERY, toAboutData } from '@/sanity/queries';
import { AboutContent } from '../../components/AboutContent';
import { ABOUT_FALLBACK } from '../../lib/aboutFallback';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'About | Dean Oriade',
  description: 'Dean Oriade is a Toronto-based marketing strategist, filmmaker, and photographer, and the founder of Lotus Media and ROSSE Creative Collective.',
  alternates: { canonical: '/about' },
};

export default async function About() {
  const rawAbout = await sanityFetch<any>(ABOUT_META_QUERY);
  const aboutData = toAboutData(rawAbout) || ABOUT_FALLBACK;

  return <AboutContent data={aboutData} />;
}
