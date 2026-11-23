-- Yedeshwari Travels MySQL Schema
CREATE DATABASE IF NOT EXISTS `yedeshwari_travels` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `yedeshwari_travels`;

-- Settings Table
CREATE TABLE IF NOT EXISTS `settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `company_name` VARCHAR(150) NOT NULL DEFAULT 'Yedeshwari Travels',
  `tagline` VARCHAR(255) NOT NULL DEFAULT 'Your Journey, Our Responsibility',
  `main_location` VARCHAR(150) NOT NULL DEFAULT 'Pune, Maharashtra, India',
  `phone` VARCHAR(50) NOT NULL DEFAULT '+91 9767224445',
  `whatsapp_number` VARCHAR(50) NOT NULL DEFAULT '919767224445',
  `additional_phones` VARCHAR(255) NOT NULL DEFAULT '+91 9860451641, +91 9096965271, +91 9322112095',
  `email` VARCHAR(100) NOT NULL DEFAULT 'contact@yedeshwaritravels.com',
  `office_address` TEXT NOT NULL,
  `google_maps_embed` TEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Vehicles Table
CREATE TABLE IF NOT EXISTS `vehicles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) NOT NULL, -- 'Tempo Travellers', 'Mini Buses', 'Large Buses', 'Luxury Buses', 'Cars'
  `seating_capacity` INT NOT NULL,
  `ac_option` VARCHAR(50) NOT NULL, -- 'AC', 'Non-AC', 'Both AC & Non-AC Available'
  `bus_type` VARCHAR(100) NOT NULL, -- 'Pushback Seater', 'Sleeper Coach', 'Luxury Coach', 'SUV', 'Sedan'
  `purpose` TEXT NOT NULL,
  `features` TEXT NOT NULL, -- JSON or comma separated string
  `image_url` TEXT NOT NULL,
  `badge` VARCHAR(50) DEFAULT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Routes Table
CREATE TABLE IF NOT EXISTS `routes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `origin` VARCHAR(100) NOT NULL DEFAULT 'Pune',
  `destination` VARCHAR(100) NOT NULL,
  `region` VARCHAR(50) NOT NULL, -- 'Maharashtra', 'All India'
  `distance_km` INT NOT NULL,
  `duration_hrs` VARCHAR(50) NOT NULL,
  `popular_for` VARCHAR(255) NOT NULL,
  `recommended_vehicles` VARCHAR(255) NOT NULL,
  `is_popular` TINYINT(1) DEFAULT 1
);

-- Services Table
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `description` TEXT NOT NULL,
  `features` TEXT NOT NULL,
  `icon` VARCHAR(50) NOT NULL
);

-- Enquiries Table
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `reference_no` VARCHAR(50) NOT NULL UNIQUE,
  `customer_name` VARCHAR(150) NOT NULL,
  `mobile_number` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `pickup_city` VARCHAR(100) NOT NULL,
  `pickup_address` TEXT,
  `destination_city` VARCHAR(100) NOT NULL,
  `destination_address` TEXT,
  `start_date` DATE NOT NULL,
  `end_date` DATE DEFAULT NULL,
  `pickup_time` VARCHAR(20) DEFAULT NULL,
  `passenger_count` INT NOT NULL,
  `vehicle_category` VARCHAR(50) NOT NULL,
  `seating_capacity` VARCHAR(50) DEFAULT NULL,
  `ac_preference` VARCHAR(50) NOT NULL,
  `trip_type` VARCHAR(50) NOT NULL DEFAULT 'Round-Trip',
  `trip_purpose` VARCHAR(100) NOT NULL,
  `additional_requirements` TEXT,
  `status` VARCHAR(50) NOT NULL DEFAULT 'New', -- 'New', 'Contacted', 'Quotation Sent', 'Confirmed', 'Completed', 'Cancelled'
  `quotation_amount` DECIMAL(10,2) DEFAULT NULL,
  `quotation_notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Gallery Table
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `image_url` TEXT NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `service_used` VARCHAR(150) NOT NULL,
  `rating` INT NOT NULL DEFAULT 5,
  `review` TEXT NOT NULL,
  `is_sample` TINYINT(1) DEFAULT 1,
  `is_approved` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
