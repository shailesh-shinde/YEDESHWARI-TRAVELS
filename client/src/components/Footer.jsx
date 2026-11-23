import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, MapPin, Phone, Mail, Clock, Shield, ArrowUp } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Footer({ onOpenBooking }) {
  const { settings } = useSettings();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a192f] text-slate-300 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md flex items-center justify-center shrink-0">
                <img src="/yedeshwari-logo.svg" alt="Yedeshwari Travels Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight font-heading">
                  YEDESHWARI
                </span>
                <span className="text-xl font-black text-slate-300 ml-1.5 font-heading">
                  TRAVELS
                </span>
              </div>
            </div>

            <p className="text-xs text-white font-semibold tracking-wider uppercase">
              "{settings.tagline || 'Your Journey, Our Responsibility'}"
            </p>

            <p className="text-xs text-slate-300 leading-relaxed">
              Pune's premier vehicle rental agency providing comfortable cars, 17-20 seater tempo travellers, and 26 to 50-seater luxury coaches for family tours, corporate events, weddings, and pan-India travel.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="px-4 py-2 text-xs font-bold text-[#0a192f] bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl font-heading shadow-md text-[#0a192f]"
              >
                Book Your Vehicle Now
              </button>
            </div>
          </div>

          {/* Col 2: Fleet Links (2.5 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading border-b border-white/10 pb-2">
              Our Rental Fleet
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li><a href="#fleet" className="hover:text-white transition-colors">17 Seater Tempo Traveller</a></li>
              <li><a href="#fleet" className="hover:text-white transition-colors">20 Seater Mini Bus / Traveller</a></li>
              <li><a href="#fleet" className="hover:text-white transition-colors">26 & 32 Seater Mini Buses</a></li>
              <li><a href="#fleet" className="hover:text-white transition-colors">35 & 40 Seater Coaches</a></li>
              <li><a href="#fleet" className="hover:text-white transition-colors">45 & 50 Seater Luxury Buses</a></li>
              <li><a href="#fleet" className="hover:text-white transition-colors">AC Sleeper & Pushback Coaches</a></li>
              <li><a href="#fleet" className="hover:text-white transition-colors">Innova Crysta, Ertiga & Fortuner</a></li>
            </ul>
          </div>

          {/* Col 3: Popular Corridors (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading border-b border-white/10 pb-2">
              Popular Routes
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li><a href="#routes" className="hover:text-white transition-colors">Pune to Mumbai</a></li>
              <li><a href="#routes" className="hover:text-white transition-colors">Pune to Goa</a></li>
              <li><a href="#routes" className="hover:text-white transition-colors">Pune to Shirdi</a></li>
              <li><a href="#routes" className="hover:text-white transition-colors">Pune to Nashik</a></li>
              <li><a href="#routes" className="hover:text-white transition-colors">Pune to Sambhajinagar</a></li>
              <li><a href="#routes" className="hover:text-white transition-colors">Pune to Kolhapur</a></li>
              <li><a href="#routes" className="hover:text-white transition-colors">Pune to Bengaluru</a></li>
            </ul>
          </div>

          {/* Col 4: Pune Office Info (3.5 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading border-b border-white/10 pb-2">
              Contact & Helplines
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-start">
                <MapPin className="w-4 h-4 text-white mr-2 shrink-0 mt-0.5" />
                <span>{settings.office_address}</span>
              </p>
              
              <div className="pt-1">
                <p className="text-[11px] font-bold text-white uppercase tracking-wider">
                  ★ Main Mobile & WhatsApp:
                </p>
                <a
                  href="tel:+919767224445"
                  className="text-sm font-black text-white hover:underline transition-colors flex items-center font-heading mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 mr-1.5 text-white" />
                  +91 9767224445
                </a>
              </div>

              <div className="pt-1">
                <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Direct Support Lines:
                </p>
                <div className="space-y-1 mt-1 text-[11px]">
                  <p>
                    <a href="tel:+919860451641" className="hover:text-white font-mono font-medium text-white">
                      📞 +91 9860451641
                    </a>
                  </p>
                  <p>
                    <a href="tel:+919096965271" className="hover:text-white font-mono font-medium text-white">
                      📞 +91 9096965271
                    </a>
                  </p>
                  <p>
                    <a href="tel:+919322112095" className="hover:text-white font-mono font-medium text-white">
                      📞 +91 9322112095
                    </a>
                  </p>
                </div>
              </div>

              <p className="flex items-center pt-1">
                <Mail className="w-4 h-4 text-white mr-2 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white">
                  {settings.email}
                </a>
              </p>
              <p className="flex items-center text-white text-[11px]">
                <Clock className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                <span>24x7 Customer Support Desk</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-4">
          <div>
            <p>
              © {new Date().getFullYear()} <strong className="text-white">Yedeshwari Travels</strong>. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Pune, Maharashtra, India • Complete Outstation & All India Vehicle Rental Services
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-slate-300 hover:text-white flex items-center transition-colors">
              <Shield className="w-3.5 h-3.5 mr-1" />
              <span>Admin Portal</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

