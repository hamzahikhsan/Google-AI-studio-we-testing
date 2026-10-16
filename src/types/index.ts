export type ClusterStatus = 'healthy' | 'warning' | 'provisioning' | 'offline';

export interface ClusterRecord {
  id: string;
  name: string;
  region: string;
  environment: 'Production' | 'Staging' | 'Edge';
  nodes: number;
  cpuUsage: number; // 0 - 100
  memoryUsage: number; // 0 - 100
  throughput: string;
  uptime: string;
  status: ClusterStatus;
  lastDeployed: string;
  version: string;
  podCount: number;
  description: string;
}

export interface MetricCardData {
  id: string;
  title: string;
  value: string;
  unit?: string;
  change: string;
  isPositive: boolean;
  sparkline: number[];
  secondaryText: string;
  iconName: 'server' | 'cpu' | 'activity' | 'shield-check';
}

export type ConsoleTab = 'overview' | 'clusters' | 'deployments' | 'ingress' | 'security' | 'settings';

export interface DeploymentLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'success' | 'error';
  message: string;
}

export interface PlatformCapability {
  id: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  category: string;
}
