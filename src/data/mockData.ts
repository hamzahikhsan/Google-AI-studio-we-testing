import { ClusterRecord, MetricCardData, PlatformCapability, DeploymentLog } from '../types';

export const INITIAL_CLUSTERS: ClusterRecord[] = [
  {
    id: 'cls-01',
    name: 'us-east-prod-primary',
    region: 'Virginia (us-east-1)',
    environment: 'Production',
    nodes: 48,
    cpuUsage: 64,
    memoryUsage: 72,
    throughput: '62.4k req/s',
    uptime: '99.99%',
    status: 'healthy',
    lastDeployed: '12m ago',
    version: 'v1.31.2',
    podCount: 384,
    description: 'High-availability primary Kubernetes cluster handling central API traffic and core billing pipelines.'
  },
  {
    id: 'cls-02',
    name: 'eu-west-edge-frankfurt',
    region: 'Frankfurt (eu-central-1)',
    environment: 'Production',
    nodes: 32,
    cpuUsage: 48,
    memoryUsage: 55,
    throughput: '38.1k req/s',
    uptime: '99.98%',
    status: 'healthy',
    lastDeployed: '45m ago',
    version: 'v1.31.2',
    podCount: 220,
    description: 'European low-latency regional edge mesh routing GDPR-compliant user workloads.'
  },
  {
    id: 'cls-03',
    name: 'ap-southeast-sg-core',
    region: 'Singapore (ap-southeast-1)',
    environment: 'Production',
    nodes: 24,
    cpuUsage: 89,
    memoryUsage: 91,
    throughput: '29.7k req/s',
    uptime: '99.94%',
    status: 'warning',
    lastDeployed: '2h ago',
    version: 'v1.30.8',
    podCount: 198,
    description: 'APAC gateway experiencing elevated memory pressure due to ongoing batch replication.'
  },
  {
    id: 'cls-04',
    name: 'us-west-gpu-training',
    region: 'Oregon (us-west-2)',
    environment: 'Staging',
    nodes: 16,
    cpuUsage: 31,
    memoryUsage: 40,
    throughput: '8.4k req/s',
    uptime: '99.95%',
    status: 'provisioning',
    lastDeployed: '5m ago',
    version: 'v1.31.2',
    podCount: 64,
    description: 'Ephemeral GPU cluster provisioning 8x H100 node pools for distributed embedding workflows.'
  },
  {
    id: 'cls-05',
    name: 'ap-northeast-tokyo-01',
    region: 'Tokyo (ap-northeast-1)',
    environment: 'Production',
    nodes: 28,
    cpuUsage: 52,
    memoryUsage: 61,
    throughput: '33.9k req/s',
    uptime: '99.99%',
    status: 'healthy',
    lastDeployed: '3h ago',
    version: 'v1.31.2',
    podCount: 212,
    description: 'North Asia edge cluster with direct interconnects to tier-1 internet exchanges.'
  },
  {
    id: 'cls-06',
    name: 'sa-east-sao-paulo',
    region: 'São Paulo (sa-east-1)',
    environment: 'Production',
    nodes: 18,
    cpuUsage: 41,
    memoryUsage: 49,
    throughput: '14.2k req/s',
    uptime: '99.97%',
    status: 'healthy',
    lastDeployed: '1d ago',
    version: 'v1.31.1',
    podCount: 130,
    description: 'South American routing pop and telemetry caching relay.'
  },
  {
    id: 'cls-07',
    name: 'us-central-analytics-stage',
    region: 'Iowa (us-central-1)',
    environment: 'Staging',
    nodes: 12,
    cpuUsage: 25,
    memoryUsage: 38,
    throughput: '4.8k req/s',
    uptime: '99.91%',
    status: 'healthy',
    lastDeployed: '6h ago',
    version: 'v1.31.0',
    podCount: 76,
    description: 'Pre-production staging cluster for distributed stream processing validations.'
  },
  {
    id: 'cls-08',
    name: 'eu-north-stockholm-mesh',
    region: 'Stockholm (eu-north-1)',
    environment: 'Edge',
    nodes: 14,
    cpuUsage: 35,
    memoryUsage: 44,
    throughput: '11.5k req/s',
    uptime: '99.99%',
    status: 'healthy',
    lastDeployed: '18h ago',
    version: 'v1.31.2',
    podCount: 94,
    description: 'Nordic carbon-neutral compute cluster running isolated micro-workloads.'
  }
];

export const SUMMARY_METRICS: MetricCardData[] = [
  {
    id: 'm1',
    title: 'Active Clusters',
    value: '24',
    unit: '/ 24 Online',
    change: '+3 this week',
    isPositive: true,
    sparkline: [18, 19, 21, 21, 22, 23, 24],
    secondaryText: 'Across 8 global cloud regions',
    iconName: 'server'
  },
  {
    id: 'm2',
    title: 'Ingress Throughput',
    value: '198.5k',
    unit: 'req/s',
    change: '+14.2% vs 24h ago',
    isPositive: true,
    sparkline: [142, 156, 168, 160, 175, 188, 198],
    secondaryText: 'Peak 242.0k req/s at 18:00 UTC',
    iconName: 'activity'
  },
  {
    id: 'm3',
    title: 'Global Avg CPU Load',
    value: '58.4%',
    unit: 'utilization',
    change: '-2.1% optimized',
    isPositive: true,
    sparkline: [68, 64, 66, 61, 59, 60, 58],
    secondaryText: 'Target capacity reserve 35%',
    iconName: 'cpu'
  },
  {
    id: 'm4',
    title: 'Security & Mesh Integrity',
    value: '100%',
    unit: 'mTLS Enforced',
    change: '0 active CVEs',
    isPositive: true,
    sparkline: [100, 100, 100, 100, 100, 100, 100],
    secondaryText: '3.4M telemetry events audited',
    iconName: 'shield-check'
  }
];

export const PLATFORM_CAPABILITIES: PlatformCapability[] = [
  {
    id: 'cap-1',
    title: 'Autonomous Edge Autoscaling',
    description: 'Dynamic node allocation responding to latency spikes in sub-50ms windows without operator intervention.',
    stat: '<12ms',
    statLabel: 'P99 Edge Latency',
    category: 'Infrastructure Engine'
  },
  {
    id: 'cap-2',
    title: 'Zero-Trust Cryptographic Mesh',
    description: 'Hardware-enforced attestation, automated short-lived certificate rotation, and unified egress firewalling.',
    stat: '100%',
    statLabel: 'mTLS Verification',
    category: 'Security Architecture'
  },
  {
    id: 'cap-3',
    title: 'Instant Rollbacks & Canary Routing',
    description: 'Deterministic traffic splitting with automated rollback if synthetic error budgets exceed threshold boundaries.',
    stat: '0.00s',
    statLabel: 'Deployment Downtime',
    category: 'Continuous Delivery'
  }
];

export const SAMPLE_LOGS: DeploymentLog[] = [
  {
    id: 'log-1',
    timestamp: '19:04:12',
    level: 'success',
    message: 'Pod replica scale-out completed. 8 new worker containers ready.'
  },
  {
    id: 'log-2',
    timestamp: '19:02:40',
    level: 'info',
    message: 'Ingress route syncer refreshed envoy filter table for revision v1.31.2.'
  },
  {
    id: 'log-3',
    timestamp: '18:59:15',
    level: 'warn',
    message: 'Memory threshold warning on node pool ap-southeast-node-04 (89% utilization).'
  },
  {
    id: 'log-4',
    timestamp: '18:52:03',
    level: 'info',
    message: 'TLS certificates renewed via Let\'s Encrypt vault integration.'
  },
  {
    id: 'log-5',
    timestamp: '18:45:21',
    level: 'success',
    message: 'Health probe audit passed: 384/384 endpoints reporting HTTP 200.'
  }
];
