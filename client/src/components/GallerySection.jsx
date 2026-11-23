import React, { useState, useEffect } from 'react';
import { Camera, X, Maximize2, Tag } from 'lucide-react';

export default function GallerySection() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);

  const categories = ['All', 'Buses', 'Tempo Travellers', 'Cars', 'Weddings', 'Corporate', 'Tours'];

  useEffect(() => {
    fetchGallery();
  }, [activeCategory]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const url = activeCategory === 'All' ? '/api/gallery' : `/api/gallery?category=${encodeURIComponent(activeCategory)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setGallery(data.gallery);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-[#f8fafc] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold tracking-wider uppercase mb-2 border border-slate-200">
            <Camera className="w-3.5 h-3.5 text-[#0a192f]" />
            <span>Visual Tour of Our Operations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a192f] font-heading tracking-tight">
            Yedeshwari Travels Fleet & Journey Gallery
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto my-3 rounded-full"></div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Real snapshots of our luxury buses, tempo travellers, wedding convoys, and scenic tours across Maharashtra and India.
          </p>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer font-heading border ${
                  activeCategory === cat
                    ? 'bg-[#0a192f] text-amber-400 border-[#0a192f] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-[#d8e1e6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="py-16 text-center text-slate-500 font-medium">Loading gallery images...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImg(item)}
                className="group relative h-64 rounded-2xl overflow-hidden bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Tag */}
                <span className="absolute top-3 left-3 bg-[#0a192f]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/20">
                  {item.category}
                </span>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Details */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-sm font-bold font-heading line-clamp-1 group-hover:text-[#d8e1e6] transition-colors">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-[11px] text-slate-200 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative max-w-4xl w-full bg-[#1e1b3d] rounded-2xl overflow-hidden border border-slate-200/30 shadow-2xl">
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={lightboxImg.image_url}
                alt={lightboxImg.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <div className="p-5 bg-[#0a192f] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-[#d8e1e6] uppercase tracking-wider">
                  {lightboxImg.category}
                </span>
                <h3 className="text-lg font-bold font-heading mt-0.5">{lightboxImg.title}</h3>
                {lightboxImg.description && (
                  <p className="text-xs text-[#d8e1e6] mt-1">{lightboxImg.description}</p>
                )}
              </div>
              <button
                onClick={() => setLightboxImg(null)}
                className="px-4 py-2 text-xs font-bold text-[#0a192f] bg-white hover:bg-[#d8e1e6] rounded-lg shrink-0 font-heading cursor-pointer transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

