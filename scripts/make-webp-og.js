import sharp from 'sharp';
import fs from 'fs';

const before = fs.statSync('public/og-image.png').size;

sharp('public/og-image.png')
  .resize(1200, 630, { fit: 'cover' })
  .webp({ quality: 82 })
  .toFile('public/og-image.webp')
  .then(() => {
    const after = fs.statSync('public/og-image.webp').size;
    console.log(`og-image.webp: ${(after/1024).toFixed(1)}KB (was PNG ${(before/1024).toFixed(1)}KB, saved ${((1-after/before)*100).toFixed(1)}%)`);
  })
  .catch(console.error);
