
import React, { useState, useMemo } from 'react';
import { CATERING_OPTIONS, ENTERTAINMENT_OPTIONS, ADDON_OPTIONS, EVENT_TYPES } from '../constants';
import { EventType } from '../types';
import { 
  Users, Utensils, Music, Sparkles, Check, ChevronRight, 
  Calculator, CreditCard, Milestone, GraduationCap, Flower2, Heart, Gift, Crown, Cake, TrendingUp,
  Clock
} from 'lucide-react';

const EventPlanner: React.FC = () => {
  const [eventType, setEventType] = useState<EventType>('Wedding');
  const [guestCount, setGuestCount] = useState(100);
  const [duration, setDuration] = useState(5);
  const [selectedCatering, setSelectedCatering] = useState<string | null>(null);
  const [selectedEntertainment, setSelectedEntertainment] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const cateringInfo = useMemo(() => {
    return CATERING_OPTIONS.find(o => o.id === selectedCatering);
  }, [selectedCatering]);

  const totals = useMemo(() => {
    let cateringCost = 0;
    if (cateringInfo) {
      // Explicitly per person calculation
      cateringCost = cateringInfo.price * guestCount;
    }

    let entertainmentCost = 0;
    const entertainment = ENTERTAINMENT_OPTIONS.find(o => o.id === selectedEntertainment);
    if (entertainment) entertainmentCost = entertainment.price;

    let addonCost = 0;
    selectedAddons.forEach(id => {
      const addon = ADDON_OPTIONS.find(o => o.id === id);
      if (addon) addonCost += addon.price;
    });

    return {
      catering: cateringCost,
      entertainment: entertainmentCost,
      addons: addonCost,
      total: cateringCost + entertainmentCost + addonCost
    };
  }, [guestCount, cateringInfo, selectedEntertainment, selectedAddons]);

  const eventTypeIcons: Record<string, any> = {
    'Wedding': Heart,
    'Burial': Flower2,
    'Graduation': GraduationCap,
    'Naming Ceremony': Milestone,
    'Corporate Event': Gift,
    'Coronation': Crown,
    'Birthday': Cake,
    'Promotion': TrendingUp
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-10 md:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold serif mb-2 italic leading-tight text-slate-800">Event Architect</h2>
        <p className="text-slate-600 text-sm sm:text-base">Tailor your milestone celebration with our intelligent configuration suite.</p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2 space-y-8 md:space-y-12">
          
          {/* Step 1: Event Type Selection */}
          <section className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold serif italic mb-6 text-slate-800">1. Select Event Type</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {Object.keys(eventTypeIcons).map((type) => {
                const Icon = eventTypeIcons[type];
                const isActive = eventType === type;
                return (
                  <button 
                    key={type}
                    onClick={() => setEventType(type as EventType)}
                    className={`flex flex-col items-center gap-3 p-4 sm:p-6 rounded-3xl border-2 transition-all ${
                      isActive ? 'border-rose-500 bg-rose-50 shadow-md shadow-rose-100' : 'border-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${isActive ? 'text-rose-500' : 'text-slate-400'}`} />
                    <span className={`text-[10px] sm:text-xs font-bold text-center ${isActive ? 'text-rose-600' : 'text-slate-600'}`}>{type}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 2: Logistics */}
          <section className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold serif italic text-slate-800">2. Logistics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-6">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guest Count</label>
                  <span className="text-sm font-bold text-slate-900">{guestCount} Guests</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="1000" 
                  step="10" 
                  value={guestCount} 
                  onChange={(e) => setGuestCount(parseInt(e.target.value))} 
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                />
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Event Duration</label>
                  <span className="text-sm font-bold text-slate-900">{duration} Hours</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="24" 
                  step="1" 
                  value={duration} 
                  onChange={(e) => setDuration(parseInt(e.target.value))} 
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
                />
              </div>
            </div>
          </section>

          {/* Step 3: Catering */}
          <section className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
                <Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold serif italic text-slate-800">3. Catering Package</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {CATERING_OPTIONS.map((option) => (
                <button 
                  key={option.id} 
                  onClick={() => setSelectedCatering(option.id)} 
                  className={`relative text-left rounded-3xl overflow-hidden border-2 transition-all group ${selectedCatering === option.id ? 'border-rose-500 ring-4 ring-rose-50' : 'border-slate-100'}`}
                >
                  <div className="h-40 overflow-hidden shrink-0">
                    <img src={option.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={option.name} />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h4 className="font-bold text-base sm:text-lg mb-1">{option.name}</h4>
                    <p className="text-slate-500 text-xs mb-4 line-clamp-2">{option.description}</p>
                    <div className="text-rose-600 font-bold text-sm sm:text-base">${option.price} / person</div>
                  </div>
                  {selectedCatering === option.id && <div className="absolute top-4 right-4 bg-rose-500 text-white p-1.5 rounded-full shadow-lg"><Check className="w-4 h-4" /></div>}
                </button>
              ))}
            </div>
          </section>

          {/* Step 4: Entertainment */}
          <section className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-2xl flex items-center justify-center shrink-0">
                <Music className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold serif italic text-slate-800">4. Audio & Atmosphere</h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {ENTERTAINMENT_OPTIONS.map((option) => (
                <button 
                  key={option.id} 
                  onClick={() => setSelectedEntertainment(option.id)} 
                  className={`w-full flex items-center gap-4 sm:gap-6 p-3 sm:p-4 rounded-2xl border-2 transition-all text-left ${selectedEntertainment === option.id ? 'border-rose-500 bg-rose-50/30 shadow-md' : 'border-slate-100 bg-white'}`}
                >
                  <img src={option.image} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0" alt={option.name} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm sm:text-base truncate">{option.name}</h4>
                    <p className="text-slate-500 text-[10px] sm:text-xs line-clamp-1">{option.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-slate-800 text-sm sm:text-base">${option.price.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400 font-bold">Flat Fee</div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1 order-last lg:order-none">
          <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] sticky top-24 shadow-2xl shadow-slate-300">
            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
              <Calculator className="w-6 h-6 text-rose-500" />
              <h3 className="text-2xl font-bold serif italic">{eventType} Quote</h3>
            </div>
            
            <div className="space-y-6 mb-10 md:mb-12">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Event Overview</span>
                <span className="font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">{eventType}</span>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Total Guests</span>
                  <span className="font-bold">{guestCount} pax</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Duration</span>
                  <span className="font-bold">{duration} Hours</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="text-slate-400">Catering Service</span>
                    {cateringInfo && <span className="text-[10px] text-rose-400/70">(${cateringInfo.price} x {guestCount})</span>}
                  </div>
                  <span className="font-bold">${totals.catering.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Entertainment</span>
                  <span className="font-bold">${totals.entertainment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Selected Addons</span>
                  <span className="font-bold">${totals.addons.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-6 mt-6">
                <div className="flex flex-col gap-1 items-end">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Projected Total Budget</span>
                  <span className="text-3xl sm:text-4xl font-bold text-rose-500">${totals.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button 
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-rose-900/20" 
              onClick={() => alert(`Redirecting to Paystack for your ${eventType} deposit...`)}
            >
              <CreditCard className="w-5 h-5" /> Secure Booking
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-6 leading-relaxed">
              *Estimates are calculated based on current capacity and selection. Deposits processed via Paystack.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPlanner;
