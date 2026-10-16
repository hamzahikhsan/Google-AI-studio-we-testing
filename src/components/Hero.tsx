import React from 'react';
import { Play, ArrowRight, ShieldCheck, Terminal, Cpu } from 'lucide-react';

interface HeroProps {
  onExploreConsole: () => void;
  onOpenDeployModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreConsole, onOpenDeployModal }) => {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-cyan-500/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Subtitle / Context marker (clean unboxed text, no pills) */}
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-indigo-400 tracking-wide uppercase">
            <span>Next-Generation Cloud Orchestration</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Zero Cold-Start Architecture</span>
          </div>

          {/* Hero Headline with text-wrap: balance */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
            Intelligent cluster control for modern edge workloads
          </h1>

          {/* Concrete Value Proposition */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed [text-wrap:balance]">
            Unify global Kubernetes clusters, edge gateways, and container telemetry into a high-precision operations console with zero configuration debt.
          </p>

          {/* Action Callouts */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExploreConsole}
              className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/30 transition-all duration-200 active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Explore Live Console</span>
            </button>
            <button
              onClick={onOpenDeployModal}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg transition-all duration-200"
            >
              <Terminal className="w-4 h-4 text-slate-400" />
              <span>Quick Deployment</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Claim-to-Proof Metric Strip */}
        <div className="mt-16 sm:mt-20 max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm">
          <div className="space-y-1 border-r border-slate-800/60 last:border-r-0 pr-4">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              &lt; 12ms
            </div>
            <div className="text-xs text-slate-400 font-medium">P99 Edge Latency</div>
          </div>
          <div className="space-y-1 sm:border-r border-slate-800/60 pr-4">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              99.99%
            </div>
            <div className="text-xs text-slate-400 font-medium">Guaranteed SLA Uptime</div>
          </div>
          <div className="space-y-1 border-r border-slate-800/60 last:border-r-0 pr-4">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-cyan-400 tabular-nums">
              4.8M
            </div>
            <div className="text-xs text-slate-400 font-medium">Ingress Requests / Sec</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-emerald-400 tabular-nums">
              8 Regions
            </div>
            <div className="text-xs text-slate-400 font-medium">Active Mesh Zones</div>
          </div>
        </div>
      </div>
    </section>
  );
};
