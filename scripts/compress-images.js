// Image optimization script — run once to compress public/ images
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

async function compress() {
  const jobs = [
    {
      input: path.join(PUBLIC_DIR, 'profile-pic-2.jpeg'),
      output: path.join(PUBLIC_DIR, 'profile-pic-2.jpeg'),
      label: 'profile-pic-2.jpeg',
      fn: (s) =>
        s
          .resize(800, 800, { fit: 'cover', position: 'top' })
          .jpeg({ quality: 75, progressive: true, mozjpeg: true }),
    },
    {
      input: path.join(PUBLIC_DIR, 'og-image.png'),
      output: path.join(PUBLIC_DIR, 'og-image.png'),
      label: 'og-image.png',
      fn: (s) =>
        s
          .resize(1200, 630, { fit: 'cover' })
          .png({ compressionLevel: 9, palette: false, quality: 85 }),
    },
  ];

  for (const job of jobs) {
    const before = fs.statSync(job.input).size;
    const tmp = job.output + '.tmp';
    await job.fn(sharp(job.input)).toFile(tmp);
    const after = fs.statSync(tmp).size;

    if (after < before) {
      fs.renameSync(tmp, job.output);
      console.log(
        `✅ ${job.label}: ${(before / 1024).toFixed(1)}KB → ${(after / 1024).toFixed(1)}KB` +
        ` (saved ${((1 - after / before) * 100).toFixed(1)}%)`
      );
    } else {
      fs.unlinkSync(tmp);
      console.log(`⚠️  ${job.label}: no improvement, keeping original (${(before / 1024).toFixed(1)}KB)`);
    }
  }
}

compress().catch(console.error);
