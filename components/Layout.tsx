
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Heart, Users, MessageSquare, MapPin, Settings2, Menu, X, Store, 
  LayoutDashboard, UserCog, Briefcase, FileText, DollarSign, 
  Calendar, ShieldCheck, PieChart, Users2, Bell, Search,
  ChevronDown, LogOut, Settings, User, Sparkles, Crown, ChevronRight
} from 'lucide-react';
import { useRole } from '../context/RoleContext.tsx';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { role } = useRole();

  const isDashboard = location.pathname.startsWith('/dashboard');

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavItems = [
    { path: '/', icon: Heart, label: 'Home' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/venues', icon: MapPin, label: 'Venues' },
    { path: '/vendors', icon: Store, label: 'Vendors' },
    { path: '/customizer', icon: Settings2, label: 'Architect' },
    { path: '/guests', icon: Users, label: 'Guests' },
    { path: '/planner', icon: MessageSquare, label: 'AI Assistant' },
  ];

  const roleLinks = useMemo(() => {
    switch (role) {
      case 'Admin':
        return [
          { label: 'Network', icon: Users2 },
          { label: 'Verification', icon: ShieldCheck },
          { label: 'Analytics', icon: PieChart },
          { label: 'Security', icon: Settings2 }
        ];
      case 'Vendor':
        return [
          { label: 'Contracts', icon: Briefcase },
          { label: 'Earnings', icon: DollarSign },
          { label: 'Portfolio', icon: FileText },
          { label: 'Leads', icon: Bell }
        ];
      case 'VenueOwner':
        return [
          { label: 'Bookings', icon: Calendar },
          { label: 'Ledger', icon: DollarSign },
          { label: 'Spaces', icon: MapPin },
          { label: 'Reviews', icon: Heart }
        ];
      case 'User':
      default:
        return [
          { label: 'Timeline', icon: Heart },
          { label: 'Guest List', icon: Users },
          { label: 'RSVP Hub', icon: MessageSquare },
          { label: 'Finances', icon: DollarSign }
        ];
    }
  }, [role]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col selection:bg-rose-100 selection:text-rose-900">
      {/* Global Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-2 shadow-sm' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Branding */}
            <Link 
              to="/" 
              className="flex items-center gap-2 group shrink-0" 
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="relative">
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-amber-400" />
                </div>
              </div>
              <span className={`text-2xl font-bold tracking-tight italic serif transition-colors duration-300 ${
                !scrolled && location.pathname === '/' ? 'text-white' : 'text-slate-900'
              }`}>
                EverAfter
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-300 group ${
                      isActive 
                        ? 'text-rose-600 bg-rose-50' 
                        : !scrolled && location.pathname === '/' 
                          ? 'text-white/80 hover:text-white hover:bg-white/10' 
                          : 'text-slate-500 hover:text-rose-600 hover:bg-slate-50'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 ${isActive ? 'scale-110' : 'opacity-70'}`} />
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Action Group */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`hidden md:flex items-center gap-1 ${!scrolled && location.pathname === '/' ? 'text-white/60' : 'text-slate-400'}`}>
                <button className="p-2.5 hover:bg-slate-100 rounded-full transition-all hover:text-slate-900 active:scale-90">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2.5 hover:bg-slate-100 rounded-full transition-all hover:text-rose-500 relative group active:scale-90">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white ring-1 ring-rose-500 group-hover:scale-125 transition-transform" />
                </button>
              </div>

              <div className={`h-8 w-px bg-slate-200/50 hidden sm:block mx-1 ${!scrolled && location.pathname === '/' ? 'bg-white/20' : ''}`} />
              
              {/* User Profile Simulation */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full font-bold text-xs transition-all shadow-sm border active:scale-95 group ${
                    !scrolled && location.pathname === '/'
                      ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      : 'bg-white border-slate-100 text-slate-800 hover:border-slate-300 shadow-slate-200/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-rose-400 flex items-center justify-center text-[10px] text-white shadow-inner">
                    JD
                  </div>
                  <span className="hidden sm:inline tracking-tight uppercase text-[10px]">Jane Doe</span>
                  <ChevronDown className={`w-3 h-3 opacity-50 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 p-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 border-b border-slate-50 mb-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 truncate">jane.doe@everafter.ai</p>
                    </div>
                    <div className="space-y-1">
                      {[
                        { label: 'My Profile', icon: User },
                        { label: 'Event Settings', icon: Settings },
                        { label: 'Upgrade Suite', icon: Crown, color: 'text-amber-500' },
                      ].map((p, i) => (
                        <button key={i} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                          <p.icon className={`w-4 h-4 ${p.color || 'text-slate-400'}`} /> {p.label}
                        </button>
                      ))}
                      <div className="h-px bg-slate-50 my-2" />
                      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-bold text-rose-600 hover:bg-rose-50 transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={toggleMenu}
                className={`lg:hidden p-2.5 rounded-2xl transition-all active:scale-90 ${
                  !scrolled && location.pathname === '/' 
                    ? 'text-white bg-white/10 hover:bg-white/20' 
                    : 'text-slate-600 bg-slate-50 hover:bg-slate-100'
                }`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Role-Based Workspace Sub-Nav */}
        {isDashboard && (
          <div className="bg-white/50 backdrop-blur-md border-t border-slate-100/50 overflow-x-auto scrollbar-hide shadow-inner">
            <div className="max-w-7xl mx-auto px-4 flex gap-6 h-14 items-center">
              <div className="flex items-center gap-2 whitespace-nowrap border-r border-slate-200 pr-6 mr-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.3em]">
                  {role} Workspace
                </span>
              </div>
              <div className="flex gap-4 sm:gap-8">
                {roleLinks.map((link, i) => (
                  <button 
                    key={i} 
                    className="flex items-center gap-2.5 text-[10px] font-bold text-slate-500 hover:text-rose-600 transition-all whitespace-nowrap group uppercase tracking-widest relative py-4"
                  >
                    <link.icon className="w-4 h-4 group-hover:scale-110 group-hover:-translate-y-0.5 transition-all text-slate-400 group-hover:text-rose-500" />
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-500 transition-all group-hover:w-full" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Overlay */}
        <div className={`fixed inset-0 bg-white z-[110] lg:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}>
          <div className="flex flex-col h-full pt-24 px-6 pb-10 overflow-y-auto">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-4">Main Menu</p>
              {mainNavItems.map((item, idx) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-4 px-6 py-5 rounded-[2rem] text-xl font-bold serif italic transition-all ${
                    location.pathname === item.path 
                    ? 'text-rose-600 bg-rose-50 shadow-sm' 
                    : 'text-slate-800 hover:bg-slate-50'
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <item.icon className={`w-6 h-6 ${location.pathname === item.path ? 'text-rose-500' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="mt-12 flex-1">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-4">Account</p>
               <div className="bg-slate-50 rounded-[2.5rem] p-6 space-y-4">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center font-bold text-white text-lg">JD</div>
                     <div>
                       <p className="font-bold text-slate-900">Jane Doe</p>
                       <p className="text-xs text-slate-500">jane.doe@everafter.ai</p>
                     </div>
                  </div>
                  <div className="h-px bg-slate-200" />
                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest">
                    Manage Profile
                  </button>
               </div>
            </div>

            <div className="mt-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span className="text-xl font-bold italic serif text-slate-900">EverAfter</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">&copy; 2025 Milestone Architecture</p>
            </div>
          </div>
          
          {/* Close button for mobile menu */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-4 bg-slate-900 text-white rounded-full shadow-2xl active:scale-90 transition-transform"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Spacer for sticky nav */}
      <div className={isDashboard ? 'h-32' : 'h-24'} />

      <main className="flex-grow">
        {children}
      </main>

      {/* Modern Footer */}
      <footer className="bg-white border-t border-slate-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-8">
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
                <span className="text-2xl font-bold italic serif text-slate-900">EverAfter</span>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                The world's most sophisticated digital architect for life's most significant milestones. 
                Intelligence meets elegance in every celebration.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Instagram', 'LinkedIn'].map(s => (
                  <button key={s} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
                    <Search className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-slate-400">Services</h5>
              <div className="space-y-4 text-xs font-bold text-slate-600 uppercase tracking-widest">
                <Link to="/venues" className="block hover:text-rose-600 transition-colors">Elite Venues</Link>
                <Link to="/vendors" className="block hover:text-rose-600 transition-colors">Verified Partners</Link>
                <Link to="/customizer" className="block hover:text-rose-600 transition-colors">Event Architect</Link>
                <Link to="/planner" className="block hover:text-rose-600 transition-colors">AI Concierge</Link>
              </div>
            </div>

            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-slate-400">Enterprise</h5>
              <div className="space-y-4 text-xs font-bold text-slate-600 uppercase tracking-widest">
                <a href="#" className="block hover:text-rose-600 transition-colors">Partner Program</a>
                <a href="#" className="block hover:text-rose-600 transition-colors">API Solutions</a>
                <a href="#" className="block hover:text-rose-600 transition-colors">Security Protocol</a>
                <a href="#" className="block hover:text-rose-600 transition-colors">Case Studies</a>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-rose-400">Join the Future</h5>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">Subscribe to our Milestone Quarterly for planning insights.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-xs focus:ring-1 focus:ring-rose-500 outline-none pr-12"
                />
                <button className="absolute right-2 top-2 w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-700 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-slate-100">
            <div className="flex gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               <a href="#" className="hover:text-slate-600">Privacy</a>
               <a href="#" className="hover:text-slate-600">Terms</a>
               <a href="#" className="hover:text-slate-600">Cookie Policy</a>
            </div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em] opacity-40">
              &copy; {new Date().getFullYear()} EverAfter Milestone Suite &bull; Digital Excellence
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
