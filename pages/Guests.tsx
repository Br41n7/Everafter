
import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Plus, Search, Link as LinkIcon, CheckCircle, XCircle, Clock, X, Heart, Users as UsersIcon, Calendar, PartyPopper, Mail, Send, Loader2, CheckSquare, Square, Trash2 } from 'lucide-react';
import { Guest } from '../types';

const INITIAL_GUESTS: Guest[] = [
  { id: '1', name: 'John Miller', email: 'john@example.com', status: 'Confirmed', plusOne: true },
  { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Confirmed', plusOne: false },
  { id: '3', name: 'Michael Chen', email: 'michael@example.com', status: 'Invited', plusOne: true },
  { id: '4', name: 'Emma Davis', email: 'emma@example.com', status: 'Declined', plusOne: false },
  { id: '5', name: 'Robert Brown', email: 'robert@example.com', status: 'Invited', plusOne: false },
];

const Guests: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>(INITIAL_GUESTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [rsvpGuest, setRsvpGuest] = useState<Guest | null>(null);
  const [lastUpdatedIds, setLastUpdatedIds] = useState<Set<string>>(new Set());
  const [isBulkInviting, setIsBulkInviting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showBulkStatusModal, setShowBulkStatusModal] = useState(false);

  // Mock countdown - 45 days remaining
  const daysRemaining = 45;

  const stats = useMemo(() => [
    { name: 'Confirmed', value: guests.filter(g => g.status === 'Confirmed').length, color: '#10b981' },
    { name: 'Invited', value: guests.filter(g => g.status === 'Invited').length, color: '#6366f1' },
    { name: 'Declined', value: guests.filter(g => g.status === 'Declined').length, color: '#ef4444' },
  ], [guests]);

  const confirmedCount = guests.filter(g => g.status === 'Confirmed').length;
  const progressPercentage = Math.round((confirmedCount / (guests.length || 1)) * 100);

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredGuests.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredGuests.map(g => g.id)));
    }
  };

  const handleUpdateRSVP = (id: string, status: Guest['status'], plusOne: boolean) => {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, status, plusOne } : g));
    setLastUpdatedIds(new Set([id]));
    setRsvpGuest(null);
    
    setTimeout(() => setLastUpdatedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    }), 2000);
  };

  const handleBulkRSVP = (status: Guest['status']) => {
    const idsToUpdate = Array.from(selectedIds);
    setGuests(prev => prev.map(g => idsToUpdate.includes(g.id) ? { ...g, status } : g));
    setLastUpdatedIds(new Set(idsToUpdate));
    setSelectedIds(new Set());
    setShowBulkStatusModal(false);
    
    setTimeout(() => setLastUpdatedIds(new Set()), 2000);
  };

  const inviteGuest = (id: string) => {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, status: 'Invited' } : g));
    setLastUpdatedIds(new Set([id]));
    setTimeout(() => setLastUpdatedIds(new Set()), 2000);
    console.log(`Email invitation sent to guest ${id}`);
  };

  const bulkInvite = () => {
    setIsBulkInviting(true);
    setTimeout(() => {
      setGuests(prev => prev.map(g => {
        if (g.status === 'Invited' || (g.status !== 'Confirmed' && g.status !== 'Declined')) {
          return { ...g, status: 'Invited' };
        }
        return g;
      }));
      setIsBulkInviting(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Celebration Countdown & Progress Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10 md:mb-12">
        <div className="bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 text-white relative overflow-hidden flex items-center justify-between shadow-xl shadow-slate-200">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <PartyPopper className="w-24 h-24 sm:w-32 sm:h-32 rotate-12" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-widest text-[10px] mb-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" /> Celebration Countdown
            </div>
            <div className="flex items-end gap-2 sm:gap-3">
              <span className="text-5xl sm:text-7xl font-bold serif leading-none">{daysRemaining}</span>
              <span className="text-base sm:text-2xl font-medium text-slate-400 mb-1 leading-none">Days to go</span>
            </div>
          </div>
          <div className="hidden lg:block relative z-10 text-right">
             <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter mb-1">Event Date</div>
             <div className="text-xl font-bold serif italic text-rose-100">Sept 24, 2025</div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold serif italic text-slate-800 leading-tight">RSVP Engine</h3>
              <p className="text-slate-500 text-xs sm:text-sm">{confirmedCount} of {guests.length} confirmed</p>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-rose-500 serif">{progressPercentage}%</div>
          </div>
          <div className="w-full h-3 sm:h-4 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-rose-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start mb-10 md:mb-12 gap-8 md:gap-12">
        <div className="flex-1 w-full">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 serif italic leading-tight text-slate-800">Guest Management</h2>
          <p className="text-slate-600 mb-8 max-w-lg text-sm sm:text-base">
            Track invitations for all your event milestones. Send single or bulk email invites, or simulate RSVP responses for multiple guests at once.
          </p>
          
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 lg:mb-8">
            {stats.map(s => (
              <div key={s.name} className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <div className="text-[10px] sm:text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{s.name}</div>
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm h-[260px] sm:h-[300px]">
          <h4 className="font-bold mb-4 text-slate-800 text-sm uppercase tracking-widest text-center sm:text-left">RSVP Visualization</h4>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} fontWeight="bold" />
              <YAxis hide />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '12px' }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {stats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Floating Selection Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-8 duration-300">
          <div className="flex items-center gap-2">
            <span className="bg-rose-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{selectedIds.size}</span>
            <span className="text-sm font-medium">Guests Selected</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowBulkStatusModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-xs font-bold active:scale-95"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Simulate RSVP
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 rounded-xl transition-all text-xs font-bold active:scale-95 text-rose-400">
              <Trash2 className="w-4 h-4" /> Remove
            </button>
          </div>
          <button 
            onClick={() => setSelectedIds(new Set())}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/30">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={bulkInvite}
              disabled={isBulkInviting}
              className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-100 text-sm disabled:opacity-50"
            >
              {isBulkInviting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
              {isBulkInviting ? 'Sending...' : 'Bulk Invite'}
            </button>
            <button className="bg-rose-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-rose-700 transition-all active:scale-95 shadow-lg shadow-rose-100 text-sm">
              <Plus className="w-5 h-5" /> Add Guest
            </button>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[700px] sm:min-w-0">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 w-12 text-center">
                  <button onClick={toggleSelectAll} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                    {selectedIds.size === filteredGuests.length && filteredGuests.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-rose-600" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4">Guest Info</th>
                <th className="px-6 py-4 hidden sm:table-cell">Email</th>
                <th className="px-6 py-4 text-center">Plus One</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredGuests.map((guest) => {
                const isRecentlyUpdated = lastUpdatedIds.has(guest.id);
                const isSelected = selectedIds.has(guest.id);
                return (
                  <tr key={guest.id} className={`hover:bg-slate-50/50 transition-all group ${isRecentlyUpdated ? 'bg-emerald-50/50' : ''} ${isSelected ? 'bg-rose-50/30' : ''}`}>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => toggleSelect(guest.id)} 
                        className={`p-2 rounded-lg transition-colors ${isSelected ? 'text-rose-600' : 'text-slate-300 group-hover:text-slate-400'}`}
                      >
                        {isSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm border border-slate-200 shrink-0">
                        {guest.name[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="text-slate-800 text-sm sm:text-base font-semibold truncate">{guest.name}</div>
                        <div className="text-[10px] sm:text-xs text-slate-400 sm:hidden truncate">{guest.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 hidden sm:table-cell text-sm truncate max-w-[150px]">{guest.email}</td>
                    <td className="px-6 py-4 text-center">
                      {guest.plusOne ? (
                        <span className="bg-blue-50 text-blue-600 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tight">Plus One</span>
                      ) : (
                        <span className="text-slate-200">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold w-fit uppercase tracking-wider transition-all duration-500 ${isRecentlyUpdated ? 'scale-110 shadow-lg' : ''} ${
                        guest.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        guest.status === 'Declined' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                        'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {guest.status === 'Confirmed' && <CheckCircle className="w-3 h-3" />}
                        {guest.status === 'Declined' && <XCircle className="w-3 h-3" />}
                        {guest.status === 'Invited' && <Clock className="w-3 h-3" />}
                        {guest.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 sm:gap-2">
                        <button 
                          onClick={() => inviteGuest(guest.id)}
                          title="Send Invitation Email"
                          className="text-slate-400 hover:text-emerald-600 p-2 hover:bg-emerald-50 rounded-lg transition-all"
                        >
                          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button 
                          onClick={() => setRsvpGuest(guest)}
                          title="Simulate Guest RSVP"
                          className="text-slate-400 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredGuests.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-16 text-center text-slate-400 italic text-sm">
                    No guests found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk RSVP Modal */}
      {showBulkStatusModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-sm w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold mb-2 serif">Simulate Bulk RSVP</h3>
            <p className="text-slate-500 text-sm mb-6">Apply status for {selectedIds.size} selected guests.</p>
            <div className="space-y-3">
              <button 
                onClick={() => handleBulkRSVP('Confirmed')}
                className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all active:scale-95"
              >
                <CheckCircle className="w-5 h-5" /> Mark as Confirmed
              </button>
              <button 
                onClick={() => handleBulkRSVP('Declined')}
                className="w-full py-4 bg-rose-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-rose-700 transition-all active:scale-95"
              >
                <XCircle className="w-5 h-5" /> Mark as Declined
              </button>
              <button 
                onClick={() => setShowBulkStatusModal(false)}
                className="w-full py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RSVP Simulation Modal */}
      {rsvpGuest && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-none sm:rounded-[2.5rem] w-full max-w-lg h-full sm:h-auto overflow-y-auto shadow-2xl flex flex-col animate-in slide-in-from-bottom-8 duration-500">
            <div className="relative h-40 sm:h-48 bg-rose-50 flex flex-col items-center justify-center overflow-hidden shrink-0">
              <div className="absolute inset-0 opacity-10">
                <Heart className="w-full h-full scale-150 rotate-12" />
              </div>
              <Heart className="w-12 h-12 text-rose-500 fill-rose-500 relative z-10 mb-2" />
              <h3 className="text-xs font-bold text-rose-600 uppercase tracking-[0.3em] relative z-10">Event Invitation</h3>
              <button 
                onClick={() => setRsvpGuest(null)}
                className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white transition-all shadow-sm"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="p-8 sm:p-10 text-center flex-1 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold serif italic mb-4 leading-tight">Dear {rsvpGuest.name},</h2>
              <p className="text-slate-600 text-sm sm:text-base mb-10 leading-relaxed italic">
                We are overjoyed to invite you to our upcoming milestone celebration. Your presence would truly complete our day.
              </p>

              <div className="space-y-3 sm:space-y-4 mb-10">
                <button 
                  onClick={() => handleUpdateRSVP(rsvpGuest.id, 'Confirmed', rsvpGuest.plusOne)}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-base sm:text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 active:scale-95"
                >
                  <CheckCircle className="w-5 h-5" /> Joyfully Accepts
                </button>
                <button 
                  onClick={() => handleUpdateRSVP(rsvpGuest.id, 'Declined', false)}
                  className="w-full py-4 bg-white border-2 border-slate-100 text-slate-500 rounded-2xl font-bold text-base hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <XCircle className="w-5 h-5" /> Regretfully Declines
                </button>
              </div>

              <div className="pt-8 border-t border-slate-100 mt-auto">
                <div className="flex items-center justify-between bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 text-left">
                    <div className="p-2 sm:p-3 bg-blue-100 rounded-xl">
                      <UsersIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-800">Plus One Access</div>
                      <div className="text-[10px] sm:text-xs text-slate-400">Bring a guest with you?</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setRsvpGuest({ ...rsvpGuest, plusOne: !rsvpGuest.plusOne })}
                    className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${rsvpGuest.plusOne ? 'bg-rose-500' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${rsvpGuest.plusOne ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 p-4 text-center shrink-0">
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-[0.4em]">EverAfter Event Suite &bull; Digital Invites</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guests;
