import React, { useState } from 'react';
import { Opportunity, Sector } from '../types';
import { analyzeAndSynthesizeNeed, calculateFrustrationScore, tokenizeAndClean } from '../services/nlpEngine';
import { Sparkles, ArrowRight, BrainCircuit, RefreshCw, Upload, FileText, CheckCircle2 } from 'lucide-react';

interface CustomNeedAnalyzerProps {
  onOpportunityCreated: (opp: Opportunity) => void;
  onViewDossier: (opp: Opportunity) => void;
}

export const CustomNeedAnalyzer: React.FC<CustomNeedAnalyzerProps> = ({
  onOpportunityCreated,
  onViewDossier,
}) => {
  const [activeMode, setActiveMode] = useState<'single' | 'batch'>('single');

  // Single mode state
  const [inputText, setInputText] = useState('');
  const [selectedSector, setSelectedSector] = useState<Sector>('Healthcare & Wellness');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [latestGenerated, setLatestGenerated] = useState<Opportunity | null>(null);

  // Batch mode state
  const [batchText, setBatchText] = useState('');
  const [batchProcessedCount, setBatchProcessedCount] = useState<number | null>(null);

  const samplePrompts = [
    {
      label: 'Veterinary EHR Lag',
      sector: 'Healthcare & Wellness' as Sector,
      text: 'Vet clinics lose 2 hours daily re-entering pet dosage calculations across legacy desktop software. None of the modern vet apps calculate metabolic weight curves in real time, causing dosage panic.'
    },
    {
      label: 'Freelance Legal Redlining',
      sector: 'FinTech & Freelance' as Sector,
      text: 'Solo contract lawyers spend thousands on clunky enterprise document redline software that breaks Word formatting and doesn\'t track client liability thresholds across multiple jurisdictions.'
    },
    {
      label: 'Agent Prompt Regressions',
      sector: 'AI & Developer Tools' as Sector,
      text: 'Every time we tweak our system prompt for customer support, 15 edge-case evaluations silently break. We are manually diffing 200 CSV outputs because there is no automated semantic regression engine.'
    }
  ];

  const handleRunAnalysis = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const generated = analyzeAndSynthesizeNeed(inputText, selectedSector);
      setLatestGenerated(generated);
      onOpportunityCreated(generated);
      setIsAnalyzing(false);
    }, 700);
  };

  const handleRunBatchAnalysis = (textToProcess: string) => {
    const lines = textToProcess
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 20);

    if (lines.length === 0) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      lines.forEach((line, index) => {
        const opp = analyzeAndSynthesizeNeed(line, selectedSector);
        onOpportunityCreated(opp);
        if (index === 0) setLatestGenerated(opp);
      });
      setBatchProcessedCount(lines.length);
      setIsAnalyzing(false);
    }, 1000);
  };

  const handleLoadSampleBatch = () => {
    const sampleBatch = `G2 Review: "Customer onboarding takes 4 weeks because there is no automated schema migration validator. Our devs spend half their time manual writing rollback SQL."
Reddit r/sysadmin: "Why does every single cloud backup tool charge per-TB ingress while completely obscuring API request fees? We got hit with a $4,200 surprise bill."
Trustpilot: "The dental practice management software still forces us to print paper medical history forms and scan them back in as PDFs. Complete waste of 15 hours weekly."
ProductHunt: "Remote design sprint workshops always stall because Figma comments get buried and Jira tickets lose visual context. We need an auto-sync canvas-to-sprint bridge."`;
    setBatchText(sampleBatch);
  };

  const handleSelectSample = (sample: typeof samplePrompts[0]) => {
    setInputText(sample.text);
    setSelectedSector(sample.sector);
  };

  const tokens = inputText ? tokenizeAndClean(inputText) : [];
  const frustrationInfo = inputText ? calculateFrustrationScore(inputText) : { score: 0, triggers: [] };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#26292D] text-[#FD7B41] text-xs font-semibold mb-2 border border-[#FD7B41]/30 shadow-glow-orange">
            <Sparkles className="w-3.5 h-3.5 text-[#FD7B41]" />
            Objective 1 & 4: Interactive NLP Need Discovery Studio
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#DDDCDB]">
            Live AI Problem-to-Opportunity Engine
          </h2>
          <p className="text-xs sm:text-sm text-[#DDDCDB]/70 mt-1">
            Input unfiltered user complaints, Reddit rants, or batch review scrapes. The UnMetNeed NLP pipeline normalizes the text, extracts friction keywords, groups underlying needs, and calculates an algorithmic Opportunity Index.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="bg-[#26292D] p-1 rounded-xl border border-[#3C4044] flex items-center">
          <button
            onClick={() => setActiveMode('single')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'single'
                ? 'bg-[#3C4044] text-[#FD7B41] shadow-sm'
                : 'text-[#DDDCDB]/70 hover:text-[#DDDCDB]'
            }`}
          >
            Single Statement
          </button>
          <button
            onClick={() => setActiveMode('batch')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'batch'
                ? 'bg-[#3C4044] text-[#FD7B41] shadow-sm'
                : 'text-[#DDDCDB]/70 hover:text-[#DDDCDB]'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Batch Scrape / CSV</span>
          </button>
        </div>
      </div>

      {/* SINGLE STATEMENT MODE */}
      {activeMode === 'single' && (
        <>
          {/* Preset Inspirations */}
          <div className="space-y-2">
            <span className="text-xs text-[#EDBF9B] font-medium block">Or try a sample real-world complaint:</span>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSample(p)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-[#26292D] hover:bg-[#3C4044] text-[#EDBF9B] hover:text-[#FD7B41] border border-[#3C4044] transition-all"
                >
                  ⚡ {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Input Form */}
          <form onSubmit={handleRunAnalysis} className="bg-[#26292D] border border-[#3C4044] rounded-2xl p-6 shadow-glow-dark space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#DDDCDB] mb-2 uppercase tracking-wider">
                  Paste Raw Customer Grievance / Unmet Need Observation
                </label>
                <textarea
                  rows={4}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="e.g. 'I spend 4 hours every Friday reconciling invoices across Stripe and PayPal for 12 clients in 4 currencies. Traditional accounting software assumes I have a domestic LLC and fails at treaty credits...'"
                  className="w-full bg-[#1B1D1F] border border-[#3C4044] rounded-xl p-3.5 text-xs sm:text-sm text-[#DDDCDB] placeholder-[#DDDCDB]/30 focus:outline-none focus:border-[#FD7B41] focus:ring-1 focus:ring-[#FD7B41]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#DDDCDB] mb-2 uppercase tracking-wider">
                  Select Market Domain
                </label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value as Sector)}
                  className="w-full bg-[#1B1D1F] border border-[#3C4044] rounded-xl p-3 text-xs sm:text-sm text-[#DDDCDB] focus:outline-none focus:border-[#FD7B41] mb-4"
                >
                  <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                  <option value="AI & Developer Tools">AI & Developer Tools</option>
                  <option value="FinTech & Freelance">FinTech & Freelance</option>
                  <option value="Remote Work & Collab">Remote Work & Collab</option>
                  <option value="CleanTech & Energy">CleanTech & Energy</option>
                  <option value="EdTech & Learning">EdTech & Learning</option>
                </select>

                {/* Live NLP Preview Box */}
                <div className="bg-[#1B1D1F] p-3 rounded-xl border border-[#3C4044] text-[11px] space-y-2">
                  <span className="font-bold text-[#FD7B41] block">Real-time NLP Extraction:</span>
                  <div className="flex items-center justify-between text-[#DDDCDB]/60">
                    <span>Tokens Extracted:</span>
                    <span className="text-[#DDDCDB] font-mono">{tokens.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#DDDCDB]/60">
                    <span>Friction Score:</span>
                    <span className="text-red-300 font-mono">{frustrationInfo.score > 0 ? `${frustrationInfo.score}/10` : '—'}</span>
                  </div>
                  {frustrationInfo.triggers.length > 0 && (
                    <div className="text-[10px] text-red-300">
                      Triggers: {frustrationInfo.triggers.slice(0, 3).join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-2 border-t border-[#3C4044]">
              <span className="text-[11px] text-[#DDDCDB]/60">
                Runs semantic centroid grouping + 4-factor opportunity index calculation.
              </span>

              <button
                type="submit"
                disabled={isAnalyzing || !inputText.trim()}
                className="px-6 py-2.5 rounded-xl bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-[#1B1D1F] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-glow-orange disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#1B1D1F]" />
                    Processing NLP Embeddings...
                  </>
                ) : (
                  <>
                    <BrainCircuit className="w-4 h-4 text-[#1B1D1F]" />
                    Synthesize Innovation Opportunity
                  </>
                )}
              </button>
            </div>
          </form>
        </>
      )}

      {/* BATCH DATASET MODE */}
      {activeMode === 'batch' && (
        <div className="bg-[#26292D] border border-[#3C4044] rounded-2xl p-6 shadow-glow-dark space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#FD7B41] uppercase tracking-wider block">
                Batch Public Review / Forum Ingestion (Objective 2)
              </span>
              <p className="text-xs text-[#DDDCDB]/70 mt-0.5">
                Paste lines of scraped reviews, Reddit posts, or customer tickets (one per line).
              </p>
            </div>

            <button
              type="button"
              onClick={handleLoadSampleBatch}
              className="px-3.5 py-1.5 rounded-lg bg-[#1B1D1F] hover:bg-[#3C4044] text-[#EDBF9B] border border-[#3C4044] text-xs font-medium transition-all"
            >
              Load Sample Scraped Dataset
            </button>
          </div>

          <textarea
            rows={6}
            value={batchText}
            onChange={(e) => setBatchText(e.target.value)}
            placeholder="Paste reviews or complaints here, one per line..."
            className="w-full bg-[#1B1D1F] border border-[#3C4044] rounded-xl p-3.5 text-xs text-[#DDDCDB] font-mono placeholder-[#DDDCDB]/30 focus:outline-none focus:border-[#FD7B41]"
          />

          <div className="flex items-center justify-between pt-2 border-t border-[#3C4044]">
            <span className="text-[11px] text-[#DDDCDB]/60">
              Each line is parsed, clustered by similarity, and scored into a startup opportunity.
            </span>

            <button
              type="button"
              onClick={() => handleRunBatchAnalysis(batchText)}
              disabled={isAnalyzing || !batchText.trim()}
              className="px-6 py-2.5 rounded-xl bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-[#1B1D1F] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-glow-orange disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#1B1D1F]" />
                  Clustering Batch Dataset...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 text-[#1B1D1F]" />
                  Process & Cluster Batch
                </>
              )}
            </button>
          </div>

          {batchProcessedCount && (
            <div className="bg-[#1B1D1F] p-4 rounded-xl border border-green-500/30 text-xs text-green-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>Successfully parsed and clustered {batchProcessedCount} review signals into ranked opportunities! Check the "Opportunities" tab to explore them.</span>
            </div>
          )}
        </div>
      )}

      {/* Generated Result Card Preview */}
      {latestGenerated && (
        <div className="bg-[#26292D] border-2 border-[#FD7B41] rounded-2xl p-6 shadow-glow-orange space-y-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#3C4044]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FD7B41] animate-ping"></span>
              <span className="text-xs font-bold text-[#FD7B41] uppercase tracking-wider">
                Successfully Synthesized & Added to Prioritized Feed!
              </span>
            </div>

            <button
              onClick={() => onViewDossier(latestGenerated)}
              className="px-4 py-2 rounded-lg bg-[#FD7B41] text-[#1B1D1F] font-bold text-xs flex items-center gap-2 shadow-sm hover:scale-105 transition-transform"
            >
              <span>Open Full Opportunity Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <span className="text-xs font-semibold text-[#EDBF9B] block mb-1">{latestGenerated.sector}</span>
            <h3 className="font-editorial text-2xl font-bold text-[#DDDCDB] mb-2">
              {latestGenerated.title}
            </h3>
            <p className="text-sm text-[#DDDCDB] italic bg-[#1B1D1F] p-3.5 rounded-xl border-l-4 border-[#FD7B41] mb-4">
              "{latestGenerated.rootNeed}"
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-[#1B1D1F] p-3 rounded-xl border border-[#3C4044]">
              <span className="text-[10px] text-[#DDDCDB]/60 block">Opportunity Score</span>
              <span className="text-xl font-bold text-[#FD7B41]">{latestGenerated.opportunityScore}/100</span>
            </div>
            <div className="bg-[#1B1D1F] p-3 rounded-xl border border-[#3C4044]">
              <span className="text-[10px] text-[#DDDCDB]/60 block">User Impact</span>
              <span className="text-xl font-bold text-[#DDDCDB]">{latestGenerated.impactScore}%</span>
            </div>
            <div className="bg-[#1B1D1F] p-3 rounded-xl border border-[#3C4044]">
              <span className="text-[10px] text-[#DDDCDB]/60 block">Demand Velocity</span>
              <span className="text-xl font-bold text-[#FD7B41]">+{latestGenerated.demandVelocity}%</span>
            </div>
            <div className="bg-[#1B1D1F] p-3 rounded-xl border border-[#3C4044]">
              <span className="text-[10px] text-[#DDDCDB]/60 block">Moat Void</span>
              <span className="text-xl font-bold text-[#EDBF9B]">{latestGenerated.moatScore}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
