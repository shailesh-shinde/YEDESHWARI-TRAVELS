import React from 'react';
import {
  Layers,
  Bus,
  Car,
  Globe2,
  UserCheck,
  Armchair,
  Users,
  FileCheck2,
  Headphones
} from 'lucide-react';

export default function WhyChooseUs({ onOpenBooking }) {
  const reasons = [
    {
      title: 'Wide Range of Vehicles',
      desc: 'Complete portfolio spanning hatchbacks, sedans, 7-seater MPVs, Tempo Travellers, and large luxury coaches under one trusted brand.',
      icon: Layers
    },
    {
      title: '17 to 50 Seater Bus Options',
      desc: 'Exact seating configuration tailored for your group size — 17, 20, 26, 32, 35, 40, 45, and 50 seater coaches available.',
      icon: Bus
    },
    {
      title: 'Cars and Luxury SUVs',
      desc: 'Swift Dzire, Maruti Ertiga, Kia Carens, Toyota Innova Crysta, and Toyota Fortuner for personal travel, weddings, and executive airport transfers.',
      icon: Car
    },
    {
      title: 'Maharashtra and All India Services',
      desc: 'Valid inter-state permits with verified tax compliance across Maharashtra, Goa, Karnataka, Gujarat, Madhya Pradesh, and pan-India.',
      icon: Globe2
    },
    {
      title: 'Professional Drivers',
      desc: 'Licensed, background-verified, and polite chauffeurs experienced on Indian highways, ghat passes, and night routes.',
      icon: UserCheck
    },
    {
      title: 'Comfortable Travel',
      desc: 'Pushback reclining seats, dual air conditioning, air suspension chassis, clean seat upholstery, and charging ports at every row.',
      icon: Armchair
    },
    {
      title: 'Group Transportation',
      desc: 'Specialized coordination for destination weddings, pilgrim yatras, student excursions, and corporate offsites with fleet convoys.',
      icon: Users
    },
    {
      title: 'Easy Booking Enquiries',
      desc: 'Fast online quote requests, instant WhatsApp inquiry integration, and customized itinerary planning with zero guesswork.',
      icon: FileCheck2
    },
    {
      title: 'Customer Support',
      desc: '24x7 operations helpline in Pune to assist during your trip, coordinate pickups, and resolve inquiries in real time.',
      icon: Headphones
    }
  ];

  return (
    <section className="py-20 bg-[#f8fafc] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold tracking-wider uppercase mb-2 border border-amber-200">
            <span>The Yedeshwari Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0a192f] font-heading tracking-tight">
            Why Choose Yedeshwari Travels?
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto my-3 rounded-full"></div>
          <p className="text-sm text-slate-600 leading-relaxed">
            We operate with the motto "Your Journey, Our Responsibility". Here is why hundreds of families, wedding planners, and corporate enterprises in Pune trust us for their outstation journeys.
          </p>
        </div>

        {/* 9 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0a192f] to-[#16325c] text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-all shadow-md border border-amber-400/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0a192f] font-heading mb-2 group-hover:text-amber-600 transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-amber-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></span>
                  <span>Guaranteed Standards</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 text-center bg-gradient-to-r from-[#0a192f] via-[#0f2744] to-[#16325c] border border-amber-400/20 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
          <div className="text-left">
            <h4 className="text-lg sm:text-xl font-bold font-heading text-white">
              Ready to experience comfortable, worry-free group travel?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Get an authentic quotation with vehicle availability in minutes.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="shrink-0 px-6 py-3.5 text-xs sm:text-sm font-bold text-[#0a192f] bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/25 transition-all font-heading cursor-pointer"
          >
            Enquire For Your Date
          </button>
        </div>

      </div>
    </section>
  );
}
