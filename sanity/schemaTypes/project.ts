import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title Override',
      type: 'string',
      description: 'Optional. Overrides the default title for SEO.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Optional. Used for meta description and social sharing.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'All', value: 'All' },
          { title: 'Architecture', value: 'Architecture' },
          { title: 'Faces', value: 'Faces' },
          { title: 'Client Work', value: 'Client Work' },
          { title: 'Film', value: 'Film' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'discipline',
      title: 'Discipline',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'metadataCamera',
      title: 'Camera Metadata',
      type: 'string',
      description: 'e.g. Canon R5 / 35mm',
    }),
    defineField({
      name: 'metadataLocation',
      title: 'Location Metadata',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description (Short)',
      type: 'text',
    }),
    defineField({
      name: 'pullQuote',
      title: 'Pull Quote',
      type: 'text',
      description: 'A highlighted quote for the project detail page.',
    }),
    defineField({
      name: 'body',
      title: 'Body (Rich Text)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'featuredImageAlt',
      title: 'Featured Image Alt Text',
      type: 'string',
      description: 'Alt text for the thumbnail, kept at root for easier access.',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }
          ]
        }
      ],
    }),
  ],
});
