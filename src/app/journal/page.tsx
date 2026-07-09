import type { Metadata } from 'next';
import { sanityFetch } from '@/sanity/client';
import { JOURNAL_LIST_QUERY, toJournalEntry } from '@/sanity/queries';
import { JournalList } from '../../components/JournalList';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Journal | Dean Oriade',
  description: 'Notes on photography, marketing strategy, and creative direction from Dean Oriade.',
  alternates: { canonical: '/journal' },
};

export default async function Journal() {
  const rawEntries = await sanityFetch<any[]>(JOURNAL_LIST_QUERY);
  const entries = (rawEntries || []).map(toJournalEntry);

  return <JournalList entries={entries} />;
}
