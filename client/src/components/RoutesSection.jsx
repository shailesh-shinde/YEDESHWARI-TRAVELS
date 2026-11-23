import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Gauge, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { fallbackRoutesMaharashtra, fallbackRoutesIndia } from '../data/fallbackData';

export default function RoutesSection({ onSelectRouteForBooking }) {
  const [activeTab, setActiveTab] = useState('Maharashtra'); // 'Maharashtra' or 'All India'
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
  }, [activeTab]);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/routes?region=${encodeURIComponent(activeTab)}`);
      if (!res.ok) throw new Error('API offline');
      const data = await res.json();
      if (data.success && data.routes?.length > 0) {
        setRoutes(data.routes);
      } else {
        throw new Error('Empty routes');
      }
    } catch (err) {
      setRoutes(activeTab === 'Maharashtra' ? fallbackRoutesMaharashtra : fallbackRoutesIndia);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="routes" className="py-20 bg-[#f8fafc] text-slate-900 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold tracking-wider uppercase mb-2 border border-amber-200">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Regular Highways & Outstation Corridors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0a192f] font-heading tracking-tight">
            Popular Routes from Pune
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto my-3 rounded-full"></div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Non-stop vehicle charters, tourist buses, and executive cabs from Pune to all key industrial hubs, pilgrimage shrines, coastal getaways, and state capitals.
          </p>

          {/* Region Tabs */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-200/80 border border-slate-300">
            <button
              onClick={() => setActiveTab('Maharashtra')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer font-heading ${
                activeTab === 'Maharashtra'
                  ? 'bg-[#0a192f] text-amber-400 shadow-md'
                  : 'text-slate-700 hover:text-black hover:bg-white/50'
              }`}
            >
              Maharashtra Routes (14 Cities)
            </button>
            <button
              onClick={() => setActiveTab('All India')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer font-heading ${
                activeTab === 'All India'
                  ? 'bg-[#0a192f] text-amber-400 shadow-md'
                  : 'text-slate-700 hover:text-black hover:bg-white/50'
              }`}
            >
              All India Routes (14 National Shrines & Metros)
            </button>
          </div>
        </div>

        {/* Routes Grid */}
        {loading ? (
          <div className="py-16 text-center text-slate-400">Loading route destinations...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {routes.map((route) => (
              <div
                key={route.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Origin to Destination */}
                  <div className="flex items-center space-x-2 text-base font-bold text-[#0a192f] mb-2 font-heading">
                    <span>{route.origin}</span>
                    <span className="text-amber-500 font-black">➔</span>
                    <span className="text-amber-600 font-extrabold">{route.destination}</span>
                  </div>

                  {/* Distance and Duration Metrics */}
                  <div className="flex items-center space-x-3 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200 my-2.5">
                    <span className="flex items-center text-slate-700 font-semibold">
                      <Gauge className="w-3.5 h-3.5 mr-1 text-amber-600" />
                      {route.distance_km} km
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="flex items-center text-slate-700 font-semibold">
                      <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" />
                      {route.duration_hrs}
                    </span>
                  </div>

                  {/* Highlights */}
                  <p className="text-xs text-slate-600 mb-2">
                    <strong className="text-[#0a192f]">Popular for: </strong>
                    {route.popular_for}
                  </p>

                  {/* Recommended Vehicle */}
                  <p className="text-[11px] text-slate-500 mb-4 line-clamp-1">
                    <span className="font-semibold text-slate-700">Fleet: </span>
                    {route.recommended_vehicles}
                  </p>
                </div>

                <button
                  onClick={() => onSelectRouteForBooking(route)}
                  className="w-full inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-[#0a192f] bg-slate-100 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-[#0a192f] border border-slate-200 hover:border-amber-400 rounded-xl transition-all font-heading cursor-pointer shadow-xs group-hover:scale-[1.01]"
                >
                  <span>Request Route Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Custom Route Banner */}
        <div className="mt-10 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Pan-India Tourist Permits</span>
            </div>
            <h3 className="text-xl font-bold text-[#0a192f] font-heading">
              Travelling to Any Other Destination in India?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              We provide point-to-point drop and multi-day round trip bus & car charters to any temple, hill station, or city across India with experienced interstate drivers.
            </p>
          </div>

          <button
            onClick={() => onSelectRouteForBooking({ origin: 'Pune', destination: 'Custom Destination' })}
            className="shrink-0 px-6 py-3 text-xs sm:text-sm font-bold text-[#0a192f] bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20 transition-all font-heading cursor-pointer"
          >
            Plan Custom Journey
          </button>
        </div>

      </div>
    </section>
  );
}
