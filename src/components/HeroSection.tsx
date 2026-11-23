import React from 'react';
import { Sparkles, ArrowRight, TrendingUp, Layers, ShieldCheck, Compass, Lightbulb } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onAnalyzeClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onAnalyzeClick }) => {
  return (
    <div className="relative overflow-hidden pt-12 pb-14 border-b border-[#3C4044] bg-gradient-to-b from-[#26292D]/70 via-[#1B1D1F] to-[#1B1D1F]">
      {/* Calcite radial glow highlights */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#FD7B41]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#EDBF9B]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#26292D] border border-[#3C4044] text-xs text-[#EDBF9B] mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FD7B41] animate-ping" />
            <span className="font-semibold text-[#DDDCDB]">AI-Powered Unmet-Need Discovery & Opportunity Identification</span>
          </div>

          {/* Editorial Headline in Libre Baskerville */}
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#DDDCDB] tracking-tight leading-[1.18] mb-6">
            Identify genuine, unaddressed problems{' '}
            <span className="italic font-normal text-[#FD7B41] underline decoration-[#EDBF9B] decoration-wavy decoration-1 underline-offset-8">
              before
            </span>{' '}
            incumbents react.
          </h1>

          {/* Abstract / Value Proposition */}
          <p className="text-base sm:text-lg text-[#DDDCDB]/80 leading-relaxed max-w-3xl mx-auto mb-8 font-light">
            Every aspiring entrepreneur’s first roadblock is identifying a problem that is genuine, marketable, and high-impact.
            <strong className="text-[#DDDCDB] font-medium"> UnMetNeed</strong> gathers scattered complaints from forums, negative reviews, and publications—using
            <span className="text-[#FD7B41] font-medium"> NLP semantic clustering</span> to filter noise, group identical underlying needs, and prioritize startup opportunities.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={onAnalyzeClick}
              className="px-6 py-3 rounded-xl bg-[#FD7B41] text-[#1B1D1F] font-bold text-sm hover:bg-[#FD7B41]/90 transition-all flex items-center gap-2 shadow-glow-orange hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-[#1B1D1F]" />
              Run AI Need Analyzer
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreClick}
              className="px-6 py-3 rounded-xl bg-[#26292D] text-[#DDDCDB] border border-[#3C4044] font-semibold text-sm hover:bg-[#3C4044] hover:text-[#FD7B41] transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#FD7B41]" />
              Browse Prioritized Market Gaps
            </button>
          </div>

          {/* Key Metric Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-xl bg-[#26292D] border border-[#3C4044] backdrop-blur-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#EDBF9B]">Semantic Clusters</span>
                <Layers className="w-4 h-4 text-[#FD7B41]" />
              </div>
              <div className="text-2xl font-bold text-[#FD7B41]">6 Clusters</div>
              <p className="text-[11px] text-[#DDDCDB]/60 mt-0.5">Grouped by root need</p>
            </div>

            <div className="p-4 rounded-xl bg-[#26292D] border border-[#3C4044] backdrop-blur-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#EDBF9B]">Avg. Frustration</span>
                <TrendingUp className="w-4 h-4 text-[#EDBF9B]" />
              </div>
              <div className="text-2xl font-bold text-[#DDDCDB]">8.4 / 10</div>
              <p className="text-[11px] text-[#DDDCDB]/60 mt-0.5">High friction severity</p>
            </div>

            <div className="p-4 rounded-xl bg-[#26292D] border border-[#3C4044] backdrop-blur-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#EDBF9B]">Top Opportunity Score</span>
                <Lightbulb className="w-4 h-4 text-[#FD7B41]" />
              </div>
              <div className="text-2xl font-bold text-[#FD7B41]">94 / 100</div>
              <p className="text-[11px] text-[#DDDCDB]/60 mt-0.5">TheraScribe (HealthTech)</p>
            </div>

            <div className="p-4 rounded-xl bg-[#26292D] border border-[#3C4044] backdrop-blur-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#EDBF9B]">Incumbent Void</span>
                <ShieldCheck className="w-4 h-4 text-[#FD7B41]" />
              </div>
              <div className="text-2xl font-bold text-[#DDDCDB]">87% Moat Gap</div>
              <p className="text-[11px] text-[#DDDCDB]/60 mt-0.5">Lack dedicated tools</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
