
import React, { useMemo } from 'react';
import { 
  Users, Store, MapPin, DollarSign, TrendingUp, 
  Calendar, Clock, CheckCircle2, ArrowUpRight, 
  MessageSquare, Star, UserCog,
  ChevronRight, Crown, Heart, Award, BadgeCheck,
  Plus, ShieldAlert, FileText, Settings, Download,
  Filter, UserPlus, Check, X,
  Briefcase, Landmark
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { useRole } from '../context/RoleContext.tsx';

// --- MOCK DATA ---
const performanceData = [
  { name: 'Mon', value: 4000, bookings: 12 },
  { name: 'Tue', value: 3000, bookings: 8 },
  { name: 'Wed', value: 2000, bookings: 15 },
  { name: 'Thu', value: 2780, bookings: 10 },
  { name: 'Fri', value: 1890, bookings: 18 },
  { name: 'Sat', value: 2390, bookings: 25 },
  { name: 'Sun', value: 3490, bookings: 22 },
];

// --- REUSABLE COMPONENTS ---

const QuickActionCard = ({ icon: Icon, label, description, onClick, colorClass }: any) => (
  <button 
    onClick={onClick}
    className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all text-left group flex items-start gap-4 w-full"
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="font-bold text-slate-800 text-sm mb-1">{label}</p>
      <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{description}</p>
    </div>
  </button>
);

// --- VIEW COMPONENTS ---

const AdminView = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { label: 'Total Volume', value: '$2.4M', icon: Landmark, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Network Users', value: '42.8k', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Partner Count', value: '892', icon: Store, color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'System Health', value: '99.9%', icon: ShieldAlert, color: 'text-amber-600', bg: 'bg-amber-50' },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className={`${stat.bg} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
          <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold serif italic">Platform Analytics</h3>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase">Volume</button>
              <button className="px-4 py-1.5 bg-slate-50 text-slate-400 rounded-full text-[10px] font-bold uppercase">Users</button>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="adminGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="value" stroke="#f43f5e" fillOpacity={1} fill="url(#adminGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold serif italic mb-6">Verification Queue</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                <tr>
                  <th className="pb-4">Partner Name</th>
                  <th className="pb-4">Category</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: 'Luxe Floral Co', type: 'Florist', status: 'Pending' },
                  { name: 'Apex Catering', type: 'Catering', status: 'In Review' },
                  { name: 'Skyline Venues', type: 'Venue', status: 'Flagged' },
                ].map((item, i) => (
                  <tr key={i} className="group">
                    <td className="py-4 font-bold text-sm text-slate-800">{item.name}</td>
                    <td className="py-4 text-xs text-slate-500">{item.type}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${
                        item.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                        item.status === 'In Review' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'
                      }`}>{item.status}</span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg"><Check className="w-4 h-4" /></button>
                        <button className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg"><X className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-4">
           <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Management Tools</h4>
           <QuickActionCard icon={UserPlus} label="Invite Partner" description="Add curated service providers." colorClass="bg-blue-50 text-blue-600" />
           <QuickActionCard icon={FileText} label="Audit Logs" description="Review security events." colorClass="bg-slate-50 text-slate-600" />
           <QuickActionCard icon={Settings} label="Global Rules" description="Configure commission rates." colorClass="bg-rose-50 text-rose-600" />
           <QuickActionCard icon={Download} label="Export Ledger" description="Annual financial reporting." colorClass="bg-emerald-50 text-emerald-600" />
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
           <h4 className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.2em] mb-4">Security Status</h4>
           <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><ShieldAlert className="w-6 h-6 text-emerald-400" /></div>
              <div>
                <p className="text-lg font-bold">Encrypted</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">All systems nominal</p>
              </div>
           </div>
           <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase transition-all">Scan Network</button>
        </div>
      </div>
    </div>
  </div>
);

const VendorView = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
        <h4 className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-2 relative z-10">Available Earnings</h4>
        <div className="text-5xl font-bold serif mb-8 relative z-10">$14,820.00</div>
        <button className="bg-white/10 hover:bg-white text-white hover:text-slate-900 px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all relative z-10 flex items-center gap-2">
          Initiate Payout <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Contract Health</h4>
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-slate-600">Active Gigs</span>
              <span className="text-2xl font-bold text-slate-900">12</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[70%]" />
            </div>
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-slate-600">Pending Invoices</span>
              <span className="text-xl font-bold text-slate-900">3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-4 border border-amber-100">
          <Star className="w-10 h-10 text-amber-500 fill-amber-500" />
        </div>
        <h4 className="text-3xl font-bold serif text-slate-900">4.9</h4>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Certified Partner Rating</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold serif italic">Gig Schedule</h3>
          <button className="text-rose-600 text-[10px] font-bold uppercase tracking-widest hover:underline">View Calendar</button>
        </div>
        <div className="space-y-2">
          {[
            { client: 'The Miller Wedding', date: 'Oct 12, 2025', type: 'Full Day', status: 'Confirmed', fee: '$2,800' },
            { client: 'Rivers Memorial Gala', date: 'Oct 15, 2025', type: 'Evening', status: 'In Review', fee: '$1,500' },
            { client: 'Azure Graduation', date: 'Oct 20, 2025', type: 'Afternoon', status: 'Pending', fee: '$1,200' },
          ].map((gig, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-slate-50 rounded-2xl transition-all group border border-transparent hover:border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 font-bold text-xs">{gig.date.split(' ')[0]}</div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{gig.client}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{gig.date} • {gig.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4 sm:mt-0">
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-600">{gig.fee}</p>
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${
                    gig.status === 'Confirmed' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>{gig.status}</span>
                </div>
                <button className="p-2 hover:bg-white rounded-xl shadow-sm text-slate-400"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
         <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Partner Tools</h4>
         <QuickActionCard icon={Calendar} label="Update Availability" description="Sync your blackout dates." colorClass="bg-rose-50 text-rose-600" />
         <QuickActionCard icon={MessageSquare} label="Inquiry Inbox" description="Respond to new leads." colorClass="bg-blue-50 text-blue-600" />
         <QuickActionCard icon={FileText} label="Contracts Hub" description="Review terms and sign-offs." colorClass="bg-emerald-50 text-emerald-600" />
         <QuickActionCard icon={TrendingUp} label="Marketing Profile" description="Update portfolio gallery." colorClass="bg-slate-50 text-slate-600" />
      </div>
    </div>
  </div>
);

const VenueView = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
     <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
       <div className="lg:col-span-3 space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-2xl font-bold serif italic">Space Utilization</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Occupancy Forecast</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-slate-900">82%</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Peak Season: Active</p>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="name" hide />
                  <Tooltip />
                  <Bar dataKey="bookings" radius={[12, 12, 0, 0]}>
                    {performanceData.map((entry, index) => (
                      <Cell key={index} fill={entry.bookings > 20 ? '#f43f5e' : '#e2e8f0'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold serif italic mb-8">Reservation Inquiries</h3>
            <div className="space-y-4">
              {[
                { type: 'Garden Wedding', guests: 200, date: 'June 2026', revenue: '$15,000', client: 'Alice & Bob' },
                { type: 'Corporate Gala', guests: 450, date: 'Dec 2025', revenue: '$22,000', client: 'TechCorp Inc.' },
              ].map((inq, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-slate-50 rounded-[2.5rem] gap-4 border border-slate-100 hover:border-slate-200 transition-all">
                   <div className="flex items-center gap-4">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm"><Crown className="w-7 h-7 text-rose-500" /></div>
                     <div>
                       <h4 className="font-bold text-slate-900 text-lg leading-tight">{inq.type}</h4>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{inq.client} • {inq.date}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-6">
                     <div className="text-right">
                       <p className="text-xl font-bold text-slate-900">{inq.revenue}</p>
                       <p className="text-[10px] text-slate-500 font-bold uppercase">Pending Response</p>
                     </div>
                     <div className="flex gap-2">
                       <button className="p-3 bg-white hover:bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm border border-slate-100"><Check className="w-5 h-5" /></button>
                       <button className="p-3 bg-white hover:bg-rose-50 text-rose-600 rounded-2xl shadow-sm border border-slate-100"><X className="w-5 h-5" /></button>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
       </div>

       <div className="space-y-6">
          <div className="bg-rose-50 p-8 rounded-[3rem] border border-rose-100">
             <h4 className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-6">Venue Reputation</h4>
             <div className="flex items-baseline gap-2 mb-2">
               <span className="text-5xl font-bold serif text-rose-900">4.8</span>
               <span className="text-sm font-bold text-rose-400">/ 5.0</span>
             </div>
             <div className="flex gap-1 mb-8">
               {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-rose-500 text-rose-500" />)}
             </div>
             <button className="w-full py-3 bg-rose-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-rose-700 shadow-lg shadow-rose-100 transition-all">View All Reviews</button>
          </div>

          <div className="grid grid-cols-1 gap-4">
             <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Space Ops</h4>
             <QuickActionCard icon={MapPin} label="Manage Floorplans" description="Visual spatial planning." colorClass="bg-blue-50 text-blue-600" />
             <QuickActionCard icon={DollarSign} label="Financial Reports" description="Quarterly revenue breakdown." colorClass="bg-emerald-50 text-emerald-600" />
             <QuickActionCard icon={Users} label="Staff Schedule" description="Coordinate logistics team." colorClass="bg-slate-50 text-slate-600" />
          </div>
       </div>
     </div>
  </div>
);

const UserView = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="relative h-80 rounded-[3.5rem] overflow-hidden group shadow-2xl shadow-slate-200">
      <img 
        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200" 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.4]"
        alt="My Event"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
           <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 backdrop-blur-md rounded-full border border-white/20 mb-4">
               <BadgeCheck className="w-3 h-3 text-rose-400" />
               <span className="text-[10px] font-bold text-white uppercase tracking-widest">Active Wedding Milestone</span>
             </div>
             <h2 className="text-5xl font-bold text-white serif italic mb-2">The Miller-Thorne Celebration</h2>
             <div className="flex items-center gap-4 text-white/70 text-sm">
               <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-rose-500" /> Oct 24, 2025</span>
               <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
               <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-rose-500" /> Golden Oak Estate</span>
             </div>
           </div>
           <div className="bg-white/10 backdrop-blur-xl px-8 py-6 rounded-[2.5rem] border border-white/20 text-white text-right">
             <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 opacity-60">Guest Countdown</p>
             <p className="text-4xl font-bold serif italic">142 <span className="text-base font-sans font-normal opacity-50 not-italic">/ 200</span></p>
             <div className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mt-2 flex items-center justify-end gap-1.5">
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" /> Finalizing Responses
             </div>
           </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
         <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold serif italic">Budget Architecture</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Live Spending Track</p>
              </div>
              <div className="text-right">
                 <p className="text-3xl font-bold text-slate-900">$32,450</p>
                 <p className="text-[10px] text-slate-400 font-bold uppercase">of $50k Total</p>
              </div>
            </div>
            <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-rose-500 w-[65%] rounded-full shadow-lg" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { label: 'Venue', value: '$15k', color: 'bg-blue-500' },
                { label: 'Catering', value: '$8.4k', color: 'bg-emerald-500' },
                { label: 'Decor', value: '$4.2k', color: 'bg-amber-500' },
                { label: 'Misc', value: '$4.8k', color: 'bg-slate-400' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                     <div className={`w-2 h-2 rounded-full ${item.color}`} />
                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                  </div>
                  <p className="font-bold text-slate-800">{item.value}</p>
                </div>
              ))}
            </div>
         </div>

         <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold serif italic mb-6">Confirmed Partners</h3>
            <div className="space-y-3">
               {[
                 { name: 'Elite Catering', category: 'Catering', price: '$8,400', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=100' },
                 { name: 'Bloom & Petal', category: 'Florist', price: '$2,200', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=100' },
                 { name: 'SnapMagic Photo', category: 'Photography', price: '$2,800', image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=100' },
               ].map((v, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group cursor-pointer hover:bg-rose-50/50 transition-all border border-transparent hover:border-rose-100">
                   <div className="flex items-center gap-4">
                     <img src={v.image} className="w-12 h-12 rounded-xl object-cover shrink-0" alt="" />
                     <div>
                       <p className="text-sm font-bold text-slate-900">{v.name}</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{v.category}</p>
                     </div>
                   </div>
                   <div className="text-right flex items-center gap-4">
                      <span className="font-bold text-sm text-slate-800">{v.price}</span>
                      <button className="p-2 hover:bg-white rounded-lg transition-all"><MessageSquare className="w-4 h-4 text-slate-400" /></button>
                   </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="space-y-6">
         <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-center items-center text-center shadow-xl shadow-slate-300">
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-md">
              <MessageSquare className="w-10 h-10 text-rose-400" />
            </div>
            <h4 className="text-2xl font-bold serif italic mb-2">EverAfter AI</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-8">Need help with your wedding vows, guest seating, or a speech outline?</p>
            <button className="w-full py-5 bg-rose-600 hover:bg-rose-700 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-xl shadow-rose-900/40 active:scale-95" onClick={() => window.location.hash = '#/planner'}>Launch Planner</button>
         </div>

         <div className="grid grid-cols-1 gap-4">
             <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Next Milestones</h4>
             <QuickActionCard icon={Users} label="Manage Guest List" description="Track RSVPs and diets." colorClass="bg-blue-50 text-blue-600" onClick={() => window.location.hash = '#/guests'} />
             <QuickActionCard icon={MessageSquare} label="Draft Speeches" description="AI assistance for vows." colorClass="bg-rose-50 text-rose-600" onClick={() => window.location.hash = '#/planner'} />
             <QuickActionCard icon={DollarSign} label="Check Budget" description="Update manual expenses." colorClass="bg-emerald-50 text-emerald-600" onClick={() => window.location.hash = '#/planner'} />
         </div>
      </div>
    </div>
  </div>
);

// --- MAIN DASHBOARD COMPONENT ---

const Dashboard: React.FC = () => {
  const { role, setRole } = useRole();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Dynamic Command Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-8">
        <div>
          <div className="inline-flex items-center gap-2 text-rose-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">
             <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" /> Enterprise Console
          </div>
          <h1 className="text-4xl md:text-6xl font-bold serif italic mb-2 tracking-tight">Command Center</h1>
          <p className="text-slate-500 text-sm max-w-lg">Managing excellence across the EverAfter ecosystem for all milestone participants.</p>
        </div>
        
        <div className="bg-white p-2 rounded-3xl border border-slate-100 shadow-sm flex flex-wrap gap-1.5 overflow-hidden">
          {([
            { id: 'User', icon: Heart, label: 'Client' },
            { id: 'Vendor', icon: Store, label: 'Partner' },
            { id: 'VenueOwner', icon: MapPin, label: 'Venue' },
            { id: 'Admin', icon: UserCog, label: 'SuperAdmin' }
          ] as const).map(item => (
            <button
              key={item.id}
              onClick={() => setRole(item.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-[10px] font-bold uppercase transition-all whitespace-nowrap ${
                role === item.id 
                ? 'bg-slate-900 text-white shadow-xl scale-105 z-10' 
                : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic View Rendering */}
      <div className="min-h-[600px]">
        {role === 'Admin' && <AdminView />}
        {role === 'Vendor' && <VendorView />}
        {role === 'VenueOwner' && <VenueView />}
        {role === 'User' && <UserView />}
      </div>
    </div>
  );
};

export default Dashboard;
