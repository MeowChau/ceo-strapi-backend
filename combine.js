const sharp = require('sharp');

async function run() {
    const ptit = await sharp('../source/public/assets/img/logo/logoPTIT.png')
        .trim()
        .resize(120, 120, { fit: 'contain', background: {r:0,g:0,b:0,alpha:0} })
        .toBuffer();
        
    const vlgm = await sharp('../source/public/assets/img/logo/logo-vlgm-transparent.png')
        .trim()
        .resize(120, 120, { fit: 'contain', background: {r:0,g:0,b:0,alpha:0} })
        .toBuffer();

    const width = 260;
    const height = 120;

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
        { input: vlgm, left: 140, top: 0 }
    ])
    .png()
    .toFile('src/admin/extensions/combined-logo.png');

    console.log('Done combine!');
}
run().catch(console.error);
