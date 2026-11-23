import React from 'react';
import { SemanticCluster } from '../types';
import { Layers, TrendingUp, AlertCircle } from 'lucide-react';

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
            Unfiltered complaints that vary wildly in phrasing are embedded and grouped into semantic centroids to expose the single core unmet need.
          </p>
        </div>

        {selectedClusterId && (
          <button
            onClick={() => onSelectCluster(null)}
            className="px-3.5 py-1.5 rounded-lg bg-[#FD7B41] text-[#1B1D1F] text-xs font-bold shadow-glow-orange hover:bg-[#FD7B41]/90 transition-colors"
          >
            Clear Filter (Show All)
          </button>
        )}
      </div>

      {/* Cluster Grid */}
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
    </div>
  );
};
