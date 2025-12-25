
import React, { useState, useMemo } from 'react';
import { SERVICE_VENDORS } from '../constants.tsx';
import { 
  Search, Star, MapPin, Briefcase, Filter, ArrowRight, CheckCircle2, 
  X, BadgeCheck, Info, Heart, ShieldCheck, CreditCard, Clock, FileText
} from 'lucide-react';

export default function Vendors() {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<any | null>(null);
  const [isHiring, setIsHiring] = useState(false);

  const categories = ['All', 'Catering', 'Photography', 'Music/DJ', 'Florist', 'Decor'];

  const filteredVendors = useMemo(() => {
    return SERVICE_VENDORS.filter(v => {
      const matchesCategory = filter === 'All' || v.category === filter;
      const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           v.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchTerm]);

  const handleHire = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsHiring(true);
  };

  const confirmHire = () => {
    alert(`Redirecting to Paystack to secure your contract with ${selectedVendor.name}...`);
    setIsHiring(false);
    setSelectedVendor(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 serif italic leading-tight text-slate-800">Service Partners</h2>
          <p className="text-slate-600 text-sm sm:text-base">Elite professionals curated for your life's biggest milestones.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search vendors..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-rose-500 bg-white shadow-sm outline-none"
            />
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              filter === cat 
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVendors.map((vendor) => (
          <div 
            key={vendor.id}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 group flex flex-col"
          >
            <div className="relative h-64">
              <img 
                src={vendor.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={vendor.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-slate-800">{vendor.rating}</span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-rose-600 text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  {vendor.category}
                </span>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-800 serif italic">{vendor.name}</h3>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-900">${vendor.price.toLocaleString()}</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Avg. Base</span>
                </div>
              </div>
              <p className="text-slate-500 text-sm italic mb-6 leading-relaxed line-clamp-2">
                "{vendor.description}"
              </p>
              
              <div className="flex items-center gap-4 mb-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-50 pt-4">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Verified
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-500" /> {vendor.reviews} Projects
                </div>
              </div>

              <div className="mt-auto">
                <button 
                  onClick={() => handleHire(vendor)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-rose-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
                >
                  Request Contract <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredVendors.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <Filter className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 italic text-sm">No vendors found in this category matching your search.</p>
          </div>
        )}
      </div>

      {/* Enhanced Confirmation Summary Modal */}
      {isHiring && selectedVendor && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden border border-slate-100 flex flex-col">
            <div className="relative h-40 bg-slate-900 flex items-center justify-center overflow-hidden">
              <img src={selectedVendor.image} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[2px] scale-110" alt="" />
              <div className="relative z-10 flex flex-col items-center gap-2 text-white">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                  <BadgeCheck className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold serif italic">Contract Summary</h3>
              </div>
              <button 
                onClick={() => setIsHiring(false)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 sm:p-10 flex flex-col">
              <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Project Overview
                </h4>
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Service Scope</span>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed italic">
                      "{selectedVendor.description}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1 text-left">Contract Value</span>
                      <div className="flex items-baseline gap-1 text-rose-600">
                        <span className="text-xs font-bold">$</span>
                        <span className="text-xl font-bold">{selectedVendor.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Est. Duration</span>
                      <div className="flex items-center justify-end gap-1.5 text-slate-700 font-bold">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm">{selectedVendor.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsHiring(false)} 
                  className="py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
                >
                  Go Back
                </button>
                <button 
                  onClick={confirmHire} 
                  className="py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-100 active:scale-95"
                >
                  <CreditCard className="w-5 h-5" /> Confirm & Pay
                </button>
              </div>
              
              <p className="mt-6 text-[10px] text-center text-slate-400 font-medium flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                Payments secured via Paystack verified gateway
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
