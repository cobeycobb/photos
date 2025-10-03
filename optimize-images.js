import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, 'public/images');
const thumbDir = path.join(__dirname, 'public/images/thumbnails');
const fullDir = path.join(__dirname, 'public/images/full');

// Create directories if they don't exist
if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });
if (!fs.existsSync(fullDir)) fs.mkdirSync(fullDir, { recursive: true });

async function optimizeImages() {
  const files = fs.readdirSync(sourceDir)
    .filter(file => /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(file));

  console.log(`Found ${files.length} images to optimize...`);

  for (const file of files) {
    const inputPath = path.join(sourceDir, file);
    const outputName = file.replace(/\.(jpg|jpeg|JPG|JPEG)$/i, '.jpg').toLowerCase();
    const thumbPath = path.join(thumbDir, outputName);
    const fullPath = path.join(fullDir, outputName);

    console.log(`\nProcessing: ${file}`);

    try {
      // Create thumbnail (800px max width)
      await sharp(inputPath)
        .resize(800, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: 80, progressive: true })
        .toFile(thumbPath);

      const thumbStats = fs.statSync(thumbPath);
      console.log(`  ✓ Thumbnail: ${(thumbStats.size / 1024).toFixed(0)}KB`);

      // Create full-size optimized version (2000px max width)
      await sharp(inputPath)
        .resize(2000, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: 85, progressive: true })
        .toFile(fullPath);

      const fullStats = fs.statSync(fullPath);
      console.log(`  ✓ Full-size: ${(fullStats.size / 1024 / 1024).toFixed(1)}MB`);

    } catch (error) {
      console.error(`  ✗ Error processing ${file}:`, error.message);
    }
  }

  console.log('\n✅ Image optimization complete!');
}

optimizeImages();
