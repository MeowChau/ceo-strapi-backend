const Database = require('better-sqlite3');
const db = new Database('d:/duanma/Consua v1.3/backend/.tmp/data.db');

// Find Authenticated role ID
const roleRow = db.prepare(`SELECT id FROM up_roles WHERE type = 'authenticated'`).get();
if (!roleRow) {
    console.log("Authenticated role not found");
    process.exit(1);
}
const roleId = roleRow.id;

// Check if permission already exists
const permStr = 'api::mentoring-request.mentoring-request.me';
const existing = db.prepare(`SELECT * FROM up_permissions WHERE action = ? AND role_id = ?`).get(permStr, roleId);

if (!existing) {
    db.prepare(`INSERT INTO up_permissions (action, role_id) VALUES (?, ?)`).run(permStr, roleId);
    console.log("Permission added!");
} else {
    console.log("Permission already exists.");
}
