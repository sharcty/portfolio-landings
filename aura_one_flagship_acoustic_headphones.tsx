import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ShoppingBag,
  Plus,
  Minus,
  X,
  ArrowUpRight,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Check,
  Sparkles,
  Disc,
  Radio,
  Shield
} from 'lucide-react';

/**
 * Finish palette definitions for AURA ONE CNC-machined aluminum earcups,
 * anodized yokes, and acoustic mesh grilles.
 */
const FINISHES = [
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

const EDITIONS = [
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

const CUSHION_TYPES = [
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

/**
 * Bespoke Multi-Layer Architectural Hardware SVG Illustration for AURA ONE
 * Dynamically reacts to selected finish, cushion texture, active scroll chapter, and hover tilt.
 */
function AuraHardwareRender({ finish, cushionId, activeChapter, pointerTilt }) {
  const rotateX = pointerTilt.y * -7;
  const rotateY = pointerTilt.x * 9;

  return (
    <div
      className="relative w-full h-full flex items-center justify-center select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Subtle Concentric Acoustic Wave Rings behind Hardware */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className={`rounded-full border border-[#111111]/10 transition-all duration-1000 ${
            activeChapter === 1
              ? 'w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] scale-105 opacity-90'
              : 'w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] scale-100 opacity-50'
          }`}
        />
        <div
          className={`absolute rounded-full border border-[#C85A32]/20 transition-all duration-1000 ${
            activeChapter === 2
              ? 'w-[410px] h-[410px] sm:w-[540px] sm:h-[540px] scale-105 opacity-100'
              : 'w-[330px] h-[330px] sm:w-[440px] sm:h-[440px] scale-95 opacity-40'
          }`}
        />
      </div>

      {/* 3D-Tilted Precision Studio Headphone SVG */}
      <div
        className="relative z-10 w-[86%] max-w-[490px] transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        }}
      >
        <svg
          viewBox="0 0 560 580"
          className="w-full h-auto drop-shadow-[0_36px_48px_rgba(17,17,17,0.22)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Dynamic Metallic Radial Sheen for Earcups */}
            <radialGradient id="cupGrad" cx="35%" cy="28%" r="72%">
              <stop offset="0%" stopColor={finish.specular} />
              <stop offset="35%" stopColor={finish.cupOuter} />
              <stop offset="100%" stopColor={finish.cupInner} />
            </radialGradient>

            {/* Headband Arch Gradient */}
            <linearGradient id="bandGrad" x1="120" y1="40" x2="440" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={finish.cupInner} />
              <stop offset="50%" stopColor={finish.band} />
              <stop offset="100%" stopColor={finish.cupInner} />
            </linearGradient>

            {/* Acoustic Micro-Perforation Pattern */}
            <pattern id="acousticMesh" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1.15" fill="#09090B" fillOpacity="0.45" />
            </pattern>

            {/* Alcantara Suede Grain Pattern */}
            <pattern id="suedeGrain" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M0 3H6M3 0V6" stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="0.7" />
            </pattern>
          </defs>

          {/* Architectural Dimension Callout Lines (Technical Blueprint Overlay) */}
          <g opacity="0.42" stroke="#111111" strokeWidth="0.8" strokeDasharray="3 3">
            <line x1="56" y1="365" x2="504" y2="365" />
            <line x1="280" y1="36" x2="280" y2="538" />
          </g>
          <text
            x="64"
            y="357"
            fill="#111111"
            opacity="0.55"
            fontSize="9"
            fontFamily="monospace"
            letterSpacing="1.6"
          >
            50MM BERYLLIUM AXIS // 0.02% THD
          </text>

          {/* OUTER SPRING-STEEL & MACHINED HEADBAND ARCH */}
          <path
            d="M 118 286 C 118 118, 442 118, 442 286"
            stroke="url(#bandGrad)"
            strokeWidth="26"
            strokeLinecap="round"
          />
          {/* Inner Soft Decompression Headband Cushion */}
          <path
            d="M 152 212 C 188 124, 372 124, 408 212"
            stroke={finish.cushion}
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Terracotta / Contrast Stitch Line along Arch */}
          <path
            d="M 134 252 C 154 114, 406 114, 426 252"
            stroke={finish.accent}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.85"
          />

          {/* LEFT & RIGHT TELESCOPING CNC YOKES */}
          {/* Left Yoke Arm */}
          <path
            d="M 114 274 L 94 345 C 90 362, 96 382, 112 390"
            stroke={finish.yoke}
            strokeWidth="13"
            strokeLinecap="round"
          />
          <circle cx="115" cy="276" r="8" fill={finish.cupInner} stroke={finish.accent} strokeWidth="1.5" />

          {/* Right Yoke Arm */}
          <path
            d="M 446 274 L 466 345 C 470 362, 464 382, 448 390"
            stroke={finish.yoke}
            strokeWidth="13"
            strokeLinecap="round"
          />
          <circle cx="445" cy="276" r="8" fill={finish.cupInner} stroke={finish.accent} strokeWidth="1.5" />

          {/* LEFT EAR CUSHION & CNC CHAMBER */}
          <g>
            {/* Memory Foam Cushion */}
            <rect
              x="148"
              y="286"
              width="48"
              height="168"
              rx="24"
              fill={finish.cushion}
              stroke="#000000"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />
            {cushionId === 'alcantara' && (
              <rect x="148" y="286" width="48" height="168" rx="24" fill="url(#suedeGrain)" />
            )}

            {/* Outer Machined Aluminum Earcup Shell */}
            <rect
              x="88"
              y="276"
              width="74"
              height="188"
              rx="36"
              fill={finish.cupOuter}
              stroke="#111111"
              strokeOpacity="0.2"
              strokeWidth="1.5"
            />
            <rect
              x="88"
              y="276"
              width="74"
              height="188"
              rx="36"
              fill="url(#cupGrad)"
            />

            {/* Acoustic Decompression Port & Micro-Mesh */}
            <rect
              x="102"
              y="304"
              width="34"
              height="132"
              rx="17"
              fill="url(#acousticMesh)"
              stroke={finish.accent}
              strokeWidth="1.2"
              strokeOpacity="0.7"
            />

            {/* Tactile Knurled Brass/Terracotta Crown Dial */}
            <rect
              x="81"
              y="334"
              width="9"
              height="32"
              rx="4"
              fill={finish.accent}
            />
          </g>

          {/* RIGHT EAR CUSHION & CNC CHAMBER */}
          <g>
            {/* Memory Foam Cushion */}
            <rect
              x="364"
              y="286"
              width="48"
              height="168"
              rx="24"
              fill={finish.cushion}
              stroke="#000000"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />
            {cushionId === 'alcantara' && (
              <rect x="364" y="286" width="48" height="168" rx="24" fill="url(#suedeGrain)" />
            )}

            {/* Outer Machined Aluminum Earcup Shell */}
            <rect
              x="398"
              y="276"
              width="74"
              height="188"
              rx="36"
              fill={finish.cupOuter}
              stroke="#111111"
              strokeOpacity="0.2"
              strokeWidth="1.5"
            />
            <rect
              x="398"
              y="276"
              width="74"
              height="188"
              rx="36"
              fill="url(#cupGrad)"
            />

            {/* Acoustic Decompression Port & Micro-Mesh */}
            <rect
              x="424"
              y="304"
              width="34"
              height="132"
              rx="17"
              fill="url(#acousticMesh)"
              stroke={finish.accent}
              strokeWidth="1.2"
              strokeOpacity="0.7"
            />

            {/* ANC Array Mic Pinpoint */}
            <circle cx="462" cy="418" r="3.5" fill={finish.accent} />
          </g>

          {/* X-RAY DRIVER CALLOUT RING (Highlights when user scrolls to Chapter 02) */}
          <g
            className={`transition-opacity duration-500 ${
              activeChapter === 1 ? 'opacity-100' : 'opacity-25'
            }`}
          >
            <circle
              cx="125"
              cy="370"
              r="22"
              stroke={finish.accent}
              strokeWidth="1.5"
              strokeDasharray="3 2"
            />
            <circle cx="125" cy="370" r="7" fill={finish.accent} />
          </g>
        </svg>
      </div>

      {/* Bottom Corner Telemetry Caption inside Pinned Stage */}
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[11px] font-mono tracking-wider text-[#5C5852] border-t border-[#111111]/12 pt-3">
        <span>{finish.code}</span>
        <span>MASS: 318G // BALANCED</span>
      </div>
    </div>
  );
}

export default function App() {
  // Selected Product Configuration State
  const [selectedFinishId, setSelectedFinishId] = useState('obsidian');
  const [selectedEditionId, setSelectedEditionId] = useState('standard');
  const [selectedCushionId, setSelectedCushionId] = useState('lambskin');

  // Interactive Pointer Tilt on Pinned Studio Hardware Canvas
  const [pointerTilt, setPointerTilt] = useState({ x: 0, y: 0 });

  // Active Editorial Chapter Tracked via Scroll Position
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = [useRef(null), useRef(null), useRef(null)];

  // Interactive Draggable Before / After ANC Acoustic Comparison Slider (0 - 100%)
  const [ancSliderPct, setAncSliderPct] = useState(54);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const sliderContainerRef = useRef(null);

  // Sticky Bottom Dock Visibility (appears after scrolling past initial hero fold)
  const [showBottomDock, setShowBottomDock] = useState(false);

  // Slide-Over Shopping Bag Drawer State
  const [bagOpen, setBagOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      key: 'obsidian-standard-lambskin',
      finishId: 'obsidian',
      finishName: 'Anodized Obsidian',
      editionLabel: 'AURA ONE — Studio Edition',
      cushionLabel: 'Perforated Lambskin',
      unitPrice: 549,
      qty: 1
    }
  ]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [toastNotice, setToastNotice] = useState(null);

  const currentFinish = useMemo(
    () => FINISHES.find((f) => f.id === selectedFinishId) || FINISHES[0],
    [selectedFinishId]
  );

  const currentEdition = useMemo(
    () => EDITIONS.find((e) => e.id === selectedEditionId) || EDITIONS[0],
    [selectedEditionId]
  );

  const currentCushion = useMemo(
    () => CUSHION_TYPES.find((c) => c.id === selectedCushionId) || CUSHION_TYPES[0],
    [selectedCushionId]
  );

  const totalBagCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems]
  );

  const totalBagSubtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.unitPrice * item.qty, 0),
    [cartItems]
  );

  const triggerToast = (msg) => {
    setToastNotice(msg);
    setTimeout(() => {
      setToastNotice(null);
    }, 3200);
  };

  // Track scroll position for Sticky Bottom Dock & Active Editorial Chapter
  useEffect(() => {
    const handleScroll = () => {
      setShowBottomDock(window.scrollY > 420);

      const viewportMid = window.innerHeight * 0.48;
      chapterRefs.forEach((ref, idx) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        if (rect.top <= viewportMid && rect.bottom >= viewportMid) {
          setActiveChapter(idx);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Draggable Before / After ANC Slider Pointer Handlers (Mouse + Touch)
  const updateSliderFromClientX = (clientX) => {
    const container = sliderContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const rawPct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(4, Math.min(96, rawPct));
    setAncSliderPct(clamped);
  };

  useEffect(() => {
    if (!isDraggingSlider) return;

    const onMouseMove = (e) => updateSliderFromClientX(e.clientX);
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updateSliderFromClientX(e.touches[0].clientX);
      }
    };
    const stopDrag = () => setIsDraggingSlider(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [isDraggingSlider]);

  // Add Configured AURA ONE to Shopping Bag
  const handleAddToBag = () => {
    const itemKey = `${currentFinish.id}-${currentEdition.id}-${currentCushion.id}`;
    setCheckoutSuccess(false);

    setCartItems((prev) => {
      const existing = prev.find((i) => i.key === itemKey);
      if (existing) {
        return prev.map((i) =>
          i.key === itemKey ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          key: itemKey,
          finishId: currentFinish.id,
          finishName: currentFinish.name,
          editionLabel: currentEdition.label,
          cushionLabel: currentCushion.label,
          unitPrice: currentEdition.price,
          qty: 1
        }
      ];
    });

    setBagOpen(true);
    triggerToast(`Added ${currentFinish.name} (${currentEdition.label}) to Bag`);
  };

  const updateItemQty = (key, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Specification Ledger Rows (Architectural Hairline Table — Zero Bento Grids)
  const specLedgerRows = [
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

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#111111] selection:bg-[#C85A32] selection:text-[#F4F1EA]">
      {/* Editorial Typography & Custom Micro-Grain Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=IBM+Plex+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .font-editorial {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-sans-body {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .font-tech-mono {
          font-family: 'IBM Plex Mono', monospace;
        }
      `}</style>

      {/* Non-Blocking Minimal Toast */}
      {toastNotice && (
        <div className="fixed top-20 right-6 z-50 border border-[#111111] bg-[#111111] px-4 py-2.5 text-xs font-tech-mono text-[#F4F1EA] shadow-xl">
          {toastNotice}
        </div>
      )}

      {/* =====================================================================
          1. MINIMAL CORNER FLOATING BRAND MARK & BAG COUNTER (NO SAAS NAVBAR)
         ===================================================================== */}
      <div className="fixed top-5 left-5 sm:top-7 sm:left-8 z-40 pointer-events-auto">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group inline-flex items-center gap-3 border border-[#111111]/20 bg-[#F4F1EA]/90 px-3.5 py-2 backdrop-blur-md transition-colors hover:border-[#111111]"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#C85A32] transition-transform group-hover:scale-125" />
          <span className="font-tech-mono text-xs font-semibold tracking-[0.24em] uppercase text-[#111111]">
            AURA // 01
          </span>
        </a>
      </div>

      <div className="fixed top-5 right-5 sm:top-7 sm:right-8 z-40 flex items-center gap-2 pointer-events-auto">
        <a
          href="#spec-ledger"
          className="hidden md:inline-flex items-center border border-[#111111]/20 bg-[#F4F1EA]/90 px-3.5 py-2 font-tech-mono text-[11px] uppercase tracking-widest text-[#111111] backdrop-blur-md hover:border-[#111111] transition-colors"
        >
          Index / Specs
        </a>
        <button
          type="button"
          onClick={() => setBagOpen(true)}
          aria-label="Open Shopping Bag"
          className="inline-flex items-center gap-2.5 border border-[#111111] bg-[#111111] px-4 py-2 font-tech-mono text-xs uppercase tracking-widest text-[#F4F1EA] transition-colors hover:bg-[#C85A32] hover:border-[#C85A32] cursor-pointer"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Bag ({totalBagCount})</span>
        </button>
      </div>

      {/* =====================================================================
          2. ASYMMETRIC 55% / 45% STICKY SPLIT-SCREEN HERO & CONFIGURATOR
         ===================================================================== */}
      <section id="top" className="relative border-b border-[#111111]/15">
        <div className="flex flex-col lg:flex-row">
          {/* LEFT 55% PINNED STUDIO HARDWARE CANVAS */}
          <div
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
              const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
              setPointerTilt({ x, y });
            }}
            onMouseLeave={() => setPointerTilt({ x: 0, y: 0 })}
            className="relative w-full lg:w-[55%] h-[62vh] sm:h-[72vh] lg:h-screen lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-r border-[#111111]/15 bg-[#EAE5DA] overflow-hidden flex items-center justify-center pt-14 lg:pt-0"
          >
            {/* Subtle Editorial Chapter Watermark in Top Left of Pinned Stage */}
            <div className="absolute top-20 left-6 sm:left-8 z-20 hidden sm:block">
              <div className="font-tech-mono text-[10px] uppercase tracking-[0.22em] text-[#5C5852]">
                STUDIO EDITION // BATCH 04
              </div>
              <div className="font-editorial italic text-xl text-[#111111] mt-0.5">
                {currentFinish.name}
              </div>
            </div>

            {/* Interactive SVG Hardware Render */}
            <AuraHardwareRender
              finish={currentFinish}
              cushionId={selectedCushionId}
              activeChapter={activeChapter}
              pointerTilt={pointerTilt}
            />
          </div>

          {/* RIGHT 45% SCROLLING EDITORIAL NARRATIVE & BESPOKE CONFIGURATOR */}
          <div className="w-full lg:w-[45%] font-sans-body px-6 sm:px-12 lg:px-14 pt-12 lg:pt-28 pb-20 space-y-20">
            {/* CHAPTER 01: OVERSIZED SERIF STATEMENT & FINISH SELECTOR */}
            <div ref={chapterRefs[0]} className="space-y-8">
              <div className="flex items-center justify-between border-b border-[#111111]/15 pb-3 font-tech-mono text-[11px] uppercase tracking-[0.2em] text-[#5C5852]">
                <span>01 // Acoustic Architecture</span>
                <span>Ships Nov 28</span>
              </div>

              <h1 className="font-editorial font-semibold tracking-[-0.025em] text-[#111111] text-5xl sm:text-6xl xl:text-[74px] leading-[0.94]">
                Silence, sculpted in solid aluminum.
              </h1>

              <p className="text-sm sm:text-base leading-relaxed text-[#4A4741] max-w-md">
                Engineered in Copenhagen and machined from a single block of 6061-T6 aerospace alloy. AURA ONE pairs 50mm pure beryllium drivers with an 8-microphone adaptive silence field.
              </p>

              {/* Interactive Finish Switcher */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-tech-mono text-[11px] uppercase tracking-[0.18em] text-[#111111] font-semibold">
                    Select Finish — {currentFinish.name}
                  </span>
                  <span className="font-tech-mono text-[11px] text-[#5C5852]">
                    {currentFinish.code.split('//')[0]}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                  {FINISHES.map((fin) => {
                    const active = fin.id === selectedFinishId;
                    return (
                      <button
                        key={fin.id}
                        type="button"
                        onClick={() => setSelectedFinishId(fin.id)}
                        className={`group flex flex-col items-start border p-2.5 text-left transition-all cursor-pointer ${
                          active
                            ? 'border-[#111111] bg-[#111111] text-[#F4F1EA]'
                            : 'border-[#111111]/20 bg-transparent text-[#111111] hover:border-[#111111]'
                        }`}
                      >
                        <span
                          className="h-6 w-full border border-black/15 mb-2"
                          style={{ backgroundColor: fin.swatch }}
                        />
                        <span className="font-tech-mono text-[10px] uppercase tracking-wider leading-tight">
                          {fin.name.replace('Anodized ', '').replace('Warm ', '')}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="font-tech-mono text-[11px] leading-relaxed text-[#5C5852]">
                  {currentFinish.note}
                </p>
              </div>

              {/* Cushion Acoustic Material Selector */}
              <div className="space-y-2.5">
                <span className="block font-tech-mono text-[11px] uppercase tracking-[0.18em] text-[#111111] font-semibold">
                  Ear Cushion Acoustic Seal
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {CUSHION_TYPES.map((cush) => {
                    const active = cush.id === selectedCushionId;
                    return (
                      <button
                        key={cush.id}
                        type="button"
                        onClick={() => setSelectedCushionId(cush.id)}
                        className={`border p-3 text-left transition-colors cursor-pointer ${
                          active
                            ? 'border-[#111111] bg-[#EAE5DA]'
                            : 'border-[#111111]/20 hover:border-[#111111]'
                        }`}
                      >
                        <div className="text-xs font-semibold text-[#111111]">
                          {cush.label}
                        </div>
                        <div className="font-tech-mono text-[10px] text-[#5C5852] mt-0.5">
                          {cush.detail}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Edition & Primary Acquisition Action */}
              <div className="space-y-3 pt-2 border-t border-[#111111]/15">
                <span className="block font-tech-mono text-[11px] uppercase tracking-[0.18em] text-[#111111] font-semibold">
                  Edition Selection
                </span>
                <div className="space-y-2">
                  {EDITIONS.map((ed) => {
                    const active = ed.id === selectedEditionId;
                    return (
                      <button
                        key={ed.id}
                        type="button"
                        onClick={() => setSelectedEditionId(ed.id)}
                        className={`flex w-full items-start justify-between gap-4 border p-3.5 text-left transition-colors cursor-pointer ${
                          active
                            ? 'border-[#111111] bg-[#EAE5DA]'
                            : 'border-[#111111]/20 hover:border-[#111111]'
                        }`}
                      >
                        <div>
                          <div className="text-xs sm:text-sm font-semibold text-[#111111]">
                            {ed.label}
                          </div>
                          <div className="text-[11px] text-[#5C5852] mt-0.5 leading-snug">
                            {ed.sub}
                          </div>
                        </div>
                        <span className="font-tech-mono text-sm font-semibold text-[#111111] shrink-0">
                          ${ed.price}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleAddToBag}
                  className="mt-3 flex w-full items-center justify-between border border-[#111111] bg-[#111111] px-6 py-4 text-[#F4F1EA] transition-colors hover:bg-[#C85A32] hover:border-[#C85A32] cursor-pointer"
                >
                  <span className="font-tech-mono text-xs uppercase tracking-[0.2em] font-semibold">
                    Acquire AURA ONE — ${currentEdition.price}
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* CHAPTER 02: 50MM BERYLLIUM ACOUSTIC CHAMBER STORY */}
            <div
              ref={chapterRefs[1]}
              className="border-t border-[#111111]/15 pt-14 space-y-5"
            >
              <div className="font-tech-mono text-[11px] uppercase tracking-[0.2em] text-[#C85A32] font-semibold">
                02 // Transducer Metallurgy
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl font-semibold leading-[1.05] text-[#111111]">
                50mm Pure Beryllium diaphragm. Zero breakup distortion.
              </h2>
              <p className="text-sm leading-relaxed text-[#4A4741]">
                Conventional polymer drivers flex under high-velocity transients, smearing micro-detail. Our vapor-deposited beryllium dome is 4.5× stiffer than titanium at half the moving mass—delivering pinpoint stereo imaging from 4 Hz sub-bass to 48 kHz air.
              </p>
              <div className="grid grid-cols-3 border-y border-[#111111]/15 py-4 font-tech-mono">
                <div>
                  <div className="text-lg sm:text-xl font-semibold text-[#111111]">48 kHz</div>
                  <div className="text-[10px] uppercase text-[#5C5852]">Upper Extension</div>
                </div>
                <div className="border-x border-[#111111]/15 px-3">
                  <div className="text-lg sm:text-xl font-semibold text-[#111111]">0.02%</div>
                  <div className="text-[10px] uppercase text-[#5C5852]">Harmonic THD</div>
                </div>
                <div className="pl-3">
                  <div className="text-lg sm:text-xl font-semibold text-[#111111]">32 Ω</div>
                  <div className="text-[10px] uppercase text-[#5C5852]">Studio Impedance</div>
                </div>
              </div>
            </div>

            {/* CHAPTER 03: WEIGHT DISTRIBUTION & ALL-DAY ERGONOMICS */}
            <div
              ref={chapterRefs[2]}
              className="border-t border-[#111111]/15 pt-14 space-y-5"
            >
              <div className="font-tech-mono text-[11px] uppercase tracking-[0.2em] text-[#C85A32] font-semibold">
                03 // Zero-Fatigue Geometry
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl font-semibold leading-[1.05] text-[#111111]">
                Balanced to 318 grams across a tensioned steel arch.
              </h2>
              <p className="text-sm leading-relaxed text-[#4A4741]">
                Dual-axis gimbal yokes distribute clamping force evenly around the temporal bone rather than pressing onto the ear. Magnetic memory-foam cushions snap off effortlessly for acoustic tuning or replacement.
              </p>
              <div className="flex items-center gap-6 font-tech-mono text-xs text-[#111111] pt-1">
                <span>• 4.2 N Calibrated Clamp Force</span>
                <span>• 5-Year Hardware Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. FULL-BLEED INTERACTIVE DRAGGABLE BEFORE / AFTER ANC COMPARISON SLIDER
         ===================================================================== */}
      <section className="border-b border-[#111111]/15 py-20 sm:py-28 px-5 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-tech-mono text-[11px] uppercase tracking-[0.22em] text-[#C85A32] font-semibold">
                04 // Acoustic Isolation Lab
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#111111] mt-2">
                Drag to experience -46 dB Adaptive Silence.
              </h2>
            </div>

            <div className="flex items-center gap-2 font-tech-mono text-xs">
              <button
                type="button"
                onClick={() => setAncSliderPct(15)}
                className="border border-[#111111]/25 px-3 py-1.5 uppercase hover:border-[#111111] transition cursor-pointer"
              >
                Transparency
              </button>
              <button
                type="button"
                onClick={() => setAncSliderPct(88)}
                className="border border-[#111111] bg-[#111111] px-3 py-1.5 uppercase text-[#F4F1EA] hover:bg-[#C85A32] hover:border-[#C85A32] transition cursor-pointer"
              >
                Full ANC
              </button>
            </div>
          </div>

          {/* Interactive Draggable Comparison Viewport */}
          <div
            ref={sliderContainerRef}
            onMouseDown={(e) => {
              setIsDraggingSlider(true);
              updateSliderFromClientX(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDraggingSlider(true);
              if (e.touches && e.touches[0]) {
                updateSliderFromClientX(e.touches[0].clientX);
              }
            }}
            className="relative h-[380px] sm:h-[460px] w-full overflow-hidden border border-[#111111] select-none cursor-ew-resize"
          >
            {/* RIGHT / UNDERNEATH LAYER: AMBIENT CITY & CABIN NOISE (UNFILTERED) */}
            <div className="absolute inset-0 bg-[#EAE5DA] p-6 sm:p-10 flex flex-col justify-between">
              <div className="flex items-center justify-between font-tech-mono text-xs text-[#5C5852]">
                <span className="inline-flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-[#C85A32]" />
                  <span>AMBIENT ENVIRONMENT // 84 dB CABIN &amp; STREET RUMBLE</span>
                </span>
                <span>PASS-THROUGH MODE</span>
              </div>

              {/* Chaotic High-Amplitude Acoustic Waveform SVG */}
              <svg
                viewBox="0 0 1000 180"
                className="w-full h-44 preserve-3d"
                preserveAspectRatio="none"
              >
                {Array.from({ length: 72 }).map((_, i) => {
                  const amp =
                    26 +
                    Math.abs(Math.sin(i * 0.65) * 58) +
                    Math.abs(Math.cos(i * 1.4) * 34);
                  return (
                    <rect
                      key={i}
                      x={i * 13.8 + 4}
                      y={90 - amp / 2}
                      width="5"
                      height={amp}
                      fill="#C85A32"
                      opacity={0.78}
                    />
                  );
                })}
              </svg>

              <div className="flex items-center justify-between font-tech-mono text-[11px] text-[#5C5852] border-t border-[#111111]/15 pt-3">
                <span>LOW-END JET &amp; SUBWAY RUMBLE: +84 dB SPL</span>
                <span>UNATTENUATED SPECTRUM</span>
              </div>
            </div>

            {/* LEFT / CLIPPED OVERLAY LAYER: AURA ONE ADAPTIVE ANC SILENCE FIELD */}
            <div
              style={{ width: `${ancSliderPct}%` }}
              className="absolute inset-y-0 left-0 overflow-hidden bg-[#111111] text-[#F4F1EA]"
            >
              <div className="h-full w-screen max-w-7xl p-6 sm:p-10 flex flex-col justify-between">
                <div className="flex items-center justify-between font-tech-mono text-xs text-[#F4F1EA]">
                  <span className="inline-flex items-center gap-2">
                    <VolumeX className="h-4 w-4 text-[#C85A32]" />
                    <span>AURA ONE ADAPTIVE ANC // -46 dB PHASE CANCELLATION</span>
                  </span>
                  <span className="hidden sm:inline text-[#9E9A90]">
                    48,000 SAMPLES / SEC
                  </span>
                </div>

                {/* Near-Flat Studio Reference Noise Floor SVG */}
                <svg
                  viewBox="0 0 1000 180"
                  className="w-full h-44"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="0"
                    y1="90"
                    x2="1000"
                    y2="90"
                    stroke="#C85A32"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                    opacity="0.6"
                  />
                  {Array.from({ length: 72 }).map((_, i) => {
                    const microAmp = 4 + Math.abs(Math.sin(i * 0.4) * 5);
                    return (
                      <rect
                        key={i}
                        x={i * 13.8 + 4}
                        y={90 - microAmp / 2}
                        width="5"
                        height={microAmp}
                        fill="#F4F1EA"
                        opacity="0.9"
                      />
                    );
                  })}
                </svg>

                <div className="flex items-center justify-between font-tech-mono text-[11px] text-[#9E9A90] border-t border-[#F4F1EA]/15 pt-3">
                  <span>RESIDUAL NOISE FLOOR: 38 dB LIBRARY STILLNESS</span>
                  <span className="text-[#C85A32]">ACTIVE ANTI-PHASE LOCKED</span>
                </div>
              </div>
            </div>

            {/* DRAGGABLE VERTICAL SPLIT HANDLE */}
            <div
              style={{ left: `${ancSliderPct}%` }}
              className="absolute inset-y-0 -translate-x-1/2 flex items-center justify-center pointer-events-none"
            >
              <div className="h-full w-[2px] bg-[#C85A32]" />
              <div className="absolute flex h-12 w-12 items-center justify-center rounded-full border border-[#F4F1EA] bg-[#C85A32] text-[#F4F1EA] shadow-2xl">
                <SlidersHorizontal className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. ARCHITECTURAL SPECIFICATION LEDGER (ZERO BENTO GRIDS OR SAAS CARDS)
         ===================================================================== */}
      <section
        id="spec-ledger"
        className="border-b border-[#111111]/15 py-20 sm:py-28 px-5 sm:px-10 lg:px-16 scroll-mt-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#111111]">
            <div>
              <span className="font-tech-mono text-[11px] uppercase tracking-[0.22em] text-[#5C5852]">
                05 // Technical Dossier
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#111111] mt-1">
                Acoustic &amp; Mechanical Specification Ledger
              </h2>
            </div>
            <span className="font-tech-mono text-xs uppercase tracking-widest text-[#C85A32]">
              REV 4.2 // COPENHAGEN LABS
            </span>
          </div>

          {/* Hairline-Bordered Architectural Rows */}
          <div className="divide-y divide-[#111111]/15 border-b border-[#111111]">
            {specLedgerRows.map((row) => (
              <div
                key={row.index}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-5 sm:py-6 items-baseline transition-colors hover:bg-[#EAE5DA]/70 px-2"
              >
                <div className="md:col-span-1 font-tech-mono text-xs text-[#C85A32] font-semibold">
                  {row.index}
                </div>
                <div className="md:col-span-3 font-tech-mono text-xs uppercase tracking-wider font-semibold text-[#111111]">
                  {row.parameter}
                </div>
                <div className="md:col-span-5 text-sm text-[#111111]">
                  {row.specification}
                </div>
                <div className="md:col-span-3 md:text-right font-tech-mono text-xs text-[#5C5852]">
                  {row.tolerance}
                </div>
              </div>
            ))}
          </div>

          {/* Minimal Editorial Press Quote Strip */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 pt-4">
            {[
              {
                pub: 'WALLPAPER* DESIGN AWARDS',
                quote:
                  '“Industrial minimalism at its peak—an object that belongs on an architect’s desk as much as in a mastering studio.”'
              },
              {
                pub: 'SOUND ON SOUND',
                quote:
                  '“Transient speed rivals open-back electrostatic flagships, yet seals out transcontinental cabin noise effortlessly.”'
              },
              {
                pub: 'MONOCLE QUALITY OF LIFE',
                quote:
                  '“Tactile knurled controls, zero plastic creak, and serviceable magnetic cushions built to last a decade.”'
              }
            ].map((item, i) => (
              <div key={i} className="border-l border-[#111111]/25 pl-5 space-y-2.5">
                <div className="font-tech-mono text-[10px] uppercase tracking-[0.2em] text-[#C85A32] font-semibold">
                  {item.pub}
                </div>
                <p className="font-editorial italic text-xl leading-snug text-[#111111]">
                  {item.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          MINIMAL EDITORIAL FOOTER
         ===================================================================== */}
      <footer className="bg-[#111111] text-[#F4F1EA] pt-16 pb-28 px-5 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div className="space-y-3">
            <div className="font-tech-mono text-xs uppercase tracking-[0.24em] text-[#C85A32]">
              AURA ACOUSTICS // COPENHAGEN • TOKYO
            </div>
            <div className="font-editorial text-4xl sm:text-5xl font-semibold">
              AURA ONE
            </div>
            <p className="text-xs text-[#9E9A90] max-w-md">
              Complimentary insured express courier worldwide. 30-day home audition guarantee with prepaid return label.
            </p>
          </div>

          <div className="font-tech-mono text-[11px] uppercase tracking-widest text-[#9E9A90] space-y-1 md:text-right">
            <div>5-Year International Hardware Warranty</div>
            <div>© {new Date().getFullYear()} AURA ACOUSTICS APS</div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          5. STICKY MOBILE & SCROLL-TRIGGERED BOTTOM BUY NOW DOCK
         ===================================================================== */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 border-t border-[#111111] bg-[#F4F1EA]/95 backdrop-blur-md transition-transform duration-300 ${
          showBottomDock
            ? 'translate-y-0'
            : 'translate-y-0 lg:translate-y-full'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-8 py-3">
          {/* Active Finish Swatch & Summary */}
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="h-7 w-7 shrink-0 border border-[#111111]"
              style={{ backgroundColor: currentFinish.swatch }}
            />
            <div className="min-w-0">
              <div className="font-tech-mono text-xs font-semibold uppercase tracking-wider text-[#111111] truncate">
                AURA ONE — {currentFinish.name}
              </div>
              <div className="hidden sm:block font-tech-mono text-[10px] text-[#5C5852] truncate">
                {currentEdition.label} • {currentCushion.label}
              </div>
            </div>
          </div>

          {/* Quick Swatch Dots + Buy Now Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 mr-2">
              {FINISHES.map((fin) => (
                <button
                  key={fin.id}
                  type="button"
                  title={fin.name}
                  onClick={() => setSelectedFinishId(fin.id)}
                  className={`h-5 w-5 border transition-transform cursor-pointer ${
                    fin.id === selectedFinishId
                      ? 'border-[#111111] scale-125 ring-1 ring-[#C85A32]'
                      : 'border-[#111111]/30'
                  }`}
                  style={{ backgroundColor: fin.swatch }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddToBag}
              className="inline-flex items-center gap-2 border border-[#111111] bg-[#111111] px-5 py-2.5 font-tech-mono text-xs uppercase tracking-[0.18em] font-semibold text-[#F4F1EA] hover:bg-[#C85A32] hover:border-[#C85A32] transition-colors cursor-pointer"
            >
              <span>Add to Bag — ${currentEdition.price}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          SLIDE-OVER SHOPPING BAG DRAWER
         ===================================================================== */}
      {bagOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-[#111111]/65 backdrop-blur-xs"
          onClick={() => setBagOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-md flex-col justify-between border-l border-[#111111] bg-[#F4F1EA] p-6 sm:p-8 text-[#111111] shadow-2xl"
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[#111111] pb-4">
                <span className="font-tech-mono text-xs uppercase tracking-[0.22em] font-semibold">
                  Your Acquisition Bag ({totalBagCount})
                </span>
                <button
                  type="button"
                  onClick={() => setBagOpen(false)}
                  aria-label="Close bag"
                  className="p-1 text-[#111111] hover:text-[#C85A32] transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="mt-6 space-y-4 max-h-[54vh] overflow-y-auto pr-1">
                {cartItems.length === 0 ? (
                  <div className="py-12 text-center font-tech-mono text-xs text-[#5C5852]">
                    Your bag is currently empty.
                  </div>
                ) : (
                  cartItems.map((item) => {
                    const swatchHex =
                      FINISHES.find((f) => f.id === item.finishId)?.swatch || '#111111';
                    return (
                      <div
                        key={item.key}
                        className="flex items-start justify-between gap-4 border-b border-[#111111]/15 pb-4"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className="mt-1 h-8 w-8 shrink-0 border border-[#111111]"
                            style={{ backgroundColor: swatchHex }}
                          />
                          <div>
                            <div className="text-xs sm:text-sm font-semibold text-[#111111]">
                              {item.editionLabel}
                            </div>
                            <div className="font-tech-mono text-[11px] text-[#5C5852] mt-0.5">
                              {item.finishName} • {item.cushionLabel}
                            </div>

                            <div className="mt-2.5 inline-flex items-center border border-[#111111]/30">
                              <button
                                type="button"
                                onClick={() => updateItemQty(item.key, -1)}
                                className="px-2 py-1 hover:bg-[#EAE5DA] cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2.5 font-tech-mono text-xs">
                                {item.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateItemQty(item.key, 1)}
                                className="px-2 py-1 hover:bg-[#EAE5DA] cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="font-tech-mono text-xs font-semibold text-[#111111]">
                          ${item.unitPrice * item.qty}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Drawer Footer & Instant Order Confirmation */}
            <div className="border-t border-[#111111] pt-5 space-y-4">
              {checkoutSuccess ? (
                <div className="border border-[#111111] bg-[#EAE5DA] p-4 space-y-1.5">
                  <div className="font-tech-mono text-xs font-semibold uppercase text-[#C85A32]">
                    ✓ Batch 04 Allocation Reserved
                  </div>
                  <p className="text-xs text-[#111111] leading-relaxed">
                    Your AURA ONE studio build order has been logged. Express DHL tracking will be dispatched prior to Nov 28.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between font-tech-mono text-xs">
                    <span className="text-[#5C5852]">INSURED GLOBAL COURIER</span>
                    <span>COMPLIMENTARY</span>
                  </div>
                  <div className="flex items-center justify-between font-tech-mono text-sm font-semibold">
                    <span>SUBTOTAL</span>
                    <span>${totalBagSubtotal} USD</span>
                  </div>

                  <button
                    type="button"
                    disabled={cartItems.length === 0}
                    onClick={() => {
                      setCheckoutSuccess(true);
                      triggerToast('AURA ONE Batch 04 reservation confirmed');
                    }}
                    className="flex w-full items-center justify-between border border-[#111111] bg-[#111111] px-5 py-4 font-tech-mono text-xs uppercase tracking-[0.2em] font-semibold text-[#F4F1EA] hover:bg-[#C85A32] hover:border-[#C85A32] disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}