import express from 'express';
import { query } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get gallery images
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let sql = 'SELECT * FROM gallery';
    const params = [];

    if (category && category !== 'All') {
      sql += ' WHERE category = ?';
      params.push(category);
    }

    sql += ' ORDER BY id DESC';
    const items = await query(sql, params);
    res.json({ success: true, count: items.length, gallery: items });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load gallery' });
  }
});

// Admin: Add gallery photo
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { title, category, image_url, description } = req.body;
    if (!title || !category || !image_url) {
      return res.status(400).json({ success: false, message: 'Title, category, and image URL are required' });
    }

    const result = await query(
      'INSERT INTO gallery (title, category, image_url, description) VALUES (?, ?, ?, ?)',
      [title, category, image_url, description || '']
    );

    res.status(201).json({ success: true, message: 'Photo added to gallery', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add gallery item' });
  }
});

// Admin: Delete gallery photo
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    await query('DELETE FROM gallery WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete gallery item' });
  }
});

export default router;
