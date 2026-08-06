const sharp = require('sharp');

async function run() {
    const ptit = await sharp('../source/public/assets/img/logo/logoPTIT.png').resize(null, 150).toBuffer();
    const vlgm = await sharp('../source/public/assets/img/logo/logo-vlgm-transparent.png').resize(null, 150).toBuffer();

    const ptitInfo = await sharp(ptit).metadata();
    const vlgmInfo = await sharp(vlgm).metadata();

    const width = ptitInfo.width + vlgmInfo.width + 20;
    const height = Math.max(ptitInfo.height, vlgmInfo.height);

    await sharp({
        create: {
            width: width,
            height: height,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    })
    .composite([
        { input: ptit, left: 0, top: 0 },
        { input: vlgm, left: ptitInfo.width + 20, top: 0 }
    ])
    .png()
    .toFile('src/admin/extensions/combined-logo.png');

    console.log('Done!');
}
run().catch(console.error);
