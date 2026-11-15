import React, { useState, useEffect, useMemo } from 'react';
import {
  Activity,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  Layers,
  Lock,
  RefreshCw,
  ShieldCheck,
  Terminal,
  Wallet,
  X
} from 'lucide-react';

/**
 * Vault strategy definitions for the split-pane yield terminal.
 */
const VAULT_STRATEGIES = [
  {
    id: 'dn-eth',
    code: 'AV-DNETH-01',
    name: 'Delta-Neutral ETH',
    apy: 14.2,
    benchmarkApy: 4.2,
    riskTier: 'TIER-1 // HEDGED BASIS',
    chain: 'Ethereum / Arbitrum',
    capacityPct: 84,
    capLimit: '$650.0M',
    custody: 'Fireblocks MPC + Copper ClearLoop',
    description:
      'Spot staked wstETH paired with 1x inverse perpetual short across CME & Tier-1 venues to capture funding rate spread with zero directional ETH delta.'
  },
  {
    id: 'us-tbill',
    code: 'AV-USTB-02',
    name: 'Tokenized US T-Bills',
    apy: 5.35,
    benchmarkApy: 4.2,
    riskTier: 'SOVEREIGN // 0–3M BILLS',
    chain: 'Ethereum / Base',
    capacityPct: 92,
    capLimit: '$800.0M',
    custody: 'BNY Mellon Custodial SPV',
    description:
      'Direct bankruptcy-remote exposure to short-duration U.S. Treasury Bills with instant T+0 atomic USDC redemptions 24/7/365.'
  },
  {
    id: 'mc-stable',
    code: 'AV-STBL-03',
    name: 'Multi-Chain Stablecoin',
    apy: 9.8,
    benchmarkApy: 4.2,
    riskTier: 'LOW-VOL // OVERCOLLATERALIZED',
    chain: 'Arbitrum / Base / Solana',
    capacityPct: 76,
    capLimit: '$400.0M',
    custody: 'Gnosis Safe 5-of-8 HSM',
    description:
      'Algorithmic liquidity routing across Aave v3, Morpho Blue, and Kamino institutional credit pools with automated LTV circuit breakers.'
  },
  {
    id: 'btc-basis',
    code: 'AV-BTCB-04',
    name: 'BTC Basis Carry',
    apy: 11.6,
    benchmarkApy: 4.2,
    riskTier: 'TIER-1 // CME FUTURES',
    chain: 'Ethereum',
    capacityPct: 68,
    capLimit: '$350.0M',
    custody: 'Anchorage Digital Bank',
    description:
      'Captures annualized quarterly futures premium on institutional BTC spot holdings with automated margin health rebalancing.'
  }
];

/**
 * Multi-timeframe historical TVL & Cumulative Protocol Revenue series.
 */
const TVL_TIMEFRAMES = {
  '24H': {
    label: '24H INTRADAY TELEMETRY',
    delta: '+$18.42M (+1.02%)',
    points: [
      { t: '00:00', tvl: 1802.1, rev: 142.4 },
      { t: '03:00', tvl: 1805.8, rev: 144.1 },
      { t: '06:00', tvl: 1804.2, rev: 145.9 },
      { t: '09:00', tvl: 1809.6, rev: 148.2 },
      { t: '12:00', tvl: 1813.4, rev: 150.8 },
      { t: '15:00', tvl: 1811.9, rev: 152.3 },
      { t: '18:00', tvl: 1816.7, rev: 154.9 },
      { t: '21:00', tvl: 1819.1, rev: 157.2 },
      { t: 'NOW', tvl: 1820.5, rev: 159.6 }
    ]
  },
  '7D': {
    label: '7D ROLLING LIQUIDITY',
    delta: '+$94.10M (+5.45%)',
    points: [
      { t: 'MON', tvl: 1726.4, rev: 118.0 },
      { t: 'TUE', tvl: 1741.8, rev: 124.5 },
      { t: 'WED', tvl: 1758.2, rev: 131.2 },
      { t: 'THU', tvl: 1772.9, rev: 138.4 },
      { t: 'FRI', tvl: 1791.5, rev: 145.9 },
      { t: 'SAT', tvl: 1806.0, rev: 152.8 },
      { t: 'SUN', tvl: 1820.5, rev: 159.6 }
    ]
  },
  '30D': {
    label: '30D INSTITUTIONAL INFLOWS',
    delta: '+$312.80M (+20.74%)',
    points: [
      { t: 'D-30', tvl: 1507.7, rev: 84.2 },
      { t: 'D-25', tvl: 1548.0, rev: 95.6 },
      { t: 'D-20', tvl: 1592.4, rev: 108.1 },
      { t: 'D-15', tvl: 1645.9, rev: 120.4 },
      { t: 'D-10', tvl: 1712.3, rev: 133.7 },
      { t: 'D-05', tvl: 1768.8, rev: 146.5 },
      { t: 'NOW', tvl: 1820.5, rev: 159.6 }
    ]
  },
  ALL: {
    label: 'INCEPTION TO DATE (Q1 2024 – PRESENT)',
    delta: '+$1,695.5M (+1,356%)',
    points: [
      { t: 'Q1 24', tvl: 125.0, rev: 4.2 },
      { t: 'Q2 24', tvl: 380.4, rev: 18.9 },
      { t: 'Q3 24', tvl: 695.2, rev: 42.1 },
      { t: 'Q4 24', tvl: 1040.8, rev: 74.6 },
      { t: 'Q1 25', tvl: 1390.5, rev: 112.3 },
      { t: 'Q2 25', tvl: 1615.0, rev: 138.9 },
      { t: 'NOW', tvl: 1820.5, rev: 159.6 }
    ]
  }
};

/**
 * On-chain Proof-of-Reserve & Merkle Audit ledger rows.
 */
const RESERVE_LEDGER = [
  {
    id: 'ETH-01',
    chain: 'Ethereum',
    asset: 'wstETH / Spot ETH Reserve',
    custodian: 'Fireblocks MPC // 0x94A8...E31C',
    onChainBalance: '$642,810,400',
    liabilities: '$641,200,000',
    ratio: '100.25%',
    merkleRoot: '0x8f94c2d19b04e77a3c81054e2b99f01d4a7c3821b6059e41d2c88f7a0192b3e4'
  },
  {
    id: 'ETH-02',
    chain: 'Ethereum',
    asset: 'USYC Tokenized Treasury Bills',
    custodian: 'BNY Mellon SPV // 0x41C0...98B2',
    onChainBalance: '$518,450,000',
    liabilities: '$518,450,000',
    ratio: '100.00%',
    merkleRoot: '0x3a71e90c4f82b15d6903a1c8e74f205b9d18c63a47f02e81b5c9d34018a6f72c'
  },
  {
    id: 'ARB-01',
    chain: 'Arbitrum',
    asset: 'USDC Institutional Credit Pool',
    custodian: 'Copper ClearLoop // 0x77D2...14F9',
    onChainBalance: '$284,190,250',
    liabilities: '$283,100,000',
    ratio: '100.38%',
    merkleRoot: '0x6c28f41b90e3d75a12c84b906e3f17d8a502c94e18b73d60f2a95c418e70b13d'
  },
  {
    id: 'BASE-01',
    chain: 'Base',
    asset: 'cbBTC / USDC Basis Collateral',
    custodian: 'Coinbase Prime // 0x22E9...60A4',
    onChainBalance: '$219,640,800',
    liabilities: '$218,900,000',
    ratio: '100.34%',
    merkleRoot: '0x1d90b74e52a8c63f09e14d72b85a30c6f419e82d73b05a91c6e48f203d71a58b'
  },
  {
    id: 'SOL-01',
    chain: 'Solana',
    asset: 'USDC / JitoSOL Delta Hedge',
    custodian: 'Anchorage Digital // 9xK4...mP8v',
    onChainBalance: '$155,408,550',
    liabilities: '$154,850,000',
    ratio: '100.36%',
    merkleRoot: '0x5e43a81c70d9f26b38a15c94e02d76b8f310a94c52e81d07b6f39a241c85e09f'
  }
];

const INITIAL_FLOWS = [
  {
    ts: '19:46:52 UTC',
    type: 'DEPOSIT',
    entity: 'WINTERMUTE_INST_04',
    vault: 'AV-DNETH-01',
    amount: '+$4,250,000.00',
    tx: '0x91c4...8f2a'
  },
  {
    ts: '19:44:18 UTC',
    type: 'REBALANCE',
    entity: 'AUTO_DELTA_ORACLE',
    vault: 'AV-BTCB-04',
    amount: '$11,800,000.00',
    tx: '0x3e07...41b9'
  },
  {
    ts: '19:39:05 UTC',
    type: 'DEPOSIT',
    entity: 'GALAXY_TREASURY_DESK',
    vault: 'AV-USTB-02',
    amount: '+$8,500,000.00',
    tx: '0x74a2...c09d'
  },
  {
    ts: '19:31:44 UTC',
    type: 'YIELD_DIST',
    entity: 'MERKLE_EPOCH_412',
    vault: 'ALL_VAULTS',
    amount: '+$412,890.14',
    tx: '0x5b19...e73c'
  },
  {
    ts: '19:24:11 UTC',
    type: 'DEPOSIT',
    entity: 'BREVAN_DIGITAL_SPV',
    vault: 'AV-STBL-03',
    amount: '+$2,750,000.00',
    tx: '0x8d63...12f0'
  }
];

const INSTITUTIONAL_WALLETS = [
  {
    id: 'fireblocks',
    name: 'Fireblocks Institutional MPC',
    tag: 'API / WALLETCONNECT V2',
    clearance: 'KYB VERIFIED'
  },
  {
    id: 'coinbase',
    name: 'Coinbase Custody / Prime',
    tag: 'QUALIFIED CUSTODIAN',
    clearance: 'SOC2 TYPE II'
  },
  {
    id: 'ledger',
    name: 'Ledger Enterprise Vault',
    tag: 'HARDWARE HSM',
    clearance: 'MULTI-SIG'
  },
  {
    id: 'metamask',
    name: 'MetaMask Institutional',
    tag: 'WEB3 EXTENSION',
    clearance: 'STANDARD'
  }
];

/**
 * Currency formatting helpers for strict tabular financial alignment.
 */
function formatUSD(value, decimals = 0) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

export default function App() {
  // 1. Live Simulated Market Ticker State
  const [tickerPrices, setTickerPrices] = useState({
    eth: 3482.4,
    btc: 94210.5,
    usyc: 1.0482,
    usdcYield: 9.8,
    tvlMillions: 1820.5,
    blockHeight: 21489304
  });

  // 2. Split-Pane ROI & Compound Yield Terminal State
  const [selectedVaultId, setSelectedVaultId] = useState('dn-eth');
  const [principal, setPrincipal] = useState(250000);
  const [months, setMonths] = useState(12);
  const [cadence, setCadence] = useState('daily'); // 'daily' | 'weekly' | 'monthly'
  const [hoveredMonthIdx, setHoveredMonthIdx] = useState(null);

  // 3. Protocol TVL & Revenue Multi-Timeframe Chart State
  const [tvlTimeframe, setTvlTimeframe] = useState('30D');
  const [hoveredTvlIdx, setHoveredTvlIdx] = useState(null);

  // 4. On-Chain Proof-of-Reserve Chain Filter & Merkle Verification State
  const [chainFilter, setChainFilter] = useState('All Chains');
  const [verifyingId, setVerifyingId] = useState(null);
  const [verifiedProofs, setVerifiedProofs] = useState({});

  // 5. Institutional Wallet Modal & Allocation Execution State
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [allocationNotice, setAllocationNotice] = useState(null);

  // Live subtle market ticks every 2.8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerPrices((prev) => {
        const ethDelta = (Math.random() - 0.48) * 3.8;
        const btcDelta = (Math.random() - 0.48) * 48.0;
        const tvlDelta = (Math.random() - 0.35) * 0.45;
        return {
          eth: Number((prev.eth + ethDelta).toFixed(2)),
          btc: Number((prev.btc + btcDelta).toFixed(2)),
          usyc: 1.0482,
          usdcYield: Number((9.8 + (Math.random() - 0.5) * 0.08).toFixed(2)),
          tvlMillions: Number((prev.tvlMillions + tvlDelta).toFixed(2)),
          blockHeight: prev.blockHeight + 1
        };
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const activeVault = useMemo(
    () => VAULT_STRATEGIES.find((v) => v.id === selectedVaultId) || VAULT_STRATEGIES[0],
    [selectedVaultId]
  );

  // Compound Yield Calculation Engine
  const yieldProjection = useMemo(() => {
    const periodsPerYear =
      cadence === 'daily' ? 365 : cadence === 'weekly' ? 52 : 12;
    const rateDecimal = activeVault.apy / 100;
    const benchDecimal = activeVault.benchmarkApy / 100;

    const series = [];
    for (let m = 0; m <= months; m++) {
      const tYears = m / 12;
      const vaultBalance =
        principal * Math.pow(1 + rateDecimal / periodsPerYear, periodsPerYear * tYears);
      const benchBalance =
        principal * Math.pow(1 + benchDecimal / 12, 12 * tYears);

      series.push({
        month: m,
        vaultBalance,
        benchBalance,
        netYield: vaultBalance - principal,
        alphaDelta: vaultBalance - benchBalance
      });
    }

    const finalPoint = series[series.length - 1];
    const effectiveApy =
      (Math.pow(1 + rateDecimal / periodsPerYear, periodsPerYear) - 1) * 100;

    return {
      series,
      endingBalance: finalPoint.vaultBalance,
      projectedNetYield: finalPoint.netYield,
      alphaVsTradFi: finalPoint.alphaDelta,
      effectiveApy
    };
  }, [activeVault, principal, months, cadence]);

  // Interactive SVG Chart Geometry for ROI Terminal
  const roiChart = useMemo(() => {
    const width = 680;
    const height = 270;
    const padLeft = 18;
    const padRight = 18;
    const padTop = 24;
    const padBottom = 30;
    const innerW = width - padLeft - padRight;
    const innerH = height - padTop - padBottom;

    const data = yieldProjection.series;
    const minVal = principal * 0.995;
    const maxVal = Math.max(...data.map((d) => d.vaultBalance), principal * 1.02);
    const span = Math.max(maxVal - minVal, 1);

    const coords = data.map((d, idx) => {
      const x =
        padLeft + (data.length === 1 ? 0 : (idx / (data.length - 1)) * innerW);
      const yVault = padTop + innerH - ((d.vaultBalance - minVal) / span) * innerH;
      const yBench = padTop + innerH - ((d.benchBalance - minVal) / span) * innerH;
      return { ...d, x, yVault, yBench };
    });

    const vaultPath = coords
      .map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.yVault.toFixed(1)}`)
      .join(' ');
    const benchPath = coords
      .map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.yBench.toFixed(1)}`)
      .join(' ');

    const areaPath = `${vaultPath} L ${coords[coords.length - 1].x.toFixed(1)} ${(
      padTop + innerH
    ).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(padTop + innerH).toFixed(1)} Z`;

    return { width, height, padLeft, padRight, padTop, padBottom, coords, vaultPath, benchPath, areaPath };
  }, [yieldProjection.series, principal]);

  // Interactive SVG Chart Geometry for Multi-Timeframe TVL Terminal
  const tvlChart = useMemo(() => {
    const tf = TVL_TIMEFRAMES[tvlTimeframe];
    const width = 640;
    const height = 220;
    const padX = 20;
    const padTop = 20;
    const padBottom = 28;
    const innerW = width - padX * 2;
    const innerH = height - padTop - padBottom;

    const values = tf.points.map((p) => p.tvl);
    const minV = Math.min(...values) * 0.985;
    const maxV = Math.max(...values) * 1.01;
    const span = Math.max(maxV - minV, 1);

    const coords = tf.points.map((p, idx) => {
      const x = padX + (idx / (tf.points.length - 1)) * innerW;
      const y = padTop + innerH - ((p.tvl - minV) / span) * innerH;
      return { ...p, x, y };
    });

    const linePath = coords
      .map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
      .join(' ');
    const areaPath = `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${(
      padTop + innerH
    ).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(padTop + innerH).toFixed(1)} Z`;

    return { width, height, padTop, padBottom, coords, linePath, areaPath, meta: tf };
  }, [tvlTimeframe]);

  // Filtered On-Chain Proof-of-Reserve Rows
  const filteredReserves = useMemo(() => {
    if (chainFilter === 'All Chains') return RESERVE_LEDGER;
    return RESERVE_LEDGER.filter((row) => row.chain === chainFilter);
  }, [chainFilter]);

  // Run Live Cryptographic Merkle Proof Verification Sequence
  const handleVerifyMerkle = (row) => {
    if (verifyingId) return;
    setVerifyingId(row.id);

    setTimeout(() => {
      setVerifyingId(null);
      setVerifiedProofs((prev) => ({
        ...prev,
        [row.id]: {
          block: tickerPrices.blockHeight,
          timestamp: new Date().toISOString().slice(11, 19) + ' UTC',
          root: row.merkleRoot
        }
      }));
    }, 650);
  };

  // Simulated Institutional Deposit / Allocation Trigger
  const handleExecuteAllocation = () => {
    if (!connectedWallet) {
      setWalletModalOpen(true);
      return;
    }
    setAllocationNotice(
      `ALLOCATION QUEUED: ${formatUSD(principal)} -> ${activeVault.code} (${activeVault.name}) VIA ${connectedWallet.name.toUpperCase()}`
    );
    setTimeout(() => setAllocationNotice(null), 5000);
  };

  const activeRoiInspect =
    hoveredMonthIdx !== null
      ? roiChart.coords[hoveredMonthIdx]
      : roiChart.coords[roiChart.coords.length - 1];

  const activeTvlInspect =
    hoveredTvlIdx !== null
      ? tvlChart.coords[hoveredTvlIdx]
      : tvlChart.coords[tvlChart.coords.length - 1];

  return (
    <div className="min-h-screen bg-[#060709] text-[#F3F4F6] font-sans antialiased selection:bg-[#10B981] selection:text-[#060709]">
      {/* =====================================================================
          1. TOP LIVE INSTITUTIONAL MARKET TICKER BAR
         ===================================================================== */}
      <div className="border-b border-[#1E222B] bg-[#0B0D11] px-4 py-2 font-mono text-[11px] tabular-nums">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3">
          {/* Live Asset & Protocol Rates */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[#8A93A5]">ETH/USD</span>
              <span className="font-semibold text-[#F3F4F6]">
                ${tickerPrices.eth.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[#10B981]">+2.14%</span>
            </div>

            <span className="text-[#1E222B]">|</span>

            <div className="flex items-center gap-1.5">
              <span className="text-[#8A93A5]">BTC/USD</span>
              <span className="font-semibold text-[#F3F4F6]">
                ${tickerPrices.btc.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[#10B981]">+1.87%</span>
            </div>

            <span className="text-[#1E222B] hidden sm:inline">|</span>

            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-[#8A93A5]">USYC T-BILL</span>
              <span className="font-semibold text-[#F3F4F6]">${tickerPrices.usyc}</span>
              <span className="text-[#F59E0B]">5.35% APY</span>
            </div>

            <span className="text-[#1E222B] hidden md:inline">|</span>

            <div className="hidden md:flex items-center gap-1.5">
              <span className="text-[#8A93A5]">USDC POOL</span>
              <span className="font-semibold text-[#10B981]">
                {tickerPrices.usdcYield.toFixed(2)}% APY
              </span>
            </div>

            <span className="text-[#1E222B] hidden lg:inline">|</span>

            <div className="hidden lg:flex items-center gap-1.5">
              <span className="text-[#8A93A5]">PROTOCOL TVL</span>
              <span className="font-semibold text-[#F3F4F6]">
                ${tickerPrices.tvlMillions.toFixed(2)}M
              </span>
            </div>
          </div>

          {/* Mainnet Telemetry Status */}
          <div className="flex items-center gap-3">
            <span className="hidden xl:inline text-[#8A93A5]">
              ETH_BLOCK #{tickerPrices.blockHeight}
            </span>
            <span className="inline-flex items-center gap-1.5 border border-[#10B981]/40 bg-[#10B981]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#10B981]">
              <span className="h-1.5 w-1.5 bg-[#10B981] animate-pulse" />
              MAINNET OPERATIONAL
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          SWISS-GRID INSTITUTIONAL TERMINAL HEADER BAR
         ===================================================================== */}
      <header className="border-b border-[#1E222B] bg-[#060709]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-4">
          {/* Sharp Geometric Swiss Terminal Wordmark */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border border-[#10B981] bg-[#0B0D11]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="3" y="3" width="8" height="8" stroke="#10B981" strokeWidth="2" />
                  <rect x="13" y="3" width="8" height="8" stroke="#F3F4F6" strokeWidth="1.5" />
                  <rect x="3" y="13" width="8" height="8" stroke="#F3F4F6" strokeWidth="1.5" />
                  <rect x="13" y="13" width="8" height="8" fill="#10B981" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base sm:text-lg font-bold tracking-[0.14em] uppercase text-[#F3F4F6]">
                    AETHERVAULT
                  </span>
                  <span className="border border-[#1E222B] bg-[#0B0D11] px-1.5 py-0.5 font-mono text-[10px] text-[#8A93A5]">
                    v4.2-INST
                  </span>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8A93A5]">
                  NON-CUSTODIAL INSTITUTIONAL YIELD &amp; TREASURY TERMINAL
                </p>
              </div>
            </div>
          </div>

          {/* Terminal Navigation Jump Links & Wallet Connect */}
          <div className="flex items-center gap-3">
            <nav className="hidden lg:flex items-center border border-[#1E222B] bg-[#0B0D11] font-mono text-[11px] uppercase tracking-wider">
              <a
                href="#yield-terminal"
                className="border-r border-[#1E222B] px-3.5 py-2 text-[#F3F4F6] hover:bg-[#1E222B]/60 transition-colors"
              >
                01 // YIELD ENGINE
              </a>
              <a
                href="#tvl-analytics"
                className="border-r border-[#1E222B] px-3.5 py-2 text-[#8A93A5] hover:text-[#F3F4F6] hover:bg-[#1E222B]/60 transition-colors"
              >
                02 // TVL &amp; FLOWS
              </a>
              <a
                href="#merkle-audit"
                className="px-3.5 py-2 text-[#8A93A5] hover:text-[#F3F4F6] hover:bg-[#1E222B]/60 transition-colors"
              >
                03 // PROOF OF RESERVE
              </a>
            </nav>

            <button
              type="button"
              onClick={() => setWalletModalOpen(true)}
              className={`inline-flex items-center gap-2 border px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                connectedWallet
                  ? 'border-[#10B981] bg-[#10B981]/10 text-[#10B981]'
                  : 'border-[#F3F4F6] bg-[#F3F4F6] text-[#060709] hover:bg-[#10B981] hover:border-[#10B981]'
              }`}
            >
              <Wallet className="h-3.5 w-3.5" />
              <span>
                {connectedWallet
                  ? `${connectedWallet.address}`
                  : 'Connect Institutional Wallet'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Allocation Execution Banner */}
      {allocationNotice && (
        <div className="border-b border-[#10B981] bg-[#10B981]/15 px-4 py-2.5 font-mono text-xs text-[#10B981]">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between">
            <span>✓ {allocationNotice}</span>
            <button
              type="button"
              onClick={() => setAllocationNotice(null)}
              className="underline cursor-pointer"
            >
              DISMISS
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          MAIN SWISS-GRID CONTAINER (1PX HAIRLINE MATRIX)
         ===================================================================== */}
      <main className="mx-auto max-w-[1440px] border-x border-[#1E222B]">
        {/* QUADRANT METADATA BAR */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#1E222B] bg-[#0B0D11] font-mono text-[11px] tabular-nums">
          <div className="border-r border-b lg:border-b-0 border-[#1E222B] px-4 py-3">
            <div className="text-[#8A93A5] uppercase">TOTAL VALUE LOCKED</div>
            <div className="mt-1 text-base sm:text-lg font-bold text-[#F3F4F6]">
              ${tickerPrices.tvlMillions.toFixed(2)}M
            </div>
          </div>
          <div className="lg:border-r border-b lg:border-b-0 border-[#1E222B] px-4 py-3">
            <div className="text-[#8A93A5] uppercase">30D REALIZED YIELD PAID</div>
            <div className="mt-1 text-base sm:text-lg font-bold text-[#10B981]">
              +$14,820,410
            </div>
          </div>
          <div className="border-r border-[#1E222B] px-4 py-3">
            <div className="text-[#8A93A5] uppercase">RESERVE COLLATERALIZATION</div>
            <div className="mt-1 text-base sm:text-lg font-bold text-[#F3F4F6]">
              100.24% VERIFIED
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="text-[#8A93A5] uppercase">AUDITED SMART CONTRACTS</div>
            <div className="mt-1 text-base sm:text-lg font-bold text-[#F59E0B]">
              TRAIL OF BITS // SPEARBIT
            </div>
          </div>
        </div>

        {/* ===================================================================
            2. IMMEDIATE SPLIT-PANE INTERACTIVE ROI & COMPOUND YIELD TERMINAL
           =================================================================== */}
        <section id="yield-terminal" className="border-b border-[#1E222B]">
          {/* Section Coordinate Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E222B] bg-[#0B0D11] px-4 sm:px-6 py-2.5 font-mono text-[11px]">
            <span className="font-semibold uppercase tracking-widest text-[#10B981]">
              [ 01 // INTERACTIVE COMPOUND YIELD &amp; ALPHA TERMINAL ]
            </span>
            <span className="text-[#8A93A5]">
              BENCHMARK: TRADFI MONEY MARKET (4.20% APY)
            </span>
          </div>

          {/* 4-Tab Strategy Selector Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-[#1E222B] bg-[#060709]">
            {VAULT_STRATEGIES.map((vault, idx) => {
              const isSelected = vault.id === selectedVaultId;
              return (
                <button
                  key={vault.id}
                  type="button"
                  onClick={() => setSelectedVaultId(vault.id)}
                  className={`flex flex-col justify-between p-4 text-left transition-colors cursor-pointer ${
                    idx < 3 ? 'border-b lg:border-b-0 lg:border-r border-[#1E222B]' : ''
                  } ${
                    isSelected
                      ? 'bg-[#0B0D11] border-t-2 border-t-[#10B981]'
                      : 'hover:bg-[#0B0D11]/60'
                  }`}
                >
                  <div className="flex items-center justify-between w-full font-mono text-[10px]">
                    <span className="text-[#8A93A5]">{vault.code}</span>
                    <span
                      className={`px-1.5 py-0.5 font-semibold ${
                        isSelected
                          ? 'bg-[#10B981] text-[#060709]'
                          : 'border border-[#1E222B] text-[#8A93A5]'
                      }`}
                    >
                      {vault.apy.toFixed(2)}% APY
                    </span>
                  </div>
                  <div className="mt-2 font-mono text-sm font-bold text-[#F3F4F6]">
                    {vault.name}
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-[#8A93A5]">
                    {vault.riskTier}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Split-Pane Grid: Left Parameter Controls (5 Cols) | Right Output & Chart (7 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* LEFT PANE: PARAMETER INPUTS */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#1E222B] p-5 sm:p-7 space-y-6 bg-[#060709]">
              {/* Strategy Spec Box */}
              <div className="border border-[#1E222B] bg-[#0B0D11] p-4 space-y-2">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-[#F59E0B] font-semibold">
                    CUSTODY: {activeVault.custody}
                  </span>
                  <span className="text-[#8A93A5]">
                    CAP: {activeVault.capacityPct}% FILLED
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-[#8A93A5]">
                  {activeVault.description}
                </p>
              </div>

              {/* Principal Allocation Slider + Quick Presets */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between font-mono">
                  <label
                    htmlFor="principal-slider"
                    className="text-xs uppercase tracking-wider text-[#8A93A5]"
                  >
                    PRINCIPAL ALLOCATION (USDC)
                  </label>
                  <span className="text-base sm:text-lg font-bold text-[#F3F4F6] tabular-nums">
                    {formatUSD(principal)}
                  </span>
                </div>

                <input
                  id="principal-slider"
                  type="range"
                  min={10000}
                  max={2500000}
                  step={10000}
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#1E222B] accent-[#10B981] cursor-pointer"
                />

                {/* Quick Institutional Preset Buttons */}
                <div className="grid grid-cols-4 gap-1.5 pt-1 font-mono text-[11px]">
                  {[50000, 250000, 1000000, 2500000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setPrincipal(preset)}
                      className={`border py-1.5 text-center transition-colors cursor-pointer ${
                        principal === preset
                          ? 'border-[#10B981] bg-[#10B981]/15 text-[#10B981] font-semibold'
                          : 'border-[#1E222B] bg-[#0B0D11] text-[#8A93A5] hover:text-[#F3F4F6]'
                      }`}
                    >
                      {preset >= 1000000
                        ? `$${(preset / 1000000).toFixed(1)}M`
                        : `$${preset / 1000}K`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Horizon Duration Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono">
                  <label
                    htmlFor="duration-slider"
                    className="text-xs uppercase tracking-wider text-[#8A93A5]"
                  >
                    ALLOCATION HORIZON
                  </label>
                  <span className="text-sm font-bold text-[#F3F4F6] tabular-nums">
                    {months} {months === 1 ? 'MONTH' : 'MONTHS'} (
                    {(months / 12).toFixed(2)} YRS)
                  </span>
                </div>

                <input
                  id="duration-slider"
                  type="range"
                  min={1}
                  max={36}
                  step={1}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#1E222B] accent-[#10B981] cursor-pointer"
                />

                <div className="flex justify-between font-mono text-[10px] text-[#8A93A5]">
                  <span>1M</span>
                  <span>12M</span>
                  <span>24M</span>
                  <span>36M</span>
                </div>
              </div>

              {/* Compounding Cadence Toggle */}
              <div className="space-y-2">
                <span className="block font-mono text-xs uppercase tracking-wider text-[#8A93A5]">
                  COMPOUNDING CADENCE
                </span>
                <div className="grid grid-cols-3 border border-[#1E222B] bg-[#0B0D11] font-mono text-xs">
                  {[
                    { id: 'daily', label: 'DAILY (365x)' },
                    { id: 'weekly', label: 'WEEKLY (52x)' },
                    { id: 'monthly', label: 'MONTHLY (12x)' }
                  ].map((item, idx) => {
                    const active = cadence === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCadence(item.id)}
                        className={`py-2.5 text-center transition-colors cursor-pointer ${
                          idx < 2 ? 'border-r border-[#1E222B]' : ''
                        } ${
                          active
                            ? 'bg-[#10B981] text-[#060709] font-bold'
                            : 'text-[#8A93A5] hover:text-[#F3F4F6]'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Execute Allocation Trigger */}
              <button
                type="button"
                onClick={handleExecuteAllocation}
                className="flex w-full items-center justify-between border border-[#10B981] bg-[#10B981] px-5 py-3.5 font-mono text-xs uppercase tracking-widest font-bold text-[#060709] hover:bg-[#34D399] transition-colors cursor-pointer"
              >
                <span>
                  {connectedWallet
                    ? `DEPLOY ${formatUSD(principal)} TO ${activeVault.code}`
                    : `SIMULATE DEPLOYMENT // ${activeVault.code}`}
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            {/* RIGHT PANE: TABULAR KPI READOUTS & INTERACTIVE SVG COMPOUND CHART */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-[#060709]">
              {/* Top 3 Tabular KPI Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-[#1E222B] font-mono tabular-nums">
                <div className="border-b sm:border-b-0 sm:border-r border-[#1E222B] p-5">
                  <div className="text-[11px] uppercase text-[#8A93A5]">
                    PROJECTED NET YIELD
                  </div>
                  <div className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#10B981]">
                    +{formatUSD(yieldProjection.projectedNetYield)}
                  </div>
                  <div className="mt-1 text-[11px] text-[#8A93A5]">
                    EFF. APY: {yieldProjection.effectiveApy.toFixed(2)}%
                  </div>
                </div>

                <div className="border-b sm:border-b-0 sm:border-r border-[#1E222B] p-5">
                  <div className="text-[11px] uppercase text-[#8A93A5]">
                    TOTAL ENDING BALANCE
                  </div>
                  <div className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#F3F4F6]">
                    {formatUSD(yieldProjection.endingBalance)}
                  </div>
                  <div className="mt-1 text-[11px] text-[#8A93A5]">
                    AT MONTH {months} HORIZON
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-[11px] uppercase text-[#8A93A5]">
                    ALPHA VS. TRADFI (4.2%)
                  </div>
                  <div className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#F59E0B]">
                    +{formatUSD(yieldProjection.alphaVsTradFi)}
                  </div>
                  <div className="mt-1 text-[11px] text-[#8A93A5]">
                    SPREAD: +{(activeVault.apy - activeVault.benchmarkApy).toFixed(2)}%
                  </div>
                </div>
              </div>

              {/* Interactive SVG Compound Growth Chart Area */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 font-mono text-[11px]">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5 text-[#10B981]">
                      <span className="h-2 w-2 bg-[#10B981]" />
                      {activeVault.code} COMPOUND CURVE
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#8A93A5]">
                      <span className="h-2 w-2 bg-[#8A93A5]" />
                      TRADFI BENCHMARK (4.2%)
                    </span>
                  </div>

                  {/* Live Hover Crosshair Readout */}
                  <div className="border border-[#1E222B] bg-[#0B0D11] px-2.5 py-1 text-[#F3F4F6] tabular-nums">
                    M{activeRoiInspect.month}:{' '}
                    <span className="text-[#10B981] font-semibold">
                      {formatUSD(activeRoiInspect.vaultBalance)}
                    </span>{' '}
                    (NET +{formatUSD(activeRoiInspect.netYield)})
                  </div>
                </div>

                {/* Custom SVG Chart */}
                <div className="relative w-full">
                  <svg
                    viewBox={`0 0 ${roiChart.width} ${roiChart.height}`}
                    className="w-full h-64 overflow-visible select-none"
                    onMouseLeave={() => setHoveredMonthIdx(null)}
                  >
                    <defs>
                      <linearGradient id="emeraldTerminalFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.24" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.01" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Hairline Grid Lines */}
                    {[0.2, 0.5, 0.8].map((ratio, idx) => (
                      <line
                        key={idx}
                        x1={roiChart.padLeft}
                        x2={roiChart.width - roiChart.padRight}
                        y1={roiChart.height * ratio}
                        y2={roiChart.height * ratio}
                        stroke="#1E222B"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Emerald Area Fill */}
                    <path d={roiChart.areaPath} fill="url(#emeraldTerminalFill)" />

                    {/* TradFi Benchmark Dashed Line */}
                    <path
                      d={roiChart.benchPath}
                      fill="none"
                      stroke="#8A93A5"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />

                    {/* Primary Vault Compound Line */}
                    <path
                      d={roiChart.vaultPath}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                    />

                    {/* Active Crosshair Marker */}
                    {activeRoiInspect && (
                      <g>
                        <line
                          x1={activeRoiInspect.x}
                          x2={activeRoiInspect.x}
                          y1={roiChart.padTop}
                          y2={roiChart.height - roiChart.padBottom}
                          stroke="#F3F4F6"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                        />
                        <rect
                          x={activeRoiInspect.x - 4}
                          y={activeRoiInspect.yVault - 4}
                          width="8"
                          height="8"
                          fill="#10B981"
                          stroke="#060709"
                          strokeWidth="1.5"
                        />
                        <rect
                          x={activeRoiInspect.x - 3}
                          y={activeRoiInspect.yBench - 3}
                          width="6"
                          height="6"
                          fill="#8A93A5"
                        />
                      </g>
                    )}

                    {/* X-Axis Tick Labels & Interactive Scrubbing Columns */}
                    {roiChart.coords.map((pt, idx) => {
                      const step = Math.max(1, Math.floor(roiChart.coords.length / 6));
                      const showLabel =
                        pt.month === 0 ||
                        pt.month === months ||
                        pt.month % step === 0;
                      const hitW =
                        (roiChart.width - roiChart.padLeft - roiChart.padRight) /
                        Math.max(1, roiChart.coords.length);

                      return (
                        <g key={pt.month}>
                          {showLabel && (
                            <text
                              x={pt.x}
                              y={roiChart.height - 6}
                              textAnchor="middle"
                              className="fill-[#8A93A5] font-mono text-[10px]"
                            >
                              M{pt.month}
                            </text>
                          )}
                          <rect
                            x={pt.x - hitW / 2}
                            y={0}
                            width={hitW}
                            height={roiChart.height}
                            fill="transparent"
                            className="cursor-crosshair"
                            onMouseEnter={() => setHoveredMonthIdx(idx)}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            3. HAIRLINE-BORDERED ANALYTICS MATRIX: TVL CHART + LIQUIDITY FLOW TAPE
           =================================================================== */}
        <section id="tvl-analytics" className="border-b border-[#1E222B]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* LEFT 7 COLS: MULTI-TIMEFRAME PROTOCOL TVL & REVENUE TERMINAL */}
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#1E222B]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E222B] bg-[#0B0D11] px-4 sm:px-6 py-2.5 font-mono text-[11px]">
                <span className="font-semibold uppercase tracking-widest text-[#F3F4F6]">
                  [ 02 // PROTOCOL TVL &amp; CUMULATIVE FEE TELEMETRY ]
                </span>

                {/* Timeframe Switcher Tabs */}
                <div className="flex border border-[#1E222B] bg-[#060709]">
                  {['24H', '7D', '30D', 'ALL'].map((tf, idx) => (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => {
                        setTvlTimeframe(tf);
                        setHoveredTvlIdx(null);
                      }}
                      className={`px-2.5 py-1 text-[10px] font-semibold transition-colors cursor-pointer ${
                        idx < 3 ? 'border-r border-[#1E222B]' : ''
                      } ${
                        tvlTimeframe === tf
                          ? 'bg-[#10B981] text-[#060709]'
                          : 'text-[#8A93A5] hover:text-[#F3F4F6]'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-4 font-mono tabular-nums">
                  <div>
                    <div className="text-[10px] uppercase text-[#8A93A5]">
                      {tvlChart.meta.label}
                    </div>
                    <div className="mt-1 flex items-baseline gap-3">
                      <span className="text-2xl sm:text-3xl font-bold text-[#F3F4F6]">
                        ${activeTvlInspect.tvl.toFixed(1)}M
                      </span>
                      <span className="text-xs font-semibold text-[#10B981]">
                        {tvlChart.meta.delta}
                      </span>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <div className="text-[#8A93A5]">CUMULATIVE PROTOCOL FEES</div>
                    <div className="font-bold text-[#F59E0B]">
                      ${activeTvlInspect.rev.toFixed(1)}M
                    </div>
                  </div>
                </div>

                {/* SVG TVL Line Chart */}
                <svg
                  viewBox={`0 0 ${tvlChart.width} ${tvlChart.height}`}
                  className="w-full h-52 overflow-visible select-none"
                  onMouseLeave={() => setHoveredTvlIdx(null)}
                >
                  <defs>
                    <linearGradient id="tvlAmberFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.01" />
                    </linearGradient>
                  </defs>

                  {[0.25, 0.5, 0.75].map((r, i) => (
                    <line
                      key={i}
                      x1="20"
                      x2={tvlChart.width - 20}
                      y1={tvlChart.height * r}
                      y2={tvlChart.height * r}
                      stroke="#1E222B"
                      strokeWidth="1"
                    />
                  ))}

                  <path d={tvlChart.areaPath} fill="url(#tvlAmberFill)" />
                  <path
                    d={tvlChart.linePath}
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2.2"
                  />

                  {activeTvlInspect && (
                    <g>
                      <line
                        x1={activeTvlInspect.x}
                        x2={activeTvlInspect.x}
                        y1={tvlChart.padTop}
                        y2={tvlChart.height - tvlChart.padBottom}
                        stroke="#8A93A5"
                        strokeDasharray="3 3"
                      />
                      <rect
                        x={activeTvlInspect.x - 4}
                        y={activeTvlInspect.y - 4}
                        width="8"
                        height="8"
                        fill="#F59E0B"
                        stroke="#060709"
                        strokeWidth="1.5"
                      />
                    </g>
                  )}

                  {tvlChart.coords.map((pt, idx) => {
                    const hitW = (tvlChart.width - 40) / tvlChart.coords.length;
                    return (
                      <g key={pt.t}>
                        <text
                          x={pt.x}
                          y={tvlChart.height - 6}
                          textAnchor="middle"
                          className="fill-[#8A93A5] font-mono text-[10px]"
                        >
                          {pt.t}
                        </text>
                        <rect
                          x={pt.x - hitW / 2}
                          y={0}
                          width={hitW}
                          height={tvlChart.height}
                          fill="transparent"
                          className="cursor-crosshair"
                          onMouseEnter={() => setHoveredTvlIdx(idx)}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* RIGHT 5 COLS: LIVE INSTITUTIONAL LIQUIDITY FLOW TAPE */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-[#1E222B] bg-[#0B0D11] px-4 sm:px-6 py-2.5 font-mono text-[11px]">
                <span className="font-semibold uppercase tracking-widest text-[#F3F4F6]">
                  [ LIVE LIQUIDITY SETTLEMENT TAPE ]
                </span>
                <span className="text-[#10B981]">REAL-TIME</span>
              </div>

              <div className="divide-y divide-[#1E222B] font-mono text-xs tabular-nums flex-1">
                {INITIAL_FLOWS.map((flow, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 hover:bg-[#0B0D11] transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-1.5 py-0.5 text-[10px] font-bold ${
                            flow.type === 'DEPOSIT'
                              ? 'bg-[#10B981]/15 text-[#10B981]'
                              : flow.type === 'YIELD_DIST'
                              ? 'bg-[#F59E0B]/15 text-[#F59E0B]'
                              : 'bg-[#1E222B] text-[#F3F4F6]'
                          }`}
                        >
                          {flow.type}
                        </span>
                        <span className="font-semibold text-[#F3F4F6] truncate">
                          {flow.entity}
                        </span>
                      </div>
                      <div className="mt-1 text-[10px] text-[#8A93A5]">
                        {flow.ts} • {flow.vault} • TX {flow.tx}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-bold text-[#10B981]">{flow.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            4. ON-CHAIN PROOF-OF-RESERVE & INTERACTIVE MERKLE VERIFICATION LEDGER
           =================================================================== */}
        <section id="merkle-audit">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E222B] bg-[#0B0D11] px-4 sm:px-6 py-3 font-mono text-[11px]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#10B981]" />
              <span className="font-semibold uppercase tracking-widest text-[#F3F4F6]">
                [ 03 // ON-CHAIN PROOF-OF-RESERVE &amp; MERKLE SOLVENCY LEDGER ]
              </span>
            </div>

            {/* Chain Filter Tabs */}
            <div className="flex flex-wrap border border-[#1E222B] bg-[#060709]">
              {['All Chains', 'Ethereum', 'Arbitrum', 'Base', 'Solana'].map(
                (chain, idx, arr) => (
                  <button
                    key={chain}
                    type="button"
                    onClick={() => setChainFilter(chain)}
                    className={`px-3 py-1.5 text-[10px] uppercase font-semibold transition-colors cursor-pointer ${
                      idx < arr.length - 1 ? 'border-r border-[#1E222B]' : ''
                    } ${
                      chainFilter === chain
                        ? 'bg-[#F3F4F6] text-[#060709]'
                        : 'text-[#8A93A5] hover:text-[#F3F4F6]'
                    }`}
                  >
                    {chain}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Responsive Hairline Ledger Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs tabular-nums">
              <thead>
                <tr className="border-b border-[#1E222B] bg-[#0B0D11]/60 text-[10px] uppercase tracking-wider text-[#8A93A5]">
                  <th className="border-r border-[#1E222B] px-4 py-3">NETWORK</th>
                  <th className="border-r border-[#1E222B] px-4 py-3">
                    RESERVE ASSET &amp; CUSTODIAN
                  </th>
                  <th className="border-r border-[#1E222B] px-4 py-3">
                    VERIFIED ASSETS
                  </th>
                  <th className="border-r border-[#1E222B] px-4 py-3">
                    PROTOCOL LIABILITIES
                  </th>
                  <th className="border-r border-[#1E222B] px-4 py-3">RATIO</th>
                  <th className="px-4 py-3 text-right">CRYPTOGRAPHIC PROOF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E222B]">
                {filteredReserves.map((row) => {
                  const isVerifying = verifyingId === row.id;
                  const proofResult = verifiedProofs[row.id];

                  return (
                    <React.Fragment key={row.id}>
                      <tr className="hover:bg-[#0B0D11] transition-colors">
                        <td className="border-r border-[#1E222B] px-4 py-3.5 font-semibold text-[#F3F4F6]">
                          {row.chain.toUpperCase()}
                        </td>
                        <td className="border-r border-[#1E222B] px-4 py-3.5">
                          <div className="font-semibold text-[#F3F4F6]">{row.asset}</div>
                          <div className="text-[10px] text-[#8A93A5] mt-0.5">
                            {row.custodian}
                          </div>
                        </td>
                        <td className="border-r border-[#1E222B] px-4 py-3.5 font-bold text-[#F3F4F6]">
                          {row.onChainBalance}
                        </td>
                        <td className="border-r border-[#1E222B] px-4 py-3.5 text-[#8A93A5]">
                          {row.liabilities}
                        </td>
                        <td className="border-r border-[#1E222B] px-4 py-3.5 font-bold text-[#10B981]">
                          {row.ratio}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => handleVerifyMerkle(row)}
                            disabled={isVerifying}
                            className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-[10px] uppercase font-semibold tracking-wider transition-colors cursor-pointer ${
                              proofResult
                                ? 'border-[#10B981] bg-[#10B981]/15 text-[#10B981]'
                                : 'border-[#1E222B] bg-[#0B0D11] text-[#F3F4F6] hover:border-[#10B981]'
                            }`}
                          >
                            {isVerifying ? (
                              <>
                                <RefreshCw className="h-3 w-3 animate-spin text-[#F59E0B]" />
                                <span>HASHING LEAF...</span>
                              </>
                            ) : proofResult ? (
                              <>
                                <Check className="h-3 w-3" />
                                <span>PROOF VERIFIED</span>
                              </>
                            ) : (
                              <span>Verify Merkle Proof</span>
                            )}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded Cryptographic Merkle Root Readout upon Verification */}
                      {proofResult && (
                        <tr className="bg-[#10B981]/5">
                          <td colSpan={6} className="px-4 py-2.5 text-[11px] text-[#10B981]">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span>
                                ✓ CHAINLINK POR ORACLE ATTESTED AT BLOCK #
                                {proofResult.block} ({proofResult.timestamp})
                              </span>
                              <span className="text-[#8A93A5] break-all">
                                MERKLE_ROOT: {proofResult.root}
                              </span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* =====================================================================
          COMPACT SWISS-GRID TERMINAL FOOTER
         ===================================================================== */}
      <footer className="border-t border-[#1E222B] bg-[#0B0D11] px-4 sm:px-6 py-6 font-mono text-[11px] text-[#8A93A5]">
        <div className="mx-auto flex max-w-[1440px] flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            AETHERVAULT INSTITUTIONAL PROTOCOL // ZUG • SINGAPORE • NEW YORK
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>CHAINLINK PROOF-OF-RESERVE ACTIVE</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} AETHERVAULT LABS</span>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          INSTITUTIONAL WALLET CONNECTION MODAL (SHARP SWISS GEOMETRY)
         ===================================================================== */}
      {walletModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setWalletModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md border border-[#1E222B] bg-[#0B0D11] p-6 font-mono text-[#F3F4F6] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#1E222B] pb-3.5">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#10B981]">
                  INSTITUTIONAL CUSTODY GATEWAY
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider mt-0.5">
                  SELECT SIGNER OR CUSTODIAN
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setWalletModalOpen(false)}
                className="p-1 text-[#8A93A5] hover:text-[#F3F4F6] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 divide-y divide-[#1E222B] border border-[#1E222B] bg-[#060709]">
              {INSTITUTIONAL_WALLETS.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => {
                    setConnectedWallet({
                      name: w.name,
                      address: '0x7F9C...41E8'
                    });
                    setWalletModalOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left hover:bg-[#0B0D11] transition-colors cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-bold text-[#F3F4F6]">{w.name}</div>
                    <div className="text-[10px] text-[#8A93A5] mt-0.5">{w.tag}</div>
                  </div>
                  <span className="border border-[#10B981]/40 bg-[#10B981]/10 px-2 py-0.5 text-[10px] text-[#10B981]">
                    {w.clearance}
                  </span>
                </button>
              ))}
            </div>

            {connectedWallet && (
              <button
                type="button"
                onClick={() => {
                  setConnectedWallet(null);
                  setWalletModalOpen(false);
                }}
                className="mt-4 w-full border border-[#F59E0B]/50 py-2.5 text-xs uppercase text-[#F59E0B] hover:bg-[#F59E0B]/10 cursor-pointer"
              >
                DISCONNECT ACTIVE SESSION ({connectedWallet.address})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}