# Deployment Guide: Deanaldo.ca

This project is built with **Vite + React** and connected to **Sanity CMS**. Follow these steps to deploy to Vercel.

## 1. Environment Variables (Vercel)

Before deploying, go to your Vercel Project Settings > **Environment Variables** and add the following keys. These connect your frontend to the CMS.

| Key | Value Description |
| :--- | :--- |
| `VITE_SANITY_PROJECT_ID` | Your Sanity Project ID (Found in Sanity Manage) |
| `VITE_SANITY_DATASET` | Usually `production` |

**Important:** If you fail to add these, the app will build, but content will be missing or the connection will fail.

## 2. Sanity CORS Configuration

For the app to fetch data from Sanity, you must whitelist your Vercel URL.

1. Go to [manage.sanity.io](https://manage.sanity.io).
2. Select your project.
3. Go to **API** > **CORS Origins**.
4. Click **Add CORS Origin**.
5. Add your Vercel domain (e.g., `https://deanaldo-archive.vercel.app`).
6. Check "Allow credentials" if necessary (usually not needed for public read).
7. Save.

## 3. Deployment Commands

Stage your changes, commit, and push to your GitHub repository. Vercel will detect the push and auto-deploy.

```bash
# 1. Stage all files
git add .

# 2. Commit changes
git commit -m "feat: add cms theme and production layout"

# 3. Push to main branch
git push origin main
```

## 4. Triggering a Redeploy (Troubleshooting)

If you added Environment Variables *after* the deployment started, the new variables won't be active. You must trigger a redeploy:

1. Go to Vercel Dashboard > Deployments.
2. Click the three dots (...) on the latest deployment.
3. Select **Redeploy**.
