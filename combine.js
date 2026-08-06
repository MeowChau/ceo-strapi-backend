const sharp = require('sharp');
const path = require('path');

async function run() {
    // PTIT is 651x851. Resize to height 150 -> width is ~114.7
    // VLGM is 1400x1400. Resize to height 150 -> width is 150
    const ptitWidth = 115;
    const ptit = await sharp(path.resolve(__dirname, '../source/public/assets/img/logo/logoPTIT.png'))
        .resize({ height: 150 })
        .toBuffer();
        
    const vlgmWidth = 150;
    const vlgm = await sharp(path.resolve(__dirname, '../source/public/assets/img/logo/logo-vlgm-transparent.png'))
        .resize({ height: 150 })
        .toBuffer();

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
