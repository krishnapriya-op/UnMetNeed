import React from 'react';
import { Sparkles, BrainCircuit } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  signalsCount: number;
  opportunitiesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  setActiveTab,
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

        {/* Right Status & Quick Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#26292D] border border-[#3C4044] text-xs text-[#EDBF9B]">
            <span className="w-2 h-2 rounded-full bg-[#FD7B41] animate-pulse"></span>
            <span>NLP Embedding Pipeline Active</span>
          </div>

          <button
            onClick={() => {
              setActiveTab('analyzer');
              const el = document.getElementById('main-feed');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-xl bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-[#1B1D1F] font-bold text-xs flex items-center gap-1.5 shadow-glow-orange transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch AI Studio</span>
          </button>
        </div>
      </div>
    </header>
  );
};
