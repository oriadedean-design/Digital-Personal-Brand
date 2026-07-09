// Sends next/image's width/quality negotiation straight to Sanity's own CDN
// image transform params, instead of letting Next re-encode an already
// Sanity-optimized image a second time.
export default function sanityImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const url = new URL(src);
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality || 80));
  url.searchParams.set('auto', 'format');
  return url.toString();
}
