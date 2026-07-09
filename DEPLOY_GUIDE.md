# Deployment Guide: deanoriade.ca

This project is built with **Next.js (App Router)** and connected to **Sanity CMS**. Follow these steps to deploy to Vercel.

## 1. Environment Variables (Vercel)

Before deploying, go to your Vercel Project Settings > **Environment Variables** and add the following keys. These connect the frontend to the CMS.

| Key | Value Description |
| :--- | :--- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity Project ID (Found in Sanity Manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` |
| `SANITY_WRITE_TOKEN` | Editor-role API token, only needed if running `npm run ingest` or `npm run seed` from CI. Not required for the site to build or run. |

**Important:** If you fail to add the two `NEXT_PUBLIC_*` keys, the build will fail (see `sanity/client.ts`), by design, so missing content is never silently served.

## 2. Sanity CORS Configuration

For the Studio (`/studio`) and any client-side Sanity requests to work, whitelist your Vercel URL.

1. Go to [manage.sanity.io](https://manage.sanity.io).
2. Select your project.
3. Go to **API** > **CORS Origins**.
4. Click **Add CORS Origin**.
5. Add your Vercel domain (e.g., `https://deanoriade.ca`).
6. Save.

## 3. Deployment Commands

Stage your changes, commit, and push to your GitHub repository. Vercel will detect the push and auto-deploy.

```bash
# 1. Stage all files
git add .

# 2. Commit changes
git commit -m "feat: update site content"

# 3. Push to main branch
git push origin main
```

## 4. Triggering a Redeploy (Troubleshooting)

If you added Environment Variables *after* the deployment started, the new variables won't be active. You must trigger a redeploy:

1. Go to Vercel Dashboard > Deployments.
2. Click the three dots (...) on the latest deployment.
3. Select **Redeploy**.
