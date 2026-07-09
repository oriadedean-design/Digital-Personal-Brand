import { urlFor } from './client';
import type { Project, StrategyItem, JournalEntry, Venture } from '../src/types';

// ─── Query Strings ────────────────────────────────────────────────────────────

export const HOME_QUERY = `*[_type == "siteConfig"][0].home`;
export const WORK_META_QUERY = `*[_type == "siteConfig"][0].work`;
export const STRATEGY_META_QUERY = `*[_type == "siteConfig"][0].strategy`;
export const VENTURES_META_QUERY = `*[_type == "siteConfig"][0].ventures`;
export const ABOUT_META_QUERY = `*[_type == "siteConfig"][0].about`;
export const SOCIAL_LINKS_QUERY = `*[_type == "siteConfig"][0].socialLinks`;

export const PROJECTS_QUERY = `*[_type == "project"] | order(year desc) {
  _id, title, slug, category, year, client, description,
  thumbnail, gallery, seoTitle, seoDescription, tags,
  discipline, metadataCamera, metadataLocation, pullQuote, body
}`;

export const JOURNAL_QUERY = `*[_type == "journal"] | order(date desc) {
  _id, title, slug, date, category, excerpt, body, coverImage, estimatedReadingTime, published
}`;

export const JOURNAL_LIST_QUERY = `*[_type == "journal" && published == true] | order(date desc) {
  _id, title, slug, date, category, excerpt, estimatedReadingTime
}`;

export const JOURNAL_POST_QUERY = `*[_type == "journal" && slug.current == $slug][0] {
  _id, title, slug, date, category, excerpt, body, coverImage, estimatedReadingTime, published
}`;

export const VENTURES_QUERY = `*[_type == "venture"] | order(_createdAt asc) {
  _id, name, slug, role, description, heroImage, link
}`;

export const STRATEGY_QUERY = `*[_type == "strategy"] | order(_createdAt asc) {
  _id, company, slug, role, period, stat, description, image, challenge, solution, result
}`;

export const PHOTOGRAPHS_QUERY = `*[_type == "photograph"] | order(year desc) {
  _id, title, slug, image, category, caption, camera, lens, location, year, tags
}`;

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
      ? { url: urlFor(p.thumbnail).width(800).format('webp').quality(80).url(), alt: p.thumbnail.alt ?? p.title }
      : { url: '', alt: '' },
    gallery: (p.gallery ?? []).map((g: any) => ({
      url: urlFor(g).width(1200).format('webp').quality(80).url(),
      alt: g.alt ?? '',
    })),
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
    tags: p.tags,
    discipline: p.discipline,
    metadataCamera: p.metadataCamera,
    metadataLocation: p.metadataLocation,
    pullQuote: p.pullQuote,
    body: p.body,
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
    image: s.image
      ? { url: urlFor(s.image).width(800).format('webp').quality(80).url(), alt: s.image.alt ?? s.company }
      : { url: '', alt: '' },
    content: (s.challenge || s.solution || s.result) ? {
      challenge: s.challenge ?? '',
      solution: s.solution ?? '',
      result: s.result ?? '',
    } : undefined,
  };
}

export function toJournalEntry(j: any): JournalEntry {
  // body is portable text blocks; content field on app type is string.
  // Extracts plain text so the existing drawer renders without changes.
  const bodyText: string =
    Array.isArray(j.body) && j.body.length > 0
      ? j.body
          .filter((b: any) => b._type === 'block')
          .map((b: any) => b.children?.map((c: any) => c.text).join('') ?? '')
          .join('\n\n')
      : j.excerpt ?? '';

  return {
    id: j._id,
    slug: j.slug?.current ?? j._id,
    title: j.title,
    date: j.date ?? '',
    category: j.category,
    excerpt: j.excerpt ?? '',
    content: bodyText,
    coverImage: j.coverImage
      ? { url: urlFor(j.coverImage).width(1200).format('webp').quality(80).url(), alt: j.coverImage.alt ?? j.title }
      : undefined,
  };
}

export function toVenture(v: any): Venture {
  return {
    id: v._id,
    slug: v.slug?.current ?? v._id,
    name: v.name,
    role: v.role,
    description: v.description,
    image: v.heroImage
      ? { url: urlFor(v.heroImage).width(1200).format('webp').quality(80).url(), alt: v.heroImage.alt ?? v.name }
      : { url: '', alt: '' },
    link: v.link ?? '',
  };
}
