# UnMetNeed — AI-Powered Unmet-Need Discovery & Innovation Opportunity Identification System

> **Course Code**: 25ESHS01 | CSE-AIML  
> **Activity**: Units I–II · Foundations, Empathy & Human-Centred Research  
> **Institution**: JAIN (Deemed-to-be University)  
> **Ideated By**: Dr. S Kanithan  
> **Student Researchers**:
> 1. KRISHNAPRIYA N (25BTRCL121)
> 2. JANA VANSHIKA (25BTRCL094)
> 3. C B DONISHREE (25BTRCL039)

---

## 🎨 Design System & Aesthetics
- **Typeface**: **Libre Baskerville** (Editorial Serif) paired with clean grotesque sans-serif for data density.
- **Color Palette — Amethyst dawn haze**:
  - `#341C67` — Primary Deep Amethyst / Midnight Violet
  - `#472F5B` — Plum Shadow Surface
  - `#C4AEF4` — Amethyst Lavender Glow
  - `#CCA4B4` — Dawn Mauve / Rose
  - `#DCCE40` — Electric Chartreuse Gold (Primary Accent / Score Badges)

---

## 🚀 Key Features Built to Address the 4 Document Objectives

### Objective 1: NLP Semantic Similarity & Root-Cause Clustering
- Group disparate complaints that use different vocabulary but express the same core friction (e.g., *battery depletion* vs. *mid-shift power loss*).
- Interactive **Semantic Problem Clusters** view showing signal density, pain level ($0-10$), and growth velocity.

### Objective 2: Public Multi-Source Signal Aggregation
- Live stream of authentic human complaints sourced across Reddit, G2, Trustpilot, ProductHunt, Twitter/X, and research publications.
- Real-time frustration rating and emotion categorizer.

### Objective 3: Incumbent Limitation & Competitor Void Evaluation
- Interactive matrix analyzing existing products (Epic EHR, TurboTax, LangChain, Tesla/SolarEdge apps, Codecademy).
- Highlights fatal architectural flaws and actual user grievances where incumbent solutions fail.

### Objective 4: Prioritized Innovation Opportunity Generation
- Algorithmic Opportunity Index ($0-100$) weighted across:
  $$\text{Score} = 0.35 \times \text{Impact} + 0.30 \times \text{Demand Velocity} + 0.20 \times \text{Moat Void} + 0.15 \times \text{Commercial Potential}$$
- **Full Opportunity Dossier Modal** with:
  - Design Thinking *"How Might We"* (HMW) statement
  - Human Empathy Map & Target Persona
  - Minimum Viable Product (MVP) Blueprint
  - Validated Monetization Strategy
  - One-click export to Markdown (`.md`)

### Interactive AI Need Studio
- Enter any custom problem statement, Reddit rant, or review.
- The NLP engine performs tokenization, stop-word removal, and friction scoring, and immediately generates an evidence-based Opportunity Dossier.

---

## 💻 Running the Application
The development server is running live on:
**[http://localhost:5173/](http://localhost:5173/)**

To run manually:
```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build
```
