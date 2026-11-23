import React, { useState, useEffect } from 'react';
import { Star, Quote, CheckCircle2, MessageSquareText, ShieldAlert } from 'lucide-react';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(r => r.json())
      .then(d => {
        if (d.success) setTestimonials(d.testimonials);
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold tracking-wider uppercase mb-2 border border-slate-200">
            <MessageSquareText className="w-3.5 h-3.5 text-[#0a192f]" />
            <span>Passenger Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a192f] font-heading tracking-tight">
            Customer Testimonials
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto my-3 rounded-full"></div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Read what group leaders, wedding organizers, and families say about travelling with Yedeshwari Travels.
          </p>

          {/* Sample Content Transparency Notice per instruction 13 */}
          <div className="mt-4 inline-flex items-center space-x-2 bg-white text-slate-700 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-[#0a192f] shrink-0" />
            <span>Notice: Sample customer reviews displayed for illustration purposes until live post-trip reviews are aggregated.</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="py-12 text-center text-slate-500 font-medium">Loading feedback...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Top Quote & Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-amber-500">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                      ))}
                    </div>
                    <Quote className="w-7 h-7 text-[#d3d7dd] group-hover:text-[#0a192f] transition-colors" />
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed mb-4 italic">
                    "{t.review}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-heading">
                        {t.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {t.location}
                      </p>
                    </div>

                    {/* Sample badge */}
                    {t.is_sample === 1 && (
                      <span className="text-[10px] uppercase font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-slate-200">
                        Sample Review
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[#0a192f] font-semibold mt-2">
                    Service: {t.service_used}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

