// Bulk photo ingest: uploads every image in a folder to Sanity, reads EXIF to
// prefill photograph fields, and creates each as a draft for review in Studio
// before publishing. Usage: npm run ingest ./path/to/folder
import { createClient } from '@sanity/client';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import exifr from 'exifr';

try {
  process.loadEnvFile('.env.local');
} catch {
  // .env.local not found — fall back to whatever is already in the environment
}

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);
const RATE_LIMIT_MS = 500;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var: ${name} (see .env.example)`);
    process.exit(1);
  }
  return value;
}

function slugify(filename: string): string {
  const base = path.basename(filename, path.extname(filename));
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function titleize(filename: string): string {
  const base = path.basename(filename, path.extname(filename));
  return base
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const folder = process.argv[2];
  if (!folder) {
    console.error('Usage: npm run ingest ./path/to/folder');
    process.exit(1);
  }

  const projectId = requireEnv('NEXT_PUBLIC_SANITY_PROJECT_ID');
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const token = requireEnv('SANITY_WRITE_TOKEN');

  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2024-03-23',
    useCdn: false,
  });

  const entries = await readdir(folder, { withFileTypes: true });
  const imageFiles = entries
    .filter((e) => e.isFile() && IMAGE_EXTENSIONS.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort();

  if (imageFiles.length === 0) {
    console.log(`No images found in ${folder}`);
    return;
  }

  console.log(`Found ${imageFiles.length} image(s) in ${folder}. Ingesting as drafts...\n`);

  const created: { title: string; slug: string; camera?: string; lens?: string; year?: number }[] = [];
  const failed: { file: string; error: string }[] = [];

  for (const filename of imageFiles) {
    const filePath = path.join(folder, filename);
    try {
      const buffer = await readFile(filePath);

      const exif = await exifr
        .parse(buffer, { pick: ['Make', 'Model', 'LensModel', 'DateTimeOriginal', 'CreateDate'] })
        .catch(() => null);

      const camera = exif?.Make && exif?.Model ? `${exif.Make} ${exif.Model}`.trim() : exif?.Model;
      const lens = exif?.LensModel;
      const captureDate: Date | undefined = exif?.DateTimeOriginal || exif?.CreateDate;
      const year = captureDate ? captureDate.getFullYear() : undefined;

      const asset = await client.assets.upload('image', buffer, { filename });

      const slug = slugify(filename);
      const title = titleize(filename);
      const docId = `drafts.photograph-${slug}`;

      await client.createIfNotExists({
        _id: docId,
        _type: 'photograph',
        title,
        slug: { _type: 'slug', current: slug },
        image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
        camera,
        lens,
        year,
      });

      created.push({ title, slug, camera, lens, year });
      console.log(`✓ ${filename} -> draft "${title}" (${camera || 'no camera EXIF'})`);
    } catch (err) {
      failed.push({ file: filename, error: err instanceof Error ? err.message : String(err) });
      console.error(`✗ ${filename}: ${err instanceof Error ? err.message : err}`);
    }

    await sleep(RATE_LIMIT_MS);
  }

  console.log(`\nDone. ${created.length} draft(s) created, ${failed.length} failed.`);
  if (created.length > 0) {
    console.log('\nCreated drafts (review and publish in Sanity Studio > Photograph):');
    created.forEach((c) => console.log(`  - ${c.title} (${c.slug})${c.year ? ` — ${c.year}` : ''}`));
  }
  if (failed.length > 0) {
    console.log('\nFailed:');
    failed.forEach((f) => console.log(`  - ${f.file}: ${f.error}`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
