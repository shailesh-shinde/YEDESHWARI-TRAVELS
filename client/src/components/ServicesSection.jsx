import React, { useState, useEffect } from 'react';
import {
  Navigation,
  MapPin,
  Globe,
  HeartHandshake,
  Briefcase,
  GraduationCap,
  Users,
  Plane,
  Repeat,
  Bus,
  ShieldCheck,
  Car,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  Navigation,
  MapPin,
  Globe,
  HeartHandshake,
  Briefcase,
  GraduationCap,
  Users,
  Plane,
  Repeat,
  Bus,
  ShieldCheck,
  Car
};

export default function ServicesSection({ onSelectServiceForBooking }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(r => r.json())
      .then(d => {
        if (d.success) setServices(d.services);
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold tracking-wider uppercase mb-2 border border-amber-200">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>End-to-End Travel Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0a192f] font-heading tracking-tight">
            Our Transportation Services
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto my-3 rounded-full"></div>
          <p className="text-sm text-slate-600 leading-relaxed">
            From daily corporate employee transit to destination weddings, airport transfers, and pan-India bus charters — Yedeshwari Travels delivers guaranteed punctuality, verified chauffeurs, and immaculately maintained vehicles.
          </p>
        </div>

        {/* Services Grid (12 services) */}
        {loading ? (
          <div className="py-12 text-center text-slate-400">Loading services...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {services.map((service, index) => {
              const IconComp = iconMap[service.icon] || Bus;
              const featuresList = service.features ? service.features.split(',').map(f => f.trim()) : [];

              return (
                <div
                  key={service.id || index}
                  className="bg-[#f8fafc] p-6 sm:p-7 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Icon and Index Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0a192f] to-[#16325c] text-amber-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-amber-400/20">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-2xl font-black text-slate-300 font-heading">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0a192f] font-heading mb-2 group-hover:text-amber-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Features list */}
                    {featuresList.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-200/80 mb-5">
                        {featuresList.map((feat, fidx) => (
                          <div key={fidx} className="flex items-center text-xs text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2 shrink-0"></span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectServiceForBooking(service.title)}
                    className="w-full mt-2 inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-[#0a192f] bg-white hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-[#0a192f] border border-slate-200 hover:border-amber-400 rounded-xl transition-all font-heading shadow-xs cursor-pointer"
                  >
                    <span>Request Service Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
