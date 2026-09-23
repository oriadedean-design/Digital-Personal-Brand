export type ContactLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type LeadLink = {
  title: string;
  subtitle: string;
  href: string;
};

export type YouTubeVideo = {
  id: string;
  caption: string;
  role?: string;
};

export type InstagramReel = {
  code: string;
};

export type PortfolioSection = {
  id: string;
  heading: string;
  description: string;
  videos?: YouTubeVideo[];
  reels?: InstagramReel[];
};

export const hero = {
  label: 'Video and photo portfolio',
  name: 'Dean Oriade',
  intro:
    'Videographer and photographer in the Greater Toronto Area. Program recaps, social content, and interviews for arts, film, and community organizations.',
};

export const contactLinks: ContactLink[] = [
  { label: 'oriade.dean@gmail.com', href: 'mailto:oriade.dean@gmail.com' },
  { label: '437-766-8289', href: 'tel:+14377668289' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dean-oriade', external: true },
  { label: 'Behance', href: 'https://behance.net/deanoriade', external: true },
];

export const startHere = {
  heading: 'Start here',
  description: 'A collection of video and content samples.',
  links: [
    {
      title: 'Video and content samples',
      subtitle: 'Open on Canva',
      href: 'https://www.canva.com/design/DAGW8XkH73Y/oNJLZBIsqHjE7V2egE_VSw/view',
    },
  ] satisfies LeadLink[],
};

export const portfolioSections: PortfolioSection[] = [
  {
    id: 'oya',
    heading: 'OYA Black Arts Coalition',
    description:
      'Program recaps from OYA, where I implemented the video strategy and shot and edited the work myself.',
    videos: [
      { id: 'wFHL4U94xb8', caption: 'OYA Emerging Filmmakers, Year 5 (a Recap)' },
      { id: 'LPEMWxmy3qA', caption: 'Scale Up Immersive, Thank You for 3 Years' },
    ],
    reels: [{ code: 'CzCJHz_gQLY' }, { code: 'CwOXA5tAKSt' }],
  },
  {
    id: 'cfc',
    heading: 'Canadian Film Centre',
    description:
      "I led brand development and creative direction for Homecoming and the CFC Gala, and directed the video interviews for both events. Below that is short-form content posted on CFC's Instagram, @cfccreates.",
    videos: [
      { id: 'bqhhPXcS0nQ', caption: 'Event interviews', role: 'Directed' },
      { id: 'Q21-9j6ISAk', caption: 'CFC video', role: 'Directed, shot, and edited' },
      { id: '240svyf_Bk0', caption: 'CFC video', role: 'Directed' },
    ],
    reels: [{ code: 'DOcH4Q-kWra' }, { code: 'DLp0381A98z' }, { code: 'DLXuv6ptcrx' }, { code: 'C4QYPDsulVe' }],
  },
  {
    id: 'interviews',
    heading: 'Interviews',
    description: 'Interview videos.',
    videos: [
      { id: 'xQq7MNdhmX0', caption: 'Interview' },
      { id: 'SkfkFSfGpfA', caption: 'Interview' },
    ],
  },
];
