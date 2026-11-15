import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Building2,
  Home,
  Landmark,
  Sun,
  BatteryCharging,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Phone,
  MapPin,
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Zap,
  Award,
  TrendingDown,
  DollarSign,
  Sliders,
  AlertCircle,
  RotateCcw,
  Clock,
  FileCheck2,
  Wrench,
  Activity
} from 'lucide-react';
import RevealSection from '../../shared/RevealSection';
import FaqSection from './FaqSection';
import { solarTestimonials, turnkeySteps } from './data';
import {
  calculateQuoteProposal,
  calculateSolarFinancialModel,
  getPreviousQuoteStep,
  getQuotePhoneDigits,
  getQuoteStepTransition,
  isValidQuoteAddress,
  isValidQuoteEmail,
  isValidQuoteName,
  isValidQuotePhone,
  isValidQuoteZip,
  quoteBatteryOptions,
  quotePropertyOptions,
  type QuoteBatteryOption,
  type QuoteField,
  type QuotePropertyType,
  type QuoteStep
} from './quoteLogic';

const propertyIcons = {
  home: Home,
  landmark: Landmark,
  building: Building2
} as const;

/**
 * Custom Architectural Sun-Grid SVG Brand Logo for HelioGrid Energy
 */
function HelioGridLogo({ lightText = false }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F172A] border border-amber-500/40 shadow-md">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Architectural Solar Grid Rays */}
          <circle cx="12" cy="12" r="5" fill="#F59E0B" />
          <path
            d="M12 2V5M12 19V22M2 12H5M19 12H22M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M19.07 4.93L16.95 7.05M7.05 16.95L4.93 19.07"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect
            x="8.5"
            y="8.5"
            width="7"
            height="7"
            rx="1.5"
            stroke="#0F172A"
            strokeWidth="1.2"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span
          className={`text-lg font-extrabold tracking-tight leading-none ${
            lightText ? 'text-white' : 'text-[#0F172A]'
          }`}
        >
          Helio<span className="text-amber-500">Grid</span>
        </span>
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.18em] mt-0.5 ${
            lightText ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          Architectural Solar
        </span>
      </div>
    </div>
  );
}

/**
 * Helper to format US Phone numbers live as (555) 123-4567
 */
function formatPhoneNumber(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/**
 * Simulated Instant Solar Irradiance Zone lookup based on valid 5-digit ZIP prefix
 */
function getSolarIrradianceZone(zip) {
  if (!/^\d{5}$/.test(zip)) return null;
  const prefix = Number(zip.slice(0, 2));
  if (prefix >= 85 && prefix <= 96) {
    return {
      zone: 'Ultra-High Solar Irradiance Zone',
      sunHours: '6.1 Peak Sun Hrs/Day',
      incentiveNote: 'Eligible for 30% Federal ITC + State Net Billing'
    };
  }
  if (prefix >= 70 && prefix <= 84) {
    return {
      zone: 'High Solar Irradiance Zone',
      sunHours: '5.6 Peak Sun Hrs/Day',
      incentiveNote: 'Eligible for 30% Federal ITC + Property Tax Exemption'
    };
  }
  if (prefix >= 27 && prefix <= 39) {
    return {
      zone: 'Strong Sunbelt Irradiance Zone',
      sunHours: '5.3 Peak Sun Hrs/Day',
      incentiveNote: 'Eligible for 30% Federal ITC + Utility Buyback'
    };
  }
  return {
    zone: 'Verified Net-Metering Solar Zone',
    sunHours: '4.7 Peak Sun Hrs/Day',
    incentiveNote: 'Eligible for 30% Federal ITC + SREC Credits'
  };
}

export default function App() {
  // Mobile Navigation Drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3600);
  };

  // =========================================================================
  // 2. MULTI-STEP LEAD CAPTURE & ROOF FEASIBILITY FORM STATE
  // =========================================================================
  const [quoteStep, setQuoteStep] = useState<QuoteStep>(1);
  const [propertyType, setPropertyType] =
    useState<QuotePropertyType>('Single-Family Home');
  const [roofCondition, setRoofCondition] = useState('Asphalt Shingle • Under 10 Yrs');
  const [quoteMonthlyBill, setQuoteMonthlyBill] = useState(340);
  const [quoteBatteryOption, setQuoteBatteryOption] =
    useState<QuoteBatteryOption>('1x Powerwall (13.5 kWh)');
  const [streetAddress, setStreetAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [stepError, setStepError] = useState('');
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<QuoteField, boolean>>
  >({});

  const quoteCardRef = useRef(null);

  // Instant Validation Checks
  const isZipValid = isValidQuoteZip(zipCode);
  const isAddressValid = isValidQuoteAddress(streetAddress);
  const isNameValid = isValidQuoteName(fullName);
  const isEmailValid = isValidQuoteEmail(email);
  const phoneDigits = getQuotePhoneDigits(phone);
  const isPhoneValid = isValidQuotePhone(phone);

  const detectedIrradiance = useMemo(() => getSolarIrradianceZone(zipCode.trim()), [zipCode]);

  // Calculated Personalized Proposal Summary from Multi-Step Inputs
  const proposalMetrics = useMemo(
    () => calculateQuoteProposal(propertyType, quoteMonthlyBill, quoteBatteryOption),
    [propertyType, quoteMonthlyBill, quoteBatteryOption]
  );

  const handleNextQuoteStep = () => {
    const transition = getQuoteStepTransition(quoteStep, {
      propertyType,
      roofCondition,
      streetAddress,
      zipCode,
      fullName,
      email,
      phone
    });
    setStepError(transition.error);
    if (transition.touchedFields.length > 0) {
      setTouchedFields((prev) => ({
        ...prev,
        ...transition.touchedFields.reduce<Partial<Record<QuoteField, boolean>>>(
          (touched, field) => ({ ...touched, [field]: true }),
          {}
        )
      }));
    }
    setQuoteStep(transition.nextStep);
    if (transition.submitted) {
      showToast('3D LiDAR Roof Audit & Federal ITC Proposal generated!');
    }
  };

  const handleResetQuoteForm = () => {
    setQuoteStep(1);
    setStepError('');
    setTouchedFields({});
  };

  // =========================================================================
  // 3. INTERACTIVE 25-YEAR SOLAR & BATTERY COST-SAVINGS ESTIMATOR STATE
  // =========================================================================
  const [estMonthlySpend, setEstMonthlySpend] = useState(360);
  const [utilityInflationRate, setUtilityInflationRate] = useState(6); // 4%, 6%, 8%
  const [paymentMode, setPaymentMode] = useState<'loan' | 'cash'>('loan');
  const [includeStorage, setIncludeStorage] = useState(true);
  const [hoveredYearIdx, setHoveredYearIdx] = useState(null);

  const financialModel = useMemo(
    () =>
      calculateSolarFinancialModel(
        estMonthlySpend,
        utilityInflationRate,
        paymentMode,
        includeStorage
      ),
    [estMonthlySpend, utilityInflationRate, paymentMode, includeStorage]
  );

  // Custom SVG Chart Geometry for 25-Year Cumulative Cost Comparison
  const svgW = 680;
  const svgH = 260;
  const padL = 18;
  const padR = 18;
  const padT = 22;
  const padB = 30;

  const estimatorSvgGeometry = useMemo(() => {
    const data = financialModel.yearsData;
    const maxVal = Math.max(...data.map((d) => Math.max(d.noSolarCum, d.solarCum)), 10000);
    const innerW = svgW - padL - padR;
    const innerH = svgH - padT - padB;

    const coords = data.map((d, idx) => {
      const x = padL + (idx / (data.length - 1)) * innerW;
      const yUtility = padT + innerH - (d.noSolarCum / maxVal) * innerH;
      const ySolar = padT + innerH - (d.solarCum / maxVal) * innerH;
      return { ...d, x, yUtility, ySolar };
    });

    const utilityLine = coords
      .map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.yUtility.toFixed(1)}`)
      .join(' ');

    const solarLine = coords
      .map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.ySolar.toFixed(1)}`)
      .join(' ');

    // Shaded Savings Wedge between Utility Line (top) and Solar Line (bottom)
    const reversedSolar = [...coords]
      .reverse()
      .map((c) => `L ${c.x.toFixed(1)} ${c.ySolar.toFixed(1)}`)
      .join(' ');
    const savingsSpreadArea = `${utilityLine} ${reversedSolar} Z`;

    return { coords, utilityLine, solarLine, savingsSpreadArea };
  }, [financialModel.yearsData]);

  // =========================================================================
  // 4. VERIFIED HOMEOWNER & COMMERCIAL TESTIMONIAL CAROUSEL STATE
  // =========================================================================
  const [reviewCategory, setReviewCategory] = useState('All Installs');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const filteredTestimonials =
    reviewCategory === 'All Installs'
      ? solarTestimonials
      : solarTestimonials.filter((t) => t.category === reviewCategory);

  const safeCarouselIndex =
    filteredTestimonials.length > 0 ? carouselIndex % filteredTestimonials.length : 0;
  const activeTestimonial = filteredTestimonials[safeCarouselIndex];

  const handlePrevSlide = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  // =========================================================================
  // 5. TURNKEY TIMELINE & ACCESSIBLE FAQ ACCORDION
  // =========================================================================

  // Bottom CTA Quick ZIP jump to Hero Multi-Step Form
  const [footerZipInput, setFooterZipInput] = useState('');

  const handleFooterZipJump = (e) => {
    e.preventDefault();
    const cleaned = footerZipInput.replace(/\D/g, '').slice(0, 5);
    if (cleaned.length === 5) {
      setZipCode(cleaned);
      setQuoteStep(3);
    } else {
      setQuoteStep(1);
    }
    if (quoteCardRef.current) {
      quoteCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    showToast(
      cleaned.length === 5
        ? `Loaded ZIP ${cleaned} into your Roof Feasibility Calculator`
        : 'Scrolled to your Custom Roof Feasibility Form'
    );
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const formatUSD = (val) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] selection:bg-amber-500 selection:text-white">
      {/* Subtle Architectural Blueprint Grid Pattern */}
      <style>{`
        .architectural-grid {
          background-image:
            linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.035) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      {/* Non-Blocking Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-500/40 bg-[#0F172A] px-4 py-3 text-xs sm:text-sm font-medium text-white shadow-2xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          1. STICKY TRUST HEADER & MOBILE NAVIGATION
         ===================================================================== */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#FAF9F6]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
          {/* Logo + Certification Pill */}
          <div className="flex items-center gap-4">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="focus:outline-none"
            >
              <HelioGridLogo />
            </a>

            <div className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-emerald-600/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-800">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>NABCEP &amp; Tesla Powerwall Certified</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            {[
              { label: 'Savings Estimator', id: 'savings-estimator' },
              { label: 'Turnkey Process', id: 'turnkey-process' },
              { label: 'Verified Reviews', id: 'verified-reviews' },
              { label: 'Get Custom Quote', id: 'quote-form' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-[#0F172A] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls: Click-to-Call + Primary CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href="tel:+18005550194"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-[#0F172A] hover:border-slate-300 transition shadow-2xs"
            >
              <Phone className="h-3.5 w-3.5 text-amber-500" />
              <span>(800) 555-0194</span>
            </a>

            <button
              onClick={() => scrollToSection('quote-form')}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-[#0F172A] shadow-md shadow-amber-500/20 hover:bg-amber-400 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Get Free Roof Audit</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0F172A]"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              NABCEP &amp; Tesla Powerwall Certified Installer
            </div>
            {[
              { label: 'Savings Estimator', id: 'savings-estimator' },
              { label: 'Turnkey Process', id: 'turnkey-process' },
              { label: 'Verified Reviews', id: 'verified-reviews' },
              { label: 'Get Custom Quote', id: 'quote-form' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:+18005550194"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-[#0F172A]"
            >
              <Phone className="h-4 w-4 text-amber-500" />
              Call Engineering Desk: (800) 555-0194
            </a>
          </div>
        )}
      </header>

      {/* =====================================================================
          2. HIGH-IMPACT CONVERSION HERO + 4-STEP LEAD CAPTURE CARD
         ===================================================================== */}
      <section
        id="top"
        className="architectural-grid relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* LEFT COLUMN: High-Trust Architectural Value Proposition (6 Cols) */}
            <div className="lg:col-span-6 space-y-6 pt-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-900">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>NABCEP Certified • 25-Year Tier-1 Warranty</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl lg:text-[54px] lg:leading-[1.08]">
                Cut Your Utility Bill by Up to{' '}
                <span className="underline decoration-amber-500 decoration-4 underline-offset-4">
                  88%
                </span>{' '}
                With Custom Architectural Solar.
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-xl">
                Lock in predictable clean energy rates with concealed-conduit Tier-1 solar arrays and whole-home battery backup—engineered with LiDAR 3D shade modeling and installed in 1 day.
              </p>

              {/* 3 High-Trust Engineering Checkpoints */}
              <div className="space-y-3 pt-1">
                {[
                  {
                    title: '30% Federal ITC Tax Credit + $0-Down Financing',
                    sub: 'Immediate utility bill replacement with zero upfront capital required.'
                  },
                  {
                    title: '24/7 Whole-Home Blackout Protection',
                    sub: 'Seamless 20ms automatic transfer with Tesla Powerwall 3 & Enphase IQ.'
                  },
                  {
                    title: '25-Year Bumper-to-Bumper Production & Roof Guarantee',
                    sub: 'Triple-flashed zero-leak mounts engineered for 160 mph wind loads.'
                  }
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700">
                      <Check className="h-3.5 w-3.5 stroke-[2.8]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0F172A]">{point.title}</div>
                      <div className="text-xs text-slate-600">{point.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Compact Google / BBB 4.9★ Rating & Live Installs Summary Card */}
              <div className="pt-2">
                <div className="inline-flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F172A] text-amber-400 font-extrabold text-sm">
                      4.9★
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-[#0F172A]">
                        Google &amp; BBB A+ Rated
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Based on 1,420+ verified residential &amp; commercial installs
                      </div>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-slate-200 hidden sm:block" />

                  <div className="text-xs">
                    <div className="font-mono font-extrabold text-emerald-700">
                      $42.8M+
                    </div>
                    <div className="text-[11px] text-slate-500">Client Utility Savings</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE 4-STEP QUOTE & ROOF FEASIBILITY FORM (6 Cols) */}
            <div id="quote-form" ref={quoteCardRef} className="lg:col-span-6 scroll-mt-24">
              <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/10">
                {/* Dark Slate Navy Form Header + Animated Progress Bar */}
                <div className="bg-[#0F172A] px-6 py-5 text-white">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-wider text-amber-400">
                      {quoteStep <= 4
                        ? `Step ${quoteStep} of 4 • Free 3D Roof Feasibility Audit`
                        : 'Feasibility Audit Ready'}
                    </span>
                    <span className="font-mono text-slate-300">
                      {quoteStep <= 4 ? `${quoteStep * 25}% Complete` : '100% Complete'}
                    </span>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      style={{ width: `${quoteStep <= 4 ? quoteStep * 25 : 100}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Form Step Body */}
                <div className="p-6 sm:p-8">
                  {/* Inline Validation Error Alert */}
                  {stepError && (
                    <div
                      role="alert"
                      className="mb-5 flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-700"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                      <span>{stepError}</span>
                    </div>
                  )}

                  {/* STEP 1: PROPERTY TYPE & ROOF CONDITION */}
                  {quoteStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-extrabold text-[#0F172A]">
                          Select Your Property Type
                        </h2>
                        <p className="mt-1 text-xs sm:text-sm text-slate-500">
                          We calibrate panel racking, inverter topology, and federal tax incentives to your structure.
                        </p>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {quotePropertyOptions.map((item) => {
                            const Icon = propertyIcons[item.iconName];
                            const selected = propertyType === item.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setPropertyType(item.id)}
                                className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                                  selected
                                    ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-500/30'
                                    : 'border-slate-200 bg-[#FAF9F6] hover:border-slate-300'
                                }`}
                              >
                                <div
                                  className={`flex h-9 w-9 items-center justify-center rounded-xl mb-3 ${
                                    selected
                                      ? 'bg-amber-500 text-[#0F172A]'
                                      : 'bg-white text-slate-700 border border-slate-200'
                                  }`}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="text-xs sm:text-sm font-extrabold text-[#0F172A]">
                                  {item.id}
                                </div>
                                <div className="mt-0.5 text-[11px] text-slate-500">
                                  {item.sub}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                          Roof Material &amp; Condition
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'Asphalt Shingle • Under 10 Yrs',
                            'Concrete / Clay Tile',
                            'Standing Seam Metal',
                            'Flat Commercial TPO / EPDM',
                            'Roof Needs Replacement Soon'
                          ].map((mat) => {
                            const active = roofCondition === mat;
                            return (
                              <button
                                key={mat}
                                type="button"
                                onClick={() => setRoofCondition(mat)}
                                className={`rounded-full px-3.5 py-2 text-xs font-semibold border transition cursor-pointer ${
                                  active
                                    ? 'border-[#0F172A] bg-[#0F172A] text-white'
                                    : 'border-slate-200 bg-[#FAF9F6] text-slate-700 hover:border-slate-300'
                                }`}
                              >
                                {mat}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: AVERAGE MONTHLY ELECTRIC BILL & BATTERY BACKUP */}
                  {quoteStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-extrabold text-[#0F172A]">
                            Average Monthly Electric Bill
                          </h2>
                          <span className="rounded-xl bg-amber-500/15 px-3 py-1 font-mono text-xl font-extrabold text-amber-700">
                            ${quoteMonthlyBill}/mo
                          </span>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm text-slate-500">
                          Slide to match your current utility spend so we can size your offset.
                        </p>

                        <div className="mt-5">
                          <input
                            type="range"
                            min={150}
                            max={1200}
                            step={10}
                            value={quoteMonthlyBill}
                            onChange={(e) => setQuoteMonthlyBill(Number(e.target.value))}
                            className="w-full accent-amber-500 h-2.5 rounded-lg bg-slate-200 cursor-pointer"
                          />
                          <div className="mt-1.5 flex justify-between font-mono text-[11px] text-slate-400">
                            <span>$150/mo</span>
                            <span>$450/mo</span>
                            <span>$800/mo</span>
                            <span>$1,200+/mo</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                          Battery Backup &amp; Blackout Protection
                        </label>
                        <div className="space-y-2.5">
                          {quoteBatteryOptions.map((bat) => {
                            const active = quoteBatteryOption === bat.id;
                            return (
                              <button
                                key={bat.id}
                                type="button"
                                onClick={() => setQuoteBatteryOption(bat.id)}
                                className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition cursor-pointer ${
                                  active
                                    ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-500'
                                    : 'border-slate-200 bg-[#FAF9F6] hover:border-slate-300'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <BatteryCharging
                                    className={`h-4 w-4 shrink-0 ${
                                      active ? 'text-amber-600' : 'text-slate-400'
                                    }`}
                                  />
                                  <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
                                    {bat.title}
                                  </span>
                                </div>
                                <span
                                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold shrink-0 ml-2 ${
                                    active
                                      ? 'bg-amber-500 text-[#0F172A]'
                                      : 'bg-slate-200/80 text-slate-600'
                                  }`}
                                >
                                  {bat.badge}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: PROPERTY ADDRESS & INSTANT ZIP IRRADIANCE DETECTION */}
                  {quoteStep === 3 && (
                    <div className="space-y-5">
                      <div>
                        <h2 className="text-xl font-extrabold text-[#0F172A]">
                          Where Should We Run Your LiDAR Roof Scan?
                        </h2>
                        <p className="mt-1 text-xs sm:text-sm text-slate-500">
                          We analyze roof azimuth, tree shading, and local utility net-metering tariffs.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Street Address
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="text"
                            value={streetAddress}
                            onBlur={() =>
                              setTouchedFields((p) => ({ ...p, streetAddress: true }))
                            }
                            onChange={(e) => {
                              setStreetAddress(e.target.value);
                              setStepError('');
                            }}
                            placeholder="e.g. 7420 E Camelback Rd"
                            className={`w-full rounded-xl border pl-10 pr-4 py-3 text-sm font-medium focus:outline-none transition ${
                              touchedFields.streetAddress && !isAddressValid
                                ? 'border-rose-400 bg-rose-50/40'
                                : 'border-slate-300 bg-[#FAF9F6] focus:border-amber-500 focus:bg-white'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          5-Digit ZIP Code
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={5}
                          value={zipCode}
                          onBlur={() => setTouchedFields((p) => ({ ...p, zipCode: true }))}
                          onChange={(e) => {
                            const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 5);
                            setZipCode(digitsOnly);
                            setStepError('');
                          }}
                          placeholder="e.g. 85251"
                          className={`w-full rounded-xl border px-4 py-3 font-mono text-sm font-bold tracking-wider focus:outline-none transition ${
                            touchedFields.zipCode && !isZipValid
                              ? 'border-rose-400 bg-rose-50/40'
                              : isZipValid
                              ? 'border-emerald-500 bg-emerald-50/30'
                              : 'border-slate-300 bg-[#FAF9F6] focus:border-amber-500 focus:bg-white'
                          }`}
                        />
                      </div>

                      {/* Simulated Instant Solar Irradiance Zone Detection Badge */}
                      {detectedIrradiance ? (
                        <div className="rounded-2xl border border-emerald-500/35 bg-emerald-500/10 p-4 transition-all">
                          <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-800">
                            <Sun className="h-4 w-4 text-amber-500 shrink-0" />
                            <span>
                              {detectedIrradiance.zone} • {detectedIrradiance.sunHours}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-emerald-700">
                            ✓ {detectedIrradiance.incentiveNote}
                          </p>
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-[#FAF9F6] p-3.5 text-xs text-slate-500">
                          Enter a 5-digit ZIP code above to unlock instant peak sun-hour &amp; utility incentive lookup.
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 4: CONTACT DETAILS WITH INSTANT VALIDATION */}
                  {quoteStep === 4 && (
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-xl font-extrabold text-[#0F172A]">
                          Where Should We Send Your Custom Proposal?
                        </h2>
                        <p className="mt-1 text-xs sm:text-sm text-slate-500">
                          Includes 3D roof panel layout, 25-year utility offset model, and 30% Federal ITC breakdown.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onBlur={() => setTouchedFields((p) => ({ ...p, fullName: true }))}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            setStepError('');
                          }}
                          placeholder="Jordan Sterling"
                          className={`w-full rounded-xl border px-4 py-2.5 text-sm font-medium focus:outline-none ${
                            touchedFields.fullName && !isNameValid
                              ? 'border-rose-400 bg-rose-50/40'
                              : isNameValid
                              ? 'border-emerald-500 bg-white'
                              : 'border-slate-300 bg-[#FAF9F6] focus:border-amber-500 focus:bg-white'
                          }`}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                            Work or Personal Email
                          </label>
                          {email.length > 0 && (
                            <span
                              className={`text-[11px] font-semibold ${
                                isEmailValid ? 'text-emerald-600' : 'text-rose-600'
                              }`}
                            >
                              {isEmailValid ? '✓ Valid email' : 'Enter valid email'}
                            </span>
                          )}
                        </div>
                        <input
                          type="email"
                          value={email}
                          onBlur={() => setTouchedFields((p) => ({ ...p, email: true }))}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setStepError('');
                          }}
                          placeholder="jordan@example.com"
                          className={`w-full rounded-xl border px-4 py-2.5 text-sm font-medium focus:outline-none ${
                            touchedFields.email && !isEmailValid
                              ? 'border-rose-400 bg-rose-50/40'
                              : isEmailValid
                              ? 'border-emerald-500 bg-white'
                              : 'border-slate-300 bg-[#FAF9F6] focus:border-amber-500 focus:bg-white'
                          }`}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                            Mobile Phone (For SMS Report Link)
                          </label>
                          {phone.length > 0 && (
                            <span
                              className={`text-[11px] font-semibold ${
                                isPhoneValid ? 'text-emerald-600' : 'text-rose-600'
                              }`}
                            >
                              {isPhoneValid ? '✓ 10 digits verified' : `${phoneDigits.length}/10 digits`}
                            </span>
                          )}
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onBlur={() => setTouchedFields((p) => ({ ...p, phone: true }))}
                          onChange={(e) => {
                            setPhone(formatPhoneNumber(e.target.value));
                            setStepError('');
                          }}
                          placeholder="(555) 123-4567"
                          className={`w-full rounded-xl border px-4 py-2.5 font-mono text-sm font-medium focus:outline-none ${
                            touchedFields.phone && !isPhoneValid
                              ? 'border-rose-400 bg-rose-50/40'
                              : isPhoneValid
                              ? 'border-emerald-500 bg-white'
                              : 'border-slate-300 bg-[#FAF9F6] focus:border-amber-500 focus:bg-white'
                          }`}
                        />
                      </div>

                      <p className="text-[11px] text-slate-500">
                        Zero spam guarantee. Your property data is encrypted and reviewed solely by a NABCEP-certified HelioGrid engineer.
                      </p>
                    </div>
                  )}

                  {/* STEP 5: INSTANT PERSONALIZED SOLAR PROPOSAL CONFIRMATION */}
                  {quoteStep === 5 && (
                    <div className="space-y-5">
                      <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                        <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-extrabold text-[#0F172A]">
                            Custom Proposal Generated for {fullName}
                          </div>
                          <div className="text-xs text-slate-600 mt-0.5">
                            {streetAddress}, ZIP {zipCode} • {propertyType}
                          </div>
                        </div>
                      </div>

                      {/* Personalized System Sizing & Federal ITC Summary */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-slate-200 bg-[#FAF9F6] p-4">
                          <div className="text-[11px] font-semibold uppercase text-slate-500">
                            Recommended Array
                          </div>
                          <div className="mt-1 font-mono text-2xl font-extrabold text-[#0F172A]">
                            {proposalMetrics.systemSizeKw} kW
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {quoteBatteryOption}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/60 p-4">
                          <div className="text-[11px] font-semibold uppercase text-emerald-800">
                            30% Federal ITC Credit
                          </div>
                          <div className="mt-1 font-mono text-2xl font-extrabold text-emerald-700">
                            {formatUSD(proposalMetrics.federalItcCredit)}
                          </div>
                          <div className="text-[11px] text-emerald-700 mt-0.5">
                            Direct Tax Deduction
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Est. Monthly Utility Offset:</span>
                          <span className="font-mono font-extrabold text-emerald-700">
                            ~{formatUSD(proposalMetrics.estimatedMonthlySavings)}/mo saved
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Net System Investment (After ITC):</span>
                          <span className="font-mono font-bold text-[#0F172A]">
                            {formatUSD(proposalMetrics.netSystemCost)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">3D LiDAR CAD Report Sent To:</span>
                          <span className="font-semibold text-[#0F172A]">{email}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleResetQuoteForm}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-[#FAF9F6] py-3 text-xs font-bold text-[#0F172A] hover:bg-slate-100 transition cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset / Test Another Property
                      </button>
                    </div>
                  )}

                  {/* Form Step Navigation Buttons (Steps 1-4) */}
                  {quoteStep <= 4 && (
                    <div className="mt-7 flex items-center gap-3">
                      {quoteStep > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setStepError('');
                            setQuoteStep((prev) => getPreviousQuoteStep(prev));
                          }}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={handleNextQuoteStep}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3.5 text-xs sm:text-sm font-extrabold text-[#0F172A] shadow-lg shadow-amber-500/20 hover:bg-amber-400 active:scale-[0.99] transition-all cursor-pointer"
                      >
                        <span>
                          {quoteStep === 4
                            ? 'Unlock My Custom Solar Proposal'
                            : 'Continue to Next Step'}
                        </span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. INTERACTIVE SOLAR & BATTERY COST-SAVINGS ESTIMATOR
         ===================================================================== */}
      <section
        id="savings-estimator"
        className="py-20 sm:py-28 border-y border-slate-200 bg-white scroll-mt-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection className="mx-auto max-w-2xl text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              25-Year Financial Modeling Workbench
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
              Calculate Your 25-Year Solar &amp; Storage Return
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Model rising utility rate inflation against fixed clean-energy generation, federal tax credits, and whole-home battery storage.
            </p>
          </RevealSection>

          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl border border-slate-200 bg-[#FAF9F6] p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5">
              {/* LEFT CONTROLS (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* 1. Monthly Utility Spend Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Current Monthly Utility Spend
                    </label>
                    <span className="font-mono text-xl font-extrabold text-[#0F172A]">
                      ${estMonthlySpend}/mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={1500}
                    step={20}
                    value={estMonthlySpend}
                    onChange={(e) => setEstMonthlySpend(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2.5 rounded-lg bg-slate-200 cursor-pointer"
                  />
                  <div className="mt-1 flex justify-between font-mono text-[11px] text-slate-400">
                    <span>$100/mo</span>
                    <span>$500/mo</span>
                    <span>$1,000/mo</span>
                    <span>$1,500/mo</span>
                  </div>
                </div>

                {/* 2. Utility Rate Inflation Assumption Toggle */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Annual Utility Rate Inflation
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { rate: 4, label: '4% Conservative' },
                      { rate: 6, label: '6% Hist. Avg' },
                      { rate: 8, label: '8% High-Tier' }
                    ].map((opt) => {
                      const active = utilityInflationRate === opt.rate;
                      return (
                        <button
                          key={opt.rate}
                          type="button"
                          onClick={() => setUtilityInflationRate(opt.rate)}
                          className={`rounded-xl border py-2.5 px-2 text-xs font-bold transition cursor-pointer ${
                            active
                              ? 'border-[#0F172A] bg-[#0F172A] text-white shadow-sm'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Payment Option Switcher */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Acquisition Structure
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMode('loan')}
                      className={`rounded-xl border p-3 text-left transition cursor-pointer ${
                        paymentMode === 'loan'
                          ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-extrabold text-[#0F172A]">
                        $0-Down Solar Loan
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Est. ${financialModel.monthlyLoanPayment}/mo fixed
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMode('cash')}
                      className={`rounded-xl border p-3 text-left transition cursor-pointer ${
                        paymentMode === 'cash'
                          ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-extrabold text-[#0F172A]">
                        Cash + 30% ITC
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Max 25-yr ROI &amp; zero interest
                      </div>
                    </button>
                  </div>
                </div>

                {/* 4. Battery Storage Toggle */}
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700">
                      <BatteryCharging className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold text-[#0F172A]">
                        Include Battery Storage (13.5 kWh)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Peak TOU rate shaving + outage protection
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={includeStorage}
                    onClick={() => setIncludeStorage((prev) => !prev)}
                    className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                      includeStorage ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                        includeStorage ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* RIGHT REAL-TIME KPI OUTPUTS & CUSTOM SVG 25-YR CHART (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                {/* 4 Live Financial Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5">
                    <div className="text-[11px] font-semibold text-emerald-900">
                      25-Yr Net Savings
                    </div>
                    <div className="mt-1 font-mono text-xl sm:text-2xl font-extrabold text-emerald-700">
                      {formatUSD(financialModel.net25YearSavings)}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
                    <div className="text-[11px] font-semibold text-slate-500">
                      Yr-1 Bill Drop
                    </div>
                    <div className="mt-1 font-mono text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                      {financialModel.year1ReductionPct}%
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
                    <div className="text-[11px] font-semibold text-slate-500">
                      30% Federal ITC
                    </div>
                    <div className="mt-1 font-mono text-xl sm:text-2xl font-extrabold text-amber-600">
                      {formatUSD(financialModel.federalCredit)}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
                    <div className="text-[11px] font-semibold text-slate-500">
                      Est. Payback
                    </div>
                    <div className="mt-1 font-mono text-base sm:text-lg font-extrabold text-[#0F172A] pt-1">
                      {financialModel.paybackLabel}
                    </div>
                  </div>
                </div>

                {/* Custom SVG 25-Year Cumulative Cost Comparison Chart */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <span className="flex items-center gap-1.5 text-rose-700">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                        Utility Company (No Solar)
                      </span>
                      <span className="flex items-center gap-1.5 text-emerald-700">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        HelioGrid Solar ({financialModel.estKw} kW)
                      </span>
                    </div>

                    <div className="font-mono text-xs font-bold text-[#0F172A]">
                      {hoveredYearIdx !== null
                        ? `Year ${estimatorSvgGeometry.coords[hoveredYearIdx].year}: Save ${formatUSD(
                            estimatorSvgGeometry.coords[hoveredYearIdx].netSavings
                          )}`
                        : 'Hover chart to inspect any year'}
                    </div>
                  </div>

                  <svg
                    viewBox={`0 0 ${svgW} ${svgH}`}
                    className="w-full h-60 overflow-visible select-none"
                    onMouseLeave={() => setHoveredYearIdx(null)}
                  >
                    <defs>
                      <linearGradient id="solarSavingsSpread" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.26" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.04" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid Lines */}
                    {[0.2, 0.5, 0.8].map((ratio, idx) => (
                      <line
                        key={idx}
                        x1={padL}
                        x2={svgW - padR}
                        y1={svgH * ratio}
                        y2={svgH * ratio}
                        stroke="#E2E8F0"
                        strokeDasharray="4 4"
                      />
                    ))}

                    {/* Shaded Net Savings Wedge */}
                    <path
                      d={estimatorSvgGeometry.savingsSpreadArea}
                      fill="url(#solarSavingsSpread)"
                    />

                    {/* Rising Utility Company Cumulative Cost Curve */}
                    <path
                      d={estimatorSvgGeometry.utilityLine}
                      fill="none"
                      stroke="#F43F5E"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Flattened HelioGrid Cumulative Cost Curve */}
                    <path
                      d={estimatorSvgGeometry.solarLine}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Interactive Year Scrubbing Crosshair */}
                    {hoveredYearIdx !== null && estimatorSvgGeometry.coords[hoveredYearIdx] && (
                      <g>
                        <line
                          x1={estimatorSvgGeometry.coords[hoveredYearIdx].x}
                          x2={estimatorSvgGeometry.coords[hoveredYearIdx].x}
                          y1={padT}
                          y2={svgH - padB}
                          stroke="#0F172A"
                          strokeDasharray="3 3"
                        />
                        <circle
                          cx={estimatorSvgGeometry.coords[hoveredYearIdx].x}
                          cy={estimatorSvgGeometry.coords[hoveredYearIdx].yUtility}
                          r="5"
                          fill="#F43F5E"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                        <circle
                          cx={estimatorSvgGeometry.coords[hoveredYearIdx].x}
                          cy={estimatorSvgGeometry.coords[hoveredYearIdx].ySolar}
                          r="5"
                          fill="#10B981"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                      </g>
                    )}

                    {/* X-Axis Year Labels & Hover Hitboxes */}
                    {estimatorSvgGeometry.coords.map((pt, idx) => {
                      const colW = svgW / estimatorSvgGeometry.coords.length;
                      const showLabel = pt.year === 1 || pt.year % 5 === 0;
                      return (
                        <g key={pt.year}>
                          {showLabel && (
                            <text
                              x={pt.x}
                              y={svgH - 4}
                              textAnchor="middle"
                              className="fill-slate-400 text-[10px] font-mono"
                            >
                              Yr {pt.year}
                            </text>
                          )}
                          <rect
                            x={pt.x - colW / 2}
                            y={0}
                            width={colW}
                            height={svgH}
                            fill="transparent"
                            className="cursor-crosshair"
                            onMouseEnter={() => setHoveredYearIdx(idx)}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Lock In Estimate CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    Modeled for a <strong className="text-[#0F172A]">{financialModel.estKw} kW</strong> Tier-1 system at {utilityInflationRate}% utility rate escalation.
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setQuoteMonthlyBill(Math.min(1200, Math.max(150, estMonthlySpend)));
                      setQuoteBatteryOption(
                        includeStorage ? '1x Powerwall (13.5 kWh)' : 'None'
                      );
                      scrollToSection('quote-form');
                      showToast('Synced your financial model into the Roof Quote Form');
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 transition cursor-pointer shrink-0"
                  >
                    Lock In This Custom Proposal
                    <ArrowRight className="h-4 w-4 text-amber-400" />
                  </button>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* =====================================================================
          4. TRUST BADGE STRIP & VERIFIED TESTIMONIAL CAROUSEL
         ===================================================================== */}
      <section id="verified-reviews" className="py-20 sm:py-28 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Monochrome-to-Color Accreditation Strip */}
          <RevealSection className="mb-20">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
              Tier-1 Manufacturer &amp; Federal Certifications
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                {
                  title: 'NABCEP Certified',
                  sub: 'PV Installation Professionals',
                  accent: 'group-hover:border-amber-500 group-hover:text-amber-600'
                },
                {
                  title: 'BBB A+ Accredited',
                  sub: 'Zero Unresolved Complaints',
                  accent: 'group-hover:border-blue-600 group-hover:text-blue-700'
                },
                {
                  title: 'Tesla Powerwall',
                  sub: 'Premier Certified Installer',
                  accent: 'group-hover:border-rose-500 group-hover:text-rose-600'
                },
                {
                  title: 'SolarReviews 4.9★',
                  sub: 'Top 1% National Contractor',
                  accent: 'group-hover:border-emerald-500 group-hover:text-emerald-700'
                },
                {
                  title: 'Enphase Platinum',
                  sub: 'IQ8 Microinverter Partner',
                  accent: 'group-hover:border-orange-500 group-hover:text-orange-600'
                }
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className={`group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 shadow-2xs ${badge.accent}`}
                >
                  <Award className="h-6 w-6 mb-2 transition-transform group-hover:scale-110" />
                  <div className="text-xs sm:text-sm font-extrabold text-[#0F172A]">
                    {badge.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{badge.sub}</div>
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Interactive Verified Homeowner & Commercial Case Study Carousel */}
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                  Verified Production &amp; Bill Audits
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                  Real Systems. Verified Utility Drops.
                </h2>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {['All Installs', 'Residential', 'Battery Backup', 'Commercial'].map(
                  (cat) => {
                    const active = reviewCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setReviewCategory(cat);
                          setCarouselIndex(0);
                        }}
                        className={`rounded-full px-4 py-2 text-xs font-bold transition cursor-pointer ${
                          active
                            ? 'bg-[#0F172A] text-white shadow-sm'
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Active Case Study Slide Card */}
            {activeTestimonial && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl shadow-slate-900/5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Quote & Customer Details (7 Cols) */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-800">
                        {activeTestimonial.category}
                      </span>
                      <span className="text-amber-500 text-sm font-bold">★★★★★</span>
                      <span className="text-xs text-slate-400">
                        {activeTestimonial.date}
                      </span>
                    </div>

                    <blockquote className="text-lg sm:text-2xl font-bold leading-snug text-[#0F172A]">
                      &ldquo;{activeTestimonial.quote}&rdquo;
                    </blockquote>

                    <div className="pt-2">
                      <div className="text-sm font-extrabold text-[#0F172A]">
                        {activeTestimonial.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {activeTestimonial.location} • {activeTestimonial.systemSpecs}
                      </div>
                    </div>
                  </div>

                  {/* Right Verified Utility Bill Drop Card (5 Cols) */}
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl bg-[#0F172A] p-6 text-white space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Verified Utility Impact
                        </span>
                        <span className="rounded-full bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-400">
                          {activeTestimonial.savingsPct}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 items-center">
                        <div className="rounded-xl bg-slate-800/80 p-3.5">
                          <div className="text-[11px] text-slate-400">Before Solar</div>
                          <div className="mt-1 font-mono text-xl font-extrabold text-rose-400 line-through">
                            {activeTestimonial.billBefore}
                          </div>
                        </div>

                        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/50 p-3.5">
                          <div className="text-[11px] text-emerald-300">With HelioGrid</div>
                          <div className="mt-1 font-mono text-xl font-extrabold text-emerald-400">
                            {activeTestimonial.billAfter}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-slate-300 border-t border-slate-800 pt-3">
                        <span className="text-amber-400 font-semibold">Hardware: </span>
                        {activeTestimonial.systemSpecs}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carousel Controls: Prev / Dots / Next */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {filteredTestimonials.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        aria-label={`View review ${idx + 1}`}
                        onClick={() => setCarouselIndex(idx)}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          idx === safeCarouselIndex
                            ? 'w-8 bg-amber-500'
                            : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrevSlide}
                      aria-label="Previous verified review"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-[#FAF9F6] text-[#0F172A] hover:border-slate-300 transition cursor-pointer"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextSlide}
                      aria-label="Next verified review"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-[#FAF9F6] text-[#0F172A] hover:border-slate-300 transition cursor-pointer"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </RevealSection>
        </div>
      </section>

      {/* =====================================================================
          5. 4-STEP TURNKEY INSTALLATION TIMELINE & ACCESSIBLE FAQ ACCORDION
         ===================================================================== */}
      <section
        id="turnkey-process"
        className="py-20 sm:py-28 border-t border-slate-200 bg-white scroll-mt-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection className="mx-auto max-w-2xl text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              White-Glove Turnkey Execution
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
              From LiDAR Roof Scan to PTO Activation in 4 Steps
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Zero subcontractor handoffs. Our in-house structural engineers, permitting specialists, and NABCEP master electricians handle every detail.
            </p>
          </RevealSection>

          {/* 4-Step Horizontal/Vertical Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {turnkeySteps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <RevealSection key={item.step} delay={idx * 80}>
                  <div className="h-full flex flex-col justify-between rounded-3xl border border-slate-200 bg-[#FAF9F6] p-6 transition-all hover:border-amber-500/60 hover:shadow-lg">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-mono text-2xl font-extrabold text-amber-500">
                          {item.step}
                        </span>
                        <span className="rounded-full bg-white border border-slate-200 px-3 py-1 font-mono text-[11px] font-bold text-[#0F172A]">
                          {item.duration}
                        </span>
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F172A] text-amber-400 mb-4">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="text-lg font-extrabold text-[#0F172A]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </RevealSection>
              );
            })}
          </div>

          <FaqSection />
        </div>
      </section>

      {/* =====================================================================
          6. BOTTOM CONVERSION BANNER & CLEAN LICENSING FOOTER
         ===================================================================== */}
      <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* High-Contrast Deep Slate Navy CTA Card with Quick ZIP Jump */}
          <RevealSection>
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-[#162038] to-slate-900 p-8 sm:p-12 shadow-2xl mb-16">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="max-w-xl text-center lg:text-left">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 px-3 py-1 text-xs font-bold text-amber-400 mb-3">
                    <Zap className="h-3.5 w-3.5" />
                    30% Federal Solar Tax Credit Active
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    See What Your Roof Can Produce in 60 Seconds
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-300">
                    Enter your ZIP code to launch your customized 3D LiDAR shade audit, battery backup sizing, and net utility savings report.
                  </p>
                </div>

                {/* Quick ZIP Code Jump-to-Form Trigger */}
                <form
                  onSubmit={handleFooterZipJump}
                  className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
                >
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    value={footerZipInput}
                    onChange={(e) =>
                      setFooterZipInput(e.target.value.replace(/\D/g, '').slice(0, 5))
                    }
                    placeholder="Enter 5-Digit ZIP Code"
                    className="flex-1 rounded-xl border border-slate-700 bg-slate-950/90 px-4 py-3.5 font-mono text-sm font-bold text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-extrabold text-[#0F172A] shadow-lg hover:bg-amber-400 transition cursor-pointer shrink-0"
                  >
                    Check My Roof
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </RevealSection>

          {/* Service Area & Licensing Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
            <div className="md:col-span-2 space-y-4">
              <HelioGridLogo lightText />
              <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
                HelioGrid Energy designs and installs architectural-grade residential solar arrays, commercial microgrids, and whole-home battery storage systems across AZ, CA, TX, NV, FL, and CO.
              </p>
              <div className="text-xs font-mono text-slate-400">
                State Contractor Licenses: CSLB #1094821 • ROC #338192 • TECL #38910
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                Solutions
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li>
                  <button
                    onClick={() => scrollToSection('quote-form')}
                    className="hover:text-white cursor-pointer"
                  >
                    Residential Architectural Solar
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('quote-form')}
                    className="hover:text-white cursor-pointer"
                  >
                    Tesla Powerwall 3 Storage
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('quote-form')}
                    className="hover:text-white cursor-pointer"
                  >
                    Commercial &amp; Industrial Solar
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('savings-estimator')}
                    className="hover:text-white cursor-pointer"
                  >
                    25-Year ROI Calculator
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                Engineering Desk
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li>
                  <a href="tel:+18005550194" className="hover:text-white">
                    (800) 555-0194
                  </a>
                </li>
                <li>permits@heliogrid.energy</li>
                <li>Mon–Sat: 7:00 AM – 7:00 PM</li>
                <li className="text-emerald-400 font-semibold">
                  24/7 Fleet Monitoring Active
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} HelioGrid Energy Inc. All rights reserved.</p>
            <p>NABCEP Certified • 25-Year Tier-1 Production &amp; Roof Warranty</p>
          </div>
        </div>
      </footer>
    </div>
  );
}