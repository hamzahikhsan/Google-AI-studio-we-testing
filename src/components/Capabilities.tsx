import React, { useState } from 'react';
import { Zap, ShieldCheck, GitBranch, RefreshCw, Check } from 'lucide-react';
import { PLATFORM_CAPABILITIES } from '../data/mockData';

export const Capabilities: React.FC = () => {
  // Interactive widget state
  const [canaryTraffic, setCanaryTraffic] = useState(15);
  const [mtlsEnforced, setMtlsEnforced] = useState(true);
  const [simulatedRollback, setSimulatedRollback] = useState(false);

  const handleTriggerRollback = () => {
    setSimulatedRollback(true);
    setCanaryTraffic(0);
    setTimeout(() => {
      setSimulatedRollback(false);
    }, 2500);
  };

  return (
    <section id="capabilities" className="py-20 border-t border-slate-800/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
            <span>Architectural Capabilities</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Production Proven</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Engineered for zero-loss failover and sub-millisecond edge routing
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Eliminate operational toil with an infrastructure fabric designed to automatically detect partition faults, re-route ingress requests, and enforce cryptographic zero-trust at every hop.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Canary Deployments & Traffic Splitting */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-[#0B0F19] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span>Continuous Delivery</span>
                <span aria-hidden="true">·</span>
                <span className="text-cyan-400 font-mono">Zero-Downtime Pipeline</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Canary Traffic Routing & Automated Rollback
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Gradually migrate live production traffic between releases. If synthetic latency anomalies or error rates exceed your SLO thresholds, traffic reverts instantly to the golden revision.
              </p>
            </div>

            {/* Interactive Traffic Splitter Widget */}
            <div className="p-5 rounded-xl border border-slate-800/80 bg-slate-900/60 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Live Traffic Allocation</span>
                <div className="flex items-center gap-3 font-mono tabular-nums text-xs">
                  <span className="text-slate-400">Stable v1.31: {100 - canaryTraffic}%</span>
                  <span className="text-indigo-400 font-bold">Canary v1.32: {canaryTraffic}%</span>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={canaryTraffic}
                  onChange={(e) => setCanaryTraffic(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>0% (Shadow mode)</span>
                  <span>25% (Controlled Canary)</span>
                  <span>50% (Equal Split)</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-slate-300">
                    {simulatedRollback ? 'Rollback in progress...' : 'Error budget 100% nominal'}
                  </span>
                </div>
                <button
                  onClick={handleTriggerRollback}
                  disabled={simulatedRollback || canaryTraffic === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${simulatedRollback ? 'animate-spin' : ''}`} />
                  <span>Simulate Instant Rollback</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Zero-Trust Cryptographic Mesh */}
          <div className="rounded-2xl border border-slate-800 bg-[#0B0F19] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span>Security Fabric</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-mono">mTLS 1.3</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Zero-Trust Service Mesh
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Hardware-backed cryptographic identity for every pod, automated ephemeral TLS certificate rotation, and unified egress guardrails.
              </p>
            </div>

            {/* Interactive Mesh Toggle */}
            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-200">Strict mTLS Enforcement</span>
                <button
                  onClick={() => setMtlsEnforced(!mtlsEnforced)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    mtlsEnforced ? 'bg-indigo-600' : 'bg-slate-700'
                  }`}
                  aria-label="Toggle strict mTLS"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      mtlsEnforced ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>SPIFFE/SPIRE Identity Attestation</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Sub-24h Certificate Lifecycles</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Autonomous Edge Autoscaling */}
          <div className="lg:col-span-3 rounded-2xl border border-slate-800 bg-[#0B0F19] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span>Latency Optimization</span>
                <span aria-hidden="true">·</span>
                <span className="text-indigo-400 font-mono">Global Anycast</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Autonomous Regional Edge Autoscaling
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                NexusCloud continuously measures regional latency variance, auto-spinning up node pools closer to client clusters before traffic spikes cause queue saturation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 min-w-[140px] text-center">
                <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">48ms</div>
                <div className="text-[11px] text-slate-400 mt-1">Scale-Up Velocity</div>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 min-w-[140px] text-center">
                <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">0</div>
                <div className="text-[11px] text-slate-400 mt-1">Cold Starts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
