import React from 'react';
import { BrainCircuit, BookOpen, Users } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[#3C4044] bg-[#141517] text-[#DDDCDB]/70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
        {/* Brand & Project Info */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#26292D] border border-[#3C4044] flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-[#FD7B41]" />
            </div>
            <span className="font-editorial text-xl font-bold text-[#DDDCDB]">UnMetNeed</span>
          </div>
          <p className="text-[#DDDCDB]/70 leading-relaxed max-w-md">
            An AI-Powered Unmet-Need Discovery and Innovation Opportunity Identification System.
            Bridging raw human rants and market whitespace through Natural Language Processing, semantic clustering, and evidence-based opportunity prioritization.
          </p>
          <div className="text-[11px] text-[#EDBF9B]">
            Styling Theme: <em>Calcite Black & Orange</em> (#1B1D1F, #26292D, #3C4044, #FD7B41, #EDBF9B, #DDDCDB) • Typography: <em>Libre Baskerville</em>
          </div>
        </div>

        {/* System Objectives */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-[#FD7B41] uppercase tracking-wider text-[11px]">
            <BookOpen className="w-3.5 h-3.5 text-[#FD7B41]" />
            Core Objectives
          </div>
          <p className="text-[#DDDCDB]">1. NLP Semantic Similarity Clustering</p>
          <p className="text-[#DDDCDB]">2. Public Internet Signal Aggregation</p>
          <p className="text-[#DDDCDB]">3. Incumbent Gap Analysis</p>
          <p className="text-[#DDDCDB]">4. Prioritized Startup Opportunities</p>
        </div>

        {/* Project Attribution */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-[#FD7B41] uppercase tracking-wider text-[11px]">
            <Users className="w-3.5 h-3.5 text-[#FD7B41]" />
            Innovation Engine
          </div>
          <p>
            <strong className="text-[#DDDCDB]">Platform Architecture:</strong> Next-Gen AI Pipeline
          </p>
          <p className="text-[11px] text-[#EDBF9B]">
            Automated Aspect-Based Sentiment Analysis (ABSA) & Multi-Factor Opportunity Index Scoring ($0-100$).
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#3C4044]/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#DDDCDB]/50 gap-4">
        <span>© 2026 UnMetNeed System. All rights reserved.</span>
        <span>Consistent Black, Charcoal & Orange Calcite Theme Active.</span>
      </div>
    </footer>
  );
};
