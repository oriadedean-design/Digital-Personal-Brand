import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { sanityFetch } from '@/sanity/client';
import { BRANDS_QUERY, VENTURES_META_QUERY, toBrand, toPageMeta } from '@/sanity/queries';

export const revalidate = 3600;

const DEFAULT_META = { title: 'The Ventures', caption: 'Building brands, not just projects.' };

export const metadata: Metadata = {
  title: 'Ventures | Dean Oriade',
  description: 'Lotus Media and ROSSE Creative Collective, the two creative brands founded by Dean Oriade.',
  alternates: { canonical: '/ventures' },
};

export default async function Ventures() {
  const [rawBrands, rawMeta] = await Promise.all([
    sanityFetch<any[]>(BRANDS_QUERY),
    sanityFetch<any>(VENTURES_META_QUERY),
  ]);

  const brands = (rawBrands || []).map(toBrand);
  const meta = toPageMeta(rawMeta, DEFAULT_META);

  return (
    <div className="flex flex-col px-4 md:px-0 pt-6 md:pt-0 pb-28 md:pb-0 md:h-[85vh]">
      <div className="mb-6 text-center md:text-left">
        <h1 className="font-serif text-4xl md:text-6xl mb-2">{meta.title}</h1>
        <p className="text-neutral-500 font-mono text-xs uppercase">{meta.caption}</p>
      </div>

      {brands.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-neutral-600 font-mono text-xs uppercase tracking-widest">
          Ventures coming soon.
        </div>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-8">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/${brand.slug}`}
              className="relative flex-1 min-h-[60vw] md:min-h-0 group overflow-hidden rounded-2xl border border-white/5 bg-neutral-900"
            >
              {brand.gallery && brand.gallery[0] && (
                <Image
                  src={brand.gallery[0].url}
                  alt={brand.gallery[0].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90" />

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end items-start">
                <h2 className="font-serif text-3xl md:text-6xl mb-2">{brand.name}</h2>
                <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-3">{brand.role}</p>
                {brand.tagline && (
                  <p className="text-neutral-300 max-w-md mb-5 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                    {brand.tagline}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {meta.wink && (
        <p className="text-center mt-6 text-xs text-neutral-700 italic">{meta.wink}</p>
      )}
    </div>
  );
}
