import React, { useState, useEffect, useRef, useMemo } from 'react';
import RevealSection from '../../shared/RevealSection';

/**
 * Detailed Studio Hardware SVG Render of AURA ONE Flagship Headphones.
 * Dynamically adapts anodized metallic finishes, acoustic mesh, ear cushions,
 * and supports 3 interactive viewing angles: 'front', 'profile', and 'xray'.
 */
function HeadphoneStudioStage({ finish, angle, isDark }) {
  const palette = finish.svgColors;

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Ambient Studio Lighting Halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full blur-3xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${palette.glow} 0%, transparent 72%)`,
          opacity: isDark ? 0.38 : 0.28
        }}
      />

      {/* Subtle Studio Floor Shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 h-6 w-56 sm:w-72 rounded-full blur-xl transition-all duration-500"
        style={{
          background: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(9,9,11,0.22)'
        }}
      />

      {/* VIEW 1: STUDIO FRONT (3/4 Flagship Hero Render) */}
      {angle === 'front' && (
        <svg
          viewBox="0 0 460 440"
          className="relative z-10 w-full max-w-[380px] sm:max-w-[430px] h-auto drop-shadow-2xl transition-all duration-500"
          role="img"
          aria-label={`AURA ONE Headphones in ${finish.name} — Studio Front View`}
        >
          <defs>
            <linearGradient id="bandMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={palette.metalLight} />
              <stop offset="45%" stopColor={palette.metalMid} />
              <stop offset="100%" stopColor={palette.metalDark} />
            </linearGradient>
            <linearGradient id="cupShell" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor={palette.shellLight} />
              <stop offset="55%" stopColor={palette.shellMid} />
              <stop offset="100%" stopColor={palette.shellDark} />
            </linearGradient>
            <linearGradient id="cushionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={palette.cushionLight} />
              <stop offset="100%" stopColor={palette.cushionDark} />
            </linearGradient>
            <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
          </defs>

          {/* Outer CNC Aluminum Headband Arch */}
          <path
            d="M 102 225 C 102 88, 358 88, 358 225"
            fill="none"
            stroke="url(#bandMetal)"
            strokeWidth="24"
            strokeLinecap="round"
          />

          {/* Top Breathable Knit-Mesh Comfort Cushion */}
          <path
            d="M 136 144 C 182 104, 278 104, 324 144"
            fill="none"
            stroke="url(#cushionGrad)"
            strokeWidth="15"
            strokeLinecap="round"
          />

          {/* Subtle Inner Band Accent Rim */}
          <path
            d="M 114 220 C 114 103, 346 103, 346 220"
            fill="none"
            stroke="url(#goldAccent)"
            strokeWidth="2"
            opacity="0.7"
          />

          {/* Left Telescoping Yoke Stem */}
          <rect
            x="92"
            y="206"
            width="16"
            height="58"
            rx="8"
            fill="url(#bandMetal)"
          />
          <circle cx="100" cy="218" r="3" fill="url(#goldAccent)" />

          {/* Right Telescoping Yoke Stem */}
          <rect
            x="352"
            y="206"
            width="16"
            height="58"
            rx="8"
            fill="url(#bandMetal)"
          />
          <circle cx="360" cy="218" r="3" fill="url(#goldAccent)" />

          {/* Left Memory Foam Ear Cushion (Inner) */}
          <rect
            x="114"
            y="234"
            width="42"
            height="136"
            rx="21"
            fill="url(#cushionGrad)"
          />
          {/* Left Anodized Earcup Housing (Outer) */}
          <rect
            x="76"
            y="238"
            width="52"
            height="128"
            rx="26"
            fill="url(#cupShell)"
            stroke={palette.metalLight}
            strokeWidth="1.5"
          />
          {/* Left Acoustic Mic Grille & Brass Ring */}
          <rect
            x="89"
            y="264"
            width="18"
            height="76"
            rx="9"
            fill={palette.grille}
            stroke="url(#goldAccent)"
            strokeWidth="1.2"
          />
          {/* Left Digital Crown Dial */}
          <rect
            x="84"
            y="246"
            width="12"
            height="7"
            rx="3"
            fill="url(#goldAccent)"
          />

          {/* Right Memory Foam Ear Cushion (Inner) */}
          <rect
            x="304"
            y="234"
            width="42"
            height="136"
            rx="21"
            fill="url(#cushionGrad)"
          />
          {/* Right Anodized Earcup Housing (Outer) */}
          <rect
            x="332"
            y="238"
            width="52"
            height="128"
            rx="26"
            fill="url(#cupShell)"
            stroke={palette.metalLight}
            strokeWidth="1.5"
          />
          {/* Right Acoustic Mic Grille & Brass Ring */}
          <rect
            x="353"
            y="264"
            width="18"
            height="76"
            rx="9"
            fill={palette.grille}
            stroke="url(#goldAccent)"
            strokeWidth="1.2"
          />
          {/* Right ANC Mode Button */}
          <rect
            x="362"
            y="252"
            width="8"
            height="16"
            rx="4"
            fill="url(#goldAccent)"
          />

          {/* Subtle Brand Engraving on Left Earcup */}
          <text
            x="98"
            y="302"
            textAnchor="middle"
            transform="rotate(-90 98 302)"
            fill={palette.metalLight}
            fontSize="7.5"
            fontWeight="700"
            letterSpacing="2.4"
            opacity="0.75"
          >
            AURA
          </text>
        </svg>
      )}

      {/* VIEW 2: PROFILE HINGE & EAR-CUP SILHOUETTE */}
      {angle === 'profile' && (
        <svg
          viewBox="0 0 460 440"
          className="relative z-10 w-full max-w-[380px] sm:max-w-[430px] h-auto drop-shadow-2xl transition-all duration-500"
          role="img"
          aria-label={`AURA ONE Headphones in ${finish.name} — Profile Hinge View`}
        >
          <defs>
            <linearGradient id="profMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={palette.metalLight} />
              <stop offset="50%" stopColor={palette.metalMid} />
              <stop offset="100%" stopColor={palette.metalDark} />
            </linearGradient>
            <linearGradient id="profCup" x1="10%" y1="10%" x2="90%" y2="90%">
              <stop offset="0%" stopColor={palette.shellLight} />
              <stop offset="60%" stopColor={palette.shellMid} />
              <stop offset="100%" stopColor={palette.shellDark} />
            </linearGradient>
            <linearGradient id="profAmber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>

          {/* Side Profile Headband Arm */}
          <path
            d="M 215 62 C 235 62, 245 120, 238 205"
            fill="none"
            stroke="url(#profMetal)"
            strokeWidth="26"
            strokeLinecap="round"
          />

          {/* Aerospace Zero-Friction Gimbal Yoke */}
          <path
            d="M 238 192 C 275 198, 295 232, 295 288"
            fill="none"
            stroke="url(#profMetal)"
            strokeWidth="13"
            strokeLinecap="round"
          />
          <circle
            cx="238"
            cy="192"
            r="11"
            fill="url(#profAmber)"
            stroke={palette.metalDark}
            strokeWidth="2"
          />

          {/* Large Side-Profile Memory Foam Cushion */}
          <ellipse
            cx="222"
            cy="292"
            rx="78"
            ry="98"
            fill={palette.cushionDark}
          />

          {/* Outer Anodized Aluminum Oval Earcup */}
          <ellipse
            cx="236"
            cy="292"
            rx="72"
            ry="92"
            fill="url(#profCup)"
            stroke={palette.metalLight}
            strokeWidth="2"
          />

          {/* Machined Chamfer Inner Ring */}
          <ellipse
            cx="236"
            cy="292"
            rx="54"
            ry="72"
            fill="none"
            stroke="url(#profAmber)"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* Dual Feedforward ANC Beamforming Microphone Ports */}
          <rect x="231" y="232" width="10" height="24" rx="5" fill={palette.grille} />
          <rect x="231" y="328" width="10" height="24" rx="5" fill={palette.grille} />

          {/* Precision Tactile Crown & USB-C Lossless Port Callout */}
          <rect x="296" y="246" width="12" height="18" rx="4" fill="url(#profAmber)" />
          <rect x="226" y="381" width="20" height="7" rx="3.5" fill="#18181B" stroke="url(#profAmber)" strokeWidth="1" />

          {/* Minimalist Wordmark */}
          <text
            x="236"
            y="296"
            textAnchor="middle"
            fill={palette.metalLight}
            fontSize="12"
            fontWeight="800"
            letterSpacing="4"
          >
            AURA ONE
          </text>
        </svg>
      )}

      {/* VIEW 3: ACOUSTIC DRIVER X-RAY (40mm Beryllium Transducer Cutaway) */}
      {angle === 'xray' && (
        <svg
          viewBox="0 0 460 440"
          className="relative z-10 w-full max-w-[380px] sm:max-w-[430px] h-auto drop-shadow-2xl transition-all duration-500"
          role="img"
          aria-label="AURA ONE 40mm Beryllium Acoustic Driver Cutaway"
        >
          <defs>
            <radialGradient id="berylliumCone" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#D97706" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#18181B" stopOpacity="0.95" />
            </radialGradient>
          </defs>

          {/* Outer Acoustic Chamber Blueprint Ring */}
          <ellipse
            cx="230"
            cy="225"
            rx="125"
            ry="152"
            fill="none"
            stroke="#D97706"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            opacity="0.75"
          />
          <ellipse
            cx="230"
            cy="225"
            rx="112"
            ry="138"
            fill={isDark ? '#121215' : '#18181B'}
            stroke={palette.metalLight}
            strokeWidth="2"
          />

          {/* Acoustic Soundwave Ripples */}
          <circle
            cx="230"
            cy="225"
            r="96"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1"
            opacity="0.3"
          />
          <circle
            cx="230"
            cy="225"
            r="82"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1.4"
            opacity="0.5"
          />

          {/* 40mm Custom Beryllium Diaphragm Assembly */}
          <circle
            cx="230"
            cy="225"
            r="68"
            fill="url(#berylliumCone)"
            stroke="#FBBF24"
            strokeWidth="2"
          />
          {/* Neodymium N52 Magnet Core */}
          <circle
            cx="230"
            cy="225"
            r="26"
            fill="#09090B"
            stroke="#F59E0B"
            strokeWidth="2.5"
          />
          <circle cx="230" cy="225" r="9" fill="#F59E0B" />

          {/* 8-Mic Adaptive ANC Array Nodes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const mx = 230 + Math.cos(rad) * 102;
            const my = 225 + Math.sin(rad) * 124;
            return (
              <circle
                key={deg}
                cx={mx}
                cy={my}
                r="4"
                fill="#10B981"
                stroke="#09090B"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Technical Callout Lines & Labels */}
          <line x1="230" y1="157" x2="230" y2="52" stroke="#F59E0B" strokeWidth="1.2" />
          <text
            x="230"
            y="42"
            textAnchor="middle"
            fill="#F59E0B"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="700"
          >
            40MM BERYLLIUM DIAPHRAGM (4HZ–45KHZ)
          </text>

          <line x1="230" y1="293" x2="230" y2="396" stroke="#10B981" strokeWidth="1.2" />
          <text
            x="230"
            y="412"
            textAnchor="middle"
            fill="#10B981"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="700"
          >
            8-MIC HYBRID ANC ARRAY (-48 DB)
          </text>
        </svg>
      )}
    </div>
  );
}

export default function App() {
  // Editorial Light Studio Mode (#FAFAFA) by default, toggleable to Obsidian Dark (#09090B)
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  // Finish / Color Variants
  const finishes = [
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

  // Fit / Cushion Size & Bundle Options
  const sizeBundles = [
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

  // Selected Product Variant States
  const [selectedFinishId, setSelectedFinishId] = useState('titanium');
  const [selectedBundleId, setSelectedBundleId] = useState('standard');
  const [cameraAngle, setCameraAngle] = useState('front');
  const [heroQuantity, setHeroQuantity] = useState(1);

  const activeFinish = finishes.find((f) => f.id === selectedFinishId) || finishes[0];
  const activeBundle = sizeBundles.find((b) => b.id === selectedBundleId) || sizeBundles[0];
  const basePrice = 349;
  const unitPrice = basePrice + activeBundle.priceDelta;

  // 3. Interactive Before/After ANC Comparison Slider State
  const [sliderPosition, setSliderPosition] = useState(52); // percentage 0 - 100
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [ancScenario, setAncScenario] = useState('flight'); // 'subway' | 'flight' | 'office'
  const comparisonContainerRef = useRef(null);

  const ancScenarios = {
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

  const currentScenario = ancScenarios[ancScenario];

  // Handle Mouse & Touch dragging on ANC Comparison Slider
  const updateSliderFromClientX = (clientX) => {
    const container = comparisonContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const clampedPct = Math.max(4, Math.min(96, (relativeX / rect.width) * 100));
    setSliderPosition(clampedPct);
  };

  useEffect(() => {
    if (!isDraggingSlider) return;

    const handleMouseMove = (e) => updateSliderFromClientX(e.clientX);
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updateSliderFromClientX(e.touches[0].clientX);
      }
    };
    const handleUp = () => setIsDraggingSlider(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDraggingSlider]);

  // 5. Verified Buyer Reviews & Filter State
  const [reviewFilter, setReviewFilter] = useState('All');
  const buyerReviews = [
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

  const filteredReviews =
    reviewFilter === 'All'
      ? buyerReviews
      : buyerReviews.filter((r) => r.filterKey === reviewFilter);

  // 6. Sticky "Buy Now" Bar Scroll Visibility Detection
  const heroCtaRef = useRef(null);
  const [showStickyBuyBar, setShowStickyBuyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroCtaRef.current) return;
      const rect = heroCtaRef.current.getBoundingClientRect();
      // Reveal sticky bar once the primary Hero CTA scrolls above the top viewport edge
      setShowStickyBuyBar(rect.bottom < 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 7. Functional Slide-Over Shopping Cart Drawer State
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      key: 'titanium-standard',
      name: 'AURA ONE Flagship ANC',
      finishId: 'titanium',
      finishName: 'Titanium Sand',
      swatch: '#D6CFC7',
      bundleName: 'Standard Fit',
      price: 349,
      qty: 1
    }
  ]);
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3400);
  };

  // Add currently selected Hero variant to Bag
  const handleAddToBag = (qtyToAdd = heroQuantity) => {
    const itemKey = `${activeFinish.id}-${activeBundle.id}`;
    setCheckoutSuccess(false);

    setCartItems((prev) => {
      const existing = prev.find((i) => i.key === itemKey);
      if (existing) {
        return prev.map((i) =>
          i.key === itemKey ? { ...i, qty: i.qty + qtyToAdd } : i
        );
      }
      return [
        ...prev,
        {
          key: itemKey,
          name: 'AURA ONE Flagship ANC',
          finishId: activeFinish.id,
          finishName: activeFinish.name,
          swatch: activeFinish.swatch,
          bundleName: activeBundle.label,
          price: unitPrice,
          qty: qtyToAdd
        }
      ];
    });

    setCartOpen(true);
    showToast(
      `Added ${qtyToAdd}× AURA ONE (${activeFinish.name} • ${activeBundle.label}) to bag`
    );
  };

  const updateCartItemQty = (key, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'LAUNCH15') {
      setPromoApplied(true);
      showToast('Code LAUNCH15 applied — 15% launch privilege unlocked!');
    } else {
      showToast('Try promo code LAUNCH15 for 15% off your order');
    }
  };

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = promoApplied ? Math.round(subtotal * 0.15) : 0;
  const finalTotal = subtotal - discountAmount;

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 selection:bg-amber-600 selection:text-white ${
        isDark ? 'bg-[#09090B] text-zinc-100' : 'bg-[#FAFAFA] text-zinc-900'
      }`}
    >
      {/* Subtle Waveform Pulse Animation */}
      <style>{`
        @keyframes waveBounce {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
        .animate-wave-bar {
          transform-origin: center;
          animation: waveBounce 1.15s ease-in-out infinite;
        }
      `}</style>

      {/* Non-Blocking Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 flex items-center gap-2.5 rounded-full border border-amber-500/40 bg-zinc-950/95 px-4 py-2.5 text-xs font-medium text-white shadow-2xl backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          1. ANNOUNCEMENT BAR & MINIMALIST LUXURY NAVBAR
         ===================================================================== */}
      <div className="bg-zinc-950 text-zinc-100 text-[11px] sm:text-xs tracking-wide py-2 px-4 text-center font-medium border-b border-zinc-800/80">
        <span>
          Complimentary Express Air Shipping &amp; 60-Day At-Home Audition • Use{' '}
          <span className="font-mono font-bold text-amber-400">LAUNCH15</span> for 15% Off
        </span>
      </div>

      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300 ${
          isDark
            ? 'border-zinc-800/80 bg-[#09090B]/85'
            : 'border-zinc-200/90 bg-[#FAFAFA]/85'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
          {/* Minimalist Architectural Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 select-none focus:outline-none"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-600/50 bg-zinc-950 text-amber-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="3.5" fill="currentColor" />
              </svg>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold tracking-[0.18em] uppercase">
                AURA
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold">
                Audio
              </span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest">
            {[
              { label: 'Overview', id: 'overview' },
              { label: 'ANC Lab', id: 'anc-lab' },
              { label: 'Sound Engineering', id: 'engineering' },
              { label: 'Compare', id: 'compare' },
              { label: 'Reviews', id: 'reviews' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors cursor-pointer ${
                  isDark
                    ? 'text-zinc-400 hover:text-amber-400'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Controls: Editorial Light/Dark Switcher + Shopping Bag Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsDark((prev) => !prev)}
              aria-label="Toggle studio theme"
              title={isDark ? 'Switch to Light Studio Mode' : 'Switch to Obsidian Mode'}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition cursor-pointer ${
                isDark
                  ? 'border-zinc-800 bg-zinc-900 text-amber-400 hover:border-zinc-700'
                  : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 shadow-xs'
              }`}
            >
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open Shopping Bag"
              className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-wider uppercase transition cursor-pointer ${
                isDark
                  ? 'border-zinc-700 bg-zinc-900 text-white hover:border-amber-500'
                  : 'border-zinc-900 bg-zinc-950 text-white hover:bg-zinc-800'
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="hidden sm:inline">Bag</span>
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-600 px-1.5 text-[11px] font-extrabold text-white">
                {totalBagCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className={`md:hidden flex h-10 w-10 items-center justify-center rounded-full border ${
                isDark
                  ? 'border-zinc-800 bg-zinc-900 text-zinc-200'
                  : 'border-zinc-200 bg-white text-zinc-800'
              }`}
            >
              {mobileMenuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-t px-4 py-4 space-y-2 ${
              isDark ? 'border-zinc-800 bg-[#09090B]' : 'border-zinc-200 bg-[#FAFAFA]'
            }`}
          >
            {[
              { label: 'Overview', id: 'overview' },
              { label: 'ANC Lab', id: 'anc-lab' },
              { label: 'Sound Engineering', id: 'engineering' },
              { label: 'Compare', id: 'compare' },
              { label: 'Reviews', id: 'reviews' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full rounded-xl px-3 py-2.5 text-left text-xs font-bold uppercase tracking-widest ${
                  isDark ? 'text-zinc-300 hover:bg-zinc-900' : 'text-zinc-700 hover:bg-zinc-200/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* =====================================================================
          2. HERO PRODUCT LAUNCH SHOWCASE WITH VARIANT SWITCHER
         ===================================================================== */}
      <section id="overview" className="pt-8 pb-16 sm:pt-14 sm:pb-24 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT COLUMN: Interactive Studio Product Stage (7 Cols) */}
            <div className="lg:col-span-7">
              <div
                className={`relative overflow-hidden rounded-3xl border p-6 sm:p-10 min-h-[420px] sm:min-h-[540px] flex flex-col justify-between transition-colors ${
                  isDark
                    ? 'border-zinc-800/90 bg-gradient-to-b from-zinc-900/90 to-[#0C0C0F]'
                    : 'border-zinc-200/90 bg-gradient-to-b from-white to-zinc-100/80 shadow-xl shadow-zinc-200/40'
                }`}
              >
                {/* Top Stage Telemetry Badges */}
                <div className="relative z-20 flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-wider ${
                      isDark
                        ? 'border-zinc-700/80 bg-zinc-950/80 text-zinc-300'
                        : 'border-zinc-200 bg-white/90 text-zinc-700'
                    }`}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: activeFinish.swatch }}
                    />
                    {activeFinish.name} • {activeFinish.texture}
                  </span>

                  <span className="rounded-full bg-amber-600/15 border border-amber-600/30 px-3 py-1 text-[11px] font-mono font-bold text-amber-600">
                    254g Aerospace Frame
                  </span>
                </div>

                {/* Central Dynamic SVG Headphone Render */}
                <div className="my-auto py-4">
                  <HeadphoneStudioStage
                    finish={activeFinish}
                    angle={cameraAngle}
                    isDark={isDark}
                  />
                </div>

                {/* Bottom Camera Angle Selector Pills */}
                <div className="relative z-20 flex items-center justify-center">
                  <div
                    className={`inline-flex rounded-full border p-1 backdrop-blur-md ${
                      isDark
                        ? 'border-zinc-800 bg-zinc-950/90'
                        : 'border-zinc-200 bg-white/90 shadow-sm'
                    }`}
                  >
                    {[
                      { id: 'front', label: 'Studio Front' },
                      { id: 'profile', label: 'Profile Hinge' },
                      { id: 'xray', label: 'Acoustic Driver X-Ray' }
                    ].map((view) => {
                      const active = cameraAngle === view.id;
                      return (
                        <button
                          key={view.id}
                          onClick={() => setCameraAngle(view.id)}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                            active
                              ? 'bg-zinc-950 text-white dark:bg-amber-600 shadow-sm'
                              : isDark
                              ? 'text-zinc-400 hover:text-white'
                              : 'text-zinc-600 hover:text-zinc-950'
                          }`}
                          style={
                            active
                              ? { backgroundColor: '#D97706', color: '#FFFFFF' }
                              : undefined
                          }
                        >
                          {view.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Editorial Typography & Variant Configurator (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Review Pill & Stock Status */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                    isDark
                      ? 'border-zinc-800 bg-zinc-900 text-zinc-200'
                      : 'border-zinc-200 bg-white text-zinc-800 shadow-2xs'
                  }`}
                >
                  <span className="text-amber-500">★★★★★</span>
                  <span>4.9 ★ from 2,840+ audiophiles</span>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  {activeFinish.stockNote}
                </span>
              </div>

              {/* Editorial Headline & Price */}
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.22em] text-amber-600 font-bold">
                  AURA ONE • Reference Wireless
                </p>
                <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.06]">
                  Pure Silence.{' '}
                  <span className="block text-amber-600">Studio Depth.</span>
                </h1>
                <p
                  className={`mt-3 text-sm sm:text-base leading-relaxed ${
                    isDark ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  Precision-milled from aerospace aluminum with custom 40mm Beryllium drivers, -48dB adaptive noise isolation, and 24-bit/96kHz lossless USB-C audio.
                </p>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold tracking-tight font-mono">
                    ${unitPrice}
                  </span>
                  <span className="text-sm text-zinc-400 line-through font-mono">
                    ${unitPrice + 80}
                  </span>
                  <span className="rounded-md bg-amber-600/15 px-2 py-0.5 text-xs font-bold text-amber-600">
                    Launch Edition
                  </span>
                </div>
              </div>

              {/* VARIANT SELECTOR 1: ANODIZED FINISH */}
              <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/80">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="font-bold uppercase tracking-wider text-zinc-500">
                    1. Anodized Finish
                  </span>
                  <span className="font-semibold">{activeFinish.name}</span>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                  {finishes.map((fin) => {
                    const selected = fin.id === selectedFinishId;
                    return (
                      <button
                        key={fin.id}
                        onClick={() => setSelectedFinishId(fin.id)}
                        aria-label={`Select ${fin.name}`}
                        className={`group flex flex-col items-center gap-1.5 rounded-2xl border p-2.5 transition-all cursor-pointer ${
                          selected
                            ? 'border-amber-600 bg-amber-600/10 ring-1 ring-amber-600'
                            : isDark
                            ? 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
                            : 'border-zinc-200 bg-white hover:border-zinc-300'
                        }`}
                      >
                        <span
                          className="h-7 w-7 rounded-full border shadow-inner transition-transform group-hover:scale-105"
                          style={{
                            backgroundColor: fin.swatch,
                            borderColor: fin.ring
                          }}
                        />
                        <span className="text-[11px] font-semibold text-center leading-tight">
                          {fin.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* VARIANT SELECTOR 2: EAR-CUSHION SIZE & BUNDLE */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="font-bold uppercase tracking-wider text-zinc-500">
                    2. Ear-Cushion Fit &amp; Bundle
                  </span>
                  <span className="font-mono text-[11px] text-zinc-400">
                    SKU: AURA-{activeFinish.id.slice(0, 3).toUpperCase()}-
                    {activeBundle.skuSuffix}
                  </span>
                </div>

                <div className="space-y-2">
                  {sizeBundles.map((bundle) => {
                    const selected = bundle.id === selectedBundleId;
                    return (
                      <button
                        key={bundle.id}
                        onClick={() => setSelectedBundleId(bundle.id)}
                        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all cursor-pointer ${
                          selected
                            ? 'border-amber-600 bg-amber-600/10 ring-1 ring-amber-600'
                            : isDark
                            ? 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
                            : 'border-zinc-200 bg-white hover:border-zinc-300'
                        }`}
                      >
                        <div>
                          <div className="text-xs sm:text-sm font-bold">
                            {bundle.label}
                          </div>
                          <div className="text-[11px] text-zinc-500">
                            {bundle.sublabel}
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-amber-600">
                          {bundle.priceDelta === 0
                            ? 'Included'
                            : `+$${bundle.priceDelta}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* QUANTITY STEPPER + PRIMARY ADD TO BAG CTA */}
              <div ref={heroCtaRef} className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div
                    className={`flex items-center rounded-2xl border px-2 py-2 ${
                      isDark
                        ? 'border-zinc-800 bg-zinc-900'
                        : 'border-zinc-200 bg-white'
                    }`}
                  >
                    <button
                      onClick={() => setHeroQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="h-9 w-8 rounded-xl text-base font-bold hover:bg-zinc-500/10 cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-mono text-sm font-bold">
                      {heroQuantity}
                    </span>
                    <button
                      onClick={() => setHeroQuantity((q) => Math.min(10, q + 1))}
                      aria-label="Increase quantity"
                      className="h-9 w-8 rounded-xl text-base font-bold hover:bg-zinc-500/10 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary High-Impact Add to Bag Button */}
                  <button
                    onClick={() => handleAddToBag(heroQuantity)}
                    className="flex-1 rounded-2xl bg-amber-600 px-6 py-4 text-sm sm:text-base font-extrabold text-white shadow-xl shadow-amber-600/25 hover:bg-amber-500 active:scale-[0.99] transition-all cursor-pointer"
                  >
                    Add to Bag — ${unitPrice * heroQuantity}
                  </button>
                </div>

                {/* Trust Guarantees Strip */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[11px] text-zinc-500">
                  <div className="rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 py-2 px-1">
                    60-Day Trial
                  </div>
                  <div className="rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 py-2 px-1">
                    2-Year Warranty
                  </div>
                  <div className="rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 py-2 px-1">
                    Free Air Express
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. INTERACTIVE BEFORE / AFTER AUDIO & ANC COMPARISON SLIDER
         ===================================================================== */}
      <section
        id="anc-lab"
        className={`py-20 sm:py-28 border-y scroll-mt-16 ${
          isDark
            ? 'border-zinc-800/80 bg-[#0C0C0F]'
            : 'border-zinc-200 bg-white'
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <RevealSection className="mx-auto max-w-2xl text-center mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-600">
              Acoustic Isolation Lab
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              Drag to Hear Adaptive -48 dB Silence
            </h2>
            <p
              className={`mt-3 text-sm sm:text-base ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Slide across real-world acoustic environments to compare unfiltered ambient noise against AURA ONE&apos;s 8-microphone feedforward + feedback ANC engine.
            </p>

            {/* Environment Scenario Presets */}
            <div className="mt-6 inline-flex flex-wrap justify-center gap-2">
              {Object.values(ancScenarios).map((sc) => {
                const active = ancScenario === sc.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => setAncScenario(sc.id)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition cursor-pointer ${
                      active
                        ? 'bg-amber-600 text-white shadow-md'
                        : isDark
                        ? 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    {sc.label}
                  </button>
                );
              })}
            </div>
          </RevealSection>

          {/* Draggable Split-Screen Waveform Comparison Container */}
          <RevealSection>
            <div
              ref={comparisonContainerRef}
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
              className="relative h-[360px] sm:h-[410px] w-full overflow-hidden rounded-3xl border border-zinc-800 select-none cursor-ew-resize shadow-2xl"
            >
              {/* RIGHT / UNDERNEATH LAYER: AURA ONE ADAPTIVE ANC (-48 dB STUDIO ISOLATION) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#09090B] via-[#121216] to-[#1C140D] p-6 sm:p-10 flex flex-col justify-between text-white">
                <div className="flex items-start justify-end">
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-mono font-bold text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      AURA ONE Adaptive ANC ({currentScenario.reduction})
                    </span>
                    <div className="mt-2 font-mono text-2xl sm:text-4xl font-extrabold text-amber-400">
                      {currentScenario.isolatedDb}{' '}
                      <span className="text-xs font-normal text-zinc-400">
                        Studio Floor
                      </span>
                    </div>
                  </div>
                </div>

                {/* Calm, Ultra-Pure Precision Harmonic Waveform */}
                <div className="my-auto flex items-center justify-center gap-1 sm:gap-1.5 h-32 px-4">
                  {Array.from({ length: 42 }).map((_, i) => {
                    const heightPct = 14 + Math.sin(i * 0.35) * 8 + (i % 3) * 2;
                    return (
                      <div
                        key={i}
                        style={{
                          height: `${heightPct}%`,
                          animationDelay: `${i * 45}ms`
                        }}
                        className="animate-wave-bar w-1.5 sm:w-2 rounded-full bg-gradient-to-t from-amber-600 to-emerald-400 opacity-90"
                      />
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <p className="max-w-xs text-right text-xs sm:text-sm text-zinc-300">
                    {currentScenario.isolatedDesc}
                  </p>
                </div>
              </div>

              {/* LEFT / CLIPPED OVERLAY LAYER: STANDARD HEADPHONES (UNFILTERED NOISE) */}
              <div
                style={{
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
                }}
                className="absolute inset-0 bg-gradient-to-br from-zinc-200 via-zinc-300 to-stone-300 p-6 sm:p-10 flex flex-col justify-between text-zinc-900"
              >
                <div className="flex items-start justify-start">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600/15 border border-rose-600/30 px-3 py-1 text-xs font-mono font-bold text-rose-700">
                      Standard Headphones (Passive Only)
                    </span>
                    <div className="mt-2 font-mono text-2xl sm:text-4xl font-extrabold text-zinc-950">
                      {currentScenario.ambientDb}{' '}
                      <span className="text-xs font-normal text-zinc-600">
                        Ambient Noise
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chaotic High-Amplitude Unfiltered Noise Waveform */}
                <div className="my-auto flex items-center justify-center gap-1 sm:gap-1.5 h-36 px-4">
                  {Array.from({ length: 42 }).map((_, i) => {
                    const jaggedHeight =
                      38 + ((i * 29) % 58) + Math.abs(Math.cos(i * 0.9)) * 18;
                    return (
                      <div
                        key={i}
                        style={{
                          height: `${Math.min(98, jaggedHeight)}%`,
                          animationDelay: `${i * 25}ms`
                        }}
                        className="animate-wave-bar w-1.5 sm:w-2 rounded-full bg-gradient-to-t from-zinc-700 to-rose-600 opacity-85"
                      />
                    );
                  })}
                </div>

                <div className="flex justify-start">
                  <p className="max-w-xs text-left text-xs sm:text-sm font-medium text-zinc-800">
                    {currentScenario.ambientDesc}
                  </p>
                </div>
              </div>

              {/* DRAGGABLE VERTICAL DIVIDER HANDLE */}
              <div
                style={{ left: `${sliderPosition}%` }}
                className="pointer-events-none absolute inset-y-0 z-20 -translate-x-1/2 flex flex-col items-center justify-center"
              >
                <div className="h-full w-0.5 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.9)]" />
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-500 bg-zinc-950 text-amber-400 shadow-2xl">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                  >
                    <path d="m9 18-6-6 6-6M15 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Accessible Keyboard / Fine-Tune Range Bar */}
            <div className="mt-4 flex items-center justify-between gap-4 px-2">
              <span className="text-xs font-mono text-zinc-500">
                Ambient ({currentScenario.ambientDb})
              </span>
              <input
                type="range"
                min={5}
                max={95}
                value={Math.round(sliderPosition)}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                aria-label="Adjust noise cancellation comparison split"
                className="w-full max-w-md accent-amber-600 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-amber-600">
                AURA ANC ({currentScenario.isolatedDb})
              </span>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* =====================================================================
          4. HIGH-IMPACT BENTO ENGINEERING & CRAFTSMANSHIP GRID
         ===================================================================== */}
      <section id="engineering" className="py-20 sm:py-28 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection className="mx-auto max-w-2xl text-center mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-600">
              Acoustic &amp; Mechanical Architecture
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              Obsessively Machined. Acoustically Unrivaled.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* BENTO 1 (7 Cols): 40mm Custom Beryllium Drivers */}
            <RevealSection className="lg:col-span-7">
              <div
                className={`group h-full rounded-3xl border p-7 sm:p-9 transition-all duration-300 hover:border-amber-600/50 ${
                  isDark
                    ? 'border-zinc-800 bg-zinc-900/50'
                    : 'border-zinc-200 bg-white shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-amber-600/15 px-3 py-1 text-xs font-mono font-bold text-amber-600">
                    01 / Transducer Physics
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    THD &lt; 0.08% @ 100dB
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-extrabold">
                  40mm Custom Beryllium-Coated Drivers
                </h3>
                <p
                  className={`mt-2.5 text-sm leading-relaxed ${
                    isDark ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  Pure vapor-deposited Beryllium delivers 3.2× higher acoustic rigidity than titanium—eliminating cone breakup for razor-sharp transient response from 4Hz sub-bass to 45kHz air.
                </p>

                {/* Frequency Response Curve Mini Diagram */}
                <div
                  className={`mt-6 rounded-2xl border p-4 ${
                    isDark
                      ? 'border-zinc-800 bg-zinc-950'
                      : 'border-zinc-200/80 bg-zinc-50'
                  }`}
                >
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 mb-2">
                    <span>4 Hz Sub-Bass</span>
                    <span className="text-amber-600 font-bold">Harman Reference Curve</span>
                    <span>45 kHz Hi-Res</span>
                  </div>
                  <svg viewBox="0 0 360 64" className="w-full h-14 overflow-visible">
                    <path
                      d="M 0 34 Q 45 14, 95 32 T 215 30 T 305 22 L 360 28"
                      fill="none"
                      stroke="#D97706"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </RevealSection>

            {/* BENTO 2 (5 Cols): 45-Hour Battery + 5-Min Fast Charge */}
            <RevealSection delay={100} className="lg:col-span-5">
              <div
                className={`group h-full flex flex-col justify-between rounded-3xl border p-7 sm:p-9 transition-all duration-300 hover:border-amber-600/50 ${
                  isDark
                    ? 'border-zinc-800 bg-zinc-900/50'
                    : 'border-zinc-200 bg-white shadow-sm'
                }`}
              >
                <div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-mono font-bold text-emerald-600">
                    02 / Endurance Cell
                  </span>
                  <h3 className="mt-5 text-2xl font-extrabold">
                    45-Hour ANC Runtime
                  </h3>
                  <p
                    className={`mt-2.5 text-sm leading-relaxed ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    Dual high-density silicon-anode cells power continuous Adaptive ANC for two full transatlantic round-trips on a single charge.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div
                    className={`rounded-2xl border p-4 ${
                      isDark
                        ? 'border-zinc-800 bg-zinc-950'
                        : 'border-zinc-200 bg-zinc-50'
                    }`}
                  >
                    <div className="text-2xl font-extrabold font-mono text-amber-600">
                      45 hrs
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">With ANC Enabled</div>
                  </div>
                  <div
                    className={`rounded-2xl border p-4 ${
                      isDark
                        ? 'border-zinc-800 bg-zinc-950'
                        : 'border-zinc-200 bg-zinc-50'
                    }`}
                  >
                    <div className="text-2xl font-extrabold font-mono text-emerald-600">
                      5 min
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">= 6 Hours Playback</div>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* BENTO 3 (5 Cols): Dynamic Spatial Head-Tracking */}
            <RevealSection delay={150} className="lg:col-span-5">
              <div
                className={`group h-full flex flex-col justify-between rounded-3xl border p-7 sm:p-9 transition-all duration-300 hover:border-amber-600/50 ${
                  isDark
                    ? 'border-zinc-800 bg-zinc-900/50'
                    : 'border-zinc-200 bg-white shadow-sm'
                }`}
              >
                <div>
                  <span className="rounded-full bg-amber-600/15 px-3 py-1 text-xs font-mono font-bold text-amber-600">
                    03 / 6-Axis IMU
                  </span>
                  <h3 className="mt-5 text-2xl font-extrabold">
                    360° Spatial Head-Tracking
                  </h3>
                  <p
                    className={`mt-2.5 text-sm leading-relaxed ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    1,000Hz gyroscope telemetry anchors Dolby Atmos and lossless spatial mixes in a fixed acoustic soundstage as you move.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl border border-amber-600/30 bg-amber-600/10 px-4 py-3 text-xs font-mono">
                  <span>Bluetooth 5.4 + aptX Lossless</span>
                  <span className="font-bold text-amber-600">24-bit / 96kHz</span>
                </div>
              </div>
            </RevealSection>

            {/* BENTO 4 (7 Cols): Aerospace CNC Anodized Hinge & Lambskin */}
            <RevealSection delay={200} className="lg:col-span-7">
              <div
                className={`group h-full flex flex-col justify-between rounded-3xl border p-7 sm:p-9 transition-all duration-300 hover:border-amber-600/50 ${
                  isDark
                    ? 'border-zinc-800 bg-zinc-900/50'
                    : 'border-zinc-200 bg-white shadow-sm'
                }`}
              >
                <div>
                  <span className="rounded-full bg-amber-600/15 px-3 py-1 text-xs font-mono font-bold text-amber-600">
                    04 / Industrial Ergonomics
                  </span>
                  <h3 className="mt-5 text-2xl font-extrabold">
                    Single-Axis Aerospace Aluminum Gimbal
                  </h3>
                  <p
                    className={`mt-2.5 text-sm leading-relaxed ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    CNC-milled from a solid billet of 6063-T6 aluminum and paired with acoustically sealed protein-lambskin memory foam cushions that equalize pressure evenly around the ear.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  <div
                    className={`rounded-2xl border p-3.5 ${
                      isDark
                        ? 'border-zinc-800 bg-zinc-950'
                        : 'border-zinc-200 bg-zinc-50'
                    }`}
                  >
                    <div className="text-lg font-extrabold font-mono">254g</div>
                    <div className="text-[11px] text-zinc-500">Featherweight</div>
                  </div>
                  <div
                    className={`rounded-2xl border p-3.5 ${
                      isDark
                        ? 'border-zinc-800 bg-zinc-950'
                        : 'border-zinc-200 bg-zinc-50'
                    }`}
                  >
                    <div className="text-lg font-extrabold font-mono">IP54</div>
                    <div className="text-[11px] text-zinc-500">Sweat &amp; Rain Shield</div>
                  </div>
                  <div
                    className={`rounded-2xl border p-3.5 ${
                      isDark
                        ? 'border-zinc-800 bg-zinc-950'
                        : 'border-zinc-200 bg-zinc-50'
                    }`}
                  >
                    <div className="text-lg font-extrabold font-mono">Magnetic</div>
                    <div className="text-[11px] text-zinc-500">Snap-Swap Cushions</div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. COMPETITOR COMPARISON MATRIX & FILTERABLE VERIFIED REVIEWS
         ===================================================================== */}
      <section
        id="compare"
        className={`py-20 sm:py-28 border-t scroll-mt-16 ${
          isDark
            ? 'border-zinc-800/80 bg-[#0C0C0F]'
            : 'border-zinc-200 bg-white'
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-600">
              Objective Benchmark
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              How AURA ONE Stacks Up
            </h2>
          </RevealSection>

          <RevealSection>
            <div
              className={`overflow-x-auto rounded-3xl border ${
                isDark ? 'border-zinc-800' : 'border-zinc-200 shadow-sm'
              }`}
            >
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr
                    className={`border-b ${
                      isDark
                        ? 'border-zinc-800 bg-zinc-950'
                        : 'border-zinc-200 bg-zinc-50'
                    }`}
                  >
                    <th className="p-4 sm:p-5 font-bold text-zinc-500">Specification</th>
                    <th className="p-4 sm:p-5 font-extrabold text-amber-600 bg-amber-600/10">
                      AURA ONE
                    </th>
                    <th className="p-4 sm:p-5 font-semibold text-zinc-500">
                      Brand S (XM5)
                    </th>
                    <th className="p-4 sm:p-5 font-semibold text-zinc-500">
                      Brand A (Max)
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    isDark ? 'divide-zinc-800/80' : 'divide-zinc-200/80'
                  }`}
                >
                  {[
                    {
                      spec: 'Driver Material',
                      aura: '40mm Custom Beryllium',
                      s: '30mm Carbon Composite',
                      a: '40mm Dynamic Mylar'
                    },
                    {
                      spec: 'Adaptive ANC Depth',
                      aura: '-48 dB (8-Mic Hybrid)',
                      s: '-42 dB',
                      a: '-44 dB'
                    },
                    {
                      spec: 'Battery Life (ANC On)',
                      aura: '45 Hours',
                      s: '30 Hours',
                      a: '20 Hours'
                    },
                    {
                      spec: 'Chassis & Weight',
                      aura: 'CNC Aluminum • 254g',
                      s: 'Injection Plastic • 250g',
                      a: 'Aluminum / Steel • 385g'
                    },
                    {
                      spec: 'USB-C Lossless DAC',
                      aura: '24-bit / 96kHz Native',
                      s: 'Analog 3.5mm Only',
                      a: 'Requires Proprietary Cable'
                    },
                    {
                      spec: 'Direct Launch Price',
                      aura: '$349',
                      s: '$399',
                      a: '$549'
                    }
                  ].map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-4 sm:p-5 font-semibold">{row.spec}</td>
                      <td className="p-4 sm:p-5 font-bold bg-amber-600/5 text-amber-600">
                        {row.aura}
                      </td>
                      <td className="p-4 sm:p-5 text-zinc-500">{row.s}</td>
                      <td className="p-4 sm:p-5 text-zinc-500">{row.a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealSection>

          {/* FILTERABLE VERIFIED AUDIOPHILE REVIEWS */}
          <div id="reviews" className="mt-24 scroll-mt-20">
            <RevealSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-600">
                  2,840+ Verified Owners
                </span>
                <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Heard in the Studio &amp; at 38,000 Feet
                </h3>
              </div>

              {/* Filter by Purchased Variant */}
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Titanium Sand', 'Obsidian Matte', 'Burnt Sienna'].map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={() => setReviewFilter(filter)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                        reviewFilter === filter
                          ? 'bg-amber-600 text-white'
                          : isDark
                          ? 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                      }`}
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>
            </RevealSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredReviews.map((rev, idx) => (
                <RevealSection key={idx} delay={idx * 80}>
                  <div
                    className={`h-full flex flex-col justify-between rounded-3xl border p-6 ${
                      isDark
                        ? 'border-zinc-800 bg-zinc-900/50'
                        : 'border-zinc-200 bg-[#FAFAFA]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="text-amber-500 font-bold">★★★★★</span>
                        <span className="text-zinc-400">{rev.date}</span>
                      </div>
                      <h4 className="text-base font-extrabold leading-snug">
                        &ldquo;{rev.title}&rdquo;
                      </h4>
                      <p
                        className={`mt-2.5 text-xs sm:text-sm leading-relaxed ${
                          isDark ? 'text-zinc-400' : 'text-zinc-600'
                        }`}
                      >
                        {rev.body}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-200/60 dark:border-zinc-800">
                      <div className="text-xs font-bold">{rev.author}</div>
                      <div className="text-[11px] text-zinc-500">{rev.role}</div>
                      <div className="mt-2 inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-600">
                        ✓ Purchased: {rev.variantTag}
                      </div>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MINIMALIST LUXURY FOOTER
         ===================================================================== */}
      <footer
        className={`border-t py-14 pb-28 sm:pb-24 ${
          isDark
            ? 'border-zinc-800 bg-[#09090B] text-zinc-400'
            : 'border-zinc-200 bg-[#FAFAFA] text-zinc-600'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-base font-extrabold tracking-[0.2em] uppercase text-zinc-900 dark:text-white">
              AURA AUDIO
            </span>
            <span className="text-xs font-mono text-amber-600">
              Copenhagen • Los Angeles
            </span>
          </div>
          <p className="text-xs">
            © {new Date().getFullYear()} AURA Audio Lab Inc. 60-Day Risk-Free Audition &amp; 2-Year Global Warranty.
          </p>
        </div>
      </footer>

      {/* =====================================================================
          6. STICKY MOBILE & DESKTOP SCROLL-TRIGGERED "BUY NOW" BAR
         ===================================================================== */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 border-t backdrop-blur-xl transition-all duration-300 ${
          showStickyBuyBar
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0 pointer-events-none'
        } ${
          isDark
            ? 'border-zinc-800 bg-zinc-950/95 text-white'
            : 'border-zinc-200 bg-white/95 text-zinc-950 shadow-2xl'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3">
          {/* Selected Variant Summary */}
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="h-7 w-7 shrink-0 rounded-full border border-zinc-400/50 shadow-inner"
              style={{ backgroundColor: activeFinish.swatch }}
            />
            <div className="truncate">
              <div className="text-xs sm:text-sm font-extrabold truncate">
                AURA ONE — {activeFinish.name}
              </div>
              <div className="text-[11px] text-zinc-500 truncate">
                {activeBundle.label} • Free Express Air
              </div>
            </div>
          </div>

          {/* Live Price + Instant Buy Now CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden xs:block">
              <div className="font-mono text-sm sm:text-base font-extrabold">
                ${unitPrice}
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold">
                In Stock
              </div>
            </div>

            <button
              onClick={() => handleAddToBag(1)}
              className="rounded-full bg-amber-600 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-amber-600/25 hover:bg-amber-500 active:scale-[0.98] transition cursor-pointer"
            >
              Buy Now — ${unitPrice}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          7. FUNCTIONAL SLIDE-OVER SHOPPING BAG DRAWER
         ===================================================================== */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-xs"
          onClick={() => setCartOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative flex h-full w-full max-w-md flex-col justify-between border-l p-6 shadow-2xl ${
              isDark
                ? 'border-zinc-800 bg-[#0C0C0F] text-zinc-100'
                : 'border-zinc-200 bg-white text-zinc-900'
            }`}
          >
            {/* Drawer Header & Free Shipping Bar */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <h3 className="text-base font-extrabold uppercase tracking-wider">
                    Your Bag ({totalBagCount})
                  </h3>
                  <p className="text-xs text-emerald-600 font-medium mt-0.5">
                    ✓ Unlocked Complimentary Express Air Shipping
                  </p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  aria-label="Close shopping bag"
                  className="rounded-full p-2 text-zinc-400 hover:bg-zinc-500/10 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div className="h-full w-full rounded-full bg-emerald-500" />
              </div>

              {/* Cart Items List */}
              <div className="mt-5 max-h-[42vh] overflow-y-auto space-y-3 pr-1">
                {cartItems.length === 0 ? (
                  <div className="py-12 text-center text-sm text-zinc-500">
                    Your bag is currently empty. Select a finish to begin.
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.key}
                      className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 ${
                        isDark
                          ? 'border-zinc-800 bg-zinc-900/70'
                          : 'border-zinc-200 bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-10 w-10 shrink-0 rounded-xl border border-zinc-400/40 shadow-inner"
                          style={{ backgroundColor: item.swatch }}
                        />
                        <div>
                          <div className="text-xs sm:text-sm font-bold">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-zinc-500">
                            {item.finishName} • {item.bundleName}
                          </div>
                          <div className="mt-1 font-mono text-xs font-bold text-amber-600">
                            ${item.price * item.qty}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 rounded-xl border border-zinc-300/70 dark:border-zinc-700 px-1.5 py-1">
                        <button
                          onClick={() => updateCartItemQty(item.key, -1)}
                          className="h-6 w-6 text-xs font-bold hover:bg-zinc-500/10 rounded cursor-pointer"
                        >
                          −
                        </button>
                        <span className="w-5 text-center font-mono text-xs font-bold">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateCartItemQty(item.key, 1)}
                          className="h-6 w-6 text-xs font-bold hover:bg-zinc-500/10 rounded cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Drawer Footer: Promo Code & Express Checkout */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code (try LAUNCH15)"
                  className={`flex-1 rounded-xl border px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-amber-600 ${
                    isDark
                      ? 'border-zinc-800 bg-zinc-900 text-white'
                      : 'border-zinc-300 bg-zinc-50 text-zinc-900'
                  }`}
                />
                <button
                  type="submit"
                  className="rounded-xl bg-zinc-900 dark:bg-zinc-800 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-700 transition cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {/* Totals */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Express Air Shipping</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-amber-600 font-semibold">
                    <span>Launch Privilege (LAUNCH15)</span>
                    <span>−${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span>Estimated Total</span>
                  <span className="font-mono">${finalTotal}</span>
                </div>
              </div>

              {checkoutSuccess ? (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center text-xs text-emerald-600 font-semibold">
                  ✓ Order Reserved! Your AURA ONE Launch Batch confirmation has been generated.
                </div>
              ) : (
                <button
                  disabled={cartItems.length === 0}
                  onClick={() => {
                    setCheckoutSuccess(true);
                    showToast('Express Checkout initiated!');
                  }}
                  className="w-full rounded-2xl bg-amber-600 py-4 text-sm font-extrabold text-white shadow-xl shadow-amber-600/25 hover:bg-amber-500 disabled:opacity-50 transition cursor-pointer"
                >
                  Express Checkout — ${finalTotal}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}