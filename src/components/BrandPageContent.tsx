import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/client';
import { BRAND_QUERY, toBrand } from '@/sanity/queries';
import { BrandDetail } from './BrandDetail';
import { OrganizationJsonLd } from './JsonLd';

export async function loadBrand(slug: string) {
  const raw = await sanityFetch<any>(BRAND_QUERY, { slug });
  return raw ? toBrand(raw) : null;
}

export async function BrandPageContent({ slug }: { slug: string }) {
  const brand = await loadBrand(slug);
  if (!brand) notFound();

  return (
    <>
      <OrganizationJsonLd brand={brand} url={`https://deanoriade.ca/${brand.slug}`} />
      <BrandDetail brand={brand} />
    </>
  );
}
