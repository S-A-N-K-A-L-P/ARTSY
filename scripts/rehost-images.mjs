/**
 * Re-host hotlinked cover and item images on Cloudinary.
 *
 * Production currently hotlinks images from dreamstime, eternitysafety,
 * arancrafts and futurecdn. Those are not ours: one of them
 * (eternitysafety.com) already serves a clean 200 to curl but returns 403 to a
 * browser user agent, so the "gloves" cover is broken for real visitors while
 * looking fine to any command-line check. The rest can change or vanish at any
 * time, and next.config only allowlists unsplash/pexels/dicebear for
 * next/image — the boards only get away with it because they use plain <img>.
 *
 * This downloads each remote image, uploads it to Cloudinary, and rewrites the
 * database record to point at the Cloudinary URL. Images already on Cloudinary
 * are skipped, so it is safe to re-run.
 *
 * Usage — dry run first, it changes nothing:
 *   node scripts/rehost-images.mjs
 * Then, to actually write:
 *   node scripts/rehost-images.mjs --apply
 *
 * Requires in the environment (same values the app uses):
 *   DATABASE_URL
 *   CLOUDINARY_CLOUD_NAME  CLOUDINARY_API_KEY  CLOUDINARY_API_SECRET
 */
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

const APPLY = process.argv.includes('--apply');

const required = [
  'DATABASE_URL',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error('Missing environment variables:\n  ' + missing.join('\n  '));
  console.error('\nSet them the same way the deployed app does, then re-run.');
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const isOurs = (url) => !url || url.includes('res.cloudinary.com');

/**
 * Fetch with a browser user agent. The point is to store what a *visitor*
 * would get: if the origin refuses a browser, we want to know now rather than
 * silently re-hosting an error page.
 */
async function download(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
      Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
    },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const type = res.headers.get('content-type') || '';
  if (!type.startsWith('image/')) throw new Error(`not an image (${type})`);
  const buf = Buffer.from(await res.arrayBuffer());
  return `data:${type};base64,${buf.toString('base64')}`;
}

async function upload(dataUri, folder) {
  const r = await cloudinary.uploader.upload(dataUri, { folder, resource_type: 'image' });
  return r.secure_url;
}

await mongoose.connect(process.env.DATABASE_URL);

const Page = mongoose.model('Page', new mongoose.Schema({}, { strict: false }), 'pages');
const Item = mongoose.model('Item', new mongoose.Schema({}, { strict: false }), 'items');

const report = { rehosted: 0, skipped: 0, failed: [], noImage: [] };

console.log(APPLY ? 'APPLYING changes\n' : 'DRY RUN — nothing will be written (pass --apply)\n');

for (const page of await Page.find({})) {
  const url = page.coverImage;
  const name = page.name || page._id;
  if (!url) {
    report.noImage.push(`space: ${name}`);
    continue;
  }
  if (isOurs(url)) {
    report.skipped++;
    continue;
  }
  try {
    const data = await download(url);
    if (APPLY) {
      const fresh = await upload(data, 'astl/covers');
      await Page.updateOne({ _id: page._id }, { $set: { coverImage: fresh } });
      console.log(`  space  ${name}  ->  ${fresh}`);
    } else {
      console.log(`  space  ${name}  would re-host  (${url.slice(0, 60)}…)`);
    }
    report.rehosted++;
  } catch (e) {
    report.failed.push(`space: ${name} — ${e.message} — ${url.slice(0, 70)}`);
  }
}

for (const item of await Item.find({})) {
  const imgs = Array.isArray(item.images) ? item.images : [];
  const title = item.title || item._id;
  if (!imgs.length) {
    report.noImage.push(`item: ${title}`);
    continue;
  }
  const next = [];
  let changed = false;
  for (const url of imgs) {
    if (isOurs(url)) {
      next.push(url);
      report.skipped++;
      continue;
    }
    try {
      const data = await download(url);
      if (APPLY) {
        const fresh = await upload(data, 'astl/artifacts');
        next.push(fresh);
        console.log(`  item   ${title}  ->  ${fresh}`);
      } else {
        next.push(url);
        console.log(`  item   ${title}  would re-host  (${url.slice(0, 60)}…)`);
      }
      changed = true;
      report.rehosted++;
    } catch (e) {
      next.push(url);
      report.failed.push(`item: ${title} — ${e.message} — ${url.slice(0, 70)}`);
    }
  }
  if (APPLY && changed) await Item.updateOne({ _id: item._id }, { $set: { images: next } });
}

console.log('\n---');
console.log(`re-hosted : ${report.rehosted}`);
console.log(`already ours: ${report.skipped}`);
if (report.noImage.length) {
  console.log(`\nno image at all (${report.noImage.length}) — these need one uploading:`);
  report.noImage.forEach((x) => console.log('  ' + x));
}
if (report.failed.length) {
  console.log(`\ncould not fetch (${report.failed.length}) — the origin refused a browser request:`);
  report.failed.forEach((x) => console.log('  ' + x));
  console.log('\n  Re-upload these by hand through the item/space edit screen.');
}

await mongoose.disconnect();
