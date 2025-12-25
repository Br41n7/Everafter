
import React, { useState } from 'react';
import { VENUES } from '../constants';
import { Venue } from '../types';
// Fixed: Added CreditCard to the lucide-react imports
import { 
  MapPin, Users, DollarSign, Search, CheckCircle2, ChevronLeft, 
  ChevronRight, Calendar as CalendarIcon, X, Globe, Mail, Phone,
  Info, Sparkles, Check, CreditCard, CalendarRange
} from 'lucide-react';

const Calendar: React.FC<{ 
  venue: Venue, 
  onSelect: (date: Date) => void, 
  selectedDate: Date | null 
}> = ({ venue, onSelect, selectedDate }) => {
  const [viewDate, setViewDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysCount = daysInMonth(year, month);
  const startOffset = firstDayOfMonth(year, month);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isUnavailable = (date: Date) => {
    const dStr = date.toISOString().split('T')[0];
    return venue.unavailableDates?.includes(dStr) || date < new Date();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthLabel = viewDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-100 shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-base sm:text-lg">{monthLabel}</h4>
        <div className="flex gap-1 sm:gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayLabels.map(d => <div key={d} className="text-center text-[10px] sm:text-xs font-bold text-slate-400 py-2 uppercase">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startOffset }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysCount }).map((_, i) => {
          const day = i + 1;
          const date = new Date(year, month, day);
          const unavailable = isUnavailable(date);
          const active = isSelected(date);

          return (
            <button
              key={day}
              disabled={unavailable}
              onClick={() => onSelect(date)}
              className={`
                aspect-square flex items-center justify-center rounded-xl text-xs sm:text-sm font-medium transition-all
                ${unavailable ? 'text-slate-200 cursor-not-allowed' : 'hover:bg-rose-50 text-slate-700'}
                ${active ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-200 scale-105' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Venues: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [bookingVenue, setBookingVenue] = useState<Venue | null>(null);
  const [bookingStep, setBookingStep] = useState<'browse' | 'date' | 'payment'>('browse');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<number | null>(null);

  const handleStartBooking = (venue: Venue, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookingVenue(venue);
    setBookingStep('date');
    setSelectedDate(null);
    setSelectedVenue(null);
  };

  const handleDateSelected = (date: Date) => setSelectedDate(date);

  const simulatePayment = () => {
    alert("Redirecting to Paystack secure gateway...");
    setTimeout(() => {
      setConfirmedBooking(bookingVenue?.id || null);
      setBookingStep('browse');
      setBookingVenue(null);
      alert("Payment Successful! Your date is secured.");
    }, 1500);
  };

  const closeModals = () => {
    setBookingVenue(null);
    setSelectedVenue(null);
    setBookingStep('browse');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 serif italic leading-tight">Event Spaces</h2>
          <p className="text-slate-600 text-sm sm:text-base">Discover premium venues for your celebrations and milestones.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search city or venue type..." 
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {VENUES.map((venue) => (
          <div 
            key={venue.id} 
            onClick={() => setSelectedVenue(venue)}
            className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
          >
            <div className="relative h-56 sm:h-64">
              <img src={venue.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={venue.name} />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full font-bold text-rose-600 shadow-sm text-sm">
                From ${venue.price.toLocaleString()}
              </div>
            </div>
            <div className="p-6 sm:p-8 flex flex-col flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 serif italic">{venue.name}</h3>
                  <div className="flex items-center gap-1 text-slate-500 text-sm">
                    <MapPin className="w-4 h-4" /> {venue.location}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-slate-700 font-medium text-xs sm:text-sm bg-slate-100 px-3 py-1 rounded-full">
                  <Users className="w-4 h-4" /> {venue.capacity} guests
                </div>
              </div>
              <p className="text-slate-600 mb-4 text-sm line-clamp-2 italic">"{venue.description}"</p>

              {/* Quick Availability Reference */}
              <div className="mb-6 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarRange className="w-3.5 h-3.5 text-slate-400" />
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Booking Status</h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {venue.unavailableDates && venue.unavailableDates.length > 0 ? (
                    venue.unavailableDates.map(d => (
                      <span key={d} className="px-2.5 py-1 bg-slate-100 text-slate-400 rounded-lg text-[10px] line-through font-semibold border border-slate-200/50 shadow-sm">
                        {formatDate(d)}
                      </span>
                    ))
                  ) : (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-tight border border-emerald-100 shadow-sm flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      Fully Available This Season
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedVenue(venue); }}
                  className="flex-1 py-3 border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Info className="w-4 h-4" /> Details
                </button>
                <button 
                  onClick={(e) => handleStartBooking(venue, e)}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm ${
                    confirmedBooking === venue.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-900 text-white hover:bg-rose-600'
                  }`}
                >
                  {confirmedBooking === venue.id ? <CheckCircle2 className="w-4 h-4" /> : <CalendarIcon className="w-4 h-4" />}
                  {confirmedBooking === venue.id ? 'Booked' : 'Check Dates'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Venue Detail Modal */}
      {selectedVenue && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-none sm:rounded-[3rem] w-full max-w-4xl h-full sm:h-auto sm:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in duration-300">
            <div className="w-full md:w-1/2 relative h-56 sm:h-64 md:h-auto">
              <img src={selectedVenue.image} className="w-full h-full object-cover" alt={selectedVenue.name} />
              <button 
                onClick={closeModals} 
                className="absolute top-4 right-4 p-2 bg-white/30 backdrop-blur rounded-full text-white hover:bg-white/50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 p-6 sm:p-8 md:p-12 overflow-y-auto bg-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl sm:text-4xl font-bold serif italic mb-2 leading-tight">{selectedVenue.name}</h2>
                  <div className="flex items-center gap-2 text-slate-500 font-medium text-sm sm:text-base">
                    <MapPin className="w-5 h-5 text-rose-500 shrink-0" /> {selectedVenue.location}
                  </div>
                </div>
                <button onClick={closeModals} className="hidden md:block p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <section>
                  <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">About the Space</h4>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic">"{selectedVenue.description}"</p>
                </section>

                <section>
                  <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Amenities</h4>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {selectedVenue.amenities.map(item => (
                      <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 sm:p-3 rounded-xl">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" /> {item}
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Contact & Inquiries</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <a href={`mailto:${selectedVenue.contactEmail}`} className="col-span-full flex items-center gap-4 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 hover:bg-rose-100 transition-all">
                      <Mail className="w-5 h-5 shrink-0" />
                      <div className="truncate">
                        <div className="text-[10px] font-bold uppercase tracking-tighter opacity-70">Email Inquiries</div>
                        <div className="font-bold text-sm sm:text-base truncate">{selectedVenue.contactEmail}</div>
                      </div>
                    </a>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700">
                      <Phone className="w-5 h-5 shrink-0" />
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-tighter opacity-70">Phone</div>
                        <div className="font-bold text-sm sm:text-base">{selectedVenue.phone}</div>
                      </div>
                    </div>
                    <a href={selectedVenue.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 hover:bg-emerald-100">
                      <Globe className="w-5 h-5 shrink-0" />
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-tighter opacity-70">Web</div>
                        <div className="font-bold text-sm sm:text-base">Visit Site</div>
                      </div>
                    </a>
                  </div>
                </section>

                <div className="sticky bottom-0 bg-white pt-4 pb-2 sm:static">
                  <button 
                    onClick={(e) => handleStartBooking(selectedVenue, e)}
                    className="w-full py-4 sm:py-5 bg-slate-900 text-white rounded-2xl font-bold text-base sm:text-lg hover:bg-rose-600 transition-all shadow-xl"
                  >
                    Reserve Dates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Flow Modal */}
      {bookingVenue && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[120] flex items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-none sm:rounded-[2.5rem] w-full max-w-2xl h-full sm:h-auto sm:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 sm:p-8 border-b flex justify-between items-center bg-white shrink-0">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold serif truncate max-w-[200px] sm:max-w-none">{bookingVenue.name}</h3>
                <p className="text-slate-500 text-xs sm:text-sm">{bookingStep === 'date' ? 'Step 1: Choose Date' : 'Step 2: Pay Deposit'}</p>
              </div>
              <button onClick={closeModals} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {bookingStep === 'date' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="order-2 md:order-1">
                    <h4 className="font-bold mb-4 flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-rose-500" /> Availability</h4>
                    <p className="text-slate-600 text-xs sm:text-sm mb-6">Select your preferred date. We host Weddings, Burials, Graduations, and Naming Ceremonies.</p>
                    {selectedDate && (
                      <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl animate-in slide-in-from-left-4 duration-300">
                        <p className="text-rose-900 font-bold text-xs uppercase tracking-wider mb-1">Selected Date:</p>
                        <p className="text-rose-700 text-lg font-bold">{selectedDate.toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                  <div className="order-1 md:order-2">
                    <Calendar venue={bookingVenue} onSelect={handleDateSelected} selectedDate={selectedDate} />
                  </div>
                </div>
              ) : (
                <div className="max-w-md mx-auto text-center py-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Confirm Reservation</h3>
                  <div className="bg-slate-50 p-6 rounded-3xl mb-8 space-y-3">
                    <div className="flex justify-between text-sm text-slate-500"><span>Venue</span><span className="font-bold text-slate-800">{bookingVenue.name}</span></div>
                    <div className="flex justify-between text-sm text-slate-500"><span>Date</span><span className="font-bold text-slate-800">{selectedDate?.toLocaleDateString()}</span></div>
                    <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-rose-600"><span>10% Deposit</span><span>${(bookingVenue.price * 0.1).toLocaleString()}</span></div>
                  </div>
                  <button onClick={simulatePayment} className="w-full py-4 bg-[#3BB75E] text-white rounded-2xl font-bold hover:brightness-105 transition-all shadow-lg flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" /> Secure Pay with Paystack
                  </button>
                </div>
              )}
            </div>
            <div className="p-6 sm:p-8 border-t bg-slate-50 flex gap-4 shrink-0">
              {bookingStep === 'date' ? (
                <button 
                  disabled={!selectedDate} 
                  onClick={() => setBookingStep('payment')} 
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-600 transition-all"
                >
                  Continue to Booking
                </button>
              ) : (
                <button onClick={() => setBookingStep('date')} className="w-full py-4 font-bold text-slate-500 hover:text-slate-800 transition-colors">
                  Go Back
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Venues;
