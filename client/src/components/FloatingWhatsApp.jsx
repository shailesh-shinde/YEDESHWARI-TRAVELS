import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function FloatingWhatsApp() {
  const { settings, getWhatsAppUrl } = useSettings();
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMsg = `Hello Yedeshwari Travels, I would like to enquire about vehicle rental and bus booking from Pune.`;
  const whatsappUrl = getWhatsAppUrl(defaultMsg);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="mb-3 max-w-xs bg-white text-slate-900 p-3.5 rounded-2xl shadow-xl border border-slate-200 animate-in slide-in-from-bottom-3 duration-300 relative group">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-black p-0.5 rounded-full cursor-pointer"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <p className="text-xs font-bold text-[#0a192f] font-heading">
              Need Instant Travel Rates?
            </p>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            Chat directly with our Pune fleet coordinator on WhatsApp for quick bus & car quotes.
          </p>
          <div className="mt-2 text-[10px] text-emerald-700 font-semibold flex items-center">
            <span>● 24x7 WhatsApp Desk Online</span>
          </div>
        </div>
      )}

      {/* Pulsing Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Yedeshwari Travels on WhatsApp"
        className="relative group w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:bg-[#20ba59] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Radar Pulse Effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 group-hover:opacity-75 animate-ping -z-10 pointer-events-none"></span>
        <MessageSquare className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}
