export const chartDataByTimeframe = {
    '7D': {
      total: '$418,900',
      growth: '+19.4%',
      bars: [48, 62, 55, 74, 68, 86, 95],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    '30D': {
      total: '$1,842,500',
      growth: '+32.8%',
      bars: [42, 51, 49, 64, 71, 68, 82, 79, 91, 98],
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10']
    },
    '90D': {
      total: '$5,390,200',
      growth: '+64.2%',
      bars: [35, 44, 52, 58, 63, 72, 81, 88, 96],
      labels: ['M1.1', 'M1.2', 'M1.3', 'M2.1', 'M2.2', 'M2.3', 'M3.1', 'M3.2', 'M3.3']
    }
  };

export const stackIntegrations = [
    { name: 'Slack', latency: '12ms sync', color: 'from-pink-500 to-rose-500', abbr: 'SL' },
    { name: 'HubSpot', latency: '2-way CRM', color: 'from-orange-500 to-amber-500', abbr: 'HS' },
    { name: 'Salesforce', latency: 'Enterprise API', color: 'from-sky-500 to-blue-600', abbr: 'SF' },
    { name: 'Snowflake', latency: 'Zero-Copy SQL', color: 'from-cyan-400 to-teal-500', abbr: 'SN' },
    { name: 'Postgres', latency: 'CDC Stream', color: 'from-indigo-500 to-blue-700', abbr: 'PG' },
    { name: 'Stripe', latency: 'Live MRR Events', color: 'from-violet-500 to-purple-600', abbr: 'ST' }
  ];

export const agentFeedItems = [
    {
      agent: 'Enrichment Agent',
      action: 'Synced 48 firmographic attributes for Stratos Cloud',
      time: 'Just now',
      tag: 'CRM Sync'
    },
    {
      agent: 'Intent Sentinel',
      action: 'Flagged +310% API usage surge on NexusData workspace',
      time: '2m ago',
      tag: 'Expansion Signal'
    },
    {
      agent: 'Deal Desk Bot',
      action: 'Generated custom SOC2 + MSA packet for FinPulse Labs',
      time: '7m ago',
      tag: 'Auto-Docs'
    }
  ];

export const pricingTiers = [
    {
      name: 'Starter',
      tagline: 'For early-stage B2B teams automating inbound qualification.',
      monthlyPrice: 79,
      annualPrice: 63,
      popular: false,
      cta: 'Start 14-Day Trial',
      features: [
        'Up to 5,000 AI-scored leads / mo',
        '2 autonomous workflow agents',
        'HubSpot, Slack & Stripe integrations',
        'Real-time webhook triggers',
        'Standard email & community support'
      ]
    },
    {
      name: 'Growth',
      tagline: 'Full-stack revenue intelligence for scaling GTM & RevOps teams.',
      monthlyPrice: 199,
      annualPrice: 159,
      popular: true,
      cta: 'Deploy Growth Engine',
      features: [
        'Up to 50,000 AI-scored leads / mo',
        'Unlimited autonomous workflow agents',
        'Salesforce, Snowflake & Postgres CDC',
        'Predictive pipeline forecasting models',
        'Custom LLM prompt guardrails & RBAC',
        'Priority 24/7 Slack engineer channel'
      ]
    },
    {
      name: 'Enterprise',
      tagline: 'Dedicated single-tenant infrastructure with custom SLA guarantees.',
      monthlyPrice: 499,
      annualPrice: 399,
      popular: false,
      cta: 'Book Architecture Call',
      features: [
        'Unlimited event ingestion & scoring',
        'VPC / Single-tenant deployment option',
        'SOC2 Type II, HIPAA & GDPR DPA',
        'Custom fine-tuned revenue models',
        '99.99% uptime SLA & dedicated TAM'
      ]
    }
  ];

export const faqItems = [
    {
      question: 'How does Veloce AI connect to our existing CRM and data warehouse?',
      answer:
        'Veloce connects natively via OAuth 2.0 and read-only Change Data Capture (CDC) connectors in under 4 minutes. We support bi-directional sync with Salesforce, HubSpot, Pipedrive, Snowflake, BigQuery, and PostgreSQL without requiring engineering pipeline maintenance.'
    },
    {
      question: 'Is our proprietary customer data used to train public AI models?',
      answer:
        'Never. Veloce AI operates under strict zero-data-retention agreements with our inference providers. Your CRM records, call transcripts, and revenue telemetry are isolated in encrypted tenant environments and are never shared or used to train foundation models.'
    },
    {
      question: 'What are the API rate limits and webhook latency guarantees?',
      answer:
        'Our edge ingestion network processes enrichment and lead-scoring webhooks at a p99 latency of 42ms. Growth plans support up to 1,200 requests per second out of the box, while Enterprise clusters scale elastically with custom burst quotas.'
    },
    {
      question: 'Can we deploy Veloce AI inside our own AWS or GCP Virtual Private Cloud?',
      answer:
        'Yes. Enterprise customers can deploy the Veloce Autonomous Engine via Terraform modules or Helm charts directly inside their AWS, GCP, or Azure VPC so sensitive PII never leaves your perimeter.'
    }
  ];

export function getHeroTabs(simulationCount: number) {
  return {
    scoring: {
      label: 'AI Lead Scoring',
      badge: '99.4% Model Precision',
      metric1Label: 'High-Intent Leads',
      metric1Value: simulationCount % 2 === 1 ? '1,428' : '1,594',
      metric1Delta: simulationCount % 2 === 1 ? '+24.8%' : '+31.2%',
      metric2Label: 'Avg. Qualification Time',
      metric2Value: simulationCount % 2 === 1 ? '38ms' : '31ms',
      metric2Delta: '-64% latency',
      metric3Label: 'Pipeline Qualified',
      metric3Value: simulationCount % 2 === 1 ? '$2.84M' : '$3.19M',
      metric3Delta: '+18.4% MoM',
      insight:
        'Autonomous Agent #04 detected 19 enterprise accounts visiting API pricing docs 3+ times in the last 4 hours.',
      rows: [
        {
          company: 'Stratos Cloud',
          segment: 'Enterprise',
          score: simulationCount % 2 === 1 ? 98 : 99,
          signal: 'Pricing Page + SDK Docs',
          status: 'Routed to AE'
        },
        {
          company: 'NexusData Corp',
          segment: 'Mid-Market',
          score: simulationCount % 2 === 1 ? 92 : 95,
          signal: 'SOC2 Report Downloaded',
          status: 'Sequence Triggered'
        },
        {
          company: 'FinPulse Labs',
          segment: 'Enterprise',
          score: simulationCount % 2 === 1 ? 89 : 94,
          signal: '14 Team Seats Invited',
          status: 'Slack Alert Sent'
        }
      ]
    },
    forecast: {
      label: 'Pipeline Forecast',
      badge: 'Monte Carlo v2.4',
      metric1Label: 'Projected Q4 ARR',
      metric1Value: simulationCount % 2 === 1 ? '$4.92M' : '$5.28M',
      metric1Delta: '+14.2% vs Target',
      metric2Label: 'Win-Rate Velocity',
      metric2Value: simulationCount % 2 === 1 ? '34.6%' : '37.9%',
      metric2Delta: '+5.1 pts',
      metric3Label: 'At-Risk Deals Saved',
      metric3Value: simulationCount % 2 === 1 ? '$640K' : '$790K',
      metric3Delta: '12 deals rescued',
      insight:
        'Deal velocity accelerated by 4.2 days after enabling automated executive brief generation on Stage-3 opportunities.',
      rows: [
        {
          company: 'Linearity Systems',
          segment: 'Enterprise',
          score: 96,
          signal: 'Contract Redlines Cleared',
          status: 'Commit ($180K)'
        },
        {
          company: 'CloudScale IO',
          segment: 'Enterprise',
          score: 88,
          signal: 'Security Review Passed',
          status: 'Upside ($240K)'
        },
        {
          company: 'Vektor Bio',
          segment: 'Mid-Market',
          score: 84,
          signal: 'Champion Re-engaged',
          status: 'Commit ($95K)'
        }
      ]
    },
    outreach: {
      label: 'Auto-Outreach',
      badge: 'Hyper-Personalized',
      metric1Label: 'Reply Rate (7d)',
      metric1Value: simulationCount % 2 === 1 ? '18.7%' : '21.4%',
      metric1Delta: '3.4x benchmark',
      metric2Label: 'Meetings Booked',
      metric2Value: simulationCount % 2 === 1 ? '84' : '97',
      metric2Delta: '+29 this week',
      metric3Label: 'Deliverability Score',
      metric3Value: '99.8%',
      metric3Delta: 'Zero spam flags',
      insight:
        'Agent synthesized 10-K filings and recent engineering hiring posts to draft 412 bespoke follow-ups automatically.',
      rows: [
        {
          company: 'Aether Robotics',
          segment: 'Enterprise',
          score: 97,
          signal: 'VP Eng Replied in 11m',
          status: 'Demo Booked'
        },
        {
          company: 'Kinetix Pay',
          segment: 'Mid-Market',
          score: 91,
          signal: 'Opened 4x + Forwarded',
          status: 'Follow-up Queued'
        },
        {
          company: 'Helios Energy',
          segment: 'Enterprise',
          score: 94,
          signal: 'LinkedIn + Email Sync',
          status: 'Demo Booked'
        }
      ]
    }
  };
}
