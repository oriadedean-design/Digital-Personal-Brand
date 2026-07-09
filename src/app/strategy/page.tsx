import type { Metadata } from 'next';
import { sanityFetch } from '@/sanity/client';
import { STRATEGY_QUERY, STRATEGY_META_QUERY, toStrategyItem, toPageMeta } from '@/sanity/queries';
import { StrategyRail } from '../../components/StrategyRail';

export const revalidate = 3600;

const DEFAULT_META = { title: 'Strategic Impact', caption: 'Connecting the dots between creativity and commerce.' };

export const metadata: Metadata = {
  title: 'Strategy | Dean Oriade',
  description: "Marketing strategy and video work by Dean Oriade, including the Canadian Film Centre, OYA Black Arts Coalition, and the University of Toronto Varsity Blues.",
  alternates: { canonical: '/strategy' },
};

export default async function Strategy() {
  const [rawItems, rawMeta] = await Promise.all([
    sanityFetch<any[]>(STRATEGY_QUERY),
    sanityFetch<any>(STRATEGY_META_QUERY),
  ]);

  const items = (rawItems || []).map(toStrategyItem);
  const meta = toPageMeta(rawMeta, DEFAULT_META);

  return <StrategyRail items={items} meta={meta} />;
}
