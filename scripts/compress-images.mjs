import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = new URL('../public', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

const files = await readdir(PUBLIC_DIR);
const projectImages = files.filter(f => f.startsWith('project-') && extname(f) === '.png');

console.log(`\nFound ${projectImages.length} images to compress:\n`);

let totalBefore = 0;
let totalAfter = 0;

for (const file of projectImages) {
  const inputPath  = join(PUBLIC_DIR, file);
  const outputName = basename(file, '.png') + '.webp';
  const outputPath = join(PUBLIC_DIR, outputName);

  const { size: before } = await sharp(inputPath).metadata().then(async () => {
    const stat = await import('fs').then(m => m.promises.stat(inputPath));
    return stat;
  });

  await sharp(inputPath)
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(outputPath);

  const { size: after } = await import('fs').then(m => m.promises.stat(outputPath));

  const savedPct = (((before - after) / before) * 100).toFixed(1);
  const beforeKB  = (before  / 1024).toFixed(0);
  const afterKB   = (after   / 1024).toFixed(0);

  console.log(`  ✅ ${file.padEnd(18)} ${(before/1024/1024).toFixed(2)} MB  →  ${outputName.padEnd(18)} ${(after/1024).toFixed(0)} KB  (saved ${savedPct}%)`);

  totalBefore += before;
  totalAfter  += after;

  // Remove original PNG
  await unlink(inputPath);
}

console.log(`\n  Total before : ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
console.log(`  Total after  : ${(totalAfter  / 1024).toFixed(0)} KB`);
console.log(`  Total saved  : ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB\n`);
