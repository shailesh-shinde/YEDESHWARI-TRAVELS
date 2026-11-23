import express from 'express';
import { query } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all active vehicles (Public)
router.get('/', async (req, res) => {
  try {
    const { category, seating, ac } = req.query;
    let sql = 'SELECT * FROM vehicles WHERE is_active = 1';
    const params = [];

    if (category && category !== 'All') {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (seating) {
      sql += ' AND seating_capacity = ?';
      params.push(parseInt(seating, 10));
    }

    if (ac && ac !== 'All') {
      sql += ' AND (ac_option = ? OR ac_option = "Both AC & Non-AC Available")';
      params.push(ac);
    }

    sql += ' ORDER BY seating_capacity ASC, id ASC';
    const vehicles = await query(sql, params);

    // Parse features if stored as JSON string
    const formatted = vehicles.map(v => {
      let parsedFeatures = [];
      try {
        parsedFeatures = typeof v.features === 'string' ? JSON.parse(v.features) : v.features;
      } catch (e) {
        parsedFeatures = v.features ? v.features.split(',').map(s => s.trim()) : [];
      }
      return { ...v, features: parsedFeatures };
    });

    res.json({ success: true, count: formatted.length, vehicles: formatted });
  } catch (err) {
    console.error('Fleet fetch error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch vehicles' });
  }
});

// Admin: Get all vehicles including inactive
router.get('/all-admin', authenticateAdmin, async (req, res) => {
  try {
    const vehicles = await query('SELECT * FROM vehicles ORDER BY id DESC');
    const formatted = vehicles.map(v => {
      let parsedFeatures = [];
      try {
        parsedFeatures = typeof v.features === 'string' ? JSON.parse(v.features) : v.features;
      } catch (e) {
        parsedFeatures = v.features ? v.features.split(',').map(s => s.trim()) : [];
      }
      return { ...v, features: parsedFeatures };
    });
    res.json({ success: true, vehicles: formatted });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch admin fleet' });
  }
});

// Admin: Add new vehicle
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { name, category, seating_capacity, ac_option, bus_type, purpose, features, image_url, badge, is_active } = req.body;
    if (!name || !category || !seating_capacity || !ac_option) {
      return res.status(400).json({ success: false, message: 'Name, Category, Seating Capacity, and AC option are required' });
    }

    const featString = Array.isArray(features) ? JSON.stringify(features) : (typeof features === 'string' ? features : JSON.stringify([]));

    const result = await query(
      `INSERT INTO vehicles (name, category, seating_capacity, ac_option, bus_type, purpose, features, image_url, badge, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        category,
        parseInt(seating_capacity, 10),
        ac_option,
        bus_type || '',
        purpose || '',
        featString,
        image_url || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
        badge || null,
        is_active !== undefined ? (is_active ? 1 : 0) : 1
      ]
    );

    res.status(201).json({ success: true, message: 'Vehicle added successfully', id: result.insertId });
  } catch (err) {
    console.error('Add vehicle error:', err);
    res.status(500).json({ success: false, message: 'Failed to add vehicle' });
  }
});

// Admin: Update vehicle
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { name, category, seating_capacity, ac_option, bus_type, purpose, features, image_url, badge, is_active } = req.body;
    const featString = Array.isArray(features) ? JSON.stringify(features) : (typeof features === 'string' ? features : JSON.stringify([]));

    await query(
      `UPDATE vehicles SET
       name = ?, category = ?, seating_capacity = ?, ac_option = ?,
       bus_type = ?, purpose = ?, features = ?, image_url = ?, badge = ?, is_active = ?
       WHERE id = ?`,
      [
        name,
        category,
        parseInt(seating_capacity, 10),
        ac_option,
        bus_type || '',
        purpose || '',
        featString,
        image_url,
        badge || null,
        is_active ? 1 : 0,
        req.params.id
      ]
    );

    res.json({ success: true, message: 'Vehicle updated successfully' });
  } catch (err) {
    console.error('Update vehicle error:', err);
    res.status(500).json({ success: false, message: 'Failed to update vehicle' });
  }
});

// Admin: Delete vehicle
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    await query('DELETE FROM vehicles WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Vehicle removed from fleet' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete vehicle' });
  }
});

export default router;
