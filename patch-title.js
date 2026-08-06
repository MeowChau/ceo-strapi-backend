const fs = require('fs');
const path = require('path');

const filesToPatch = [
    'node_modules/@strapi/admin/dist/admin/src/components/DefaultDocument.js',
    'node_modules/@strapi/admin/dist/admin/src/components/DefaultDocument.mjs',
    'node_modules/@strapi/admin/dist/admin/admin/src/components/PageHelpers.js',
    'node_modules/@strapi/admin/dist/admin/admin/src/components/PageHelpers.mjs'
];

filesToPatch.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        content = content.replace(/<title>Strapi Admin<\/title>/g, '<title>Quản trị hệ thống</title>');
        content = content.replace(/children: "Strapi Admin"/g, 'children: "Quản trị hệ thống"');
        content = content.replace(/\| Strapi/g, '| Quản trị hệ thống');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Patched', file);
    }
});
