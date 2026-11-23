import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ==========================================
// 1. NLP PROCESSING & SCORING PIPELINE
// ==========================================

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can',
  'cannot', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from',
  'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself',
  'his', 'how', 'i', 'i\'m', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'its', 'itself', 'just', 'me',
  'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other',
  'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some',
  'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these',
  'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were',
  'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your'
]);

const FRICTION_TRIGGERS = [
  'burnout', 'exhausting', 'impossible', 'broken', 'hell', 'ridiculous', 'hate', 'frustrated',
  'nightmare', 'unpaid', 'fail', 'failing', 'waste', 'clunky', 'terrible', 'annoying', 'hallucinates',
  'zero native', 'double documentation', 'spreadsheet', 'manual', 'hacky', 'fragile', 'loop'
];

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOP_WORDS.has(word));
}

function calculateFrustration(text) {
  const lower = text.toLowerCase();
  const triggers = FRICTION_TRIGGERS.filter(t => lower.includes(t));
  const score = Math.min(10, Math.max(3, 5 + triggers.length * 1.2));
  return {
    score: Math.round(score * 10) / 10,
    triggers
  };
}

function calculateOpportunityScore(impact, demand, moat, commercial) {
  // Weighted Prioritization Formula (Objective 4)
  const weighted = (impact * 0.35) + (demand * 0.30) + (moat * 0.20) + (commercial * 0.15);
  return Math.round(weighted);
}

function cosineSimilarity(tokensA, tokensB) {
  const setA = new Set(tokensA);
  const setB = new Set(tokensB);
  const intersection = tokensA.filter(x => setB.has(x));
  if (setA.size === 0 || setB.size === 0) return 0;
  return intersection.length / Math.sqrt(setA.size * setB.size);
}

// ==========================================
// 2. IN-MEMORY DATA STORE & SEEDS
// ==========================================

const SIGNALS = [
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
    source: 'Twitter/X',
    author: '@dev_lead_sarah',
    timestamp: '1 day ago',
    content: "Our team's multi-agent workflow kept drifting after turn 15. The LLM agents forgot earlier schema constraints because none of the existing agent frameworks handle state compaction gracefully. Context rot is the #1 silent killer in production AI.",
    frustrationLevel: 8,
    sentiment: 'severe_friction',
    sector: 'AI & Developer Tools',
    clusterTag: 'agent-context-decay'
  }
];

const CLUSTERS = [
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
    keywords: ['dual residency', 'treaty', 'multi-currency', '183-day rule', 'freelance invoice'],
    growthVelocityPercent: 52
  },
  {
    id: 'clust-3',
    title: 'State Compaction & Memory Decay in Production AI Agents',
    sector: 'AI & Developer Tools',
    rootNeed: 'Hierarchical episodic memory store for multi-turn autonomous agents to eliminate silent drift and hallucination',
    signalCount: 187,
    averageFrustration: 8.2,
    keywords: ['context rot', 'memory compaction', 'multi-agent drift', 'token limits'],
    growthVelocityPercent: 89
  }
];

let OPPORTUNITIES = [
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
      context: 'Conducts 25-30 client hours weekly; overwhelmed by insurance billing codes and documentation debt.',
      currentWorkaround: 'Rough notes on physical pads, spending 12 unpaid hours on weekends manually typing EHR summaries.'
    },
    hmwStatement: 'How might we enable solo therapists to convert verbal therapy sessions into verified, audit-ready clinical notes instantaneously without risking patient confidentiality or loss of empathetic nuance?',
    proposedMvp: [
      'Local-first audio transcription pipeline with on-device redaction of Personally Identifiable Information (PII).',
      'Diagnostic code cross-referencer with DSM-5-TR validation prompts.',
      'One-click direct synchronization with major solo EHRs (SimplePractice, TherapyNotes).'
    ],
    businessModel: '$79/month B2B SaaS per provider with a 14-day zero-risk trial. Sub-2% churn.',
    competitorGaps: [
      {
        incumbentName: 'Legacy EHRs (Epic, SimplePractice)',
        existingSolution: 'Manual text box templates with rigid dropdown checkboxes.',
        fatalFlaw: 'Requires 15+ minutes per session of robotic manual input; zero automated voice synthesis.',
        userGrievance: '"I feel like a data-entry clerk rather than a clinician."'
      }
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
      context: 'Building multi-agent autonomous pipelines; battling sudden prompt degradation after turn 15.',
      currentWorkaround: 'Crude sliding window token truncations and manual vector search re-indexing.'
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
      }
    ],
    createdAt: '2026-11-21',
    verifiedByAi: true
  }
];

// ==========================================
// 3. REST API ENDPOINTS
// ==========================================

// Health Check & Backend Metadata
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'UnMetNeed Backend Intelligence Engine',
    nlpVersion: '2.4.0-centroid',
    activeClusters: CLUSTERS.length,
    opportunitiesRanked: OPPORTUNITIES.length,
    uptimeSeconds: process.uptime()
  });
});

// GET /api/opportunities (Objective 4: Ranked Innovation Opportunities)
app.get('/api/opportunities', (req, res) => {
  let { sector, minScore, search, sortBy } = req.query;
  let results = [...OPPORTUNITIES];

  if (sector && sector !== 'All') {
    results = results.filter(o => o.sector.toLowerCase() === sector.toLowerCase());
  }

  if (minScore) {
    const scoreVal = parseInt(minScore, 10);
    results = results.filter(o => o.opportunityScore >= scoreVal);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(o => 
      o.title.toLowerCase().includes(q) ||
      o.rootNeed.toLowerCase().includes(q) ||
      o.targetPersona.role.toLowerCase().includes(q)
    );
  }

  if (sortBy === 'velocity') {
    results.sort((a, b) => b.demandVelocity - a.demandVelocity);
  } else if (sortBy === 'impact') {
    results.sort((a, b) => b.impactScore - a.impactScore);
  } else {
    results.sort((a, b) => b.opportunityScore - a.opportunityScore);
  }

  res.json({
    total: results.length,
    opportunities: results
  });
});

// GET /api/opportunities/:id
app.get('/api/opportunities/:id', (req, res) => {
  const opp = OPPORTUNITIES.find(o => o.id === req.params.id);
  if (!opp) {
    return res.status(404).json({ error: 'Opportunity not found' });
  }
  res.json(opp);
});

// GET /api/clusters (Objective 1: Semantic Problem Clusters)
app.get('/api/clusters', (req, res) => {
  res.json({
    total: CLUSTERS.length,
    clusters: CLUSTERS
  });
});

// GET /api/signals (Objective 2: Raw Public Signal Stream)
app.get('/api/signals', (req, res) => {
  res.json({
    total: SIGNALS.length,
    signals: SIGNALS
  });
});

// GET /api/competitor-gaps (Objective 3: Incumbent Limitations)
app.get('/api/competitor-gaps', (req, res) => {
  const allGaps = OPPORTUNITIES.flatMap(o => 
    o.competitorGaps.map(g => ({
      opportunityTitle: o.title,
      sector: o.sector,
      ...g
    }))
  );
  res.json({
    total: allGaps.length,
    gaps: allGaps
  });
});

// POST /api/analyze-need (Objective 1 & 4: Live NLP Extraction)
app.post('/api/analyze-need', (req, res) => {
  const { text, sector = 'Healthcare & Wellness' } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'A valid "text" string is required' });
  }

  const tokens = tokenize(text);
  const { score: frustration, triggers } = calculateFrustration(text);

  const impactScore = Math.min(98, Math.max(72, Math.round(frustration * 9.8)));
  const demandVelocity = Math.min(96, Math.max(68, 70 + Math.floor(Math.random() * 25)));
  const moatScore = Math.min(94, Math.max(75, 76 + Math.floor(Math.random() * 20)));
  const commercialPotential = Math.min(97, Math.max(70, 75 + Math.floor(Math.random() * 22)));

  const overallScore = calculateOpportunityScore(impactScore, demandVelocity, moatScore, commercialPotential);
  const topKeywords = Array.from(new Set(tokens)).slice(0, 4).join(', ') || 'specialized workflows';

  const synthesized = {
    id: `opp-api-${Date.now()}`,
    title: `Autonomous Engine for ${tokens.slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Optimization`,
    sector,
    rootNeed: `Eliminate manual friction in ${topKeywords} by providing an autonomous, context-aware system built for high-stakes accuracy.`,
    opportunityScore: overallScore,
    impactScore,
    demandVelocity,
    moatScore,
    commercialPotential,
    trendStatus: overallScore > 90 ? 'Critical High' : 'Surging',
    targetPersona: {
      role: `Practitioners & Operators in ${sector}`,
      context: `Battling unaddressed friction around: "${text.slice(0, 75)}..."`,
      currentWorkaround: 'Relying on manual spreadsheets or clumsy disconnected SaaS.'
    },
    hmwStatement: `How might we empower practitioners in ${sector} to bypass fragmented tools and resolve ${topKeywords} with zero cognitive overhead?`,
    proposedMvp: [
      `Streamlined data ingestion pipeline tailored to ${topKeywords} workflows.`,
      'Intelligent discrepancy detector with automated reconciliation rules.',
      'One-click export and seamless integration with existing software stack.'
    ],
    businessModel: '$49 - $129/month tiered B2B SaaS subscription with annual prepayment discounts.',
    competitorGaps: [
      {
        incumbentName: 'Generic Incumbent Suites',
        existingSolution: 'Broad enterprise platforms with rigid configuration.',
        fatalFlaw: 'Overpriced, takes 6 months to onboard, and lacks domain-specific depth.',
        userGrievance: '"They build for procurement teams, not everyday practitioners."'
      }
    ],
    nlpMetadata: {
      tokenCount: tokens.length,
      extractedTokens: tokens,
      detectedTriggers: triggers,
      frictionRating: frustration
    },
    createdAt: new Date().toISOString().split('T')[0],
    verifiedByAi: true
  };

  OPPORTUNITIES.unshift(synthesized);
  res.status(201).json(synthesized);
});

// POST /api/batch-cluster (Semantic Centroid Grouping of Multiple Rants)
app.post('/api/batch-cluster', (req, res) => {
  const { complaints } = req.body;
  if (!Array.isArray(complaints) || complaints.length === 0) {
    return res.status(400).json({ error: 'Array of "complaints" strings is required' });
  }

  const processed = complaints.map((text, idx) => {
    const tokens = tokenize(text);
    const { score } = calculateFrustration(text);
    return {
      index: idx,
      text,
      tokens,
      frustration: score
    };
  });

  // Calculate similarity matrix and group
  const clustersFound = [];
  const visited = new Set();

  for (let i = 0; i < processed.length; i++) {
    if (visited.has(i)) continue;
    const group = [processed[i]];
    visited.add(i);

    for (let j = i + 1; j < processed.length; j++) {
      if (visited.has(j)) continue;
      const sim = cosineSimilarity(processed[i].tokens, processed[j].tokens);
      if (sim > 0.25) {
        group.push(processed[j]);
        visited.add(j);
      }
    }

    clustersFound.push({
      clusterId: `cluster-batch-${i + 1}`,
      sampleSize: group.length,
      avgFrustration: Math.round((group.reduce((acc, g) => acc + g.frustration, 0) / group.length) * 10) / 10,
      dominantKeywords: Array.from(new Set(group.flatMap(g => g.tokens))).slice(0, 5),
      complaints: group.map(g => g.text)
    });
  }

  res.json({
    totalComplaintsAnalyzed: complaints.length,
    clustersIdentified: clustersFound.length,
    clusters: clustersFound
  });
});

app.listen(PORT, () => {
  console.log(`[UnMetNeed Backend] REST API Server running on http://localhost:${PORT}`);
  console.log(`[UnMetNeed Backend] Available endpoints:`);
  console.log(`  GET  /api/health`);
  console.log(`  GET  /api/opportunities`);
  console.log(`  GET  /api/clusters`);
  console.log(`  GET  /api/signals`);
  console.log(`  GET  /api/competitor-gaps`);
  console.log(`  POST /api/analyze-need`);
  console.log(`  POST /api/batch-cluster`);
});
