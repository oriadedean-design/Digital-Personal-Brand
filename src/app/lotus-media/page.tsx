import type { Metadata } from 'next';
import { BrandPageContent, loadBrand } from '../../components/BrandPageContent';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const brand = await loadBrand('lotus-media');
  if (!brand) return {};

  const title = `${brand.name} | Dean Oriade`;
  const description = brand.tagline || `${brand.name}, led by Dean Oriade as ${brand.role}.`;

  return {
    title,
    description,
    alternates: { canonical: '/lotus-media' },
    openGraph: { title, description },
  };
}

export default function LotusMediaPage() {
  return <BrandPageContent slug="lotus-media" />;
}
