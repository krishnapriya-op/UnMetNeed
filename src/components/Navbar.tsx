import React from 'react';
import { Sparkles, BrainCircuit, Compass, Layers, Radio, Heart } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  signalsCount: number;
  opportunitiesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  signalsCount,
  opportunitiesCount,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#1B1D1F]/90 backdrop-blur-md border-b border-[#3C4044] shadow-glow-dark">
      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('opportunities')}>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FD7B41] to-[#3C4044] p-[1px] shadow-glow-orange">
            <div className="w-full h-full bg-[#26292D] rounded-[11px] flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-[#FD7B41]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#DDDCDB]">UnMetNeed</span>
              <span className="bg-[#FD7B41]/15 text-[#FD7B41] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#FD7B41]/30 tracking-wider uppercase">AI System</span>
            </div>
            <p className="text-[11px] text-[#EDBF9B] tracking-wide -mt-0.5">
              Market Gap Discovery & Opportunity Engine
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#26292D] p-1.5 rounded-xl border border-[#3C4044]">
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'opportunities'
                ? 'bg-[#3C4044] text-[#FD7B41] shadow-sm border border-[#FD7B41]/30'
                : 'text-[#DDDCDB]/70 hover:text-[#DDDCDB] hover:bg-[#3C4044]/40'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Opportunities ({opportunitiesCount})
          </button>

          <button
            onClick={() => setActiveTab('clusters')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'clusters'
                ? 'bg-[#3C4044] text-[#FD7B41] shadow-sm border border-[#FD7B41]/30'
                : 'text-[#DDDCDB]/70 hover:text-[#DDDCDB] hover:bg-[#3C4044]/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Clusters
          </button>

          <button
            onClick={() => setActiveTab('empathy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'empathy'
                ? 'bg-[#3C4044] text-[#FD7B41] shadow-sm border border-[#FD7B41]/30'
                : 'text-[#DDDCDB]/70 hover:text-[#DDDCDB] hover:bg-[#3C4044]/40'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Empathy & HMW
          </button>

          <button
            onClick={() => setActiveTab('signals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'signals'
                ? 'bg-[#3C4044] text-[#FD7B41] shadow-sm border border-[#FD7B41]/30'
                : 'text-[#DDDCDB]/70 hover:text-[#DDDCDB] hover:bg-[#3C4044]/40'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            Signals ({signalsCount})
          </button>

          <button
            onClick={() => setActiveTab('analyzer')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'analyzer'
                ? 'bg-[#FD7B41] text-[#1B1D1F] shadow-glow-orange'
                : 'text-[#FD7B41] hover:bg-[#FD7B41]/10 border border-[#FD7B41]/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Need Studio
          </button>
        </nav>

        {/* Right Status Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#26292D] border border-[#3C4044] text-xs text-[#EDBF9B]">
            <span className="w-2 h-2 rounded-full bg-[#FD7B41] animate-pulse"></span>
            <span>NLP Embedding Pipeline Active</span>
          </div>

          <button
            onClick={() => setActiveTab('analyzer')}
            className="md:hidden px-3.5 py-1.5 rounded-lg bg-[#FD7B41] text-[#1B1D1F] text-xs font-bold shadow-glow-orange"
          >
            + Analyze
          </button>
        </div>
      </div>
    </header>
  );
};
