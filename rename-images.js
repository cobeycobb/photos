import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const thumbDir = path.join(__dirname, 'public/images/thumbnails');
const fullDir = path.join(__dirname, 'public/images/full');

function renameFilesInDir(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const newName = file.replace(/ /g, '-');
      if (file !== newName) {
        const oldPath = path.join(dir, file);
        const newPath = path.join(dir, newName);
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${file} -> ${newName}`);
      }
    }
  });
}

console.log('Renaming thumbnails...');
renameFilesInDir(thumbDir);

console.log('\nRenaming full-size images...');
renameFilesInDir(fullDir);

console.log('\n✅ Done!');
