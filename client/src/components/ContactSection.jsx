import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle2, Clock, Shield } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function ContactSection() {
  const { settings, getWhatsAppUrl } = useSettings();

  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Travel Inquiry',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: contactForm.name,
          mobile_number: contactForm.phone,
          email: contactForm.email,
          pickup_city: 'Pune',
          destination_city: 'General Contact Form',
          start_date: new Date().toISOString().split('T')[0],
          passenger_count: 1,
          vehicle_category: 'Contact Form Message',
          ac_preference: 'AC',
          trip_type: 'General',
          trip_purpose: contactForm.subject,
          additional_requirements: contactForm.message
        })
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 text-amber-500 text-xs font-bold tracking-wider uppercase mb-2 border border-slate-200">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>Connect With Our Pune Office</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a192f] font-heading tracking-tight">
            Contact Yedeshwari Travels
          </h2>
          <div className="w-16 h-1 bg-[#0a192f] mx-auto my-3 rounded-full"></div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Have questions about group bus rentals, car hire rates, or outstation state permits? Our Pune travel team is at your service 24x7.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Maps */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-[#0a192f] text-white p-6 sm:p-7 rounded-3xl shadow-2xl border border-amber-400/20 space-y-5">
              <div className="border-b border-white/15 pb-4">
                <h3 className="text-xl font-bold font-heading text-white">
                  {settings.company_name || 'Yedeshwari Travels'}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {settings.tagline || 'Your Journey, Our Responsibility'}
                </p>
              </div>

              {/* Office Address */}
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0 text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Office Address
                  </h4>
                  <p className="text-xs sm:text-sm text-white mt-0.5 leading-relaxed">
                    {settings.office_address}
                  </p>
                  <p className="text-[11px] text-slate-300 font-semibold mt-0.5">
                    Main Location: {settings.main_location}
                  </p>
                </div>
              </div>

              {/* Main Mobile, WhatsApp & Helpline */}
              <div className="bg-white/5 p-4 rounded-2xl border border-amber-400/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-300 font-heading">
                    ★ Main Mobile, Call & WhatsApp
                  </span>
                  <span className="text-[10px] bg-amber-400 text-[#0a192f] px-2 py-0.5 rounded-full font-black">
                    Primary 24x7
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                  <a
                    href="tel:+919767224445"
                    className="text-lg sm:text-xl font-extrabold text-white hover:text-slate-300 transition-colors flex items-center font-heading"
                  >
                    <Phone className="w-5 h-5 mr-2 text-white shrink-0" />
                    +91 9767224445
                  </a>

                  <a
                    href={getWhatsAppUrl('Hello Yedeshwari Travels, I am reaching out to enquire about vehicle booking.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-amber-500 bg-white hover:bg-[#f8fafc] rounded-lg shadow font-heading transition-transform hover:scale-105"
                  >
                    <MessageSquare className="w-3.5 h-3.5 mr-1 text-amber-500 fill-[#3a2d97]" />
                    WhatsApp
                  </a>
                </div>
                <p className="text-[11px] text-slate-300">
                  Primary number for immediate booking confirmation, route quotes, and vehicle assignments.
                </p>
              </div>

              {/* Additional Contact Helplines */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1.5 text-white" />
                  Additional Direct Helplines:
                </h4>

                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex items-center justify-between bg-white/10 p-2.5 rounded-lg border border-white/15">
                    <div>
                      <p className="text-[10px] text-slate-300 font-semibold uppercase">Booking & Rates Desk</p>
                      <a href="tel:+919860451641" className="font-bold text-white hover:underline text-sm font-mono">
                        +91 9860451641
                      </a>
                    </div>
                    <a href="tel:+919860451641" className="px-2.5 py-1 text-[11px] font-semibold bg-white text-amber-500 hover:bg-[#f8fafc] rounded">
                      Call
                    </a>
                  </div>

                  <div className="flex items-center justify-between bg-white/10 p-2.5 rounded-lg border border-white/15">
                    <div>
                      <p className="text-[10px] text-slate-300 font-semibold uppercase">Fleet Operations & Drivers</p>
                      <a href="tel:+919096965271" className="font-bold text-white hover:underline text-sm font-mono">
                        +91 9096965271
                      </a>
                    </div>
                    <a href="tel:+919096965271" className="px-2.5 py-1 text-[11px] font-semibold bg-white text-amber-500 hover:bg-[#f8fafc] rounded">
                      Call
                    </a>
                  </div>

                  <div className="flex items-center justify-between bg-white/10 p-2.5 rounded-lg border border-white/15">
                    <div>
                      <p className="text-[10px] text-slate-300 font-semibold uppercase">Outstation & Pan-India Inquiries</p>
                      <a href="tel:+919322112095" className="font-bold text-white hover:underline text-sm font-mono">
                        +91 9322112095
                      </a>
                    </div>
                    <a href="tel:+919322112095" className="px-2.5 py-1 text-[11px] font-semibold bg-white text-amber-500 hover:bg-[#f8fafc] rounded">
                      Call
                    </a>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-white" />
                  Fleet Dispatches: 24 Hours / 7 Days
                </span>
                <span className="text-white font-semibold">Kalewadi, Pune</span>
              </div>
            </div>

            {/* Google Maps Embed Container */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 h-64 bg-[#f8fafc]">
              <iframe
                title="Yedeshwari Travels Pune Location Map"
                src={settings.google_maps_embed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04362799307!2d73.79292671948834!3d18.524616450000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d3e3432!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#f8fafc] p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-1">
              Send an Online Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Fill in your inquiry and our travel executive will respond promptly via call or WhatsApp.
            </p>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 font-heading">
                  Message Sent Successfully
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out to Yedeshwari Travels. We have received your query and will get back to you right away.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setContactForm({
                      name: '',
                      phone: '',
                      email: '',
                      subject: 'General Travel Inquiry',
                      message: ''
                    });
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-[#0a192f] bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl font-heading shadow"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Ramesh Joshi"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#3a2d97]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="10-digit number"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#3a2d97]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. yourname@domain.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#3a2d97]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#3a2d97]"
                    >
                      <option value="General Travel Inquiry">General Travel Inquiry</option>
                      <option value="Bus Rental (17 to 50 Seater)">Bus Rental (17 to 50 Seater)</option>
                      <option value="Car / SUV Rental">Car / SUV Rental</option>
                      <option value="Corporate Monthly Contract">Corporate Monthly Contract</option>
                      <option value="Wedding Transportation Fleet">Wedding Transportation Fleet</option>
                      <option value="All India Pilgrimage Package">All India Pilgrimage Package</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Requirements / Message *
                  </label>
                  <textarea
                    required
                    rows="4"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us about your travel dates, estimated passenger count, pickup point, and destination..."
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#3a2d97]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3 text-xs sm:text-sm font-bold text-[#0a192f] bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md transition-all font-heading flex items-center justify-center cursor-pointer disabled:opacity-60"
                >
                  {submitting ? 'Sending Message...' : (
                    <>
                      <Send className="w-4 h-4 mr-2 text-white" />
                      Submit Message
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

