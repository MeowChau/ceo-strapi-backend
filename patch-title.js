const fs = require('fs');
const path = require('path');

const filesToPatch = [
    'node_modules/@strapi/admin/dist/admin/src/components/DefaultDocument.js',
    'node_modules/@strapi/admin/dist/admin/src/components/DefaultDocument.mjs'
];

filesToPatch.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        content = content.replace(/<title>Strapi Admin<\/title>/g, '<title>Quản trị diễn đàn CEO</title>');
        content = content.replace(/children: "Strapi Admin"/g, 'children: "Quản trị diễn đàn CEO"');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Patched', file);
    }
});
