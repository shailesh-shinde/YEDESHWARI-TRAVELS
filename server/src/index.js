import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initDB, getDbType } from './db.js';

import authRoutes from './routes/auth.js';
import fleetRoutes from './routes/fleet.js';
import enquiryRoutes from './routes/enquiries.js';
import routeRoutes from './routes/routes.js';
import serviceRoutes from './routes/services.js';
import galleryRoutes from './routes/gallery.js';
import testimonialRoutes from './routes/testimonials.js';
import settingRoutes from './routes/settings.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads directory
const uploadsDir = path.resolve(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/fleet', fleetRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Yedeshwari Travels API',
    database_driver: getDbType(),
    timestamp: new Date().toISOString()
  });
});

// Serve frontend dist if available
let clientDist = path.resolve(__dirname, '../../client/dist');
if (!fs.existsSync(clientDist)) {
  clientDist = path.resolve(process.cwd(), 'client/dist');
}
if (!fs.existsSync(clientDist)) {
  clientDist = path.resolve(__dirname, '../client/dist');
}

if (fs.existsSync(clientDist)) {
  console.log('📦 Serving production frontend from:', clientDist);
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Start Server after Database Initialization
async function startServer() {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`🚀 Yedeshwari Travels Server running on http://localhost:${PORT}`);
      console.log(`💽 Active Database Driver: ${getDbType().toUpperCase()}`);
    });
  } catch (err) {
    console.error('Fatal: Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
