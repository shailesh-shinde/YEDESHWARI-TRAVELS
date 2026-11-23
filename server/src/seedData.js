export const seedSettings = {
  company_name: "Yedeshwari Travels",
  tagline: "Your Journey, Our Responsibility",
  main_location: "Pune, Maharashtra, India",
  phone: "+91 9767224445",
  whatsapp_number: "919767224445",
  additional_phones: "+91 9860451641, +91 9096965271, +91 9322112095",
  email: "bookings@yedeshwaritravels.com",
  office_address: "Near Kalewadi Phata, Kalewadi, Pimpri-Chinchwad, Pune, Maharashtra 411017",
  google_maps_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.428458925232!2d73.7844005!3d18.6009893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9a7106dc479%3A0xc346ec1f79f425ae!2sKalewadi%2C%20Pimpri-Chinchwad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};

export const seedVehicles = [
  // A. Tempo Travellers
  {
    name: "17 Seater Tempo Traveller",
    category: "Tempo Travellers",
    seating_capacity: 17,
    ac_option: "Both AC & Non-AC Available",
    bus_type: "Pushback Luxury Traveller",
    purpose: "Family Tours, Corporate Offsites, Outstation Group Trips, Airport Transfers",
    features: JSON.stringify([
      "1x1 & 2x1 Reclining Luxury Pushback Seats",
      "High Roof AC with Individual Air Vents",
      "Spacious Boot for 15+ Large Luggage Bags",
      "LED Screen & Premium Sound System",
      "USB Mobile Charging at Every Row",
      "Experienced Highway Driver & GPS Tracking"
    ]),
    image_url: "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=1200&q=80",
    badge: "Popular Group Choice",
    is_active: 1
  },
  {
    name: "20 Seater Mini Bus / Traveller",
    category: "Tempo Travellers",
    seating_capacity: 20,
    ac_option: "Both AC & Non-AC Available",
    bus_type: "Executive High-Roof Traveller",
    purpose: "Marriage Functions, Pilgrimage Groups, Pune Sightseeing, Weekend Getaways",
    features: JSON.stringify([
      "Plush 2x1 Recliner Seating Layout",
      "Powerful Dual Air-Conditioning System",
      "Spacious Aisle with Ambient LED Lighting",
      "Rear Boot Space & Overhead Luggage Racks",
      "Clean Sanitized Interiors with Curtains",
      "Emergency Exit & First Aid Kit Equipped"
    ]),
    image_url: "https://images.unsplash.com/photo-1656426650699-a76ffe479608?auto=format&fit=crop&w=1200&q=80",
    badge: "Family Favorite",
    is_active: 1
  },

  // B. Mini Buses
  {
    name: "26 Seater Mini Bus",
    category: "Mini Buses",
    seating_capacity: 26,
    ac_option: "Both AC & Non-AC Available",
    bus_type: "Deluxe Coach",
    purpose: "Corporate Events, Wedding Guest Transit, College Excursions, Ashtavinayak Darshan",
    features: JSON.stringify([
      "2x2 High-Back Comfort Pushback Seats",
      "Full Cabin Air-Conditioning with Roof Ducts",
      "PA System with Mic for Tour Guides",
      "Generous Underfloor Luggage Compartments",
      "Wide Panoramic Windows for Scenic Views",
      "Smooth Air-Suspension Ride"
    ]),
    image_url: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80",
    badge: "Corporate Favorite",
    is_active: 1
  },
  {
    name: "32 Seater Bus",
    category: "Mini Buses",
    seating_capacity: 32,
    ac_option: "Both AC & Non-AC Available",
    bus_type: "Executive Mini Coach",
    purpose: "Industrial Visits, Wedding Baraat, Sports Teams, Interstate Tours",
    features: JSON.stringify([
      "2x2 Ergonomic Pushback Seats with Armrests",
      "Chilled Dual AC with Climate Control",
      "HD Entertainment Display with Mic",
      "Expansive Dedicated Luggage Belly",
      "Speed Governor & GPS Tracking",
      "Verified Uniformed Drivers"
    ]),
    image_url: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=1200&q=80",
    badge: "Spacious & Reliable",
    is_active: 1
  },
  {
    name: "35 Seater Bus",
    category: "Mini Buses",
    seating_capacity: 35,
    ac_option: "Both AC & Non-AC Available",
    bus_type: "Deluxe Passenger Bus",
    purpose: "Corporate Picnics, Large Family Gatherings, Pilgrimage Tours, Outstation Trips",
    features: JSON.stringify([
      "2x2 Comfort Cushion Seats with Footrests",
      "Front & Rear Separate Air Conditioners",
      "Full Music System & Bluetooth Connectivity",
      "Extra Large Luggage Space for 35 Passengers",
      "Curtains & Sun-Protected Tinted Windows",
      "Fire Extinguisher & First-Aid Onboard"
    ]),
    image_url: "https://images.unsplash.com/photo-1469285994282-454ceb49e63c?auto=format&fit=crop&w=1200&q=80",
    badge: "All-Rounder",
    is_active: 1
  },

  // C. Large Buses
  {
    name: "40 Seater Bus",
    category: "Large Buses",
    seating_capacity: 40,
    ac_option: "Both AC & Non-AC Available",
    bus_type: "Luxury Intercity Coach",
    purpose: "School / College Tours, Employee Shuttles, Destination Weddings, Konkan Trips",
    features: JSON.stringify([
      "Spacious 2x2 Reclining Pushback Seats",
      "Powerful Industrial Air Conditioning",
      "High-Deck Elevated Road View",
      "Belly Luggage Compartment for 50+ Bags",
      "Stereo Sound System with Video Player",
      "Certified Long-Distance Highway Captains"
    ]),
    image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    badge: "Group Touring",
    is_active: 1
  },
  {
    name: "45 Seater Bus",
    category: "Large Buses",
    seating_capacity: 45,
    ac_option: "Both AC & Non-AC Available",
    bus_type: "Tourist Coach",
    purpose: "All India Pilgrimage, Grand Weddings, Corporate Annual Meets, University Trips",
    features: JSON.stringify([
      "Air-Suspension for Zero Road Fatigue",
      "Individual Reading Lights & USB Charging",
      "Large Storage Luggage Bays on Both Sides",
      "Clean Seat Covers & Professional Ambiance",
      "National Permit for Seamless Inter-State Travel",
      "24x7 Roadside Assistance Protocol"
    ]),
    image_url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    badge: "High Capacity",
    is_active: 1
  },
  {
    name: "50 Seater Luxury Bus",
    category: "Large Buses",
    seating_capacity: 50,
    ac_option: "Both AC & Non-AC Available",
    bus_type: "Grand Luxury Coach",
    purpose: "Large Group Conventions, Destination Marriages, National Yatras, Factory Transport",
    features: JSON.stringify([
      "Premium 2x2 Pushback Seater Architecture",
      "Full Climate Control AC with Air Purification",
      "Heavy Duty Cargo Hold for Bulk Baggage",
      "Full Audio-Visual Entertainment System",
      "Anti-Lock Braking (ABS) & Retarder Safety",
      "Punctual Scheduled Departure & Drops"
    ]),
    image_url: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=1200&q=80",
    badge: "Maximum Capacity",
    is_active: 1
  },

  // D. Luxury Buses
  {
    name: "AC Luxury Multi-Axle Coach",
    category: "Luxury Buses",
    seating_capacity: 50,
    ac_option: "AC",
    bus_type: "Luxury Multi-Axle Coach",
    purpose: "Executive Corporate Travel, VIP Delegation, Long-Distance Premium Outstation",
    features: JSON.stringify([
      "Ultra-Plush Ergonomic Leatherette Recliners",
      "Multi-Axle Air Suspension for Gliding Comfort",
      "Individual Air Vents & Fast USB Charging Ports",
      "Silent Cabin Insulation with Low NVH Levels",
      "Panoramic UV-Protected Windows",
      "Two Professional Drivers for Interstate Routes"
    ]),
    image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    badge: "Ultra Premium",
    is_active: 1
  },
  {
    name: "Luxury AC Sleeper Coach",
    category: "Luxury Buses",
    seating_capacity: 32,
    ac_option: "AC",
    bus_type: "Sleeper Coach",
    purpose: "Overnight Journeys (Pune to Goa, Indore, Hyderabad, Bengaluru, Udaipur)",
    features: JSON.stringify([
      "Upper & Lower 2x1 Private Sleeper Berths",
      "Soft Cushioned Mattresses with Fresh Bed Linen",
      "Personal Privacy Curtains & Night Reading Lamp",
      "Dedicated Charging Socket in Every Berth",
      "Spacious Under-Chassis Baggage Vault",
      "Smooth Highway Cruising with Air Suspension"
    ]),
    image_url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    badge: "Overnight Comfort",
    is_active: 1
  },
  {
    name: "Pushback Seater Deluxe Luxury Coach",
    category: "Luxury Buses",
    seating_capacity: 45,
    ac_option: "Both AC & Non-AC Available",
    bus_type: "Pushback Seater Coach",
    purpose: "Wedding Escorts, Corporate Offsites, Hill Station Tours (Mahabaleshwar, Lonavala)",
    features: JSON.stringify([
      "Deep 140-Degree Reclining Pushback Seats",
      "Wide Calf & Foot Rests for Leg Relaxing",
      "Stereo Music System & PA Microphone",
      "Overhead Cabin Baggage + Rear Cargo Bay",
      "Non-Smoking, Spotlessly Sanitized Interiors",
      "Experienced Mountain & Highway Chauffeurs"
    ]),
    image_url: "https://images.unsplash.com/photo-1469285994282-454ceb49e63c?auto=format&fit=crop&w=1200&q=80",
    badge: "Best Seller",
    is_active: 1
  },
  {
    name: "Non-AC Tourist Coach",
    category: "Luxury Buses",
    seating_capacity: 45,
    ac_option: "Non-AC",
    bus_type: "Economy Group Coach",
    purpose: "Budget Group Travel, School Picnics, Short Pilgrimage Tours, Local Gatherings",
    features: JSON.stringify([
      "Comfortable High-Back Seating Layout",
      "Wide Openable Windows for Natural Cross Ventilation",
      "Heavy Luggage Carrier Capacity",
      "Economic Pricing for Large Gatherings",
      "Regularly Serviced & Mechanically Sound",
      "Trained Polite Commercial Drivers"
    ]),
    image_url: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80",
    badge: "Budget Friendly",
    is_active: 1
  },

  // E. Cars & SUVs
  {
    name: "Maruti Swift Dzire",
    category: "Cars",
    seating_capacity: 4,
    ac_option: "AC",
    bus_type: "Sedan Car",
    purpose: "Pune to Mumbai Airport, Business Day Trips, City Hire, Couples & Small Families",
    features: JSON.stringify([
      "4+1 Seating with Comfortable Legroom",
      "Boot Space for 2 Large & 2 Small Bags",
      "Chilled Air-Conditioning & Clean Cab",
      "Fuel Efficient & High Reliability",
      "Polite Chauffeur with GPS Navigation",
      "Toll Fastag Ready"
    ]),
    image_url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    badge: "Economical Sedan",
    is_active: 1
  },
  {
    name: "Maruti Suzuki Ertiga",
    category: "Cars",
    seating_capacity: 6,
    ac_option: "AC",
    bus_type: "MUV / Family Car",
    purpose: "Family Weekend Getaways, Lonavala Trips, Airport Transfers, Outstation Dropping",
    features: JSON.stringify([
      "6+1 Flexible 3-Row Seating Configuration",
      "Roof-Mounted Rear AC Vents for 2nd & 3rd Row",
      "Foldable Rear Seats for Extra Luggage",
      "Smooth Suspension on Indian Roads",
      "Music System & Phone Charging Ports",
      "Courteous Well-Groomed Driver"
    ]),
    image_url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    badge: "Family MUV",
    is_active: 1
  },
  {
    name: "Kia Carens",
    category: "Cars",
    seating_capacity: 6,
    ac_option: "AC",
    bus_type: "Premium MUV",
    purpose: "Corporate Delegates, Long-Distance Family Tours, VIP City Movements",
    features: JSON.stringify([
      "6+1 Premium Ergonomic Interior Seating",
      "Multi-Zone Automatic Climate Control",
      "Type-C Fast Charging in All 3 Rows",
      "Acoustic Glass for Silent Cabin Feel",
      "Spacious Luggage Handling with Carrier Option",
      "Advanced Safety Features (6 Airbags Standard)"
    ]),
    image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    badge: "Executive Comfort",
    is_active: 1
  },
  {
    name: "Toyota Innova Crysta",
    category: "Cars",
    seating_capacity: 7,
    ac_option: "AC",
    bus_type: "Luxury SUV / MUV",
    purpose: "Executive Corporate Travel, Long Distance Maharashtra & All India Tours, VIP Guesting",
    features: JSON.stringify([
      "Captain Seats with Middle Row Recline",
      "Powerful Dual Air Conditioning",
      "Unmatched Highway Ride Stability & Safety",
      "Large Boot with Roof-Luggage Carrier Available",
      "Punctual 24x7 Chauffeur Service",
      "Gold Standard in Indian Highway Comfort"
    ]),
    image_url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    badge: "Highway Champion",
    is_active: 1
  },
  {
    name: "Toyota Fortuner",
    category: "Cars",
    seating_capacity: 7,
    ac_option: "AC",
    bus_type: "Luxury SUV",
    purpose: "Wedding Groom Convoy, VIP Escorts, High-Profile Business Delegates, Luxury Travel",
    features: JSON.stringify([
      "Commanding Road Presence & Robust 4x4",
      "Luxurious Leather Interiors with Mood Lights",
      "Dual-Zone Climate Control AC",
      "Heavy Duty Luggage Capacity",
      "Professional Chauffeur in Formal Attire",
      "Prestige & Utmost Highway Safety"
    ]),
    image_url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    badge: "VIP Luxury SUV",
    is_active: 1
  }
];

export const seedServices = [
  {
    title: "Local Pune Transportation",
    description: "Reliable 8hr/80km or full-day city rental packages in Pune. Ideal for shopping, family visits, business meetings, and local sightseeing.",
    features: "Punctual pickups, Well-maintained fleet, Verified drivers, Fixed transparent quotes",
    icon: "Navigation"
  },
  {
    title: "Maharashtra Outstation Travel",
    description: "Intercity bus and car rentals from Pune to every district in Maharashtra including Mumbai, Nashik, Kolhapur, Sambhajinagar, and Konkan.",
    features: "Highway experienced chauffeurs, Clean sanitized cabs, All permit clearances, 24x7 on-call support",
    icon: "MapPin"
  },
  {
    title: "All India Bus Rental",
    description: "Pan-India bus and luxury coach rentals with valid All-India Tourist Permits. Travel comfortably from Pune to Goa, Karnataka, Gujarat, and beyond.",
    features: "National permit compliance, Dual highway drivers, High baggage capacity, Emergency backup",
    icon: "Globe"
  },
  {
    title: "Wedding Bus Booking",
    description: "Seamless guest logistics for grand weddings. From luxury Tempo Travellers for immediate family to 50-seater coaches for wedding Baraat.",
    features: "Coordinated convoys, Groom Fortuner SUV, Decorated vehicles on request, On-time venue drops",
    icon: "HeartHandshake"
  },
  {
    title: "Corporate Transportation",
    description: "Dedicated daily employee transport solutions, executive car hire for business delegates, and luxury coaches for corporate offsites and conferences.",
    features: "Monthly corporate contracts, GST billing, GPS live tracking, Professional corporate etiquette",
    icon: "Briefcase"
  },
  {
    title: "School and College Trips",
    description: "Safe, vetted, and comfortable transportation for student educational excursions, university industrial visits, and sports meet journeys.",
    features: "Speed governors installed, Speed limits respected, First-aid equipped, Dedicated conductors",
    icon: "GraduationCap"
  },
  {
    title: "Family and Group Tours",
    description: "Customized holiday packages for family reunions, friends' getaways, and spiritual yatras (Ashtavinayak, Jyotirlinga, Shirdi, Pandharpur).",
    features: "Flexible stopping for snacks/photos, Tailored itineraries, Child-friendly assistance, Room for luggage",
    icon: "Users"
  },
  {
    title: "Airport Pickup and Drop",
    description: "Guaranteed on-time airport transfers between Pune and Pune Airport (PNQ) as well as Mumbai Chhatrapati Shivaji Maharaj Airport (BOM / T2).",
    features: "Flight tracking for delays, Zero cancellation guarantee, Meet & greet service, Generous luggage space",
    icon: "Plane"
  },
  {
    title: "One-Way and Round-Trip Travel",
    description: "Pay only for what you travel with our flexible one-way drop services or multi-day round-trip touring packages with zero hidden costs.",
    features: "No return fare on select one-ways, Customized multi-day hire, Transparent toll calculations, Clean invoices",
    icon: "Repeat"
  },
  {
    title: "Tempo Traveller Rental",
    description: "Modern 17-seater and 20-seater Force Tempo Travellers with pushback seats, dual AC, high roof, and entertainment systems for medium groups.",
    features: "1x1 and 2x1 luxury configurations, Air suspension feel, Ample luggage booth, Chilled air conditioning",
    icon: "Bus"
  },
  {
    title: "Luxury Bus Rental",
    description: "Premier fleet of AC Volvo, Scania, Multi-Axle, Sleeper, and Pushback luxury coaches ranging from 26 to 50 seats for superior comfort.",
    features: "Air-cushion suspension, Sleeper berths, Leather recliners, Full entertainment system",
    icon: "ShieldCheck"
  },
  {
    title: "Car Rental Services",
    description: "Wide spectrum of sedans, family MPVs, and premium SUVs (Swift Dzire, Ertiga, Innova Crysta, Carens, Fortuner) with experienced chauffeurs.",
    features: "Sedan to 4x4 SUVs, Non-smoking clean interiors, Sanitized cabs, Round-the-clock availability",
    icon: "Car"
  }
];

export const seedRoutes = [
  // Maharashtra Routes
  {
    origin: "Pune",
    destination: "Mumbai",
    region: "Maharashtra",
    distance_km: 150,
    duration_hrs: "3.5 Hours",
    popular_for: "Business, International Airport & Family Outings",
    recommended_vehicles: "Dzire, Innova Crysta, 17-Seater Traveller, Luxury Coach",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Nashik",
    region: "Maharashtra",
    distance_km: 210,
    duration_hrs: "5.0 Hours",
    popular_for: "Trimbakeshwar Temple, Vineyards & Business",
    recommended_vehicles: "Ertiga, Innova Crysta, 26-Seater Mini Bus",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Nagpur",
    region: "Maharashtra",
    distance_km: 710,
    duration_hrs: "12 Hours (via Samruddhi)",
    popular_for: "Commercial Hub, Wildlife & Medical Visits",
    recommended_vehicles: "Luxury Sleeper Coach, Innova Crysta, 45-Seater Bus",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Sambhajinagar (Aurangabad)",
    region: "Maharashtra",
    distance_km: 235,
    duration_hrs: "5.0 Hours",
    popular_for: "Ajanta & Ellora Caves, Grishneshwar, Industrial",
    recommended_vehicles: "17-Seater Traveller, Innova Crysta, 32-Seater Bus",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Kolhapur",
    region: "Maharashtra",
    distance_km: 235,
    duration_hrs: "4.5 Hours",
    popular_for: "Mahalakshmi Temple, Forts & Food Tours",
    recommended_vehicles: "Dzire, Innova Crysta, 20-Seater Traveller",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Satara",
    region: "Maharashtra",
    distance_km: 115,
    duration_hrs: "2.5 Hours",
    popular_for: "Kaas Plateau Flower Valley, Ajinkyatara & Forts",
    recommended_vehicles: "Sedans, Ertiga, 17-Seater Traveller",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Sangli",
    region: "Maharashtra",
    distance_km: 230,
    duration_hrs: "5.0 Hours",
    popular_for: "Agricultural Business, Ganpati Temple & Family Tours",
    recommended_vehicles: "Innova Crysta, 26-Seater Bus, Tempo Traveller",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Solapur",
    region: "Maharashtra",
    distance_km: 255,
    duration_hrs: "5.0 Hours",
    popular_for: "Siddheshwar Temple, Textile Market, Pandharpur",
    recommended_vehicles: "17-Seater Traveller, 35-Seater Bus, Innova Crysta",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Latur",
    region: "Maharashtra",
    distance_km: 335,
    duration_hrs: "7.0 Hours",
    popular_for: "Educational Hub, Business & Family Functions",
    recommended_vehicles: "Innova Crysta, Luxury Sleeper Bus, Tempo Traveller",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Dharashiv",
    region: "Maharashtra",
    distance_km: 280,
    duration_hrs: "6.0 Hours",
    popular_for: "Tuljapur Bhavani Temple & Historical Sites",
    recommended_vehicles: "17-Seater Traveller, 32-Seater Bus, Innova Crysta",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Beed",
    region: "Maharashtra",
    distance_km: 250,
    duration_hrs: "5.5 Hours",
    popular_for: "Parli Vaijnath Jyotirlinga & Commercial Trips",
    recommended_vehicles: "Innova Crysta, 26-Seater Bus, Ertiga",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Ahilyanagar",
    region: "Maharashtra",
    distance_km: 125,
    duration_hrs: "3.0 Hours",
    popular_for: "Historical Forts, Shirdi En-Route & Business",
    recommended_vehicles: "Dzire, Ertiga, 20-Seater Traveller",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Ratnagiri",
    region: "Maharashtra",
    distance_km: 305,
    duration_hrs: "7.0 Hours",
    popular_for: "Konkan Beaches, Alphonso Mango Farms, Ganpatipule",
    recommended_vehicles: "Innova Crysta, 17-Seater Traveller, 32-Seater Coach",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Chhatrapati Sambhajinagar",
    region: "Maharashtra",
    distance_km: 235,
    duration_hrs: "5.0 Hours",
    popular_for: "Heritage Tourism, UNESCO Heritage Sites, Industrial MIDC",
    recommended_vehicles: "Innova Crysta, Luxury Bus, 20-Seater Traveller",
    is_popular: 1
  },

  // All India Routes
  {
    origin: "Pune",
    destination: "Goa",
    region: "All India",
    distance_km: 450,
    duration_hrs: "9.0 Hours",
    popular_for: "Beaches, Group Holidays, Destination Weddings & Nightlife",
    recommended_vehicles: "Luxury AC Sleeper Coach, Innova Crysta, 26-Seater Coach",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Hyderabad",
    region: "All India",
    distance_km: 560,
    duration_hrs: "10 Hours",
    popular_for: "IT Hub, Charminar, Ramoji Film City & Weddings",
    recommended_vehicles: "Luxury Sleeper Coach, 50-Seater Bus, Innova Crysta",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Bengaluru",
    region: "All India",
    distance_km: 840,
    duration_hrs: "14 Hours",
    popular_for: "Tech Capital, Corporate Relocations & Family Meets",
    recommended_vehicles: "Multi-Axle AC Luxury Coach, Innova Crysta",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Chennai",
    region: "All India",
    distance_km: 1180,
    duration_hrs: "20 Hours",
    popular_for: "Automobile Corridors, Temples & Coastal Touring",
    recommended_vehicles: "Luxury Sleeper Coach, 45-Seater Bus",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Delhi",
    region: "All India",
    distance_km: 1450,
    duration_hrs: "24 Hours",
    popular_for: "National Capital, Heritage & All India Grand Convoys",
    recommended_vehicles: "Multi-Axle Volvo Coach, Luxury Sleeper",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Indore",
    region: "All India",
    distance_km: 590,
    duration_hrs: "11 Hours",
    popular_for: "Food Tourism, Ujjain Mahakal Darshan & Commercial",
    recommended_vehicles: "Innova Crysta, Luxury Sleeper Coach, 20-Seater Traveller",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Bhopal",
    region: "All India",
    distance_km: 780,
    duration_hrs: "14 Hours",
    popular_for: "City of Lakes, Sanchi Stupa & State Government Meets",
    recommended_vehicles: "Luxury Sleeper Bus, 40-Seater Coach",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Ahmedabad",
    region: "All India",
    distance_km: 660,
    duration_hrs: "12 Hours",
    popular_for: "Business, Diamond & Textile Hubs, Statue of Unity",
    recommended_vehicles: "Innova Crysta, 50-Seater Coach, Sleeper Bus",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Surat",
    region: "All India",
    distance_km: 410,
    duration_hrs: "7.5 Hours",
    popular_for: "Textile Market, Wedding Shopping & Business Conclaves",
    recommended_vehicles: "Innova Crysta, 26-Seater Mini Bus, Dzire",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Jaipur",
    region: "All India",
    distance_km: 1180,
    duration_hrs: "21 Hours",
    popular_for: "Royal Heritage, Pink City Palaces & Royal Weddings",
    recommended_vehicles: "Luxury Sleeper Coach, Multi-Axle Bus",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Udaipur",
    region: "All India",
    distance_km: 870,
    duration_hrs: "15 Hours",
    popular_for: "Lake City, Heritage Marriages & Family Vacations",
    recommended_vehicles: "Innova Crysta, AC Sleeper Coach, 20-Seater Traveller",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Varanasi",
    region: "All India",
    distance_km: 1480,
    duration_hrs: "26 Hours",
    popular_for: "Kashi Vishwanath Yatra & Sacred Ganga Snan Pilgrimage",
    recommended_vehicles: "Luxury 50-Seater Coach, Multi-Axle Sleeper Bus",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Tirupati",
    region: "All India",
    distance_km: 920,
    duration_hrs: "16 Hours",
    popular_for: "Lord Balaji Darshan, Family Vow Trips & Devotional Tours",
    recommended_vehicles: "32-Seater Coach, 20-Seater Traveller, Sleeper Bus",
    is_popular: 1
  },
  {
    origin: "Pune",
    destination: "Shirdi",
    region: "All India",
    distance_km: 200,
    duration_hrs: "4.5 Hours",
    popular_for: "Sai Baba Samadhi Mandir & Shani Shingnapur Darshan",
    recommended_vehicles: "Dzire, Ertiga, Innova Crysta, 17/26-Seater Bus",
    is_popular: 1
  }
];

export const seedGallery = [
  {
    title: "50-Seater Luxury Multi-Axle Coach",
    category: "Buses",
    image_url: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=1200&q=80",
    description: "Premium intercity coach cruising comfortably across Maharashtra highways."
  },
  {
    title: "17-Seater Luxury Tempo Traveller",
    category: "Tempo Travellers",
    image_url: "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=1200&q=80",
    description: "Executive interior layout with recliner pushback seating and dual AC."
  },
  {
    title: "Toyota Innova Crysta Fleet",
    category: "Cars",
    image_url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    description: "Immaculately maintained captain-seat Innova Crysta ready for outstation journeys."
  },
  {
    title: "Grand Wedding Guest Convoy",
    category: "Weddings",
    image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    description: "Decorated fleet of luxury buses and SUVs coordinated for a destination wedding."
  },
  {
    title: "Corporate Offsite Transit",
    category: "Corporate",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "Executive transportation for multinational IT staff offsite in Pune."
  },
  {
    title: "Mahabaleshwar & Western Ghats Tour",
    category: "Tours",
    image_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    description: "Scenic family tour travelling through lush ghats in our air-conditioned coach."
  },
  {
    title: "Executive 32-Seater Mini Coach",
    category: "Buses",
    image_url: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=1200&q=80",
    description: "Clean sanitized passenger coach prepared for industrial visit."
  },
  {
    title: "Toyota Fortuner VIP Escort",
    category: "Cars",
    image_url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    description: "Flagship luxury 4x4 SUV for executive transfers and wedding parties."
  }
];

export const seedTestimonials = [
  {
    name: "Rajesh Kulkarni",
    location: "Kothrud, Pune",
    service_used: "26-Seater Mini Bus for Wedding",
    rating: 5,
    review: "Hired a 26-seater bus for our daughter's marriage from Pune to Kolhapur. The bus was spotless, air conditioning was fantastic, and the driver was extremely polite and careful on the ghats. Highly recommended!",
    is_sample: 1,
    is_approved: 1
  },
  {
    name: "Sunita Deshmukh",
    location: "Baner, Pune",
    service_used: "17-Seater Tempo Traveller for Family Tour",
    rating: 5,
    review: "We booked a 17-seater Tempo Traveller for an Ashtavinayak pilgrimage. The vehicle arrived 15 minutes before time, the pushback seats were super comfortable for our senior family members, and the booking enquiry process was straightforward.",
    is_sample: 1,
    is_approved: 1
  },
  {
    name: "Amitabh Sen",
    location: "Hinjawadi IT Park, Pune",
    service_used: "Corporate Offsite Transport (50-Seater Bus)",
    rating: 5,
    review: "Yedeshwari Travels managed our 120-employee team offsite transport to Lonavala flawlessly with three 45-seater coaches. Timely coordination, GST billing, and professional highway chauffeurs.",
    is_sample: 1,
    is_approved: 1
  },
  {
    name: "Vikram Patil",
    location: "Hadapsar, Pune",
    service_used: "Innova Crysta - Pune to Mumbai Airport Drop",
    rating: 5,
    review: "Early morning 3:30 AM pickup from Hadapsar to Mumbai International Airport. The driver was already parked at our society gate at 3:15 AM. Smooth drive and no rush. Truly 'Your Journey, Our Responsibility'.",
    is_sample: 1,
    is_approved: 1
  }
];
