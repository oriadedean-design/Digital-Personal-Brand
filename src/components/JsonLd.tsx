import type { Brand, JournalEntry, Project } from '../types';

const SITE_URL = 'https://deanoriade.ca';

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PersonJsonLd() {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Dean Oriade',
        url: SITE_URL,
        jobTitle: 'Filmmaker & Photographer',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'York University',
        },
        award: ['Canon Canada Top 20 Creator 2023', 'Canon Canada Top 20 Creator 2024'],
        sameAs: [
          'https://www.instagram.com/deanaldo.ca',
          'https://x.com/deanaldoca',
          'https://www.linkedin.com/in/semilore-oriade',
          'https://www.behance.net/deanoriade',
          'https://www.instagram.com/chooselotusmedia/',
          'https://www.instagram.com/rosse.hub/',
        ],
      }}
    />
  );
}

export function OrganizationJsonLd({ brand, url }: { brand: Brand; url: string }) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: brand.name,
        url,
        founder: { '@type': 'Person', name: 'Dean Oriade' },
        foundingDate: brand.founded,
        location: { '@type': 'Place', name: 'Toronto, Canada' },
        sameAs: brand.instagramUrl ? [brand.instagramUrl] : undefined,
        logo: brand.logo?.url,
      }}
    />
  );
}

export function BreadcrumbListJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function ArticleJsonLd({ entry }: { entry: JournalEntry }) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: entry.title,
        description: entry.excerpt,
        datePublished: entry.date,
        author: { '@type': 'Person', name: 'Dean Oriade' },
        image: entry.coverImage?.url,
        mainEntityOfPage: `${SITE_URL}/journal/${entry.slug}`,
      }}
    />
  );
}

export function ProjectJsonLd({ project }: { project: Project }) {
  const url = `${SITE_URL}/work/project/${project.slug}`;

  if (project.mediaType === 'video' && project.videoUrl) {
    return (
      <Script
        data={{
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: project.title,
          description: project.description || project.seoDescription,
          thumbnailUrl: project.videoThumbnail?.url || project.thumbnail.url,
          uploadDate: `${project.year}-01-01`,
          embedUrl: project.videoUrl,
        }}
      />
    );
  }

  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description || project.seoDescription,
        creator: { '@type': 'Person', name: 'Dean Oriade' },
        dateCreated: `${project.year}`,
        image: project.thumbnail.url,
        url,
      }}
    />
  );
}
