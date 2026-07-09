import type { Metadata } from 'next';
import { BrandPageContent, loadBrand } from '../../components/BrandPageContent';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const brand = await loadBrand('rosse');
  if (!brand) return {};

  const title = `${brand.name} | Dean Oriade`;
  const description = brand.tagline || `${brand.name}, founded by Dean Oriade as ${brand.role}.`;

  return {
    title,
    description,
    alternates: { canonical: '/rosse' },
    openGraph: { title, description },
  };
}

export default function RossePage() {
  return <BrandPageContent slug="rosse" />;
}
