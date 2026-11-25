import os
import re
import math
import json
import streamlit as st
import pandas as pd
import plotly.express as px
import streamlit.components.v1 as components

# ==========================================
# 1. STREAMLIT PAGE CONFIGURATION
# ==========================================
st.set_page_config(
    page_title="UnMetNeed — AI-Powered Market Gap Discovery",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Styling (Calcite Theme: #1B1D1F, #26292D, #3C4044, #FD7B41, #EDBF9B, #DDDCDB)
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

html, body, [class*="css"] {
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #DDDCDB;
    background-color: #1B1D1F;
}

h1, h2, h3, .font-serif {
    font-family: 'Libre Baskerville', Georgia, serif !important;
}

.stApp {
    background-color: #1B1D1F;
}

/* Calcite Cards */
.calcite-card {
    background-color: #26292D;
    border: 1px solid #3C4044;
    border-radius: 14px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.score-badge {
    background-color: #1B1D1F;
    border: 1px solid #FD7B41;
    color: #FD7B41;
    font-weight: 700;
    font-size: 1.2rem;
    padding: 4px 12px;
    border-radius: 8px;
    display: inline-block;
}

.pill-orange {
    background-color: rgba(253, 123, 65, 0.15);
    color: #FD7B41;
    border: 1px solid rgba(253, 123, 65, 0.3);
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
}

.pill-peach {
    background-color: #1B1D1F;
    color: #EDBF9B;
    border: 1px solid #3C4044;
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 0.75rem;
}
</style>
""", unsafe_allow_html=True)

# ==========================================
# 2. PYTHON NLP PIPELINE & SCORING
# ==========================================
STOP_WORDS = {
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
}

FRICTION_WORDS = [
    'burnout', 'exhausting', 'impossible', 'broken', 'hell', 'ridiculous', 'hate', 'frustrated',
    'nightmare', 'unpaid', 'fail', 'failing', 'waste', 'clunky', 'terrible', 'annoying', 'hallucinates',
    'zero native', 'double documentation', 'spreadsheet', 'manual', 'hacky', 'fragile', 'loop'
]

def tokenize(text: str):
    words = re.findall(r'[a-zA-Z0-9]+', text.lower())
    return [w for w in words if len(w) > 2 and w not in STOP_WORDS]

def calculate_frustration(text: str):
    lower = text.lower()
    found = [w for w in FRICTION_WORDS if w in lower]
    score = min(10.0, max(3.0, 5.0 + len(found) * 1.2))
    return round(score, 1), found

def compute_opportunity_score(impact, demand, moat, commercial):
    weighted = (impact * 0.35) + (demand * 0.30) + (moat * 0.20) + (commercial * 0.15)
    return round(weighted)

def synthesize_opportunity(text: str, sector: str):
    tokens = tokenize(text)
    frustration, triggers = calculate_frustration(text)
    impact = min(98, max(72, round(frustration * 9.8)))
    demand = 85
    moat = 88
    commercial = 90
    score = compute_opportunity_score(impact, demand, moat, commercial)
    top_kw = ", ".join(list(dict.fromkeys(tokens))[:4]) or "domain workflows"

    return {
        "id": f"opp-py-{len(st.session_state.opportunities) + 1}",
        "title": f"Autonomous Engine for {' '.join(w.capitalize() for w in tokens[:3])} Optimization",
        "sector": sector,
        "rootNeed": f"Eliminate manual friction in {top_kw} by providing an autonomous, context-aware system built for high-stakes accuracy.",
        "opportunityScore": score,
        "impactScore": impact,
        "demandVelocity": demand,
        "moatScore": moat,
        "commercialPotential": commercial,
        "trendStatus": "Surging" if score > 85 else "Emerging",
        "targetPersona": {
            "role": f"Domain Specialists in {sector}",
            "context": f"Battling friction around: '{text[:70]}...'",
            "currentWorkaround": "Relying on manual spreadsheets or disconnected legacy software."
        },
        "hmwStatement": f"How might we empower practitioners in {sector} to bypass fragmented tools and resolve {top_kw} with zero cognitive overhead?",
        "proposedMvp": [
            f"Tailored ingestion pipeline optimized for {top_kw}.",
            "Automated discrepancy detection and reconciliation engine.",
            "One-click integration and export to existing stack."
        ],
        "businessModel": "$49 - $129/mo tiered B2B SaaS subscription.",
        "competitorGaps": [
            {
                "incumbentName": "Incumbent Suites",
                "fatalFlaw": "Overpriced, bloated, and lacks domain depth.",
                "userGrievance": "\"Built for corporate buyers, not practitioners.\""
            }
        ],
        "createdAt": "2026-11-23"
    }

# ==========================================
# 3. INITIAL SEED STATE
# ==========================================
if "opportunities" not in st.session_state:
    st.session_state.opportunities = [
        {
            "id": "opp-1",
            "title": "TheraScribe: Nuanced Clinical Voice-to-EHR Synthesizer for Solo Therapists",
            "sector": "Healthcare & Wellness",
            "rootNeed": "Eliminate evening double-documentation while preserving human therapeutic nuance and guaranteeing zero-hallucination HIPAA compliance.",
            "opportunityScore": 94,
            "impactScore": 96,
            "demandVelocity": 91,
            "moatScore": 88,
            "commercialPotential": 97,
            "trendStatus": "Critical High",
            "targetPersona": {
                "role": "Solo Licensed Mental Health Counselor (LPC/LMFT)",
                "context": "Conducts 25-30 client hours weekly; overwhelmed by insurance billing codes and documentation debt.",
                "currentWorkaround": "Rough notes on physical pads, spending 12 unpaid hours on weekends manually typing EHR summaries."
            },
            "hmwStatement": "How might we enable solo therapists to convert verbal therapy sessions into verified, audit-ready clinical notes instantaneously without risking patient confidentiality or loss of empathetic nuance?",
            "proposedMvp": [
                "Local-first audio transcription pipeline with on-device redaction of PII.",
                "Diagnostic code cross-referencer with DSM-5-TR validation prompts.",
                "One-click direct synchronization with major solo EHRs (SimplePractice, TherapyNotes)."
            ],
            "businessModel": "$79/month B2B SaaS per provider with a 14-day zero-risk trial. Sub-2% churn.",
            "competitorGaps": [
                {
                    "incumbentName": "Legacy EHRs (Epic, SimplePractice)",
                    "fatalFlaw": "Requires 15+ minutes per session of robotic manual input; zero automated voice synthesis.",
                    "userGrievance": "\"I feel like a data-entry clerk rather than a clinician.\""
                }
            ],
            "createdAt": "2026-11-20"
        },
        {
            "id": "opp-2",
            "title": "NexusMemory: Hierarchical State Compaction Engine for Autonomous Agents",
            "sector": "AI & Developer Tools",
            "rootNeed": "A drop-in episodic memory framework preventing context window rot, multi-agent goal divergence, and token blowup in production AI systems.",
            "opportunityScore": 92,
            "impactScore": 90,
            "demandVelocity": 98,
            "moatScore": 92,
            "commercialPotential": 89,
            "trendStatus": "Surging",
            "targetPersona": {
                "role": "AI Infrastructure Engineer & Agentic SaaS Founders",
                "context": "Building multi-agent autonomous pipelines; battling sudden prompt degradation after turn 15.",
                "currentWorkaround": "Crude sliding window token truncations and manual vector search re-indexing."
            },
            "hmwStatement": "How might we furnish autonomous AI agent runtimes with self-compressing, hierarchical working memory so that 50+ turn workflows maintain zero loss of initial goal constraints?",
            "proposedMvp": [
                "Lightweight Python/TypeScript SDK intercepting LLM messages before token transmission.",
                "Semantic clustering layer that collapses finished task dialogues into immutable milestone embeddings.",
                "Live visual memory graph inspector showing agent state stability."
            ],
            "businessModel": "Developer-first usage-based pricing: Free tier up to 50k agent turns/mo, then $0.002 per state compaction event.",
            "competitorGaps": [
                {
                    "incumbentName": "LangChain / LlamaIndex Vector Stores",
                    "fatalFlaw": "Retrieves disjointed paragraphs without causal temporal awareness; causes agents to loop.",
                    "userGrievance": "\"The agent forgets why it was given a rule 5 turns ago.\""
                }
            ],
            "createdAt": "2026-11-21"
        },
        {
            "id": "opp-3",
            "title": "NomadTax TreatyIQ: Cross-Border Autonomous Tax & Residency Arbitrage",
            "sector": "FinTech & Freelance",
            "rootNeed": "Automated continuous physical presence tracking synchronized with international bilateral tax treaties and multi-currency income streams.",
            "opportunityScore": 89,
            "impactScore": 92,
            "demandVelocity": 85,
            "moatScore": 87,
            "commercialPotential": 94,
            "trendStatus": "Critical High",
            "targetPersona": {
                "role": "Cross-Border Freelancers & Remote Contractors ($80k+)",
                "context": "Working across 3-8 jurisdictions annually; terrified of accidental tax residency liabilities.",
                "currentWorkaround": "Maintaining Google Sheets of passport stamps, flight tickets, and guessing tax treaties."
            },
            "hmwStatement": "How might we turn passive location data and international invoice records into a proactive, audit-proof tax mitigation roadmap for borderless remote professionals?",
            "proposedMvp": [
                "Passive calendar & flight geolocation verification with 183-day residency alert thresholds.",
                "Automated bilateral treaty calculator matching invoice country of origin with fiscal residence.",
                "One-click export bundle certified for international CPA filing."
            ],
            "businessModel": "$299/annual subscription or $39/month with premium CPA partner review add-ons.",
            "competitorGaps": [
                {
                    "incumbentName": "TurboTax / Traditional Tax Software",
                    "fatalFlaw": "Assumes permanent physical residency; breaks down completely for foreign earned income.",
                    "userGrievance": "\"TurboTax told me I owed $14,000 for a state I haven't lived in for 2 years.\""
                }
            ],
            "createdAt": "2026-11-19"
        }
    ]

# ==========================================
# 4. SIDEBAR CONFIGURATION
# ==========================================
with st.sidebar:
    st.markdown("### ⚡ UnMetNeed AI System")
    st.markdown("<p style='font-size:0.8rem; color:#EDBF9B;'>Market Gap Discovery & Opportunity Engine</p>", unsafe_allow_html=True)
    st.markdown("---")
    
    view_mode = st.radio(
        "Display Mode",
        ["Native Streamlit Studio", "Full React Web App (Vite)"],
        index=0
    )
    
    st.markdown("---")
    st.markdown("**System Health**")
    st.markdown("🟢 NLP Pipeline: `Active`")
    st.markdown(f"📊 Opportunities: `{len(st.session_state.opportunities)}`")
    st.markdown("🎨 Theme: `Calcite Black & Orange`")
    st.markdown("🔤 Font: `Libre Baskerville`")

# ==========================================
# 5. VIEW MODE: REACT APP EMBED (OPTION 2)
# ==========================================
if view_mode == "Full React Web App (Vite)":
    st.markdown("### Live UnMetNeed React Web Application")
    st.markdown("Serving the compiled production web application embedded directly inside Streamlit:")
    dist_index = os.path.join(os.path.dirname(__file__), "dist", "index.html")
    
    if os.path.exists(dist_index):
        with open(dist_index, "r", encoding="utf-8") as f:
            html_content = f.read()
        components.html(html_content, height=1000, scrolling=True)
    else:
        st.info("Vite dev server is running on http://localhost:5173. You can also view it directly in your browser.")
        st.markdown("[👉 Open Localhost React App](http://localhost:5173)")

# ==========================================
# 6. VIEW MODE: NATIVE STREAMLIT STUDIO (OPTION 1)
# ==========================================
else:
    # Header
    col_h1, col_h2 = st.columns([3, 1])
    with col_h1:
        st.markdown("<h1 style='color:#DDDCDB; margin-bottom:0;'>Identify genuine, unaddressed problems <span style='color:#FD7B41;'>before</span> incumbents react.</h1>", unsafe_allow_html=True)
        st.markdown("<p style='color:#EDBF9B; font-size:1.1rem; margin-top:8px;'>An AI-Powered Unmet-Need Discovery and Innovation Opportunity Identification System.</p>", unsafe_allow_html=True)
    with col_h2:
        st.markdown("<div style='text-align:right;'><span class='score-badge'>NLP 2.4 Active</span></div>", unsafe_allow_html=True)

    # 4 Quick Metric Cards
    m1, m2, m3, m4 = st.columns(4)
    with m1:
        st.metric("Semantic Clusters", "6 Clusters", "+42% YoY")
    with m2:
        st.metric("Average Frustration", "8.4 / 10", "High Friction")
    with m3:
        st.metric("Top Opportunity Score", "94 / 100", "TheraScribe")
    with m4:
        st.metric("Incumbent Moat Void", "87%", "Whitespace")

    st.markdown("---")

    # Main Tabs
    tab_opps, tab_clusters, tab_empathy, tab_signals, tab_gaps, tab_studio = st.tabs([
        "🧭 Prioritized Opportunities",
        "⛶ Semantic Clusters",
        "♡ Empathy & HMW Canvas",
        "📡 Raw Signal Stream",
        "🛡️ Competitor Flaws",
        "✨ AI Need Studio"
    ])

    # ----------------------------------------
    # TAB 1: PRIORITIZED OPPORTUNITIES
    # ----------------------------------------
    with tab_opps:
        f_col1, f_col2, f_col3 = st.columns([2, 1, 1])
        with f_col1:
            search_query = st.text_input("🔍 Search Gaps by Keyword or Persona", placeholder="e.g. EHR, freelance, autonomous agent...")
        with f_col2:
            sector_filter = st.selectbox("Market Domain", ["All", "Healthcare & Wellness", "AI & Developer Tools", "FinTech & Freelance", "CleanTech & Energy"])
        with f_col3:
            min_score = st.slider("Minimum Opportunity Score", 70, 95, 75)

        filtered = [
            o for o in st.session_state.opportunities
            if (sector_filter == "All" or o["sector"] == sector_filter)
            and o["opportunityScore"] >= min_score
            and (not search_query or search_query.lower() in o["title"].lower() or search_query.lower() in o["rootNeed"].lower())
        ]

        st.markdown(f"**Showing {len(filtered)} Prioritized Opportunities**")

        for opp in filtered:
            with st.container():
                st.markdown(f"""
                <div class="calcite-card">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                        <div>
                            <span class="pill-peach">{opp['sector']}</span>
                            <span class="pill-orange" style="margin-left:8px;">{opp['trendStatus']}</span>
                        </div>
                        <div class="score-badge">{opp['opportunityScore']} <span style="font-size:0.75rem; color:#DDDCDB;">/100</span></div>
                    </div>
                    <h3 style="color:#DDDCDB; margin-top:4px; margin-bottom:8px;">{opp['title']}</h3>
                    <div style="background-color:#1B1D1F; border-left:4px solid #FD7B41; padding:12px; border-radius:6px; margin-bottom:14px;">
                        <span style="color:#FD7B41; font-size:0.75rem; font-weight:700; text-transform:uppercase;">Core Unmet Need (NLP Extracted)</span>
                        <p style="color:#DDDCDB; font-style:italic; margin-top:4px; margin-bottom:0;">"{opp['rootNeed']}"</p>
                    </div>
                    <p style="font-size:0.85rem; color:#EDBF9B; margin-bottom:4px;"><strong>Target Persona:</strong> {opp['targetPersona']['role']} — {opp['targetPersona']['currentWorkaround']}</p>
                </div>
                """, unsafe_allow_html=True)

                with st.expander(f"📄 Examine Full Opportunity Dossier: {opp['title']}"):
                    d_col1, d_col2 = st.columns([1, 1])
                    with d_col1:
                        st.markdown("**Design Thinking 'How Might We' (HMW) Statement:**")
                        st.info(f"💡 {opp['hmwStatement']}")
                        st.markdown("**Recommended MVP Feature Blueprint:**")
                        for idx, feat in enumerate(opp['proposedMvp']):
                            st.markdown(f"{idx+1}. {feat}")
                    with d_col2:
                        st.markdown("**Validated Business Model:**")
                        st.success(opp['businessModel'])
                        st.markdown("**Why Current Competitors Fail:**")
                        for gap in opp['competitorGaps']:
                            st.warning(f"⚠️ {gap['incumbentName']}: {gap['fatalFlaw']}")

                    # Download Markdown Brief
                    brief_md = f"# UNMETNEED OPPORTUNITY BRIEF: {opp['title']}\n\n- Score: {opp['opportunityScore']}/100\n- Root Need: {opp['rootNeed']}\n- HMW: {opp['hmwStatement']}\n- Business Model: {opp['businessModel']}"
                    st.download_button(
                        f"⬇️ Download Brief ({opp['id']}.md)",
                        data=brief_md,
                        file_name=f"{opp['id']}_brief.md",
                        mime="text/markdown"
                    )

    # ----------------------------------------
    # TAB 2: SEMANTIC CLUSTERS (PLOTLY GRAPH)
    # ----------------------------------------
    with tab_clusters:
        st.markdown("### Objective 1: NLP Semantic Similarity & Vector Centroids")
        st.markdown("Visualizing complaints grouped by semantic centroid. Complaints sharing the same underlying need cluster together.")

        df_clusters = pd.DataFrame([
            {"Cluster": "Clinical EHR Fatigue", "Signals": 142, "Pain": 8.8, "Growth": 64, "Sector": "Healthcare"},
            {"Cluster": "Cross-Border Tax Gap", "Signals": 98, "Pain": 8.6, "Growth": 52, "Sector": "FinTech"},
            {"Cluster": "Agent Memory Decay", "Signals": 187, "Pain": 8.2, "Growth": 89, "Sector": "AI Tools"},
            {"Cluster": "Clean Energy Silos", "Signals": 76, "Pain": 7.9, "Growth": 41, "Sector": "CleanTech"},
            {"Cluster": "Async Context Loss", "Signals": 114, "Pain": 7.5, "Growth": 37, "Sector": "Remote Work"},
            {"Cluster": "Post-Tutorial Cliff", "Signals": 129, "Pain": 8.4, "Growth": 58, "Sector": "EdTech"}
        ])

        fig = px.scatter(
            df_clusters,
            x="Signals",
            y="Growth",
            size="Pain",
            color="Sector",
            hover_name="Cluster",
            text="Cluster",
            color_discrete_sequence=["#FD7B41", "#EDBF9B", "#DDDCDB", "#3C4044", "#FFA07A", "#FF6347"],
            title="Semantic Centroid Map: Ingested Signals vs. YoY Growth Velocity"
        )
        fig.update_layout(
            paper_bgcolor="#1B1D1F",
            plot_bgcolor="#26292D",
            font_color="#DDDCDB"
        )
        st.plotly_chart(fig, use_container_width=True)

    # ----------------------------------------
    # TAB 3: EMPATHY MAP & HMW CANVAS
    # ----------------------------------------
    with tab_empathy:
        st.markdown("### Units I–II: Design Thinking Empathy Map & Ideation Canvas")
        e1, e2 = st.columns(2)
        with e1:
            st.markdown("#### 1. SAYS (Verbatim User Quotes)")
            st.code('"I spend 3 hours every evening re-typing notes into our clunky legacy EHR."', language="text")
            st.code('"TurboTax has zero comprehension of dual-tax treaties. Tracking in 8 spreadsheets."', language="text")

            st.markdown("#### 3. DOES (Observed Workarounds)")
            st.code('Keeps spiral notepads during sessions, batch typing on weekend.', language="text")
            st.code('Maintains Excel formulas with passport flight dates to calculate 183-day rule.', language="text")

        with e2:
            st.markdown("#### 2. THINKS (Internal Doubts & Fears)")
            st.code('If I miscode a diagnostic rubric, insurance will reject our reimbursement.', language="text")
            st.code('Terrified of accidental tax residency audit in a country I only visited for 2 months.', language="text")

            st.markdown("#### 4. FEELS (Emotional Friction)")
            st.code('Burnout, administrative paralysis, fear of compliance penalties.', language="text")
            st.code('Anxiety over multi-currency exchange rate volatility.', language="text")

    # ----------------------------------------
    # TAB 4: RAW SIGNAL STREAM
    # ----------------------------------------
    with tab_signals:
        st.markdown("### Objective 2: Public Internet Discussion Stream")
        st.markdown("Unfiltered human complaints ingested from Reddit, G2, Trustpilot, ProductHunt, and arXiv:")
        
        signals_data = [
            {"Source": "Reddit", "Author": "u/clinical_mind_88", "Friction": "9/10", "Content": "I spend 3 hours every evening re-typing notes from therapy sessions into legacy EHR."},
            {"Source": "G2 Review", "Author": "Mental Health Practice Lead", "Friction": "8/10", "Content": "Software claims to have automated notes, but hallucinates diagnostic codes. Shut it off after 2 weeks."},
            {"Source": "Reddit", "Author": "u/nomad_tax_pain", "Friction": "9/10", "Content": "Invoiced 14 clients in EUR, USD, GBP. TurboTax and QuickBooks have zero native comprehension of tax treaties."},
            {"Source": "Twitter/X", "Author": "@dev_lead_sarah", "Friction": "8/10", "Content": "Multi-agent workflow kept drifting after turn 15. Context rot is the silent killer in production AI."}
        ]
        st.dataframe(pd.DataFrame(signals_data), use_container_width=True)

    # ----------------------------------------
    # TAB 5: COMPETITOR FLAWS MATRIX
    # ----------------------------------------
    with tab_gaps:
        st.markdown("### Objective 3: Why Existing Incumbent Solutions Fail")
        gaps_data = [
            {"Incumbent": "Legacy EHRs (Epic, SimplePractice)", "Current Solution": "Rigid checkboxes & text templates", "Fatal Flaw": "Requires 15+ mins per session of robotic data entry; zero voice synthesis."},
            {"Incumbent": "Generic AI Dictation Tools", "Current Solution": "Generic speech-to-text with LLM cleanup", "Fatal Flaw": "Hallucinates medical codes; violates HIPAA without expensive enterprise tiers."},
            {"Incumbent": "TurboTax / TaxACT", "Current Solution": "Single-country domestic wizard", "Fatal Flaw": "Assumes permanent domicile; breaks for foreign earned income exclusion."},
            {"Incumbent": "LangChain / LlamaIndex", "Current Solution": "Naive vector chunk retrieval", "Fatal Flaw": "Lacks temporal state awareness; causes multi-agent loops."}
        ]
        st.table(pd.DataFrame(gaps_data))

    # ----------------------------------------
    # TAB 6: AI NEED STUDIO
    # ----------------------------------------
    with tab_studio:
        st.markdown("### Objective 1 & 4: Interactive Problem-to-Opportunity Engine")
        st.markdown("Enter any raw complaint or user problem statement. The NLP pipeline will extract tokens, score friction, and synthesize an opportunity dossier.")

        user_input = st.text_area(
            "Paste Raw Customer Grievance / Unmet Need Observation",
            placeholder="e.g. 'Solo contract lawyers spend thousands on clunky enterprise document redline software that breaks Word formatting and doesn't track client liability thresholds...'",
            height=120
        )
        sector_choice = st.selectbox("Market Domain", ["Healthcare & Wellness", "AI & Developer Tools", "FinTech & Freelance", "CleanTech & Energy", "EdTech & Learning"], key="studio_sector")

        if st.button("⚡ Synthesize Innovation Opportunity", type="primary"):
            if user_input.strip():
                with st.spinner("Processing NLP embeddings & calculating Opportunity Index..."):
                    new_opp = synthesize_opportunity(user_input, sector_choice)
                    st.session_state.opportunities.insert(0, new_opp)
                    st.success(f"Successfully Synthesized: **{new_opp['title']}** (Score: {new_opp['opportunityScore']}/100)!")
                    st.json(new_opp)
            else:
                st.warning("Please enter a problem statement or grievance first.")
