import React, { useState, useMemo } from 'react';
import {
  Server,
  Cpu,
  Activity,
  ShieldCheck,
  Search,
  Filter,
  ArrowUpDown,
  RefreshCw,
  Plus,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  ExternalLink,
  Layers,
  Globe,
  Settings,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles
} from 'lucide-react';
import { ClusterRecord, ClusterStatus, ConsoleTab } from '../types';
import { INITIAL_CLUSTERS, SUMMARY_METRICS, SAMPLE_LOGS } from '../data/mockData';

export const ConsoleShowcase: React.FC = () => {
  // Navigation & layout state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<ConsoleTab>('clusters');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Table filtering and sorting state
  const [clusters, setClusters] = useState<ClusterRecord[]>(INITIAL_CLUSTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ClusterStatus>('all');
  const [sortField, setSortField] = useState<keyof ClusterRecord>('name');
  const [sortAsc, setSortAsc] = useState(true);

  // Inspection Drawer state
  const [selectedCluster, setSelectedCluster] = useState<ClusterRecord | null>(null);

  // Quick Action notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Cluster states synchronized across all 8 regions');
    }, 600);
  };

  const handleRestartCluster = (cluster: ClusterRecord, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    showToast(`Initiated rolling restart for ${cluster.name}`);
  };

  const handleScaleCluster = (clusterId: string, delta: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setClusters(prev =>
      prev.map(c => {
        if (c.id === clusterId) {
          const newNodes = Math.max(2, c.nodes + delta);
          return {
            ...c,
            nodes: newNodes,
            podCount: Math.round(newNodes * 8),
            lastDeployed: 'Just now'
          };
        }
        return c;
      })
    );
    if (selectedCluster && selectedCluster.id === clusterId) {
      setSelectedCluster(prev => prev ? {
        ...prev,
        nodes: Math.max(2, prev.nodes + delta),
        podCount: Math.round(Math.max(2, prev.nodes + delta) * 8),
        lastDeployed: 'Just now'
      } : null);
    }
    showToast(`Node capacity adjusted for cluster`);
  };

  // Filtered and sorted cluster records
  const filteredClusters = useMemo(() => {
    return clusters
      .filter(item => {
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.environment.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortAsc ? valA - valB : valB - valA;
        }
        return 0;
      });
  }, [clusters, searchQuery, statusFilter, sortField, sortAsc]);

  const handleSort = (field: keyof ClusterRecord) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <section id="console-section" className="relative py-12 md:py-16 scroll-mt-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              <span>Interactive Operations Console</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Live Demonstration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Global Cluster Fleet & Telemetry
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Try toggling the sidebar, filtering statuses, or inspecting cluster nodes.
            </span>
          </div>
        </div>

        {/* The Console Shell Container */}
        <div className="relative rounded-2xl border border-slate-800 bg-[#0B0F19] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[720px]">
          {/* 1. COLLAPSIBLE SIDEBAR */}
          <aside
            className={`transition-all duration-300 ease-in-out border-b md:border-b-0 md:border-r border-slate-800 bg-[#090D17] flex flex-col shrink-0 ${
              sidebarCollapsed ? 'md:w-16 w-full' : 'md:w-64 w-full'
            }`}
          >
            {/* Sidebar Top: Workspace Switcher & Collapse Toggle */}
            <div className="h-14 px-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                {!sidebarCollapsed && (
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-white truncate">Acme Infrastructure</span>
                    <span className="text-[10px] text-slate-400 truncate">us-east-prod</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden md:flex p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                aria-label="Toggle sidebar width"
              >
                {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

            {/* Sidebar Navigation Items */}
            <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
              {[
                { id: 'overview', label: 'Overview', icon: Activity },
                { id: 'clusters', label: 'Clusters', icon: Server, badge: clusters.length },
                { id: 'deployments', label: 'Deployments', icon: Terminal },
                { id: 'ingress', label: 'Ingress & DNS', icon: Globe },
                { id: 'security', label: 'Security & mTLS', icon: ShieldCheck },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as ConsoleTab);
                      showToast(`Switched view to ${item.label}`);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-600/15 text-indigo-400 font-semibold border border-indigo-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    {!sidebarCollapsed && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}
                    {!sidebarCollapsed && item.badge !== undefined && (
                      <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Sidebar Footer User Session */}
            <div className="p-3 border-t border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white shrink-0">
                  HZ
                </div>
                {!sidebarCollapsed && (
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-medium text-slate-200 truncate">hamzah@acme.io</span>
                    <span className="text-[10px] text-emerald-400">Owner · Verified</span>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* 2. MAIN WORKSPACE VIEWPORT */}
          <main className="flex-1 flex flex-col min-w-0 bg-[#0B0F19]">
            {/* Console Breadcrumb Header & Action Bar */}
            <header className="h-14 px-4 sm:px-6 flex items-center justify-between gap-4 border-b border-slate-800 bg-[#0B0F19]/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs text-slate-400 truncate">
                <span className="hover:text-slate-200 cursor-pointer">Workspaces</span>
                <span>/</span>
                <span className="hover:text-slate-200 cursor-pointer">Production</span>
                <span>/</span>
                <span className="text-white font-medium capitalize">{activeTab}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Synchronize cluster telemetry"
                  aria-label="Refresh telemetry data"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
                </button>
                <button
                  onClick={() => {
                    const newId = `cls-0${clusters.length + 1}`;
                    const newCluster: ClusterRecord = {
                      id: newId,
                      name: `cloud-edge-${newId}`,
                      region: 'Sydney (ap-southeast-2)',
                      environment: 'Edge',
                      nodes: 8,
                      cpuUsage: 18,
                      memoryUsage: 24,
                      throughput: '3.2k req/s',
                      uptime: '99.99%',
                      status: 'provisioning',
                      lastDeployed: 'Just now',
                      version: 'v1.31.2',
                      podCount: 64,
                      description: 'Newly provisioned edge cluster running ingress proxies.'
                    };
                    setClusters([newCluster, ...clusters]);
                    showToast('Provisioned new edge cluster: cloud-edge-' + newId);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors active:scale-95 whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Provision Node</span>
                </button>
              </div>
            </header>

            {/* Notification Toast */}
            {toastMessage && (
              <div className="bg-indigo-950/80 border-b border-indigo-500/30 px-4 py-2 flex items-center justify-between text-xs text-indigo-200 transition-all">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>{toastMessage}</span>
                </div>
                <button onClick={() => setToastMessage(null)} className="text-indigo-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="p-4 sm:p-6 space-y-6 flex-1 overflow-y-auto">
              {/* TELEMETRY SUMMARY METRICS STRIP */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SUMMARY_METRICS.map((metric) => {
                  return (
                    <div
                      key={metric.id}
                      className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700/80 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-400">{metric.title}</span>
                        <div className="w-7 h-7 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-300">
                          {metric.iconName === 'server' && <Server className="w-3.5 h-3.5 text-indigo-400" />}
                          {metric.iconName === 'activity' && <Activity className="w-3.5 h-3.5 text-cyan-400" />}
                          {metric.iconName === 'cpu' && <Cpu className="w-3.5 h-3.5 text-emerald-400" />}
                          {metric.iconName === 'shield-check' && <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />}
                        </div>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">
                          {metric.value}
                        </span>
                        {metric.unit && (
                          <span className="text-xs text-slate-400 font-medium">{metric.unit}</span>
                        )}
                      </div>

                      {/* Sparkline & Delta indicator */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs">
                        <span className="text-[11px] font-medium text-emerald-400 font-mono tabular-nums">
                          {metric.change}
                        </span>
                        <div className="w-20 h-5 flex items-end gap-1">
                          {metric.sparkline.map((val, idx) => {
                            const max = Math.max(...metric.sparkline);
                            const min = Math.min(...metric.sparkline);
                            const heightPct = Math.max(20, ((val - min) / (max - min || 1)) * 100);
                            return (
                              <div
                                key={idx}
                                className="flex-1 bg-indigo-500/40 rounded-t-sm"
                                style={{ height: `${heightPct}%` }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SEARCH & FILTER CONTROLS */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                {/* Status Segmented Buttons */}
                <div className="flex items-center p-1 rounded-lg bg-slate-900 border border-slate-800 overflow-x-auto">
                  {(['all', 'healthy', 'warning', 'provisioning'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors whitespace-nowrap shrink-0 ${
                        statusFilter === st
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {st === 'all' ? 'All Clusters' : st}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter by name, region..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* HIGH-DENSITY OPERATIONAL DATA TABLE */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-semibold text-slate-400 tracking-wider">
                        <th
                          onClick={() => handleSort('name')}
                          className="py-3 px-4 cursor-pointer hover:text-slate-200 select-none whitespace-nowrap"
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Cluster Name</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th
                          onClick={() => handleSort('region')}
                          className="py-3 px-4 cursor-pointer hover:text-slate-200 select-none whitespace-nowrap"
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Region</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th
                          onClick={() => handleSort('nodes')}
                          className="py-3 px-4 cursor-pointer hover:text-slate-200 select-none whitespace-nowrap text-right"
                        >
                          <div className="flex items-center justify-end gap-1.5">
                            <span>Nodes</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th className="py-3 px-4 whitespace-nowrap">Load (CPU / RAM)</th>
                        <th className="py-3 px-4 whitespace-nowrap">Throughput</th>
                        <th className="py-3 px-4 whitespace-nowrap">Status</th>
                        <th className="py-3 px-4 whitespace-nowrap">Last Synced</th>
                        <th className="py-3 px-4 text-right whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs">
                      {filteredClusters.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-slate-400">
                            <Server className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                            <p className="font-medium text-slate-300">No clusters match your criteria</p>
                            <p className="text-xs text-slate-500 mt-1">Try clearing search filters or add a new node.</p>
                          </td>
                        </tr>
                      ) : (
                        filteredClusters.map((cluster) => {
                          const isSelected = selectedCluster?.id === cluster.id;
                          return (
                            <tr
                              key={cluster.id}
                              onClick={() => setSelectedCluster(cluster)}
                              className={`cursor-pointer transition-colors ${
                                isSelected
                                  ? 'bg-indigo-600/10'
                                  : 'hover:bg-slate-800/40'
                              }`}
                            >
                              {/* Name & Env */}
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      cluster.status === 'healthy'
                                        ? 'bg-emerald-500'
                                        : cluster.status === 'warning'
                                        ? 'bg-amber-500'
                                        : 'bg-indigo-400'
                                    }`}
                                  />
                                  <div className="font-semibold text-slate-200 hover:text-white truncate max-w-[180px]">
                                    {cluster.name}
                                  </div>
                                </div>
                              </td>

                              {/* Region */}
                              <td className="py-3.5 px-4 text-slate-400 truncate max-w-[170px]">
                                {cluster.region}
                              </td>

                              {/* Nodes count */}
                              <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-300">
                                {cluster.nodes}
                              </td>

                              {/* CPU / RAM utilization bar */}
                              <td className="py-3.5 px-4">
                                <div className="space-y-1 w-32">
                                  <div className="flex justify-between text-[10px] text-slate-400 font-mono tabular-nums">
                                    <span>CPU {cluster.cpuUsage}%</span>
                                    <span>RAM {cluster.memoryUsage}%</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                                    <div
                                      className={`h-full ${
                                        cluster.cpuUsage > 80
                                          ? 'bg-amber-500'
                                          : 'bg-indigo-500'
                                      }`}
                                      style={{ width: `${cluster.cpuUsage}%` }}
                                    />
                                  </div>
                                </div>
                              </td>

                              {/* Throughput */}
                              <td className="py-3.5 px-4 font-mono tabular-nums text-slate-300">
                                {cluster.throughput}
                              </td>

                              {/* Status */}
                              <td className="py-3.5 px-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 text-[11px] font-medium capitalize ${
                                    cluster.status === 'healthy'
                                      ? 'text-emerald-400'
                                      : cluster.status === 'warning'
                                      ? 'text-amber-400'
                                      : 'text-indigo-400'
                                  }`}
                                >
                                  {cluster.status === 'healthy' && <CheckCircle2 className="w-3.5 h-3.5" />}
                                  {cluster.status === 'warning' && <AlertTriangle className="w-3.5 h-3.5" />}
                                  {cluster.status === 'provisioning' && <Clock className="w-3.5 h-3.5" />}
                                  <span>{cluster.status}</span>
                                </span>
                              </td>

                              {/* Last Deployed */}
                              <td className="py-3.5 px-4 text-slate-400 text-xs">
                                {cluster.lastDeployed}
                              </td>

                              {/* Quick Actions */}
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    onClick={() => handleScaleCluster(cluster.id, 2)}
                                    className="px-2 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded transition-colors"
                                    title="Add 2 nodes"
                                  >
                                    +2 Nodes
                                  </button>
                                  <button
                                    onClick={() => setSelectedCluster(cluster)}
                                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                    title="Inspect cluster details"
                                  >
                                    <SlidersHorizontal className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer */}
                <div className="py-2.5 px-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>
                    Showing {filteredClusters.length} of {clusters.length} total clusters
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-400">All regional meshes healthy</span>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* 3. ROW INSPECTOR SLIDE-OVER DRAWER */}
          {selectedCluster && (
            <div className="absolute inset-y-0 right-0 w-full md:w-[420px] bg-[#0A0E1A] border-l border-slate-800 shadow-2xl flex flex-col z-30 transition-transform">
              {/* Drawer Header */}
              <div className="h-14 px-5 flex items-center justify-between border-b border-slate-800 bg-slate-900/60">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-bold text-sm text-white truncate">
                    {selectedCluster.name}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCluster(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close detail drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-5 space-y-6 flex-1 overflow-y-auto text-xs">
                {/* Description */}
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Role & Overview
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedCluster.description}
                  </p>
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/40 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Region</span>
                    <span className="text-slate-200">{selectedCluster.region.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Kubernetes</span>
                    <span className="text-slate-200">{selectedCluster.version}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Active Pods</span>
                    <span className="text-slate-200">{selectedCluster.podCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Uptime SLA</span>
                    <span className="text-emerald-400">{selectedCluster.uptime}</span>
                  </div>
                </div>

                {/* Node Capacity Management */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Node Pool Allocation
                    </span>
                    <span className="font-mono text-slate-200">{selectedCluster.nodes} Worker Nodes</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleScaleCluster(selectedCluster.id, -2)}
                      className="flex-1 py-1.5 px-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
                    >
                      -2 Nodes
                    </button>
                    <button
                      onClick={() => handleScaleCluster(selectedCluster.id, 2)}
                      className="flex-1 py-1.5 px-3 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
                    >
                      +2 Nodes
                    </button>
                  </div>
                </div>

                {/* Recent Event Logs */}
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Live Event Stream
                  </div>
                  <div className="space-y-2 font-mono text-[11px]">
                    {SAMPLE_LOGS.map((log) => (
                      <div
                        key={log.id}
                        className="p-2 rounded bg-slate-900 border border-slate-800/80 space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <span>{log.timestamp}</span>
                          <span
                            className={`capitalize ${
                              log.level === 'success'
                                ? 'text-emerald-400'
                                : log.level === 'warn'
                                ? 'text-amber-400'
                                : 'text-indigo-400'
                            }`}
                          >
                            {log.level}
                          </span>
                        </div>
                        <p className="text-slate-300 font-sans text-xs">{log.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex gap-2">
                <button
                  onClick={() => handleRestartCluster(selectedCluster)}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Restart Cluster
                </button>
                <button
                  onClick={() => {
                    showToast(`Telemetry logs exported for ${selectedCluster.name}`);
                  }}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                >
                  Export Logs
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
