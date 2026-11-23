import React from 'react';
import { Bus, MapPin, Users, Award, Shield, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function AboutSection({ onOpenBooking }) {
  const { settings } = useSettings();

  const stats = [
    { label: 'Fleet Options', value: '17 to 50', unit: 'Seaters' },
    { label: 'Outstation Routes', value: '100+', unit: 'Across India' },
    { label: 'Experienced Drivers', value: '100%', unit: 'Highway Verified' },
    { label: 'Customer Assistance', value: '24/7', unit: 'Dedicated Desk' }
  ];

  return (
    <section id="about" className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Collage with Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/30">
              <img
                src="https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=1200&q=80"
                alt="Yedeshwari Travels Luxury Bus Fleet"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Bottom Card Inside Image */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#0a192f]/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/10 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-[#0a192f] flex items-center justify-center font-black">
                    YT
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-heading text-white">
                      Pune's Dedicated Travel Partner
                    </h4>
                    <p className="text-[11px] text-amber-300">
                      "Your Journey, Our Responsibility"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-5 -left-5 bg-[#0a192f] text-white p-4 rounded-2xl shadow-xl font-heading hidden sm:flex items-center space-x-3 border-2 border-amber-400">
              <Award className="w-8 h-8 text-amber-400" />
              <div>
                <p className="text-xs uppercase font-extrabold tracking-wider text-amber-400">Trusted Quality</p>
                <p className="text-sm font-black">Commercial Vehicle Rental</p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Stats */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold tracking-wider uppercase border border-amber-200">
              <Bus className="w-3.5 h-3.5 text-amber-600" />
              <span>About Yedeshwari Travels</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a192f] font-heading tracking-tight leading-snug">
              Reliable Transportation Solutions Across{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 font-black">
                Maharashtra
              </span>{' '}
              & Throughout{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 font-black">
                India
              </span>
            </h2>

            <div className="w-16 h-1 bg-amber-400 rounded-full"></div>

            {/* Official Introduction Quote */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border-l-4 border-amber-400 text-slate-700 text-sm sm:text-base leading-relaxed italic">
              "Yedeshwari Travels is a trusted travel and transportation service provider based in Pune, Maharashtra. We offer a wide range of vehicles, from comfortable cars and 17-seater tempo travellers to spacious 50-seater buses. Whether you are planning a family trip, corporate event, wedding, school excursion, or long-distance journey, we aim to make every journey comfortable, convenient, and memorable. We provide transportation solutions across Maharashtra and throughout India."
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Headquartered in Pune, we take great pride in our fleet readiness, spotless cabin cleanliness, and punctuality. Every vehicle in our roster undergoes routine mechanical audits before long-distance tours. Our highway captains are familiar with major state expressways, ghat passes, and temple routes, ensuring smooth driving and peace of mind.
            </p>

            {/* Key Bulleted Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center space-x-2.5 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>All India Tourist Permits</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>24x7 Customer Support Desk</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Clean & Sanitized Interiors</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Zero Hidden Toll Or Fuel Surprises</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200">
              {stats.map((item, idx) => (
                <div key={idx} className="bg-[#f8fafc] p-3 rounded-xl border border-slate-200 text-center">
                  <p className="text-xl sm:text-2xl font-black text-[#0a192f] font-heading">{item.value}</p>
                  <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">{item.label}</p>
                  <p className="text-[10px] text-slate-500">{item.unit}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center px-6 py-3.5 text-xs sm:text-sm font-bold text-[#0a192f] bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20 transition-all font-heading cursor-pointer"
              >
                Plan Your Journey With Us
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
