import { defineField, defineType } from 'sanity';

export const photograph = defineType({
  name: 'photograph',
  title: 'Photograph',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        { name: 'alt', type: 'string', title: 'Alternative Text' },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Personal', value: 'Personal' },
          { title: 'Professional', value: 'Professional' },
          { title: 'Black & White', value: 'Black & White' },
          { title: 'Film', value: 'Film' },
          { title: 'People', value: 'People' },
          { title: 'Travel', value: 'Travel' },
          { title: 'Experiments', value: 'Experiments' },
        ],
      },
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
    }),
    defineField({
      name: 'camera',
      title: 'Camera',
      type: 'string',
      description: 'e.g. Canon EOS R5',
    }),
    defineField({
      name: 'lens',
      title: 'Lens',
      type: 'string',
      description: 'e.g. 35mm f/1.4',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
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
  ],
});
