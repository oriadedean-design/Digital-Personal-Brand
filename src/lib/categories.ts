// Single source of truth for project categories, shared by the Sanity schema
// (sanity/schemaTypes/project.ts) and the frontend (filter UI, types).
// "All" is a frontend filter concept, never stored on a document.
export const PROJECT_CATEGORIES = ['Architecture', 'Faces', 'Client Work', 'Film'] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
