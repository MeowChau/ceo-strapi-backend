const Database = require('better-sqlite3');
const db = new Database('.tmp/data.db');
const row = db.prepare("SELECT value FROM strapi_core_store_settings WHERE key = 'plugin_admin_project-settings'").get();
console.log('Before:', row ? row.value : 'None');
