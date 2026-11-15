export const finishes = [
    {
      id: 'obsidian',
      name: 'Obsidian Matte',
      texture: 'Bead-Blasted Anodized Aluminum',
      swatch: '#18181B',
      ring: '#52525B',
      stockNote: 'In Stock — Ships Today',
      svgColors: {
        metalLight: '#52525B',
        metalMid: '#27272A',
        metalDark: '#09090B',
        shellLight: '#3F3F46',
        shellMid: '#18181B',
        shellDark: '#09090B',
        cushionLight: '#27272A',
        cushionDark: '#121215',
        grille: '#09090B',
        glow: '#D97706'
      }
    },
    {
      id: 'titanium',
      name: 'Titanium Sand',
      texture: 'Brushed Natural Titanium PVD',
      swatch: '#D6CFC7',
      ring: '#A8A29E',
      stockNote: 'Batch 04 — 14 Units Left',
      svgColors: {
        metalLight: '#F5F5F4',
        metalMid: '#D6CFC7',
        metalDark: '#A8A29E',
        shellLight: '#E7E5E4',
        shellMid: '#D6CFC7',
        shellDark: '#A8A29E',
        cushionLight: '#E5E0D8',
        cushionDark: '#C7BFB5',
        grille: '#57534E',
        glow: '#F59E0B'
      }
    },
    {
      id: 'cobalt',
      name: 'Midnight Cobalt',
      texture: 'Satin Deep-Blue Anodized',
      swatch: '#1E3A8A',
      ring: '#3B82F6',
      stockNote: 'In Stock — Ships Today',
      svgColors: {
        metalLight: '#60A5FA',
        metalMid: '#1E40AF',
        metalDark: '#172554',
        shellLight: '#2563EB',
        shellMid: '#1E3A8A',
        shellDark: '#0F172A',
        cushionLight: '#1E293B',
        cushionDark: '#0F172A',
        grille: '#090D16',
        glow: '#2563EB'
      }
    },
    {
      id: 'sienna',
      name: 'Burnt Sienna',
      texture: 'Warm Terracotta Edition',
      swatch: '#B45309',
      ring: '#D97706',
      stockNote: 'Limited Collector Batch — 7 Left',
      svgColors: {
        metalLight: '#F59E0B',
        metalMid: '#B45309',
        metalDark: '#78350F',
        shellLight: '#D97706',
        shellMid: '#B45309',
        shellDark: '#451A03',
        cushionLight: '#3F2E26',
        cushionDark: '#231712',
        grille: '#1C110A',
        glow: '#D97706'
      }
    }
  ];

export const sizeBundles = [
    {
      id: 'standard',
      label: 'Standard Fit',
      sublabel: 'Lambskin Memory Foam',
      priceDelta: 0,
      skuSuffix: 'STD'
    },
    {
      id: 'xl-cushion',
      label: 'XL Studio Cushion',
      sublabel: '+18% Deeper Acoustic Chamber',
      priceDelta: 15,
      skuSuffix: 'XLC'
    },
    {
      id: 'travel-bundle',
      label: 'Travel Bundle + Hard Case',
      sublabel: 'Hardshell Case + Flight DAC Cable',
      priceDelta: 35,
      skuSuffix: 'TRV'
    }
  ];

export const ancScenarios = {
    subway: {
      id: 'subway',
      label: 'Subway Commute',
      ambientDb: '82 dB',
      isolatedDb: '34 dB',
      reduction: '-48 dB',
      ambientDesc: 'Steel rail screech, brake friction & platform PA rumble',
      isolatedDesc: 'Total sub-bass cancellation — hear micro-reverb & vocal breath'
    },
    flight: {
      id: 'flight',
      label: 'Long-Haul Flight',
      ambientDb: '78 dB',
      isolatedDb: '30 dB',
      reduction: '-48 dB',
      ambientDesc: 'Constant 120Hz twin-turbofan cabin drone & air pressure hiss',
      isolatedDesc: 'Library-grade stillness at 38,000 ft with zero ear-cabin pressure'
    },
    office: {
      id: 'office',
      label: 'Open Office',
      ambientDb: '66 dB',
      isolatedDb: '21 dB',
      reduction: '-45 dB',
      ambientDesc: 'Nearby chatter, mechanical keyboards & HVAC airflow',
      isolatedDesc: 'Voice-band adaptive suppression locks in deep studio focus'
    }
  };

export const buyerReviews = [
    {
      author: 'Marcus Vance',
      role: 'Mastering Engineer, Los Angeles',
      rating: 5,
      variantTag: 'Titanium Sand • XL Studio Cushion',
      filterKey: 'Titanium Sand',
      date: '4 days ago',
      title: 'The beryllium transient speed rivals $1,500 open-backs.',
      body: 'I plugged AURA ONE in via USB-C lossless during a flight from LAX to Tokyo. The 48dB noise floor vanished the 787 cabin hum instantly, and the low-end sub-bass stays tight without any DSP bloat.'
    },
    {
      author: 'Elena Rostova',
      role: 'Industrial Architect, Zurich',
      rating: 5,
      variantTag: 'Obsidian Matte • Standard Fit',
      filterKey: 'Obsidian Matte',
      date: '1 week ago',
      title: 'Zero clamping fatigue even after a 9-hour studio session.',
      body: 'Most ANC headphones feel plasticky or pinch my glasses. The CNC anodized aluminum gimbal distributes the 254g weight effortlessly, and the machined tactile crown is a joy to use.'
    },
    {
      author: 'Devon K. Sterling',
      role: 'Frequent Flyer & Tech Founder',
      rating: 5,
      variantTag: 'Burnt Sienna • Travel Bundle + Hard Case',
      filterKey: 'Burnt Sienna',
      date: '2 weeks ago',
      title: '45-hour battery means I left my charger at home for a week.',
      body: 'The Burnt Sienna finish looks like a Leica camera in person. Spatial head-tracking locks dialog center-stage when watching films on my iPad, and multipoint switching is instantaneous.'
    }
  ];
