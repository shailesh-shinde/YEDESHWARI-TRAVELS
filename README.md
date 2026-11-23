# 🚌 Yedeshwari Travels — Premium Vehicle Rental & Travel Portal (Pune)

> **"Your Journey, Our Responsibility"**  
> Complete transportation and vehicle rental services based in Pune, Maharashtra, serving all districts across Maharashtra and pan-India destinations.

---

## 🌟 Overview & Key Features

Yedeshwari Travels provides end-to-end travel solutions ranging from 4-seater sedans and luxury SUVs to 17-20 seater Tempo Travellers and 26 to 50-seater luxury coaches.

### 🚍 Vehicle Fleet
- **Tempo Travellers**: 17 Seater & 20 Seater Force Tempo Travellers (Pushback seats, high roof, dual AC)
- **Mini Buses**: 26 Seater, 32 Seater & 35 Seater Mini Coaches
- **Large Buses**: 40 Seater, 45 Seater & 50 Seater Luxury Passenger Buses
- **Luxury Coaches**: Multi-Axle AC Luxury Coaches, Sleeper Coaches (Overnight routes), Deluxe Pushback Seater Coaches, Non-AC Group Buses
- **Cars & SUVs**: Maruti Swift Dzire, Maruti Ertiga, Kia Carens, Toyota Innova Crysta, Toyota Fortuner

### 🛣️ Routes & Coverage
- **Maharashtra Routes**: Pune to Mumbai, Nashik, Nagpur, Sambhajinagar, Kolhapur, Satara, Sangli, Solapur, Latur, Dharashiv, Beed, Ahilyanagar, Ratnagiri, etc.
- **All India Routes**: Pune to Goa, Hyderabad, Bengaluru, Chennai, Delhi, Indore, Bhopal, Ahmedabad, Surat, Jaipur, Udaipur, Varanasi, Tirupati, Shirdi.
- **Custom Itinerary Request**: Point-to-point and multi-day pan-India tour planning with national permits.

### 📋 Enquiry & Quotation System
- Comprehensive booking enquiry modal with automated unique reference numbers (`YT-YYYY-XXXX`).
- Instant WhatsApp integration with pre-filled message generator.
- No fabricated instant pricing or fake counters: transparent, authentic quotation process tailored to current road permits, tolls, and driver allowances.

### 🛡️ Admin Management Dashboard (`/admin`)
- **Admin Access**: Protected login (`admin` / `Yedeshwari@9767`)
- Real-time customer enquiry review and search.
- Status workflow: `New` ➔ `Contacted` ➔ `Quotation Sent` ➔ `Confirmed` ➔ `Completed` ➔ `Cancelled`.
- Add quotation amounts (₹) and detailed rate breakdown notes.
- One-click WhatsApp communication directly to the customer.
- Fleet manager: Add, edit, delete vehicles, toggle AC options, features, and photos.
- Popular routes manager: Add, edit, and delete routes.
- Company settings: Update phone helpline, official WhatsApp desk number, email, and Kalewadi Pune office address.
- Change admin password directly from the settings panel.

---

## 🚀 Deployment On Any Platform

See the complete step-by-step [Deployment Guide](file:///DEPLOYMENT.md) for detailed instructions:
1. **Render.com** (Recommended Free Tier)
2. **Railway.app**
3. **Hostinger / cPanel** (Node.js Application)
4. **Ubuntu VPS / AWS EC2 / DigitalOcean** (with PM2 & Nginx)
5. **Docker** (`docker build -t yedeshwari . && docker run -p 5000:5000 yedeshwari`)

---

## 💻 Tech Stack
- **Frontend**: React.js 18, Vite, Tailwind CSS, Lucide React Icons, React Router DOM
- **Backend**: Node.js, Express.js, REST API, JWT Authentication, Multer file upload
- **Database**: MySQL 8.0 support (`server/schema.sql`) with resilient auto-initialized fallback adapter

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18+ recommended)
- MySQL 8.0 (optional; if MySQL credentials are not configured, an embedded SQLite database runs out-of-the-box with all seeded vehicles, routes, and services)

### 2. MySQL Configuration (Optional)
If connecting to your local MySQL instance:
1. Open `server/.env`
2. Update:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=yedeshwari_travels
   ```
3. You can also import `server/schema.sql` into MySQL Workbench or command line:
   ```bash
   mysql -u root -p < server/schema.sql
   ```

### 3. Run Application (Single Command)
Run both backend server and client website together with a single command:
```bash
npm run dev
```
Or simply double-click **`start.bat`** on Windows!

- **Website URL**: [http://localhost:5173](http://localhost:5173) (or production port [http://localhost:5000](http://localhost:5000))
- **Admin Portal**: [http://localhost:5173/admin](http://localhost:5173/admin) (Username: `admin` | Password: `admin123`)

---

## 📞 Official Contact & Helpline Numbers
- **Main Mobile & 24x7 Helpline**: **+91 9767224445** (Direct Call & Primary WhatsApp)
- **Official WhatsApp Desk**: **919767224445**
- **Additional Direct Helplines**:
  - **+91 9860451641** (Booking Desk)
  - **+91 9096965271** (Fleet & Operations)
  - **+91 9322112095** (Outstation Inquiries)
- **Head Office**: Swargate / Commercial Center, Pune, Maharashtra 411037
- **Admin Login**: [http://localhost:5173/admin](http://localhost:5173/admin) (`admin` / `admin123`)
