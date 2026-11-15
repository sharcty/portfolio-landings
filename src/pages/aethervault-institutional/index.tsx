import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sun,
  Moon,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Wallet,
  Check,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  Activity,
  Lock,
  Layers,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  Cpu,
  Globe,
  Sparkles,
  Sliders,
  BarChart3,
  PieChart,
  Terminal,
  Copy
} from 'lucide-react';
import RevealSection from '../../shared/RevealSection';

/**
 * Animated numeric counter for Hero KPIs.
 */
function AnimatedStat({ target, prefix = '', suffix = '', decimals = 0, duration = 1400 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return (
    <span className="tabular-nums">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/**
 * Custom Geometric SVG Logo for AetherVault
 */
function AetherVaultLogo({ isDark }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/25">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-slate-950"
        >
          <path
            d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M12 7L7 15.5H17L12 7Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span
          className={`text-base sm:text-lg font-bold tracking-tight leading-none ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Aether<span className="text-emerald-400">Vault</span>
        </span>
        <span
          className={`text-[10px] font-mono tracking-widest uppercase mt-0.5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          Institutional
        </span>
      </div>
    </div>
  );
}

export default function App() {
  // Theme state (defaults to sleek #07090E obsidian institutional dark mode)
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  // Wallet Connection Modal State
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [connectingWalletName, setConnectingWalletName] = useState(null);

  // 1. Live Market Ticker Data with subtle micro-ticks
  const [tickerItems, setTickerItems] = useState([
    { symbol: 'ETH', name: 'Ethereum', price: 3482.4, isYield: false, delta: 2.84 },
    { symbol: 'BTC', name: 'Bitcoin', price: 94210.0, isYield: false, delta: 1.92 },
    { symbol: 'USDC Vault', name: 'Senior Tranche', price: 11.42, isYield: true, delta: 0.34 },
    { symbol: 'sUSDe', name: 'Synthetic Dollar', price: 14.85, isYield: true, delta: 0.61 },
    { symbol: 'SOL', name: 'Solana', price: 218.65, isYield: false, delta: 4.18 },
    { symbol: 'ARB', name: 'Arbitrum', price: 1.18, isYield: false, delta: -0.74 },
    { symbol: 'T-BILL RWA', name: 'US Treasury 3M', price: 5.38, isYield: true, delta: 0.04 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerItems((prev) =>
        prev.map((item) => {
          const jitter = (Math.random() - 0.48) * (item.isYield ? 0.04 : item.price * 0.0012);
          const nextPrice = Math.max(0.01, item.price + jitter);
          const nextDelta = Number((item.delta + (Math.random() - 0.49) * 0.08).toFixed(2));
          return {
            ...item,
            price: nextPrice,
            delta: nextDelta
          };
        })
      );
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  // 3. Hero Interactive Treasury Widget State
  const [selectedHeroVault, setSelectedHeroVault] = useState('delta-eth');

  const heroVaultStrategies = {
    'delta-eth': {
      id: 'delta-eth',
      title: 'Delta-Neutral ETH',
      badge: 'Flagship Strategy',
      apy: 14.68,
      collateralRatio: '168.4%',
      reserves: '$684.2M',
      allocation: [
        { label: 'stETH Spot Collateral', pct: 52, color: '#10B981' },
        { label: 'Perp Funding Hedge', pct: 33, color: '#06B6D4' },
        { label: 'Liquid USDC Buffer', pct: 15, color: '#6366F1' }
      ],
      sparkline: [32, 38, 36, 45, 52, 49, 61, 68, 72, 81, 86, 94],
      auditHash: '0x9f4c...82e1 • Chainlink PoR Verified'
    },
    'tbill-rwa': {
      id: 'tbill-rwa',
      title: 'Tokenized US T-Bills',
      badge: 'Sovereign Backed',
      apy: 5.42,
      collateralRatio: '102.5%',
      reserves: '$492.0M',
      allocation: [
        { label: '0-3M US Treasury Bills', pct: 74, color: '#06B6D4' },
        { label: 'Overnight Repo Facility', pct: 18, color: '#10B981' },
        { label: 'Circle USDC Settlement', pct: 8, color: '#8B5CF6' }
      ],
      sparkline: [50, 52, 54, 55, 57, 59, 61, 63, 64, 66, 68, 70],
      auditHash: '0x3a8b...19c4 • BNY Mellon Custody Attested'
    },
    'multi-stable': {
      id: 'multi-stable',
      title: 'Multi-Chain Stablecoin',
      badge: 'Auto-Rebalanced',
      apy: 11.84,
      collateralRatio: '142.0%',
      reserves: '$308.6M',
      allocation: [
        { label: 'Aave v3 & Morpho Blue', pct: 46, color: '#10B981' },
        { label: 'Curve Institutional Pools', pct: 34, color: '#06B6D4' },
        { label: 'Cross-Chain Arb Vault', pct: 20, color: '#F59E0B' }
      ],
      sparkline: [28, 34, 41, 39, 48, 55, 58, 65, 71, 76, 82, 89],
      auditHash: '0x71d2...40a9 • Certora Formal Proof Active'
    }
  };

  const activeHeroVault = heroVaultStrategies[selectedHeroVault];

  // 4. Interactive ROI & Compound Yield Calculator State
  const [initialDeposit, setInitialDeposit] = useState(50000);
  const [durationMonths, setDurationMonths] = useState(18);
  const [riskTier, setRiskTier] = useState('balanced'); // 'conservative' | 'balanced' | 'alpha'
  const [compoundFreq, setCompoundFreq] = useState('daily'); // 'daily' | 'monthly' | 'none'
  const [hoveredChartPoint, setHoveredChartPoint] = useState(null);

  const strategyTiers = {
    conservative: {
      id: 'conservative',
      name: 'Conservative RWA',
      apy: 5.4,
      tag: 'US T-Bills + Repo',
      accent: 'text-cyan-400'
    },
    balanced: {
      id: 'balanced',
      name: 'Balanced Stable',
      apy: 11.8,
      tag: 'Senior DeFi + RWA',
      accent: 'text-emerald-400'
    },
    alpha: {
      id: 'alpha',
      name: 'Alpha Delta-Neutral',
      apy: 18.6,
      tag: 'Basis + Funding Capture',
      accent: 'text-teal-300'
    }
  };

  const selectedTier = strategyTiers[riskTier];

  // Calculate month-by-month compound vs principal vs traditional bank (0.45% APY)
  const simulationSeries = useMemo(() => {
    const r = selectedTier.apy / 100;
    const bankRate = 0.0045; // 0.45% TradFi savings
    const points = [];

    for (let m = 0; m <= durationMonths; m++) {
      const years = m / 12;
      let totalBalance = initialDeposit;

      if (compoundFreq === 'daily') {
        totalBalance = initialDeposit * Math.pow(1 + r / 365, 365 * years);
      } else if (compoundFreq === 'monthly') {
        totalBalance = initialDeposit * Math.pow(1 + r / 12, 12 * years);
      } else {
        // Simple interest (no compounding)
        totalBalance = initialDeposit * (1 + r * years);
      }

      const bankBalance = initialDeposit * Math.pow(1 + bankRate / 12, 12 * years);

      points.push({
        month: m,
        principal: initialDeposit,
        total: totalBalance,
        yieldEarned: totalBalance - initialDeposit,
        bankTotal: bankBalance
      });
    }

    return points;
  }, [initialDeposit, durationMonths, selectedTier.apy, compoundFreq]);

  const finalProjection = simulationSeries[simulationSeries.length - 1];
  const bankAdvantage = finalProjection.total - finalProjection.bankTotal;

  // 5. Bento Analytics Grid States
  // Card 1: TVL & Protocol Revenue Timeframe + Crosshair
  const [tvlTimeframe, setTvlTimeframe] = useState('30D');
  const [tvlHoverIdx, setTvlHoverIdx] = useState(null);

  const tvlDatasets = {
    '24H': {
      tvl: '$1,484.8M',
      revenue: '$412.6K',
      delta: '+1.84%',
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
      tvlSeries: [1458, 1462, 1465, 1471, 1476, 1480, 1484.8],
      revSeries: [340, 355, 368, 381, 392, 404, 412.6]
    },
    '7D': {
      tvl: '$1,484.8M',
      revenue: '$2.89M',
      delta: '+6.42%',
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      tvlSeries: [1395, 1412, 1428, 1441, 1459, 1472, 1484.8],
      revSeries: [210, 235, 248, 260, 272, 281, 289]
    },
    '30D': {
      tvl: '$1,484.8M',
      revenue: '$12.45M',
      delta: '+18.9%',
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
      tvlSeries: [1248, 1285, 1310, 1348, 1389, 1420, 1454, 1484.8],
      revSeries: [820, 890, 945, 1010, 1085, 1140, 1195, 1245]
    },
    ALL: {
      tvl: '$1,484.8M',
      revenue: '$84.20M',
      delta: '+342%',
      labels: ['Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26', 'Q2 26', 'Q3 26', 'Q4 26'],
      tvlSeries: [335, 490, 680, 845, 1020, 1190, 1345, 1484.8],
      revSeries: [140, 220, 340, 460, 580, 675, 760, 842]
    }
  };

  const currentTvlData = tvlDatasets[tvlTimeframe];

  // Card 2: Cross-Chain Liquidity Distribution
  const [selectedChainFilter, setSelectedChainFilter] = useState('ALL');
  const chainAllocations = [
    {
      id: 'Ethereum',
      name: 'Ethereum Mainnet',
      share: 48,
      tvl: '$712.7M',
      apy: '11.2%',
      color: '#10B981'
    },
    {
      id: 'Arbitrum',
      name: 'Arbitrum One',
      share: 24,
      tvl: '$356.3M',
      apy: '12.6%',
      color: '#06B6D4'
    },
    {
      id: 'Base',
      name: 'Base L2',
      share: 17,
      tvl: '$252.4M',
      apy: '11.9%',
      color: '#3B82F6'
    },
    {
      id: 'Solana',
      name: 'Solana Institutional',
      share: 11,
      tvl: '$163.4M',
      apy: '13.4%',
      color: '#8B5CF6'
    }
  ];

  const visibleChains =
    selectedChainFilter === 'ALL'
      ? chainAllocations
      : chainAllocations.filter((c) => c.id === selectedChainFilter);

  // Card 3: Smart Contract Security & On-Chain Reserve Verification
  const [verifyingReserve, setVerifyingReserve] = useState(false);
  const [reserveVerifiedBlock, setReserveVerifiedBlock] = useState('21,492,804');

  const handleVerifyOnChainReserve = () => {
    if (verifyingReserve) return;
    setVerifyingReserve(true);
    setTimeout(() => {
      const nextBlock = (21492804 + Math.floor(Math.random() * 45 + 1)).toLocaleString();
      setReserveVerifiedBlock(nextBlock);
      setVerifyingReserve(false);
      showToast(`Chainlink PoR Attested at Block #${nextBlock} (100.4% Collateralized)`);
    }, 750);
  };

  // Card 4: Live Vault Transaction Feed
  const [vaultTxs, setVaultTxs] = useState([
    {
      type: 'Institutional Deposit',
      vault: 'Delta-Neutral ETH',
      amount: '+$2,450,000',
      chain: 'Ethereum',
      hash: '0x84f2...91b3',
      time: '14s ago',
      positive: true
    },
    {
      type: 'Automated Rebalance',
      vault: 'Multi-Chain Stable',
      amount: '$8,120,000',
      chain: 'Arbitrum',
      hash: '0x3c19...44e0',
      time: '1m ago',
      positive: true
    },
    {
      type: 'Yield Harvest & Compound',
      vault: 'Tokenized US T-Bills',
      amount: '+$148,920',
      chain: 'Base',
      hash: '0x7a05...c82d',
      time: '3m ago',
      positive: true
    },
    {
      type: 'Institutional Deposit',
      vault: 'Delta-Neutral ETH',
      amount: '+$950,000',
      chain: 'Solana',
      hash: '5xKp...9mQw',
      time: '6m ago',
      positive: true
    }
  ]);

  // Periodically prepend a fresh simulated institutional event
  useEffect(() => {
    const sampleEvents = [
      {
        type: 'Institutional Deposit',
        vault: 'Tokenized US T-Bills',
        amount: '+$1,750,000',
        chain: 'Ethereum',
        hash: '0x91e4...3f7a',
        time: 'Just now',
        positive: true
      },
      {
        type: 'Yield Harvest & Compound',
        vault: 'Delta-Neutral ETH',
        amount: '+$214,380',
        chain: 'Arbitrum',
        hash: '0x4d82...10c9',
        time: 'Just now',
        positive: true
      },
      {
        type: 'Automated Rebalance',
        vault: 'Multi-Chain Stable',
        amount: '$4,600,000',
        chain: 'Base',
        hash: '0x6b27...e512',
        time: 'Just now',
        positive: true
      }
    ];
    let counter = 0;
    const txTimer = setInterval(() => {
      const nextEvent = sampleEvents[counter % sampleEvents.length];
      counter += 1;
      setVaultTxs((prev) => [nextEvent, ...prev.slice(0, 3)]);
    }, 9000);

    return () => clearInterval(txTimer);
  }, []);

  // 6. FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  const faqList = [
    {
      q: 'How does AetherVault generate delta-neutral institutional yield without directional market risk?',
      a: 'Our flagship vaults pair spot staked ETH (stETH / wstETH) collateral with matched short perpetual futures positions across deep institutional liquidity venues. This neutralizes spot price volatility while capturing both Ethereum staking rewards and positive perpetual funding spreads.'
    },
    {
      q: 'How are Tokenized US Treasury Bill vaults custody-backed and audited?',
      a: 'Treasury tranches are backed 1:1 by short-duration (0–3 month) US Treasury Bills held in bankruptcy-remote SPVs with regulated custodians. Real-time Net Asset Value (NAV) and reserve balances are published on-chain every 15 minutes via Chainlink Proof-of-Reserve oracles.'
    },
    {
      q: 'Are there lock-up periods or withdrawal queues for institutional liquidity providers?',
      a: 'AetherVault maintains a 12%–15% instant-liquidity buffer in USDC across all vaults, enabling atomic instant redemptions up to $10M per transaction. Larger institutional redemptions settle within T+0 (under 4 hours) via automated position unwinding.'
    },
    {
      q: 'What smart contract security guarantees and formal verifications protect protocol TVL?',
      a: 'All core vault contracts have undergone formal mathematical verification by Certora, dual independent audits by OpenZeppelin and Trail of Bits, and are protected by a $5M active Immunefi bug bounty alongside a 48-hour multi-sig governance timelock.'
    }
  ];

  // Helper: Show non-blocking notification toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Helper: Scroll smoothly to section
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Mock Wallet Connect Handler
  const handleConnectWallet = (walletName) => {
    setConnectingWalletName(walletName);
    setTimeout(() => {
      setConnectingWalletName(null);
      setConnectedWallet({
        provider: walletName,
        address: '0x71C...89A4',
        balance: '420,500 USDC'
      });
      setWalletModalOpen(false);
      showToast(`Connected ${walletName} (0x71C...89A4) to Mainnet`);
    }, 650);
  };

  // Format currency helper
  const formatUSD = (val) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);

  // SVG Chart Geometry for Yield Simulator
  const simChartWidth = 640;
  const simChartHeight = 230;
  const simPadLeft = 16;
  const simPadRight = 16;
  const simPadTop = 20;
  const simPadBottom = 28;

  const simChartGeometry = useMemo(() => {
    const maxVal = Math.max(...simulationSeries.map((p) => p.total), initialDeposit * 1.05);
    const minVal = initialDeposit * 0.92;
    const innerW = simChartWidth - simPadLeft - simPadRight;
    const innerH = simChartHeight - simPadTop - simPadBottom;

    const coords = simulationSeries.map((pt, idx) => {
      const x =
        simPadLeft +
        (simulationSeries.length > 1
          ? (idx / (simulationSeries.length - 1)) * innerW
          : innerW / 2);
      const yTotal =
        simPadTop + innerH - ((pt.total - minVal) / (maxVal - minVal || 1)) * innerH;
      const yPrincipal =
        simPadTop + innerH - ((pt.principal - minVal) / (maxVal - minVal || 1)) * innerH;
      return { ...pt, x, yTotal, yPrincipal };
    });

    const totalLinePath = coords
      .map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.yTotal.toFixed(1)}`)
      .join(' ');

    const areaPath =
      coords.length > 0
        ? `${totalLinePath} L ${coords[coords.length - 1].x.toFixed(1)} ${(
            simChartHeight - simPadBottom
          ).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(
            simChartHeight - simPadBottom
          ).toFixed(1)} Z`
        : '';

    const principalLinePath = coords
      .map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.yPrincipal.toFixed(1)}`)
      .join(' ');

    return { coords, totalLinePath, areaPath, principalLinePath };
  }, [simulationSeries, initialDeposit]);

  // SVG Chart Geometry for TVL & Revenue Bento Card
  const tvlChartWidth = 560;
  const tvlChartHeight = 190;
  const tvlGeometry = useMemo(() => {
    const series = currentTvlData.tvlSeries;
    const minV = Math.min(...series) * 0.96;
    const maxV = Math.max(...series) * 1.02;
    const padX = 14;
    const padY = 18;
    const w = tvlChartWidth - padX * 2;
    const h = tvlChartHeight - padY * 2;

    const pts = series.map((val, idx) => {
      const x = padX + (idx / (series.length - 1)) * w;
      const y = padY + h - ((val - minV) / (maxV - minV || 1)) * h;
      return {
        x,
        y,
        val,
        rev: currentTvlData.revSeries[idx],
        label: currentTvlData.labels[idx]
      };
    });

    const line = pts
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(' ');
    const area = `${line} L ${pts[pts.length - 1].x.toFixed(1)} ${
      tvlChartHeight - padY
    } L ${pts[0].x.toFixed(1)} ${tvlChartHeight - padY} Z`;

    return { pts, line, area };
  }, [currentTvlData]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 selection:bg-emerald-500 selection:text-slate-950 ${
        isDark ? 'bg-[#07090E] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      {/* Embedded Keyframe Animation for Smooth Continuous Ticker Marquee */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker-marquee {
          display: flex;
          width: max-content;
          animation: marqueeScroll 34s linear infinite;
        }
        .animate-ticker-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Non-Blocking Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-slate-900/95 px-4 py-3 text-xs sm:text-sm font-medium text-white shadow-2xl shadow-emerald-500/20 backdrop-blur-md">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          WEB3 WALLET CONNECTION MODAL
         ===================================================================== */}
      {walletModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setWalletModalOpen(false)}
        >
          <div
            className={`relative w-full max-w-md overflow-hidden rounded-2xl border p-6 shadow-2xl ${
              isDark
                ? 'border-slate-800 bg-[#0B0F17] text-slate-100'
                : 'border-slate-200 bg-white text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/40">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <Wallet className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Connect Institutional Wallet</h3>
                  <p className="text-xs text-slate-400">
                    Select a Web3 signer to access AetherVault v2
                  </p>
                </div>
              </div>
              <button
                onClick={() => setWalletModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800/50 hover:text-white transition"
                aria-label="Close wallet modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {connectedWallet && (
              <div
                className={`mt-4 flex items-center justify-between rounded-xl border p-3 text-xs ${
                  isDark
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                }`}
              >
                <div>
                  <div className="font-semibold">
                    Connected: {connectedWallet.provider} ({connectedWallet.address})
                  </div>
                  <div className="opacity-80 mt-0.5">
                    Available Liquidity: {connectedWallet.balance}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setConnectedWallet(null);
                    showToast('Wallet disconnected');
                  }}
                  className="rounded-lg bg-rose-500/20 px-2.5 py-1 text-rose-400 hover:bg-rose-500/30 font-semibold"
                >
                  Disconnect
                </button>
              </div>
            )}

            <div className="mt-4 space-y-2.5">
              {[
                {
                  name: 'MetaMask',
                  tag: 'Browser Extension',
                  badgeColor: 'bg-amber-500/15 text-amber-400',
                  iconBg: 'from-orange-500 to-amber-500'
                },
                {
                  name: 'WalletConnect',
                  tag: 'QR / Institutional Custody',
                  badgeColor: 'bg-cyan-500/15 text-cyan-400',
                  iconBg: 'from-sky-500 to-blue-600'
                },
                {
                  name: 'Coinbase Wallet',
                  tag: 'Smart Wallet & Prime',
                  badgeColor: 'bg-blue-500/15 text-blue-400',
                  iconBg: 'from-blue-600 to-indigo-600'
                },
                {
                  name: 'Ledger Hardware',
                  tag: 'Cold Storage Signer',
                  badgeColor: 'bg-emerald-500/15 text-emerald-400',
                  iconBg: 'from-emerald-500 to-teal-600'
                }
              ].map((w) => {
                const isConnecting = connectingWalletName === w.name;
                return (
                  <button
                    key={w.name}
                    onClick={() => handleConnectWallet(w.name)}
                    disabled={!!connectingWalletName}
                    className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                      isDark
                        ? 'border-slate-800 bg-slate-900/60 hover:border-emerald-500/50 hover:bg-slate-900'
                        : 'border-slate-200 bg-slate-50 hover:border-emerald-500 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${w.iconBg} text-xs font-extrabold text-white shadow-sm`}
                      >
                        {w.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-bold">{w.name}</div>
                        <div className="text-xs text-slate-400">{w.tag}</div>
                      </div>
                    </div>

                    {isConnecting ? (
                      <RefreshCw className="h-4 w-4 animate-spin text-emerald-400" />
                    ) : (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${w.badgeColor}`}
                      >
                        Connect
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-center text-[11px] text-slate-500">
              Non-custodial signature verification • Zero gas approval required
            </p>
          </div>
        </div>
      )}

      {/* =====================================================================
          1. LIVE MARKET TICKER BAR AT THE VERY TOP
         ===================================================================== */}
      <div
        className={`border-b text-xs overflow-hidden py-2 ${
          isDark
            ? 'border-slate-800/90 bg-[#05070B] text-slate-300'
            : 'border-slate-200 bg-slate-900 text-slate-200'
        }`}
      >
        <div className="animate-ticker-marquee flex items-center gap-8 px-4">
          {[...tickerItems, ...tickerItems].map((item, idx) => {
            const isPositive = item.delta >= 0;
            return (
              <div key={idx} className="flex items-center gap-2 whitespace-nowrap font-mono">
                <span className="font-bold text-white">{item.symbol}</span>
                <span className="text-slate-400 text-[11px] hidden sm:inline">
                  {item.name}
                </span>
                <span className="font-semibold text-cyan-300 tabular-nums">
                  {item.isYield
                    ? `${item.price.toFixed(2)}% APY`
                    : `$${item.price.toLocaleString('en-US', {
                        minimumFractionDigits: item.price < 10 ? 2 : 2,
                        maximumFractionDigits: item.price < 10 ? 2 : 2
                      })}`}
                </span>
                <span
                  className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                    isPositive
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-rose-500/15 text-rose-400'
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {isPositive ? '+' : ''}
                  {item.delta.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          2. STICKY GLASSMORPHIC NAVBAR
         ===================================================================== */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300 ${
          isDark
            ? 'border-slate-800/80 bg-[#07090E]/85'
            : 'border-slate-200/90 bg-white/85'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
          {/* Brand Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="focus:outline-none"
          >
            <AetherVaultLogo isDark={isDark} />
          </a>

          {/* Center Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {[
              { label: 'Yield Engine', id: 'yield-engine' },
              { label: 'Simulator', id: 'simulator' },
              { label: 'Analytics', id: 'analytics' },
              { label: 'Security', id: 'security' },
              { label: 'FAQ', id: 'faq' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`transition-colors cursor-pointer ${
                  isDark
                    ? 'text-slate-400 hover:text-emerald-400'
                    : 'text-slate-600 hover:text-emerald-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Controls: Protocol Status Pill, Theme Switcher, Wallet CTA */}
          <div className="flex items-center gap-2.5">
            <div
              className={`hidden xl:inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono ${
                isDark
                  ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-700'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Mainnet Live • 99.99% Uptime</span>
            </div>

            <button
              onClick={() => setIsDark((prev) => !prev)}
              aria-label="Toggle color mode"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Obsidian Dark Mode'}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition cursor-pointer ${
                isDark
                  ? 'border-slate-800 bg-slate-900/90 text-amber-400 hover:border-slate-700'
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setWalletModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-cyan-400 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Wallet className="h-4 w-4" />
              <span>
                {connectedWallet ? connectedWallet.address : 'Launch App / Connect'}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation"
              className={`lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border ${
                isDark
                  ? 'border-slate-800 bg-slate-900 text-slate-300'
                  : 'border-slate-200 bg-slate-100 text-slate-700'
              }`}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden border-t px-4 pt-3 pb-5 space-y-2 ${
              isDark ? 'border-slate-800 bg-[#07090E]' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Mainnet Live • 99.99% Uptime
            </div>
            {[
              { label: 'Yield Engine', id: 'yield-engine' },
              { label: 'Simulator', id: 'simulator' },
              { label: 'Analytics', id: 'analytics' },
              { label: 'Security', id: 'security' },
              { label: 'FAQ', id: 'faq' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium ${
                  isDark
                    ? 'text-slate-300 hover:bg-slate-900'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* =====================================================================
          3. HERO SECTION WITH ANIMATED STAT COUNTERS & INTERACTIVE TREASURY CARD
         ===================================================================== */}
      <section
        id="yield-engine"
        className="relative overflow-hidden pt-12 pb-20 sm:pt-18 sm:pb-28 scroll-mt-16"
      >
        {/* Ambient Institutional Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-28 -z-10 flex justify-center overflow-hidden"
        >
          <div
            className={`h-[440px] w-[900px] rounded-full blur-3xl opacity-25 ${
              isDark
                ? 'bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500'
                : 'bg-gradient-to-tr from-emerald-200 via-teal-100 to-cyan-200'
            }`}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Institutional Value Prop & Animated KPIs */}
            <div className="lg:col-span-7 space-y-6">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-mono font-medium ${
                  isDark
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Chainlink Proof-of-Reserve • Real-Time Attested</span>
              </div>

              <h1
                className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.08] ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}
              >
                Institutional-Grade On-Chain Yield,{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Engineered for Precision.
                </span>
              </h1>

              <p
                className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Deploy treasury capital into delta-neutral liquidity vaults and sovereign US T-Bill backed strategies with real-time cryptographic proof of reserves, automated risk guardrails, and instant atomic liquidity.
              </p>

              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-1">
                <button
                  onClick={() => scrollToSection('simulator')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 hover:from-emerald-400 hover:to-cyan-400 transition-all cursor-pointer"
                >
                  <Sliders className="h-4 w-4" />
                  Simulate Treasury Yield
                </button>

                <button
                  onClick={() => setWalletModalOpen(true)}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold transition-all cursor-pointer ${
                    isDark
                      ? 'border-slate-800 bg-slate-900/90 text-slate-200 hover:border-emerald-500/40 hover:bg-slate-900'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <Wallet className="h-4 w-4 text-emerald-400" />
                  {connectedWallet ? 'Manage Vaults' : 'Connect Institutional Wallet'}
                </button>
              </div>

              {/* 4 Animated Stat Counters */}
              <div
                className={`grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t ${
                  isDark ? 'border-slate-800/80' : 'border-slate-200'
                }`}
              >
                <div>
                  <div className="text-xs font-mono uppercase text-slate-400">
                    Total Value Locked
                  </div>
                  <div
                    className={`mt-1 text-2xl font-extrabold font-mono ${
                      isDark ? 'text-white' : 'text-slate-950'
                    }`}
                  >
                    <AnimatedStat target={1.48} prefix="$" suffix="B+" decimals={2} />
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase text-slate-400">
                    Avg Net APY
                  </div>
                  <div className="mt-1 text-2xl font-extrabold font-mono text-emerald-400">
                    <AnimatedStat target={11.42} suffix="%" decimals={2} />
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase text-slate-400">
                    Active Vaults
                  </div>
                  <div
                    className={`mt-1 text-2xl font-extrabold font-mono ${
                      isDark ? 'text-white' : 'text-slate-950'
                    }`}
                  >
                    <AnimatedStat target={34} decimals={0} />
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase text-slate-400">
                    Security Record
                  </div>
                  <div className="mt-1 text-lg sm:text-xl font-extrabold font-mono text-cyan-400">
                    0 Exploits
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Vault Allocation & Proof-of-Reserve Card */}
            <div className="lg:col-span-5">
              <div
                className={`rounded-2xl border p-5 sm:p-6 shadow-2xl transition-colors ${
                  isDark
                    ? 'border-slate-800 bg-[#0C101A]/95 shadow-emerald-950/20'
                    : 'border-slate-200 bg-white shadow-slate-200/70'
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/40">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                      Live Proof-of-Reserve
                    </span>
                    <h2
                      className={`text-base font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Vault Allocation Engine
                    </h2>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-mono font-semibold ${
                      isDark
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                        : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                    }`}
                  >
                    {activeHeroVault.badge}
                  </span>
                </div>

                {/* 3 Strategy Switcher Tabs */}
                <div
                  className={`mt-4 grid grid-cols-3 gap-1.5 rounded-xl p-1 ${
                    isDark ? 'bg-slate-950 border border-slate-800/80' : 'bg-slate-100'
                  }`}
                >
                  {[
                    { id: 'delta-eth', label: 'Delta ETH' },
                    { id: 'tbill-rwa', label: 'US T-Bills' },
                    { id: 'multi-stable', label: 'Stablecoin' }
                  ].map((tab) => {
                    const active = selectedHeroVault === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedHeroVault(tab.id)}
                        className={`rounded-lg py-2 px-2 text-xs font-bold transition-all cursor-pointer ${
                          active
                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-sm'
                            : isDark
                            ? 'text-slate-400 hover:text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Live APY & Collateral Metrics */}
                <div className="mt-5 grid grid-cols-3 gap-2.5">
                  <div
                    className={`rounded-xl border p-3 ${
                      isDark
                        ? 'border-slate-800/90 bg-slate-900/50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="text-[11px] text-slate-400">Net APY</div>
                    <div className="mt-1 text-lg sm:text-xl font-extrabold font-mono text-emerald-400">
                      {activeHeroVault.apy.toFixed(2)}%
                    </div>
                  </div>

                  <div
                    className={`rounded-xl border p-3 ${
                      isDark
                        ? 'border-slate-800/90 bg-slate-900/50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="text-[11px] text-slate-400">Collateral</div>
                    <div className="mt-1 text-lg sm:text-xl font-extrabold font-mono text-cyan-400">
                      {activeHeroVault.collateralRatio}
                    </div>
                  </div>

                  <div
                    className={`rounded-xl border p-3 ${
                      isDark
                        ? 'border-slate-800/90 bg-slate-900/50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="text-[11px] text-slate-400">Reserves</div>
                    <div
                      className={`mt-1 text-lg sm:text-xl font-extrabold font-mono ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {activeHeroVault.reserves}
                    </div>
                  </div>
                </div>

                {/* Animated SVG Ring Chart + Allocation Breakdown */}
                <div className="mt-5 flex flex-col sm:flex-row items-center gap-5">
                  {/* SVG Donut Ring */}
                  <div className="relative h-32 w-32 shrink-0">
                    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke={isDark ? '#1E293B' : '#E2E8F0'}
                        strokeWidth="11"
                      />
                      {(() => {
                        const circumference = 2 * Math.PI * 38;
                        let cumulativePct = 0;
                        return activeHeroVault.allocation.map((slice, i) => {
                          const strokeDasharray = `${
                            (slice.pct / 100) * circumference
                          } ${circumference}`;
                          const strokeDashoffset = -(cumulativePct / 100) * circumference;
                          cumulativePct += slice.pct;
                          return (
                            <circle
                              key={i}
                              cx="50"
                              cy="50"
                              r="38"
                              fill="transparent"
                              stroke={slice.color}
                              strokeWidth="11"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              className="transition-all duration-500"
                            />
                          );
                        });
                      })()}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-mono uppercase text-slate-400">
                        Backed
                      </span>
                      <span
                        className={`text-sm font-extrabold font-mono ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        100% PoR
                      </span>
                    </div>
                  </div>

                  {/* Allocation Legend */}
                  <div className="w-full space-y-2.5">
                    {activeHeroVault.allocation.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-2 font-medium">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            {item.label}
                          </span>
                          <span className="font-mono font-bold">{item.pct}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/40">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${item.pct}%`,
                              backgroundColor: item.color
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Yield Performance Sparkline */}
                <div
                  className={`mt-5 rounded-xl border p-3 ${
                    isDark
                      ? 'border-slate-800/80 bg-slate-950/70'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                    <span>30-Day Cumulative Yield Index</span>
                    <span className="text-emerald-400">+{activeHeroVault.apy}% Ann.</span>
                  </div>
                  <svg viewBox="0 0 240 44" className="w-full h-10 overflow-visible">
                    <defs>
                      <linearGradient id="heroSparkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {(() => {
                      const pts = activeHeroVault.sparkline;
                      const minS = Math.min(...pts);
                      const maxS = Math.max(...pts);
                      const coords = pts.map((v, i) => {
                        const x = (i / (pts.length - 1)) * 240;
                        const y = 38 - ((v - minS) / (maxS - minS || 1)) * 32;
                        return `${x.toFixed(1)},${y.toFixed(1)}`;
                      });
                      const lineD = `M ${coords.join(' L ')}`;
                      const areaD = `${lineD} L 240,44 L 0,44 Z`;
                      return (
                        <>
                          <path d={areaD} fill="url(#heroSparkGrad)" />
                          <path
                            d={lineD}
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                        </>
                      );
                    })()}
                  </svg>
                </div>

                {/* Footer Verification Bar */}
                <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="truncate">{activeHeroVault.auditHash}</span>
                  <button
                    onClick={() =>
                      showToast(`Attestation verified for ${activeHeroVault.title}`)
                    }
                    className="inline-flex items-center gap-1 text-emerald-400 hover:underline shrink-0 ml-2 cursor-pointer"
                  >
                    Verify <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. INTERACTIVE ROI & COMPOUND YIELD CALCULATOR ("YIELD SIMULATOR")
         ===================================================================== */}
      <section
        id="simulator"
        className={`py-20 sm:py-28 border-t scroll-mt-16 ${
          isDark
            ? 'border-slate-800/80 bg-[#090D16]'
            : 'border-slate-200 bg-white'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection className="mx-auto max-w-2xl text-center mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-400">
              Interactive Treasury Simulator
            </span>
            <h2
              className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}
            >
              Model Compound On-Chain Yield in Real Time
            </h2>
            <p
              className={`mt-3 text-sm sm:text-base ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Adjust capital allocation, duration, strategy risk tier, and compounding cadence to benchmark AetherVault against traditional corporate banking yields.
            </p>
          </RevealSection>

          <RevealSection>
            <div
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl border p-6 sm:p-8 lg:p-10 shadow-2xl ${
                isDark
                  ? 'border-slate-800 bg-[#0C101A]'
                  : 'border-slate-200 bg-slate-50/70'
              }`}
            >
              {/* Left Controls Panel (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* 1. Initial Deposit Slider + Quick Presets */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Initial Treasury Deposit
                    </label>
                    <span className="text-lg font-extrabold font-mono text-emerald-400">
                      {formatUSD(initialDeposit)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={1000000}
                    step={1000}
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-2 rounded-lg bg-slate-800"
                  />
                  <div className="mt-2.5 grid grid-cols-4 gap-2">
                    {[10000, 50000, 250000, 1000000].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setInitialDeposit(preset)}
                        className={`rounded-lg py-1.5 text-xs font-mono font-semibold border transition cursor-pointer ${
                          initialDeposit === preset
                            ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400'
                            : isDark
                            ? 'border-slate-800 bg-slate-900/70 text-slate-400 hover:text-white'
                            : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {preset >= 1000000 ? '$1M' : `$${preset / 1000}K`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Staking Duration Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Allocation Horizon
                    </label>
                    <span className="text-base font-extrabold font-mono text-cyan-400">
                      {durationMonths} {durationMonths === 1 ? 'Month' : 'Months'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={36}
                    step={1}
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer h-2 rounded-lg bg-slate-800"
                  />
                  <div className="mt-1 flex justify-between text-[11px] font-mono text-slate-500">
                    <span>1 Mo</span>
                    <span>12 Mos</span>
                    <span>24 Mos</span>
                    <span>36 Mos</span>
                  </div>
                </div>

                {/* 3. Strategy Risk Tier Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                    Strategy Risk Tier
                  </label>
                  <div className="space-y-2">
                    {Object.values(strategyTiers).map((tier) => {
                      const active = riskTier === tier.id;
                      return (
                        <button
                          key={tier.id}
                          onClick={() => setRiskTier(tier.id)}
                          className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all cursor-pointer ${
                            active
                              ? isDark
                                ? 'border-emerald-500 bg-emerald-500/10'
                                : 'border-emerald-600 bg-emerald-50'
                              : isDark
                              ? 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold">{tier.name}</div>
                            <div className="text-xs text-slate-400">{tier.tag}</div>
                          </div>
                          <div className={`text-base font-extrabold font-mono ${tier.accent}`}>
                            {tier.apy.toFixed(1)}% APY
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Compounding Frequency Toggle */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Auto-Compounding Frequency
                  </label>
                  <div
                    className={`grid grid-cols-3 gap-1.5 rounded-xl p-1 ${
                      isDark ? 'bg-slate-950 border border-slate-800' : 'bg-slate-200/70'
                    }`}
                  >
                    {[
                      { id: 'daily', label: 'Daily (Auto)' },
                      { id: 'monthly', label: 'Monthly' },
                      { id: 'none', label: 'Simple (None)' }
                    ].map((freq) => (
                      <button
                        key={freq.id}
                        onClick={() => setCompoundFreq(freq.id)}
                        className={`rounded-lg py-2 text-xs font-bold transition cursor-pointer ${
                          compoundFreq === freq.id
                            ? 'bg-emerald-500 text-slate-950 shadow-sm'
                            : isDark
                            ? 'text-slate-400 hover:text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {freq.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Output KPIs & Dynamic SVG Growth Chart (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                {/* 3 Dynamic Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div
                    className={`rounded-2xl border p-4 ${
                      isDark
                        ? 'border-emerald-500/30 bg-emerald-950/20'
                        : 'border-emerald-200 bg-emerald-50/70'
                    }`}
                  >
                    <div className="text-xs font-mono text-slate-400">
                      Projected Total Value
                    </div>
                    <div
                      className={`mt-1.5 text-2xl font-extrabold font-mono ${
                        isDark ? 'text-white' : 'text-slate-950'
                      }`}
                    >
                      {formatUSD(finalProjection.total)}
                    </div>
                    <div className="mt-1 text-[11px] font-mono text-emerald-400">
                      After {durationMonths} months
                    </div>
                  </div>

                  <div
                    className={`rounded-2xl border p-4 ${
                      isDark
                        ? 'border-slate-800 bg-slate-900/60'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="text-xs font-mono text-slate-400">Net Yield Earned</div>
                    <div className="mt-1.5 text-2xl font-extrabold font-mono text-emerald-400">
                      +{formatUSD(finalProjection.yieldEarned)}
                    </div>
                    <div className="mt-1 text-[11px] font-mono text-cyan-400">
                      +{((finalProjection.yieldEarned / initialDeposit) * 100).toFixed(1)}% ROI
                    </div>
                  </div>

                  <div
                    className={`rounded-2xl border p-4 ${
                      isDark
                        ? 'border-slate-800 bg-slate-900/60'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="text-xs font-mono text-slate-400">
                      vs. TradFi Bank (0.45%)
                    </div>
                    <div className="mt-1.5 text-2xl font-extrabold font-mono text-cyan-400">
                      +{formatUSD(bankAdvantage)}
                    </div>
                    <div className="mt-1 text-[11px] font-mono text-slate-400">
                      Extra Alpha Generated
                    </div>
                  </div>
                </div>

                {/* Custom Interactive SVG Area Growth Chart */}
                <div
                  className={`relative rounded-2xl border p-4 sm:p-5 ${
                    isDark
                      ? 'border-slate-800 bg-[#080B12]'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        Projected Balance
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <span className="h-0.5 w-4 bg-cyan-400 inline-block border-t border-dashed border-cyan-400" />
                        Initial Principal
                      </span>
                    </div>

                    {/* Interactive Tooltip Readout */}
                    <div className="text-xs font-mono text-emerald-400">
                      {hoveredChartPoint
                        ? `Month ${hoveredChartPoint.month}: ${formatUSD(
                            hoveredChartPoint.total
                          )} (+${formatUSD(hoveredChartPoint.yieldEarned)})`
                        : 'Hover chart for monthly breakdown'}
                    </div>
                  </div>

                  <svg
                    viewBox={`0 0 ${simChartWidth} ${simChartHeight}`}
                    className="w-full h-56 overflow-visible select-none"
                    onMouseLeave={() => setHoveredChartPoint(null)}
                  >
                    <defs>
                      <linearGradient id="yieldAreaFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid Lines */}
                    {[0.2, 0.5, 0.8].map((ratio, idx) => (
                      <line
                        key={idx}
                        x1={simPadLeft}
                        x2={simChartWidth - simPadRight}
                        y1={simChartHeight * ratio}
                        y2={simChartHeight * ratio}
                        stroke={isDark ? '#1E293B' : '#E2E8F0'}
                        strokeDasharray="3 3"
                      />
                    ))}

                    {/* Shaded Compound Growth Area */}
                    <path d={simChartGeometry.areaPath} fill="url(#yieldAreaFill)" />

                    {/* Principal Baseline Dashed Line */}
                    <path
                      d={simChartGeometry.principalLinePath}
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="1.8"
                      strokeDasharray="5 5"
                    />

                    {/* Compound Total Balance Line */}
                    <path
                      d={simChartGeometry.totalLinePath}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Hover Crosshair & Active Point */}
                    {hoveredChartPoint && (
                      <g>
                        <line
                          x1={hoveredChartPoint.x}
                          x2={hoveredChartPoint.x}
                          y1={simPadTop}
                          y2={simChartHeight - simPadBottom}
                          stroke="#10B981"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                        />
                        <circle
                          cx={hoveredChartPoint.x}
                          cy={hoveredChartPoint.yTotal}
                          r="6"
                          fill="#10B981"
                          stroke="#07090E"
                          strokeWidth="2"
                        />
                      </g>
                    )}

                    {/* Invisible Hover Columns for Smooth Scrubbing */}
                    {simChartGeometry.coords.map((pt, idx) => {
                      const colW = simChartWidth / simChartGeometry.coords.length;
                      return (
                        <rect
                          key={idx}
                          x={pt.x - colW / 2}
                          y={0}
                          width={colW}
                          height={simChartHeight}
                          fill="transparent"
                          className="cursor-crosshair"
                          onMouseEnter={() => setHoveredChartPoint(pt)}
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* Action Footer inside Simulator */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                  <p className="text-xs text-slate-400">
                    Yields are net of 0.10% protocol performance fee. Instant atomic exit supported.
                  </p>
                  <button
                    onClick={() =>
                      connectedWallet
                        ? showToast(
                            `Simulated ${formatUSD(initialDeposit)} deposit into ${
                              selectedTier.name
                            }`
                          )
                        : setWalletModalOpen(true)
                    }
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 hover:bg-emerald-400 transition cursor-pointer shrink-0"
                  >
                    Deploy {formatUSD(initialDeposit)} Position
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* =====================================================================
          5. CLEAN DATA VISUALIZATION CARDS (BENTO ANALYTICS GRID)
         ===================================================================== */}
      <section id="analytics" className="py-20 sm:py-28 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection className="mx-auto max-w-2xl text-center mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
              On-Chain Telemetry & Security
            </span>
            <h2
              className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}
            >
              Transparent Protocol Liquidity & Audit Matrix
            </h2>
            <p
              className={`mt-3 text-sm sm:text-base ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Every basis point of yield, cross-chain liquidity allocation, and smart contract attestation is verifiable on-chain in real time.
            </p>
          </RevealSection>

          {/* 2x2 Asymmetric Bento Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* CARD 1 (7 Cols): Real-Time TVL & Protocol Revenue Multi-Line SVG Chart */}
            <RevealSection className="lg:col-span-7">
              <div
                className={`h-full rounded-2xl border p-6 sm:p-7 transition-all hover:border-emerald-500/40 ${
                  isDark
                    ? 'border-slate-800 bg-[#0C101A]'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                      <BarChart3 className="h-4 w-4" />
                      <span>Protocol Liquidity & Fee Revenue</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <h3
                        className={`text-2xl sm:text-3xl font-extrabold font-mono ${
                          isDark ? 'text-white' : 'text-slate-950'
                        }`}
                      >
                        {tvlHoverIdx !== null
                          ? `$${tvlGeometry.pts[tvlHoverIdx].val.toFixed(1)}M`
                          : currentTvlData.tvl}
                      </h3>
                      <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-400">
                        {currentTvlData.delta}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-mono text-slate-400">
                      Cumulative Protocol Revenue:{' '}
                      <span className="text-cyan-400 font-semibold">
                        {currentTvlData.revenue}
                      </span>
                    </p>
                  </div>

                  {/* Timeframe Tabs (24H, 7D, 30D, ALL) */}
                  <div
                    className={`inline-flex rounded-xl border p-1 ${
                      isDark
                        ? 'border-slate-800 bg-slate-950'
                        : 'border-slate-200 bg-slate-100'
                    }`}
                  >
                    {['24H', '7D', '30D', 'ALL'].map((tf) => (
                      <button
                        key={tf}
                        onClick={() => {
                          setTvlTimeframe(tf);
                          setTvlHoverIdx(null);
                        }}
                        className={`rounded-lg px-2.5 py-1 text-xs font-mono font-bold transition cursor-pointer ${
                          tvlTimeframe === tf
                            ? 'bg-emerald-500 text-slate-950'
                            : isDark
                            ? 'text-slate-400 hover:text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive SVG Area Chart with Hover Crosshair */}
                <div className="mt-6">
                  <svg
                    viewBox={`0 0 ${tvlChartWidth} ${tvlChartHeight}`}
                    className="w-full h-48 overflow-visible"
                    onMouseLeave={() => setTvlHoverIdx(null)}
                  >
                    <defs>
                      <linearGradient id="tvlBentoGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.32" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    <path d={tvlGeometry.area} fill="url(#tvlBentoGrad)" />
                    <path
                      d={tvlGeometry.line}
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />

                    {/* Crosshair & Data Node */}
                    {tvlHoverIdx !== null && tvlGeometry.pts[tvlHoverIdx] && (
                      <g>
                        <line
                          x1={tvlGeometry.pts[tvlHoverIdx].x}
                          x2={tvlGeometry.pts[tvlHoverIdx].x}
                          y1={12}
                          y2={tvlChartHeight - 16}
                          stroke="#06B6D4"
                          strokeDasharray="3 3"
                        />
                        <circle
                          cx={tvlGeometry.pts[tvlHoverIdx].x}
                          cy={tvlGeometry.pts[tvlHoverIdx].y}
                          r="5.5"
                          fill="#06B6D4"
                          stroke="#07090E"
                          strokeWidth="2"
                        />
                      </g>
                    )}

                    {/* X-Axis Labels + Hover Zones */}
                    {tvlGeometry.pts.map((pt, i) => {
                      const sliceW = tvlChartWidth / tvlGeometry.pts.length;
                      return (
                        <g key={i}>
                          <text
                            x={pt.x}
                            y={tvlChartHeight}
                            textAnchor="middle"
                            className="fill-slate-500 text-[10px] font-mono"
                          >
                            {pt.label}
                          </text>
                          <rect
                            x={pt.x - sliceW / 2}
                            y={0}
                            width={sliceW}
                            height={tvlChartHeight}
                            fill="transparent"
                            className="cursor-crosshair"
                            onMouseEnter={() => setTvlHoverIdx(i)}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </RevealSection>

            {/* CARD 2 (5 Cols): Cross-Chain Liquidity Distribution */}
            <RevealSection delay={100} className="lg:col-span-5">
              <div
                className={`h-full flex flex-col justify-between rounded-2xl border p-6 sm:p-7 transition-all hover:border-cyan-500/40 ${
                  isDark
                    ? 'border-slate-800 bg-[#0C101A]'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                      <PieChart className="h-4 w-4" />
                      Cross-Chain Liquidity
                    </span>
                    <span className="text-xs font-mono text-slate-400">4 Networks</span>
                  </div>
                  <h3
                    className={`text-xl font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Multi-Chain TVL Distribution
                  </h3>

                  {/* Interactive Chain Filter Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {['ALL', 'Ethereum', 'Arbitrum', 'Base', 'Solana'].map((chain) => (
                      <button
                        key={chain}
                        onClick={() => setSelectedChainFilter(chain)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-mono font-semibold transition cursor-pointer ${
                          selectedChainFilter === chain
                            ? 'bg-cyan-500 text-slate-950'
                            : isDark
                            ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {chain}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stacked Proportional Bar */}
                <div className="my-5">
                  <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-800/40 gap-0.5">
                    {chainAllocations.map((c) => (
                      <div
                        key={c.id}
                        style={{
                          width: `${c.share}%`,
                          backgroundColor: c.color,
                          opacity:
                            selectedChainFilter === 'ALL' || selectedChainFilter === c.id
                              ? 1
                              : 0.25
                        }}
                        className="h-full transition-all duration-300"
                      />
                    ))}
                  </div>
                </div>

                {/* Chain Breakdown Rows */}
                <div className="space-y-3">
                  {visibleChains.map((chain) => (
                    <div
                      key={chain.id}
                      className={`flex items-center justify-between rounded-xl border p-3 ${
                        isDark
                          ? 'border-slate-800/90 bg-slate-950/60'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: chain.color }}
                        />
                        <div>
                          <div className="text-xs sm:text-sm font-bold">{chain.name}</div>
                          <div className="text-[11px] font-mono text-slate-400">
                            Share: {chain.share}%
                          </div>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-xs sm:text-sm font-bold">{chain.tvl}</div>
                        <div className="text-[11px] text-emerald-400">{chain.apy} APY</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>

            {/* CARD 3 (5 Cols): Smart Contract Security & Audit Matrix */}
            <RevealSection delay={150} id="security" className="lg:col-span-5 scroll-mt-20">
              <div
                className={`h-full flex flex-col justify-between rounded-2xl border p-6 sm:p-7 transition-all hover:border-emerald-500/40 ${
                  isDark
                    ? 'border-slate-800 bg-[#0C101A]'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Zero-Exploit Security Architecture</span>
                  </div>
                  <h3
                    className={`text-xl font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Formal Verification & Audit Matrix
                  </h3>

                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    {[
                      {
                        title: 'Certora Prover',
                        sub: 'Formal Math Verification',
                        status: '100% Passed'
                      },
                      {
                        title: 'OpenZeppelin',
                        sub: 'Core Vaults v2.4 Audit',
                        status: '0 Criticals'
                      },
                      {
                        title: 'Immunefi Bounty',
                        sub: 'Active Whitehat Pool',
                        status: '$5,000,000'
                      },
                      {
                        title: '48h Timelock',
                        sub: '7-of-11 Institutional Safe',
                        status: 'Enforced'
                      }
                    ].map((badge, bIdx) => (
                      <div
                        key={bIdx}
                        className={`group rounded-xl border p-3 transition-all hover:-translate-y-0.5 hover:border-emerald-500/50 ${
                          isDark
                            ? 'border-slate-800 bg-slate-950/70'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{badge.title}</span>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="mt-1 text-[11px] text-slate-400">{badge.sub}</div>
                        <div className="mt-2 inline-block rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                          {badge.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive On-Chain Reserve Verification Box */}
                <div
                  className={`mt-5 rounded-xl border p-3.5 ${
                    isDark
                      ? 'border-emerald-500/25 bg-emerald-950/15'
                      : 'border-emerald-200 bg-emerald-50/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                    <span className="text-slate-400">Latest Attested Block:</span>
                    <span className="font-bold text-emerald-400">
                      #{reserveVerifiedBlock}
                    </span>
                  </div>
                  <button
                    onClick={handleVerifyOnChainReserve}
                    disabled={verifyingReserve}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 disabled:opacity-60 transition cursor-pointer"
                  >
                    <RefreshCw
                      className={`h-3.5 w-3.5 ${verifyingReserve ? 'animate-spin' : ''}`}
                    />
                    {verifyingReserve
                      ? 'Querying Chainlink PoR Oracle...'
                      : 'Verify On-Chain Reserve'}
                  </button>
                </div>
              </div>
            </RevealSection>

            {/* CARD 4 (7 Cols): Live Institutional Vault Transaction Feed */}
            <RevealSection delay={200} className="lg:col-span-7">
              <div
                className={`h-full flex flex-col justify-between rounded-2xl border p-6 sm:p-7 transition-all hover:border-cyan-500/40 ${
                  isDark
                    ? 'border-slate-800 bg-[#0C101A]'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                        <Terminal className="h-4 w-4" />
                        <span>Real-Time Settlement Stream</span>
                      </div>
                      <h3
                        className={`text-xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        Live Institutional Vault Activity
                      </h3>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-xs font-mono font-semibold text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      Streaming Blocks
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {vaultTxs.map((tx, idx) => (
                      <div
                        key={`${tx.hash}-${idx}`}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border p-3.5 transition-all ${
                          isDark
                            ? 'border-slate-800/90 bg-slate-950/65 hover:border-slate-700'
                            : 'border-slate-200 bg-slate-50/80'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                            <Activity className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-bold">
                                {tx.type}
                              </span>
                              <span
                                className={`rounded px-1.5 py-0.5 text-[10px] font-mono ${
                                  isDark
                                    ? 'bg-slate-800 text-cyan-300'
                                    : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {tx.chain}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              {tx.vault} •{' '}
                              <button
                                onClick={() =>
                                  showToast(`Copied explorer hash ${tx.hash}`)
                                }
                                className="inline-flex items-center gap-1 font-mono text-slate-400 hover:text-emerald-400 cursor-pointer"
                              >
                                {tx.hash} <Copy className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between pl-12 sm:pl-0 font-mono">
                          <span className="text-xs sm:text-sm font-extrabold text-emerald-400">
                            {tx.amount}
                          </span>
                          <span className="text-[11px] text-slate-500">{tx.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/40 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>All settlements verified on Etherscan / Arbiscan</span>
                  <button
                    onClick={() =>
                      showToast('Connected to AetherVault Public Subgraph API')
                    }
                    className="inline-flex items-center gap-1 text-cyan-400 hover:underline cursor-pointer"
                  >
                    Subgraph API <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. FAQ ACCORDION & INSTITUTIONAL FOOTER
         ===================================================================== */}
      <section
        id="faq"
        className={`py-20 sm:py-28 border-t scroll-mt-16 ${
          isDark
            ? 'border-slate-800/80 bg-[#090D16]'
            : 'border-slate-200 bg-white'
        }`}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-400">
              Risk, Custody & Protocol Mechanics
            </span>
            <h2
              className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}
            >
              Institutional Due Diligence FAQ
            </h2>
          </RevealSection>

          <div className="space-y-3.5">
            {faqList.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <RevealSection key={idx} delay={idx * 60}>
                  <div
                    className={`overflow-hidden rounded-2xl border transition-colors ${
                      isDark
                        ? 'border-slate-800 bg-[#0C101A]'
                        : 'border-slate-200 bg-slate-50/70'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm sm:text-base font-bold cursor-pointer"
                    >
                      <span className={isDark ? 'text-slate-100' : 'text-slate-900'}>
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-emerald-400 shrink-0 transition-transform duration-300 ${
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
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {item.a}
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

      {/* Institutional Conversion Banner + Footer */}
      <footer
        className={`border-t pt-16 pb-12 ${
          isDark
            ? 'border-slate-800/90 bg-[#05070B]'
            : 'border-slate-200 bg-slate-100'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-[#0B1922] to-slate-900 p-8 sm:p-12 text-white shadow-2xl mb-16">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
                <div className="max-w-xl">
                  <span className="inline-block rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 text-xs font-mono text-emerald-300 mb-3">
                    Non-Custodial • Audited • 24/7 Liquidity
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Put Idle On-Chain Treasury Capital to Work
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-300">
                    Onboard your DAO treasury, family office, or institutional fund with deterministic risk controls and real-time proof of reserves.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setWalletModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg hover:from-emerald-400 hover:to-cyan-400 transition cursor-pointer"
                  >
                    <Wallet className="h-4 w-4" />
                    Launch Institutional App
                  </button>
                  <button
                    onClick={() => scrollToSection('simulator')}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/70 px-6 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition cursor-pointer"
                  >
                    Open Yield Simulator
                  </button>
                </div>
              </div>
            </div>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800/50">
            <div className="col-span-2">
              <AetherVaultLogo isDark={isDark} />
              <p
                className={`mt-4 max-w-xs text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Institutional on-chain yield infrastructure combining delta-neutral basis vaults with sovereign tokenized US Treasury bills.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Chainlink PoR Active • Block #{reserveVerifiedBlock}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3">
                Vault Strategies
              </h4>
              <ul
                className={`space-y-2.5 text-xs sm:text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                <li>
                  <button onClick={() => scrollToSection('yield-engine')} className="hover:text-emerald-400">
                    Delta-Neutral ETH
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('yield-engine')} className="hover:text-emerald-400">
                    Tokenized US T-Bills
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('yield-engine')} className="hover:text-emerald-400">
                    Multi-Chain Stable
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('simulator')} className="hover:text-emerald-400">
                    ROI Calculator
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3">
                Transparency
              </h4>
              <ul
                className={`space-y-2.5 text-xs sm:text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                <li>
                  <button onClick={() => scrollToSection('analytics')} className="hover:text-emerald-400">
                    Proof of Reserves
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('security')} className="hover:text-emerald-400">
                    Certora & OpenZeppelin
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('security')} className="hover:text-emerald-400">
                    Immunefi $5M Bounty
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('analytics')} className="hover:text-emerald-400">
                    Subgraph Telemetry
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3">
                Governance
              </h4>
              <ul
                className={`space-y-2.5 text-xs sm:text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                <li>
                  <a href="#top" onClick={(e) => e.preventDefault()} className="hover:text-emerald-400">
                    Institutional KYC / KYB
                  </a>
                </li>
                <li>
                  <a href="#top" onClick={(e) => e.preventDefault()} className="hover:text-emerald-400">
                    Risk Framework
                  </a>
                </li>
                <li>
                  <a href="#top" onClick={(e) => e.preventDefault()} className="hover:text-emerald-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#top" onClick={(e) => e.preventDefault()} className="hover:text-emerald-400">
                    Disclosures
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <p>© {new Date().getFullYear()} AetherVault Protocol (aethervault.finance).</p>
            <p>Institutional DeFi & RWA Infrastructure</p>
          </div>
        </div>
      </footer>
    </div>
  );
}