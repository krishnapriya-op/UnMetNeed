import { Opportunity, RawSignal, SemanticCluster } from '../types';

export const INITIAL_SIGNALS: RawSignal[] = [
  {
    id: 'sig-1',
    source: 'Reddit',
    author: 'u/clinical_mind_88',
    sourceUrl: 'https://reddit.com/r/psychotherapy/comments/clinical_doc_burnout',
    timestamp: '2 hours ago',
    content: "I spend 3 hours every evening re-typing notes from therapy sessions into our clunky legacy EHR. None of the AI transcription tools comply with HIPAA while preserving human nuances, so I'm stuck doing double documentation every day.",
    frustrationLevel: 9,
    sentiment: 'severe_friction',
    sector: 'Healthcare & Wellness',
    clusterTag: 'ehr-clinical-burnout'
  },
  {
    id: 'sig-2',
    source: 'G2',
    author: 'Verified Mental Health Practice Lead',
    timestamp: 'Yesterday',
    content: "The software claims to have session notes automation, but it literally hallucinates clinical diagnostic codes and leaves out patient coping strategies. We had to shut it off after 2 weeks.",
    frustrationLevel: 8,
    sentiment: 'severe_friction',
    sector: 'Healthcare & Wellness',
    clusterTag: 'ehr-clinical-burnout'
  },
  {
    id: 'sig-3',
    source: 'Reddit',
    author: 'u/nomad_tax_pain',
    sourceUrl: 'https://reddit.com/r/digitalnomad/comments/tax_compliance_hell',
    timestamp: '4 hours ago',
    content: "I invoiced 14 clients across 6 countries in EUR, USD, and GBP this year. TurboTax and QuickBooks have zero native comprehension of dual-tax treaties and physical presence residency rules. I'm currently tracking everything in 8 fragile spreadsheets.",
    frustrationLevel: 9,
    sentiment: 'workaround_active',
    sector: 'FinTech & Freelance',
    clusterTag: 'cross-border-tax-gap'
  },
  {
    id: 'sig-4',
    source: 'Trustpilot',
    author: 'Elena R. (Independent Consultant)',
    timestamp: '3 days ago',
    content: "Traditional accountants charge $3,000+ to look at multi-currency freelance income and still get the foreign tax credit calculations wrong. Where is the tool built for modern remote workers?",
    frustrationLevel: 8,
    sentiment: 'severe_friction',
    sector: 'FinTech & Freelance',
    clusterTag: 'cross-border-tax-gap'
  },
  {
    id: 'sig-5',
    source: 'Twitter/X',
    author: '@dev_lead_sarah',
    timestamp: '1 day ago',
    content: "Our team's multi-agent workflow kept drifting after turn 15. The LLM agents forgot earlier schema constraints because none of the existing agent frameworks handle state compaction gracefully. Context rot is the #1 silent killer in production AI.",
    frustrationLevel: 8,
    sentiment: 'severe_friction',
    sector: 'AI & Developer Tools',
    clusterTag: 'agent-context-decay'
  },
  {
    id: 'sig-6',
    source: 'Research Paper',
    author: 'arXiv:2409.11029 (Evaluation of Multi-Agent Memory)',
    timestamp: '1 week ago',
    content: "Empirical findings show a 64% degradation in goal adherence when autonomous agents exceed 12 multi-party dialogue rounds, resulting from naive token window truncation rather than semantic hierarchical retrieval.",
    frustrationLevel: 7,
    sentiment: 'moderate_pain',
    sector: 'AI & Developer Tools',
    clusterTag: 'agent-context-decay'
  },
  {
    id: 'sig-7',
    source: 'Reddit',
    author: 'u/solar_frustrated_home',
    sourceUrl: 'https://reddit.com/r/solar/comments/inverter_telemetry_blindspot',
    timestamp: '12 hours ago',
    content: "My home battery, EV charger, and rooftop solar all come with separate proprietary apps. When the grid tariff surges during peak hours, my car starts charging because the systems can't communicate. I had to build a buggy Home Assistant script.",
    frustrationLevel: 8,
    sentiment: 'workaround_active',
    sector: 'CleanTech & Energy',
    clusterTag: 'home-energy-silo'
  },
  {
    id: 'sig-8',
    source: 'ProductHunt',
    author: 'Marcus K. (Remote VP of Eng)',
    timestamp: '5 days ago',
    content: "Async standup tools are just Slack bots asking 3 static questions. People fill them with 2-word answers or ignore them completely. We lose critical cross-timezone blockers until the weekly sprint review when it's already too late.",
    frustrationLevel: 7,
    sentiment: 'moderate_pain',
    sector: 'Remote Work & Collab',
    clusterTag: 'async-context-loss'
  },
  {
    id: 'sig-9',
    source: 'Trustpilot',
    author: 'Devon M. (Self-taught Engineer)',
    timestamp: '6 days ago',
    content: "I completed 4 full-stack coding bootcamps/courses, but when I opened VS Code to build my own project, I hit a complete wall. There is a giant chasm between following video tutorials and architecting real software from an empty folder.",
    frustrationLevel: 8,
    sentiment: 'severe_friction',
    sector: 'EdTech & Learning',
    clusterTag: 'post-course-execution-cliff'
  }
];

export const INITIAL_CLUSTERS: SemanticCluster[] = [
  {
    id: 'clust-1',
    title: 'Clinical Documentation Fatigue & Unreliable AI Transcription',
    sector: 'Healthcare & Wellness',
    rootNeed: 'HIPAA-compliant, high-fidelity clinical synthesis that respects therapist nuance without double-entry burden',
    signalCount: 142,
    averageFrustration: 8.8,
    keywords: ['EHR', 'therapy notes', 'double documentation', 'HIPAA', 'diagnostic codes', 'burnout'],
    growthVelocityPercent: 64
  },
  {
    id: 'clust-2',
    title: 'Cross-Border Multi-Currency Tax Treaty & Residency Navigation',
    sector: 'FinTech & Freelance',
    rootNeed: 'Automated tax arbitrage, residency day-counter, and treaty allocation engine for remote contractors',
    signalCount: 98,
    averageFrustration: 8.6,
    keywords: ['dual residency', 'treaty', 'multi-currency', '183-day rule', 'freelance invoice', 'audit risk'],
    growthVelocityPercent: 52
  },
  {
    id: 'clust-3',
    title: 'State Compaction & Memory Decay in Production AI Agents',
    sector: 'AI & Developer Tools',
    rootNeed: 'Hierarchical episodic memory store for multi-turn autonomous agents to eliminate silent drift and hallucination',
    signalCount: 187,
    averageFrustration: 8.2,
    keywords: ['context rot', 'memory compaction', 'multi-agent drift', 'token limits', 'episodic store'],
    growthVelocityPercent: 89
  },
  {
    id: 'clust-4',
    title: 'Interoperability Void in Fragmented Residential Clean Energy Ecosystems',
    sector: 'CleanTech & Energy',
    rootNeed: 'Universal API gateway and dynamic tariff-arbitrage controller for multi-brand EV, solar, and battery setups',
    signalCount: 76,
    averageFrustration: 7.9,
    keywords: ['inverter API', 'tariff surge', 'EV charging mismatch', 'Home Assistant hack', 'energy silo'],
    growthVelocityPercent: 41
  },
  {
    id: 'clust-5',
    title: 'Asynchronous Context Loss in Cross-Timezone Distributed Teams',
    sector: 'Remote Work & Collab',
    rootNeed: 'Passive work graph synthesizer that surfaces blockers from commits, PRs, and docs without manual standup prompts',
    signalCount: 114,
    averageFrustration: 7.5,
    keywords: ['standup bot fatigue', 'timezone barrier', 'unseen blockers', 'cross-functional blindspots'],
    growthVelocityPercent: 37
  },
  {
    id: 'clust-6',
    title: 'The Post-Tutorial Execution Cliff in Technical Skill Mastery',
    sector: 'EdTech & Learning',
    rootNeed: 'Scaffolded sandbox environment providing live cognitive debugging and real architecture guidance post-course',
    signalCount: 129,
    averageFrustration: 8.4,
    keywords: ['tutorial hell', 'empty repo paralysis', 'cognitive scaffolding', 'architecture design gap'],
    growthVelocityPercent: 58
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'TheraScribe: Nuanced Clinical Voice-to-EHR Synthesizer for Solo Therapists',
    sector: 'Healthcare & Wellness',
    rootNeed: 'Eliminate evening double-documentation while preserving human therapeutic nuance and guaranteeing zero-hallucination HIPAA compliance.',
    opportunityScore: 94,
    impactScore: 96,
    demandVelocity: 91,
    moatScore: 88,
    commercialPotential: 97,
    trendStatus: 'Critical High',
    targetPersona: {
      role: 'Solo Licensed Mental Health Counselor (LPC/LMFT)',
      context: 'Conducts 25-30 client hours weekly; overwhelmed by insurance billing codes and evening documentation debt.',
      currentWorkaround: 'Rough bullet points on physical notepads, spending 12 unpaid hours on weekends manually typing EHR summaries.'
    },
    hmwStatement: 'How might we enable solo therapists to convert verbal therapy sessions into verified, audit-ready clinical notes instantaneously without risking patient confidentiality or loss of empathetic nuance?',
    proposedMvp: [
      'Local-first audio transcription pipeline with on-device redaction of Personally Identifiable Information (PII).',
      'Diagnostic code cross-referencer with DSM-5-TR validation prompts.',
      'One-click direct synchronization with major solo EHRs (SimplePractice, TherapyNotes).'
    ],
    businessModel: '$79/month B2B SaaS per provider with a 14-day zero-risk trial. High LTV with sub-2% churn.',
    competitorGaps: [
      {
        incumbentName: 'Legacy EHRs (Epic, SimplePractice)',
        existingSolution: 'Manual text box templates with rigid dropdown checkboxes.',
        fatalFlaw: 'Requires 15+ minutes per session of robotic manual input; zero automated voice synthesis.',
        userGrievance: '"I feel like a data-entry clerk rather than a clinician."'
      },
      {
        incumbentName: 'Generic AI Dictation Tools',
        existingSolution: 'Standard speech-to-text with basic LLM cleanup.',
        fatalFlaw: 'Hallucinates diagnostic codes and violates HIPAA unless on enterprise $50k/year tiers.',
        userGrievance: '"It put suicidal ideation notes into a generalized anxiety session."'
      }
    ],
    evidenceSignals: [
      INITIAL_SIGNALS[0],
      INITIAL_SIGNALS[1]
    ],
    createdAt: '2026-11-20',
    verifiedByAi: true
  },
  {
    id: 'opp-2',
    title: 'NexusMemory: Hierarchical State Compaction Engine for Autonomous Agents',
    sector: 'AI & Developer Tools',
    rootNeed: 'A drop-in episodic memory framework preventing context window rot, multi-agent goal divergence, and token blowup in production AI systems.',
    opportunityScore: 92,
    impactScore: 90,
    demandVelocity: 98,
    moatScore: 92,
    commercialPotential: 89,
    trendStatus: 'Surging',
    targetPersona: {
      role: 'AI Infrastructure Engineer & Agentic SaaS Founders',
      context: 'Building multi-agent autonomous pipelines for customer support, coding, or workflow execution; battling sudden prompt degradation.',
      currentWorkaround: 'Crude sliding window token truncations and manual vector search re-indexing that drops critical earlier decisions.'
    },
    hmwStatement: 'How might we furnish autonomous AI agent runtimes with self-compressing, hierarchical working memory so that 50+ turn workflows maintain zero loss of initial goal constraints?',
    proposedMvp: [
      'Lightweight Python/TypeScript SDK intercepting LLM messages before token transmission.',
      'Semantic clustering layer that collapses finished task dialogues into immutable milestone embeddings.',
      'Live visual memory graph inspector showing agent state stability.'
    ],
    businessModel: 'Developer-first usage-based pricing: Free tier up to 50k agent turns/mo, then $0.002 per state compaction event.',
    competitorGaps: [
      {
        incumbentName: 'LangChain / LlamaIndex Vector Stores',
        existingSolution: 'Naive RAG retrieval over past chat chunks.',
        fatalFlaw: 'Retrieves disjointed paragraphs without causal temporal awareness; causes agents to loop.',
        userGrievance: '"The agent forgets why it was given a rule 5 turns ago."'
      },
      {
        incumbentName: 'Raw Context Expansion (1M+ token windows)',
        existingSolution: 'Stuffing every single turn into gigantic model context.',
        fatalFlaw: 'Exponential latency, astronomical API cost ($50/run), and "needle-in-a-haystack" attention fading.',
        userGrievance: '"Our AWS bill exploded 6x and the agent still hallucinated."'
      }
    ],
    evidenceSignals: [
      INITIAL_SIGNALS[4],
      INITIAL_SIGNALS[5]
    ],
    createdAt: '2026-11-21',
    verifiedByAi: true
  },
  {
    id: 'opp-3',
    title: 'NomadTax TreatyIQ: Cross-Border Autonomous Tax & Residency Arbitrage',
    sector: 'FinTech & Freelance',
    rootNeed: 'Automated continuous physical presence tracking synchronized with international bilateral tax treaties and multi-currency income streams.',
    opportunityScore: 89,
    impactScore: 92,
    demandVelocity: 85,
    moatScore: 87,
    commercialPotential: 94,
    trendStatus: 'Critical High',
    targetPersona: {
      role: 'Cross-Border Freelancers & High-Earning Remote Contractors ($80k+)',
      context: 'Working across 3-8 jurisdictions annually; terrified of accidental tax residency liabilities and double-tax penalties.',
      currentWorkaround: 'Maintaining Google Sheets of passport stamps, flight tickets, and guessing tax treaty exemptions.'
    },
    hmwStatement: 'How might we turn passive location data and international invoice records into a proactive, audit-proof tax mitigation roadmap for borderless remote professionals?',
    proposedMvp: [
      'Passive calendar & flight geolocation verification with 183-day residency alert thresholds.',
      'Automated bilateral treaty calculator matching invoice country of origin with contractor fiscal residence.',
      'One-click export bundle certified for international CPA filing.'
    ],
    businessModel: '$299/annual subscription or $39/month with premium CPA partner review add-ons.',
    competitorGaps: [
      {
        incumbentName: 'TurboTax / Traditional Tax Software',
        existingSolution: 'Domestic single-country filing wizards.',
        fatalFlaw: 'Assumes permanent physical residency; breaks down completely when foreign earned income exclusion (FEIE) applies.',
        userGrievance: '"TurboTax told me I owed $14,000 in state tax for a state I haven\'t set foot in for 2 years."'
      },
      {
        incumbentName: 'Boutique Expat Tax Firms',
        existingSolution: 'Manual human accounting services.',
        fatalFlaw: 'Extremely slow, opaque pricing ($2,500 - $5,000), and reactive rather than predictive.',
        userGrievance: '"They only talk to me once a year when the penalty has already triggered."'
      }
    ],
    evidenceSignals: [
      INITIAL_SIGNALS[2],
      INITIAL_SIGNALS[3]
    ],
    createdAt: '2026-11-19',
    verifiedByAi: true
  },
  {
    id: 'opp-4',
    title: 'VoltHarmonize: Universal Residential Energy Protocol & Dynamic Tariff Arbitrage',
    sector: 'CleanTech & Energy',
    rootNeed: 'Unified local microgrid controller bridging disconnected solar inverters, EV chargers, and home batteries to auto-arbitrage volatile hourly electricity rates.',
    opportunityScore: 86,
    impactScore: 84,
    demandVelocity: 87,
    moatScore: 89,
    commercialPotential: 85,
    trendStatus: 'Emerging',
    targetPersona: {
      role: 'Eco-conscious Homeowner with Solar + EV + Battery',
      context: 'Invested $35k in clean tech but frustrated by conflicting manufacturer walled gardens that drain expensive grid power during peak tariffs.',
      currentWorkaround: 'Manually toggling EV charging apps at 11 PM or writing unmaintained Home Assistant YAML scripts.'
    },
    hmwStatement: 'How might we orchestrate heterogeneous home clean-energy devices into an autonomous, self-balancing energy exchange that minimizes grid costs without user micromanagement?',
    proposedMvp: [
      'Universal hardware/API bridge connecting Enphase, Tesla Powerwall, SolarEdge, and ChargePoint.',
      'Real-time utility rate sync (hourly spot prices and dynamic peak tariffs).',
      'Autonomous charge/discharge scheduler maximizing self-consumption and battery health.'
    ],
    businessModel: 'Hardware bridge dongle ($149) + $9.99/mo cloud optimization subscription with guaranteed payback within 6 months.',
    competitorGaps: [
      {
        incumbentName: 'OEM Native Apps (Tesla, Enphase, SolarEdge)',
        existingSolution: 'Proprietary manufacturer dashboards.',
        fatalFlaw: 'Walled gardens that deliberately refuse to communicate or coordinate with competitor hardware.',
        userGrievance: '"My Tesla charger has no idea my SolarEdge battery is empty, so it pulls straight from the grid at 48c/kWh."'
      }
    ],
    evidenceSignals: [
      INITIAL_SIGNALS[6]
    ],
    createdAt: '2026-11-18',
    verifiedByAi: true
  },
  {
    id: 'opp-5',
    title: 'GhostBridge: Post-Tutorial Cognitive Scaffolding for Engineering Apprentices',
    sector: 'EdTech & Learning',
    rootNeed: 'Bridge the execution chasm between passive code-along tutorials and blank-canvas software architecture through step-by-step cognitive scaffolding.',
    opportunityScore: 88,
    impactScore: 87,
    demandVelocity: 89,
    moatScore: 83,
    commercialPotential: 90,
    trendStatus: 'Surging',
    targetPersona: {
      role: 'Aspiring Software Developer / Bootcamp Graduate',
      context: 'Can build apps when following tutorial videos, but experiences complete paralysis when asked to design a schema or system from scratch.',
      currentWorkaround: 'Endless tutorial bingeing (tutorial hell) and copy-pasting starter boilerplate they do not understand.'
    },
    hmwStatement: 'How might we empower self-directed learners to transition from code imitation to original software design through interactive architectural scaffolding and real-time conceptual feedback?',
    proposedMvp: [
      'Interactive visual system architecture canvas that translates requirements into modular code milestones.',
      'AI architectural sparring partner that challenges naive design choices before code is written.',
      'Progressive dependency release: scaffolds fade as student confidence and repository complexity grow.'
    ],
    businessModel: '$24/month consumer subscription with career track certifications and university cohort licensing.',
    competitorGaps: [
      {
        incumbentName: 'Udemy / Coursera / Codecademy',
        existingSolution: 'Video playlists with in-browser syntax quizzes.',
        fatalFlaw: 'Tests trivial syntax recall rather than trade-off evaluation, system design, or debugging.',
        userGrievance: '"I have 12 certificates but I couldn\'t pass a basic junior developer architecture interview."'
      }
    ],
    evidenceSignals: [
      INITIAL_SIGNALS[8]
    ],
    createdAt: '2026-11-22',
    verifiedByAi: true
  }
];
