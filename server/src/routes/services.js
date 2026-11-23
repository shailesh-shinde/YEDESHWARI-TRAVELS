import express from 'express';
import { query } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const services = await query('SELECT * FROM services ORDER BY id ASC');
    res.json({ success: true, services });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch services' });
  }
});

export default router;
