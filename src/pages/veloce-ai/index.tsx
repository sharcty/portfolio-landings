import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  ArrowRight,
  Play,
  Check,
  ShieldCheck,
  Zap,
  Activity,
  ChevronDown,
  Menu,
  X,
  TrendingUp,
  Bot,
  Database,
  Layers,
  Terminal,
  RefreshCw,
  CheckCircle2,
  Clock,
  Lock,
  Globe
} from 'lucide-react';
import RevealSection from '../../shared/RevealSection';

/**
 * Custom SVG Brand Mark for Veloce AI
 */
function VeloceLogo({ isDark }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 shadow-lg shadow-indigo-500/25">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M4 5L12 19L20 5H15.5L12 11.5L8.5 5H4Z"
            fill="currentColor"
          />
          <circle cx="12" cy="4.5" r="2" fill="#A5B4FC" />
        </svg>
      </div>
      <span
        className={`text-lg font-bold tracking-tight ${
          isDark ? 'text-white' : 'text-zinc-900'
        }`}
      >
        Veloce<span className="text-indigo-500">.ai</span>
      </span>
    </div>
  );
}

export default function App() {
  // Theme state (Defaults to sleek #09090B dark mode)
  const [isDark, setIsDark] = useState(true);

  // Mobile navigation drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Hero Product Mockup states
  const [activeTab, setActiveTab] = useState('scoring');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationCount, setSimulationCount] = useState(1);
  const [selectedSegment, setSelectedSegment] = useState('All Accounts');

  // Interactive Demo Modal state (avoiding alert())
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [trialToast, setTrialToast] = useState(null);

  // Bento Grid Chart timeframe state
  const [timeframe, setTimeframe] = useState('30D');

  // Bento Grid Stack Integration tooltip state
  const [hoveredStack, setHoveredStack] = useState(null);

  // Pricing Billing Cycle state ('monthly' | 'annual')
  const [billingCycle, setBillingCycle] = useState('annual');

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Trigger simulated AI recalculation inside Hero Dashboard
  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setTimeout(() => {
      setSimulationCount((prev) => prev + 1);
      setIsSimulating(false);
    }, 650);
  };

  // Smooth anchor scroll helper
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Show clean non-blocking toast notification for CTA clicks
  const triggerActionFeedback = (message) => {
    setTrialToast(message);
    setTimeout(() => {
      setTrialToast(null);
    }, 3500);
  };

  // Dynamic data for the Hero Interactive Mockup
  const heroTabs = {
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

  const currentHeroData = heroTabs[activeTab];
  const filteredRows =
    selectedSegment === 'All Accounts'
      ? currentHeroData.rows
      : currentHeroData.rows.filter((r) => r.segment === selectedSegment);

  // Bento Grid Chart Data by Timeframe
  const chartDataByTimeframe = {
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

  const activeChart = chartDataByTimeframe[timeframe];

  // Stack Integrations for Bento Card 3
  const stackIntegrations = [
    { name: 'Slack', latency: '12ms sync', color: 'from-pink-500 to-rose-500', abbr: 'SL' },
    { name: 'HubSpot', latency: '2-way CRM', color: 'from-orange-500 to-amber-500', abbr: 'HS' },
    { name: 'Salesforce', latency: 'Enterprise API', color: 'from-sky-500 to-blue-600', abbr: 'SF' },
    { name: 'Snowflake', latency: 'Zero-Copy SQL', color: 'from-cyan-400 to-teal-500', abbr: 'SN' },
    { name: 'Postgres', latency: 'CDC Stream', color: 'from-indigo-500 to-blue-700', abbr: 'PG' },
    { name: 'Stripe', latency: 'Live MRR Events', color: 'from-violet-500 to-purple-600', abbr: 'ST' }
  ];

  // Live Agent Feed items for Bento Card 4
  const agentFeedItems = [
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

  // Pricing tiers with dynamic monthly vs. annual pricing
  const pricingTiers = [
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

  // Technical B2B FAQ Items
  const faqItems = [
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

  return (
    <div
      className={`min-h-screen transition-colors duration-300 selection:bg-indigo-500 selection:text-white ${
        isDark ? 'bg-[#09090B] text-zinc-100' : 'bg-[#FFFFFF] text-zinc-900'
      }`}
    >
      {/* Floating Toast Notification for Interactive Feedback */}
      {trialToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-indigo-500/40 bg-zinc-900/95 px-4 py-3 text-sm font-medium text-white shadow-2xl shadow-indigo-500/20 backdrop-blur-md">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{trialToast}</span>
        </div>
      )}

      {/* Interactive 60s Demo Preview Modal */}
      {demoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setDemoModalOpen(false)}
        >
          <div
            className={`relative w-full max-w-2xl overflow-hidden rounded-2xl border p-6 shadow-2xl ${
              isDark
                ? 'border-zinc-800 bg-zinc-950 text-zinc-100'
                : 'border-zinc-200 bg-white text-zinc-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/40">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-ping" />
                <span className="text-sm font-semibold">
                  Veloce Engine 2.4 — Interactive Architecture Walkthrough
                </span>
              </div>
              <button
                onClick={() => setDemoModalOpen(false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950 via-zinc-900 to-violet-950 p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 text-xs font-medium text-indigo-300">
                    Live Telemetry Pipeline
                  </span>
                  <span className="font-mono text-xs text-emerald-400">
                    p99 Latency: 38ms
                  </span>
                </div>

                <div className="my-auto text-center space-y-2">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-300">
                    <Bot className="h-7 w-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    Autonomous Signal-to-Revenue Execution
                  </h4>
                  <p className="mx-auto max-w-md text-xs text-zinc-300">
                    1. Ingests product usage & CRM events → 2. Scores buyer intent via ensemble LLMs → 3. Triggers personalized AE routing in Slack & Salesforce.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="rounded-lg bg-black/40 p-2.5 text-center border border-white/10">
                    <div className="text-xs text-zinc-400">Setup Time</div>
                    <div className="text-sm font-bold text-white">4 Mins</div>
                  </div>
                  <div className="rounded-lg bg-black/40 p-2.5 text-center border border-white/10">
                    <div className="text-xs text-zinc-400">Pipeline Lift</div>
                    <div className="text-sm font-bold text-emerald-400">+32.8%</div>
                  </div>
                  <div className="rounded-lg bg-black/40 p-2.5 text-center border border-white/10">
                    <div className="text-xs text-zinc-400">Compliance</div>
                    <div className="text-sm font-bold text-indigo-300">SOC2 Type II</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDemoModalOpen(false)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    isDark
                      ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  Close Preview
                </button>
                <button
                  onClick={() => {
                    setDemoModalOpen(false);
                    scrollToSection('pricing');
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition"
                >
                  Explore Plans <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          1. STICKY GLASSMORPHIC NAVBAR
         ===================================================================== */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300 ${
          isDark
            ? 'border-zinc-800/80 bg-[#09090B]/80'
            : 'border-zinc-200/80 bg-white/80'
        }`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
          {/* Brand Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="focus:outline-none"
          >
            <VeloceLogo isDark={isDark} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[
              { label: 'Product', id: 'product-mockup' },
              { label: 'Features', id: 'features' },
              { label: 'Pricing', id: 'pricing' },
              { label: 'FAQ', id: 'faq' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors cursor-pointer ${
                  isDark
                    ? 'text-zinc-400 hover:text-white'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Controls: Dark/Light Toggle + Primary CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsDark((prev) => !prev)}
              aria-label="Toggle color theme"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'border-zinc-800 bg-zinc-900/90 text-amber-400 hover:border-zinc-700 hover:bg-zinc-800'
                  : 'border-zinc-200 bg-zinc-100 text-indigo-600 hover:border-zinc-300 hover:bg-zinc-200/70'
              }`}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() =>
                triggerActionFeedback('Sandbox workspace provisioned! Check your inbox.')
              }
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] transition-all cursor-pointer"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
              className={`md:hidden flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                isDark
                  ? 'border-zinc-800 bg-zinc-900 text-zinc-300'
                  : 'border-zinc-200 bg-zinc-100 text-zinc-700'
              }`}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-t px-4 pt-3 pb-5 space-y-2 ${
              isDark
                ? 'border-zinc-800 bg-[#09090B]'
                : 'border-zinc-200 bg-white'
            }`}
          >
            {[
              { label: 'Product', id: 'product-mockup' },
              { label: 'Features', id: 'features' },
              { label: 'Pricing', id: 'pricing' },
              { label: 'FAQ', id: 'faq' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium ${
                  isDark
                    ? 'text-zinc-300 hover:bg-zinc-900'
                    : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerActionFeedback('Sandbox workspace provisioned! Check your inbox.');
                }}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-center text-sm font-semibold text-white shadow-md"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          2. HERO SECTION WITH INTERACTIVE PRODUCT MOCKUP
         ===================================================================== */}
      <section id="top" className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
        {/* Subtle Radial Ambient Background Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 -z-10 flex justify-center overflow-hidden"
        >
          <div
            className={`h-[420px] w-[860px] rounded-full blur-3xl opacity-30 ${
              isDark
                ? 'bg-gradient-to-tr from-indigo-600 via-violet-600 to-purple-700'
                : 'bg-gradient-to-tr from-indigo-300 via-violet-200 to-purple-200'
            }`}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Copy Block */}
          <div className="mx-auto max-w-3xl text-center">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium mb-6 ${
                isDark
                  ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
                  : 'border-indigo-200 bg-indigo-50 text-indigo-700'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span>Veloce Engine 2.4 — Now with Autonomous Agents</span>
            </div>

            <h1
              className={`text-4xl font-extrabold tracking-tight sm:text-6xl lg:leading-[1.1] ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              Turn Raw Product Signals into{' '}
              <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                Autonomous Pipeline
              </span>
            </h1>

            <p
              className={`mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Veloce AI deploys real-time revenue agents across your CRM and data warehouse—scoring high-intent accounts in 38ms, forecasting Q4 ARR, and automating hyper-personalized outreach.
            </p>

            {/* Dual CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() =>
                  triggerActionFeedback('Deploying Veloce Engine 2.4 demo agent...')
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.99] transition-all cursor-pointer"
              >
                Deploy Workflow
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setDemoModalOpen(true)}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold transition-all cursor-pointer ${
                  isDark
                    ? 'border-zinc-800 bg-zinc-900/80 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800'
                    : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50 shadow-sm'
                }`}
              >
                <Play className="h-4 w-4 text-indigo-500 fill-indigo-500" />
                Watch 60s Demo
              </button>
            </div>
          </div>

          {/* =================================================================
              INTERACTIVE SAAS APP WINDOW MOCKUP
             ================================================================= */}
          <div id="product-mockup" className="mt-14 sm:mt-16 scroll-mt-24">
            <div
              className={`mx-auto max-w-5xl overflow-hidden rounded-2xl border shadow-2xl transition-colors ${
                isDark
                  ? 'border-zinc-800 bg-[#111114] shadow-indigo-950/30'
                  : 'border-zinc-200/90 bg-white shadow-zinc-300/50'
              }`}
            >
              {/* Window Top Chrome Bar */}
              <div
                className={`flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-6 ${
                  isDark
                    ? 'border-zinc-800/90 bg-zinc-900/70'
                    : 'border-zinc-200 bg-zinc-50/90'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span
                    className={`ml-2 hidden sm:inline-block font-mono text-xs ${
                      isDark ? 'text-zinc-500' : 'text-zinc-400'
                    }`}
                  >
                    app.veloce.ai / workspace / autonomous-revops
                  </span>
                </div>

                {/* Live Status Pill + Run Simulation Button */}
                <div className="flex items-center gap-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                      isDark
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {currentHeroData.badge}
                  </span>

                  <button
                    onClick={handleRunSimulation}
                    disabled={isSimulating}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-60 transition cursor-pointer shadow-sm"
                  >
                    <RefreshCw
                      className={`h-3.5 w-3.5 ${isSimulating ? 'animate-spin' : ''}`}
                    />
                    {isSimulating ? 'Simulating...' : 'Run Simulation'}
                  </button>
                </div>
              </div>

              {/* Interactive Workflow Tabs + Segment Filter Pills */}
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b px-4 py-3 sm:px-6 ${
                  isDark ? 'border-zinc-800/80 bg-zinc-950/40' : 'border-zinc-100 bg-white'
                }`}
              >
                {/* 3 Clickable Workflow Tabs */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'scoring', label: 'AI Lead Scoring', icon: Zap },
                    { id: 'forecast', label: 'Pipeline Forecast', icon: TrendingUp },
                    { id: 'outreach', label: 'Auto-Outreach', icon: Bot }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const active = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                          active
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : isDark
                            ? 'text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-200'
                            : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Filter Pills */}
                <div className="flex items-center gap-1.5">
                  {['All Accounts', 'Enterprise', 'Mid-Market'].map((seg) => (
                    <button
                      key={seg}
                      onClick={() => setSelectedSegment(seg)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition cursor-pointer ${
                        selectedSegment === seg
                          ? isDark
                            ? 'bg-zinc-800 text-white border border-zinc-700'
                            : 'bg-zinc-900 text-white'
                          : isDark
                          ? 'text-zinc-500 hover:text-zinc-300'
                          : 'text-zinc-500 hover:text-zinc-800'
                      }`}
                    >
                      {seg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dashboard Body */}
              <div
                className={`p-4 sm:p-6 space-y-5 transition-opacity duration-200 ${
                  isSimulating ? 'opacity-60' : 'opacity-100'
                }`}
              >
                {/* 3 KPI Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      label: currentHeroData.metric1Label,
                      val: currentHeroData.metric1Value,
                      delta: currentHeroData.metric1Delta
                    },
                    {
                      label: currentHeroData.metric2Label,
                      val: currentHeroData.metric2Value,
                      delta: currentHeroData.metric2Delta
                    },
                    {
                      label: currentHeroData.metric3Label,
                      val: currentHeroData.metric3Value,
                      delta: currentHeroData.metric3Delta
                    }
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl border p-4 transition-all ${
                        isDark
                          ? 'border-zinc-800/90 bg-zinc-900/50'
                          : 'border-zinc-200/80 bg-zinc-50/70'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>
                          {stat.label}
                        </span>
                        <span className="font-mono text-[11px] font-medium text-emerald-500">
                          {stat.delta}
                        </span>
                      </div>
                      <div
                        className={`mt-2 text-2xl font-bold tracking-tight ${
                          isDark ? 'text-white' : 'text-zinc-900'
                        }`}
                      >
                        {stat.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dynamic AI Insight Callout Banner */}
                <div
                  className={`flex items-start gap-3 rounded-xl border p-3.5 text-xs sm:text-sm ${
                    isDark
                      ? 'border-indigo-500/30 bg-indigo-950/30 text-indigo-200'
                      : 'border-indigo-200 bg-indigo-50/80 text-indigo-900'
                  }`}
                >
                  <Sparkles className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Autonomous Agent Insight: </span>
                    {currentHeroData.insight}
                  </div>
                </div>

                {/* Live Account Signal Table */}
                <div
                  className={`overflow-x-auto rounded-xl border ${
                    isDark ? 'border-zinc-800/90' : 'border-zinc-200'
                  }`}
                >
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead
                      className={`border-b text-[11px] uppercase tracking-wider ${
                        isDark
                          ? 'border-zinc-800 bg-zinc-900/80 text-zinc-400'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-500'
                      }`}
                    >
                      <tr>
                        <th className="px-4 py-2.5 font-semibold">Account</th>
                        <th className="px-4 py-2.5 font-semibold">Segment</th>
                        <th className="px-4 py-2.5 font-semibold">Intent Score</th>
                        <th className="px-4 py-2.5 font-semibold hidden sm:table-cell">
                          Detected Signal
                        </th>
                        <th className="px-4 py-2.5 font-semibold text-right">
                          Agent Action
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className={`divide-y ${
                        isDark ? 'divide-zinc-800/70' : 'divide-zinc-100'
                      }`}
                    >
                      {filteredRows.map((row, idx) => (
                        <tr
                          key={idx}
                          className={`transition-colors ${
                            isDark ? 'hover:bg-zinc-900/60' : 'hover:bg-zinc-50'
                          }`}
                        >
                          <td className="px-4 py-3 font-semibold">{row.company}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`rounded-md px-2 py-0.5 text-xs ${
                                isDark
                                  ? 'bg-zinc-800 text-zinc-300'
                                  : 'bg-zinc-100 text-zinc-700'
                              }`}
                            >
                              {row.segment}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-14 overflow-hidden rounded-full bg-zinc-700/30">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                                  style={{ width: `${row.score}%` }}
                                />
                              </div>
                              <span className="font-mono text-xs font-bold text-indigo-500">
                                {row.score}
                              </span>
                            </div>
                          </td>
                          <td
                            className={`px-4 py-3 hidden sm:table-cell text-xs ${
                              isDark ? 'text-zinc-400' : 'text-zinc-600'
                            }`}
                          >
                            {row.signal}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                isDark
                                  ? 'bg-indigo-500/15 text-indigo-300'
                                  : 'bg-indigo-50 text-indigo-700'
                              }`}
                            >
                              <Check className="h-3 w-3" />
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. ENTERPRISE SOCIAL PROOF STRIP
         ===================================================================== */}
      <RevealSection>
        <section
          className={`border-y py-10 ${
            isDark
              ? 'border-zinc-800/80 bg-zinc-950/50'
              : 'border-zinc-200/80 bg-zinc-50/60'
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p
              className={`text-center text-xs font-semibold uppercase tracking-widest mb-7 ${
                isDark ? 'text-zinc-500' : 'text-zinc-400'
              }`}
            >
              Powering high-velocity revenue teams at modern B2B leaders
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-items-center opacity-70">
              {/* 1. Linearity */}
              <div className="flex items-center gap-2 font-bold tracking-tight text-base">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="18" rx="2" />
                  <rect x="14" y="8" width="7" height="13" rx="2" opacity="0.6" />
                </svg>
                <span>Linearity</span>
              </div>

              {/* 2. Stratos */}
              <div className="flex items-center gap-2 font-bold tracking-tight text-base">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12,2 22,19 2,19" />
                </svg>
                <span>STRATOS</span>
              </div>

              {/* 3. CloudScale */}
              <div className="flex items-center gap-2 font-bold tracking-tight text-base">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="9" cy="12" r="6" />
                  <circle cx="15" cy="12" r="6" opacity="0.55" />
                </svg>
                <span>CloudScale</span>
              </div>

              {/* 4. NexusData */}
              <div className="flex items-center gap-2 font-bold tracking-tight text-base">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 3a3 3 0 116 0 3 3 0 01-6 0z" />
                </svg>
                <span>NexusData</span>
              </div>

              {/* 5. FinPulse */}
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 font-bold tracking-tight text-base">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="2 13 7 13 10 5 14 19 17 13 22 13" />
                </svg>
                <span>FinPulse</span>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* =====================================================================
          4. BENTO-GRID FEATURE SECTION
         ===================================================================== */}
      <section id="features" className="py-20 sm:py-28 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection className="mx-auto max-w-2xl text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
              Engineered for Scale
            </span>
            <h2
              className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              Everything Your GTM Stack Needs in One Autonomous Layer
            </h2>
            <p
              className={`mt-4 text-sm sm:text-base ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Replace brittle Zapier chains and static lead spreadsheets with sub-50ms event streaming and self-optimizing revenue agents.
            </p>
          </RevealSection>

          {/* Asymmetric 3-Column Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* BENTO CARD 1 (2-Col Span): Interactive Real-Time Revenue & Conversion Chart */}
            <RevealSection className="lg:col-span-2">
              <div
                className={`group relative h-full overflow-hidden rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:border-indigo-500/50 ${
                  isDark
                    ? 'border-zinc-800 bg-zinc-900/50 hover:shadow-xl hover:shadow-indigo-950/20'
                    : 'border-zinc-200 bg-white hover:shadow-xl hover:shadow-indigo-100/60'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-500 mb-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>Autonomous Attribution</span>
                    </div>
                    <h3
                      className={`text-xl font-bold ${
                        isDark ? 'text-white' : 'text-zinc-900'
                      }`}
                    >
                      Real-Time Revenue & Conversion Velocity
                    </h3>
                    <p
                      className={`mt-1 text-xs sm:text-sm ${
                        isDark ? 'text-zinc-400' : 'text-zinc-600'
                      }`}
                    >
                      Track net-new pipeline generated directly by AI agent triggers.
                    </p>
                  </div>

                  {/* Interactive Timeframe Switcher (7D / 30D / 90D) */}
                  <div
                    className={`inline-flex rounded-xl border p-1 ${
                      isDark
                        ? 'border-zinc-800 bg-zinc-950'
                        : 'border-zinc-200 bg-zinc-100'
                    }`}
                  >
                    {['7D', '30D', '90D'].map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`rounded-lg px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                          timeframe === tf
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : isDark
                            ? 'text-zinc-400 hover:text-white'
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metric Summary Row */}
                <div className="mt-6 flex items-baseline gap-3">
                  <span
                    className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                      isDark ? 'text-white' : 'text-zinc-950'
                    }`}
                  >
                    {activeChart.total}
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-500">
                    {activeChart.growth} vs prior period
                  </span>
                </div>

                {/* Interactive Animated Bar Chart */}
                <div className="mt-8 grid grid-cols-7 sm:grid-cols-9 lg:grid-cols-10 items-end gap-2 sm:gap-3 h-40 pt-4">
                  {activeChart.bars.map((heightVal, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-2 h-full justify-end group/bar"
                    >
                      <div className="relative w-full flex-1 flex items-end">
                        <div
                          style={{ height: `${heightVal}%` }}
                          className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-violet-400 transition-all duration-500 group-hover/bar:from-indigo-500 group-hover/bar:to-emerald-400"
                        />
                      </div>
                      <span
                        className={`text-[10px] font-mono ${
                          isDark ? 'text-zinc-500' : 'text-zinc-400'
                        }`}
                      >
                        {activeChart.labels[idx]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>

            {/* BENTO CARD 2 (1-Col): Sub-50ms Edge Latency & SOC2 Type II Security */}
            <RevealSection delay={100}>
              <div
                className={`group h-full flex flex-col justify-between rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:border-indigo-500/50 ${
                  isDark
                    ? 'border-zinc-800 bg-zinc-900/50 hover:shadow-xl hover:shadow-indigo-950/20'
                    : 'border-zinc-200 bg-white hover:shadow-xl hover:shadow-indigo-100/60'
                }`}
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-5">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3
                    className={`text-xl font-bold ${
                      isDark ? 'text-white' : 'text-zinc-900'
                    }`}
                  >
                    Sub-50ms Edge & SOC2 Type II
                  </h3>
                  <p
                    className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    Globally distributed inference nodes process lead scoring in real time with end-to-end AES-256 encryption.
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <div
                    className={`flex items-center justify-between rounded-xl border p-3 ${
                      isDark
                        ? 'border-zinc-800 bg-zinc-950/80'
                        : 'border-zinc-200 bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <Globe className="h-4 w-4 text-indigo-500" />
                      <span>Global p99 Latency</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-500">
                      38.4 ms
                    </span>
                  </div>

                  <div
                    className={`flex items-center justify-between rounded-xl border p-3 ${
                      isDark
                        ? 'border-zinc-800 bg-zinc-950/80'
                        : 'border-zinc-200 bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <Lock className="h-4 w-4 text-violet-500" />
                      <span>Zero-Retention LLM</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-indigo-400">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* BENTO CARD 3 (1-Col): One-Click Stack Integrations with Hover Tooltips */}
            <RevealSection delay={150}>
              <div
                className={`group h-full flex flex-col justify-between rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:border-indigo-500/50 ${
                  isDark
                    ? 'border-zinc-800 bg-zinc-900/50 hover:shadow-xl hover:shadow-indigo-950/20'
                    : 'border-zinc-200 bg-white hover:shadow-xl hover:shadow-indigo-100/60'
                }`}
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 mb-5">
                    <Layers className="h-6 w-6" />
                  </div>
                  <h3
                    className={`text-xl font-bold ${
                      isDark ? 'text-white' : 'text-zinc-900'
                    }`}
                  >
                    One-Click Stack Sync
                  </h3>
                  <p
                    className={`mt-2 text-xs sm:text-sm ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    Hover any connector below to inspect live sync capabilities.
                  </p>
                </div>

                {/* 6 Interactive Stack Tiles */}
                <div className="mt-6 grid grid-cols-3 gap-2.5">
                  {stackIntegrations.map((item) => (
                    <div
                      key={item.name}
                      onMouseEnter={() => setHoveredStack(item)}
                      onMouseLeave={() => setHoveredStack(null)}
                      className={`relative flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all cursor-pointer hover:-translate-y-0.5 ${
                        isDark
                          ? 'border-zinc-800 bg-zinc-950/80 hover:border-indigo-500/60'
                          : 'border-zinc-200 bg-zinc-50 hover:border-indigo-400'
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${item.color} text-xs font-bold text-white shadow-sm`}
                      >
                        {item.abbr}
                      </div>
                      <span className="mt-1.5 text-[11px] font-semibold">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tooltip Status Bar */}
                <div
                  className={`mt-4 rounded-lg px-3 py-2 text-center font-mono text-xs transition-colors ${
                    isDark
                      ? 'bg-zinc-950 text-indigo-300 border border-zinc-800/80'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                  }`}
                >
                  {hoveredStack
                    ? `${hoveredStack.name}: ${hoveredStack.latency} Active`
                    : '6 Native Bi-Directional Connectors Ready'}
                </div>
              </div>
            </RevealSection>

            {/* BENTO CARD 4 (2-Col Span): Live Collaborative AI Agent Activity Feed */}
            <RevealSection delay={200} className="lg:col-span-2">
              <div
                className={`group h-full flex flex-col justify-between rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:border-indigo-500/50 ${
                  isDark
                    ? 'border-zinc-800 bg-zinc-900/50 hover:shadow-xl hover:shadow-indigo-950/20'
                    : 'border-zinc-200 bg-white hover:shadow-xl hover:shadow-indigo-100/60'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-500 mb-1">
                      <Activity className="h-4 w-4" />
                      <span>Autonomous Execution Stream</span>
                    </div>
                    <h3
                      className={`text-xl font-bold ${
                        isDark ? 'text-white' : 'text-zinc-900'
                      }`}
                    >
                      Live Collaborative AI Agent Activity Feed
                    </h3>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    3 Agents Active
                  </span>
                </div>

                <div className="space-y-3">
                  {agentFeedItems.map((feed, i) => (
                    <div
                      key={i}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border p-3.5 transition-colors ${
                        isDark
                          ? 'border-zinc-800/90 bg-zinc-950/70 hover:border-zinc-700'
                          : 'border-zinc-200/80 bg-zinc-50/80 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-500">
                          <Terminal className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-indigo-500">
                              {feed.agent}
                            </span>
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                                isDark
                                  ? 'bg-zinc-800 text-zinc-300'
                                  : 'bg-zinc-200/70 text-zinc-700'
                              }`}
                            >
                              {feed.tag}
                            </span>
                          </div>
                          <p
                            className={`text-xs sm:text-sm mt-0.5 ${
                              isDark ? 'text-zinc-300' : 'text-zinc-700'
                            }`}
                          >
                            {feed.action}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 shrink-0 pl-11 sm:pl-0">
                        <Clock className="h-3 w-3" />
                        <span>{feed.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. PRICING SECTION WITH MONTHLY / ANNUAL TOGGLE
         ===================================================================== */}
      <section
        id="pricing"
        className={`py-20 sm:py-28 border-t scroll-mt-20 ${
          isDark
            ? 'border-zinc-800/80 bg-zinc-950/40'
            : 'border-zinc-200/80 bg-zinc-50/50'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
              Transparent Usage Scaling
            </span>
            <h2
              className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              Predictable Pricing That Grows With Your Pipeline
            </h2>
            <p
              className={`mt-3 text-sm sm:text-base ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Start free for 14 days. No credit card required. Cancel or switch tiers anytime.
            </p>

            {/* Smooth Pill Toggle: Monthly vs Annual (Save 20%) */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border p-1.5 shadow-sm transition-colors border-zinc-700/40 bg-zinc-900/10">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : isDark
                    ? 'text-zinc-400 hover:text-white'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Monthly
              </button>

              <button
                onClick={() => setBillingCycle('annual')}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  billingCycle === 'annual'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : isDark
                    ? 'text-zinc-400 hover:text-white'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <span>Annual</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    billingCycle === 'annual'
                      ? 'bg-white/20 text-white'
                      : 'bg-emerald-500/15 text-emerald-500'
                  }`}
                >
                  Save 20%
                </span>
              </button>
            </div>
          </RevealSection>

          {/* 3 Pricing Cards */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {pricingTiers.map((tier, idx) => {
              const displayedPrice =
                billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;

              return (
                <RevealSection key={tier.name} delay={idx * 100}>
                  <div
                    className={`relative flex h-full flex-col justify-between rounded-2xl p-7 sm:p-8 transition-all duration-300 ${
                      tier.popular
                        ? isDark
                          ? 'border-2 border-indigo-500 bg-gradient-to-b from-indigo-950/40 via-zinc-900 to-zinc-900 shadow-2xl shadow-indigo-500/15'
                          : 'border-2 border-indigo-600 bg-white shadow-2xl shadow-indigo-200/60'
                        : isDark
                        ? 'border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                        : 'border border-zinc-200 bg-white hover:border-zinc-300'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                          <Sparkles className="h-3 w-3" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div>
                      <h3
                        className={`text-xl font-bold ${
                          isDark ? 'text-white' : 'text-zinc-900'
                        }`}
                      >
                        {tier.name}
                      </h3>
                      <p
                        className={`mt-2 text-xs sm:text-sm min-h-[40px] ${
                          isDark ? 'text-zinc-400' : 'text-zinc-600'
                        }`}
                      >
                        {tier.tagline}
                      </p>

                      {/* Animated Price Display */}
                      <div className="mt-6 flex items-baseline gap-1.5">
                        <span
                          key={`${tier.name}-${billingCycle}`}
                          className={`text-4xl sm:text-5xl font-extrabold tracking-tight transition-all duration-300 ${
                            isDark ? 'text-white' : 'text-zinc-950'
                          }`}
                        >
                          ${displayedPrice}
                        </span>
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            isDark ? 'text-zinc-400' : 'text-zinc-500'
                          }`}
                        >
                          / month
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-emerald-500 font-medium">
                        {billingCycle === 'annual'
                          ? `Billed annually ($${displayedPrice * 12}/yr)`
                          : 'Billed monthly — switch to annual to save 20%'}
                      </p>

                      {/* Feature Checklist */}
                      <ul className="mt-7 space-y-3.5 border-t pt-6 border-zinc-800/30">
                        {tier.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                            <Check className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                            <span className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() =>
                        triggerActionFeedback(
                          `Selected ${tier.name} (${billingCycle}) — redirecting to onboarding...`
                        )
                      }
                      className={`mt-8 w-full rounded-xl py-3 px-4 text-sm font-semibold transition-all cursor-pointer ${
                        tier.popular
                          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500'
                          : isDark
                          ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                          : 'bg-zinc-900 text-white hover:bg-zinc-800'
                      }`}
                    >
                      {tier.cta}
                    </button>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. INTERACTIVE FAQ ACCORDION & CONVERSION FOOTER
         ===================================================================== */}
      <section id="faq" className="py-20 sm:py-28 scroll-mt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
              Technical & Security FAQ
            </span>
            <h2
              className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              Built for Engineering & RevOps Scrutiny
            </h2>
          </RevealSection>

          <div className="space-y-3.5">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <RevealSection key={idx} delay={idx * 60}>
                  <div
                    className={`overflow-hidden rounded-2xl border transition-colors ${
                      isDark
                        ? 'border-zinc-800 bg-zinc-900/40'
                        : 'border-zinc-200 bg-white'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-sm sm:text-base cursor-pointer"
                    >
                      <span className={isDark ? 'text-zinc-100' : 'text-zinc-900'}>
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-indigo-500 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={`px-5 pb-5 text-xs sm:text-sm leading-relaxed ${
                            isDark ? 'text-zinc-400' : 'text-zinc-600'
                          }`}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Conversion CTA Banner + Multi-Column Footer */}
      <footer
        className={`border-t pt-16 pb-12 ${
          isDark ? 'border-zinc-800/80 bg-zinc-950' : 'border-zinc-200 bg-zinc-50'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Gradient CTA Banner */}
          <RevealSection>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-8 sm:p-12 text-white shadow-2xl shadow-indigo-500/20 mb-16">
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
                <div className="max-w-xl">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Ready to automate your revenue engine?
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-indigo-100">
                    Connect your CRM in 4 minutes and deploy your first autonomous qualification agent today.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={() =>
                      triggerActionFeedback('Free trial activated! Welcome to Veloce AI.')
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-indigo-700 shadow-lg hover:bg-indigo-50 transition cursor-pointer"
                  >
                    Start Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDemoModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition cursor-pointer"
                  >
                    Watch 60s Demo
                  </button>
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Multi-Column Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-zinc-800/40">
            <div className="col-span-2">
              <VeloceLogo isDark={isDark} />
              <p
                className={`mt-4 max-w-xs text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                Autonomous workflow and revenue intelligence infrastructure for high-growth B2B software teams.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-emerald-500 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                All Systems Operational (99.99% Uptime)
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-3">
                Product
              </h4>
              <ul
                className={`space-y-2.5 text-xs sm:text-sm ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                <li><button onClick={() => scrollToSection('product-mockup')} className="hover:text-indigo-500">AI Lead Scoring</button></li>
                <li><button onClick={() => scrollToSection('product-mockup')} className="hover:text-indigo-500">Pipeline Forecast</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-indigo-500">Integrations</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-indigo-500">Enterprise VPC</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-3">
                Developers
              </h4>
              <ul
                className={`space-y-2.5 text-xs sm:text-sm ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                <li><a href="#top" onClick={(e) => e.preventDefault()} className="hover:text-indigo-500">API Reference</a></li>
                <li><a href="#top" onClick={(e) => e.preventDefault()} className="hover:text-indigo-500">Webhook SDKs</a></li>
                <li><a href="#top" onClick={(e) => e.preventDefault()} className="hover:text-indigo-500">Terraform Modules</a></li>
                <li><a href="#top" onClick={(e) => e.preventDefault()} className="hover:text-indigo-500">System Status</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-3">
                Security & Legal
              </h4>
              <ul
                className={`space-y-2.5 text-xs sm:text-sm ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }} className="hover:text-indigo-500">SOC2 Type II</a></li>
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }} className="hover:text-indigo-500">GDPR & DPA</a></li>
                <li><a href="#top" onClick={(e) => e.preventDefault()} className="hover:text-indigo-500">Privacy Policy</a></li>
                <li><a href="#top" onClick={(e) => e.preventDefault()} className="hover:text-indigo-500">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div
            className={`mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
              isDark ? 'text-zinc-500' : 'text-zinc-500'
            }`}
          >
            <p>© {new Date().getFullYear()} Veloce AI Inc. All rights reserved.</p>
            <p>Crafted with React, TypeScript & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}