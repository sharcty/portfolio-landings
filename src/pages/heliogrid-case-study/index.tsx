import {
  CASE_STUDIES,
  VERIFIED_REVIEWS,
  ENGINEERING_FAQS,
  TELEMETRY_BY_MODE,
  TELEMETRY_MODE_OPTIONS
} from './data';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Sun,
  BatteryCharging,
  ShieldCheck,
  Phone,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Zap,
  MapPin,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Plus,
  Building2,
  Home,
  Award,
  TrendingDown,
  FileText,
  Sparkles,
  Power
} from 'lucide-react';

/**
 * Verified Case-Study Projects for the Interactive Before / After Split Slider
 */

/**
 * Verified Homeowner & Facility Reviews for Carousel
 */

/**
 * Engineering FAQ Ledger Items
 */

/**
 * Currency & Phone Formatters
 */
function formatUSD(val) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(Math.round(val));
}

function formatPhoneUS(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/**
 * Simulated Regional Solar Irradiance Lookup from 5-Digit US ZIP
 */
function lookupSolarZone(zip) {
  if (!/^\d{5}$/.test(zip)) return null;
  const prefix = Number(zip.slice(0, 2));
  if (prefix >= 85 && prefix <= 89) {
    return {
      zone: 'ZONE 1 // DESERT SOUTHWEST HIGH-IRRADIANCE',
      sunHours: 6.4,
      yieldFactor: 1680,
      utilityRate: '$0.19 / kWh (TOU Peak $0.34)'
    };
  }
  if (prefix >= 90 && prefix <= 96) {
    return {
      zone: 'ZONE 1A // CALIFORNIA NEM-3.0 STORAGE OPTIMAL',
      sunHours: 5.9,
      yieldFactor: 1590,
      utilityRate: '$0.41 / kWh Tiered Avg'
    };
  }
  if (prefix >= 75 && prefix <= 79) {
    return {
      zone: 'ZONE 2 // ERCOT SOUTH-CENTRAL SOLAR BELT',
      sunHours: 5.5,
      yieldFactor: 1490,
      utilityRate: '$0.17 / kWh + Summer Surge'
    };
  }
  if (prefix >= 32 && prefix <= 34) {
    return {
      zone: 'ZONE 2 // SUNSHINE COASTAL CORRIDOR',
      sunHours: 5.4,
      yieldFactor: 1460,
      utilityRate: '$0.16 / kWh'
    };
  }
  return {
    zone: 'ZONE 3 // TEMPERATE HIGH-EFFICIENCY N-TYPE',
    sunHours: 4.8,
    yieldFactor: 1340,
    utilityRate: '$0.22 / kWh Regional Avg'
  };
}

/**
 * Custom Architectural SVG Elevation Blueprint of a Modern Roof with Live Telemetry Modes
 */
function ArchitecturalRoofBlueprint({ mode, onSelectMode }) {
  const t = TELEMETRY_BY_MODE[mode];

  return (
    <div className="border border-[#0D1612]/20 bg-[#EFECE4] p-4 sm:p-5 space-y-4">
      {/* Top Blueprint Header & Telemetry Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0D1612]/15 pb-3">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0D1612]">
          CAD ELEVATION // REV 4.2 — TIER-1 N-TYPE ARRAY
        </div>

        <div className="flex flex-wrap border border-[#0D1612]/25 bg-[#F6F5F0] font-mono text-[10px]">
          {TELEMETRY_MODE_OPTIONS.map((btn, idx) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => onSelectMode(btn.id)}
              className={`px-2.5 py-1.5 font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                idx < 2 ? 'border-r border-[#0D1612]/20' : ''
              } ${
                mode === btn.id
                  ? 'bg-[#0D1612] text-[#F6F5F0]'
                  : 'text-[#4B5550] hover:text-[#0D1612]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Architectural Roof Elevation & Energy Routing SVG */}
      <div className="relative w-full overflow-hidden border border-[#0D1612]/15 bg-[#F6F5F0] p-3">
        <svg
          viewBox="0 0 640 245"
          className="w-full h-auto select-none"
          role="img"
          aria-label="Architectural solar roof elevation and battery storage telemetry diagram"
        >
          {/* Architectural Blueprint Grid Lines */}
          <defs>
            <pattern id="archGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#0D1612"
                strokeOpacity="0.06"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="640" height="245" fill="url(#archGrid)" />

          {/* Solar Irradiance Sun / Moon Indicator */}
          <g opacity={t.sunOpacity}>
            <circle cx="88" cy="48" r="16" fill="#D97706" fillOpacity="0.2" />
            <circle cx="88" cy="48" r="9" fill="#D97706" />
            <line x1="112" y1="56" x2="185" y2="82" stroke="#D97706" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="106" y1="68" x2="165" y2="104" stroke="#D97706" strokeWidth="1.5" strokeDasharray="4 4" />
          </g>

          {/* Ground Datum Line */}
          <line x1="24" y1="205" x2="616" y2="205" stroke="#0D1612" strokeWidth="1.5" />
          <text x="30" y="220" fill="#4B5550" fontSize="9" fontFamily="monospace">
            DATUM +0.00 FT // FLUSH STANDING-SEAM RACKING (140 MPH WIND RATED)
          </text>

          {/* Modern Architectural Single-Slope / Butterfly Roofline */}
          <polygon
            points="115,135 375,65 445,112 445,205 115,205"
            fill="#EAE6DC"
            stroke="#0D1612"
            strokeWidth="1.8"
          />
          {/* Overhang Fascia Line */}
          <line x1="98" y1="140" x2="382" y2="63" stroke="#0D1612" strokeWidth="3" />

          {/* Tier-1 N-Type Solar Panel Array Mounted on Roof Slope */}
          <g transform="translate(145, 118) rotate(-15)">
            {[0, 1, 2, 3, 4].map((col) => (
              <g key={col} transform={`translate(${col * 42}, 0)`}>
                <rect
                  x="0"
                  y="0"
                  width="38"
                  height="24"
                  fill={t.panelFill}
                  stroke="#D97706"
                  strokeWidth="1.2"
                />
                <line x1="19" y1="0" x2="19" y2="24" stroke="#F6F5F0" strokeOpacity="0.2" strokeWidth="0.8" />
                <line x1="0" y1="12" x2="38" y2="12" stroke="#F6F5F0" strokeOpacity="0.2" strokeWidth="0.8" />
              </g>
            ))}
          </g>

          {/* Architectural Floor-to-Ceiling Glazing */}
          <rect x="145" y="152" width="95" height="53" fill="#D8E2DC" stroke="#0D1612" strokeWidth="1.2" />
          <line x1="192" y1="152" x2="192" y2="205" stroke="#0D1612" strokeWidth="1" />
          <rect x="265" y="152" width="75" height="53" fill="#D8E2DC" stroke="#0D1612" strokeWidth="1.2" />

          {/* Wall-Mounted LFP Battery Storage Units (2x Powerwall Stack) */}
          <rect x="378" y="140" width="24" height="44" fill="#0D1612" stroke="#15803D" strokeWidth="1.5" />
          <rect x="387" y="148" width="4" height="24" fill="#15803D" />
          <rect x="407" y="140" width="24" height="44" fill="#0D1612" stroke="#15803D" strokeWidth="1.5" />
          <rect x="416" y="148" width="4" height="24" fill="#15803D" />

          {/* Conduit / Energy Routing Line to Telemetry Box */}
          <path
            d="M 431 162 L 478 162"
            stroke={t.accent}
            strokeWidth="2"
            strokeDasharray="4 3"
          />

          {/* Live Telemetry Callout Panel (Right Side of Blueprint) */}
          <rect x="478" y="28" width="146" height="162" fill="#0D1612" />
          <text x="488" y="48" fill="#D97706" fontSize="9" fontFamily="monospace" fontWeight="700">
            LIVE TELEMETRY
          </text>
          <line x1="488" y1="55" x2="614" y2="55" stroke="#F6F5F0" strokeOpacity="0.2" />

          <text x="488" y="73" fill="#9CA3AF" fontSize="8" fontFamily="monospace">
            ROOF ARRAY OUTPUT
          </text>
          <text x="488" y="86" fill="#F6F5F0" fontSize="10.5" fontFamily="monospace" fontWeight="700">
            {t.arrayOutput}
          </text>

          <text x="488" y="106" fill="#9CA3AF" fontSize="8" fontFamily="monospace">
            LFP BATTERY BANK
          </text>
          <text x="488" y="119" fill="#4ADE80" fontSize="9.5" fontFamily="monospace" fontWeight="700">
            {t.batteryFlow}
          </text>

          <text x="488" y="139" fill="#9CA3AF" fontSize="8" fontFamily="monospace">
            ACTIVE HOME LOAD
          </text>
          <text x="488" y="152" fill="#F6F5F0" fontSize="10" fontFamily="monospace" fontWeight="700">
            {t.homeLoad}
          </text>

          <text x="488" y="172" fill="#9CA3AF" fontSize="8" fontFamily="monospace">
            GRID METER STATUS
          </text>
          <text x="488" y="183" fill="#FBBF24" fontSize="8.5" fontFamily="monospace" fontWeight="700">
            {t.gridStatus}
          </text>
        </svg>
      </div>

      {/* Blueprint Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#4B5550]">
        <span className="font-semibold text-[#0D1612]">{t.badge}</span>
        <span>TIER-1 430W N-TYPE TOPCON • 98.4% INVERTER EFFICIENCY</span>
      </div>
    </div>
  );
}

export default function App() {
  // =========================================================================
  // 1. HERO ARCHITECTURAL BLUEPRINT TELEMETRY MODE STATE
  // =========================================================================
  const [blueprintMode, setBlueprintMode] = useState('sunny');

  // =========================================================================
  // 2. PINNED 4-STEP INSTANT ROOF & SAVINGS QUOTE WIZARD STATE
  // =========================================================================
  const [wizardStep, setWizardStep] = useState(1);
  const [propertyType, setPropertyType] = useState('Single-Family');
  const [roofMaterial, setRoofMaterial] = useState('Standing Seam Metal');
  const [monthlyBill, setMonthlyBill] = useState(440);
  const [batteryTier, setBatteryTier] = useState('1x'); // 'none' | '1x' | '2x'
  const [zipCode, setZipCode] = useState('85255');
  const [streetAddress, setStreetAddress] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [wizardError, setWizardError] = useState('');
  const [proposalUnlocked, setProposalUnlocked] = useState(false);

  const solarZone = useMemo(() => lookupSolarZone(zipCode), [zipCode]);

  // Dynamic Engineering Proposal Sizing Engine
  const engineeringProposal = useMemo(() => {
    const yieldFactor = solarZone ? solarZone.yieldFactor : 1550;
    const ratePerKwh =
      propertyType === 'Commercial'
        ? 0.23
        : zipCode.startsWith('9')
        ? 0.38
        : 0.21;

    const annualKwhNeeded = (monthlyBill * 12) / ratePerKwh;
    const rawKw = annualKwhNeeded / yieldFactor;
    const recommendedKw = Math.max(4.8, Number((Math.ceil(rawKw * 2) / 2).toFixed(1)));
    const panelCount = Math.ceil((recommendedKw * 1000) / 430);

    const roofAdder =
      roofMaterial === 'Standing Seam Metal'
        ? 0.08
        : roofMaterial === 'Concrete Tile'
        ? 0.14
        : 0;
    const solarBaseCost = recommendedKw * 1000 * (2.65 + roofAdder);
    const batteryCost =
      batteryTier === '2x' ? 18500 : batteryTier === '1x' ? 10200 : 0;

    const grossSystemCost = solarBaseCost + batteryCost;
    const federalItc30 = grossSystemCost * 0.3;
    const netSystemCost = grossSystemCost - federalItc30;

    const offsetPct = batteryTier === 'none' ? 0.89 : 0.95;
    const year1Savings = monthlyBill * 12 * offsetPct;
    const paybackYears = Number((netSystemCost / Math.max(1, year1Savings)).toFixed(1));

    return {
      recommendedKw,
      panelCount,
      grossSystemCost,
      federalItc30,
      netSystemCost,
      year1Savings,
      paybackYears
    };
  }, [monthlyBill, batteryTier, roofMaterial, propertyType, solarZone, zipCode]);

  const handleWizardNext = () => {
    setWizardError('');
    if (wizardStep === 3) {
      if (!/^\d{5}$/.test(zipCode)) {
        setWizardError('Please enter a valid 5-digit US ZIP code for irradiance modeling.');
        return;
      }
    }
    setWizardStep((s) => Math.min(4, s + 1));
  };

  const handleUnlockProposal = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail.trim())) {
      setWizardError('Please enter a valid email address to receive your CAD layout.');
      return;
    }
    const phoneDigits = leadPhone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setWizardError('Please enter a complete 10-digit phone number.');
      return;
    }
    setWizardError('');
    setProposalUnlocked(true);
  };

  // =========================================================================
  // 3. HORIZONTAL BEFORE / AFTER UTILITY BILL & CASE-STUDY SLIDER STATE
  // =========================================================================
  const [selectedCaseId, setSelectedCaseId] = useState('scottsdale');
  const [splitPct, setSplitPct] = useState(50);
  const splitContainerRef = useRef(null);
  const isDraggingSplit = useRef(false);

  const activeCase = useMemo(
    () => CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0],
    [selectedCaseId]
  );

  const updateSplitFromClientX = (clientX) => {
    const el = splitContainerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplitPct(Math.min(92, Math.max(8, pct)));
  };

  useEffect(() => {
    const onPointerMove = (e) => {
      if (!isDraggingSplit.current) return;
      updateSplitFromClientX(e.clientX);
    };
    const onPointerUp = () => {
      isDraggingSplit.current = false;
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  // =========================================================================
  // 4. 25-YEAR CUMULATIVE CASHFLOW & ROI SIMULATOR STATE
  // =========================================================================
  const [roiMonthlyBill, setRoiMonthlyBill] = useState(440);
  const [utilityEscalation, setUtilityEscalation] = useState(6); // 4 | 6 | 8 (%)
  const [financingMode, setFinancingMode] = useState('cash'); // 'cash' | 'loan'
  const [hoveredYearIdx, setHoveredYearIdx] = useState(null);

  const cashflowModel = useMemo(() => {
    const estKw = Math.max(5.5, (roiMonthlyBill * 12) / (0.22 * 1550));
    const grossCost = estKw * 2750 + 9800;
    const netCashCost = grossCost * 0.7; // After 30% Federal ITC
    const annualLoanPayment = (netCashCost * 0.0499) / (1 - Math.pow(1 + 0.0499, -20));

    const years = [];
    let utilityCum = 0;
    let solarCum = financingMode === 'cash' ? netCashCost : 0;
    let breakEvenYear = null;

    for (let y = 0; y <= 25; y++) {
      if (y > 0) {
        const annualUtility =
          roiMonthlyBill * 12 * Math.pow(1 + utilityEscalation / 100, y - 1);
        utilityCum += annualUtility;

        const gridStandby = 14 * 12 * Math.pow(1.02, y - 1);
        const loanCost = financingMode === 'loan' && y <= 20 ? annualLoanPayment : 0;
        solarCum += gridStandby + loanCost;

        if (breakEvenYear === null && utilityCum >= solarCum) {
          breakEvenYear = y;
        }
      }

      years.push({
        year: y,
        utilityCum,
        solarCum,
        netSavings: utilityCum - solarCum
      });
    }

    const yr25 = years[years.length - 1];
    return {
      years,
      netCashCost,
      breakEvenYear: breakEvenYear || 5,
      total25YrSavings: yr25.netSavings,
      utility25YrTotal: yr25.utilityCum,
      solar25YrTotal: yr25.solarCum
    };
  }, [roiMonthlyBill, utilityEscalation, financingMode]);

  // SVG Geometry for 25-Year Cumulative Cost Curve
  const roiSvg = useMemo(() => {
    const width = 680;
    const height = 270;
    const padL = 22;
    const padR = 22;
    const padT = 24;
    const padB = 30;
    const innerW = width - padL - padR;
    const innerH = height - padT - padB;

    const maxVal = Math.max(
      ...cashflowModel.years.map((d) => Math.max(d.utilityCum, d.solarCum)),
      50000
    );

    const coords = cashflowModel.years.map((d, idx) => {
      const x = padL + (idx / 25) * innerW;
      const yUtil = padT + innerH - (d.utilityCum / maxVal) * innerH;
      const ySolar = padT + innerH - (d.solarCum / maxVal) * innerH;
      return { ...d, x, yUtil, ySolar };
    });

    const utilPath = coords
      .map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.yUtil.toFixed(1)}`)
      .join(' ');
    const solarPath = coords
      .map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.ySolar.toFixed(1)}`)
      .join(' ');

    const savingsArea = `${utilPath} ${[...coords]
      .reverse()
      .map((c) => `L ${c.x.toFixed(1)} ${c.ySolar.toFixed(1)}`)
      .join(' ')} Z`;

    const breakEvenCoord =
      coords.find((c) => c.year === cashflowModel.breakEvenYear) || coords[5];

    return {
      width,
      height,
      padL,
      padR,
      padT,
      padB,
      coords,
      utilPath,
      solarPath,
      savingsArea,
      breakEvenCoord
    };
  }, [cashflowModel]);

  const activeRoiYear =
    hoveredYearIdx !== null ? roiSvg.coords[hoveredYearIdx] : roiSvg.coords[25];

  // =========================================================================
  // 5. VERIFIED REVIEWS CAROUSEL & FAQ ACCORDION STATE
  // =========================================================================
  const [reviewIdx, setReviewIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const activeReview = VERIFIED_REVIEWS[reviewIdx];

  return (
    <div className="min-h-screen bg-[#F6F5F0] text-[#0D1612] font-sans antialiased selection:bg-[#D97706] selection:text-[#F6F5F0] pb-16 lg:pb-0">
      {/* =====================================================================
          1. TOP UTILITY & ACCREDITATION BAR + MINIMAL ARCHITECTURAL HEADER
         ===================================================================== */}
      <div className="border-b border-[#0D1612]/15 bg-[#0D1612] px-4 py-2 font-mono text-[11px] text-[#F6F5F0]">
        <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5 text-[#FBBF24] font-semibold">
              <Award className="h-3.5 w-3.5" />
              NABCEP PV INSTALLATION PROFESSIONAL
            </span>
            <span className="hidden sm:inline text-[#F6F5F0]/30">|</span>
            <span className="hidden sm:inline text-[#F6F5F0]/85">
              TESLA POWERWALL PREMIER CERTIFIED
            </span>
          </div>

          <div className="font-semibold text-[#4ADE80]">
            ● 30% FEDERAL ITC TAX CREDIT ELIGIBLE (2026 SCHEDULE)
          </div>
        </div>
      </div>

      <header className="border-b border-[#0D1612]/15 bg-[#F6F5F0]">
        <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-4 px-4 sm:px-8 py-4">
          {/* Custom Geometric Solar-Grid SVG Wordmark */}
          <a href="#top" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center bg-[#0D1612] text-[#D97706]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2" y="2" width="9" height="9" stroke="#D97706" strokeWidth="2" />
                <rect x="13" y="2" width="9" height="9" stroke="#F6F5F0" strokeWidth="1.5" />
                <rect x="2" y="13" width="9" height="9" stroke="#F6F5F0" strokeWidth="1.5" />
                <rect x="13" y="13" width="9" height="9" fill="#D97706" />
              </svg>
            </div>
            <div>
              <span className="block font-mono text-base sm:text-lg font-bold tracking-[0.14em] uppercase text-[#0D1612]">
                HELIOGRID
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[#4B5550]">
                ARCHITECTURAL SOLAR &amp; STORAGE ENGINEERING
              </span>
            </div>
          </a>

          {/* Navigation + Click-to-Call Engineering Desk */}
          <div className="flex items-center gap-3 sm:gap-5">
            <nav className="hidden xl:flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-[#4B5550]">
              <a href="#case-studies" className="hover:text-[#0D1612] transition-colors">
                Verified Installations
              </a>
              <a href="#roi-simulator" className="hover:text-[#0D1612] transition-colors">
                25-Yr Cashflow Model
              </a>
              <a href="#engineering-faq" className="hover:text-[#0D1612] transition-colors">
                Engineering Specs
              </a>
            </nav>

            <a
              href="tel:+18005550194"
              className="hidden md:inline-flex items-center gap-2 border border-[#0D1612]/25 bg-white px-3.5 py-2 font-mono text-xs font-semibold text-[#0D1612] hover:border-[#0D1612] transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-[#D97706]" />
              <span>(800) 555-0194</span>
            </a>

            <a
              href="#quote-wizard"
              className="inline-flex items-center gap-2 bg-[#0D1612] px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-semibold text-[#F6F5F0] hover:bg-[#D97706] transition-colors"
            >
              <span>Roof Estimator</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. CONVERSION-FIRST ASYMMETRIC SPLIT HERO (60% LEFT / 40% RIGHT)
         ===================================================================== */}
      <section
        id="top"
        className="mx-auto max-w-[1380px] px-4 sm:px-8 pt-8 sm:pt-12 pb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          {/* LEFT COLUMN (60% -> 7 OF 12 COLS): ARCHITECTURAL HEADLINE + TELEMETRY + CAD BLUEPRINT */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 border border-[#0D1612]/20 bg-[#EFECE4] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-[#0D1612] font-semibold">
              <Sun className="h-3.5 w-3.5 text-[#D97706]" />
              <span>DIRECT-TO-ENGINEER SOLAR &amp; LFP MICROGRIDS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-[56px] font-bold tracking-[-0.03em] leading-[1.06] text-[#0D1612]">
              Eliminate 94% of Your Utility Bill With Tier-1 N-Type Solar.
            </h1>

            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#4B5550]">
              Zero door-to-door sales commissions. Every HelioGrid system is custom-engineered by licensed PE electrical engineers using 430W N-Type TOPCon modules, concealed attic conduit, and 20ms whole-home battery backup.
            </p>

            {/* Verified Regional Telemetry KPI Strip */}
            <div className="grid grid-cols-3 border border-[#0D1612]/20 bg-white divide-x divide-[#0D1612]/15 font-mono tabular-nums">
              <div className="p-3.5 sm:p-4">
                <div className="text-[10px] sm:text-[11px] uppercase text-[#4B5550]">
                  AVG 25-YR NET SAVINGS
                </div>
                <div className="mt-1 text-xl sm:text-2xl font-bold text-[#15803D]">
                  $48,200
                </div>
              </div>
              <div className="p-3.5 sm:p-4">
                <div className="text-[10px] sm:text-[11px] uppercase text-[#4B5550]">
                  AVG NET PAYBACK
                </div>
                <div className="mt-1 text-xl sm:text-2xl font-bold text-[#0D1612]">
                  5.4 YRS
                </div>
              </div>
              <div className="p-3.5 sm:p-4">
                <div className="text-[10px] sm:text-[11px] uppercase text-[#4B5550]">
                  SYSTEM WARRANTY
                </div>
                <div className="mt-1 text-xl sm:text-2xl font-bold text-[#D97706]">
                  25 YEARS
                </div>
              </div>
            </div>

            {/* Interactive Architectural Roof Elevation & Telemetry Blueprint */}
            <ArchitecturalRoofBlueprint
              mode={blueprintMode}
              onSelectMode={setBlueprintMode}
            />
          </div>

          {/* RIGHT COLUMN (40% -> 5 OF 12 COLS): HIGH-CONTRAST OBSIDIAN 4-STEP QUOTE WIZARD */}
          <div
            id="quote-wizard"
            className="lg:col-span-5 bg-[#0D1612] text-[#F6F5F0] border border-[#0D1612] p-6 sm:p-8 shadow-[0_24px_60px_rgba(13,22,18,0.18)] lg:sticky lg:top-6"
          >
            {/* Wizard Header & Step Progress Bar */}
            <div className="border-b border-[#F6F5F0]/15 pb-4 space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#FBBF24] font-semibold uppercase tracking-widest">
                  INSTANT ENGINEERING QUOTE
                </span>
                <span className="text-[#F6F5F0]/70 tabular-nums">
                  {proposalUnlocked ? 'PROPOSAL READY' : `STEP 0${wizardStep} OF 04`}
                </span>
              </div>

              {/* 4-Segment Progress Indicator */}
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-1.5 transition-colors ${
                      proposalUnlocked || step <= wizardStep
                        ? 'bg-[#D97706]'
                        : 'bg-[#F6F5F0]/15'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Validation Error Banner */}
            {wizardError && (
              <div className="mt-4 border border-[#FBBF24] bg-[#D97706]/20 px-3.5 py-2.5 font-mono text-xs text-[#FBBF24]">
                ! {wizardError}
              </div>
            )}

            {/* UNLOCKED ENGINEERING PROPOSAL SUMMARY */}
            {proposalUnlocked ? (
              <div className="mt-6 space-y-5">
                <div className="border border-[#15803D] bg-[#15803D]/20 p-4 space-y-1">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#4ADE80]">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>PRELIMINARY CAD &amp; ITC PROPOSAL GENERATED</span>
                  </div>
                  <p className="text-xs text-[#F6F5F0]/80">
                    Prepared for <strong>{leadEmail}</strong> • ZIP {zipCode} ({propertyType} / {roofMaterial})
                  </p>
                </div>

                {/* Tabular Engineering Sizing Readout */}
                <div className="divide-y divide-[#F6F5F0]/15 border border-[#F6F5F0]/20 bg-[#14221C] font-mono text-xs tabular-nums">
                  <div className="flex justify-between px-4 py-3">
                    <span className="text-[#F6F5F0]/70">RECOMMENDED ARRAY</span>
                    <span className="font-bold text-[#F6F5F0]">
                      {engineeringProposal.recommendedKw} kW ({engineeringProposal.panelCount} Panels)
                    </span>
                  </div>
                  <div className="flex justify-between px-4 py-3">
                    <span className="text-[#F6F5F0]/70">STORAGE CONFIGURATION</span>
                    <span className="font-bold text-[#F6F5F0]">
                      {batteryTier === '2x'
                        ? '27.0 kWh (2× LFP)'
                        : batteryTier === '1x'
                        ? '13.5 kWh (1× LFP)'
                        : 'Grid-Tied Only'}
                    </span>
                  </div>
                  <div className="flex justify-between px-4 py-3">
                    <span className="text-[#F6F5F0]/70">GROSS SYSTEM COST</span>
                    <span className="text-[#F6F5F0]">
                      {formatUSD(engineeringProposal.grossSystemCost)}
                    </span>
                  </div>
                  <div className="flex justify-between px-4 py-3 bg-[#15803D]/15">
                    <span className="text-[#4ADE80]">30% FEDERAL ITC CREDIT</span>
                    <span className="font-bold text-[#4ADE80]">
                      -{formatUSD(engineeringProposal.federalItc30)}
                    </span>
                  </div>
                  <div className="flex justify-between px-4 py-3.5 bg-[#0D1612]">
                    <span className="font-bold text-[#FBBF24]">NET AFTER-TAX COST</span>
                    <span className="text-base font-bold text-[#FBBF24]">
                      {formatUSD(engineeringProposal.netSystemCost)}
                    </span>
                  </div>
                  <div className="flex justify-between px-4 py-3">
                    <span className="text-[#F6F5F0]/70">EST. YEAR-1 SAVINGS</span>
                    <span className="font-bold text-[#4ADE80]">
                      {formatUSD(engineeringProposal.year1Savings)}/yr ({engineeringProposal.paybackYears} yr payback)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setProposalUnlocked(false);
                      setWizardStep(1);
                    }}
                    className="border border-[#F6F5F0]/25 px-4 py-2.5 font-mono text-xs uppercase text-[#F6F5F0]/80 hover:text-[#F6F5F0] cursor-pointer"
                  >
                    Recalculate
                  </button>
                  <a
                    href="tel:+18005550194"
                    className="flex-1 text-center bg-[#D97706] px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-bold text-[#0D1612] hover:bg-[#F59E0B] transition-colors"
                  >
                    Book 15-Min Engineer Review
                  </a>
                </div>
              </div>
            ) : (
              /* 4-STEP INTERACTIVE WIZARD BODY */
              <div className="mt-6 space-y-6">
                {/* STEP 1: PROPERTY & ROOF TYPE */}
                {wizardStep === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-[#F6F5F0]">
                        1. Select Property &amp; Roof Structure
                      </h2>
                      <p className="text-xs text-[#F6F5F0]/70 mt-1">
                        Determines structural racking hardware and wind-uplift engineering.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-[#F6F5F0]/70">
                        PROPERTY CLASSIFICATION
                      </span>
                      <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                        {['Single-Family', 'Luxury Estate', 'Commercial'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setPropertyType(type)}
                            className={`border p-3 text-center transition-colors cursor-pointer ${
                              propertyType === type
                                ? 'border-[#D97706] bg-[#D97706]/20 text-[#FBBF24] font-bold'
                                : 'border-[#F6F5F0]/20 bg-[#14221C] text-[#F6F5F0]/80 hover:border-[#F6F5F0]/50'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-[#F6F5F0]/70">
                        PRIMARY ROOFING MATERIAL
                      </span>
                      <div className="space-y-2 font-mono text-xs">
                        {[
                          {
                            name: 'Standing Seam Metal',
                            note: 'Zero-penetration S-5! seam clamps'
                          },
                          {
                            name: 'Concrete Tile',
                            note: 'Flashed structural tile-hook standoffs'
                          },
                          {
                            name: 'Architectural Shingle',
                            note: 'EPDM watertight lag-bolt flashing'
                          }
                        ].map((roof) => (
                          <button
                            key={roof.name}
                            type="button"
                            onClick={() => setRoofMaterial(roof.name)}
                            className={`flex w-full items-center justify-between border p-3.5 text-left transition-colors cursor-pointer ${
                              roofMaterial === roof.name
                                ? 'border-[#D97706] bg-[#D97706]/20 text-[#F6F5F0]'
                                : 'border-[#F6F5F0]/20 bg-[#14221C] text-[#F6F5F0]/80 hover:border-[#F6F5F0]/50'
                            }`}
                          >
                            <div>
                              <div className="font-bold">{roof.name}</div>
                              <div className="text-[10px] text-[#F6F5F0]/60 mt-0.5">
                                {roof.note}
                              </div>
                            </div>
                            {roofMaterial === roof.name && (
                              <Check className="h-4 w-4 text-[#FBBF24]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: MONTHLY UTILITY BILL SLIDER & BATTERY STORAGE */}
                {wizardStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-[#F6F5F0]">
                        2. Average Electric Bill &amp; Outage Backup
                      </h2>
                      <p className="text-xs text-[#F6F5F0]/70 mt-1">
                        Sizes your N-Type solar array to offset 94%+ of annual kWh consumption.
                      </p>
                    </div>

                    <div className="border border-[#F6F5F0]/15 bg-[#14221C] p-4 space-y-3">
                      <div className="flex items-baseline justify-between font-mono">
                        <span className="text-xs uppercase text-[#F6F5F0]/70">
                          AVG MONTHLY UTILITY BILL
                        </span>
                        <span className="text-2xl font-bold text-[#FBBF24] tabular-nums">
                          {formatUSD(monthlyBill)}/mo
                        </span>
                      </div>

                      <input
                        type="range"
                        min={150}
                        max={1200}
                        step={10}
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(Number(e.target.value))}
                        className="w-full h-1.5 bg-[#0D1612] accent-[#D97706] cursor-pointer"
                      />

                      <div className="flex justify-between font-mono text-[10px] text-[#F6F5F0]/60">
                        <span>$150/mo</span>
                        <span>Est. {engineeringProposal.recommendedKw} kW Array</span>
                        <span>$1,200/mo</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-[#F6F5F0]/70">
                        LFP BATTERY BACKUP STORAGE (30% ITC ELIGIBLE)
                      </span>
                      <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                        {[
                          { id: 'none', title: 'Solar Only', sub: 'Grid-Tied' },
                          { id: '1x', title: '1× 13.5 kWh', sub: 'Essential Loads' },
                          { id: '2x', title: '2× 27.0 kWh', sub: 'Whole-Home HVAC' }
                        ].map((bat) => (
                          <button
                            key={bat.id}
                            type="button"
                            onClick={() => setBatteryTier(bat.id)}
                            className={`border p-3 text-left transition-colors cursor-pointer ${
                              batteryTier === bat.id
                                ? 'border-[#15803D] bg-[#15803D]/25 text-[#F6F5F0]'
                                : 'border-[#F6F5F0]/20 bg-[#14221C] text-[#F6F5F0]/80'
                            }`}
                          >
                            <div className="font-bold">{bat.title}</div>
                            <div className="text-[10px] text-[#4ADE80] mt-0.5">
                              {bat.sub}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: 5-DIGIT ZIP & SOLAR IRRADIANCE ZONE LOOKUP */}
                {wizardStep === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-[#F6F5F0]">
                        3. Regional Solar Irradiance &amp; Roof Location
                      </h2>
                      <p className="text-xs text-[#F6F5F0]/70 mt-1">
                        Pulls NREL peak sun-hour telemetry and local utility net-metering tariffs.
                      </p>
                    </div>

                    <div className="space-y-3 font-mono">
                      <div>
                        <label className="block text-[11px] uppercase text-[#F6F5F0]/70 mb-1">
                          5-DIGIT PROPERTY ZIP CODE *
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          value={zipCode}
                          onChange={(e) =>
                            setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))
                          }
                          placeholder="85255"
                          className="w-full border border-[#F6F5F0]/25 bg-[#14221C] px-3.5 py-2.5 text-sm text-[#F6F5F0] focus:outline-none focus:border-[#D97706]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase text-[#F6F5F0]/70 mb-1">
                          STREET ADDRESS (OPTIONAL FOR LIDAR SHADE CHECK)
                        </label>
                        <input
                          type="text"
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                          placeholder="10420 E Pinnacle Peak Rd"
                          className="w-full border border-[#F6F5F0]/25 bg-[#14221C] px-3.5 py-2.5 text-sm text-[#F6F5F0] focus:outline-none focus:border-[#D97706]"
                        />
                      </div>
                    </div>

                    {solarZone && (
                      <div className="border border-[#D97706]/50 bg-[#D97706]/15 p-3.5 font-mono text-xs space-y-1.5">
                        <div className="text-[#FBBF24] font-bold">
                          ✓ {solarZone.zone}
                        </div>
                        <div className="flex justify-between text-[11px] text-[#F6F5F0]/85">
                          <span>PEAK SUN HOURS: {solarZone.sunHours} hrs/day</span>
                          <span>TARIFF: {solarZone.utilityRate}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 4: UNLOCK PERSONALIZED ENGINEERING PROPOSAL */}
                {wizardStep === 4 && (
                  <form onSubmit={handleUnlockProposal} className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-[#F6F5F0]">
                        4. Unlock Your Custom Engineering Proposal
                      </h2>
                      <p className="text-xs text-[#F6F5F0]/70 mt-1">
                        Instant access to your {engineeringProposal.recommendedKw} kW sizing, 30% Federal ITC tax credit breakdown, and 25-year payback ledger.
                      </p>
                    </div>

                    <div className="space-y-3 font-mono">
                      <div>
                        <label className="block text-[11px] uppercase text-[#F6F5F0]/70 mb-1">
                          WORK OR PERSONAL EMAIL *
                        </label>
                        <input
                          type="email"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="homeowner@domain.com"
                          className="w-full border border-[#F6F5F0]/25 bg-[#14221C] px-3.5 py-2.5 text-sm text-[#F6F5F0] focus:outline-none focus:border-[#D97706]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase text-[#F6F5F0]/70 mb-1">
                          DIRECT PHONE NUMBER *
                        </label>
                        <input
                          type="tel"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(formatPhoneUS(e.target.value))}
                          placeholder="(555) 123-4567"
                          className="w-full border border-[#F6F5F0]/25 bg-[#14221C] px-3.5 py-2.5 text-sm text-[#F6F5F0] focus:outline-none focus:border-[#D97706]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 bg-[#D97706] py-3.5 font-mono text-xs uppercase tracking-widest font-bold text-[#0D1612] hover:bg-[#F59E0B] transition-colors cursor-pointer"
                    >
                      <span>Generate Engineering Proposal</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}

                {/* Wizard Navigation Controls (Steps 1–3) */}
                {wizardStep < 4 && (
                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#F6F5F0]/15">
                    {wizardStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => {
                          setWizardError('');
                          setWizardStep((s) => s - 1);
                        }}
                        className="inline-flex items-center gap-1.5 border border-[#F6F5F0]/25 px-4 py-2.5 font-mono text-xs uppercase text-[#F6F5F0]/80 hover:text-[#F6F5F0] cursor-pointer"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>Back</span>
                      </button>
                    ) : (
                      <span className="font-mono text-[10px] text-[#F6F5F0]/50">
                        NO OBLIGATION • 60-SEC ESTIMATE
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={handleWizardNext}
                      className="inline-flex items-center gap-2 bg-[#D97706] px-6 py-3 font-mono text-xs uppercase tracking-wider font-bold text-[#0D1612] hover:bg-[#F59E0B] transition-colors cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. INTERACTIVE HORIZONTAL BEFORE / AFTER UTILITY BILL & CASE-STUDY SLIDER
         ===================================================================== */}
      <section
        id="case-studies"
        className="border-y border-[#0D1612]/15 bg-[#EFECE4] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-[1380px] px-4 sm:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#D97706] font-bold">
                VERIFIED METER TELEMETRY // BEFORE &amp; AFTER LEDGER
              </div>
              <h2 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-[#0D1612]">
                Inspect Real Customer Utility Statements
              </h2>
            </div>

            {/* 3 Verified Project Selector Tabs */}
            <div className="flex flex-wrap border border-[#0D1612]/25 bg-[#F6F5F0] font-mono text-xs">
              {CASE_STUDIES.map((cs, idx) => (
                <button
                  key={cs.id}
                  type="button"
                  onClick={() => setSelectedCaseId(cs.id)}
                  className={`px-4 py-2.5 font-semibold transition-colors cursor-pointer ${
                    idx < CASE_STUDIES.length - 1 ? 'border-r border-[#0D1612]/20' : ''
                  } ${
                    selectedCaseId === cs.id
                      ? 'bg-[#0D1612] text-[#F6F5F0]'
                      : 'text-[#4B5550] hover:text-[#0D1612]'
                  }`}
                >
                  {cs.tabLabel}
                </button>
              ))}
            </div>
          </div>

          {/* System Spec Banner */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border border-[#0D1612]/20 bg-[#F6F5F0] divide-y lg:divide-y-0 lg:divide-x divide-[#0D1612]/15 font-mono text-xs tabular-nums">
            <div className="p-4">
              <span className="block text-[10px] text-[#4B5550]">INSTALLATION SITE</span>
              <span className="font-bold text-[#0D1612]">{activeCase.location}</span>
            </div>
            <div className="p-4">
              <span className="block text-[10px] text-[#4B5550]">HARDWARE SPEC</span>
              <span className="font-bold text-[#0D1612]">{activeCase.systemSize}</span>
            </div>
            <div className="p-4">
              <span className="block text-[10px] text-[#4B5550]">ANNUAL GENERATION</span>
              <span className="font-bold text-[#15803D]">{activeCase.annualKwhProduced}</span>
            </div>
            <div className="p-4">
              <span className="block text-[10px] text-[#4B5550]">30% ITC &amp; PAYBACK</span>
              <span className="font-bold text-[#D97706]">
                {activeCase.itcClaimed} • {activeCase.netPayback}
              </span>
            </div>
          </div>

          {/* Draggable Horizontal Split Comparison Stage */}
          <div
            ref={splitContainerRef}
            onPointerDown={(e) => {
              isDraggingSplit.current = true;
              updateSplitFromClientX(e.clientX);
            }}
            className="relative border-2 border-[#0D1612] bg-[#F6F5F0] overflow-hidden select-none cursor-ew-resize min-h-[380px] sm:min-h-[350px]"
          >
            {/* UNDERLAY (RIGHT SIDE): AFTER HELIOGRID FIXED NET-ZERO BILL */}
            <div className="p-6 sm:p-10 bg-[#0D1612] text-[#F6F5F0] min-h-[380px] sm:min-h-[350px] flex flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F6F5F0]/15 pb-4 font-mono">
                <div>
                  <span className="bg-[#15803D] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    AFTER HELIOGRID // NET-ZERO MICROGRID
                  </span>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-[#4ADE80] tabular-nums">
                    ${activeCase.afterMonthly}/mo Fixed Grid Connection
                  </h3>
                </div>
                <div className="text-right text-xs text-[#F6F5F0]/70">
                  <div>LOCKED 25-YR ENERGY COST</div>
                  <div className="font-bold text-[#4ADE80]">97% UTILITY REDUCTION</div>
                </div>
              </div>

              <div className="my-6 divide-y divide-[#F6F5F0]/15 border border-[#F6F5F0]/15 bg-[#14221C] font-mono text-xs tabular-nums">
                {activeCase.afterLineItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3">
                    <span className="text-[#F6F5F0]/85">{item.label}</span>
                    <span className="font-bold text-[#4ADE80]">{item.amount}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-[#F6F5F0]/70">
                <span>STATUS: EXPORTING SURPLUS KWH TO UTILITY</span>
                <span>← DRAG DIVIDER TO COMPARE</span>
              </div>
            </div>

            {/* OVERLAY (LEFT SIDE CLIPPED): BEFORE SOLAR ESCALATING UTILITY BILL */}
            <div
              style={{ clipPath: `inset(0 ${100 - splitPct}% 0 0)` }}
              className="absolute inset-0 p-6 sm:p-10 bg-[#FAF9F5] text-[#0D1612] flex flex-col justify-between"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0D1612]/15 pb-4 font-mono">
                <div>
                  <span className="bg-[#B91C1C] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    BEFORE SOLAR // {activeCase.utilityProvider}
                  </span>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-[#B91C1C] tabular-nums">
                    ${activeCase.beforeMonthly}/mo → ${activeCase.projectedYr15Monthly}/mo
                  </h3>
                </div>
                <div className="text-right text-xs text-[#4B5550]">
                  <div>COMPOUNDING RATE INFLATION</div>
                  <div className="font-bold text-[#B91C1C]">UNPROTECTED PEAK TARIFFS</div>
                </div>
              </div>

              <div className="my-6 divide-y divide-[#0D1612]/15 border border-[#0D1612]/20 bg-white font-mono text-xs tabular-nums">
                {activeCase.beforeLineItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3">
                    <span className="text-[#0D1612]">{item.label}</span>
                    <span className="font-bold text-[#B91C1C]">{item.amount}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-[#4B5550]">
                <span>STATUS: 100% EXPOSED TO ANNUAL RATE HIKES</span>
                <span>DRAG DIVIDER →</span>
              </div>
            </div>

            {/* Vertical Drag Handle Bar */}
            <div
              style={{ left: `${splitPct}%` }}
              className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-[#D97706] shadow-[0_0_12px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-[#D97706] text-[#0D1612] border-2 border-[#0D1612] font-mono text-xs font-bold shadow-lg">
                ⇄
              </div>
            </div>
          </div>

          {/* Accessible Range Input Mirror for Keyboard & Fine Touch Control */}
          <div className="flex items-center gap-4 font-mono text-xs text-[#4B5550]">
            <span>BEFORE ({Math.round(splitPct)}%)</span>
            <input
              type="range"
              min={8}
              max={92}
              value={splitPct}
              onChange={(e) => setSplitPct(Number(e.target.value))}
              aria-label="Utility bill before and after comparison slider"
              className="flex-1 h-1.5 bg-[#0D1612]/20 accent-[#D97706] cursor-pointer"
            />
            <span>AFTER ({Math.round(100 - splitPct)}%)</span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. 25-YEAR CUMULATIVE CASHFLOW & ROI SIMULATOR
         ===================================================================== */}
      <section
        id="roi-simulator"
        className="mx-auto max-w-[1380px] px-4 sm:px-8 py-16 sm:py-20 space-y-8"
      >
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#D97706] font-bold">
            25-YEAR CAPITAL MODEL // UTILITY INFLATION VS. SOLAR ASSET
          </div>
          <h2 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-[#0D1612]">
            Cumulative 25-Year Utility Spend vs. HelioGrid Net Cost
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#0D1612]/20 bg-white">
          {/* LEFT 4 COLS: FINANCIAL MODEL PARAMETERS */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#0D1612]/15 p-6 sm:p-7 bg-[#F6F5F0] space-y-6">
            {/* Monthly Utility Bill Slider */}
            <div className="space-y-2">
              <div className="flex items-baseline justify-between font-mono">
                <label className="text-xs uppercase text-[#4B5550]">
                  CURRENT MONTHLY BILL
                </label>
                <span className="text-xl font-bold text-[#0D1612] tabular-nums">
                  {formatUSD(roiMonthlyBill)}/mo
                </span>
              </div>
              <input
                type="range"
                min={150}
                max={1200}
                step={10}
                value={roiMonthlyBill}
                onChange={(e) => setRoiMonthlyBill(Number(e.target.value))}
                className="w-full h-1.5 bg-[#0D1612]/20 accent-[#D97706] cursor-pointer"
              />
            </div>

            {/* Annual Utility Inflation Rate */}
            <div className="space-y-2">
              <span className="block font-mono text-xs uppercase text-[#4B5550]">
                UTILITY RATE INFLATION ASSUMPTION
              </span>
              <div className="grid grid-cols-3 border border-[#0D1612]/20 bg-white font-mono text-xs">
                {[4, 6, 8].map((rate, idx) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setUtilityEscalation(rate)}
                    className={`py-2.5 font-semibold transition-colors cursor-pointer ${
                      idx < 2 ? 'border-r border-[#0D1612]/15' : ''
                    } ${
                      utilityEscalation === rate
                        ? 'bg-[#0D1612] text-[#F6F5F0]'
                        : 'text-[#4B5550] hover:text-[#0D1612]'
                    }`}
                  >
                    {rate}% / yr
                  </button>
                ))}
              </div>
            </div>

            {/* Financing Mode */}
            <div className="space-y-2">
              <span className="block font-mono text-xs uppercase text-[#4B5550]">
                CAPITAL STRUCTURE
              </span>
              <div className="grid grid-cols-2 border border-[#0D1612]/20 bg-white font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setFinancingMode('cash')}
                  className={`py-2.5 px-2 font-semibold transition-colors cursor-pointer border-r border-[#0D1612]/15 ${
                    financingMode === 'cash'
                      ? 'bg-[#15803D] text-white'
                      : 'text-[#4B5550] hover:text-[#0D1612]'
                  }`}
                >
                  Cash + 30% ITC
                </button>
                <button
                  type="button"
                  onClick={() => setFinancingMode('loan')}
                  className={`py-2.5 px-2 font-semibold transition-colors cursor-pointer ${
                    financingMode === 'loan'
                      ? 'bg-[#15803D] text-white'
                      : 'text-[#4B5550] hover:text-[#0D1612]'
                  }`}
                >
                  $0-Down 4.99%
                </button>
              </div>
            </div>

            {/* Summary KPI Callout */}
            <div className="border-t border-[#0D1612]/15 pt-5 space-y-3 font-mono tabular-nums">
              <div className="flex justify-between text-xs">
                <span className="text-[#4B5550]">25-YR UTILITY DO-NOTHING:</span>
                <span className="font-bold text-[#B91C1C]">
                  {formatUSD(cashflowModel.utility25YrTotal)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#4B5550]">25-YR HELIOGRID NET COST:</span>
                <span className="font-bold text-[#0D1612]">
                  {formatUSD(cashflowModel.solar25YrTotal)}
                </span>
              </div>
              <div className="border border-[#15803D]/30 bg-[#15803D]/10 p-3.5">
                <div className="text-[10px] uppercase text-[#15803D] font-bold">
                  NET 25-YEAR WEALTH RETAINED
                </div>
                <div className="text-2xl font-bold text-[#15803D] mt-0.5">
                  +{formatUSD(cashflowModel.total25YrSavings)}
                </div>
                <div className="text-[11px] text-[#0D1612] mt-1">
                  Break-Even Crossover: <strong>Year {cashflowModel.breakEvenYear}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 8 COLS: INTERACTIVE SVG CUMULATIVE CASHFLOW CURVE */}
          <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-[#B91C1C] font-semibold">
                  <span className="h-2.5 w-2.5 bg-[#B91C1C]" />
                  Utility Do-Nothing Spend
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#15803D] font-semibold">
                  <span className="h-2.5 w-2.5 bg-[#15803D]" />
                  HelioGrid Cumulative Cost
                </span>
              </div>

              <div className="border border-[#0D1612]/20 bg-[#F6F5F0] px-3 py-1 tabular-nums">
                Year {activeRoiYear.year}:{' '}
                <span className="font-bold text-[#15803D]">
                  Net {activeRoiYear.netSavings >= 0 ? '+' : ''}
                  {formatUSD(activeRoiYear.netSavings)}
                </span>
              </div>
            </div>

            <svg
              viewBox={`0 0 ${roiSvg.width} ${roiSvg.height}`}
              className="w-full h-64 overflow-visible select-none"
              onMouseLeave={() => setHoveredYearIdx(null)}
            >
              {/* Horizontal Reference Lines */}
              {[0.25, 0.5, 0.75].map((r, i) => (
                <line
                  key={i}
                  x1={roiSvg.padL}
                  x2={roiSvg.width - roiSvg.padR}
                  y1={roiSvg.height * r}
                  y2={roiSvg.height * r}
                  stroke="#0D1612"
                  strokeOpacity="0.08"
                />
              ))}

              {/* Net Savings Shaded Wedge */}
              <path d={roiSvg.savingsArea} fill="#15803D" fillOpacity="0.12" />

              {/* Utility Escalating Cost Curve */}
              <path
                d={roiSvg.utilPath}
                fill="none"
                stroke="#B91C1C"
                strokeWidth="2.5"
              />

              {/* HelioGrid Cumulative Cost Curve */}
              <path
                d={roiSvg.solarPath}
                fill="none"
                stroke="#15803D"
                strokeWidth="2.5"
              />

              {/* Break-Even Crossover Marker */}
              {roiSvg.breakEvenCoord && (
                <g>
                  <circle
                    cx={roiSvg.breakEvenCoord.x}
                    cy={roiSvg.breakEvenCoord.ySolar}
                    r="6"
                    fill="#D97706"
                    stroke="#0D1612"
                    strokeWidth="1.5"
                  />
                  <text
                    x={roiSvg.breakEvenCoord.x}
                    y={roiSvg.breakEvenCoord.ySolar - 12}
                    textAnchor="middle"
                    className="fill-[#0D1612] font-mono text-[10px] font-bold"
                  >
                    YR {cashflowModel.breakEvenYear} BREAK-EVEN
                  </text>
                </g>
              )}

              {/* Hover Scrubber Vertical Line */}
              {activeRoiYear && (
                <g>
                  <line
                    x1={activeRoiYear.x}
                    x2={activeRoiYear.x}
                    y1={roiSvg.padT}
                    y2={roiSvg.height - roiSvg.padB}
                    stroke="#0D1612"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx={activeRoiYear.x}
                    cy={activeRoiYear.yUtil}
                    r="4"
                    fill="#B91C1C"
                  />
                  <circle
                    cx={activeRoiYear.x}
                    cy={activeRoiYear.ySolar}
                    r="4"
                    fill="#15803D"
                  />
                </g>
              )}

              {/* Year Labels & Interactive Hover Columns */}
              {roiSvg.coords.map((pt, idx) => {
                const hitW = (roiSvg.width - roiSvg.padL - roiSvg.padR) / 26;
                return (
                  <g key={pt.year}>
                    {pt.year % 5 === 0 && (
                      <text
                        x={pt.x}
                        y={roiSvg.height - 6}
                        textAnchor="middle"
                        className="fill-[#4B5550] font-mono text-[10px]"
                      >
                        Yr {pt.year}
                      </text>
                    )}
                    <rect
                      x={pt.x - hitW / 2}
                      y={0}
                      width={hitW}
                      height={roiSvg.height}
                      fill="transparent"
                      className="cursor-crosshair"
                      onMouseEnter={() => setHoveredYearIdx(idx)}
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. VERIFIED HOMEOWNER & FACILITY CAROUSEL + ENGINEERING FAQ LEDGER
         ===================================================================== */}
      <section
        id="engineering-faq"
        className="border-t border-[#0D1612]/15 bg-[#EFECE4] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-[1380px] px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT 5 COLS: VERIFIED HOMEOWNER & FACILITY CAROUSEL */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#D97706] font-bold">
                CLIENT FIELD REPORTS
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-[#0D1612]">
                Verified Homeowner &amp; Facility Outcomes
              </h2>
            </div>

            <div className="border border-[#0D1612] bg-[#0D1612] text-[#F6F5F0] p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="bg-[#15803D] px-2.5 py-0.5 font-bold text-white">
                  {activeReview.verifiedSavings}
                </span>
                <span className="text-[#F6F5F0]/60">
                  0{reviewIdx + 1} / 0{VERIFIED_REVIEWS.length}
                </span>
              </div>

              <blockquote className="text-base sm:text-lg leading-relaxed text-[#F6F5F0]">
                “{activeReview.quote}”
              </blockquote>

              <div className="border-t border-[#F6F5F0]/15 pt-4 space-y-1 font-mono text-xs">
                <div className="font-bold text-[#FBBF24]">{activeReview.client}</div>
                <div className="text-[#F6F5F0]/75">{activeReview.role}</div>
                <div className="text-[11px] text-[#4ADE80] pt-1">
                  SPEC: {activeReview.system}
                </div>
                <div className="text-[10px] text-[#F6F5F0]/60">
                  {activeReview.installTime}
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-1.5">
                  {VERIFIED_REVIEWS.map((r, i) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setReviewIdx(i)}
                      aria-label={`Select review ${i + 1}`}
                      className={`h-2 transition-all cursor-pointer ${
                        i === reviewIdx ? 'w-7 bg-[#D97706]' : 'w-2 bg-[#F6F5F0]/30'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setReviewIdx(
                        (prev) =>
                          (prev - 1 + VERIFIED_REVIEWS.length) % VERIFIED_REVIEWS.length
                      )
                    }
                    aria-label="Previous review"
                    className="border border-[#F6F5F0]/25 p-2 hover:border-[#D97706] cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setReviewIdx((prev) => (prev + 1) % VERIFIED_REVIEWS.length)
                    }
                    aria-label="Next review"
                    className="border border-[#F6F5F0]/25 p-2 hover:border-[#D97706] cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 7 COLS: HAIRLINE-BORDERED ENGINEERING FAQ ACCORDION */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#D97706] font-bold">
                TECHNICAL SPECIFICATIONS &amp; TAX CREDITS
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-[#0D1612]">
                Engineering &amp; Permitting FAQ Ledger
              </h2>
            </div>

            <div className="divide-y divide-[#0D1612]/20 border-y border-[#0D1612]/20 bg-[#F6F5F0]">
              {ENGINEERING_FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={idx} className="px-5">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left cursor-pointer group"
                    >
                      <span className="font-semibold text-base text-[#0D1612] group-hover:text-[#D97706] transition-colors">
                        {faq.q}
                      </span>
                      <Plus
                        className={`h-4 w-4 text-[#0D1612] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-45 text-[#D97706]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="pb-5 pr-6 text-sm leading-relaxed text-[#4B5550]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ARCHITECTURAL FOOTER
         ===================================================================== */}
      <footer className="border-t border-[#0D1612]/20 bg-[#0D1612] px-4 sm:px-8 py-8 font-mono text-xs text-[#F6F5F0]/70">
        <div className="mx-auto flex max-w-[1380px] flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            HELIOGRID ENERGY ENGINEERING LLC // ROC #348912 • NABCEP CERTIFIED
          </div>
          <div>
            © {new Date().getFullYear()} HELIOGRID.ENERGY • ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>

      {/* =====================================================================
          MOBILE STICKY BOTTOM 'GET INSTANT ROOF QUOTE' BAR
         ===================================================================== */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-[#F6F5F0]/15 bg-[#0D1612] px-4 py-3 flex items-center justify-between gap-3">
        <div className="font-mono text-[11px] text-[#F6F5F0]">
          <span className="text-[#4ADE80] font-bold">30% ITC</span> • Est.{' '}
          {formatUSD(engineeringProposal.year1Savings)}/yr saved
        </div>
        <a
          href="#quote-wizard"
          className="bg-[#D97706] px-4 py-2 font-mono text-xs uppercase font-bold text-[#0D1612]"
        >
          Get Instant Roof Quote
        </a>
      </div>
    </div>
  );
}