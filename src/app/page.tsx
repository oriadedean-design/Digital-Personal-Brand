import type { Metadata } from 'next';
import { sanityFetch } from '@/sanity/client';
import { HOME_QUERY, toHomeData } from '@/sanity/queries';
import { HomeHero } from '../components/HomeHero';
import { PersonJsonLd } from '../components/JsonLd';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Dean Oriade | Filmmaker & Photographer, Toronto',
  description: 'Photography and film by Dean Oriade, founder of Lotus Media and ROSSE Creative Collective, based in Toronto.',
  alternates: { canonical: '/' },
};

export default async function Home() {
  const rawHome = await sanityFetch<any>(HOME_QUERY);
  const homeData = toHomeData(rawHome);

  return (
    <>
      <PersonJsonLd />
      <HomeHero data={homeData} />
    </>
  );
}
