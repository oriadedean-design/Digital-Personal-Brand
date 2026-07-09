import { defineField, defineType } from 'sanity';

export const siteConfig = defineType({
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'home',
      title: 'Home Page',
      type: 'object',
      fields: [
        { name: 'intro', title: 'Intro Text', type: 'text' },
        { name: 'subtext', title: 'Subtext', type: 'string' },
        { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
        { name: 'ctaText', title: 'CTA Button Text', type: 'string', description: 'e.g. Initialize Archive' },
      ],
    }),
    defineField({
      name: 'about',
      title: 'About Page',
      type: 'object',
      fields: [
        { name: 'portraitImage', title: 'Portrait Image', type: 'image', options: { hotspot: true } },
        { name: 'narrative', title: 'Narrative Paragraphs', type: 'array', of: [{ type: 'text' }] },
        { 
          name: 'education', 
          title: 'Education', 
          type: 'array', 
          of: [
            {
              type: 'object',
              fields: [
                { name: 'school', type: 'string', title: 'School' },
                { name: 'degree', type: 'string', title: 'Degree' },
                { name: 'year', type: 'string', title: 'Year' }
              ]
            }
          ] 
        },
        {
          name: 'bucketList',
          title: 'Bucket List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'item', type: 'string', title: 'Item' },
                { name: 'completed', type: 'boolean', title: 'Completed' }
              ]
            }
          ]
        },
        { name: 'heading', title: 'Page Heading', type: 'string', description: 'e.g. Quiet Excellence.' },
        { name: 'subtitle', title: 'Role / Subtitle', type: 'string', description: 'e.g. Marketing Manager / Strategist' },
        { name: 'location', title: 'Location', type: 'string', description: 'e.g. Mississauga, Ontario' },
        {
          name: 'gear',
          title: 'Gear List',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'item', type: 'string', title: 'Item Name' },
              { name: 'detail', type: 'string', title: 'Detail / Role' },
            ],
          }],
        },
      ],
    }),
    defineField({
      name: 'work',
      title: 'Work Page',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'caption', title: 'Caption', type: 'string' },
        { name: 'wink', title: 'Wink Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'strategy',
      title: 'Strategy Page',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'caption', title: 'Caption', type: 'string' },
        { name: 'wink', title: 'Wink Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'ventures',
      title: 'Ventures Page',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'caption', title: 'Caption', type: 'string' },
        { name: 'wink', title: 'Wink Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Page',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'caption', title: 'Caption', type: 'string' },
        { name: 'wink', title: 'Wink Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram URL', type: 'url', initialValue: 'https://www.instagram.com/deanaldo.ca' },
        { name: 'twitter', title: 'X / Twitter URL', type: 'url', initialValue: 'https://x.com/deanaldoca' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url', initialValue: 'https://www.linkedin.com/in/semilore-oriade' },
        { name: 'behance', title: 'Behance URL', type: 'url', initialValue: 'https://www.behance.net/deanoriade' },
        { name: 'tiktok', title: 'TikTok URL', type: 'string', description: 'Placeholder: TIKTOK_URL — replace with real URL' },
      ],
    }),
  ],
});
