import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    company_name: 'Yedeshwari Travels',
    tagline: 'Your Journey, Our Responsibility',
    main_location: 'Pune, Maharashtra, India',
    phone: '+91 9767224445',
    whatsapp_number: '919767224445',
    additional_phones: '+91 9860451641, +91 9096965271, +91 9322112095',
    email: 'bookings@yedeshwaritravels.com',
    office_address: 'Near Kalewadi Phata, Kalewadi, Pimpri-Chinchwad, Pune, Maharashtra 411017',
    google_maps_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.428458925232!2d73.7844005!3d18.6009893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9a7106dc479%3A0xc346ec1f79f425ae!2sKalewadi%2C%20Pimpri-Chinchwad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.warn('Using default settings fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // WhatsApp generator helper
  const getWhatsAppUrl = (customText = '') => {
    const cleanNumber = String(settings.whatsapp_number || '919767224445').replace(/\D/g, '');
    const defaultText = `Hello Yedeshwari Travels, I would like to enquire about vehicle rental and bus booking from Pune.`;
    const message = customText || defaultText;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };

  // Helper to get all contact numbers as a clean array
  const getPhoneList = () => {
    const mainPhone = settings.phone || '+91 9767224445';
    const list = [{ number: mainPhone, label: 'Main Helpline & WhatsApp', isPrimary: true }];
    if (settings.additional_phones) {
      const extras = settings.additional_phones.split(',').map(s => s.trim()).filter(Boolean);
      extras.forEach((num, idx) => {
        const labels = ['Booking Desk', 'Fleet & Operations', 'Customer Support'];
        list.push({
          number: num,
          label: labels[idx] || 'Support Line',
          isPrimary: false
        });
      });
    }
    return list;
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings, getWhatsAppUrl, getPhoneList }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
