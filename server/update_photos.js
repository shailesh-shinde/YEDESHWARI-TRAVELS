import sqlite3 from 'sqlite3';
import path from 'path';
import { seedVehicles, seedGallery } from './src/seedData.js';

const dbPath = path.resolve('data/yedeshwari.db');
const db = new sqlite3.Database(dbPath);

console.log('Updating vehicle photos in', dbPath);

db.serialize(() => {
  // Update each vehicle's photo
  const vehicleStmt = db.prepare('UPDATE vehicles SET image_url = ? WHERE name = ?');
  for (const v of seedVehicles) {
    vehicleStmt.run(v.image_url, v.name, function (err) {
      if (err) console.error('Error updating vehicle:', v.name, err);
      else console.log(`✓ Updated vehicle photo: ${v.name} -> ${v.image_url}`);
    });
  }
  vehicleStmt.finalize();

  // Also replace gallery photos to match seedGallery
  db.run('DELETE FROM gallery', [], function (err) {
    if (err) {
      console.error('Error clearing gallery:', err);
      return;
    }
    const galleryStmt = db.prepare('INSERT INTO gallery (title, category, image_url, description) VALUES (?, ?, ?, ?)');
    for (const g of seedGallery) {
      galleryStmt.run(g.title, g.category, g.image_url, g.description, function (gErr) {
        if (gErr) console.error('Error inserting gallery item:', g.title, gErr);
        else console.log(`✓ Inserted gallery item: ${g.title}`);
      });
    }
    galleryStmt.finalize(() => {
      console.log('All real photos updated in SQLite database successfully!');
      db.close();
    });
  });
});
