import express from 'express';
import { query } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get routes (Public)
router.get('/', async (req, res) => {
  try {
    const { region } = req.query;
    let sql = 'SELECT * FROM routes';
    const params = [];

    if (region && region !== 'All') {
      sql += ' WHERE region = ?';
      params.push(region);
    }

    sql += ' ORDER BY is_popular DESC, distance_km ASC';
    const routes = await query(sql, params);
    res.json({ success: true, count: routes.length, routes });
  } catch (err) {
    console.error('Routes fetch error:', err);
    res.status(500).json({ success: false, message: 'Failed to load routes' });
  }
});

// Admin: Add Route
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { origin, destination, region, distance_km, duration_hrs, popular_for, recommended_vehicles, is_popular } = req.body;
    if (!destination || !region || !distance_km) {
      return res.status(400).json({ success: false, message: 'Destination, region, and distance are required' });
    }

    const result = await query(
      `INSERT INTO routes (origin, destination, region, distance_km, duration_hrs, popular_for, recommended_vehicles, is_popular)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        origin || 'Pune',
        destination,
        region,
        parseInt(distance_km, 10),
        duration_hrs || 'TBD',
        popular_for || 'Tours & Travel',
        recommended_vehicles || 'Buses & Cars',
        is_popular ? 1 : 0
      ]
    );

    res.status(201).json({ success: true, message: 'Route added', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add route' });
  }
});

// Admin: Edit Route
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { origin, destination, region, distance_km, duration_hrs, popular_for, recommended_vehicles, is_popular } = req.body;
    await query(
      `UPDATE routes SET origin = ?, destination = ?, region = ?, distance_km = ?, duration_hrs = ?, popular_for = ?, recommended_vehicles = ?, is_popular = ?
       WHERE id = ?`,
      [
        origin || 'Pune',
        destination,
        region,
        parseInt(distance_km, 10),
        duration_hrs,
        popular_for,
        recommended_vehicles,
        is_popular ? 1 : 0,
        req.params.id
      ]
    );
    res.json({ success: true, message: 'Route updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update route' });
  }
});

// Admin: Delete Route
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    await query('DELETE FROM routes WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Route deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete route' });
  }
});

export default router;
