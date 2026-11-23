import React, { useState, useEffect } from 'react';
import { Users, Wind, CheckCircle2, ShieldCheck, Bus, Car, Filter, ArrowRight } from 'lucide-react';
import { fallbackFleet } from '../data/fallbackData';

export default function FleetSection({ onSelectVehicleForBooking, activeCategoryFilter, setActiveCategoryFilter }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeating, setSelectedSeating] = useState('All');
  const [selectedAc, setSelectedAc] = useState('All');

  const categories = [
    { label: 'All Fleet', value: 'All' },
    { label: 'Tempo Travellers', value: 'Tempo Travellers' },
    { label: 'Mini Buses', value: 'Mini Buses' },
    { label: 'Large Buses', value: 'Large Buses' },
    { label: 'Luxury Buses', value: 'Luxury Buses' },
    { label: 'Cars & SUVs', value: 'Cars' },
  ];

  useEffect(() => {
    fetchVehicles();
  }, [activeCategoryFilter, selectedSeating, selectedAc]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (activeCategoryFilter && activeCategoryFilter !== 'All') {
        params.append('category', activeCategoryFilter);
      }
      if (selectedSeating && selectedSeating !== 'All') {
        params.append('seating', selectedSeating);
      }
      if (selectedAc && selectedAc !== 'All') {
        params.append('ac', selectedAc);
      }

      const res = await fetch(`/api/fleet?${params.toString()}`);
      if (!res.ok) throw new Error('API offline');
      const data = await res.json();
      if (data.success && data.vehicles?.length > 0) {
        setVehicles(data.vehicles);
      } else {
        throw new Error('Empty data');
      }
    } catch (err) {
      // Graceful fallback for static deployment (Netlify/Vercel)
      let list = [...fallbackFleet];
      if (activeCategoryFilter && activeCategoryFilter !== 'All') {
        list = list.filter(v => v.category === activeCategoryFilter);
      }
      if (selectedSeating && selectedSeating !== 'All') {
        list = list.filter(v => v.seating_capacity >= parseInt(selectedSeating, 10));
      }
      if (selectedAc && selectedAc !== 'All') {
        list = list.filter(v => v.ac_option?.includes(selectedAc));
      }
      setVehicles(list);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="fleet" className="py-20 bg-[#f8fafc] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold tracking-wider uppercase mb-2 border border-amber-200">
            <Bus className="w-3.5 h-3.5 text-amber-600" />
            <span>Complete Fleet Inventory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0a192f] font-heading tracking-tight">
            Our Premium Fleet in Pune
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto my-3 rounded-full"></div>
          <p className="text-sm text-slate-600 leading-relaxed">
            From 4-seater executive sedans to 50-seater luxury coaches, every vehicle is well-maintained, sanitized, and driven by experienced highway chauffeurs.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategoryFilter(cat.value)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer font-heading ${
                    activeCategoryFilter === cat.value
                      ? 'bg-[#0a192f] text-amber-400 shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sub-filters for AC and Seating */}
            <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
              <div className="flex items-center space-x-2 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-600 font-medium">AC:</span>
                <select
                  value={selectedAc}
                  onChange={(e) => setSelectedAc(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                >
                  <option value="All">All Types</option>
                  <option value="AC">AC Only</option>
                  <option value="Non-AC">Non-AC</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-600 font-medium">Seating:</span>
                <select
                  value={selectedSeating}
                  onChange={(e) => setSelectedSeating(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                >
                  <option value="All">All Seats</option>
                  <option value="4">4-7 Seater (Cars)</option>
                  <option value="17">17 Seater</option>
                  <option value="20">20 Seater</option>
                  <option value="26">26 Seater</option>
                  <option value="32">32 Seater</option>
                  <option value="35">35 Seater</option>
                  <option value="40">40 Seater</option>
                  <option value="45">45 Seater</option>
                  <option value="50">50 Seater</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Fleet Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-sm text-slate-500">Loading our fleet catalog...</p>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300">
            <Bus className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-base font-semibold text-slate-800">No vehicles match your selected filter.</p>
            <button
              onClick={() => {
                setActiveCategoryFilter('All');
                setSelectedSeating('All');
                setSelectedAc('All');
              }}
              className="mt-3 px-4 py-2 text-xs font-bold text-[#0a192f] bg-amber-400 hover:bg-amber-300 rounded-lg"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-amber-400 flex flex-col group"
              >
                {/* Vehicle Image Container */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={vehicle.image_url}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Top Badge */}
                  {vehicle.badge && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-[#0a192f] text-[11px] font-black px-2.5 py-1 rounded-md shadow uppercase tracking-wider font-heading">
                      {vehicle.badge}
                    </span>
                  )}

                  {/* Category Pill */}
                  <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-white/20">
                    {vehicle.category}
                  </span>

                  {/* Bottom Image Overlay Highlights */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                    <span className="flex items-center bg-[#0a192f]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      <Users className="w-3.5 h-3.5 mr-1 text-amber-400" />
                      {vehicle.seating_capacity} Seats
                    </span>
                    <span className="flex items-center bg-[#0a192f]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      <Wind className="w-3.5 h-3.5 mr-1 text-amber-400" />
                      {vehicle.ac_option}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Vehicle Name and Type */}
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-[#0a192f] font-heading group-hover:text-amber-600 transition-colors">
                        {vehicle.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold tracking-wide">
                        {vehicle.bus_type}
                      </p>
                    </div>

                    {/* Travel Purpose */}
                    <div className="mb-3.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        Suitable For:
                      </p>
                      <p className="text-xs text-slate-800 font-medium mt-0.5 line-clamp-2">
                        {vehicle.purpose}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="mb-4 space-y-1">
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        Key Amenities:
                      </p>
                      <div className="grid grid-cols-1 gap-1 text-xs text-slate-600">
                        {(vehicle.features || []).slice(0, 4).map((feat, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mr-1.5 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] text-slate-500">
                      <span className="text-slate-400">Rate:</span> <span className="font-bold text-[#0a192f]">Custom Quote</span>
                    </div>

                    <button
                      onClick={() => onSelectVehicleForBooking(vehicle)}
                      className="inline-flex items-center px-4 py-2 text-xs font-bold text-[#0a192f] bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-sm transition-all font-heading hover:translate-x-0.5 cursor-pointer"
                    >
                      <span>Enquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
