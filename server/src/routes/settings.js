import express from 'express';
import { query } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get company settings (Public)
router.get('/', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM settings LIMIT 1');
    if (rows && rows.length > 0) {
      res.json({ success: true, settings: rows[0] });
    } else {
      res.status(404).json({ success: false, message: 'Settings not found' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch settings' });
  }
});

// Admin: Update settings (Contact number, WhatsApp, office address, etc.)
router.put('/', authenticateAdmin, async (req, res) => {
  try {
    const { company_name, tagline, main_location, phone, whatsapp_number, additional_phones, email, office_address, google_maps_embed } = req.body;

    const rows = await query('SELECT id FROM settings LIMIT 1');
    if (rows && rows.length > 0) {
      await query(
        `UPDATE settings SET
         company_name = ?, tagline = ?, main_location = ?, phone = ?, whatsapp_number = ?, additional_phones = ?,
         email = ?, office_address = ?, google_maps_embed = ?
         WHERE id = ?`,
        [
          company_name || 'Yedeshwari Travels',
          tagline || 'Your Journey, Our Responsibility',
          main_location || 'Pune, Maharashtra, India',
          phone || '+91 9767224445',
          whatsapp_number || '919767224445',
          additional_phones || '+91 9860451641, +91 9096965271, +91 9322112095',
          email || 'bookings@yedeshwaritravels.com',
          office_address || 'Pune, Maharashtra',
          google_maps_embed || '',
          rows[0].id
        ]
      );
    } else {
      await query(
        `INSERT INTO settings (company_name, tagline, main_location, phone, whatsapp_number, additional_phones, email, office_address, google_maps_embed)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [company_name, tagline, main_location, phone, whatsapp_number, additional_phones, email, office_address, google_maps_embed]
      );
    }

    res.json({ success: true, message: 'Company settings updated successfully' });
  } catch (err) {
    console.error('Settings update error:', err);
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
});

export default router;
