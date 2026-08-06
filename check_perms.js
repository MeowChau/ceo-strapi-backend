const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('d:/duanma/Consua v1.3/backend/.tmp/data.db');

db.all(`SELECT * FROM up_permissions WHERE action = 'api::mentoring-request.mentoring-request.find'`, (err, rows) => {
    if (err) throw err;
    console.log("Permissions:", rows);
});
