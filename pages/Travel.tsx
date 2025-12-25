
import React from 'react';
import { HOTELS, TRAVEL_TIPS } from '../constants';
import { Hotel as HotelIcon, Car, Plane, Info, ExternalLink, MapPin } from 'lucide-react';

const Travel: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 serif">Travel & Stay</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          We can't wait to see you! Here is all the information you'll need for your journey and stay in beautiful Napa Valley.
        </p>
      </div>

      {/* Accommodation Section */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center">
            <HotelIcon className="w-6 h-6 text-rose-600" />
          </div>
          <h3 className="text-3xl font-bold italic serif">Where to Stay</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {HOTELS.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="relative h-48">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800">
                  {hotel.priceRange}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2">{hotel.name}</h4>
                <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  {hotel.distance}
                </div>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {hotel.description}
                </p>
                <a 
                  href={hotel.link}
                  className="inline-flex items-center gap-2 text-rose-600 font-bold text-sm hover:text-rose-700 transition-colors"
                >
                  Book Accommodations <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Transportation & Logistics */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold italic serif">Getting Around</h3>
          </div>
          
          <div className="space-y-4">
            {TRAVEL_TIPS.filter(t => t.type === 'transport').map(tip => (
              <div key={tip.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  {tip.title === 'Airport Info' ? <Plane className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                  {tip.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">{tip.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Local Tips & Hints */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <Info className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-bold italic serif">Good to Know</h3>
          </div>
          
          <div className="space-y-4">
            {TRAVEL_TIPS.filter(t => t.type === 'tip').map(tip => (
              <div key={tip.id} className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg shadow-slate-200">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                  {tip.title}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">{tip.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Decorative callout */}
      <div className="mt-20 p-12 bg-rose-50 rounded-[3rem] text-center border border-rose-100">
        <h3 className="text-3xl font-bold mb-4 serif italic text-rose-900">Need help with your travel plans?</h3>
        <p className="text-rose-800 mb-8 max-w-lg mx-auto">
          Our AI assistant can help you find flights, suggest local attractions, or even help you pack for the Napa weather!
        </p>
        <a href="#/planner" className="inline-block bg-rose-600 text-white px-8 py-4 rounded-full font-bold hover:bg-rose-700 transition-all transform hover:scale-105">
          Ask EverAfter AI
        </a>
      </div>
    </div>
  );
};

// Simple Sparkles component for decoration in the tips section
const Sparkles: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

export default Travel;
