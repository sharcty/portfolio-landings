import { Activity, FileCheck2, Sun, Wrench } from 'lucide-react';

export const solarTestimonials = [
  {
    category: 'Residential',
    name: 'Dr. Jonathan & Claire Mercer',
    location: 'Scottsdale, AZ',
    systemSpecs: '14.8 kW Architectural Array + 2x Powerwall',
    billBefore: '$540/mo',
    billAfter: '$14/mo',
    savingsPct: '97% Bill Drop',
    quote:
      'HelioGrid’s all-black low-profile panels look like custom architectural glass on our roof. During July’s 115°F heatwave and a 9-hour neighborhood grid outage, our AC and pool ran seamlessly off Powerwall storage.',
    date: 'Installed 4 months ago • Verified NABCEP Project'
  },
  {
    category: 'Battery Backup',
    name: 'Marcus & Hannah Vance',
    location: 'Austin, TX',
    systemSpecs: '11.6 kW Tier-1 Solar + 27 kWh Whole-Home Storage',
    billBefore: '$415/mo',
    billAfter: '$19/mo',
    savingsPct: '95% Bill Drop',
    quote:
      'After two winter ice storms knocked out power on our street, we wanted true energy independence. HelioGrid handled every HOA approval, city permit, and utility interconnection in 18 days—and completed installation in a single day.',
    date: 'Installed 6 months ago • Verified Tesla Premier Install'
  },
  {
    category: 'Commercial',
    name: 'Apex Cold-Chain Logistics (CFO: David Lin)',
    location: 'Ontario, CA',
    systemSpecs: '185 kW Flat-Roof Ballasted Array + Commercial Storage',
    billBefore: '$6,850/mo',
    billAfter: '$610/mo',
    savingsPct: '91% OpEx Drop',
    quote:
      'Between the 30% Federal ITC, accelerated MACRS depreciation, and peak demand-charge shaving, our warehouse solar array achieved a 3.4-year net payback and adds over $74,000/yr straight to EBITDA.',
    date: 'Commissioned Q2 • Commercial Turnkey Division'
  },
  {
    category: 'Residential',
    name: 'Sophia & Liam Alvarez',
    location: 'San Diego, CA',
    systemSpecs: '9.2 kW Microinverter Roof + 1x Powerwall 3',
    billBefore: '$380/mo',
    billAfter: '$22/mo',
    savingsPct: '94% Bill Drop',
    quote:
      'Three other installers told us our Spanish tile roof was too complex. HelioGrid used LiDAR 3D drone modeling to engineer zero-leak flashed mounts and cut our SDG&E bill by more than $4,200 in year one.',
    date: 'Installed 8 months ago • Verified Google 5★ Review'
  }
] as const;

export const solarFaqItems = [
  {
    q: 'Will solar mounting penetrations void my roof warranty or cause leaks?',
    a: 'Never. HelioGrid uses triple-sealed, flashing-integrated aerospace aluminum mounts engineered for wind loads up to 160 mph. Every roof attachment is backed by our 25-Year Zero-Leak Roof Penetration Warranty in addition to your existing roofing manufacturer coverage.'
  },
  {
    q: 'How does the 30% Federal Solar Tax Credit (ITC) work in 2026?',
    a: 'Under the Residential & Commercial Clean Energy Credit, you can deduct 30% of your total installed solar and battery storage cost dollar-for-dollar from your federal tax liability. If you choose our $0-down solar loan, you can apply your 30% tax credit directly toward the principal within 18 months to keep monthly payments low.'
  },
  {
    q: 'Do solar panels still power my home during a utility grid blackout?',
    a: 'Standard grid-tied solar without batteries automatically shuts off during a blackout to protect utility lineworkers. When paired with Tesla Powerwall or Enphase IQ Battery storage, your home seamlessly islands in under 20 milliseconds—keeping HVAC, refrigeration, Wi-Fi, and EV chargers running indefinitely via solar recharge.'
  },
  {
    q: 'How do Net Metering and Time-of-Use (TOU) battery arbitrage lower my bill?',
    a: 'During peak midday sun, excess solar energy charges your battery and exports credits to the utility grid. During expensive evening peak rate hours (4 PM – 9 PM), your smart inverter automatically powers your home from stored solar energy so you avoid peak utility tariffs.'
  }
] as const;

export const turnkeySteps = [
    {
      step: '01',
      title: 'LiDAR 3D Roof & Shade Audit',
      duration: '24 Hours',
      desc: 'Satellite & LiDAR irradiance modeling maps sun-path angles, roof pitch, and panel placement with 99.2% production accuracy.',
      icon: Sun
    },
    {
      step: '02',
      title: 'Permitting & Utility Interconnection',
      duration: 'Days 2–14',
      desc: 'Our in-house engineering team handles structural stamps, HOA architectural packets, city permits, and utility net-metering applications.',
      icon: FileCheck2
    },
    {
      step: '03',
      title: '1-Day White-Glove Installation',
      duration: '1 Day On-Site',
      desc: 'NABCEP-certified master electricians install Tier-1 all-black panels, concealed attic conduit, and battery storage with zero exposed wiring.',
      icon: Wrench
    },
    {
      step: '04',
      title: 'PTO Activation & 24/7 Monitoring',
      duration: '25-Yr Warranty',
      desc: 'Following final utility Permission to Operate (PTO), track real-time solar generation, battery reserve, and grid export credits from your phone.',
      icon: Activity
    }
  ];
