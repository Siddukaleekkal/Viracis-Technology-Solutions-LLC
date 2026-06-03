const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function padFavicon(filename, originalSize, paddingRatio = 0.75) {
  const inputPath = path.join(__dirname, '..', 'public', filename);
  const tempPath = path.join(__dirname, '..', 'public', `temp-${filename}`);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`File ${filename} not found, skipping.`);
    return;
  }

  // Calculate the new size for the inner image
  const innerSize = Math.round(originalSize * paddingRatio);
  
  try {
    // Resize the image to the inner size, then extend it to the original size
    // with a transparent background.
    await sharp(inputPath)
      .resize(innerSize, innerSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .extend({
        top: Math.floor((originalSize - innerSize) / 2),
        bottom: Math.ceil((originalSize - innerSize) / 2),
        left: Math.floor((originalSize - innerSize) / 2),
        right: Math.ceil((originalSize - innerSize) / 2),
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(tempPath);
      
    // Replace the original file with the padded one
    fs.renameSync(tempPath, inputPath);
    console.log(`Successfully padded and centered ${filename}`);
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
}

async function run() {
  await padFavicon('favicon.png', 512, 0.70); // 70% inner size
  await padFavicon('favicon-32.png', 32, 0.70); // 70% inner size
  await padFavicon('apple-touch-icon.png', 180, 0.70); // 70% inner size (usually 180x180)
}

run();
