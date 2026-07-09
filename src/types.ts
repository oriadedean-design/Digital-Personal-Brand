
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
  category: string;
  year: number;
  thumbnail: CMSImage;
  client: string;
  description: string;
  gallery: CMSImage[];
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  discipline?: string;
  metadataCamera?: string;
  metadataLocation?: string;
  pullQuote?: string;
  body?: any[];
}

export interface StrategyItem {
  id: string;
  slug: string;
  role: string;
  company: string;
  period: string;
  stat: string;
  description: string;
  image: CMSImage;
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
  content: string; // In a real CMS, this might be a Rich Text object
  coverImage?: CMSImage;
}

export interface Venture {
  id: string;
  slug: string;
  name: string;
  role: string;
  description: string;
  image: CMSImage;
  link: string;
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

export interface SiteConfig {
  home: {
    intro: string;
    subtext: string;
    heroImage: CMSImage;
    ctaText?: string;
  };
  about: {
    portraitImage: CMSImage;
    narrative: string[];
    heading?: string;
    subtitle?: string;
    location?: string;
    gear?: { item: string; detail: string; }[];
    education?: { school: string; degree: string; year: string; }[];
    bucketList?: { item: string; completed: boolean; }[];
  };
  work: {
    title: string;
    caption: string;
    wink: string;
  };
  strategy: {
    title: string;
    caption: string;
    wink: string;
  };
  ventures: {
    title: string;
    caption: string;
    wink: string;
  };
  contact: {
    title: string;
    caption: string;
    wink: string;
  };
}

export type PageState = 'intro' | 'main';

export enum FilterCategory {
  ALL = 'All',
  ARCHITECTURE = 'Architecture',
  FACES = 'Faces',
  CLIENT = 'Client Work',
  FILM = 'Film'
}
