import React, { useState } from 'react';
import { Copy, Check, Terminal, ArrowRight, Sparkles, Shield } from 'lucide-react';

export const InteractiveDeployment: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [region, setRegion] = useState('us-east-1');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const command = 'curl -sSL https://get.nexuscloud.io | sh -s -- --region=global';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid engineering or corporate email address.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <section id="deploy" className="py-20 border-t border-slate-800/80 scroll-mt-16 bg-[#080C14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/60 to-[#0B0F19] p-8 sm:p-12 overflow-hidden relative">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Proposition & Quick CLI */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                <span>Fast Initial Setup</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>3-Minute Integration</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Connect your first Kubernetes cluster in seconds
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                Install the lightweight NexusCloud agent operator. It discovers your namespace topology, configures mutual TLS certificates, and streams telemetry directly to your console.
              </p>

              {/* Terminal Copy Box */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400">Run in your terminal:</span>
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-[#06080F] font-mono text-xs text-slate-300">
                  <div className="flex items-center gap-2 overflow-x-auto">
                    <span className="text-indigo-400 select-none">$</span>
                    <span className="text-slate-200">{command}</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 ml-2"
                    title="Copy to clipboard"
                    aria-label="Copy terminal command"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Trust Indicators (unboxed text) */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-indigo-400" />
                  SOC2 Type II Certified
                </span>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <span>Self-Hosted or Fully Managed</span>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <span>No Credit Card Required</span>
              </div>
            </div>

            {/* Right Column: Deployment / Access Form */}
            <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Cluster Provisioning Token Dispatched</h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    We sent configuration keys and a verification link to <span className="font-mono text-indigo-400">{email}</span>. Your workspace sandbox is now live.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
                  >
                    Configure Another Workspace
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">Request Sandbox Access</h3>
                    <p className="text-xs text-slate-400">
                      Provision a sandbox cluster with pre-populated telemetry and sample traffic.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300 block">Work Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300 block">Company or Organization</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Technologies"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300 block">Primary Cloud Region</label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="us-east-1">US East (N. Virginia)</option>
                      <option value="eu-central-1">Europe (Frankfurt)</option>
                      <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                      <option value="sa-east-1">South America (São Paulo)</option>
                    </select>
                  </div>

                  {error && (
                    <div className="text-xs text-rose-400 font-medium">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/30 transition-all duration-200 active:scale-95"
                  >
                    <span>Deploy Free Sandbox</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
