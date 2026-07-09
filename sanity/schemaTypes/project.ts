import { defineField, defineType } from 'sanity';
import { PROJECT_CATEGORIES } from '../../src/lib/categories';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
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
        list: PROJECT_CATEGORIES.map((c) => ({ title: c, value: c })),
      },
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
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
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Photo', value: 'photo' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'photo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Vimeo or YouTube URL. Required when Media Type is Video.',
      hidden: ({ document }) => document?.mediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as { mediaType?: string } | undefined;
          if (doc?.mediaType === 'video' && !value) return 'Required when Media Type is Video';
          return true;
        }),
    }),
    defineField({
      name: 'videoThumbnail',
      title: 'Video Thumbnail',
      type: 'image',
      options: { hotspot: true },
      description: 'Facade thumbnail shown before the video embed loads.',
      hidden: ({ document }) => document?.mediaType !== 'video',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
        },
      ],
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
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
});
