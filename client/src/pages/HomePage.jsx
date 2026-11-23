import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import FleetSection from '../components/FleetSection';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import RoutesSection from '../components/RoutesSection';
import GallerySection from '../components/GallerySection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import BookingModal from '../components/BookingModal';

export default function HomePage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedBookingData, setPreselectedBookingData] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  // Trigger booking modal from any button
  const handleOpenBooking = (customData = null) => {
    setPreselectedBookingData(customData);
    setBookingModalOpen(true);
  };

  const handleSelectVehicleForBooking = (vehicle) => {
    handleOpenBooking({
      category: vehicle.category,
      seating_capacity: vehicle.seating_capacity,
      ac_option: vehicle.ac_option,
      purpose: vehicle.purpose
    });
  };

  const handleSelectServiceForBooking = (serviceTitle) => {
    handleOpenBooking({
      purpose: serviceTitle,
      vehicle_category: serviceTitle.toLowerCase().includes('car') ? 'Cars' : 'Tempo Travellers'
    });
  };

  const handleSelectRouteForBooking = (route) => {
    handleOpenBooking({
      origin: route.origin,
      destination: route.destination,
      purpose: `Trip from ${route.origin} to ${route.destination}`
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      {/* Sticky Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onSelectVehicleCategory={(category) => {
            setActiveCategoryFilter(category);
          }}
        />

        {/* 2. About Us Section */}
        <AboutSection onOpenBooking={() => handleOpenBooking()} />

        {/* 3. Our Fleet Section */}
        <FleetSection
          onSelectVehicleForBooking={handleSelectVehicleForBooking}
          activeCategoryFilter={activeCategoryFilter}
          setActiveCategoryFilter={setActiveCategoryFilter}
        />

        {/* 4. Services Section */}
        <ServicesSection onSelectServiceForBooking={handleSelectServiceForBooking} />

        {/* 5. Why Choose Us Section */}
        <WhyChooseUs onOpenBooking={() => handleOpenBooking()} />

        {/* 6. Popular Routes Section */}
        <RoutesSection onSelectRouteForBooking={handleSelectRouteForBooking} />

        {/* 7. Gallery Section */}
        <GallerySection />

        {/* 8. Testimonials Section */}
        <TestimonialsSection />

        {/* 9. Contact Section */}
        <ContactSection />
      </main>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Booking Enquiry Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedData={preselectedBookingData}
      />

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
}
