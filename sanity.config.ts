import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './sanity/schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

if (!projectId) {
  throw new Error(
    'NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Add it to .env.local (see .env.example).'
  );
}

export default defineConfig({
  name: 'deanaldo-archive',
  title: 'The Infinite Archive',

  projectId,
  dataset,
  basePath: '/studio',

  plugins: [structureTool(), media()],

  schema: {
    types: schemaTypes,
  },
});