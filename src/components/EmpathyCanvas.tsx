import React, { useState } from 'react';
import { Opportunity } from '../types';
import { Lightbulb, MessageSquare, Heart, Compass, Plus, Trash2, Download, Copy, Check } from 'lucide-react';

interface EmpathyCanvasProps {
  opportunities: Opportunity[];
}

interface StickyNote {
  id: string;
  quadrant: 'says' | 'thinks' | 'does' | 'feels' | 'hmw';
  text: string;
  author: string;
}

export const EmpathyCanvas: React.FC<EmpathyCanvasProps> = ({ opportunities }) => {
  const [selectedOppId, setSelectedOppId] = useState<string>(opportunities[0]?.id || '');
  const currentOpp = opportunities.find(o => o.id === selectedOppId) || opportunities[0];

  const [notes, setNotes] = useState<StickyNote[]>([
    {
      id: 'n-1',
      quadrant: 'says',
      text: '"I spend 3 hours every evening re-typing notes into our clunky legacy EHR."',
      author: 'Clinical Lead'
    },
    {
      id: 'n-2',
      quadrant: 'thinks',
      text: 'If I make a typo in the billing code, insurance will reject the claim and delay our cashflow for 60 days.',
      author: 'Solo Practitioner'
    },
    {
      id: 'n-3',
      quadrant: 'does',
      text: 'Keeps physical spiral notebooks during sessions, then spends Saturday afternoon batch typing summaries.',
      author: 'Observed Behavior'
    },
    {
      id: 'n-4',
      quadrant: 'feels',
      text: 'Overwhelmed, trapped by administrative overhead, anxious about patient confidentiality breaches.',
      author: 'Emotional State'
    },
    {
      id: 'n-5',
      quadrant: 'hmw',
      text: 'How might we convert natural clinician speech into verified diagnostic records with zero manual transcription?',
      author: 'Team Ideation'
    }
  ]);

  const [newNoteText, setNewNoteText] = useState('');
  const [targetQuadrant, setTargetQuadrant] = useState<StickyNote['quadrant']>('hmw');
  const [copiedHmw, setCopiedHmw] = useState(false);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote: StickyNote = {
      id: `note-${Date.now()}`,
      quadrant: targetQuadrant,
      text: newNoteText.trim(),
      author: 'You (Researcher)'
    };
    setNotes(prev => [...prev, newNote]);
    setNewNoteText('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const handleExportCanvas = () => {
    const md = `
# DESIGN THINKING EMPATHY MAP & HMW WORKSHOP
**System**: UnMetNeed Opportunity Discovery Engine
**Opportunity**: ${currentOpp?.title}
**Sector**: ${currentOpp?.sector}
**Root Unmet Need**: "${currentOpp?.rootNeed}"

---

### 1. SAYS (Verbatim Quotes & Stated Frustrations)
${notes.filter(n => n.quadrant === 'says').map(n => `- ${n.text} (Source: ${n.author})`).join('\n')}

### 2. THINKS (Internal Monologue, Unspoken Fears & Assumptions)
${notes.filter(n => n.quadrant === 'thinks').map(n => `- ${n.text} (Source: ${n.author})`).join('\n')}

### 3. DOES (Observed Clumsy Workarounds & Inefficient Habits)
${notes.filter(n => n.quadrant === 'does').map(n => `- ${n.text} (Source: ${n.author})`).join('\n')}

### 4. FEELS (Emotional Friction, Frustration & Anxiety)
${notes.filter(n => n.quadrant === 'feels').map(n => `- ${n.text} (Source: ${n.author})`).join('\n')}

---

### 5. HOW MIGHT WE (HMW) IDEATION STATEMENTS
${notes.filter(n => n.quadrant === 'hmw').map(n => `- ${n.text} (By: ${n.author})`).join('\n')}
    `.trim();

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EmpathyMap_${currentOpp?.id || 'DesignThinking'}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#26292D] text-[#EDBF9B] text-xs font-semibold mb-2 border border-[#3C4044]">
            <Heart className="w-3.5 h-3.5 text-[#FD7B41]" />
            Design Thinking: Foundations, Empathy & Human-Centred Research
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#DDDCDB]">
            Empathy Map & HMW Ideation Canvas
          </h2>
          <p className="text-xs sm:text-sm text-[#DDDCDB]/70 mt-1 max-w-3xl">
            Map verbatim user voices to cognitive states, behavioral workarounds, and emotional friction to discover non-obvious innovation spaces.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Opportunity Selector Dropdown */}
          <select
            value={selectedOppId}
            onChange={(e) => setSelectedOppId(e.target.value)}
            className="bg-[#26292D] border border-[#3C4044] rounded-xl px-3 py-2 text-xs font-medium text-[#DDDCDB] focus:outline-none focus:border-[#FD7B41]"
          >
            {opportunities.map(opp => (
              <option key={opp.id} value={opp.id} className="bg-[#26292D]">
                {opp.title}
              </option>
            ))}
          </select>

          <button
            onClick={handleExportCanvas}
            className="px-3.5 py-2 rounded-xl bg-[#26292D] hover:bg-[#3C4044] text-[#FD7B41] border border-[#FD7B41]/30 text-xs font-bold flex items-center gap-1.5 transition-all shadow-glow-orange"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Canvas (.md)</span>
          </button>
        </div>
      </div>

      {/* Target Persona Focus Strip */}
      {currentOpp && (
        <div className="bg-[#26292D] border border-[#3C4044] rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-[#EDBF9B] font-semibold uppercase tracking-wider block">Studying Persona</span>
            <h3 className="font-editorial text-lg font-bold text-[#DDDCDB]">{currentOpp.targetPersona.role}</h3>
            <p className="text-xs text-[#DDDCDB]/70 mt-0.5">{currentOpp.targetPersona.context}</p>
          </div>
          <div className="bg-[#1B1D1F] px-4 py-2.5 rounded-xl border border-[#3C4044] text-xs">
            <span className="text-[#EDBF9B] font-bold block mb-0.5">Observed Workaround:</span>
            <span className="text-[#DDDCDB] italic">{currentOpp.targetPersona.currentWorkaround}</span>
          </div>
        </div>
      )}

      {/* 4 Quadrants Empathy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* SAYS */}
        <div className="bg-[#26292D] border border-[#3C4044] rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#3C4044]">
              <span className="text-xs font-bold text-[#FD7B41] uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#FD7B41]" />
                1. SAYS (Verbatim Expressions)
              </span>
              <span className="text-[11px] text-[#DDDCDB]/60">What the user literally states</span>
            </div>
            <div className="space-y-2.5 min-h-[140px]">
              {notes.filter(n => n.quadrant === 'says').map(n => (
                <div key={n.id} className="bg-[#1B1D1F] p-3 rounded-xl border border-[#3C4044] text-xs text-[#DDDCDB] flex items-start justify-between gap-2 group">
                  <p className="italic">{n.text}</p>
                  <button onClick={() => handleDeleteNote(n.id)} className="opacity-0 group-hover:opacity-100 text-[#DDDCDB]/40 hover:text-red-400 transition-opacity">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* THINKS */}
        <div className="bg-[#26292D] border border-[#3C4044] rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#3C4044]">
              <span className="text-xs font-bold text-[#EDBF9B] uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-[#EDBF9B]" />
                2. THINKS (Internal Assumptions)
              </span>
              <span className="text-[11px] text-[#DDDCDB]/60">Unspoken fears & calculations</span>
            </div>
            <div className="space-y-2.5 min-h-[140px]">
              {notes.filter(n => n.quadrant === 'thinks').map(n => (
                <div key={n.id} className="bg-[#1B1D1F] p-3 rounded-xl border border-[#3C4044] text-xs text-[#DDDCDB] flex items-start justify-between gap-2 group">
                  <p>{n.text}</p>
                  <button onClick={() => handleDeleteNote(n.id)} className="opacity-0 group-hover:opacity-100 text-[#DDDCDB]/40 hover:text-red-400 transition-opacity">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DOES */}
        <div className="bg-[#26292D] border border-[#3C4044] rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#3C4044]">
              <span className="text-xs font-bold text-[#DDDCDB] uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#DDDCDB]" />
                3. DOES (Behavioral Workarounds)
              </span>
              <span className="text-[11px] text-[#DDDCDB]/60">Observable actions & duct-tape fixes</span>
            </div>
            <div className="space-y-2.5 min-h-[140px]">
              {notes.filter(n => n.quadrant === 'does').map(n => (
                <div key={n.id} className="bg-[#1B1D1F] p-3 rounded-xl border border-[#3C4044] text-xs text-[#DDDCDB] flex items-start justify-between gap-2 group">
                  <p>{n.text}</p>
                  <button onClick={() => handleDeleteNote(n.id)} className="opacity-0 group-hover:opacity-100 text-[#DDDCDB]/40 hover:text-red-400 transition-opacity">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEELS */}
        <div className="bg-[#26292D] border border-[#3C4044] rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#3C4044]">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-400" />
                4. FEELS (Emotional Friction)
              </span>
              <span className="text-[11px] text-[#DDDCDB]/60">Stressors, anxiety & motivation</span>
            </div>
            <div className="space-y-2.5 min-h-[140px]">
              {notes.filter(n => n.quadrant === 'feels').map(n => (
                <div key={n.id} className="bg-[#1B1D1F] p-3 rounded-xl border border-red-500/20 text-xs text-[#DDDCDB] flex items-start justify-between gap-2 group">
                  <p>{n.text}</p>
                  <button onClick={() => handleDeleteNote(n.id)} className="opacity-0 group-hover:opacity-100 text-[#DDDCDB]/40 hover:text-red-400 transition-opacity">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HOW MIGHT WE (HMW) IDEATION ROW */}
      <div className="bg-[#26292D] border border-[#FD7B41]/40 rounded-2xl p-6 shadow-glow-orange space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#FD7B41] uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-[#FD7B41]" />
              Design Thinking Synthesis: "How Might We" (HMW) Ideation Board
            </span>
            <p className="text-xs text-[#DDDCDB]/70 mt-0.5">
              Reframing human pain points into actionable innovation opportunities for your MVP.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {notes.filter(n => n.quadrant === 'hmw').map(n => (
            <div key={n.id} className="bg-[#1B1D1F] p-4 rounded-xl border border-[#3C4044] text-xs text-[#DDDCDB] flex items-start justify-between gap-3 group">
              <div>
                <strong className="text-[#FD7B41] block mb-1">HMW Statement:</strong>
                <p className="font-medium text-sm leading-relaxed">{n.text}</p>
                <span className="text-[10px] text-[#EDBF9B] block mt-2">Added by: {n.author}</span>
              </div>
              <button onClick={() => handleDeleteNote(n.id)} className="opacity-0 group-hover:opacity-100 text-[#DDDCDB]/40 hover:text-red-400 transition-opacity">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Note Bar */}
        <form onSubmit={handleAddNote} className="pt-4 border-t border-[#3C4044] flex flex-col sm:flex-row gap-3">
          <select
            value={targetQuadrant}
            onChange={(e) => setTargetQuadrant(e.target.value as any)}
            className="bg-[#1B1D1F] border border-[#3C4044] rounded-xl px-3 py-2 text-xs text-[#DDDCDB] focus:outline-none focus:border-[#FD7B41]"
          >
            <option value="hmw">Category: HMW Statement</option>
            <option value="says">Category: Says (Quote)</option>
            <option value="thinks">Category: Thinks (Internal)</option>
            <option value="does">Category: Does (Workaround)</option>
            <option value="feels">Category: Feels (Emotional)</option>
          </select>

          <input
            type="text"
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Add an observation, user quote, or HMW hypothesis..."
            className="flex-1 bg-[#1B1D1F] border border-[#3C4044] rounded-xl px-4 py-2 text-xs text-[#DDDCDB] placeholder-[#DDDCDB]/40 focus:outline-none focus:border-[#FD7B41]"
          />

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[#FD7B41] text-[#1B1D1F] font-bold text-xs flex items-center justify-center gap-1.5 shadow-glow-orange hover:bg-[#FD7B41]/90"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Canvas</span>
          </button>
        </form>
      </div>
    </div>
  );
};
