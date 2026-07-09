import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

if (!projectId) {
  throw new Error(
    'NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Add it to .env.local (see .env.example).'
  );
}

export const client = createClient({
  projectId,
  dataset,
  useCdn: false, // Next.js ISR (revalidate: 3600) is the caching layer; avoid a second stale CDN cache
  apiVersion: '2024-03-23', // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export const REVALIDATE_SECONDS = 3600;

export function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  return client.fetch<T>(query, params, { next: { revalidate: REVALIDATE_SECONDS } });
}
