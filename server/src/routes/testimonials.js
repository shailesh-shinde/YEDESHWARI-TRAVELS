import express from 'express';
import { query } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get testimonials (Public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await query('SELECT * FROM testimonials WHERE is_approved = 1 ORDER BY id DESC');
    res.json({ success: true, count: testimonials.length, testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load testimonials' });
  }
});

// Admin: Add or edit testimonial
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { name, location, service_used, rating, review, is_sample, is_approved } = req.body;
    if (!name || !review) {
      return res.status(400).json({ success: false, message: 'Name and review are required' });
    }

    const result = await query(
      'INSERT INTO testimonials (name, location, service_used, rating, review, is_sample, is_approved) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        name,
        location || 'Pune',
        service_used || 'Travel Booking',
        rating || 5,
        review,
        is_sample ? 1 : 0,
        is_approved !== undefined ? (is_approved ? 1 : 0) : 1
      ]
    );

    res.status(201).json({ success: true, message: 'Testimonial added', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add testimonial' });
  }
});

// Admin: Delete testimonial
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    await query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Testimonial removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete testimonial' });
  }
});

export default router;
