import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Car,
  Bus,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  PhoneCall,
  Send,
  ShieldCheck
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function BookingModal({ isOpen, onClose, preselectedData }) {
  const { settings, getWhatsAppUrl } = useSettings();

  const [formData, setFormData] = useState({
    customer_name: '',
    mobile_number: '',
    email: '',
    pickup_city: 'Pune',
    pickup_address: '',
    destination_city: '',
    destination_address: '',
    start_date: '',
    end_date: '',
    pickup_time: '06:00 AM',
    passenger_count: '17',
    vehicle_category: 'Tempo Travellers',
    seating_capacity: '17 Seater',
    ac_preference: 'AC',
    trip_type: 'Round-Trip',
    trip_purpose: 'Family Tour / Outstation',
    additional_requirements: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmationData, setConfirmationData] = useState(null);

  // Sync preselected data when modal opens
  useEffect(() => {
    if (preselectedData) {
      setFormData(prev => ({
        ...prev,
        vehicle_category: preselectedData.category || prev.vehicle_category,
        seating_capacity: preselectedData.seating_capacity ? `${preselectedData.seating_capacity} Seater` : prev.seating_capacity,
        ac_preference: preselectedData.ac_option === 'Non-AC' ? 'Non-AC' : 'AC',
        destination_city: preselectedData.destination || prev.destination_city,
        pickup_city: preselectedData.origin || prev.pickup_city,
        trip_purpose: preselectedData.purpose || prev.trip_purpose
      }));
    }
  }, [preselectedData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.customer_name.trim()) {
      setErrorMsg('Please enter customer full name.');
      return;
    }
    const cleanPhone = formData.mobile_number.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile phone number.');
      return;
    }
    if (!formData.pickup_city.trim() || !formData.destination_city.trim()) {
      setErrorMsg('Please enter both pickup and destination cities.');
      return;
    }
    if (!formData.start_date) {
      setErrorMsg('Please select your journey start date.');
      return;
    }
    if (parseInt(formData.passenger_count, 10) <= 0) {
      setErrorMsg('Passenger count must be at least 1.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setConfirmationData(data);
      } else {
        setErrorMsg(data.message || 'Failed to submit enquiry. Please call us directly.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or reach our 24x7 desk at ' + settings.phone);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setConfirmationData(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Top Header Bar */}
        <div className="bg-[#0a192f] text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2">
              <Bus className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                Vehicle Rental & Travel Booking Enquiry
              </h3>
            </div>
            <p className="text-xs text-amber-300 mt-0.5">
              Yedeshwari Travels Pune • Transparent Pricing • Verified Chauffeurs
            </p>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {confirmationData ? (
            /* Booking Confirmation Screen */
            <div className="py-6 space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-200">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
                  Booking Enquiry Successfully Registered
                </span>
                <h4 className="text-2xl font-black text-[#0a192f] font-heading">
                  Thank You, {confirmationData.enquiry?.customer_name || formData.customer_name}!
                </h4>
                <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto">
                  Your travel enquiry has been saved and routed to our central fleet manager in Pune.
                </p>
              </div>

              {/* Reference Badge Card */}
              <div className="bg-[#F5F7FA] border border-slate-200 rounded-2xl p-5 max-w-lg mx-auto text-left space-y-3">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-xs text-slate-500 font-medium">Reference Number</span>
                  <span className="text-sm font-black font-mono text-[#0a192f] bg-amber-300 px-3 py-0.5 rounded-md border border-amber-400">
                    {confirmationData.reference_no}
                  </span>
                </div>
                <div className="text-xs space-y-1.5 text-slate-700">
                  <p><strong className="text-slate-900">Route:</strong> {formData.pickup_city} ➔ {formData.destination_city}</p>
                  <p><strong className="text-slate-900">Vehicle:</strong> {formData.vehicle_category} ({formData.seating_capacity}) • {formData.ac_preference}</p>
                  <p><strong className="text-slate-900">Travel Date:</strong> {formData.start_date} {formData.end_date ? `to ${formData.end_date}` : ''}</p>
                  <p><strong className="text-slate-900">Passengers:</strong> {formData.passenger_count} People</p>
                </div>
              </div>

              {/* HEAVY EMPHASIS ON CALLING & DIRECT MOBILE CONTACT */}
              <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-5 max-w-lg mx-auto text-left space-y-4 shadow-lg">
                <div className="flex items-center space-x-2 text-[#0a192f] border-b border-amber-200 pb-2.5">
                  <PhoneCall className="w-5 h-5 text-amber-600 shrink-0 animate-bounce" />
                  <div>
                    <h5 className="text-sm font-black uppercase tracking-wide">
                      Call Us Now For Instant Vehicle Confirmation
                    </h5>
                    <p className="text-[11px] text-slate-600 font-normal">
                      Speak directly with our Pune fleet dispatcher to lock in vehicle availability and best rates.
                    </p>
                  </div>
                </div>

                {/* Main 24x7 Call CTA */}
                <a
                  href="tel:+919767224445"
                  className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 text-base font-black text-[#0a192f] bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-xl shadow-amber-500/30 transition-all font-heading hover:scale-[1.01] active:scale-[0.98]"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>Call Central Desk: +91 9767224445</span>
                </a>

                {/* Direct WhatsApp Callout Action */}
                {confirmationData.whatsapp_link && (
                  <a
                    href={confirmationData.whatsapp_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-xl shadow-md transition-all font-heading"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp (+91 9767224445)</span>
                  </a>
                )}

                {/* Additional Direct Helplines */}
                <div className="pt-2 border-t border-amber-200">
                  <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Direct Department Phone Helplines:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <a
                      href="tel:+919860451641"
                      className="p-2.5 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-center transition-colors shadow-sm block"
                    >
                      <p className="text-[10px] text-slate-500 font-semibold uppercase">Booking Desk</p>
                      <p className="text-xs font-black font-mono text-[#0a192f] mt-0.5">📞 9860451641</p>
                    </a>
                    <a
                      href="tel:+919096965271"
                      className="p-2.5 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-center transition-colors shadow-sm block"
                    >
                      <p className="text-[10px] text-slate-500 font-semibold uppercase">Fleet / Drivers</p>
                      <p className="text-xs font-black font-mono text-[#0a192f] mt-0.5">📞 9096965271</p>
                    </a>
                    <a
                      href="tel:+919322112095"
                      className="p-2.5 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-center transition-colors shadow-sm block"
                    >
                      <p className="text-[10px] text-slate-500 font-semibold uppercase">Outstation Tours</p>
                      <p className="text-xs font-black font-mono text-[#0a192f] mt-0.5">📞 9322112095</p>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 text-left max-w-lg mx-auto">
                <p className="font-semibold text-slate-800 mb-0.5 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1.5 text-amber-600" />
                  What happens next?
                </p>
                <p className="text-[11px] leading-relaxed">
                  This is an official enquiry-based booking. We do not generate artificial instantaneous charges. Our operations coordinator calculates the exact distance, tolls, state road taxes, and driver allowance to deliver the best competitive quotation directly to your phone.
                </p>
              </div>

              <div className="pt-2 max-w-lg mx-auto">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full px-5 py-3 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                >
                  Close & Done
                </button>
              </div>
            </div>
          ) : (
            /* Complete Booking Enquiry Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0 text-red-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Step 1: Customer Contact Info */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-3 flex items-center">
                  <span className="w-5 h-5 rounded-full bg-[#0a192f] text-amber-400 inline-flex items-center justify-center text-[11px] mr-2">1</span>
                  Primary Passenger / Booker Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Customer Full Name *
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      placeholder="e.g. Anand Kulkarni"
                      required
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handleChange}
                      placeholder="10-digit phone"
                      required
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@domain.com"
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Route & Addresses */}
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-3 flex items-center">
                  <span className="w-5 h-5 rounded-full bg-[#0a192f] text-amber-400 inline-flex items-center justify-center text-[11px] mr-2">2</span>
                  Journey Route & Addresses
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pickup City *
                    </label>
                    <input
                      type="text"
                      name="pickup_city"
                      value={formData.pickup_city}
                      onChange={handleChange}
                      placeholder="e.g. Pune"
                      required
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Destination City *
                    </label>
                    <input
                      type="text"
                      name="destination_city"
                      value={formData.destination_city}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai, Goa, Shirdi, Nagpur"
                      required
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Exact Pickup Address / Landmark
                    </label>
                    <input
                      type="text"
                      name="pickup_address"
                      value={formData.pickup_address}
                      onChange={handleChange}
                      placeholder="e.g. Kalewadi / Swargate / Hinjewadi / Airport"
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Destination Address / Hotel
                    </label>
                    <input
                      type="text"
                      name="destination_address"
                      value={formData.destination_address}
                      onChange={handleChange}
                      placeholder="e.g. Calangute Resort / Marriage Hall / MIDC"
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Dates & Timings */}
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-3 flex items-center">
                  <span className="w-5 h-5 rounded-full bg-[#0a192f] text-amber-400 inline-flex items-center justify-center text-[11px] mr-2">3</span>
                  Dates, Time & Trip Format
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Journey Start Date *
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Return Date (If Round-Trip)
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pickup Time
                    </label>
                    <input
                      type="text"
                      name="pickup_time"
                      value={formData.pickup_time}
                      onChange={handleChange}
                      placeholder="e.g. 06:00 AM"
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Trip Format *
                    </label>
                    <select
                      name="trip_type"
                      value={formData.trip_type}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                    >
                      <option value="Round-Trip">Round-Trip</option>
                      <option value="One-Way">One-Way Drop</option>
                      <option value="Multi-Day Tour">Multi-Day Package</option>
                      <option value="Local 8hr/80km">Pune Local (8hr/80km)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 4: Vehicle & Passenger Specifications */}
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-3 flex items-center">
                  <span className="w-5 h-5 rounded-full bg-[#0a192f] text-amber-400 inline-flex items-center justify-center text-[11px] mr-2">4</span>
                  Vehicle & Capacity Choice
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Number of Passengers *
                    </label>
                    <input
                      type="number"
                      name="passenger_count"
                      value={formData.passenger_count}
                      onChange={handleChange}
                      min="1"
                      max="100"
                      required
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Vehicle Category *
                    </label>
                    <select
                      name="vehicle_category"
                      value={formData.vehicle_category}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                    >
                      <option value="Tempo Travellers">Tempo Travellers</option>
                      <option value="Mini Buses">Mini Buses</option>
                      <option value="Large Buses">Large Buses</option>
                      <option value="Luxury Buses">Luxury Buses</option>
                      <option value="Cars">Cars & SUVs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Seating Capacity
                    </label>
                    <select
                      name="seating_capacity"
                      value={formData.seating_capacity}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                    >
                      <option value="4 Seater Sedan">4 Seater (Dzire)</option>
                      <option value="6-7 Seater SUV">6-7 Seater (Innova / Ertiga / Fortuner)</option>
                      <option value="17 Seater">17 Seater Tempo</option>
                      <option value="20 Seater">20 Seater Tempo</option>
                      <option value="26 Seater">26 Seater Bus</option>
                      <option value="32 Seater">32 Seater Bus</option>
                      <option value="35 Seater">35 Seater Bus</option>
                      <option value="40 Seater">40 Seater Bus</option>
                      <option value="45 Seater">45 Seater Bus</option>
                      <option value="50 Seater">50 Seater Bus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Air Conditioning (AC) *
                    </label>
                    <select
                      name="ac_preference"
                      value={formData.ac_preference}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                    >
                      <option value="AC">Full AC</option>
                      <option value="Non-AC">Non-AC</option>
                      <option value="Open to Either">Open to Either</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 5: Purpose & Additional Notes */}
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-3 flex items-center">
                  <span className="w-5 h-5 rounded-full bg-[#0a192f] text-amber-400 inline-flex items-center justify-center text-[11px] mr-2">5</span>
                  Trip Purpose & Special Notes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Trip Purpose *
                    </label>
                    <select
                      name="trip_purpose"
                      value={formData.trip_purpose}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                    >
                      <option value="Wedding & Family Function">Wedding & Family Function</option>
                      <option value="Corporate Offsite / Event">Corporate Offsite / Event</option>
                      <option value="Outstation Holiday / Tourism">Outstation Holiday / Tourism</option>
                      <option value="Pilgrimage / Temple Darshan">Pilgrimage / Temple Darshan</option>
                      <option value="School / College Excursion">School / College Excursion</option>
                      <option value="Airport Transfer">Airport Transfer (Pune / Mumbai)</option>
                      <option value="Other Group Travel">Other Group Travel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Additional Requirements / Instructions
                    </label>
                    <textarea
                      name="additional_requirements"
                      rows="2"
                      value={formData.additional_requirements}
                      onChange={handleChange}
                      placeholder="e.g. Luggage carrier required, multiple pickup points in Pune, night travel, etc."
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submission CTA */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  <p>✔ Free Quotation • Zero Obligation</p>
                  <p className="text-[11px]">Enquiry is saved to our Pune system & sent to admin dashboard.</p>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-bold text-[#0A1E3D] bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all font-heading cursor-pointer disabled:opacity-60"
                  >
                    {submitting ? (
                      <span className="flex items-center">
                        <span className="w-3.5 h-3.5 border-2 border-[#0A1E3D] border-t-transparent rounded-full animate-spin mr-2"></span>
                        Registering Enquiry...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        Submit Vehicle Enquiry
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

