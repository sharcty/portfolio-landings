import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Check,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  ChevronDown,
  ChevronUp,
  Layers,
  Cpu,
  Zap,
  ShieldCheck,
  Terminal,
  GitBranch,
  Award,
  Users,
  Search,
  Plus,
  X,
  Menu,
  BookOpen,
  FileCode2,
  Lock,
  Calendar,
  Star,
  ExternalLink
} from 'lucide-react';

/**
 * Custom IntersectionObserver hook for smooth scroll-reveal animations.
 */
function useScrollReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}

/**
 * Smooth reveal wrapper for sections and cards.
 */
function RevealSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useScrollReveal(0.08);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Custom SVG Code-Bracket & Layer Brand Logo for CraftStack Academy
 */
function CraftStackLogo() {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 shadow-lg shadow-amber-500/20">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#090A0F]"
        >
          <path
            d="M8 7L3 12L8 17"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 7L21 12L16 17"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.5 5L10.5 19"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#F8FAFC] leading-none">
          Craft<span className="text-amber-400">Stack</span>
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#94A3B8] mt-0.5">
          Academy
        </span>
      </div>
    </div>
  );
}

/**
 * Format seconds into M:SS timestamp
 */
function formatSeconds(totalSec) {
  const mins = Math.floor(totalSec / 60);
  const secs = Math.floor(totalSec % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Animated SVG Architecture Stage rendered inside the 16:9 Embedded Video Player
 */
function VideoChapterStage({ chapter, isPlaying, progressPct }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-6 overflow-hidden select-none">
      {/* Subtle Blueprint Grid Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(245, 158, 11, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(245, 158, 11, 0.14) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* Top HUD Telemetry inside Video Frame */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-[#090A0F]/85 px-3 py-1 text-[11px] font-mono text-emerald-400 backdrop-blur-md">
          <span
            className={`h-2 w-2 rounded-full bg-emerald-400 ${
              isPlaying ? 'animate-ping' : ''
            }`}
          />
          <span>{chapter.badge}</span>
        </div>

        <span className="rounded-md border border-[#1F2333] bg-[#090A0F]/85 px-2.5 py-1 font-mono text-[11px] text-[#94A3B8]">
          4K 60FPS • {chapter.codeTag}
        </span>
      </div>

      {/* Central Animated SVG Architecture Visualization */}
      <div className="relative z-10 my-auto flex items-center justify-center py-2">
        {chapter.visualType === 'trailer' && (
          <svg
            viewBox="0 0 520 200"
            className="w-full max-w-[460px] h-auto overflow-visible"
          >
            {/* Animated Signal Connections */}
            <path
              d="M 105 100 L 210 52 M 105 100 L 210 148 M 310 52 L 415 100 M 310 148 L 415 100"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeDasharray="6 6"
              className={isPlaying ? 'animate-dash-flow' : ''}
              opacity="0.85"
            />

            {/* Left Node: UI Layer */}
            <g transform="translate(20, 68)">
              <rect
                width="95"
                height="64"
                rx="12"
                fill="#12141D"
                stroke="#F59E0B"
                strokeWidth="1.8"
              />
              <text x="47.5" y="28" textAnchor="middle" fill="#FBBF24" fontSize="10" fontFamily="monospace" fontWeight="700">
                REACT 19
              </text>
              <text x="47.5" y="45" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="monospace">
                Concurrent UI
              </text>
            </g>

            {/* Top Center Node: State Machine */}
            <g transform="translate(205, 20)">
              <rect
                width="110"
                height="62"
                rx="12"
                fill="#12141D"
                stroke="#10B981"
                strokeWidth="1.8"
              />
              <text x="55" y="27" textAnchor="middle" fill="#34D399" fontSize="10" fontFamily="monospace" fontWeight="700">
                FSM ENGINE
              </text>
              <text x="55" y="44" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="monospace">
                Deterministic
              </text>
            </g>

            {/* Bottom Center Node: Sync Engine */}
            <g transform="translate(205, 118)">
              <rect
                width="110"
                height="62"
                rx="12"
                fill="#12141D"
                stroke="#38BDF8"
                strokeWidth="1.8"
              />
              <text x="55" y="27" textAnchor="middle" fill="#7DD3FC" fontSize="10" fontFamily="monospace" fontWeight="700">
                CRDT SYNC
              </text>
              <text x="55" y="44" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="monospace">
                &lt; 16ms Frame
              </text>
            </g>

            {/* Right Node: Edge & Telemetry */}
            <g transform="translate(405, 68)">
              <rect
                width="95"
                height="64"
                rx="12"
                fill="#12141D"
                stroke="#F59E0B"
                strokeWidth="1.8"
              />
              <text x="47.5" y="28" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontFamily="monospace" fontWeight="700">
                99+ SCORE
              </text>
              <text x="47.5" y="45" textAnchor="middle" fill="#10B981" fontSize="8.5" fontFamily="monospace">
                Zero-CLS Prod
              </text>
            </g>
          </svg>
        )}

        {chapter.visualType === 'fsm' && (
          <svg
            viewBox="0 0 520 200"
            className="w-full max-w-[460px] h-auto overflow-visible"
          >
            {/* State Transition Arrows */}
            <path
              d="M 135 100 L 205 100 M 315 100 L 385 100"
              stroke="#10B981"
              strokeWidth="2.2"
              strokeDasharray="5 5"
              className={isPlaying ? 'animate-dash-flow' : ''}
            />
            <path
              d="M 260 65 C 260 22, 440 22, 440 65"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.6"
              strokeDasharray="4 4"
            />

            {/* State 1: IDLE */}
            <rect x="25" y="68" width="110" height="64" rx="14" fill="#12141D" stroke="#94A3B8" strokeWidth="1.6" />
            <text x="80" y="96" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontFamily="monospace" fontWeight="700">
              IDLE
            </text>
            <text x="80" y="114" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="monospace">
              isLoading: false
            </text>

            {/* State 2: FETCHING */}
            <rect x="205" y="68" width="110" height="64" rx="14" fill="#12141D" stroke="#F59E0B" strokeWidth="2.2" />
            <text x="260" y="96" textAnchor="middle" fill="#FBBF24" fontSize="11" fontFamily="monospace" fontWeight="700">
              FETCHING
            </text>
            <text x="260" y="114" textAnchor="middle" fill="#F59E0B" fontSize="8.5" fontFamily="monospace">
              AbortSignal Guard
            </text>

            {/* State 3: COMMITTED */}
            <rect x="385" y="68" width="110" height="64" rx="14" fill="#12141D" stroke="#10B981" strokeWidth="2" />
            <text x="440" y="96" textAnchor="middle" fill="#34D399" fontSize="11" fontFamily="monospace" fontWeight="700">
              COMMITTED
            </text>
            <text x="440" y="114" textAnchor="middle" fill="#10B981" fontSize="8.5" fontFamily="monospace">
              0 Impossible States
            </text>
          </svg>
        )}

        {chapter.visualType === 'cls' && (
          <svg
            viewBox="0 0 520 200"
            className="w-full max-w-[460px] h-auto overflow-visible"
          >
            {/* Token Hierarchy Box */}
            <rect x="30" y="26" width="210" height="148" rx="12" fill="#12141D" stroke="#1F2333" strokeWidth="1.8" />
            <text x="46" y="50" fill="#FBBF24" fontSize="10" fontFamily="monospace" fontWeight="700">
              tokens.css → AST Compiler
            </text>
            <rect x="46" y="64" width="178" height="22" rx="6" fill="#090A0F" stroke="#F59E0B" strokeWidth="1" />
            <text x="56" y="78" fill="#F8FAFC" fontSize="9" fontFamily="monospace">
              --surface-elevated: #12141D
            </text>
            <rect x="46" y="94" width="178" height="22" rx="6" fill="#090A0F" stroke="#10B981" strokeWidth="1" />
            <text x="56" y="108" fill="#34D399" fontSize="9" fontFamily="monospace">
              aspect-ratio: 16 / 9;
            </text>
            <rect x="46" y="124" width="178" height="22" rx="6" fill="#090A0F" stroke="#38BDF8" strokeWidth="1" />
            <text x="56" y="138" fill="#7DD3FC" fontSize="9" fontFamily="monospace">
              font-variant-numeric: tabular
            </text>

            {/* Connector */}
            <path
              d="M 240 100 L 295 100"
              stroke="#F59E0B"
              strokeWidth="2.2"
              strokeDasharray="4 4"
              className={isPlaying ? 'animate-dash-flow' : ''}
            />

            {/* Right Lighthouse Gauge Card */}
            <rect x="295" y="26" width="195" height="148" rx="12" fill="#12141D" stroke="#10B981" strokeWidth="1.8" />
            <circle cx="392" cy="92" r="36" fill="none" stroke="#10B981" strokeWidth="5" />
            <text x="392" y="97" textAnchor="middle" fill="#10B981" fontSize="18" fontFamily="monospace" fontWeight="800">
              0.000
            </text>
            <text x="392" y="152" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontFamily="monospace" fontWeight="700">
              CUMULATIVE LAYOUT SHIFT
            </text>
          </svg>
        )}
      </div>

      {/* Bottom Caption & Instructor Audio Strip inside Video Stage */}
      <div className="relative z-10 flex items-center justify-between gap-3 rounded-xl border border-[#1F2333] bg-[#090A0F]/90 px-3.5 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 font-mono text-xs font-bold">
            MV
          </div>
          <p className="truncate text-xs text-[#F8FAFC]">
            <span className="font-semibold text-amber-400">Marcus Vance: </span>
            {chapter.caption}
          </p>
        </div>
        <span className="hidden sm:inline-block font-mono text-[11px] text-emerald-400 shrink-0">
          {Math.round(progressPct)}% watched
        </span>
      </div>
    </div>
  );
}

export default function App() {
  // =========================================================================
  // 1. LIVE COHORT #7 COUNTDOWN TIMER (SECOND-BY-SECOND TICKING)
  // =========================================================================
  // Initialize to 2 Days, 14 Hours, 38 Mins, 45 Secs remaining for Early-Bird Close
  const [secondsLeft, setSecondsLeft] = useState(
    2 * 86400 + 14 * 3600 + 38 * 60 + 45
  );
  const [seatsRemaining, setSeatsRemaining] = useState(14);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdownParts = useMemo(() => {
    const days = Math.floor(secondsLeft / 86400);
    const hours = Math.floor((secondsLeft % 86400) / 3600);
    const mins = Math.floor((secondsLeft % 3600) / 60);
    const secs = secondsLeft % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return {
      days: pad(days),
      hours: pad(hours),
      mins: pad(mins),
      secs: pad(secs)
    };
  }, [secondsLeft]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3600);
  };

  // =========================================================================
  // 2. INTERACTIVE EMBEDDED VIDEO HERO PLAYER & CHAPTERS
  // =========================================================================
  const previewChapters = [
    {
      id: 'trailer',
      number: '01',
      title: 'Course Trailer: Staff-Level Frontend Architecture',
      pillLabel: '01. Course Trailer (2:15)',
      durationSec: 135,
      badge: 'FREE TRAILER • COHORT #7',
      codeTag: 'architecture-overview.tsx',
      visualType: 'trailer',
      caption:
        'Why senior frontend engineering shifts from component syntax to deterministic state, latency budgets, and design system governance.'
    },
    {
      id: 'fsm',
      number: '02',
      title: 'State Machines vs. Spaghetti useEffect Hooks',
      pillLabel: '02. State Machines vs. Spaghetti Hooks (4:40)',
      durationSec: 280,
      badge: 'MODULE 01 • FREE PREVIEW',
      codeTag: 'checkoutMachine.ts',
      visualType: 'fsm',
      caption:
        'Eliminate race conditions and impossible boolean flags by modeling async UI flows as explicit finite state transitions.'
    },
    {
      id: 'cls',
      number: '03',
      title: 'Zero-CLS Design Systems & Token Compilers',
      pillLabel: '03. Zero-CLS Design Systems (3:50)',
      durationSec: 230,
      badge: 'MODULE 03 • FREE PREVIEW',
      codeTag: 'buildTokens.mjs',
      visualType: 'cls',
      caption:
        'Compile Figma W3C design tokens into type-safe CSS variables with strict layout reservation and 0.000 CLS.'
    }
  ];

  const [activeChapterId, setActiveChapterId] = useState('trailer');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(24);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const videoStageRef = useRef(null);

  const activeChapter =
    previewChapters.find((c) => c.id === activeChapterId) || previewChapters[0];

  // Simulated playback clock when Play is active
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTimeSec((prev) => {
        const next = prev + 0.5 * playbackSpeed;
        if (next >= activeChapter.durationSec) {
          setIsPlaying(false);
          return 0;
        }
        return next;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, activeChapter.durationSec]);

  const handleSelectChapter = (chapterId, autoPlay = true) => {
    setActiveChapterId(chapterId);
    setCurrentTimeSec(0);
    setIsPlaying(autoPlay);
  };

  const cyclePlaybackSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  const progressPct = Math.min(
    100,
    (currentTimeSec / (activeChapter.durationSec || 1)) * 100
  );

  // =========================================================================
  // 3. COLLAPSIBLE 8-MODULE CURRICULUM ACCORDION WITH FILTER & PREVIEW LAUNCH
  // =========================================================================
  const [curriculumFilter, setCurriculumFilter] = useState('All Modules');
  const [expandedModules, setExpandedModules] = useState([1, 2]);

  const curriculumModules = [
    {
      id: 1,
      number: '01',
      title: 'Deterministic State Machines & Concurrent React 19 Patterns',
      category: 'Architecture',
      duration: '2h 35m',
      lessonCount: 6,
      repoTag: 'repo-01-state-machines',
      lessons: [
        {
          title: 'Why Boolean Soup Breaks Enterprise UIs at Scale',
          duration: '18:20',
          freePreview: false
        },
        {
          title: 'State Machines vs. Spaghetti Hooks (Live Refactor)',
          duration: '04:40',
          freePreview: true,
          chapterId: 'fsm'
        },
        {
          title: 'AbortController, Request Deduplication & Optimistic Rollbacks',
          duration: '34:15',
          freePreview: false
        },
        {
          title: 'Designing Undo/Redo Command Stacks with Structural Sharing',
          duration: '41:10',
          freePreview: false
        }
      ]
    },
    {
      id: 2,
      number: '02',
      title: 'Production TypeScript: Discriminated Unions & AST Type Safety',
      category: 'Architecture',
      duration: '2h 15m',
      lessonCount: 6,
      repoTag: 'repo-02-typed-sdk',
      lessons: [
        {
          title: 'Making Illegal States Unrepresentable in Component Props',
          duration: '26:40',
          freePreview: false
        },
        {
          title: 'End-to-End Type-Safe RPC Clients Without Codegen Bloat',
          duration: '31:50',
          freePreview: false
        },
        {
          title: 'Branded Types for Currencies, Timestamps & Tenant IDs',
          duration: '22:15',
          freePreview: false
        }
      ]
    },
    {
      id: 3,
      number: '03',
      title: 'Zero-CLS Multi-Brand Design Systems & Token Compilers',
      category: 'Architecture',
      duration: '2h 40m',
      lessonCount: 6,
      repoTag: 'repo-03-design-system-cli',
      lessons: [
        {
          title: 'Zero-CLS Design Systems & Token Compilers',
          duration: '03:50',
          freePreview: true,
          chapterId: 'cls'
        },
        {
          title: 'Accessible Headless Primitives: Focus Traps & ARIA Roaming',
          duration: '38:45',
          freePreview: false
        },
        {
          title: 'Automated Visual Regression Pipelines with Playwright',
          duration: '29:10',
          freePreview: false
        }
      ]
    },
    {
      id: 4,
      number: '04',
      title: '99+ Lighthouse Performance, Core Web Vitals & Frame Budgets',
      category: 'Performance',
      duration: '2h 25m',
      lessonCount: 6,
      repoTag: 'repo-04-perf-profiler',
      lessons: [
        {
          title: 'Diagnosing Main-Thread Long Tasks & React Fiber Commits',
          duration: '33:20',
          freePreview: false
        },
        {
          title: 'Sub-100ms INP (Interaction to Next Paint) Optimization',
          duration: '28:55',
          freePreview: false
        },
        {
          title: 'Code-Splitting, Route Prefetching & Bundle Tree-Shaking',
          duration: '24:40',
          freePreview: false
        }
      ]
    },
    {
      id: 5,
      number: '05',
      title: 'Local-First Sync Engines, IndexedDB & CRDT Collaboration',
      category: 'Architecture',
      duration: '2h 50m',
      lessonCount: 6,
      repoTag: 'repo-05-local-first-canvas',
      lessons: [
        {
          title: 'Offline-First Mutation Queues & Conflict Resolution',
          duration: '42:10',
          freePreview: false
        },
        {
          title: 'Building 60fps Multiplayer Cursors & Canvas Spatial Hashing',
          duration: '46:30',
          freePreview: false
        },
        {
          title: 'WebWorkers for Heavy JSON & SQLite-WASM Queries',
          duration: '31:05',
          freePreview: false
        }
      ]
    },
    {
      id: 6,
      number: '06',
      title: 'High-Frequency Data Grids, Virtualization & WebSocket Streams',
      category: 'Performance',
      duration: '2h 10m',
      lessonCount: 5,
      repoTag: 'repo-06-orderbook-grid',
      lessons: [
        {
          title: 'Windowed Virtual Scrolling for 250,000+ Live Rows',
          duration: '36:15',
          freePreview: false
        },
        {
          title: 'Throttling 100Hz WebSocket Ticks with requestAnimationFrame',
          duration: '29:40',
          freePreview: false
        }
      ]
    },
    {
      id: 7,
      number: '07',
      title: 'Frontend Observability, Telemetry & Error Boundaries',
      category: 'Performance',
      duration: '1h 45m',
      lessonCount: 5,
      repoTag: 'repo-07-telemetry-sdk',
      lessons: [
        {
          title: 'Granular Error Boundaries & Self-Healing UI Recovery',
          duration: '24:30',
          freePreview: false
        },
        {
          title: 'Real-User Monitoring (RUM) & Custom Performance Marks',
          duration: '27:15',
          freePreview: false
        }
      ]
    },
    {
      id: 8,
      number: '08',
      title: 'Staff Engineer System Design Interviews & RFC Leadership',
      category: 'Architecture',
      duration: '1h 50m',
      lessonCount: 6,
      repoTag: 'workbook-08-staff-rfcs',
      lessons: [
        {
          title: 'Course Trailer: Staff-Level Frontend Architecture',
          duration: '02:15',
          freePreview: true,
          chapterId: 'trailer'
        },
        {
          title: 'Writing High-Leverage Technical RFCs That Get Approved',
          duration: '32:40',
          freePreview: false
        },
        {
          title: 'Live Mock Staff Frontend System Design Walkthrough',
          duration: '44:20',
          freePreview: false
        }
      ]
    }
  ];

  const filteredModules = useMemo(() => {
    if (curriculumFilter === 'All Modules') return curriculumModules;
    if (curriculumFilter === 'Free Previews') {
      return curriculumModules.filter((m) =>
        m.lessons.some((l) => l.freePreview)
      );
    }
    return curriculumModules.filter((m) => m.category === curriculumFilter);
  }, [curriculumFilter]);

  const toggleModule = (id) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const allExpanded =
    filteredModules.length > 0 &&
    filteredModules.every((m) => expandedModules.includes(m.id));

  const handleExpandCollapseAll = () => {
    if (allExpanded) {
      setExpandedModules([]);
    } else {
      setExpandedModules(filteredModules.map((m) => m.id));
    }
  };

  const handleLaunchFreePreview = (chapterId) => {
    handleSelectChapter(chapterId || 'trailer', true);
    if (videoStageRef.current) {
      videoStageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
    showToast('Loaded Free Preview lesson into the player above');
  };

  // =========================================================================
  // 5. CAPSTONE PROJECTS & VERIFIED STUDENT OUTCOMES
  // =========================================================================
  const capstones = [
    {
      number: 'CAPSTONE 01',
      title: 'Local-First Multiplayer Canvas',
      stack: 'React 19 • CRDTs • IndexedDB • Canvas 2D',
      summary:
        'Build a Figma-grade collaborative whiteboard with offline persistence, conflict-free multiplayer cursors, spatial R-tree indexing, and deterministic undo/redo.',
      metrics: '60 FPS @ 10,000 nodes'
    },
    {
      number: 'CAPSTONE 02',
      title: 'High-Frequency Trading Orderbook UI',
      stack: 'TypeScript • WebSockets • Virtualization • WebWorkers',
      summary:
        'Architect a sub-16ms financial terminal ingesting 100+ WebSocket ticks per second with windowed virtualization, off-main-thread aggregation, and zero layout thrashing.',
      metrics: '4.2ms p99 Frame Time'
    },
    {
      number: 'CAPSTONE 03',
      title: 'Multi-Tenant Design System CLI',
      stack: 'Node AST • W3C Tokens • ARIA Primitives • Playwright',
      summary:
        'Ship an enterprise UI package compiler that transforms Figma tokens into themed CSS variables, enforces WCAG AAA contrast, and runs automated visual diffing.',
      metrics: '0.000 CLS • 100 Lighthouse'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Nair',
      outcome: 'Promoted to Staff Frontend Engineer @ Linear-style Series C',
      quote:
        'Module 1 and Module 5 completely changed how I architect client state. I used the local-first sync patterns from Capstone 01 to lead our offline workspace migration and got promoted to Staff two quarters later.',
      cohort: 'Cohort #5 Alumni'
    },
    {
      name: 'Daniel Lindqvist',
      outcome: 'Senior UI Systems Engineer @ Fintech Unicorn',
      quote:
        'Most React courses teach surface-level APIs. Marcus teaches you how browsers actually schedule frames, how to eliminate INP bottlenecks, and how to write RFCs that senior leadership respects.',
      cohort: 'Cohort #6 Alumni'
    },
    {
      name: 'Elena Morales',
      outcome: 'Lead Design Systems Architect @ Enterprise SaaS',
      quote:
        'The token compiler and headless accessibility patterns alone saved our 18-person frontend org months of trial and error. Having Marcus review my capstone PRs was worth 10× the tuition.',
      cohort: 'Cohort #6 Alumni'
    }
  ];

  // =========================================================================
  // 6. SEAT RESERVATION MODAL STATE
  // =========================================================================
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('cohort'); // 'self-paced' | 'cohort'
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentRole, setStudentRole] = useState('Senior Frontend Engineer');
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [formError, setFormError] = useState('');

  const openReservationModal = (tierId = 'cohort') => {
    setSelectedTier(tierId);
    setReservationConfirmed(false);
    setFormError('');
    setReserveModalOpen(true);
  };

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    if (studentName.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail.trim())) {
      setFormError('Please enter a valid email address for your cohort invite.');
      return;
    }

    setFormError('');
    setReservationConfirmed(true);
    if (selectedTier === 'cohort') {
      setSeatsRemaining((prev) => Math.max(1, prev - 1));
    }
    showToast('Seat locked! Check your inbox for your CraftStack onboarding kit.');
  };

  // =========================================================================
  // 7. SEARCHABLE / CATEGORIZED FAQ DRAWER ACCORDION
  // =========================================================================
  const [faqCategory, setFaqCategory] = useState('All Questions');
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqId, setOpenFaqId] = useState(1);

  const faqItems = [
    {
      id: 1,
      category: 'Curriculum & Prerequisites',
      q: 'What experience level is required before joining Frontend Architecture Mastery?',
      a: 'This curriculum is engineered for mid-level to senior frontend developers who already build React and TypeScript applications and want to level up to Staff/Principal architectural thinking. You should be comfortable with React hooks, async/await, and basic TypeScript generics.'
    },
    {
      id: 2,
      category: 'Live Cohort & Schedule',
      q: 'How do the Live Cohort #7 sessions and PR code reviews work?',
      a: 'Cohort #7 kicks off December 7 and runs for 6 weeks. Every Wednesday at 1:00 PM EST (and recorded in 4K with searchable transcripts), Marcus hosts a 90-minute live architecture workshop and Q&A. You also submit your 3 capstone repositories for direct line-by-line GitHub PR feedback.'
    },
    {
      id: 3,
      category: 'Live Cohort & Schedule',
      q: 'What if I miss a live session or live in a different time zone?',
      a: 'Every live workshop is uploaded within 2 hours in 4K resolution alongside timestamped notes and runnable GitHub branches. Students across Europe, Asia, and the Americas also use our private Discord channels for async architecture reviews.'
    },
    {
      id: 4,
      category: 'Curriculum & Prerequisites',
      q: 'Do I get lifetime access to future React & TypeScript curriculum updates?',
      a: 'Yes. Both Self-Paced Core and Live Cohort #7 include lifetime access to all 46+ HD lessons, the 4 production starter repositories, future React/Next.js/TypeScript architecture updates, and our private CraftStack alumni Discord.'
    },
    {
      id: 5,
      category: 'Teams & Refunds',
      q: 'Can I expense this course using my company Learning & Development (L&D) budget?',
      a: 'Over 65% of CraftStack students expense their tuition through their employer L&D stipend. Immediately upon enrollment, you receive an itemized tax invoice and an employer justification template.'
    },
    {
      id: 6,
      category: 'Teams & Refunds',
      q: 'Do you offer team discounts for engineering squads of 3 or more?',
      a: 'Yes! Engineering teams enrolling 3+ developers automatically receive 20% off Cohort #7 tuition plus a private 60-minute architecture consultation with Marcus tailored to your company’s frontend codebase.'
    },
    {
      id: 7,
      category: 'Teams & Refunds',
      q: 'What is your refund policy if the course is not a fit?',
      a: 'We offer a 14-day, 100% no-questions-asked refund guarantee from the day Cohort #7 begins (or from purchase date for Self-Paced). Watch Module 1 and Module 2, clone the repos, and if it doesn’t elevate your engineering craft, email us for a full refund.'
    }
  ];

  const filteredFaqs = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesCat =
        faqCategory === 'All Questions' || item.category === faqCategory;
      const qLower = faqSearch.trim().toLowerCase();
      const matchesSearch =
        !qLower ||
        item.q.toLowerCase().includes(qLower) ||
        item.a.toLowerCase().includes(qLower);
      return matchesCat && matchesSearch;
    });
  }, [faqCategory, faqSearch]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F8FAFC] selection:bg-amber-500 selection:text-[#090A0F]">
      {/* Inline Keyframes & Custom Scrollbar Styling */}
      <style>{`
        @keyframes dashFlow {
          to { stroke-dashoffset: -24; }
        }
        .animate-dash-flow {
          animation: dashFlow 1.2s linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #090A0F;
        }
        ::-webkit-scrollbar-thumb {
          background: #1F2333;
          border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #F59E0B;
        }
      `}</style>

      {/* Non-Blocking Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-5 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-500/40 bg-[#12141D]/95 px-4 py-3 text-xs sm:text-sm font-medium text-[#F8FAFC] shadow-2xl backdrop-blur-md">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          1. LIVE COHORT COUNTDOWN ANNOUNCEMENT BAR
         ===================================================================== */}
      <div className="border-b border-[#1F2333] bg-[#12141D] px-4 py-2.5 text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center sm:justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-mono font-bold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {seatsRemaining} of 60 seats remaining
            </span>
            <span className="hidden md:inline text-[#94A3B8]">
              Cohort #7 Early-Bird Tuition ($150 Off) closes in:
            </span>
          </div>

          {/* Live Second-by-Second Ticking Countdown */}
          <div className="flex items-center gap-2 font-mono">
            <span className="text-[#94A3B8] sm:hidden">Closes in:</span>
            {[
              { val: countdownParts.days, label: 'D' },
              { val: countdownParts.hours, label: 'H' },
              { val: countdownParts.mins, label: 'M' },
              { val: countdownParts.secs, label: 'S' }
            ].map((unit, idx) => (
              <div
                key={idx}
                className="flex items-baseline gap-0.5 rounded-md border border-amber-500/30 bg-[#090A0F] px-2 py-0.5 text-amber-400 font-bold tabular-nums"
              >
                <span>{unit.val}</span>
                <span className="text-[10px] text-[#94A3B8]">{unit.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          STICKY GLASSMORPHIC NAVBAR
         ===================================================================== */}
      <header className="sticky top-0 z-40 border-b border-[#1F2333]/90 bg-[#090A0F]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="focus:outline-none"
          >
            <CraftStackLogo />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#94A3B8]">
            {[
              { label: 'Overview', id: 'overview' },
              { label: 'Curriculum', id: 'curriculum' },
              { label: 'Projects', id: 'projects' },
              { label: 'Reviews', id: 'reviews' },
              { label: 'Tuition', id: 'tuition' },
              { label: 'FAQ', id: 'faq' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-[#F8FAFC] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => openReservationModal('cohort')}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-[#090A0F] shadow-lg shadow-amber-500/20 hover:bg-amber-400 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Reserve Seat</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-[#1F2333] bg-[#12141D] text-[#F8FAFC]"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#1F2333] bg-[#090A0F] px-4 pt-3 pb-5 space-y-1.5">
            {[
              { label: 'Overview', id: 'overview' },
              { label: 'Curriculum', id: 'curriculum' },
              { label: 'Projects', id: 'projects' },
              { label: 'Reviews', id: 'reviews' },
              { label: 'Tuition', id: 'tuition' },
              { label: 'FAQ', id: 'faq' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#94A3B8] hover:bg-[#12141D] hover:text-[#F8FAFC]"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* =====================================================================
          2. EMBEDDED VIDEO HERO SECTION WITH INTERACTIVE LESSON CHAPTER PLAYER
         ===================================================================== */}
      <section
        id="overview"
        className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 scroll-mt-16"
      >
        {/* Subtle Warm Amber Ambient Radial Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-28 -z-10 flex justify-center overflow-hidden"
        >
          <div className="h-[420px] w-[860px] rounded-full bg-gradient-to-tr from-amber-500/20 via-orange-500/10 to-emerald-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT EDITORIAL COLUMN (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Cohort Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Cohort #7 • Starts Dec 7</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-5xl lg:text-[54px] lg:leading-[1.08]">
                Ship Production-Grade{' '}
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                  React &amp; TypeScript
                </span>{' '}
                Systems That Scale.
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-[#94A3B8] max-w-xl">
                A 6-week intensive architecture workshop and 46-lesson engineering curriculum for frontend developers ready to master deterministic state machines, sub-16ms rendering, and multi-brand design systems.
              </p>

              {/* Instructor Credential Strip */}
              <div className="flex items-center gap-3.5 rounded-2xl border border-[#1F2333] bg-[#12141D]/90 p-3.5 max-w-lg">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 font-extrabold text-sm text-[#090A0F]">
                  MV
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-[#F8FAFC]">
                      Marcus Vance
                    </span>
                    <span className="rounded bg-[#1F2333] px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-400">
                      Staff Frontend Engineer
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Ex-Vercel &amp; Stripe • 1,940+ Engineers Mentored • 4.96★ Rating
                  </p>
                </div>
              </div>

              {/* Dual Hero CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-1">
                <button
                  onClick={() => openReservationModal('cohort')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-4 text-sm font-extrabold text-[#090A0F] shadow-xl shadow-amber-500/20 hover:bg-amber-400 active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Enroll in Cohort #7 — $499</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => handleSelectChapter('fsm', true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#1F2333] bg-[#12141D] px-5 py-4 text-sm font-semibold text-[#F8FAFC] hover:border-amber-500/50 transition-all cursor-pointer"
                >
                  <Play className="h-4 w-4 text-emerald-400 fill-emerald-400" />
                  <span>Watch Free Module 1 Preview</span>
                </button>
              </div>
            </div>

            {/* RIGHT INTERACTIVE EMBEDDED VIDEO PLAYER STAGE (6 Cols) */}
            <div ref={videoStageRef} className="lg:col-span-6 space-y-3.5">
              <div className="overflow-hidden rounded-2xl border border-[#1F2333] bg-[#12141D] shadow-2xl shadow-black/60">
                {/* 16:9 Video Viewport */}
                <div className="relative aspect-video w-full bg-[#090A0F]">
                  <VideoChapterStage
                    chapter={activeChapter}
                    isPlaying={isPlaying}
                    progressPct={progressPct}
                  />

                  {/* Center Big Play Button Overlay when Paused */}
                  {!isPlaying && (
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      aria-label="Play lesson preview"
                      className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 backdrop-blur-[1px] group cursor-pointer"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-[#090A0F] shadow-2xl shadow-amber-500/40 transition-transform group-hover:scale-110">
                        <Play className="h-7 w-7 fill-[#090A0F] ml-0.5" />
                      </div>
                    </button>
                  )}
                </div>

                {/* Interactive Timeline Scrubber & Transport Controls */}
                <div className="border-t border-[#1F2333] bg-[#12141D] px-4 py-3 space-y-2.5">
                  {/* Clickable Scrubber Bar */}
                  <div
                    role="slider"
                    aria-label="Video timeline scrubber"
                    aria-valuemin={0}
                    aria-valuemax={activeChapter.durationSec}
                    aria-valuenow={Math.round(currentTimeSec)}
                    tabIndex={0}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const ratio = Math.max(
                        0,
                        Math.min(1, (e.clientX - rect.left) / rect.width)
                      );
                      setCurrentTimeSec(ratio * activeChapter.durationSec);
                    }}
                    className="group relative h-2 w-full cursor-pointer rounded-full bg-[#1F2333]"
                  >
                    <div
                      style={{ width: `${progressPct}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-150"
                    />
                    <span
                      style={{ left: `${progressPct}%` }}
                      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-[#F8FAFC] shadow opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  {/* Control Buttons Row */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsPlaying((p) => !p)}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1F2333] text-[#F8FAFC] hover:bg-amber-500 hover:text-[#090A0F] transition cursor-pointer"
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsMuted((m) => !m)}
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                        className="text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer"
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4 text-rose-400" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </button>

                      <span className="font-mono text-[11px] text-[#94A3B8] tabular-nums">
                        {formatSeconds(currentTimeSec)} /{' '}
                        {formatSeconds(activeChapter.durationSec)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline truncate max-w-[180px] text-[11px] text-[#94A3B8]">
                        {activeChapter.title}
                      </span>
                      <button
                        type="button"
                        onClick={cyclePlaybackSpeed}
                        title="Change playback speed"
                        className="rounded-md border border-[#1F2333] bg-[#090A0F] px-2 py-1 font-mono text-[11px] font-bold text-amber-400 hover:border-amber-500/50 transition cursor-pointer"
                      >
                        {playbackSpeed}x
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clickable Chapter Switcher Pills below the Video */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {previewChapters.map((chap) => {
                  const isActive = chap.id === activeChapterId;
                  return (
                    <button
                      key={chap.id}
                      type="button"
                      onClick={() => handleSelectChapter(chap.id, true)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'border-amber-500 bg-amber-500/15 text-[#F8FAFC]'
                          : 'border-[#1F2333] bg-[#12141D] text-[#94A3B8] hover:border-amber-500/40 hover:text-[#F8FAFC]'
                      }`}
                    >
                      <Play
                        className={`h-3.5 w-3.5 shrink-0 ${
                          isActive ? 'text-amber-400 fill-amber-400' : 'text-emerald-400'
                        }`}
                      />
                      <span className="truncate">{chap.pillLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. OUTCOMES & WHO THIS IS FOR BENTO GRID
         ===================================================================== */}
      <section className="py-20 sm:py-24 border-y border-[#1F2333] bg-[#12141D]/35">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection className="mx-auto max-w-2xl text-center mb-14">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              Engineering Career Outcomes
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              Built for Frontend Engineers Ready to Lead Architecture
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#94A3B8]">
              Bridge the gap between shipping feature tickets and owning mission-critical client infrastructure.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Staff-Level System Design',
                tag: 'Architecture',
                desc: 'Master client-side caching topologies, local-first sync engines, and technical RFCs that clear Staff/Principal interview loops.',
                icon: Layers,
                accent: 'text-amber-400 bg-amber-500/10 border-amber-500/25'
              },
              {
                title: '99+ Lighthouse & Sub-16ms INP',
                tag: 'Performance',
                desc: 'Eliminate main-thread bottlenecks, React Fiber render cascades, and layout shifts with production flamegraph profiling.',
                icon: Zap,
                accent: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25'
              },
              {
                title: 'Production TypeScript Patterns',
                tag: 'Type Safety',
                desc: 'Use discriminated unions, branded primitives, and AST token compilers to make invalid UI states impossible at compile time.',
                icon: Terminal,
                accent: 'text-sky-400 bg-sky-500/10 border-sky-500/25'
              },
              {
                title: 'Real-World Capstone Repos',
                tag: 'Portfolio Proof',
                desc: 'Graduate with 3 production-grade GitHub repositories reviewed line-by-line by Marcus Vance during Cohort #7.',
                icon: GitBranch,
                accent: 'text-amber-400 bg-amber-500/10 border-amber-500/25'
              }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <RevealSection key={idx} delay={idx * 80}>
                  <div className="group h-full rounded-2xl border border-[#1F2333] bg-[#12141D] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/45 hover:shadow-xl hover:shadow-amber-500/5">
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl border ${card.accent}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#94A3B8]">
                        {card.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#F8FAFC] group-hover:text-amber-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#94A3B8]">
                      {card.desc}
                    </p>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. COLLAPSIBLE MULTI-MODULE CURRICULUM ACCORDION
         ===================================================================== */}
      <section id="curriculum" className="py-20 sm:py-28 scroll-mt-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              Complete Syllabus
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              8 Modules • 46 HD Lessons • 18.5 Hours • 4 Capstone Repos
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#94A3B8]">
              Every module pairs deep architectural theory with runnable TypeScript repositories, benchmarks, and exercises.
            </p>
          </RevealSection>

          {/* Filter Pills + Expand All / Collapse All Controls */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#1F2333] bg-[#12141D] p-3.5">
            <div className="flex flex-wrap items-center gap-1.5">
              {['All Modules', 'Free Previews', 'Architecture', 'Performance'].map(
                (pill) => {
                  const active = curriculumFilter === pill;
                  return (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => setCurriculumFilter(pill)}
                      className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                        active
                          ? 'bg-amber-500 text-[#090A0F] font-bold'
                          : 'bg-[#090A0F] text-[#94A3B8] border border-[#1F2333] hover:text-[#F8FAFC]'
                      }`}
                    >
                      {pill}
                    </button>
                  );
                }
              )}
            </div>

            <button
              type="button"
              onClick={handleExpandCollapseAll}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#1F2333] bg-[#090A0F] px-3.5 py-1.5 text-xs font-mono font-semibold text-amber-400 hover:border-amber-500/50 transition cursor-pointer"
            >
              {allExpanded ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" />
                  <span>Collapse All</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" />
                  <span>Expand All</span>
                </>
              )}
            </button>
          </div>

          {/* 8 Collapsible Module Accordions */}
          <div className="space-y-3.5">
            {filteredModules.map((mod) => {
              const isOpen = expandedModules.includes(mod.id);
              const hasFreePreview = mod.lessons.some((l) => l.freePreview);

              return (
                <div
                  key={mod.id}
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    isOpen
                      ? 'border-amber-500/40 bg-[#12141D]'
                      : 'border-[#1F2333] bg-[#12141D]/75 hover:border-[#2E344B]'
                  }`}
                >
                  {/* Module Header Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleModule(mod.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-[#090A0F] font-mono text-xs font-extrabold text-amber-400">
                        {mod.number}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-[#F8FAFC]">
                            {mod.title}
                          </h3>
                          {hasFreePreview && (
                            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                              FREE PREVIEW
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-mono text-[#94A3B8]">
                          <span>{mod.lessonCount} lessons</span>
                          <span>•</span>
                          <span>{mod.duration}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="hidden sm:inline-flex items-center gap-1 text-amber-400/90">
                            <FileCode2 className="h-3 w-3" />
                            {mod.repoTag}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ChevronDown
                      className={`h-5 w-5 text-[#94A3B8] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>

                  {/* Smooth Collapsible Lesson List */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-[#1F2333] bg-[#090A0F]/60 px-5 py-4 space-y-2.5">
                        {mod.lessons.map((lesson, lIdx) => (
                          <div
                            key={lIdx}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-[#1F2333]/80 bg-[#12141D]/80 px-3.5 py-2.5"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {lesson.freePreview ? (
                                <Play className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400 shrink-0" />
                              ) : (
                                <Lock className="h-3.5 w-3.5 text-[#94A3B8] shrink-0" />
                              )}
                              <span className="text-xs sm:text-sm text-[#F8FAFC] truncate">
                                {lesson.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-2.5 shrink-0 pl-6 sm:pl-0">
                              {lesson.freePreview && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleLaunchFreePreview(lesson.chapterId)
                                  }
                                  className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400 hover:bg-emerald-500 hover:text-[#090A0F] transition cursor-pointer"
                                >
                                  <Play className="h-2.5 w-2.5 fill-current" />
                                  Watch Free Preview
                                </button>
                              )}
                              <span className="font-mono text-xs text-[#94A3B8] tabular-nums">
                                {lesson.duration}
                              </span>
                            </div>
                          </div>
                        ))}

                        <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                          <span>Includes downloadable starter &amp; solution repo</span>
                          <span className="text-amber-400">{mod.repoTag}.zip</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. REAL-WORLD CAPSTONE PROJECTS & INSTRUCTOR SPOTLIGHT
         ===================================================================== */}
      <section
        id="projects"
        className="py-20 sm:py-28 border-y border-[#1F2333] bg-[#12141D]/35 scroll-mt-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
          {/* 3 Production Capstones */}
          <div>
            <RevealSection className="mx-auto max-w-2xl text-center mb-14">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                Hands-On Engineering Proof
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
                Three Production Systems You Will Architect &amp; Ship
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#94A3B8]">
                No toy todo apps. Every capstone solves a high-complexity frontend systems problem with strict latency and type-safety benchmarks.
              </p>
            </RevealSection>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {capstones.map((cap, idx) => (
                <RevealSection key={idx} delay={idx * 90}>
                  <div className="h-full flex flex-col justify-between rounded-2xl border border-[#1F2333] bg-[#12141D] p-7 transition-all hover:border-amber-500/45">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs font-extrabold text-amber-400">
                          {cap.number}
                        </span>
                        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-400">
                          {cap.metrics}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#F8FAFC]">
                        {cap.title}
                      </h3>
                      <div className="mt-1.5 font-mono text-xs text-amber-400/90">
                        {cap.stack}
                      </div>
                      <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-[#94A3B8]">
                        {cap.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#1F2333] flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                      <span>Full Test Suite Included</span>
                      <span className="text-[#F8FAFC]">PR Code Review</span>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>

          {/* Instructor Bio Spotlight + Alumni Testimonials */}
          <div id="reviews" className="scroll-mt-20 space-y-12">
            {/* Instructor Spotlight Card */}
            <RevealSection>
              <div className="rounded-3xl border border-[#1F2333] bg-[#12141D] p-7 sm:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left">
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 text-3xl font-extrabold text-[#090A0F] shadow-xl shadow-amber-500/20">
                      MV
                    </div>
                    <h3 className="mt-4 text-2xl font-extrabold text-[#F8FAFC]">
                      Marcus Vance
                    </h3>
                    <p className="text-xs font-mono text-amber-400 mt-1">
                      Staff Frontend Engineer • Ex-Vercel &amp; Stripe
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
                      {['Ex-Vercel DX', 'Ex-Stripe Checkout', '12+ Yrs Frontend'].map(
                        (badge) => (
                          <span
                            key={badge}
                            className="rounded-lg border border-[#1F2333] bg-[#090A0F] px-2.5 py-1 font-mono text-[11px] text-[#94A3B8]"
                          >
                            {badge}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-400">
                      Your Instructor &amp; Code Reviewer
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                      “Great frontend architecture feels invisible to the user and effortless to the team maintaining it.”
                    </h4>
                    <p className="text-sm leading-relaxed text-[#94A3B8]">
                      Over the past decade, Marcus led core frontend infrastructure initiatives at Stripe and Vercel—designing high-conversion checkout state machines, sub-50ms edge dashboards, and multi-brand design systems used by hundreds of engineers. CraftStack Academy distills those battle-tested patterns into an actionable, zero-fluff curriculum.
                    </p>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Verified Alumni Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <RevealSection key={idx} delay={idx * 80}>
                  <div className="h-full flex flex-col justify-between rounded-2xl border border-[#1F2333] bg-[#12141D] p-6">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="text-amber-400 font-bold">★★★★★</span>
                        <span className="font-mono text-[11px] text-emerald-400">
                          {t.cohort}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed text-[#F8FAFC]">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#1F2333]">
                      <div className="text-sm font-bold text-[#F8FAFC]">{t.name}</div>
                      <div className="text-xs text-amber-400 mt-0.5">{t.outcome}</div>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. COHORT TUITION & ENROLLMENT CARDS
         ===================================================================== */}
      <section id="tuition" className="py-20 sm:py-28 scroll-mt-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <RevealSection className="mx-auto max-w-2xl text-center mb-14">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              Cohort #7 Enrollment
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              Invest Once. Level Up Your Engineering Career Forever.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#94A3B8]">
              14-day 100% money-back guarantee. Itemized employer L&amp;D expense invoice included automatically.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* TIER 1: SELF-PACED CORE ($349) */}
            <RevealSection>
              <div className="h-full flex flex-col justify-between rounded-3xl border border-[#1F2333] bg-[#12141D] p-7 sm:p-9">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                    Independent Track
                  </span>
                  <h3 className="mt-2 text-2xl font-extrabold text-[#F8FAFC]">
                    Self-Paced Core
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#94A3B8]">
                    Complete lifetime access to all 46 HD video lessons, starter repos, and architecture workbooks.
                  </p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-mono text-4xl sm:text-5xl font-extrabold text-[#F8FAFC] tabular-nums">
                      $349
                    </span>
                    <span className="text-xs text-[#94A3B8]">one-time payment</span>
                  </div>

                  <ul className="mt-7 space-y-3.5 border-t border-[#1F2333] pt-6 text-xs sm:text-sm">
                    {[
                      'All 8 Modules & 46 4K HD Lessons (18.5 Hours)',
                      '4 Production Capstone GitHub Repositories',
                      'Downloadable TypeScript Architecture Workbooks',
                      'Lifetime Updates & CraftStack Discord Access',
                      'Certificate of Completion for LinkedIn'
                    ].map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-[#F8FAFC]">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => openReservationModal('self-paced')}
                  className="mt-8 w-full rounded-xl border border-[#1F2333] bg-[#090A0F] py-3.5 px-5 text-sm font-bold text-[#F8FAFC] hover:border-amber-500/60 transition cursor-pointer"
                >
                  Enroll Self-Paced — $349
                </button>
              </div>
            </RevealSection>

            {/* TIER 2: LIVE COHORT #7 + CODE REVIEWS ($499 — MOST POPULAR) */}
            <RevealSection delay={100}>
              <div className="relative h-full flex flex-col justify-between rounded-3xl border-2 border-amber-500 bg-gradient-to-b from-amber-500/10 via-[#12141D] to-[#12141D] p-7 sm:p-9 shadow-2xl shadow-amber-500/10">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#090A0F] shadow-lg">
                    <Sparkles className="h-3.5 w-3.5" />
                    Most Popular • Save $150
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Starts Dec 7 • {seatsRemaining} Seats Left
                    </span>
                    <span className="font-mono text-xs text-amber-400 tabular-nums">
                      Ends in {countdownParts.days}d {countdownParts.hours}h{' '}
                      {countdownParts.mins}m
                    </span>
                  </div>

                  <h3 className="mt-2 text-2xl font-extrabold text-[#F8FAFC]">
                    Live Cohort #7 + Code Reviews
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#94A3B8]">
                    Everything in Self-Paced plus 6 weeks of live workshops and direct GitHub PR code reviews from Marcus Vance.
                  </p>

                  <div className="mt-6 flex items-baseline gap-2.5">
                    <span className="font-mono text-4xl sm:text-5xl font-extrabold text-[#F8FAFC] tabular-nums">
                      $499
                    </span>
                    <span className="font-mono text-base text-[#94A3B8] line-through tabular-nums">
                      $649
                    </span>
                    <span className="rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-xs font-bold text-emerald-400">
                      Early-Bird
                    </span>
                  </div>

                  <ul className="mt-7 space-y-3.5 border-t border-[#1F2333] pt-6 text-xs sm:text-sm">
                    {[
                      'Everything in Self-Paced Core (Lifetime Access)',
                      '6 Weekly Live Architecture Workshops & Q&A with Marcus',
                      'Line-by-Line GitHub PR Code Reviews on All 3 Capstones',
                      'Live Mock Staff Frontend System Design Prep Session',
                      'Private Cohort #7 Slack/Discord Accountability Channel',
                      'Priority L&D Employer Invoice & Verified Credential'
                    ].map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-[#F8FAFC]">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => openReservationModal('cohort')}
                  className="mt-8 w-full rounded-xl bg-amber-500 py-4 px-5 text-sm font-extrabold text-[#090A0F] shadow-xl shadow-amber-500/25 hover:bg-amber-400 transition cursor-pointer"
                >
                  Reserve Cohort #7 Seat — $499
                </button>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. SEARCHABLE / CATEGORIZED FAQ DRAWER ACCORDION
         ===================================================================== */}
      <section
        id="faq"
        className="py-20 sm:py-28 border-t border-[#1F2333] bg-[#12141D]/35 scroll-mt-16"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              Frequently Asked Questions
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              Everything You Need to Know Before Enrolling
            </h2>
          </RevealSection>

          {/* Search Input & Category Tabs */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search questions (e.g., L&D budget, time zone, TypeScript, refund)..."
                className="w-full rounded-2xl border border-[#1F2333] bg-[#12141D] pl-11 pr-4 py-3.5 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                'All Questions',
                'Curriculum & Prerequisites',
                'Live Cohort & Schedule',
                'Teams & Refunds'
              ].map((cat) => {
                const active = faqCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFaqCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      active
                        ? 'bg-amber-500 text-[#090A0F] font-bold'
                        : 'border border-[#1F2333] bg-[#12141D] text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Collapsible FAQ Drawers */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="rounded-2xl border border-[#1F2333] bg-[#12141D] p-8 text-center text-sm text-[#94A3B8]">
                No matching questions found. Try clearing your search filter.
              </div>
            ) : (
              filteredFaqs.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`overflow-hidden rounded-2xl border transition-colors ${
                      isOpen
                        ? 'border-amber-500/40 bg-[#12141D]'
                        : 'border-[#1F2333] bg-[#12141D]/75'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? -1 : item.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm sm:text-base font-bold text-[#F8FAFC] cursor-pointer"
                    >
                      <span>{item.q}</span>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#1F2333] bg-[#090A0F] text-amber-400 transition-transform duration-300 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-[#94A3B8]">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER
         ===================================================================== */}
      <footer className="border-t border-[#1F2333] bg-[#090A0F] pt-14 pb-24 sm:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <CraftStackLogo />
          <p className="text-xs text-[#94A3B8] text-center sm:text-right">
            © {new Date().getFullYear()} CraftStack Academy (craftstack.dev). Frontend Architecture Mastery by Marcus Vance.
          </p>
        </div>
      </footer>

      {/* =====================================================================
          8. STICKY MOBILE BOTTOM ENROLLMENT BAR
         ===================================================================== */}
      <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden border-t border-[#1F2333] bg-[#090A0F]/95 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono text-emerald-400 font-semibold">
              Cohort #7 • {seatsRemaining} seats left
            </div>
            <div className="font-mono text-xs font-bold text-amber-400 tabular-nums">
              Ends in {countdownParts.days}d {countdownParts.hours}h:{countdownParts.mins}m:
              {countdownParts.secs}s
            </div>
          </div>

          <button
            type="button"
            onClick={() => openReservationModal('cohort')}
            className="rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-extrabold text-[#090A0F] shadow-lg active:scale-95 transition cursor-pointer"
          >
            Enroll Now — $499
          </button>
        </div>
      </div>

      {/* =====================================================================
          INTERACTIVE SEAT RESERVATION MODAL
         ===================================================================== */}
      {reserveModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setReserveModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#1F2333] bg-[#12141D] p-6 sm:p-8 text-[#F8FAFC] shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#1F2333]">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  CraftStack Academy Enrollment
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold mt-0.5">
                  {reservationConfirmed
                    ? 'Seat Locked for Cohort #7!'
                    : 'Reserve Your Enrollment Spot'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setReserveModalOpen(false)}
                aria-label="Close modal"
                className="rounded-xl p-1.5 text-[#94A3B8] hover:bg-[#1F2333] hover:text-white transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {reservationConfirmed ? (
              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-emerald-500/35 bg-emerald-500/10 p-4 flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-[#F8FAFC]">
                      Welcome aboard, {studentName}!
                    </div>
                    <p className="mt-1 text-xs text-[#94A3B8]">
                      Your seat for{' '}
                      <strong className="text-amber-400">
                        {selectedTier === 'cohort'
                          ? 'Live Cohort #7 + Code Reviews ($499)'
                          : 'Self-Paced Core ($349)'}
                      </strong>{' '}
                      is reserved. We sent your GitHub repo invite, Discord link, and L&amp;D invoice to{' '}
                      <strong className="text-[#F8FAFC]">{studentEmail}</strong>.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setReserveModalOpen(false)}
                  className="w-full rounded-xl bg-amber-500 py-3.5 text-sm font-extrabold text-[#090A0F] hover:bg-amber-400 transition cursor-pointer"
                >
                  Return to Course Page
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmReservation} className="mt-5 space-y-4">
                {/* Tier Switcher Inside Modal */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedTier('cohort')}
                    className={`rounded-xl border p-3 text-left transition cursor-pointer ${
                      selectedTier === 'cohort'
                        ? 'border-amber-500 bg-amber-500/15'
                        : 'border-[#1F2333] bg-[#090A0F]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#F8FAFC]">
                      Live Cohort #7
                    </div>
                    <div className="mt-0.5 font-mono text-sm font-extrabold text-amber-400">
                      $499 <span className="text-[10px] text-[#94A3B8] line-through">$649</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTier('self-paced')}
                    className={`rounded-xl border p-3 text-left transition cursor-pointer ${
                      selectedTier === 'self-paced'
                        ? 'border-amber-500 bg-amber-500/15'
                        : 'border-[#1F2333] bg-[#090A0F]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#F8FAFC]">
                      Self-Paced Core
                    </div>
                    <div className="mt-0.5 font-mono text-sm font-extrabold text-[#F8FAFC]">
                      $349
                    </div>
                  </button>
                </div>

                {formError && (
                  <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3.5 py-2 text-xs text-rose-300">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full rounded-xl border border-[#1F2333] bg-[#090A0F] px-3.5 py-2.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] mb-1">
                    GitHub / Work Email
                  </label>
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="alex@company.dev"
                    className="w-full rounded-xl border border-[#1F2333] bg-[#090A0F] px-3.5 py-2.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] mb-1">
                    Current Engineering Role
                  </label>
                  <select
                    value={studentRole}
                    onChange={(e) => setStudentRole(e.target.value)}
                    className="w-full rounded-xl border border-[#1F2333] bg-[#090A0F] px-3.5 py-2.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-amber-500"
                  >
                    <option>Frontend Engineer</option>
                    <option>Senior Frontend Engineer</option>
                    <option>Full-Stack / Product Engineer</option>
                    <option>Tech Lead / Engineering Manager</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-amber-500 py-3.5 text-sm font-extrabold text-[#090A0F] shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition cursor-pointer"
                >
                  Lock Seat &amp; Generate L&amp;D Invoice (
                  {selectedTier === 'cohort' ? '$499' : '$349'})
                </button>

                <p className="text-center text-[11px] text-[#94A3B8]">
                  14-day 100% money-back guarantee • Instant GitHub &amp; Discord access
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}