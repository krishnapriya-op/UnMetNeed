import React, { useState } from 'react';
import { SemanticCluster } from '../types';
import { Layers, TrendingUp, AlertCircle, Network, Grid, Sparkles } from 'lucide-react';

interface ClusterVisualizerProps {
  clusters: SemanticCluster[];
  selectedClusterId: string | null;
  onSelectCluster: (clusterId: string | null) => void;
}

export const ClusterVisualizer: React.FC<ClusterVisualizerProps> = ({
  clusters,
  selectedClusterId,
  onSelectCluster,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'graph'>('grid');
  const [hoveredCluster, setHoveredCluster] = useState<SemanticCluster | null>(null);

  // Layout positions for the 2D Semantic Node Graph
  const nodePositions = [
    { x: 200, y: 150 },
    { x: 500, y: 120 },
    { x: 800, y: 170 },
    { x: 250, y: 350 },
    { x: 550, y: 380 },
    { x: 820, y: 360 },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#26292D] text-[#EDBF9B] text-xs font-semibold mb-2 border border-[#3C4044]">
            <Layers className="w-3.5 h-3.5 text-[#FD7B41]" />
            Objective 1: NLP Semantic Similarity & Root-Cause Clustering
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#DDDCDB]">
            Semantic Problem Clusters
          </h2>
          <p className="text-xs sm:text-sm text-[#DDDCDB]/70 mt-1 max-w-2xl">
            Unfiltered complaints that vary wildly in vocabulary are embedded into vector space and clustered into semantic centroids to isolate the single core unmet need.
          </p>
        </div>

        {/* View Mode Toggle & Filter Clear */}
        <div className="flex items-center gap-3">
          <div className="bg-[#26292D] p-1 rounded-xl border border-[#3C4044] flex items-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#3C4044] text-[#FD7B41] shadow-sm'
                  : 'text-[#DDDCDB]/70 hover:text-[#DDDCDB]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('graph')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'graph'
                  ? 'bg-[#3C4044] text-[#FD7B41] shadow-sm'
                  : 'text-[#DDDCDB]/70 hover:text-[#DDDCDB]'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>2D Semantic Graph</span>
            </button>
          </div>

          {selectedClusterId && (
            <button
              onClick={() => onSelectCluster(null)}
              className="px-3.5 py-1.5 rounded-lg bg-[#FD7B41] text-[#1B1D1F] text-xs font-bold shadow-glow-orange hover:bg-[#FD7B41]/90 transition-colors"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: 2D INTERACTIVE SEMANTIC VECTOR GRAPH */}
      {viewMode === 'graph' && (
        <div className="bg-[#26292D] border border-[#3C4044] rounded-2xl p-6 relative overflow-hidden shadow-glow-dark">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-[#EDBF9B] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FD7B41]" />
              NLP Vector Centroid Projections (Hover or Click any Centroid Node)
            </span>
            <span className="text-[11px] text-[#DDDCDB]/50">Distance = Semantic Divergence</span>
          </div>

          <div className="relative w-full h-[500px] bg-[#1B1D1F] rounded-xl border border-[#3C4044] overflow-hidden flex items-center justify-center">
            {/* Subtle Coordinate Grid Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EDBF9B" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* SVG Connecting Vectors */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {clusters.map((_, i) => {
                const start = nodePositions[i % nodePositions.length];
                const next = nodePositions[(i + 1) % nodePositions.length];
                return (
                  <line
                    key={`line-${i}`}
                    x1={`${(start.x / 1000) * 100}%`}
                    y1={`${(start.y / 500) * 100}%`}
                    x2={`${(next.x / 1000) * 100}%`}
                    y2={`${(next.y / 500) * 100}%`}
                    stroke="rgba(253, 123, 65, 0.2)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                );
              })}
            </svg>

            {/* Interactive Cluster Nodes */}
            {clusters.map((cluster, idx) => {
              const pos = nodePositions[idx % nodePositions.length];
              const isSelected = selectedClusterId === cluster.id;
              const radius = 28 + Math.min(20, cluster.signalCount / 8);

              return (
                <div
                  key={cluster.id}
                  onClick={() => onSelectCluster(isSelected ? null : cluster.id)}
                  onMouseEnter={() => setHoveredCluster(cluster)}
                  onMouseLeave={() => setHoveredCluster(null)}
                  style={{
                    left: `${(pos.x / 1000) * 100}%`,
                    top: `${(pos.y / 500) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className={`absolute cursor-pointer transition-all duration-300 flex flex-col items-center group z-10`}
                >
                  {/* Outer Glowing Ring */}
                  <div
                    style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
                    className={`rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#FD7B41] text-[#1B1D1F] shadow-glow-orange scale-110'
                        : 'bg-[#26292D] text-[#DDDCDB] border-2 border-[#FD7B41]/50 hover:border-[#FD7B41] hover:scale-105'
                    }`}
                  >
                    <div className="text-center px-1">
                      <span className="text-[11px] font-bold block leading-none font-mono">
                        {cluster.signalCount}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider block opacity-75">signals</span>
                    </div>
                  </div>

                  {/* Node Label */}
                  <span className={`text-[11px] font-semibold mt-2 px-2.5 py-0.5 rounded-full whitespace-nowrap border transition-all ${
                    isSelected
                      ? 'bg-[#FD7B41] text-[#1B1D1F] border-[#FD7B41]'
                      : 'bg-[#26292D]/90 text-[#DDDCDB] border-[#3C4044] group-hover:border-[#FD7B41]/60'
                  }`}>
                    {cluster.sector}
                  </span>
                </div>
              );
            })}

            {/* Hover Inspector Tooltip Overlay */}
            {hoveredCluster && (
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-[#26292D]/95 border border-[#FD7B41]/60 p-4 rounded-xl shadow-glow-dark backdrop-blur-md z-30 pointer-events-none animate-fadeIn">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-[#FD7B41]">{hoveredCluster.sector}</span>
                  <span className="text-[10px] text-red-300 font-mono">Friction: {hoveredCluster.averageFrustration}/10</span>
                </div>
                <h4 className="font-editorial text-sm font-bold text-[#DDDCDB] mb-1">{hoveredCluster.title}</h4>
                <p className="text-xs text-[#DDDCDB]/70 italic mb-2">"{hoveredCluster.rootNeed}"</p>
                <div className="flex items-center justify-between text-[11px] text-[#EDBF9B]">
                  <span>Velocity: +{hoveredCluster.growthVelocityPercent}% YoY</span>
                  <span className="text-[#FD7B41] font-semibold">Click to filter opportunities →</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: CARDS GRID */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clusters.map((cluster) => {
            const isSelected = selectedClusterId === cluster.id;
            return (
              <div
                key={cluster.id}
                onClick={() => onSelectCluster(isSelected ? null : cluster.id)}
                className={`rounded-2xl p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#26292D] border-[#FD7B41] shadow-glow-orange scale-[1.02]'
                    : 'bg-[#26292D] hover:bg-[#2F3338] border-[#3C4044] hover:border-[#FD7B41]/40'
                }`}
              >
                <div>
                  {/* Sector and Velocity Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-[#1B1D1F] text-[#EDBF9B] border border-[#3C4044]">
                      {cluster.sector}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#FD7B41] bg-[#1B1D1F] px-2 py-0.5 rounded border border-[#FD7B41]/30">
                      <TrendingUp className="w-3 h-3" />
                      +{cluster.growthVelocityPercent}% YoY
                    </div>
                  </div>

                  {/* Cluster Title */}
                  <h3 className="font-editorial text-base font-bold text-[#DDDCDB] mb-2 leading-snug">
                    {cluster.title}
                  </h3>

                  {/* Underlying Root Need */}
                  <p className="text-xs text-[#DDDCDB]/70 italic mb-4 line-clamp-3 bg-[#1B1D1F] p-2.5 rounded-lg border-l-2 border-[#FD7B41]">
                    "{cluster.rootNeed}"
                  </p>

                  {/* Keywords Cloud */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cluster.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[#1B1D1F] text-[#DDDCDB]/60 border border-[#3C4044]"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats Footer */}
                <div className="pt-3 border-t border-[#3C4044] flex items-center justify-between text-xs">
                  <span className="text-[#DDDCDB]/60">
                    Signals Ingested: <strong className="text-[#DDDCDB]">{cluster.signalCount}</strong>
                  </span>

                  <div className="flex items-center gap-1 text-red-300 font-mono text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Pain: {cluster.averageFrustration}/10</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
