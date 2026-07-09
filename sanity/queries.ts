import { urlFor } from './client';
import type { Project, StrategyItem, JournalEntry, Brand, AboutData, HomeData, PageMeta, CMSImage } from '../src/types';

// GROQ fragment appended to image fields so we can size next/image correctly
// (avoids layout shift) without a second round-trip for asset metadata.
const DIMS = '{..., "dims": asset->metadata.dimensions}';

// ─── Query Strings ────────────────────────────────────────────────────────────

export const HOME_QUERY = `*[_type == "siteConfig"][0].home{
  intro, subtext, ctaText, heroImage${DIMS}
}`;
export const WORK_META_QUERY = `*[_type == "siteConfig"][0].work`;
export const STRATEGY_META_QUERY = `*[_type == "siteConfig"][0].strategy`;
export const VENTURES_META_QUERY = `*[_type == "siteConfig"][0].ventures`;
export const ABOUT_META_QUERY = `*[_type == "siteConfig"][0].about{
  ..., portraitImage${DIMS}
}`;
export const SOCIAL_LINKS_QUERY = `*[_type == "siteConfig"][0].socialLinks`;

export const PROJECTS_QUERY = `*[_type == "project"] | order(year desc) {
  _id, title, slug, category, year, client, description,
  thumbnail${DIMS}, gallery[]${DIMS}, seoTitle, seoDescription, tags,
  discipline, metadataCamera, metadataLocation, pullQuote, body,
  mediaType, videoUrl, videoThumbnail${DIMS}
}`;

export const PROJECT_SLUGS_QUERY = `*[_type == "project"].slug.current`;

export const JOURNAL_LIST_QUERY = `*[_type == "journal" && published == true] | order(date desc) {
  _id, title, slug, date, category, excerpt, estimatedReadingTime
}`;

export const JOURNAL_POST_QUERY = `*[_type == "journal" && slug.current == $slug][0] {
  _id, title, slug, date, category, excerpt, body, coverImage${DIMS}, estimatedReadingTime, published, seoTitle, seoDescription
}`;

export const JOURNAL_SLUGS_QUERY = `*[_type == "journal" && published == true].slug.current`;

export const BRANDS_QUERY = `*[_type == "brand"] | order(_createdAt asc) {
  _id, name, slug, tagline, founded, role, description, accomplishments,
  gallery[]${DIMS}, instagramUrl, pressLinks, logo${DIMS}
}`;

export const BRAND_QUERY = `*[_type == "brand" && slug.current == $slug][0] {
  _id, name, slug, tagline, founded, role, description, accomplishments,
  gallery[]${DIMS}, instagramUrl, pressLinks, logo${DIMS}
}`;

export const STRATEGY_QUERY = `*[_type == "strategy"] | order(_createdAt asc) {
  _id, company, slug, role, period, stat, description, image${DIMS}, challenge, solution, result
}`;

export const STRATEGY_SLUGS_QUERY = `*[_type == "strategy"].slug.current`;

export const PHOTOGRAPHS_QUERY = `*[_type == "photograph"] | order(year desc) {
  _id, title, slug, image${DIMS}, category, caption, camera, lens, location, year, tags
}`;

// ─── Image helper ──────────────────────────────────────────────────────────────

// Used only when an image has no real alt text yet in Sanity, so search
// engines and AI crawlers can still tie the image back to Dean by name,
// role, and location instead of getting nothing.
const PERSON_BRAND = 'Dean Oriade, a Toronto-based filmmaker and photographer';

function toCMSImage(source: any, targetWidth: number, fallbackAlt: string): CMSImage {
  const aspectRatio = source?.dims?.aspectRatio;
  const width = targetWidth;
  const height = aspectRatio ? Math.round(targetWidth / aspectRatio) : targetWidth;
  return {
    url: urlFor(source).width(width).format('webp').quality(80).url(),
    alt: source.alt ?? fallbackAlt,
    width,
    height,
  };
}

// ─── Transformers (raw Sanity doc → app type) ─────────────────────────────────

export function toProject(p: any): Project {
  return {
    id: p._id,
    slug: p.slug?.current ?? p._id,
    title: p.title,
    category: p.category,
    year: p.year,
    client: p.client,
    description: p.description,
    thumbnail: p.thumbnail
      ? toCMSImage(p.thumbnail, 800, `${p.title}, photographed by ${PERSON_BRAND}`)
      : { url: '', alt: '' },
    gallery: (p.gallery ?? [])
      .filter((g: any) => g?.asset)
      .map((g: any) => toCMSImage(g, 1200, `${p.title}, photographed by ${PERSON_BRAND}`)),
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
    tags: p.tags,
    discipline: p.discipline,
    metadataCamera: p.metadataCamera,
    metadataLocation: p.metadataLocation,
    pullQuote: p.pullQuote,
    body: p.body,
    mediaType: p.mediaType ?? 'photo',
    videoUrl: p.videoUrl,
    videoThumbnail: p.videoThumbnail
      ? toCMSImage(p.videoThumbnail, 1200, `${p.title}, a film by ${PERSON_BRAND}`)
      : undefined,
  };
}

export function toStrategyItem(s: any): StrategyItem {
  return {
    id: s._id,
    slug: s.slug?.current ?? s._id,
    company: s.company,
    role: s.role,
    period: s.period,
    stat: s.stat,
    description: s.description,
    image: s.image ? toCMSImage(s.image, 800, `${s.role} at ${s.company}, marketing work by ${PERSON_BRAND}`) : undefined,
    content: (s.challenge || s.solution || s.result) ? {
      challenge: s.challenge ?? '',
      solution: s.solution ?? '',
      result: s.result ?? '',
    } : undefined,
  };
}

export function toJournalEntry(j: any): JournalEntry {
  return {
    id: j._id,
    slug: j.slug?.current ?? j._id,
    title: j.title,
    date: j.date ?? '',
    category: j.category,
    excerpt: j.excerpt ?? '',
    body: j.body ?? [],
    estimatedReadingTime: j.estimatedReadingTime,
    coverImage: j.coverImage ? toCMSImage(j.coverImage, 1200, `${j.title}, journal entry by ${PERSON_BRAND}`) : undefined,
  };
}

export function toBrand(b: any): Brand {
  return {
    id: b._id,
    slug: b.slug?.current ?? b._id,
    name: b.name,
    tagline: b.tagline,
    founded: b.founded,
    role: b.role,
    description: b.description ?? [],
    accomplishments: b.accomplishments,
    gallery: (b.gallery ?? [])
      .filter((g: any) => g?.asset)
      .map((g: any) => toCMSImage(g, 1200, `${b.name}, founded by ${PERSON_BRAND}`)),
    instagramUrl: b.instagramUrl,
    pressLinks: b.pressLinks,
    logo: b.logo ? toCMSImage(b.logo, 400, `${b.name} logo`) : undefined,
  };
}

export function toAboutData(a: any): AboutData | null {
  if (!a) return null;
  return {
    heading: a.heading,
    subtitle: a.subtitle,
    location: a.location,
    portraitImage: a.portraitImage ? toCMSImage(a.portraitImage, 800, `Portrait of ${PERSON_BRAND}`) : undefined,
    narrative: a.narrative ?? [],
    gear: a.gear,
    education: a.education,
    skills: a.skills,
    bucketList: a.bucketList,
  };
}

export function toHomeData(h: any): HomeData | null {
  if (!h) return null;
  return {
    intro: h.intro ?? '',
    subtext: h.subtext ?? '',
    ctaText: h.ctaText,
    heroImage: h.heroImage ? toCMSImage(h.heroImage, 1600, PERSON_BRAND) : undefined,
  };
}

export function toPageMeta(m: any, fallback: PageMeta): PageMeta {
  if (!m) return fallback;
  return {
    title: m.title || fallback.title,
    caption: m.caption || fallback.caption,
    wink: m.wink,
  };
}
