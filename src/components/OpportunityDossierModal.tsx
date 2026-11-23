import React, { useState } from 'react';
import { Opportunity } from '../types';
import { X, Award, Lightbulb, Users, Target, ShieldAlert, CheckCircle2, Download, Copy, Check, MessageSquare, ExternalLink } from 'lucide-react';

interface OpportunityDossierModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
}

export const OpportunityDossierModal: React.FC<OpportunityDossierModalProps> = ({ opportunity, onClose }) => {
  const [copiedHmw, setCopiedHmw] = useState(false);
  const [exported, setExported] = useState(false);

  if (!opportunity) return null;

  const handleCopyHmw = () => {
    navigator.clipboard.writeText(opportunity.hmwStatement);
    setCopiedHmw(true);
    setTimeout(() => setCopiedHmw(false), 2000);
  };

  const handleExportBrief = () => {
    const markdownContent = `
# UNMETNEED INNOVATION OPPORTUNITY BRIEF
**System**: AI-Powered Unmet-Need Discovery and Innovation Opportunity Identification System
**Date**: ${opportunity.createdAt}

---

## 1. Title: ${opportunity.title}
- **Sector**: ${opportunity.sector}
- **Opportunity Index**: ${opportunity.opportunityScore} / 100
- **Impact Score**: ${opportunity.impactScore}% | Demand Velocity: +${opportunity.demandVelocity}% | Moat Void: ${opportunity.moatScore}% | Commercial Potential: ${opportunity.commercialPotential}%
- **Status**: ${opportunity.trendStatus}

---

## 2. Core Underlying Need (NLP Extracted)
"${opportunity.rootNeed}"

---

## 3. Design Thinking "How Might We" (HMW) Statement
"${opportunity.hmwStatement}"

---

## 4. Target Persona & Current Workarounds
- **Target Role**: ${opportunity.targetPersona.role}
- **Context & Pain**: ${opportunity.targetPersona.context}
- **Current Workaround**: ${opportunity.targetPersona.currentWorkaround}

---

## 5. Incumbent Failures & Competitive Void
${opportunity.competitorGaps.map(gap => `
### Incumbent: ${gap.incumbentName}
- **Existing Approach**: ${gap.existingSolution}
- **Fatal Flaw**: ${gap.fatalFlaw}
- **User Grievance**: ${gap.userGrievance}
`).join('\n')}

---

## 6. Proposed MVP Blueprint & Business Model
${opportunity.proposedMvp.map((f, i) => `${i + 1}. ${f}`).join('\n')}

**Monetization / Business Model**:
${opportunity.businessModel}

---

## 7. Real-world Evidence & Raw User Signals
${opportunity.evidenceSignals.map(sig => `
- [${sig.source}] (${sig.author}, Frustration: ${sig.frustrationLevel}/10):
  "${sig.content}"
`).join('\n')}
    `.trim();

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `UnMetNeed_Brief_${opportunity.id}.md`;
    link.click();
    URL.revokeObjectURL(url);

    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#1B1D1F] border border-[#3C4044] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="bg-[#26292D] px-6 py-4 border-b border-[#3C4044] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#1B1D1F] text-[#EDBF9B] border border-[#3C4044]">
              {opportunity.sector}
            </span>
            <span className="text-xs text-[#DDDCDB]/70">Verified Opportunity Dossier</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportBrief}
              className="px-3 py-1.5 rounded-lg bg-[#1B1D1F] hover:bg-[#FD7B41] text-[#FD7B41] hover:text-[#1B1D1F] text-xs font-bold border border-[#FD7B41]/40 flex items-center gap-1.5 transition-all shadow-glow-orange"
            >
              {exported ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Download className="w-3.5 h-3.5" />}
              {exported ? 'Exported!' : 'Export Brief (.md)'}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#1B1D1F] text-[#DDDCDB]/70 hover:text-[#DDDCDB] hover:bg-[#3C4044] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Main Title & Opportunity Index */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#DDDCDB] leading-tight mb-2">
                {opportunity.title}
              </h2>
              <p className="text-xs text-[#EDBF9B]">
                Synthesized by UnMetNeed AI Pipeline • Date: {opportunity.createdAt}
              </p>
            </div>

            <div className="bg-[#26292D] border border-[#FD7B41]/40 rounded-xl p-4 flex items-center gap-4 flex-shrink-0 shadow-glow-orange">
              <Award className="w-8 h-8 text-[#FD7B41]" />
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#FD7B41] font-mono">{opportunity.opportunityScore}</span>
                  <span className="text-xs text-[#DDDCDB]/60">/100</span>
                </div>
                <span className="text-[10px] text-[#EDBF9B] uppercase tracking-wider block">Priority Score</span>
              </div>
            </div>
          </div>

          {/* 4 Prioritization Scoring Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#26292D] border border-[#3C4044] rounded-xl p-3">
              <span className="text-[11px] text-[#EDBF9B] block">Impact Severity</span>
              <span className="text-xl font-bold text-[#DDDCDB]">{opportunity.impactScore}%</span>
              <div className="w-full bg-[#1B1D1F] h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#EDBF9B] h-full rounded-full" style={{ width: `${opportunity.impactScore}%` }}></div>
              </div>
            </div>

            <div className="bg-[#26292D] border border-[#3C4044] rounded-xl p-3">
              <span className="text-[11px] text-[#EDBF9B] block">Demand Velocity</span>
              <span className="text-xl font-bold text-[#FD7B41]">+{opportunity.demandVelocity}%</span>
              <div className="w-full bg-[#1B1D1F] h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#FD7B41] h-full rounded-full" style={{ width: `${opportunity.demandVelocity}%` }}></div>
              </div>
            </div>

            <div className="bg-[#26292D] border border-[#3C4044] rounded-xl p-3">
              <span className="text-[11px] text-[#EDBF9B] block">Incumbent Void (Moat)</span>
              <span className="text-xl font-bold text-[#DDDCDB]">{opportunity.moatScore}%</span>
              <div className="w-full bg-[#1B1D1F] h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#DDDCDB] h-full rounded-full" style={{ width: `${opportunity.moatScore}%` }}></div>
              </div>
            </div>

            <div className="bg-[#26292D] border border-[#3C4044] rounded-xl p-3">
              <span className="text-[11px] text-[#EDBF9B] block">Commercial Potential</span>
              <span className="text-xl font-bold text-[#FD7B41]">{opportunity.commercialPotential}%</span>
              <div className="w-full bg-[#1B1D1F] h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#FD7B41] h-full rounded-full" style={{ width: `${opportunity.commercialPotential}%` }}></div>
              </div>
            </div>
          </div>

          {/* Core Unmet Need (NLP Semantic Output) */}
          <div className="bg-[#26292D] border-l-4 border-[#FD7B41] rounded-r-xl p-5 border-y border-r border-[#3C4044]">
            <span className="text-xs font-bold text-[#FD7B41] uppercase tracking-wider block mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-[#FD7B41]" />
              Objective 1: Semantic Root Need (Filtered from Noise)
            </span>
            <p className="text-sm sm:text-base text-[#DDDCDB] leading-relaxed italic">
              "{opportunity.rootNeed}"
            </p>
          </div>

          {/* Design Thinking HMW Callout */}
          <div className="bg-gradient-to-r from-[#26292D] to-[#2F3338] rounded-xl p-5 border border-[#3C4044] relative">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-[#FD7B41] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#FD7B41] uppercase tracking-wider block mb-1">
                    Design Thinking: "How Might We" (HMW) Statement
                  </span>
                  <p className="text-sm font-medium text-[#DDDCDB] leading-relaxed">
                    {opportunity.hmwStatement}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyHmw}
                className="p-2 rounded-lg bg-[#1B1D1F] text-[#EDBF9B] hover:text-[#FD7B41] border border-[#3C4044] flex-shrink-0 transition-colors"
                title="Copy HMW prompt"
              >
                {copiedHmw ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Empathy & Target Persona Map */}
          <div className="bg-[#26292D] border border-[#3C4044] rounded-xl p-5">
            <h4 className="text-sm font-bold text-[#EDBF9B] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#FD7B41]" />
              Empathy & Human-Centred Persona Map
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#1B1D1F] p-3.5 rounded-lg border border-[#3C4044]">
                <strong className="text-[#FD7B41] block mb-1">Target Persona</strong>
                <p className="text-[#DDDCDB] font-medium">{opportunity.targetPersona.role}</p>
              </div>

              <div className="bg-[#1B1D1F] p-3.5 rounded-lg border border-[#3C4044]">
                <strong className="text-[#FD7B41] block mb-1">Context & Friction</strong>
                <p className="text-[#DDDCDB]/70">{opportunity.targetPersona.context}</p>
              </div>

              <div className="bg-[#1B1D1F] p-3.5 rounded-lg border border-[#3C4044]">
                <strong className="text-[#FD7B41] block mb-1">Current Workaround</strong>
                <p className="text-[#DDDCDB]/70 italic">{opportunity.targetPersona.currentWorkaround}</p>
              </div>
            </div>
          </div>

          {/* Incumbent Flaw Matrix (Objective 3) */}
          <div className="bg-[#26292D] border border-[#3C4044] rounded-xl p-5">
            <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              Objective 3: Why Existing Incumbent Solutions Fail
            </h4>

            <div className="space-y-3">
              {opportunity.competitorGaps.map((gap, index) => (
                <div key={index} className="bg-[#1B1D1F] p-4 rounded-xl border border-red-500/20 text-xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-[#DDDCDB] text-sm">{gap.incumbentName}</span>
                    <span className="text-[11px] text-red-300 bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">
                      Fatal Flaw: {gap.fatalFlaw}
                    </span>
                  </div>
                  <p className="text-[#DDDCDB]/70 mb-2">
                    <strong className="text-[#EDBF9B]">Existing approach:</strong> {gap.existingSolution}
                  </p>
                  <p className="text-xs text-red-200/90 italic bg-red-950/20 p-2.5 rounded-lg border-l-2 border-red-400">
                    Real Customer Grievance: {gap.userGrievance}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* MVP Blueprint & Business Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#26292D] border border-[#3C4044] rounded-xl p-5">
              <h4 className="text-sm font-bold text-[#FD7B41] uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FD7B41]" />
                Recommended MVP Feature Set
              </h4>
              <ul className="space-y-2 text-xs text-[#DDDCDB]">
                {opportunity.proposedMvp.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#1B1D1F] p-2.5 rounded-lg border border-[#3C4044]">
                    <span className="w-4 h-4 rounded-full bg-[#FD7B41]/20 text-[#FD7B41] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#26292D] border border-[#3C4044] rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#EDBF9B] uppercase tracking-wider mb-3">
                  Validated Business Model & Pricing
                </h4>
                <p className="text-xs text-[#DDDCDB] bg-[#1B1D1F] p-3.5 rounded-lg border border-[#3C4044] leading-relaxed mb-4">
                  {opportunity.businessModel}
                </p>
              </div>
              <div className="bg-[#1B1D1F] p-3 rounded-lg border border-[#FD7B41]/30 text-[11px] text-[#DDDCDB]/70">
                ⚡ <strong className="text-[#FD7B41]">UnMetNeed Insight:</strong> Users actively developing manual workarounds indicate a 4.2x higher willingness to pay compared to generic software users.
              </div>
            </div>
          </div>

          {/* Verbatim Evidence Signals (Objective 2) */}
          <div className="bg-[#26292D] border border-[#3C4044] rounded-xl p-5">
            <h4 className="text-sm font-bold text-[#EDBF9B] uppercase tracking-wider mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#FD7B41]" />
              Objective 2: Verbatim Public Evidence Vault (Forum & Review Citations)
            </h4>

            <div className="space-y-3">
              {opportunity.evidenceSignals.map((signal) => (
                <div key={signal.id} className="bg-[#1B1D1F] p-4 rounded-xl border border-[#3C4044] text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#26292D] text-[#FD7B41] font-semibold text-[11px] border border-[#3C4044]">
                        {signal.source}
                      </span>
                      <span className="text-[#DDDCDB]/70">{signal.author}</span>
                      <span className="text-[#DDDCDB]/40">•</span>
                      <span className="text-[#DDDCDB]/50">{signal.timestamp}</span>
                    </div>
                    <span className="text-[11px] text-red-300 font-mono">
                      Friction: {signal.frustrationLevel}/10
                    </span>
                  </div>
                  <p className="text-[#DDDCDB] italic leading-relaxed">
                    "{signal.content}"
                  </p>
                  {signal.sourceUrl && (
                    <a
                      href={signal.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#FD7B41] hover:underline mt-2"
                    >
                      <span>View Original Thread</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#26292D] px-6 py-4 border-t border-[#3C4044] flex items-center justify-between text-xs text-[#DDDCDB]/60">
          <span>UnMetNeed Intelligence Platform</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1B1D1F] hover:bg-[#3C4044] text-[#DDDCDB] font-semibold transition-colors border border-[#3C4044]"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
