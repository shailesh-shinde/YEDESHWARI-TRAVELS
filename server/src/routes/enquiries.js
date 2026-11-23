import express from 'express';
import { query } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Generate unique booking enquiry reference
function generateReferenceNo() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `YT-${year}-${randomNum}`;
}

// Format WhatsApp URL with prefilled message
function createWhatsAppEnquiryLink(whatsappNumber, enquiryData) {
  const cleanPhone = String(whatsappNumber).replace(/\D/g, '');
  const text = `*New Travel Enquiry - Yedeshwari Travels*
*Ref:* ${enquiryData.reference_no}
*Customer:* ${enquiryData.customer_name} (${enquiryData.mobile_number})
*Vehicle:* ${enquiryData.vehicle_category} ${enquiryData.seating_capacity ? `(${enquiryData.seating_capacity})` : ''} - ${enquiryData.ac_preference}
*Route:* ${enquiryData.pickup_city} to ${enquiryData.destination_city}
*Travel Date:* ${enquiryData.start_date}${enquiryData.end_date ? ` to ${enquiryData.end_date}` : ''}
*Passengers:* ${enquiryData.passenger_count}
*Trip Type:* ${enquiryData.trip_type}
*Purpose:* ${enquiryData.trip_purpose}
${enquiryData.additional_requirements ? `*Notes:* ${enquiryData.additional_requirements}` : ''}`.trim();

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

// Create new customer booking enquiry
router.post('/', async (req, res) => {
  try {
    const {
      customer_name,
      mobile_number,
      email,
      pickup_city,
      pickup_address,
      destination_city,
      destination_address,
      start_date,
      end_date,
      pickup_time,
      passenger_count,
      vehicle_category,
      seating_capacity,
      ac_preference,
      trip_type,
      trip_purpose,
      additional_requirements
    } = req.body;

    const acPref = ac_preference || 'AC';

    // Validate required fields
    if (!customer_name || !mobile_number || !pickup_city || !destination_city || !start_date || !passenger_count || !vehicle_category) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields: Name, Mobile, Pickup City, Destination City, Start Date, Passengers, and Vehicle Category.'
      });
    }

    // Mobile number validation (at least 10 digits)
    const phoneDigits = String(mobile_number).replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit mobile number.'
      });
    }

    const reference_no = generateReferenceNo();

    await query(
      `INSERT INTO enquiries (
        reference_no, customer_name, mobile_number, email,
        pickup_city, pickup_address, destination_city, destination_address,
        start_date, end_date, pickup_time, passenger_count,
        vehicle_category, seating_capacity, ac_preference, trip_type,
        trip_purpose, additional_requirements, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New')`,
      [
        reference_no,
        customer_name.trim(),
        mobile_number.trim(),
        email ? email.trim() : null,
        pickup_city.trim(),
        pickup_address ? pickup_address.trim() : '',
        destination_city.trim(),
        destination_address ? destination_address.trim() : '',
        start_date,
        end_date || null,
        pickup_time || null,
        parseInt(passenger_count, 10),
        vehicle_category,
        seating_capacity || null,
        acPref,
        trip_type || 'Round-Trip',
        trip_purpose || 'General Travel',
        additional_requirements ? additional_requirements.trim() : null
      ]
    );

    // Fetch settings to get configured WhatsApp number
    const settings = await query('SELECT whatsapp_number FROM settings LIMIT 1');
    const whatsappNum = settings[0]?.whatsapp_number || process.env.WHATSAPP_NUMBER || '919822000000';

    const enquiryData = {
      reference_no,
      customer_name,
      mobile_number,
      pickup_city,
      destination_city,
      start_date,
      end_date,
      passenger_count,
      vehicle_category,
      seating_capacity,
      ac_preference,
      trip_type: trip_type || 'Round-Trip',
      trip_purpose: trip_purpose || 'General Travel',
      additional_requirements
    };

    const whatsappLink = createWhatsAppEnquiryLink(whatsappNum, enquiryData);

    res.status(201).json({
      success: true,
      message: 'Booking enquiry submitted successfully. Our team will review your requirements and share an official quotation shortly.',
      reference_no,
      whatsapp_link: whatsappLink,
      enquiry: enquiryData
    });
  } catch (err) {
    console.error('Enquiry error:', err);
    res.status(500).json({ success: false, message: 'Failed to record booking enquiry. Please try again or call us directly.' });
  }
});

// Admin: Get all enquiries with search & filter
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const { status, search, limit = 100 } = req.query;
    let sql = 'SELECT * FROM enquiries';
    const params = [];
    const conditions = [];

    if (status && status !== 'All') {
      conditions.push('status = ?');
      params.push(status);
    }

    if (search) {
      conditions.push('(customer_name LIKE ? OR mobile_number LIKE ? OR reference_no LIKE ? OR pickup_city LIKE ? OR destination_city LIKE ?)');
      const s = `%${search}%`;
      params.push(s, s, s, s, s);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY id DESC LIMIT ?';
    params.push(parseInt(limit, 10));

    const enquiries = await query(sql, params);
    res.json({ success: true, count: enquiries.length, enquiries });
  } catch (err) {
    console.error('Get enquiries error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch enquiries' });
  }
});

// Admin: Update enquiry status
router.put('/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['New', 'Contacted', 'Quotation Sent', 'Confirmed', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    await query('UPDATE enquiries SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true, message: `Status updated to ${status}` });
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ success: false, message: 'Failed to update enquiry status' });
  }
});

// Admin: Add estimated quotation amount and notes
router.put('/:id/quotation', authenticateAdmin, async (req, res) => {
  try {
    const { quotation_amount, quotation_notes, status } = req.body;
    const newStatus = status || 'Quotation Sent';

    await query(
      'UPDATE enquiries SET quotation_amount = ?, quotation_notes = ?, status = ? WHERE id = ?',
      [quotation_amount ? parseFloat(quotation_amount) : null, quotation_notes || null, newStatus, req.params.id]
    );

    res.json({ success: true, message: 'Quotation details updated successfully' });
  } catch (err) {
    console.error('Quotation update error:', err);
    res.status(500).json({ success: false, message: 'Failed to save quotation' });
  }
});

// Admin: Delete enquiry
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    await query('DELETE FROM enquiries WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Enquiry deleted' });
  } catch (err) {
    console.error('Delete enquiry error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete enquiry' });
  }
});

export default router;
