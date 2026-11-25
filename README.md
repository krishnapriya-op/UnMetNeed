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

## 🎨 Visual Identity & Styling: Calcite Palette
- **Typeface**: **Libre Baskerville** (Editorial Serif) paired with clean grotesque sans-serif for data density.
- **Color Palette — Calcite**:
  - `#1B1D1F` — Deep Charcoal Mineral Base
  - `#26292D` — Card Surface Slate
  - `#3C4044` — Deep Charcoal Border & Sub-surfaces
  - `#FD7B41` — Vibrant Calcite Orange (Primary Accent, Score Badges, CTAs)
  - `#EDBF9B` — Warm Sandstone / Peach (Secondary Accent & Metric Labels)
  - `#DDDCDB` — Light Mineral Gray (High-Contrast Text)

---

## ☁️ Streamlit Cloud Deployment Configuration

This repository is fully configured for one-click deployment on **[Streamlit Community Cloud](https://share.streamlit.io)**.

### Deployment Files Created:
1. **`streamlit_app.py`** & **`app.py`**: The Streamlit application entry points.
2. **`requirements.txt`**: Declares required Python packages (`streamlit`, `pandas`, `plotly`).
3. **`.streamlit/config.toml`**: Customizes the Streamlit server and injects the **Calcite** black & orange theme.

### How to Deploy to Streamlit Cloud:
1. Push this repository to GitHub.
2. Navigate to **[share.streamlit.io](https://share.streamlit.io)** and log in with GitHub.
3. Click **"New app"**.
4. Select your repository: `UnmetNeed`.
5. Set **Main file path**: `streamlit_app.py` (or `app.py`).
6. Click **"Deploy!"**. Streamlit Cloud will automatically install dependencies from `requirements.txt` and launch your app.

### Running Streamlit Locally:
```bash
# Run Streamlit with Python 3
python -m streamlit run streamlit_app.py
```
Live local URL: **[http://localhost:8501](http://localhost:8501)**

---

## 💻 Running the Web Application Locally

### 1. React Web App (Vite)
```bash
npm run dev
```
Live URL: **[http://localhost:5173](http://localhost:5173)**

### 2. Express Backend API
```bash
npm run server
```
Live URL: **[http://localhost:5000](http://localhost:5000)**

---

## 🚀 Key Features Built to Address the 4 Document Objectives

### Objective 1: NLP Semantic Similarity & Root-Cause Clustering
- Group disparate complaints that use different vocabulary but express the same core friction.
- Interactive **Semantic Problem Clusters** with 2D vector centroid scatter map.

### Objective 2: Public Multi-Source Signal Aggregation
- Live stream of authentic human complaints sourced across Reddit, G2, Trustpilot, ProductHunt, Twitter/X, and research publications.

### Objective 3: Incumbent Limitation & Competitor Void Evaluation
- Interactive matrix analyzing existing products (Epic EHR, TurboTax, LangChain, Tesla/SolarEdge apps, Codecademy) and their fatal flaws.

### Objective 4: Prioritized Innovation Opportunity Generation
- Algorithmic Opportunity Index ($0-100$):
  $$\text{Score} = 0.35 \times \text{Impact} + 0.30 \times \text{Demand} + 0.20 \times \text{Moat} + 0.15 \times \text{Commercial}$$
- **Full Opportunity Dossier Modal** with HMW prompts, Empathy Map, MVP Blueprint, and one-click Markdown export.
