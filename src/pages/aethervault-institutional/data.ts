export const heroVaultStrategies = {
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

export const strategyTiers = {
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

export const tvlDatasets = {
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

export const chainAllocations = [
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

export const faqList = [
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

export const sampleEvents = [
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
