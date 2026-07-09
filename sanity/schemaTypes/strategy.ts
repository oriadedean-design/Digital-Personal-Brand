import { defineField, defineType } from 'sanity';

export const strategy = defineType({
  name: 'strategy',
  title: 'Strategy',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'company',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'e.g. 2022 – 2024',
    }),
    defineField({
      name: 'stat',
      title: 'Headline Stat',
      type: 'string',
      description: 'e.g. +240% organic growth',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
    }),
    defineField({
      name: 'result',
      title: 'Result',
      type: 'text',
    }),
  ],
});
