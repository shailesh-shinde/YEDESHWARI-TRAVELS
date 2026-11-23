import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve('data/yedeshwari.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run("ALTER TABLE settings ADD COLUMN additional_phones TEXT", (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.log('Column note:', err.message);
    }
  });

  const query = `UPDATE settings SET 
    phone = ?, 
    whatsapp_number = ?, 
    additional_phones = ?`;

  db.run(query, ['+91 9767224445', '919767224445', '+91 9860451641, +91 9096965271, +91 9322112095'], function(err) {
    if (err) {
      console.error('Update failed:', err);
    } else {
      console.log('✅ Settings updated. Rows affected:', this.changes);
    }
  });

  db.all("SELECT id, phone, whatsapp_number, additional_phones FROM settings", (err, rows) => {
    console.log('Current DB settings:', rows);
    db.close();
  });
});
