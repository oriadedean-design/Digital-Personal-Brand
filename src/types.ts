import type { ProjectCategory } from './lib/categories';

export interface CMSImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  year: number;
  thumbnail: CMSImage;
  client?: string;
  description?: string;
  gallery: CMSImage[];
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  discipline?: string;
  metadataCamera?: string;
  metadataLocation?: string;
  pullQuote?: string;
  body?: any[];
  mediaType: 'photo' | 'video';
  videoUrl?: string;
  videoThumbnail?: CMSImage;
}

export interface StrategyItem {
  id: string;
  slug: string;
  role: string;
  company: string;
  period: string;
  stat?: string;
  description: string;
  image?: CMSImage;
  content?: {
    challenge: string;
    solution: string;
    result: string;
  };
}

export interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: any[]; // Portable Text blocks
  coverImage?: CMSImage;
  estimatedReadingTime?: number;
}

export interface Accomplishment {
  title: string;
  detail: string;
  year?: string;
}

export interface PressLink {
  label: string;
  url: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  founded?: string;
  role: string;
  description: any[]; // Portable Text blocks
  accomplishments?: Accomplishment[];
  gallery?: CMSImage[];
  instagramUrl?: string;
  pressLinks?: PressLink[];
  logo?: CMSImage;
}

export interface GearItem {
  item: string;
  detail: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  year: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface BucketListItem {
  item: string;
  completed: boolean;
}

export interface AboutData {
  heading?: string;
  subtitle?: string;
  location?: string;
  portraitImage?: CMSImage;
  narrative: string[];
  gear?: GearItem[];
  education?: EducationItem[];
  skills?: SkillCategory[];
  bucketList?: BucketListItem[];
}

export interface PageMeta {
  title: string;
  caption: string;
  wink?: string;
}

export interface HomeData {
  intro: string;
  subtext: string;
  heroImage?: CMSImage;
  ctaText?: string;
}

export type PageState = 'intro' | 'main';
