const sharp = require('sharp');
const path = require('path');

async function run() {
    // PTIT is 651x851. Resize to height 150 -> width is ~114.7
    // VLGM is 1400x1400. Resize to height 150 -> width is 150
    // Trim transparent borders first to ensure accurate height
    const ptitBuffer = await sharp(path.resolve(__dirname, '../source/public/assets/img/logo/logoPTIT.png')).trim().toBuffer();
    const ptitMeta = await sharp(ptitBuffer).metadata();
    const ptitHeight = 150;
    const ptitWidth = Math.round(ptitMeta.width * (ptitHeight / ptitMeta.height));
    const ptit = await sharp(ptitBuffer).resize({ height: ptitHeight }).toBuffer();
        
    const vlgmBuffer = await sharp(path.resolve(__dirname, '../source/public/assets/img/logo/logo-vlgm-transparent.png')).trim().toBuffer();
    const vlgmMeta = await sharp(vlgmBuffer).metadata();
    // To make them visually equal, since PTIT is tall/thin and VLGM is circular, 
    // we make VLGM slightly taller or the same height. Let's make them both height 150.
    const vlgmHeight = 150;
    const vlgmWidth = Math.round(vlgmMeta.width * (vlgmHeight / vlgmMeta.height));
    const vlgm = await sharp(vlgmBuffer).resize({ height: vlgmHeight }).toBuffer();

    const gap = 20; // 20px gap
    const totalWidth = ptitWidth + gap + vlgmWidth;

    await sharp({
        create: {
            width: totalWidth,
            height: 150,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    })
    .composite([
        { input: ptit, left: 0, top: 0 },
        { input: vlgm, left: ptitWidth + gap, top: 0 }
    ])
    .toFile(path.resolve(__dirname, 'src/admin/extensions/combined-logo.png'));
    
    console.log('Combined logo created with tight spacing.');
}

run().catch(err => console.error(err));
