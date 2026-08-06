const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('.tmp/data.db');
db.get("SELECT value FROM strapi_core_store_settings WHERE key = 'plugin_admin_project-settings'", (err, row) => console.log(row));
