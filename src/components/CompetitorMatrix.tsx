import React from 'react';
import { Opportunity } from '../types';
import { ShieldAlert, ArrowUpRight } from 'lucide-react';

interface CompetitorMatrixProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
}

export const CompetitorMatrix: React.FC<CompetitorMatrixProps> = ({
  opportunities,
  onSelectOpportunity,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#26292D] text-red-300 text-xs font-semibold mb-2 border border-red-500/30">
          <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
          Objective 3: Incumbent Limitation & Competitor Void Evaluation
        </div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#DDDCDB]">
          Why Existing Solutions Fail the User
        </h2>
        <p className="text-xs sm:text-sm text-[#DDDCDB]/70 mt-1 max-w-2xl">
          Systematic breakdown of incumbent software limitations, legacy architecture flaws, and customer grievances that create whitespace for new market entrants.
        </p>
      </div>

      {/* Incumbents Table */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px] space-y-4">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-[#26292D] border border-[#3C4044] rounded-2xl p-5 hover:border-[#FD7B41]/50 transition-all"
            >
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#3C4044]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#1B1D1F] text-[#EDBF9B] border border-[#3C4044]">
                    {opp.sector}
                  </span>
                  <h3 className="font-editorial text-base font-bold text-[#DDDCDB]">
                    {opp.title}
                  </h3>
                </div>

                <button
                  onClick={() => onSelectOpportunity(opp)}
                  className="px-3 py-1 rounded-lg bg-[#1B1D1F] hover:bg-[#FD7B41] text-[#FD7B41] hover:text-[#1B1D1F] text-xs font-bold border border-[#3C4044] hover:border-[#FD7B41] flex items-center gap-1 transition-all"
                >
                  <span>Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Incumbent flaws grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opp.competitorGaps.map((gap, i) => (
                  <div key={i} className="bg-[#1B1D1F] p-4 rounded-xl border border-red-500/20 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#DDDCDB] text-sm">{gap.incumbentName}</strong>
                      <span className="text-[10px] text-red-300 bg-red-950/60 px-2 py-0.5 rounded border border-red-500/40 font-mono">
                        Fatal Flaw
                      </span>
                    </div>

                    <p className="text-[#DDDCDB]/70">
                      <span className="text-[#EDBF9B] font-medium">Existing Solution:</span> {gap.existingSolution}
                    </p>

                    <p className="text-red-200">
                      <span className="font-semibold text-red-400">Why It Breaks:</span> {gap.fatalFlaw}
                    </p>

                    <p className="text-[11px] text-[#DDDCDB]/80 italic bg-[#26292D] p-2 rounded-lg border-l-2 border-red-400">
                      User quote: {gap.userGrievance}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
