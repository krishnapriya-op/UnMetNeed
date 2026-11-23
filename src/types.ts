export type Sector = 
  | 'All'
  | 'Healthcare & Wellness'
  | 'AI & Developer Tools'
  | 'Remote Work & Collab'
  | 'FinTech & Freelance'
  | 'CleanTech & Energy'
  | 'EdTech & Learning';

export type SignalSource = 'Reddit' | 'G2' | 'Trustpilot' | 'ProductHunt' | 'Twitter/X' | 'Research Paper' | 'App Store';

export interface RawSignal {
  id: string;
  source: SignalSource;
  author: string;
  sourceUrl?: string;
  timestamp: string;
  content: string;
  frustrationLevel: number; // 1 to 10
  sentiment: 'severe_friction' | 'moderate_pain' | 'workaround_active';
  sector: Sector;
  clusterTag: string;
}

export interface CompetitorGap {
  incumbentName: string;
  existingSolution: string;
  fatalFlaw: string;
  userGrievance: string;
}

export interface SemanticCluster {
  id: string;
  title: string;
  sector: Sector;
  rootNeed: string;
  signalCount: number;
  averageFrustration: number; // 0 - 10
  keywords: string[];
  growthVelocityPercent: number; // e.g. +48%
}

export interface Opportunity {
  id: string;
  title: string;
  sector: Sector;
  rootNeed: string;
  opportunityScore: number; // 0 - 100 (weighted aggregate)
  impactScore: number;      // 0 - 100
  demandVelocity: number;   // 0 - 100
  moatScore: number;        // 0 - 100 (competitor void)
  commercialPotential: number; // 0 - 100 (willingness to pay)
  trendStatus: 'Surging' | 'Emerging' | 'Critical High';
  
  targetPersona: {
    role: string;
    context: string;
    currentWorkaround: string;
  };
  
  hmwStatement: string; // Design Thinking "How Might We..."
  proposedMvp: string[];
  businessModel: string;
  
  competitorGaps: CompetitorGap[];
  evidenceSignals: RawSignal[];
  
  createdAt: string;
  verifiedByAi: boolean;
}

export interface FilterState {
  sector: Sector;
  minScore: number;
  searchQuery: string;
  sortBy: 'score' | 'velocity' | 'impact' | 'signals';
}
