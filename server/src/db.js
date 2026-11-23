import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mysql from 'mysql2/promise';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import {
  seedSettings,
  seedVehicles,
  seedServices,
  seedRoutes,
  seedGallery,
  seedTestimonials
} from './seedData.js';

dotenv.config();

let dbType = 'sqlite'; // 'mysql' or 'sqlite'
let mysqlPool = null;
let sqliteDb = null;

// Initialize Database Connection
export async function initDB() {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'yedeshwari_travels';
  const port = parseInt(process.env.DB_PORT || '3306', 10);

  let mysqlAvailable = false;

  try {
    // Attempt connecting to MySQL server
    const tempConn = await mysql.createConnection({
      host,
      user,
      password,
      port,
      connectTimeout: 2000
    });

    await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await tempConn.end();

    mysqlPool = mysql.createPool({
      host,
      user,
      password,
      database,
      port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test connection
    const [test] = await mysqlPool.query('SELECT 1');
    if (test) {
      dbType = 'mysql';
      mysqlAvailable = true;
      console.log('✅ Connected to MySQL database:', database);
    }
  } catch (err) {
    console.warn('⚠️  MySQL connection failed (' + err.message + '). Falling back seamlessly to local SQLite storage.');
  }

  if (!mysqlAvailable) {
    dbType = 'sqlite';
    const dataDir = path.resolve('data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.join(dataDir, 'yedeshwari.db');

    await new Promise((resolve, reject) => {
      sqliteDb = new sqlite3.Database(dbPath, (err) => {
        if (err) return reject(err);
        console.log('✅ Connected to local SQLite database at:', dbPath);
        resolve();
      });
    });
  }

  // Setup Tables and Seeds
  await setupTables();
  await seedInitialData();
}

async function setupTables() {
  if (dbType === 'mysql') {
    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company_name VARCHAR(150) NOT NULL,
        tagline VARCHAR(255) NOT NULL,
        main_location VARCHAR(150) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        whatsapp_number VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        office_address TEXT NOT NULL,
        google_maps_embed TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        category VARCHAR(50) NOT NULL,
        seating_capacity INT NOT NULL,
        ac_option VARCHAR(50) NOT NULL,
        bus_type VARCHAR(100) NOT NULL,
        purpose TEXT NOT NULL,
        features TEXT NOT NULL,
        image_url TEXT NOT NULL,
        badge VARCHAR(50) DEFAULT NULL,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS routes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        origin VARCHAR(100) NOT NULL DEFAULT 'Pune',
        destination VARCHAR(100) NOT NULL,
        region VARCHAR(50) NOT NULL,
        distance_km INT NOT NULL,
        duration_hrs VARCHAR(50) NOT NULL,
        popular_for VARCHAR(255) NOT NULL,
        recommended_vehicles VARCHAR(255) NOT NULL,
        is_popular TINYINT(1) DEFAULT 1
      )
    `);

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        features TEXT NOT NULL,
        icon VARCHAR(50) NOT NULL
      )
    `);

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        reference_no VARCHAR(50) NOT NULL UNIQUE,
        customer_name VARCHAR(150) NOT NULL,
        mobile_number VARCHAR(20) NOT NULL,
        email VARCHAR(100) DEFAULT NULL,
        pickup_city VARCHAR(100) NOT NULL,
        pickup_address TEXT,
        destination_city VARCHAR(100) NOT NULL,
        destination_address TEXT,
        start_date VARCHAR(20) NOT NULL,
        end_date VARCHAR(20) DEFAULT NULL,
        pickup_time VARCHAR(20) DEFAULT NULL,
        passenger_count INT NOT NULL,
        vehicle_category VARCHAR(50) NOT NULL,
        seating_capacity VARCHAR(50) DEFAULT NULL,
        ac_preference VARCHAR(50) NOT NULL,
        trip_type VARCHAR(50) NOT NULL DEFAULT 'Round-Trip',
        trip_purpose VARCHAR(100) NOT NULL,
        additional_requirements TEXT,
        status VARCHAR(50) NOT NULL DEFAULT 'New',
        quotation_amount DECIMAL(10,2) DEFAULT NULL,
        quotation_notes TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS gallery (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        category VARCHAR(50) NOT NULL,
        image_url TEXT NOT NULL,
        description VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        location VARCHAR(100) NOT NULL,
        service_used VARCHAR(150) NOT NULL,
        rating INT NOT NULL DEFAULT 5,
        review TEXT NOT NULL,
        is_sample TINYINT(1) DEFAULT 1,
        is_approved TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } else {
    // SQLite Tables
    const runSql = (sql) => new Promise((resolve, reject) => {
      sqliteDb.run(sql, (err) => (err ? reject(err) : resolve()));
    });

    await runSql(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_name TEXT NOT NULL,
        tagline TEXT NOT NULL,
        main_location TEXT NOT NULL,
        phone TEXT NOT NULL,
        whatsapp_number TEXT NOT NULL,
        email TEXT NOT NULL,
        office_address TEXT NOT NULL,
        google_maps_embed TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await runSql(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        seating_capacity INTEGER NOT NULL,
        ac_option TEXT NOT NULL,
        bus_type TEXT NOT NULL,
        purpose TEXT NOT NULL,
        features TEXT NOT NULL,
        image_url TEXT NOT NULL,
        badge TEXT,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await runSql(`
      CREATE TABLE IF NOT EXISTS routes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        origin TEXT NOT NULL DEFAULT 'Pune',
        destination TEXT NOT NULL,
        region TEXT NOT NULL,
        distance_km INTEGER NOT NULL,
        duration_hrs TEXT NOT NULL,
        popular_for TEXT NOT NULL,
        recommended_vehicles TEXT NOT NULL,
        is_popular INTEGER DEFAULT 1
      )
    `);

    await runSql(`
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        features TEXT NOT NULL,
        icon TEXT NOT NULL
      )
    `);

    await runSql(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reference_no TEXT NOT NULL UNIQUE,
        customer_name TEXT NOT NULL,
        mobile_number TEXT NOT NULL,
        email TEXT,
        pickup_city TEXT NOT NULL,
        pickup_address TEXT,
        destination_city TEXT NOT NULL,
        destination_address TEXT,
        start_date TEXT NOT NULL,
        end_date TEXT,
        pickup_time TEXT,
        passenger_count INTEGER NOT NULL,
        vehicle_category TEXT NOT NULL,
        seating_capacity TEXT,
        ac_preference TEXT NOT NULL,
        trip_type TEXT NOT NULL DEFAULT 'Round-Trip',
        trip_purpose TEXT NOT NULL,
        additional_requirements TEXT,
        status TEXT NOT NULL DEFAULT 'New',
        quotation_amount REAL DEFAULT NULL,
        quotation_notes TEXT DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await runSql(`
      CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        image_url TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await runSql(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        service_used TEXT NOT NULL,
        rating INTEGER NOT NULL DEFAULT 5,
        review TEXT NOT NULL,
        is_sample INTEGER DEFAULT 1,
        is_approved INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await runSql(`
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
}

async function seedInitialData() {
  // Check settings
  const settingsRows = await query('SELECT COUNT(*) as count FROM settings');
  const settingsCount = settingsRows[0]?.count || 0;
  if (settingsCount === 0) {
    await query(
      `INSERT INTO settings (company_name, tagline, main_location, phone, whatsapp_number, email, office_address, google_maps_embed)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        seedSettings.company_name,
        seedSettings.tagline,
        seedSettings.main_location,
        seedSettings.phone,
        seedSettings.whatsapp_number,
        seedSettings.email,
        seedSettings.office_address,
        seedSettings.google_maps_embed
      ]
    );
  }

  // Check admin
  const adminRows = await query('SELECT COUNT(*) as count FROM admins');
  const adminCount = adminRows[0]?.count || 0;
  if (adminCount === 0) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('admin123', salt);
    await query(
      `INSERT INTO admins (username, password_hash, name, role) VALUES (?, ?, ?, ?)`,
      ['admin', hash, 'Yedeshwari Admin', 'superadmin']
    );
    console.log('🔑 Seeded default admin account: admin / admin123');
  }

  // Check vehicles
  const vehicleRows = await query('SELECT COUNT(*) as count FROM vehicles');
  const vehicleCount = vehicleRows[0]?.count || 0;
  if (vehicleCount === 0) {
    for (const v of seedVehicles) {
      await query(
        `INSERT INTO vehicles (name, category, seating_capacity, ac_option, bus_type, purpose, features, image_url, badge, is_active)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [v.name, v.category, v.seating_capacity, v.ac_option, v.bus_type, v.purpose, v.features, v.image_url, v.badge, v.is_active]
      );
    }
    console.log(`🚗 Seeded ${seedVehicles.length} vehicles into fleet`);
  }

  // Check services
  const serviceRows = await query('SELECT COUNT(*) as count FROM services');
  const serviceCount = serviceRows[0]?.count || 0;
  if (serviceCount === 0) {
    for (const s of seedServices) {
      await query(
        `INSERT INTO services (title, description, features, icon) VALUES (?, ?, ?, ?)`,
        [s.title, s.description, s.features, s.icon]
      );
    }
    console.log(`🛠️ Seeded ${seedServices.length} services`);
  }

  // Check routes
  const routeRows = await query('SELECT COUNT(*) as count FROM routes');
  const routeCount = routeRows[0]?.count || 0;
  if (routeCount === 0) {
    for (const r of seedRoutes) {
      await query(
        `INSERT INTO routes (origin, destination, region, distance_km, duration_hrs, popular_for, recommended_vehicles, is_popular)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [r.origin, r.destination, r.region, r.distance_km, r.duration_hrs, r.popular_for, r.recommended_vehicles, r.is_popular]
      );
    }
    console.log(`🗺️ Seeded ${seedRoutes.length} popular routes`);
  }

  // Check gallery
  const galleryRows = await query('SELECT COUNT(*) as count FROM gallery');
  const galleryCount = galleryRows[0]?.count || 0;
  if (galleryCount === 0) {
    for (const g of seedGallery) {
      await query(
        `INSERT INTO gallery (title, category, image_url, description) VALUES (?, ?, ?, ?)`,
        [g.title, g.category, g.image_url, g.description]
      );
    }
  }

  // Check testimonials
  const testimonialRows = await query('SELECT COUNT(*) as count FROM testimonials');
  const testimonialCount = testimonialRows[0]?.count || 0;
  if (testimonialCount === 0) {
    for (const t of seedTestimonials) {
      await query(
        `INSERT INTO testimonials (name, location, service_used, rating, review, is_sample, is_approved)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [t.name, t.location, t.service_used, t.rating, t.review, t.is_sample, t.is_approved]
      );
    }
  }
}

// Unified Query Execution Helper
export async function query(sql, params = []) {
  if (dbType === 'mysql') {
    const [rows] = await mysqlPool.query(sql, params);
    if (sql.trim().toUpperCase().startsWith('INSERT')) {
      return { insertId: rows.insertId, affectedRows: rows.affectedRows };
    }
    if (sql.trim().toUpperCase().startsWith('UPDATE') || sql.trim().toUpperCase().startsWith('DELETE')) {
      return { affectedRows: rows.affectedRows };
    }
    return rows;
  } else {
    const cleanSql = sql.replace(/TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP/gi, 'DATETIME DEFAULT CURRENT_TIMESTAMP');
    const upper = cleanSql.trim().toUpperCase();

    if (upper.startsWith('SELECT') || upper.startsWith('PRAGMA')) {
      return new Promise((resolve, reject) => {
        sqliteDb.all(cleanSql, params, (err, rows) => {
          if (err) return reject(err);
          resolve(rows || []);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        sqliteDb.run(cleanSql, params, function(err) {
          if (err) return reject(err);
          resolve({
            insertId: this.lastID,
            affectedRows: this.changes
          });
        });
      });
    }
  }
}

export function getDbType() {
  return dbType;
}
