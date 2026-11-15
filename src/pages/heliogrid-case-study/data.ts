export const CASE_STUDIES = [
  {
    id: 'scottsdale',
    tabLabel: 'Scottsdale Estate • 14.8 kW',
    location: 'Scottsdale, AZ (85255)',
    systemSize: '14.8 kW N-Type + 2× Powerwall 3',
    roofSpec: 'Standing Seam Matte Black Metal',
    beforeMonthly: 485,
    projectedYr15Monthly: 980,
    afterMonthly: 14,
    annualKwhProduced: '24,900 kWh/yr',
    itcClaimed: '$14,820',
    netPayback: '4.9 Years',
    utilityProvider: 'APS Peak Time-of-Use Plan',
    beforeLineItems: [
      { label: 'On-Peak Summer kWh Tier (4pm–7pm)', amount: '$268.00' },
      { label: 'Off-Peak Base Delivery & Fuel Surcharge', amount: '$164.50' },
      { label: 'Demand Charge & Municipal Grid Fees', amount: '$52.50' }
    ],
    afterLineItems: [
      { label: 'Solar Self-Consumption + Battery Peak Shaving', amount: '-$471.00' },
      { label: 'Net Metering Export Credit Rollover', amount: '-$18.40' },
      { label: 'Mandatory Utility Grid Interconnect Fee', amount: '$14.00' }
    ]
  },
  {
    id: 'austin',
    tabLabel: 'Austin Modern • 11.2 kW',
    location: 'Westlake Hills, TX (78746)',
    systemSize: '11.2 kW N-Type + 1× Powerwall 3',
    roofSpec: 'Flat Concrete Tile (Flush Racking)',
    beforeMonthly: 370,
    projectedYr15Monthly: 745,
    afterMonthly: 12,
    annualKwhProduced: '17,650 kWh/yr',
    itcClaimed: '$10,950',
    netPayback: '5.3 Years',
    utilityProvider: 'Austin Energy Tier-4 Residential',
    beforeLineItems: [
      { label: 'Tier 3 & 4 Summer HVAC Cooling Usage', amount: '$212.00' },
      { label: 'Power Supply Adjustment (PSA) Fuel Fee', amount: '$118.00' },
      { label: 'Regulatory & Community Benefit Charge', amount: '$40.00' }
    ],
    afterLineItems: [
      { label: 'Value-of-Solar (VoS) Clean Generation Credit', amount: '-$358.00' },
      { label: 'Whole-Home Outage Backup Reserve (13.5 kWh)', amount: 'Included' },
      { label: 'Base Customer Service & Meter Fee', amount: '$12.00' }
    ]
  },
  {
    id: 'sandiego',
    tabLabel: 'San Diego Commercial • 42.0 kW',
    location: 'Sorrento Valley, CA (92121)',
    systemSize: '42.0 kW Bifacial + 40.5 kWh Storage',
    roofSpec: 'Low-Slope TPO Ballasted Array',
    beforeMonthly: 1490,
    projectedYr15Monthly: 3180,
    afterMonthly: 38,
    annualKwhProduced: '71,400 kWh/yr',
    itcClaimed: '$38,400 + MACRS',
    netPayback: '3.8 Years',
    utilityProvider: 'SDG&E AL-TOU Commercial',
    beforeLineItems: [
      { label: 'Non-Coincident & Peak kW Demand Charges', amount: '$690.00' },
      { label: 'Commercial Daytime Operating Load (kWh)', amount: '$645.00' },
      { label: 'Transmission & Public Purpose Surcharges', amount: '$155.00' }
    ],
    afterLineItems: [
      { label: 'Bifacial Roof Array + Peak Demand Shaving', amount: '-$1,452.00' },
      { label: 'Federal MACRS 5-Yr Accelerated Depreciation', amount: '$29,100 Tax Shield' },
      { label: 'Commercial Grid Standby Meter Charge', amount: '$38.00' }
    ]
  }
];

export const VERIFIED_REVIEWS = [
  {
    id: 'rev-1',
    client: 'Dr. Aris & Claire Thorne',
    role: 'Homeowners • Paradise Valley, AZ',
    system: '16.4 kW N-Type + 2× Tesla Powerwall 3',
    verifiedSavings: '$5,420 Saved in Year 1',
    quote:
      'HelioGrid engineered the conduit runs completely inside our attic—zero exposed pipe on our standing seam roof. During a 6-hour monsoon grid outage in August, our AC and sub-zero fridge never even flickered.',
    installTime: '2-Day Structural Install • Passed City Inspection First Try'
  },
  {
    id: 'rev-2',
    client: 'Marcus Delgado, PE',
    role: 'VP of Facilities • Apex Precision Machining (TX)',
    system: '68.0 kW Commercial Array + Peak Shaving',
    verifiedSavings: '$18,900/yr Demand Reduction',
    quote:
      'Unlike residential sales brokers, HelioGrid’s engineering team modeled our 15-minute interval meter data before quoting a single panel. Between the 30% ITC and MACRS depreciation, our net payback is under 3.7 years.',
    installTime: '4-Day Weekend Install • Zero Production Downtime'
  },
  {
    id: 'rev-3',
    client: 'Hannah & David Lindqvist',
    role: 'Homeowners • La Jolla, CA',
    system: '12.0 kW All-Black Array + 27 kWh Storage',
    verifiedSavings: '$412/mo -> $16/mo Utility Bill',
    quote:
      'Under NEM 3.0, battery dispatch timing is everything. HelioGrid programmed automated evening export schedules that wiped out 96% of our SDG&E bill from month one.',
    installTime: '2-Day Install • Full PTO in 19 Days'
  }
];

export const ENGINEERING_FAQS = [
  {
    q: 'How does the 30% Federal Investment Tax Credit (ITC) work on my system?',
    a: 'Under Section 25D (residential) and Section 48 (commercial) of the federal tax code, you receive a dollar-for-dollar federal tax credit equal to 30% of the total installed solar and battery storage cost. HelioGrid provides certified IRS Form 5695 documentation upon Permission to Operate (PTO), and commercial buyers also qualify for 5-year MACRS accelerated depreciation.'
  },
  {
    q: 'Will roof penetrations void my existing standing seam or tile roof warranty?',
    a: 'Never. For standing seam metal roofs, we use non-penetrating S-5! structural clamps that attach directly to the vertical seam with zero holes. For concrete tile and architectural shingle roofs, we use flashed, EPDM-sealed structural standoffs backed by our 25-year watertight roof penetration warranty.'
  },
  {
    q: 'What happens to my power during a neighborhood utility blackout?',
    a: 'Standard grid-tied solar shuts off during an outage for utility lineman safety. When paired with LFP battery storage (13.5 kWh or 27 kWh), HelioGrid’s automatic transfer gateway islands your home in under 20 milliseconds—keeping HVAC, refrigeration, Wi-Fi, and EV chargers running seamlessly while recharging from your roof each morning.'
  },
  {
    q: 'Why do you exclusively install Tier-1 N-Type TOPCon monocrystalline panels?',
    a: 'Conventional P-Type panels suffer from Boron-Oxygen light-induced degradation (LID) and lose efficiency rapidly in 100°F+ summer heat. Our Tier-1 430W N-Type TOPCon modules feature a -0.29%/°C temperature coefficient and carry a 25-year linear power guarantee ensuring at least 89.4% output in Year 25.'
  },
  {
    q: 'How long does permitting, installation, and utility Permission to Operate take?',
    a: 'Our in-house structural and electrical engineering team completes stamped CAD plans within 72 hours. On-site installation takes 1 to 2 days for residential roofs, and our permitting desk handles all HOA approvals, municipal inspections, and utility interconnect filings end-to-end.'
  }
];

export const TELEMETRY_BY_MODE = {
    sunny: {
      badge: 'MODE: SUNNY PEAK GENERATION',
      arrayOutput: '12.4 kW ACTIVE',
      homeLoad: '2.8 kW',
      batteryFlow: '+9.6 kW CHARGING (94%)',
      gridStatus: 'EXPORTING +$1.84/HR',
      accent: '#D97706',
      panelFill: '#1E3A2F',
      sunOpacity: 1
    },
    outage: {
      badge: 'MODE: GRID OUTAGE ISLANDING (< 20ms)',
      arrayOutput: '8.9 kW SOLAR',
      homeLoad: '4.1 kW HVAC + CRITICAL',
      batteryFlow: 'ISLANDED // 27.0 kWh RESERVE',
      gridStatus: 'UTILITY GRID OFFLINE (PROTECTED)',
      accent: '#15803D',
      panelFill: '#143326',
      sunOpacity: 0.75
    },
    night: {
      badge: 'MODE: PEAK-RATE NIGHT DISCHARGE',
      arrayOutput: '0.0 kW STANDBY',
      homeLoad: '3.2 kW EV + HOME',
      batteryFlow: '-3.2 kW LFP DISCHARGE (78%)',
      gridStatus: '$0.00 PEAK UTILITY IMPORT',
      accent: '#0284C7',
      panelFill: '#111916',
      sunOpacity: 0.15
    }
  };

export const TELEMETRY_MODE_OPTIONS = [
  { id: 'sunny', label: 'Sunny Peak' },
  { id: 'outage', label: 'Grid Outage Backup' },
  { id: 'night', label: 'Night Discharge' }
] as const;
