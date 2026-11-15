export const FINISHES = [
  {
    id: 'obsidian',
    name: 'Anodized Obsidian',
    code: 'FIN-01 // MATTE BLACK',
    swatch: '#161618',
    cupOuter: '#18181B',
    cupInner: '#0D0D0F',
    yoke: '#2C2C30',
    accent: '#C85A32',
    band: '#1D1D20',
    cushion: '#121214',
    specular: 'rgba(255, 255, 255, 0.14)',
    note: 'Bead-blasted 6061-T6 aerospace aluminum with micro-textured PVD satin seal.'
  },
  {
    id: 'titanium',
    name: 'Raw Titanium',
    code: 'FIN-02 // NATURAL ALLOY',
    swatch: '#9B9890',
    cupOuter: '#B5B2A8',
    cupInner: '#7D7A72',
    yoke: '#8E8B82',
    accent: '#C85A32',
    band: '#A5A298',
    cushion: '#3A3835',
    specular: 'rgba(255, 255, 255, 0.42)',
    note: 'Unpainted Grade-5 brushed titanium housing with raw directional grain.'
  },
  {
    id: 'alabaster',
    name: 'Warm Alabaster',
    code: 'FIN-03 // CERAMIC CHALK',
    swatch: '#E5DFD3',
    cupOuter: '#EAE4D7',
    cupInner: '#CFC8B9',
    yoke: '#D6CFC0',
    accent: '#C85A32',
    band: '#DFD8CA',
    cushion: '#C9C1B2',
    specular: 'rgba(255, 255, 255, 0.65)',
    note: 'Cerakote mineral chalk coating paired with bone-dyed lambskin cushions.'
  },
  {
    id: 'terracotta',
    name: 'Anodized Terracotta',
    code: 'FIN-04 // STUDIO EDITION',
    swatch: '#C85A32',
    cupOuter: '#C85A32',
    cupInner: '#8E3B1D',
    yoke: '#A84824',
    accent: '#F4F1EA',
    band: '#B64F29',
    cushion: '#231D1B',
    specular: 'rgba(255, 232, 220, 0.34)',
    note: 'Limited batch deep-bath electrochemical terracotta oxide finish.'
  }
];

export const EDITIONS = [
  {
    id: 'standard',
    label: 'AURA ONE — Studio Edition',
    sub: 'Includes Braided USB-C DAC Cable, 4.4mm Balanced Lead & Molded Felt Case',
    price: 549
  },
  {
    id: 'collector',
    label: 'AURA ONE — Collector Dock Bundle',
    sub: 'Adds Solid CNC Aluminum Magnetic Desk Stand & Extra Lambskin Cushions',
    price: 649
  }
];

export const CUSHION_TYPES = [
  {
    id: 'lambskin',
    label: 'Perforated Lambskin',
    detail: 'Acoustic isolation +0.8 dB'
  },
  {
    id: 'alcantara',
    label: 'Breathable Alcantara',
    detail: 'Open-stage studio warmth'
  }
];

export const specLedgerRows = [
    {
      index: '01',
      parameter: 'Transducer Architecture',
      specification: '50mm Pure Beryllium PVD Dome • Neodymium N52 Magnet Array',
      tolerance: '±0.4 dB Matched Pair'
    },
    {
      index: '02',
      parameter: 'Frequency Response',
      specification: '4 Hz – 48,000 Hz (Hi-Res Audio & Studio Reference Certified)',
      tolerance: '0.02% THD @ 1 kHz'
    },
    {
      index: '03',
      parameter: 'Adaptive Noise Cancellation',
      specification: '8-Mic Hybrid Feedforward/Feedback DSP • 48,000 Samples/sec',
      tolerance: '-46 dB Broadband Attenuation'
    },
    {
      index: '04',
      parameter: 'Wireless & Lossless Codecs',
      specification: 'Bluetooth 5.4 • aptX Lossless, LDAC, LC3 & 24-Bit/192kHz USB-C DAC',
      tolerance: '28ms Ultra-Low Latency'
    },
    {
      index: '05',
      parameter: 'Chassis & Metallurgy',
      specification: 'CNC-Milled 6061-T6 Aluminum Cups • Spring-Steel Core Headband',
      tolerance: '318 Grams Total Mass'
    },
    {
      index: '06',
      parameter: 'Battery Endurance',
      specification: '42 Hours Continuous Playback (ANC Active) • 60 Hours Passive DSP',
      tolerance: '10-Min Charge = 8 Hrs'
    }
  ];
