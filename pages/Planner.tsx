import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Send, Sparkles, Wand2, Calculator, BookOpen, Info, ChevronRight, 
  Crown, Cake, TrendingUp, Plus, Trash2, LayoutDashboard, Briefcase,
  CheckCircle2, AlertCircle, Search, HelpCircle, Store, X, CreditCard,
  Users, Settings2, BadgeCheck, DollarSign, MapPin, SlidersHorizontal,
  Clock, FileText, ShieldCheck, UserCheck, MessageCircle, Star, Award,
  HeadphonesIcon, Save, Download, Share2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getWeddingAdvice, generateBudgetEstimate } from '../services/geminiService.ts';
import { ChatMessage, CustomExpense, EventType, HiredVendor, Venue } from '../types.ts';
import { VENUES, SERVICE_VENDORS } from '../constants.tsx';

// Mock expert data for human intervention
const EXPERT_PLANNERS = [
  { 
    id: 'exp1', 
    name: 'Elena Vance', 
    specialty: 'Luxury Weddings', 
    experience: '12 Years', 
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    bio: 'Expert in high-end coordination and international destination logistics.'
  },
  { 
    id: 'exp2', 
    name: 'Marcus Thorne', 
    specialty: 'Memorials & Galas', 
    experience: '15 Years', 
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    bio: 'Specialist in dignified burial services and corporate naming ceremonies.'
  },
  { 
    id: 'exp3', 
    name: 'Sarah Jenkins', 
    specialty: 'Design & Decor', 
    experience: '8 Years', 
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    bio: 'Award-winning visual designer focused on aesthetic cohesion.'
  }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{data.type}</p>
        <p className="text-sm font-bold text-slate-900 serif italic mb-1">{data.category}</p>
        <p className="text-lg font-bold text-rose-600">${data.amount.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const Planner: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm EverAfter AI. I can help you architect your event budget, match you with the perfect venue, and manage your vendor contracts. What milestone are we celebrating?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastBreakdown, setLastBreakdown] = useState<any[] | null>(null);
  const [customExpenses, setCustomExpenses] = useState<CustomExpense[]>([]);
  const [hiredVendors, setHiredVendors] = useState<HiredVendor[]>([]);
  const [activeTab, setActiveTab] = useState<'ai' | 'ledger' | 'vendors' | 'experts'>('ai');
  const [selectedEventType, setSelectedEventType] = useState<EventType>('Wedding');
  const [guestCount, setGuestCount] = useState(150);
  const [customEventName, setCustomEventName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Human Intervention states
  const [isHumanMode, setIsHumanMode] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [activeExpert, setActiveExpert] = useState<any | null>(null);

  // Modal states
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [pendingVendor, setPendingVendor] = useState<any | null>(null);
  const [showHireConfirmation, setShowHireConfirmation] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages, isTyping, activeTab]);

  const chartData = useMemo(() => {
    const data: any[] = [];
    if (lastBreakdown) {
      lastBreakdown.forEach(item => {
        const hasRealVendor = hiredVendors.some(v => v.category.toLowerCase().includes(item.category.toLowerCase()));
        if (!hasRealVendor) {
          data.push({ category: item.category, amount: item.amount, type: 'AI Estimate' });
        }
      });
    }
    hiredVendors.forEach(v => {
      data.push({ category: v.name, amount: v.price, type: 'Partner Contract' });
    });
    customExpenses.forEach(e => {
      data.push({ category: e.category, amount: e.amount, type: 'Manual Expense' });
    });
    return data.length > 0 ? data : null;
  }, [lastBreakdown, customExpenses, hiredVendors]);

  const totalBudget = useMemo(() => (chartData?.reduce((acc, curr) => acc + curr.amount, 0) || 0), [chartData]);

  const matchedVenues = useMemo(() => VENUES.filter(v => v.capacity >= guestCount).sort((a, b) => a.capacity - b.capacity), [guestCount]);

  const handleBudgetEstimation = async (eventType: string = "Wedding") => {
    const amount = 25000;
    const displayType = eventType === 'Other' ? (customEventName || 'Custom Event') : eventType;
    const userMsg = { role: 'user', text: `Architect a $${amount.toLocaleString()} budget for a ${displayType} with ${guestCount} guests.` } as ChatMessage;
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setActiveTab('ledger');

    try {
      const data = await generateBudgetEstimate(amount, displayType);
      if (data && data.breakdown) {
        setLastBreakdown(data.breakdown);
        const responseText = `I've architected a baseline budget for your ${displayType}. I've also matched ${matchedVenues.length} venues and several elite service partners. If you require specialized human coordination, you can now connect with our expert planners in the 'Experts' tab.`;
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "I encountered an error while calculating. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSavePlan = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `Your event plan for "${selectedEventType}" has been securely archived. I've synced your ledger, matched venues, and vendor contracts to your encrypted profile.` 
      }]);
      alert("Event plan saved successfully! You can access this anytime from your dashboard.");
    }, 1500);
  };

  const handleHumanRequest = (expert: any) => {
    setActiveExpert(expert);
    setShowExpertModal(true);
  };

  const startExpertSession = () => {
    setIsHumanMode(true);
    setShowExpertModal(false);
    setMessages(prev => [...prev, { 
      role: 'model', 
      text: `Expert Concierge joined: Hello, I'm ${activeExpert.name}. I've reviewed your current budget and vendor selections. I'm now monitoring this session to provide professional intervention and vendor negotiation support.` 
    }]);
    setActiveTab('ai');
  };

  const openHireConfirmation = (vendor: any) => {
    const isAlreadyHired = hiredVendors.some(hv => hv.id === vendor.id);
    if (isAlreadyHired) return;
    setPendingVendor(vendor);
    setShowHireConfirmation(true);
  };

  const confirmHireVendor = () => {
    if (!pendingVendor) return;
    const newVendor: HiredVendor = {
      id: pendingVendor.id.toString(),
      name: pendingVendor.name,
      category: pendingVendor.category || 'Venue',
      price: pendingVendor.price,
      isCustom: false
    };
    setHiredVendors(prev => [...prev, newVendor]);
    setMessages(prev => [...prev, { 
      role: 'model', 
      text: `${isHumanMode ? '[Verified by ' + activeExpert.name + ']' : ''} I have integrated ${pendingVendor.name} into your event architect. Your ledger has been updated.` 
    }]);
    setShowHireConfirmation(false);
    setPendingVendor(null);
    setActiveTab('ledger');
  };

  const removeVendor = (id: string) => {
    setHiredVendors(prev => prev.filter(v => v.id !== id));
  };

  const addCustomExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const category = formData.get('category') as string;
    const amountStr = formData.get('amount') as string;
    const amount = parseFloat(amountStr);

    if (category && !isNaN(amount)) {
      setCustomExpenses(prev => [...prev, { id: `manual-${Date.now()}`, category, amount }]);
      (e.target as HTMLFormElement).reset();
    }
  };

  const removeCustomExpense = (id: string) => {
    setCustomExpenses(prev => prev.filter(e => e.id !== id));
  };

  const handleSend = async (textToUse?: string) => {
    const messageText = textToUse || input;
    if (!messageText.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    setInput('');
    setIsTyping(true);
    const response = await getWeddingAdvice(messageText);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsTyping(false);
  };

  const quickActions = [
    { label: 'Wedding', icon: Crown, color: 'text-rose-600', bg: 'bg-rose-50', type: 'Wedding' },
    { label: 'Burial', icon: AlertCircle, color: 'text-slate-600', bg: 'bg-slate-100', type: 'Burial' },
    { label: 'Graduation', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50', type: 'Graduation' },
    { label: 'Other', icon: HelpCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', type: 'Other' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-10rem)]">
      
      {/* Sidebar: Navigation & Ledger */}
      <div className="w-full lg:w-[450px] flex flex-col gap-6 shrink-0">
        <div className="bg-white rounded-[2.5rem] p-2 border border-slate-100 shadow-sm flex gap-1">
          {[
            { id: 'ai', icon: Sparkles, label: 'AI' },
            { id: 'experts', icon: UserCheck, label: 'Experts' },
            { id: 'ledger', icon: Calculator, label: 'Ledger' },
            { id: 'vendors', icon: Briefcase, label: 'Partners' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-[10px] sm:text-xs transition-all ${
                activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar max-h-[80vh] pr-1">
          {activeTab === 'ai' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
              <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Architecture Suite</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {quickActions.map((action) => (
                    <button 
                      key={action.label} 
                      onClick={() => {
                        setSelectedEventType(action.type as EventType);
                        if (action.type !== 'Other') handleBudgetEstimation(action.type);
                      }} 
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all text-center active:scale-95 ${
                        selectedEventType === action.type ? 'ring-2 ring-rose-500 bg-rose-50/20' : ''
                      }`}
                    >
                      <div className={`${action.bg} p-3 rounded-xl`}><action.icon className={`w-5 h-5 ${action.color}`} /></div>
                      <span className="text-[11px] font-bold text-slate-700">{action.label}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expected Guests</label>
                    <span className="text-sm font-bold text-slate-900">{guestCount}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="1000" 
                    step="10" 
                    value={guestCount} 
                    onChange={(e) => setGuestCount(parseInt(e.target.value))} 
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-rose-500" 
                  />
                </div>
              </section>

              {!isHumanMode && (
                <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100">
                  <div className="flex items-center gap-2 mb-3">
                    <HeadphonesIcon className="w-4 h-4 text-amber-500" />
                    <h4 className="font-bold text-xs uppercase tracking-widest text-amber-900">Need Human Expertise?</h4>
                  </div>
                  <p className="text-[11px] leading-relaxed italic text-amber-800 mb-4">
                    "AI is great for estimates, but complex milestones often need a professional touch. Connect with a planner for verified service quality."
                  </p>
                  <button 
                    onClick={() => setActiveTab('experts')}
                    className="w-full py-2.5 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 transition-all"
                  >
                    View Expert Profiles
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'experts' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="bg-slate-900 p-6 rounded-[2rem] text-white">
                <h3 className="text-sm font-bold text-rose-400 uppercase tracking-widest mb-2">Concierge Pool</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Certified professionals available for real-time human intervention.</p>
              </div>
              {EXPERT_PLANNERS.map(expert => (
                <div key={expert.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm group hover:border-rose-200 transition-all">
                  <div className="flex gap-4 items-center mb-4">
                    <img src={expert.image} className="w-14 h-14 rounded-full object-cover border-2 border-slate-50" alt={expert.name} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <h4 className="font-bold text-sm text-slate-800 truncate">{expert.name}</h4>
                        <div className="flex items-center gap-1 text-amber-500"><Star className="w-3 h-3 fill-amber-500" /><span className="text-[10px] font-bold">{expert.rating}</span></div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3 h-3 text-blue-500" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{expert.specialty}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 italic mb-4 line-clamp-2">"{expert.bio}"</p>
                  <button 
                    onClick={() => handleHumanRequest(expert)}
                    className="w-full py-3 rounded-xl border-2 border-slate-50 text-[10px] font-bold text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Request Consultation
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ledger' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300 pb-10">
              <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Committed</h4>
                    <div className="text-3xl font-bold text-slate-900 serif">${totalBudget.toLocaleString()}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-emerald-500 font-bold text-[10px] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      {isHumanMode ? 'Expert Reviewed' : 'AI Estimate'}
                    </div>
                    <button 
                      onClick={handleSavePlan}
                      disabled={isSaving}
                      className="flex items-center gap-1.5 text-[10px] font-bold text-rose-600 hover:text-rose-700 transition-colors uppercase tracking-widest"
                    >
                      {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                      {isSaving ? 'Archiving...' : 'Save Event Plan'}
                    </button>
                  </div>
                </div>

                {chartData && (
                  <div className="h-64 mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} layout="vertical" margin={{ left: -10, right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="category" type="category" width={90} fontSize={9} axisLine={false} tickLine={false} />
                        <Tooltip 
                          cursor={{ fill: '#f8fafc' }} 
                          content={<CustomTooltip />}
                        />
                        <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={
                              entry.type === 'Partner Contract' ? '#6366f1' : 
                              entry.type === 'Manual Expense' ? '#10b981' : '#f43f5e'
                            } />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                   {hiredVendors.map(v => (
                    <div key={v.id} className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100 mb-2 group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Store className="w-4 h-4" /></div>
                        <div>
                          <div className="text-xs font-bold text-slate-800">{v.name}</div>
                          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">{v.category}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-slate-900">${v.price.toLocaleString()}</span>
                        <button onClick={() => removeVendor(v.id)} className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {customExpenses.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-2">Manual Expenses</h5>
                      {customExpenses.map(e => (
                        <div key={e.id} className="flex justify-between items-center p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100 mb-2 group">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Plus className="w-4 h-4" /></div>
                             <div className="text-xs font-bold text-slate-800">{e.category}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-sm text-slate-900">${e.amount.toLocaleString()}</span>
                            <button onClick={() => removeCustomExpense(e.id)} className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Add Manual Expense</h5>
                  <form onSubmit={addCustomExpense} className="flex gap-2">
                    <input name="category" placeholder="e.g. Attire, Gifts" required className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-xs focus:ring-1 focus:ring-rose-500 outline-none" />
                    <input name="amount" type="number" placeholder="$" required className="w-24 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-xs focus:ring-1 focus:ring-rose-500 outline-none" />
                    <button type="submit" className="bg-slate-900 text-white px-4 py-3 rounded-xl hover:bg-rose-600 transition-all shadow-md">
                      <Plus className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </section>

              {/* Action Toolbar */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95">
                  <Download className="w-4 h-4" /> Export PDF
                </button>
                <button className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95">
                  <Share2 className="w-4 h-4" /> Share Access
                </button>
              </div>
            </div>
          )}

          {activeTab === 'vendors' && (
             <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                <section className="bg-white p-6 rounded-[2rem] border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recommended Partners</h3>
                  <div className="space-y-3">
                    {SERVICE_VENDORS.map(v => {
                      const isHired = hiredVendors.some(hv => hv.id === v.id);
                      return (
                        <div key={v.id} className="bg-slate-50 p-4 rounded-2xl flex gap-3 items-center group">
                          <img src={v.image} className="w-12 h-12 rounded-xl object-cover shrink-0" alt="" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-slate-800 truncate">{v.name}</h4>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">{v.category}</p>
                          </div>
                          <button 
                            disabled={isHired}
                            onClick={() => openHireConfirmation(v)}
                            className={`p-2 rounded-lg transition-all ${isHired ? 'text-emerald-500' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                          >
                            {isHired ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </section>
             </div>
          )}
        </div>
      </div>

      {/* Main Interaction Area: AI Chat */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex-1 bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${isHumanMode ? 'bg-amber-500' : 'bg-slate-900'}`}>
                {isHumanMode ? <Award className="w-6 h-6 text-white" /> : <Sparkles className="w-6 h-6 text-rose-400" />}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-base truncate">{isHumanMode ? `Concierge: ${activeExpert.name}` : 'EverAfter Architect'}</h3>
                <span className={`text-[10px] font-bold flex items-center gap-1 tracking-wider uppercase ${isHumanMode ? 'text-amber-600' : 'text-emerald-600'}`}>
                  <span className={`w-2 h-2 rounded-full animate-pulse ${isHumanMode ? 'bg-amber-500' : 'bg-emerald-500'}`} /> 
                  {isHumanMode ? 'Expert Intervention Active' : 'Live AI Reasoning'}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
               {isHumanMode && (
                 <button 
                  onClick={() => { setIsHumanMode(false); setMessages(prev => [...prev, { role: 'model', text: "Expert intervention ended. Returning to AI Architect mode." }]); }}
                  className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-bold uppercase hover:bg-rose-50 hover:text-rose-500 transition-all"
                 >
                   End Expert Session
                 </button>
               )}
               <button className="p-2.5 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors"><Settings2 className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-slate-50/20 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                {m.role === 'model' && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0 mt-1 ${isHumanMode ? 'bg-amber-50 text-amber-500' : 'bg-rose-50 text-rose-500'}`}>
                    {isHumanMode ? <Award className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>
                )}
                <div className={`max-w-[85%] sm:max-w-[75%] rounded-[2rem] px-6 py-4 sm:px-8 sm:py-5 text-sm sm:text-base leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-300' 
                    : `bg-white border border-slate-100 text-slate-800 shadow-sm ${isHumanMode ? 'ring-1 ring-amber-200' : ''}`
                }`}>
                  {m.text.split('\n').map((line, idx) => (
                    <p key={idx} className={idx > 0 ? 'mt-3' : ''}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl px-5 py-3 flex gap-1.5 items-center shadow-sm">
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-6 sm:p-10 bg-white border-t shrink-0">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2 sm:gap-4 relative">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder={isHumanMode ? `Messaging ${activeExpert.name}...` : "Discuss budgets, request speech outlines, or vendor tips..."} 
                className="flex-1 bg-slate-50 border-none rounded-3xl px-6 py-4 sm:py-6 focus:ring-2 focus:ring-rose-500 text-sm sm:text-base shadow-inner pr-20" 
              />
              <button 
                type="submit"
                className={`absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-3.5 sm:p-4 rounded-2xl text-white transition-all shadow-lg active:scale-95 shrink-0 ${isHumanMode ? 'bg-amber-500 hover:bg-amber-600' : 'bg-slate-900 hover:bg-rose-600'}`}
              >
                <Send className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Expert Intervention Modal */}
      {showExpertModal && activeExpert && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden border border-slate-100 p-8 sm:p-10 flex flex-col">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative mb-6">
                <img src={activeExpert.image} className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 shadow-xl" alt="" />
                <div className="absolute bottom-0 right-0 bg-amber-500 text-white p-2 rounded-full shadow-lg">
                  <BadgeCheck className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-bold serif italic text-slate-800 mb-2">Request Expert Liaison</h3>
              <p className="text-xs text-slate-500 leading-relaxed italic max-w-xs">
                "You are about to connect with {activeExpert.name}. This is a premium human-in-the-loop service for high-touch coordination."
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 mb-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm"><HeadphonesIcon className="w-4 h-4 text-amber-500" /></div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time Intervention</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm"><ShieldCheck className="w-4 h-4 text-emerald-500" /></div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contract Verification</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setShowExpertModal(false)} className="py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">Cancel</button>
              <button onClick={startExpertSession} className="py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-amber-600 transition-all shadow-lg flex items-center justify-center gap-2">
                Join Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contract Confirmation Modal */}
      {showHireConfirmation && pendingVendor && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden border border-slate-100 flex flex-col">
            <div className="relative h-40 bg-slate-900 flex items-center justify-center overflow-hidden">
              <img src={pendingVendor.image} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[2px] scale-110" alt="" />
              <div className="relative z-10 flex flex-col items-center gap-2 text-white">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                  {isHumanMode ? <Award className="w-8 h-8 text-amber-500" /> : <BadgeCheck className="w-8 h-8 text-rose-600" />}
                </div>
                <h3 className="text-xl font-bold serif italic">Confirm Hire</h3>
              </div>
              <button onClick={() => setShowHireConfirmation(false)} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-8 sm:p-10">
              <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><FileText className="w-4 h-4" /> Contract Details</h4>
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Partner</span>
                    <p className="text-sm text-slate-800 font-bold leading-relaxed">{pendingVendor.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Contract Amount</span>
                      <div className="flex items-baseline gap-1 text-rose-600">
                        <span className="text-xs font-bold">$</span>
                        <span className="text-xl font-bold">{pendingVendor.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Validation</span>
                      <div className={`text-[9px] font-bold px-3 py-1 rounded-full inline-block mt-1 ${isHumanMode ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {isHumanMode ? `Expert Reviewed` : 'AI Verified'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setShowHireConfirmation(false)} className="py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">Cancel</button>
                <button onClick={confirmHireVendor} className="py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-100">
                  <CreditCard className="w-5 h-5" /> Confirm Contract
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Vendor Modal */}
      {showAddVendorModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 sm:p-10 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold serif italic text-slate-800">Register Partner</h3>
              <button onClick={() => setShowAddVendorModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowAddVendorModal(false); }} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Business Name</label>
                <input name="name" required placeholder="Partner Name" className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-sm focus:ring-2 focus:ring-rose-500 outline-none" />
              </div>
              <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all flex items-center justify-center gap-2 mt-4 shadow-xl shadow-slate-200">
                <Plus className="w-5 h-5" /> Integrate Partner
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Loading Overlay for Saving */}
      {isSaving && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[300] flex items-center justify-center">
          <div className="bg-white px-8 py-6 rounded-[2rem] shadow-2xl flex items-center gap-4 animate-in zoom-in-95">
            <Loader2 className="w-6 h-6 text-rose-500 animate-spin" />
            <span className="font-bold text-slate-800 serif italic">Syncing Your Event Architect...</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Fixed: Added Loader2 to the icons list
const Loader2 = ({className}: {className?: string}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
);

export default Planner;