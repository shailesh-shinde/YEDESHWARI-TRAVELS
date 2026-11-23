import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bus, Phone, Menu, X, Shield, CalendarCheck, ChevronRight, MessageSquare } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Navbar({ onOpenBooking }) {
  const { settings, getWhatsAppUrl, getPhoneList } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Fleet', href: '#fleet' },
    { name: 'Services', href: '#services' },
    { name: 'Routes', href: '#routes' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      return;
    }
    e.preventDefault();
    const elem = document.querySelector(href);
    if (elem) {
      const offsetTop = elem.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#0a192f]/95 backdrop-blur-md shadow-xl py-2.5 border-b border-amber-400/20' : 'bg-[#0a192f] py-3.5'
    }`}>
      {/* Top micro bar */}
      <div className="hidden lg:block border-b border-white/10 pb-2 mb-2 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-white font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
              Pune to All Maharashtra & All India Bus Rental
            </span>
            <span className="text-amber-300/90 font-medium">📍 Headquarters: Kalewadi, Pune</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <a
              href="tel:+919767224445"
              className="text-[#0a192f] hover:text-[#0a192f] transition-all flex items-center font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 px-3 py-1 rounded-md shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-[#0a192f]" />
              Main: +91 9767224445
            </a>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white flex items-center font-semibold bg-[#25D366] hover:bg-[#20ba59] px-2.5 py-1 rounded-md shadow-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1 fill-white" />
              WhatsApp: 9767224445
            </a>

            <span className="text-white/20">|</span>

            <div className="flex items-center space-x-2 text-[11px] text-slate-300">
              <span className="text-slate-400">Other Helplines:</span>
              <a href="tel:+919860451641" className="hover:text-amber-300 font-mono transition-colors">9860451641</a>
              <span className="text-slate-500">•</span>
              <a href="tel:+919096965271" className="hover:text-amber-300 font-mono transition-colors">9096965271</a>
              <span className="text-slate-500">•</span>
              <a href="tel:+919322112095" className="hover:text-amber-300 font-mono transition-colors">9322112095</a>
            </div>

            <span className="text-white/20">|</span>
            <Link to="/admin" className="text-slate-300 hover:text-amber-300 transition-colors flex items-center text-[11px]">
              <Shield className="w-3 h-3 mr-1 text-amber-400" />
              Admin
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
              <img src="/yedeshwari-logo.svg" alt="Yedeshwari Travels Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-heading">
                  YEDESHWARI
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-400 ml-1.5 font-heading">
                  TRAVELS
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-300 font-medium tracking-wider uppercase">
                {settings.tagline || 'Your Journey, Our Responsibility'}
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="tel:+919767224445"
              className="flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call 9767224445</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-[#0a192f] bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] font-heading cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 mr-2 text-[#0a192f]" />
              Book Your Vehicle
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center space-x-2">
            <a
              href="tel:+919767224445"
              className="px-2.5 py-1.5 text-xs font-bold text-[#0a192f] bg-amber-400 rounded-lg shadow flex items-center"
            >
              <Phone className="w-3 h-3 mr-1" />
              Call
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a192f] border-b border-amber-400/20 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between px-3 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/15 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-bold text-[#0a192f] bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl shadow-md font-heading"
            >
              <CalendarCheck className="w-4 h-4 mr-2" />
              Book Your Vehicle
            </button>

            {/* Direct Contact Numbers Box for Mobile */}
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-2 text-xs">
              <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Direct Contact Numbers:
              </p>
              
              <a
                href="tel:+919767224445"
                className="flex items-center justify-between py-1.5 px-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg text-[#0a192f] font-bold"
              >
                <span className="flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-2 text-[#0a192f]" />
                  +91 9767224445 (Main & WhatsApp)
                </span>
                <span className="text-[10px] bg-[#0a192f] text-amber-400 px-1.5 py-0.5 rounded font-extrabold">24x7</span>
              </a>

              <div className="grid grid-cols-1 gap-1.5 text-slate-200 text-xs">
                <a href="tel:+919860451641" className="flex items-center py-1 px-2 hover:bg-white/10 rounded">
                  <Phone className="w-3 h-3 mr-2 text-amber-400" />
                  <span>+91 9860451641</span>
                </a>
                <a href="tel:+919096965271" className="flex items-center py-1 px-2 hover:bg-white/10 rounded">
                  <Phone className="w-3 h-3 mr-2 text-amber-400" />
                  <span>+91 9096965271</span>
                </a>
                <a href="tel:+919322112095" className="flex items-center py-1 px-2 hover:bg-white/10 rounded">
                  <Phone className="w-3 h-3 mr-2 text-amber-400" />
                  <span>+91 9322112095</span>
                </a>
              </div>
            </div>

            <div className="text-center pt-1">
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-slate-400 hover:text-amber-400 inline-flex items-center"
              >
                <Shield className="w-3 h-3 mr-1 text-amber-400" />
                Staff / Admin Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
