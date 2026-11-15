export const VAULT_STRATEGIES = [
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

export const TVL_TIMEFRAMES = {
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

export const RESERVE_LEDGER = [
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

export const INITIAL_FLOWS = [
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

export const INSTITUTIONAL_WALLETS = [
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
