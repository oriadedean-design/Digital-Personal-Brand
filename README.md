# deanoriade.ca

Dean Oriade's personal portfolio: photography, film, and journal writing, built with Next.js (App Router) and Sanity CMS.

## Run locally

**Prerequisites:** Node.js, a Sanity project.

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
3. Run the app:
   `npm run dev`

## Content

All content is managed in Sanity Studio at `/studio`. See `DEPLOY_GUIDE.md` for deployment.

- `npm run ingest ./path/to/folder` — bulk-uploads photos as draft `photograph` documents, prefilled with EXIF metadata, for review before publishing.
- `npm run seed` — one-time script that pushes verified real content into Sanity (safe to re-run).
