import React from 'react';
import { Opportunity } from '../types';
import { Users, ArrowUpRight, Flame, ShieldAlert, Award } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSelect: (opp: Opportunity) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onSelect }) => {
  const getStatusBadge = (status: Opportunity['trendStatus']) => {
    switch (status) {
      case 'Critical High':
        return 'bg-red-500/15 text-red-300 border-red-500/40';
      case 'Surging':
        return 'bg-[#FD7B41]/15 text-[#FD7B41] border-[#FD7B41]/40';
      default:
        return 'bg-[#EDBF9B]/15 text-[#EDBF9B] border-[#EDBF9B]/30';
    }
  };

  return (
    <div className="calcite-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.015] hover:shadow-glow-dark flex flex-col justify-between group">
      <div>
        {/* Top Header: Sector + Status + Score */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#1B1D1F] text-[#EDBF9B] border border-[#3C4044]">
              {opportunity.sector}
            </span>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border flex items-center gap-1 ${getStatusBadge(opportunity.trendStatus)}`}>
              <Flame className="w-3 h-3" />
              {opportunity.trendStatus}
            </span>
          </div>

          {/* Opportunity Index Badge */}
          <div className="text-right flex-shrink-0">
            <div className="flex items-center gap-1 bg-[#1B1D1F] px-2.5 py-1 rounded-lg border border-[#FD7B41]/40 shadow-glow-orange">
              <Award className="w-4 h-4 text-[#FD7B41]" />
              <span className="text-lg font-bold text-[#FD7B41] font-mono leading-none">
                {opportunity.opportunityScore}
              </span>
              <span className="text-[10px] text-[#DDDCDB]/60 font-mono">/100</span>
            </div>
            <span className="text-[10px] text-[#DDDCDB]/60 block mt-0.5">Opportunity Index</span>
          </div>
        </div>

        {/* Title in Libre Baskerville */}
        <h3 className="font-editorial text-xl font-bold text-[#DDDCDB] group-hover:text-[#FD7B41] transition-colors leading-snug mb-3">
          {opportunity.title}
        </h3>

        {/* Root Unmet Need Quote Box */}
        <div className="bg-[#1B1D1F] rounded-xl p-3.5 mb-4 border-l-4 border-[#FD7B41] border-y border-r border-[#3C4044]">
          <span className="text-[10px] font-bold text-[#FD7B41] uppercase tracking-wider block mb-1">
            Core Unmet Need (NLP Extracted)
          </span>
          <p className="text-xs text-[#DDDCDB] italic leading-relaxed">
            "{opportunity.rootNeed}"
          </p>
        </div>

        {/* Persona & Current Workaround Snippet */}
        <div className="space-y-2 mb-5 text-xs text-[#DDDCDB]/70">
          <div className="flex items-start gap-2">
            <Users className="w-4 h-4 text-[#EDBF9B] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#DDDCDB]">{opportunity.targetPersona.role}</strong>
              <p className="line-clamp-1 text-[11px] text-[#DDDCDB]/60 mt-0.5">
                Current workaround: {opportunity.targetPersona.currentWorkaround}
              </p>
            </div>
          </div>

          {opportunity.competitorGaps.length > 0 && (
            <div className="flex items-start gap-2 pt-1">
              <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="line-clamp-1 text-[11px] text-red-300">
                Incumbent flaw: {opportunity.competitorGaps[0].fatalFlaw}
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        {/* Metric Progress Bars */}
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-[#3C4044] mb-4 text-center">
          <div className="bg-[#1B1D1F] p-2 rounded-lg border border-[#3C4044]">
            <span className="text-[10px] text-[#DDDCDB]/60 block">Impact</span>
            <span className="text-xs font-bold text-[#DDDCDB]">{opportunity.impactScore}%</span>
          </div>
          <div className="bg-[#1B1D1F] p-2 rounded-lg border border-[#3C4044]">
            <span className="text-[10px] text-[#DDDCDB]/60 block">Velocity</span>
            <span className="text-xs font-bold text-[#FD7B41]">+{opportunity.demandVelocity}%</span>
          </div>
          <div className="bg-[#1B1D1F] p-2 rounded-lg border border-[#3C4044]">
            <span className="text-[10px] text-[#DDDCDB]/60 block">Moat Void</span>
            <span className="text-xs font-bold text-[#EDBF9B]">{opportunity.moatScore}%</span>
          </div>
        </div>

        {/* View Dossier Action */}
        <button
          onClick={() => onSelect(opportunity)}
          className="w-full py-2.5 px-4 rounded-xl bg-[#1B1D1F] hover:bg-[#FD7B41] text-[#DDDCDB] hover:text-[#1B1D1F] border border-[#3C4044] hover:border-[#FD7B41] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm group-hover:border-[#FD7B41]/50"
        >
          <span>Examine Opportunity Dossier</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
