import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OpportunityCard } from './components/OpportunityCard';
import { OpportunityDossierModal } from './components/OpportunityDossierModal';
import { ClusterVisualizer } from './components/ClusterVisualizer';
import { SignalStream } from './components/SignalStream';
import { CustomNeedAnalyzer } from './components/CustomNeedAnalyzer';
import { CompetitorMatrix } from './components/CompetitorMatrix';
import { EmpathyCanvas } from './components/EmpathyCanvas';
import { Footer } from './components/Footer';

import { INITIAL_OPPORTUNITIES, INITIAL_CLUSTERS, INITIAL_SIGNALS } from './data/seeds';
import { Opportunity, Sector } from './types';
import { Filter, Search, ArrowUpDown, Award } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('opportunities');
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [clusters] = useState(INITIAL_CLUSTERS);
  const [signals, setSignals] = useState(INITIAL_SIGNALS);
  
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);

  // Filter and Search states
  const [selectedSector, setSelectedSector] = useState<Sector>('All');
  const [minScore, setMinScore] = useState<number>(75);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'score' | 'velocity' | 'impact'>('score');

  const sectors: Sector[] = [
    'All',
    'Healthcare & Wellness',
    'AI & Developer Tools',
    'FinTech & Freelance',
    'Remote Work & Collab',
    'CleanTech & Energy',
    'EdTech & Learning'
  ];

  // Callback when user adds a custom synthesized opportunity
  const handleOpportunityCreated = (newOpp: Opportunity) => {
    setOpportunities(prev => [newOpp, ...prev]);
    if (newOpp.evidenceSignals.length > 0) {
      setSignals(prev => [...newOpp.evidenceSignals, ...prev]);
    }
  };

  // Filter logic
  const filteredOpportunities = opportunities
    .filter(opp => {
      if (selectedSector !== 'All' && opp.sector !== selectedSector) return false;
      if (opp.opportunityScore < minScore) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = opp.title.toLowerCase().includes(query);
        const matchesNeed = opp.rootNeed.toLowerCase().includes(query);
        const matchesPersona = opp.targetPersona.role.toLowerCase().includes(query);
        const matchesHmw = opp.hmwStatement.toLowerCase().includes(query);
        if (!matchesTitle && !matchesNeed && !matchesPersona && !matchesHmw) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'score') return b.opportunityScore - a.opportunityScore;
      if (sortBy === 'velocity') return b.demandVelocity - a.demandVelocity;
      if (sortBy === 'impact') return b.impactScore - a.impactScore;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#1B1D1F] text-[#DDDCDB] flex flex-col font-sans">
      {/* Top Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        signalsCount={signals.length}
        opportunitiesCount={opportunities.length}
      />

      {/* Hero Section */}
      <HeroSection
        onExploreClick={() => {
          setActiveTab('opportunities');
          const el = document.getElementById('main-feed');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onAnalyzeClick={() => {
          setActiveTab('analyzer');
          const el = document.getElementById('main-feed');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Area in Black & Calcite Orange Theme */}
      <main id="main-feed" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Navigation Sub-Bar for Quick Switching */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#3C4044]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-[#FD7B41] uppercase tracking-wider">Active Workspace View:</span>
            <span className="text-sm font-semibold text-[#DDDCDB]">
              {activeTab === 'opportunities' && 'Objective 4: Prioritized Innovation Opportunities'}
              {activeTab === 'clusters' && 'Objective 1: NLP Semantic Problem Clusters'}
              {activeTab === 'empathy' && 'Design Thinking: Empathy Map & HMW Ideation Canvas'}
              {activeTab === 'signals' && 'Objective 2: Raw Public Signal Stream'}
              {activeTab === 'analyzer' && 'Interactive NLP Need Discovery Studio'}
              {activeTab === 'competitors' && 'Objective 3: Incumbent Limitation Matrix'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'opportunities'
                  ? 'bg-[#FD7B41] text-[#1B1D1F] shadow-glow-orange font-bold'
                  : 'bg-[#26292D] text-[#DDDCDB]/70 hover:text-[#DDDCDB] border border-[#3C4044] hover:bg-[#3C4044]'
              }`}
            >
              Opportunities ({opportunities.length})
            </button>
            <button
              onClick={() => setActiveTab('clusters')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'clusters'
                  ? 'bg-[#FD7B41] text-[#1B1D1F] shadow-glow-orange font-bold'
                  : 'bg-[#26292D] text-[#DDDCDB]/70 hover:text-[#DDDCDB] border border-[#3C4044] hover:bg-[#3C4044]'
              }`}
            >
              Clusters ({clusters.length})
            </button>
            <button
              onClick={() => setActiveTab('empathy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'empathy'
                  ? 'bg-[#FD7B41] text-[#1B1D1F] shadow-glow-orange font-bold'
                  : 'bg-[#26292D] text-[#DDDCDB]/70 hover:text-[#DDDCDB] border border-[#3C4044] hover:bg-[#3C4044]'
              }`}
            >
              Empathy & HMW
            </button>
            <button
              onClick={() => setActiveTab('competitors')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'competitors'
                  ? 'bg-[#FD7B41] text-[#1B1D1F] shadow-glow-orange font-bold'
                  : 'bg-[#26292D] text-[#DDDCDB]/70 hover:text-[#DDDCDB] border border-[#3C4044] hover:bg-[#3C4044]'
              }`}
            >
              Competitor Flaws
            </button>
            <button
              onClick={() => setActiveTab('signals')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'signals'
                  ? 'bg-[#FD7B41] text-[#1B1D1F] shadow-glow-orange font-bold'
                  : 'bg-[#26292D] text-[#DDDCDB]/70 hover:text-[#DDDCDB] border border-[#3C4044] hover:bg-[#3C4044]'
              }`}
            >
              Raw Signals
            </button>
          </div>
        </div>

        {/* TAB 1: OPPORTUNITIES FEED */}
        {activeTab === 'opportunities' && (
          <div className="space-y-8">
            {/* Filter & Search Toolbar in Calcite Theme */}
            <div className="bg-[#26292D] border border-[#3C4044] rounded-2xl p-5 shadow-glow-dark space-y-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#EDBF9B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search unmet needs by keyword, persona, or HMW..."
                    className="w-full pl-10 pr-4 py-2 bg-[#1B1D1F] border border-[#3C4044] rounded-xl text-xs sm:text-sm text-[#DDDCDB] placeholder-[#DDDCDB]/40 focus:outline-none focus:border-[#FD7B41] focus:ring-1 focus:ring-[#FD7B41]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#EDBF9B] hover:text-[#DDDCDB]"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Score Slider & Sort */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Min Score Filter */}
                  <div className="flex items-center gap-3 bg-[#1B1D1F] px-3.5 py-1.5 rounded-xl border border-[#3C4044] text-xs">
                    <span className="text-[#EDBF9B] flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#FD7B41]" />
                      Min Score:
                    </span>
                    <input
                      type="range"
                      min="70"
                      max="95"
                      value={minScore}
                      onChange={(e) => setMinScore(Number(e.target.value))}
                      className="w-24 accent-[#FD7B41] cursor-pointer"
                    />
                    <span className="font-bold text-[#FD7B41] font-mono">{minScore}</span>
                  </div>

                  {/* Sort By Dropdown */}
                  <div className="flex items-center gap-2 bg-[#1B1D1F] px-3 py-1.5 rounded-xl border border-[#3C4044] text-xs">
                    <ArrowUpDown className="w-3.5 h-3.5 text-[#FD7B41]" />
                    <span className="text-[#EDBF9B]">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent text-[#DDDCDB] focus:outline-none cursor-pointer"
                    >
                      <option value="score" className="bg-[#26292D] text-[#DDDCDB]">Opportunity Score</option>
                      <option value="velocity" className="bg-[#26292D] text-[#DDDCDB]">Demand Velocity</option>
                      <option value="impact" className="bg-[#26292D] text-[#DDDCDB]">Impact Severity</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sector Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#3C4044]">
                <span className="text-xs text-[#EDBF9B] flex items-center gap-1 font-medium mr-1">
                  <Filter className="w-3 h-3 text-[#FD7B41]" />
                  Domain:
                </span>
                {sectors.map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setSelectedSector(sec)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedSector === sec
                        ? 'bg-[#FD7B41] text-[#1B1D1F] font-bold shadow-glow-orange'
                        : 'bg-[#1B1D1F] text-[#DDDCDB]/70 hover:text-[#DDDCDB] border border-[#3C4044] hover:border-[#FD7B41]/50'
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </div>

            {/* Opportunities Cards Grid */}
            {filteredOpportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpportunities.map((opp) => (
                  <OpportunityCard
                    key={opp.id}
                    opportunity={opp}
                    onSelect={(selected) => setSelectedOpportunity(selected)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-[#26292D] border border-[#3C4044] rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#1B1D1F] border border-[#3C4044] flex items-center justify-center mx-auto text-[#FD7B41]">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-xl font-bold text-[#DDDCDB]">No matching opportunities found</h3>
                <p className="text-xs text-[#DDDCDB]/60">
                  Try lowering the Minimum Score threshold or resetting your domain and keyword filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedSector('All');
                    setMinScore(70);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#FD7B41] text-[#1B1D1F] font-bold text-xs shadow-glow-orange"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SEMANTIC CLUSTERS */}
        {activeTab === 'clusters' && (
          <ClusterVisualizer
            clusters={clusters}
            selectedClusterId={selectedClusterId}
            onSelectCluster={(id) => {
              setSelectedClusterId(id);
              if (id) {
                const matched = clusters.find(c => c.id === id);
                if (matched) {
                  setSelectedSector(matched.sector);
                  setActiveTab('opportunities');
                }
              }
            }}
          />
        )}

        {/* TAB 3: DESIGN THINKING EMPATHY MAP & HMW CANVAS */}
        {activeTab === 'empathy' && (
          <EmpathyCanvas opportunities={opportunities} />
        )}

        {/* TAB 4: RAW SIGNAL STREAM */}
        {activeTab === 'signals' && (
          <SignalStream signals={signals} />
        )}

        {/* TAB 5: INTERACTIVE AI NEED STUDIO */}
        {activeTab === 'analyzer' && (
          <CustomNeedAnalyzer
            onOpportunityCreated={handleOpportunityCreated}
            onViewDossier={(opp) => setSelectedOpportunity(opp)}
          />
        )}

        {/* TAB 6: INCUMBENT COMPETITOR MATRIX */}
        {activeTab === 'competitors' && (
          <CompetitorMatrix
            opportunities={opportunities}
            onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
          />
        )}
      </main>

      {/* Opportunity Dossier Deep-Dive Modal */}
      <OpportunityDossierModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
      />

      {/* Academic Footer */}
      <Footer />
    </div>
  );
};
