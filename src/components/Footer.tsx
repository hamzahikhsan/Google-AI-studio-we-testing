import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#060910] text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5 text-base font-bold text-white tracking-tight">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                <div className="w-2.5 h-2.5 border-2 border-white rounded-sm rotate-45" />
              </div>
              <span>NexusCloud</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Autonomous cluster orchestration, low-latency edge routing, and continuous delivery for distributed cloud workloads.
            </p>
          </div>

          {/* Product links */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-slate-200 tracking-wider uppercase">Product</div>
            <ul className="space-y-2">
              <li><a href="#console-section" className="hover:text-white transition-colors">Operations Console</a></li>
              <li><a href="#capabilities" className="hover:text-white transition-colors">Edge Autoscaling</a></li>
              <li><a href="#capabilities" className="hover:text-white transition-colors">Zero-Trust Mesh</a></li>
              <li><a href="#deploy" className="hover:text-white transition-colors">Canary Routing</a></li>
            </ul>
          </div>

          {/* Resources links */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-slate-200 tracking-wider uppercase">Resources</div>
            <ul className="space-y-2">
              <li><a href="#docs" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#docs" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#deploy" className="hover:text-white transition-colors">CLI Toolchain</a></li>
              <li><a href="#docs" className="hover:text-white transition-colors">Release Notes</a></li>
            </ul>
          </div>

          {/* Compliance & Trust */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-slate-200 tracking-wider uppercase">Trust & Legal</div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Whitepaper</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SOC2 Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} NexusCloud Technologies, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Status: All Systems Operational</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Center</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
