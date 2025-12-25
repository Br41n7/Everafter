
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Heart, ShieldCheck, Milestone, GraduationCap, Flower2 } from 'lucide-react';

const Home: React.FC = () => {
  const categories = [
    { name: 'Weddings', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
    { name: 'Burials', icon: Flower2, color: 'text-slate-600', bg: 'bg-slate-100' },
    { name: 'Graduations', icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Naming', icon: Milestone, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative min-h-[85vh] flex items-center overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-[0.45]"
            alt="Event Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-white text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span className="text-xs sm:text-sm font-medium tracking-wide">The Gold Standard in Event Planning</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-lg serif leading-[1.1] sm:leading-tight">
            Life's Milestones, <br className="hidden sm:block" /> 
            <span className="italic text-rose-300">Beautifully</span> Managed
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-10 text-slate-200 max-w-3xl mx-auto drop-shadow-md leading-relaxed px-4">
            From intimate naming ceremonies to grand weddings, EverAfter provides the digital elegance and AI-powered intelligence your celebration deserves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Link 
              to="/customizer" 
              className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white px-8 md:px-10 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-xl shadow-rose-900/20 active:scale-95 text-center"
            >
              Start Planning
            </Link>
            <Link 
              to="/planner" 
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-8 md:px-10 py-4 rounded-full text-lg font-semibold transition-all text-center"
            >
              Talk to AI Assistant
            </Link>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 sm:-mt-16 lg:-mt-20 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-white p-6 sm:p-8 lg:p-10 rounded-[2rem] shadow-xl text-center group hover:translate-y-[-8px] transition-all duration-300 border border-slate-100 flex flex-col items-center">
              <div className={`${cat.bg} w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-transform group-hover:rotate-6`}>
                <cat.icon className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ${cat.color}`} />
              </div>
              <h4 className="font-bold text-slate-800 text-sm sm:text-base lg:text-xl serif">{cat.name}</h4>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-2 font-medium tracking-widest uppercase">Planning Suite</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 serif text-slate-900">Experience Intelligent Planning</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">Every feature is designed to remove stress and add sophistication to your milestone journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {[
            {
              icon: Sparkles,
              color: "text-rose-600",
              bg: "bg-rose-100",
              title: "Milestone AI",
              desc: "Our Gemini-powered assistant helps write everything from heartfelt vows to dignified eulogies and graduation speeches."
            },
            {
              icon: Calendar,
              color: "text-blue-600",
              bg: "bg-blue-100",
              title: "RSVP Engine",
              desc: "Unified guest management for celebrations and memorials with automated communications and real-time tracking."
            },
            {
              icon: ShieldCheck,
              color: "text-emerald-600",
              bg: "bg-emerald-100",
              title: "Verified Vendors",
              desc: "Book trusted venues and caterers with secure Paystack-integrated deposits and verified service reviews."
            }
          ].map((feature, idx) => (
            <div key={idx} className="text-center p-8 sm:p-10 rounded-[2.5rem] bg-white shadow-sm border border-slate-100 hover:shadow-2xl hover:border-rose-100 transition-all duration-500 flex flex-col items-center">
              <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-8`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 serif">{feature.title}</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
