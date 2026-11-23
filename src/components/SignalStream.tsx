import React, { useState } from 'react';
import { RawSignal, SignalSource } from '../types';
import { Radio, ExternalLink, Flame, Copy, Check } from 'lucide-react';

interface SignalStreamProps {
  signals: RawSignal[];
}

export const SignalStream: React.FC<SignalStreamProps> = ({ signals }) => {
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sources: ('All' | SignalSource)[] = ['All', 'Reddit', 'G2', 'Trustpilot', 'Twitter/X', 'Research Paper', 'ProductHunt'];

  const filteredSignals = selectedSource === 'All'
    ? signals
    : signals.filter(s => s.source === selectedSource);

  const handleCopyQuote = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#26292D] text-[#EDBF9B] text-xs font-semibold mb-2 border border-[#3C4044]">
            <Radio className="w-3.5 h-3.5 text-[#FD7B41] animate-pulse" />
            Objective 2: Multi-Source Internet Signal Ingestion
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#DDDCDB]">
            Live Public Discussion Feed
          </h2>
          <p className="text-xs sm:text-sm text-[#DDDCDB]/70 mt-1 max-w-2xl">
            Real customer complaints, forum threads, negative review rants, and research publication pain points analyzed by the NLP engine.
          </p>
        </div>

        {/* Source Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#26292D] p-1.5 rounded-xl border border-[#3C4044]">
          {sources.map((src) => (
            <button
              key={src}
              onClick={() => setSelectedSource(src)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedSource === src
                  ? 'bg-[#FD7B41] text-[#1B1D1F] font-bold shadow-glow-orange'
                  : 'text-[#DDDCDB]/70 hover:text-[#DDDCDB]'
              }`}
            >
              {src}
            </button>
          ))}
        </div>
      </div>

      {/* Signals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSignals.map((signal) => (
          <div
            key={signal.id}
            className="bg-[#26292D] border border-[#3C4044] rounded-2xl p-5 hover:border-[#FD7B41]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#1B1D1F] text-[#FD7B41] border border-[#3C4044]">
                    {signal.source}
                  </span>
                  <span className="text-xs text-[#DDDCDB]/60 truncate max-w-[150px]">{signal.author}</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-red-300 bg-red-950/40 px-2 py-0.5 rounded border border-red-500/20">
                  <Flame className="w-3 h-3 text-red-400" />
                  <span>Friction: {signal.frustrationLevel}/10</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#DDDCDB] leading-relaxed mb-4 italic">
                "{signal.content}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#3C4044] flex items-center justify-between text-xs text-[#DDDCDB]/60">
              <span className="text-[11px]">{signal.timestamp} • {signal.sector}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyQuote(signal.id, signal.content)}
                  className="p-1 rounded bg-[#1B1D1F] hover:bg-[#3C4044] text-[#DDDCDB]/70 hover:text-[#DDDCDB] transition-colors"
                  title="Copy quote"
                >
                  {copiedId === signal.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>

                {signal.sourceUrl && (
                  <a
                    href={signal.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded bg-[#1B1D1F] hover:bg-[#3C4044] text-[#FD7B41] transition-colors"
                    title="Open original thread"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
