import React, { useState } from 'react';
import { Bus, Car, Send, Calendar, Users, MapPin, CheckCircle2, ShieldCheck, Award, Clock, Phone, PhoneCall, MessageSquare } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Hero({ onOpenBooking, onSelectVehicleCategory }) {
  const { settings, getWhatsAppUrl } = useSettings();

  const [formData, setFormData] = useState({
    customer_name: '',
    mobile_number: '',
    pickup_city: 'Pune',
    destination_city: '',
    start_date: '',
    end_date: '',
    passenger_count: '17',
    vehicle_category: 'Tempo Travellers',
    trip_type: 'Round-Trip'
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer_name || !formData.mobile_number || !formData.pickup_city || !formData.destination_city || !formData.start_date) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        customer_name: formData.customer_name,
        mobile_number: formData.mobile_number,
        pickup_city: formData.pickup_city,
        pickup_address: 'Pune Pickup Point',
        destination_city: formData.destination_city,
        destination_address: 'Destination Point',
        start_date: formData.start_date,
        end_date: formData.end_date || formData.start_date,
        passenger_count: parseInt(formData.passenger_count || 1, 10),
        vehicle_category: formData.vehicle_category,
        seating_capacity: `${formData.passenger_count} Seats`,
        ac_preference: 'AC',
        trip_type: formData.trip_type,
        trip_purpose: 'Quick Travel Quote',
        additional_requirements: 'Enquiry from Hero Section'
      };

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setSubmittedRef(data.reference_no);
      } else {
        setErrorMsg(data.message || 'Failed to submit quote request.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please call our 24x7 desk at ' + (settings.phone || '+91 9767224445'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-16 lg:pb-20 bg-gradient-to-b from-[#071324] via-[#0a192f] to-[#0d223f] text-white overflow-hidden">
      {/* Background Highway Texture with Subtle Overlay */}
      <div className="absolute inset-0 z-0 opacity-15">
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Bus"
          className="w-full h-full object-cover object-center filter saturate-125"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Pune's Premier Travel & Bus Rental Service</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-heading">
              Explore Maharashtra & India With <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300">Yedeshwari Travels</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              From comfortable cars to luxury 50-seater coaches, we provide reliable travel solutions for every journey.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap gap-3 sm:gap-4 items-center">
              <button
                onClick={() => {
                  onSelectVehicleCategory && onSelectVehicleCategory('Luxury Buses');
                  const elem = document.querySelector('#fleet');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-bold text-[#0a192f] bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-xl shadow-amber-500/25 transition-all font-heading cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Bus className="w-5 h-5 mr-2 text-[#0a192f]" />
                Book a Bus
              </button>

              <button
                onClick={() => {
                  onSelectVehicleCategory && onSelectVehicleCategory('Cars');
                  const elem = document.querySelector('#fleet');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-bold text-[#0a192f] bg-white hover:bg-slate-100 rounded-xl shadow-lg transition-all font-heading cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Car className="w-5 h-5 mr-2 text-[#0a192f]" />
                Book a Car
              </button>

              <button
                onClick={() => onOpenBooking()}
                className="flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all font-heading cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send className="w-4 h-4 mr-2 text-amber-400" />
                Get a Free Quote
              </button>
            </div>

            {/* Key Trust Pillars */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/15 max-w-xl text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">17 to 50 Seater</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Verified Drivers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">24x7 Support</span>
              </div>
            </div>

            {/* Quick Call Helplines Chip */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="font-semibold text-white">Direct Calling:</span>
              <a href="tel:+919767224445" className="bg-gradient-to-r from-amber-400 to-amber-500 text-[#0a192f] font-bold px-3 py-1 rounded-lg shadow-sm">
                📞 9767224445 (Main)
              </a>
              <a href="tel:+919860451641" className="bg-white/10 hover:bg-white/20 text-slate-200 px-2.5 py-1 rounded-lg font-mono border border-white/15">
                9860451641
              </a>
              <a href="tel:+919096965271" className="bg-white/10 hover:bg-white/20 text-slate-200 px-2.5 py-1 rounded-lg font-mono border border-white/15">
                9096965271
              </a>
              <a href="tel:+919322112095" className="bg-white/10 hover:bg-white/20 text-slate-200 px-2.5 py-1 rounded-lg font-mono border border-white/15">
                9322112095
              </a>
            </div>
          </div>

          {/* Right Clean Form Card with Palette Styling */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border-t-4 border-amber-400 border-x border-b border-slate-200">
              <div className="border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-xl font-bold text-[#0a192f] font-heading">
                  Quick Travel Enquiry
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Get authentic rates for buses, tempo travellers & cars from Pune.
                </p>
              </div>

              {submittedRef ? (
                <div className="py-4 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 mb-1">
                      Enquiry Submitted Successfully
                    </span>
                    <h4 className="text-base font-black text-[#0a192f] font-heading">
                      Reference #{submittedRef}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Your travel request has been logged at our Pune central desk.
                    </p>
                  </div>

                  {/* HIGH-FOCUS CALLING SECTION */}
                  <div className="bg-amber-50/90 border-2 border-amber-400 rounded-2xl p-4 text-left space-y-3 shadow-md">
                    <div className="flex items-center space-x-2 text-[#0a192f]">
                      <PhoneCall className="w-4 h-4 text-amber-600 shrink-0 animate-pulse" />
                      <p className="text-xs font-black uppercase tracking-wide">
                        For Instant Rate & Vehicle Confirmation:
                      </p>
                    </div>

                    {/* Main Priority Call Button */}
                    <a
                      href="tel:+919767224445"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-black text-[#0a192f] bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/25 transition-all font-heading cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Call Central Desk: +91 9767224445</span>
                    </a>

                    {/* WhatsApp Button */}
                    <a
                      href={getWhatsAppUrl(`Hello Yedeshwari Travels, I just submitted enquiry #${submittedRef} for ${formData.vehicle_category} (${formData.pickup_city} to ${formData.destination_city || 'Outstation'}). Please confirm availability & best quote.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-xl shadow transition-all font-heading"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp (+91 9767224445)</span>
                    </a>

                    {/* Additional Helplines Grid */}
                    <div className="pt-2 border-t border-amber-200/80">
                      <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Other Direct Support Lines:
                      </p>
                      <div className="grid grid-cols-1 gap-1.5">
                        <a
                          href="tel:+919860451641"
                          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white hover:bg-amber-100/70 border border-amber-200 text-xs text-slate-800 font-medium transition-colors"
                        >
                          <span className="text-[11px] text-slate-600">Booking Desk</span>
                          <span className="font-bold font-mono text-[#0a192f]">📞 9860451641</span>
                        </a>
                        <a
                          href="tel:+919096965271"
                          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white hover:bg-amber-100/70 border border-amber-200 text-xs text-slate-800 font-medium transition-colors"
                        >
                          <span className="text-[11px] text-slate-600">Fleet & Drivers</span>
                          <span className="font-bold font-mono text-[#0a192f]">📞 9096965271</span>
                        </a>
                        <a
                          href="tel:+919322112095"
                          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white hover:bg-amber-100/70 border border-amber-200 text-xs text-slate-800 font-medium transition-colors"
                        >
                          <span className="text-[11px] text-slate-600">Outstation Tours</span>
                          <span className="font-bold font-mono text-[#0a192f]">📞 9322112095</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRef(null);
                      setFormData({
                        customer_name: '',
                        mobile_number: '',
                        pickup_city: 'Pune',
                        destination_city: '',
                        start_date: '',
                        end_date: '',
                        passenger_count: '17',
                        vehicle_category: 'Tempo Travellers',
                        trip_type: 'Round-Trip'
                      });
                    }}
                    className="block w-full text-xs font-semibold text-slate-500 hover:text-slate-800 pt-1 transition-colors"
                  >
                    ← Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-3.5">
                  {errorMsg && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        required
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        placeholder="10 digit number"
                        required
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Pickup Location *
                      </label>
                      <div className="relative">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        <input
                          type="text"
                          name="pickup_city"
                          value={formData.pickup_city}
                          onChange={handleChange}
                          placeholder="Pune"
                          required
                          className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Destination *
                      </label>
                      <div className="relative">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        <input
                          type="text"
                          name="destination_city"
                          value={formData.destination_city}
                          onChange={handleChange}
                          placeholder="e.g. Mumbai, Goa, Shirdi"
                          required
                          className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Travel Date *
                      </label>
                      <div className="relative">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                        <input
                          type="date"
                          name="start_date"
                          value={formData.start_date}
                          onChange={handleChange}
                          required
                          className="w-full pl-8 pr-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Return Date (Optional)
                      </label>
                      <div className="relative">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                        <input
                          type="date"
                          name="end_date"
                          value={formData.end_date}
                          onChange={handleChange}
                          className="w-full pl-8 pr-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Passengers *
                      </label>
                      <div className="relative">
                        <Users className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        <select
                          name="passenger_count"
                          value={formData.passenger_count}
                          onChange={handleChange}
                          className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                        >
                          <option value="4">1 - 4 Passengers (Sedan)</option>
                          <option value="7">5 - 7 Passengers (Innova / Ertiga)</option>
                          <option value="17">10 - 17 Passengers (Tempo Traveller)</option>
                          <option value="20">18 - 20 Passengers (Mini Bus)</option>
                          <option value="26">21 - 26 Passengers (Mini Bus)</option>
                          <option value="32">27 - 32 Passengers (Coach)</option>
                          <option value="40">33 - 40 Passengers (Large Bus)</option>
                          <option value="50">41 - 50 Passengers (Luxury Bus)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Vehicle Type *
                      </label>
                      <select
                        name="vehicle_category"
                        value={formData.vehicle_category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                      >
                        <option value="Tempo Travellers">Tempo Travellers (17/20 Seater)</option>
                        <option value="Mini Buses">Mini Buses (26/32/35 Seater)</option>
                        <option value="Large Buses">Large Buses (40/45/50 Seater)</option>
                        <option value="Luxury Buses">Luxury Coaches (AC Sleeper/Seater)</option>
                        <option value="Cars">Cars & SUVs (Dzire/Innova/Fortuner)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-2 py-3 px-4 text-xs sm:text-sm font-bold text-[#0a192f] bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/25 transition-all font-heading flex items-center justify-center cursor-pointer disabled:opacity-60"
                  >
                    {submitting ? 'Calculating Quote...' : 'Get Best Travel Quote'}
                  </button>

                  <p className="text-[10px] text-center text-slate-500">
                    🔒 No obligation. Authentic rates based on Pune route distance & state permits.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
