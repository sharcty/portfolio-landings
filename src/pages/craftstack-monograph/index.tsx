import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowUp,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Plus,
  Search,
  X,
  BookOpen,
  FileCode2,
  GitBranch,
  Terminal,
  Clock,
  ShieldCheck,
  Layers,
  Award,
  Menu
} from 'lucide-react';

/**
 * Navigation sections for the Sticky Left Table-of-Contents & Scroll-Spy Rail
 */
const TOC_CHAPTERS = [
  { id: 'the-letter', num: '01', label: 'The Letter' },
  { id: 'video-lecture', num: '02', label: 'Free Video Lecture' },
  { id: 'syllabus', num: '03', label: 'The 8-Week Syllabus' },
  { id: 'capstone-artifacts', num: '04', label: 'Capstone Artifacts' },
  { id: 'cohort-enrollment', num: '05', label: 'Cohort Enrollment' },
  { id: 'common-questions', num: '06', label: 'Common Questions' }
];

/**
 * Interactive Lecture Chapters embedded in Section 02 & linked from Section 03 Syllabus
 */
const LECTURE_CHAPTERS = [
  {
    id: 'state-machines',
    num: '01',
    pill: '01. State Machines in UI (04:12)',
    title: 'Deterministic State Machines vs. Implicit Boolean Flags',
    durationSec: 252,
    timestampLabel: '04:12',
    fileRef: 'src/machines/checkoutTransition.ts',
    caption:
      'Replacing 7 overlapping isLoading / isError / isRetrying flags with an explicit finite-state transition table.'
  },
  {
    id: 'zero-cls',
    num: '02',
    pill: '02. Zero-CLS Layout Engines (11:45)',
    title: 'Zero-CLS Layout Engines & Intrinsic Aspect Reservation',
    durationSec: 705,
    timestampLabel: '11:45',
    fileRef: 'src/layout/intrinsicGeometry.css',
    caption:
      'Enforcing strict bounding-box invariants and tabular numeral metrics so asynchronous hydration never shifts a single pixel.'
  },
  {
    id: 'local-first',
    num: '03',
    pill: '03. Local-First Sync Architecture (18:30)',
    title: 'Local-First Sync Engines, IndexedDB & CRDTs',
    durationSec: 1110,
    timestampLabel: '18:30',
    fileRef: 'src/sync/crdtMutationLog.ts',
    caption:
      'Writing optimistic mutations to an indexed local journal in < 2ms while background workers reconcile vector clocks with the edge.'
  }
];

/**
 * Chronological 8-Week Syllabus Data
 */
const SYLLABUS_WEEKS = [
  {
    week: '01',
    title: 'Finite State Machines & Deterministic UI Transitions',
    duration: '2h 40m • 5 Lectures',
    hasFreePreview: true,
    previewChapterId: 'state-machines',
    previewLessonTitle: 'State Machines in UI: Eliminating Impossible States',
    deliverables: [
      'Refactor a multi-step checkout & payment race condition into a pure transition reducer',
      'Implement AbortController request cancellation & exponential jitter backoff',
      'Model hierarchical states without external 40kB runtime dependencies'
    ]
  },
  {
    week: '02',
    title: 'Production TypeScript: Discriminated Unions & AST Contracts',
    duration: '2h 15m • 4 Lectures',
    hasFreePreview: false,
    deliverables: [
      'Encode domain invariants directly into TypeScript discriminated unions and branded primitives',
      'Build end-to-end type-safe API boundaries with zero runtime schema drift',
      'Eliminate unsafe type assertions across polymorphic component libraries'
    ]
  },
  {
    week: '03',
    title: 'Zero-CLS Layout Engines & Multi-Brand Token Compilers',
    duration: '2h 50m • 5 Lectures',
    hasFreePreview: true,
    previewChapterId: 'zero-cls',
    previewLessonTitle: 'Zero-CLS Layout Engines & Intrinsic Aspect Reservation',
    deliverables: [
      'Author an AST token compiler transforming W3C design tokens into scoped CSS variables',
      'Enforce 0.000 Cumulative Layout Shift across dynamic fonts, media, and async tables',
      'Build WCAG AAA keyboard-roaming primitives with zero focus-trap leaks'
    ]
  },
  {
    week: '04',
    title: 'Browser Frame Budgets, React Fiber Scheduling & Sub-50ms INP',
    duration: '2h 30m • 4 Lectures',
    hasFreePreview: false,
    deliverables: [
      'Profile main-thread long tasks and isolate high-frequency state updates from heavy subtrees',
      'Use concurrent transitions, deferred values, and structural memoization intentionally',
      'Automate Lighthouse & Core Web Vitals CI regression gates on every pull request'
    ]
  },
  {
    week: '05',
    title: 'Local-First Sync Engines, IndexedDB & CRDT Conflict Resolution',
    duration: '3h 05m • 5 Lectures',
    hasFreePreview: true,
    previewChapterId: 'local-first',
    previewLessonTitle: 'Local-First Sync Architecture & Optimistic Journals',
    deliverables: [
      'Design an offline-resilient outbox mutation queue backed by IndexedDB',
      'Implement Hybrid Logical Clocks (HLC) and Last-Write-Wins element sets for multiplayer state',
      'Offload heavy local SQLite-WASM queries to dedicated Web Workers'
    ]
  },
  {
    week: '06',
    title: 'Windowed Virtualization & High-Frequency WebSocket Streams',
    duration: '2h 20m • 4 Lectures',
    hasFreePreview: false,
    deliverables: [
      'Render 250,000+ variable-height rows at a locked 60fps using spatial prefix-sum trees',
      'Batch 100Hz WebSocket market ticks inside requestAnimationFrame ring buffers',
      'Prevent DOM node recycling glitches and preserve native browser find-in-page accessibility'
    ]
  },
  {
    week: '07',
    title: 'Frontend Observability, Self-Healing Boundaries & Telemetry',
    duration: '1h 55m • 4 Lectures',
    hasFreePreview: false,
    deliverables: [
      'Architect granular error recovery boundaries that isolate third-party widget failures',
      'Instrument custom PerformanceObserver marks for real-user interaction telemetry',
      'Design deterministic session replay breadcrumbs without leaking PII'
    ]
  },
  {
    week: '08',
    title: 'Staff-Level Technical RFCs & Architecture Review Defense',
    duration: '2h 10m • 4 Lectures',
    hasFreePreview: false,
    deliverables: [
      'Write persuasive 6-page frontend architecture RFCs covering trade-offs, migration paths, and SLOs',
      'Lead cross-team design system migrations without halting product velocity',
      'Live capstone architecture defense & line-by-line GitHub PR review with Marcus Vance'
    ]
  }
];

/**
 * Capstone Engineering Artifacts Data
 */
const CAPSTONE_ARTIFACTS = [
  {
    code: 'ARTIFACT // 01',
    title: 'Local-First Multiplayer Canvas Engine',
    stack: 'TypeScript • CRDTs • IndexedDB • Canvas 2D • WebWorkers',
    benchmark: '60 FPS @ 12,000 Spatial Nodes • < 1.8ms Local Commit',
    summary:
      'A collaborative diagramming workspace supporting instant offline edits, deterministic multi-step undo/redo stacks, spatial R-tree viewport culling, and conflict-free reconnection sync.',
    architectureNotes: [
      'Uses an append-only operation log persisted in IndexedDB with periodic snapshot compaction.',
      'Separates pointer gesture state machines from the CRDT document store to guarantee 16.6ms frame budgets.',
      'Includes a deterministic simulation harness that fuzz-tests network partitions and out-of-order packet delivery.'
    ]
  },
  {
    code: 'ARTIFACT // 02',
    title: 'Sub-16ms Streaming Orderbook & Data Grid',
    stack: 'React 19 • Binary WebSockets • Fenwick Tree • OffscreenCanvas',
    benchmark: '3.9ms p99 Frame Time • 250,000 Virtualized Rows',
    summary:
      'An institutional financial telemetry grid capable of ingesting 120 binary WebSocket updates per second while maintaining rock-solid scroll inertia and zero layout recalculation.',
    architectureNotes: [
      'Decodes binary frames inside a Web Worker and writes typed deltas into a SharedArrayBuffer ring.',
      'Computes cumulative row offsets in O(log n) time using a Fenwick (Binary Indexed) tree.',
      'Enforces tabular-nums font metrics and fixed row bounding boxes for 0.000 CLS.'
    ]
  },
  {
    code: 'ARTIFACT // 03',
    title: 'Multi-Brand Design Token AST Compiler & Primitives',
    stack: 'Node AST • W3C Design Tokens • ARIA • Playwright Visual Diff',
    benchmark: '0.000 CLS • 100/100 Accessibility Audit',
    summary:
      'A zero-runtime design system toolchain that compiles Figma W3C token graphs into type-safe CSS custom properties, paired with headless accessible dialog, combobox, and menu primitives.',
    architectureNotes: [
      'Validates WCAG contrast ratios at build time and rejects non-compliant theme overrides in CI.',
      'Ships tree-shakeable headless state machines with zero external UI framework lock-in.',
      'Includes automated Playwright screenshot diffing across 4 viewport breakpoints.'
    ]
  }
];

/**
 * Categorized FAQ Drawer Data
 */
const FAQ_ENTRIES = [
  {
    id: 'prereq',
    category: 'Curriculum & Prerequisites',
    q: 'What experience level is expected before enrolling in Cohort 07?',
    a: 'This monograph and workshop are written for intermediate-to-senior frontend engineers who already ship production React and TypeScript applications. You do not need prior experience with formal state machines or CRDTs—we derive every pattern from first principles—but you should be comfortable with hooks, async JavaScript, and basic TypeScript generics.'
  },
  {
    id: 'schedule',
    category: 'Live Cohort & Schedule',
    q: 'When do the live Cohort 07 workshops meet, and what if I am in a different time zone?',
    a: 'Live architecture sessions run every Wednesday for 8 weeks starting December 9 at 1:00 PM EST (6:00 PM London / 7:00 PM Berlin). Every session is recorded in 4K with searchable transcripts and uploaded within two hours. Students across APAC and Europe submit their capstone PRs asynchronously and receive full recorded video + line-by-line GitHub reviews.'
  },
  {
    id: 'expense',
    category: 'Teams & L&D Reimbursement',
    q: 'Can I expense this course through my company Learning & Development budget?',
    a: 'Yes—roughly 68% of CraftStack students expense their tuition through an employer L&D or engineering stipend. Upon reserving your seat, you immediately receive an itemized PDF tax invoice and a pre-written engineering manager justification memo outlining the architectural ROI for your team.'
  },
  {
    id: 'lifetime',
    category: 'Curriculum & Prerequisites',
    q: 'Do I keep lifetime access to the video lectures, starter repositories, and future editions?',
    a: 'Yes. Both the Self-Paced Monograph and Live Cohort 07 include permanent lifetime access to all 35+ HD lectures, the 3 capstone repositories, future React/TypeScript edition updates, and our private alumni engineering forum.'
  },
  {
    id: 'refund',
    category: 'Teams & L&D Reimbursement',
    q: 'What is your refund policy if the material is not the right fit?',
    a: 'You are protected by a straightforward 14-day, 100% refund guarantee starting on the first day of Cohort 07 (or the day of purchase for the Self-Paced Monograph). Work through Weeks 1 and 2, clone the repositories, and if you do not feel it elevates how you architect frontend systems, reply to your receipt email for a full refund.'
  }
];

function formatTimeMMSS(totalSec) {
  const m = Math.floor(totalSec / 60);
  const s = Math.floor(totalSec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Interactive SVG Architecture Diagram rendered inside the 16:9 Video Lecture Theater
 */
function LectureDiagramStage({ chapter, isPlaying, progressPct }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-[#141413] text-[#FAF8F5] select-none overflow-hidden">
      {/* Subtle Paper-Blueprint Drafting Lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(to right, #E5E0D8 1px, transparent 1px), linear-gradient(to bottom, #E5E0D8 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Top Lecture Telemetry Strip */}
      <div className="relative z-10 flex items-center justify-between gap-2 font-mono text-[11px]">
        <span className="inline-flex items-center gap-2 border border-[#E5E0D8]/25 bg-[#1E1D1B] px-2.5 py-1 text-[#FAF8F5]">
          <span
            className={`h-2 w-2 rounded-full bg-[#C2410C] ${
              isPlaying ? 'animate-ping' : ''
            }`}
          />
          LECTURE CHAPTER {chapter.num}
        </span>
        <span className="text-[#A8A29E] truncate">{chapter.fileRef}</span>
      </div>

      {/* Center Animated SVG State Machine / Pipeline Diagram */}
      <div className="relative z-10 my-auto flex items-center justify-center py-2">
        {chapter.id === 'state-machines' && (
          <svg viewBox="0 0 540 190" className="w-full max-w-[490px] h-auto overflow-visible">
            <path
              d="M 135 95 L 215 95 M 325 95 L 405 95"
              stroke="#C2410C"
              strokeWidth="2"
              strokeDasharray="5 5"
              className={isPlaying ? 'animate-editorial-dash' : ''}
            />
            <path
              d="M 270 60 C 270 18, 460 18, 460 60"
              fill="none"
              stroke="#166534"
              strokeWidth="1.6"
              strokeDasharray="4 4"
            />
            {/* IDLE */}
            <rect x="20" y="62" width="115" height="66" fill="#1C1B19" stroke="#E5E0D8" strokeWidth="1.2" />
            <text x="77.5" y="90" textAnchor="middle" fill="#FAF8F5" fontSize="11" fontFamily="monospace" fontWeight="700">
              STATE: IDLE
            </text>
            <text x="77.5" y="109" textAnchor="middle" fill="#A8A29E" fontSize="9" fontFamily="monospace">
              clean invariant
            </text>

            {/* PENDING */}
            <rect x="215" y="62" width="110" height="66" fill="#1C1B19" stroke="#C2410C" strokeWidth="2" />
            <text x="270" y="90" textAnchor="middle" fill="#FB923C" fontSize="11" fontFamily="monospace" fontWeight="700">
              PENDING
            </text>
            <text x="270" y="109" textAnchor="middle" fill="#E5E0D8" fontSize="9" fontFamily="monospace">
              AbortSignal active
            </text>

            {/* RESOLVED */}
            <rect x="405" y="62" width="115" height="66" fill="#1C1B19" stroke="#22C55E" strokeWidth="1.6" />
            <text x="462.5" y="90" textAnchor="middle" fill="#86EFAC" fontSize="11" fontFamily="monospace" fontWeight="700">
              COMMITTED
            </text>
            <text x="462.5" y="109" textAnchor="middle" fill="#A8A29E" fontSize="9" fontFamily="monospace">
              0 race conditions
            </text>
          </svg>
        )}

        {chapter.id === 'zero-cls' && (
          <svg viewBox="0 0 540 190" className="w-full max-w-[490px] h-auto overflow-visible">
            <rect x="28" y="26" width="220" height="138" fill="#1C1B19" stroke="#E5E0D8" strokeWidth="1.2" />
            <text x="44" y="50" fill="#FB923C" fontSize="10" fontFamily="monospace" fontWeight="700">
              INTRINSIC GEOMETRY LOCK
            </text>
            <text x="44" y="76" fill="#FAF8F5" fontSize="9.5" fontFamily="monospace">
              aspect-ratio: 16 / 9;
            </text>
            <text x="44" y="98" fill="#FAF8F5" fontSize="9.5" fontFamily="monospace">
              font-variant-numeric: tabular;
            </text>
            <text x="44" y="120" fill="#86EFAC" fontSize="9.5" fontFamily="monospace">
              contain: layout paint;
            </text>
            <text x="44" y="144" fill="#A8A29E" fontSize="8.5" fontFamily="monospace">
              // 0px post-hydration reflow
            </text>

            <path
              d="M 248 95 L 308 95"
              stroke="#C2410C"
              strokeWidth="2"
              strokeDasharray="4 4"
              className={isPlaying ? 'animate-editorial-dash' : ''}
            />

            <rect x="308" y="26" width="204" height="138" fill="#1C1B19" stroke="#22C55E" strokeWidth="1.6" />
            <text x="410" y="88" textAnchor="middle" fill="#86EFAC" fontSize="26" fontFamily="monospace" fontWeight="700">
              0.000
            </text>
            <text x="410" y="114" textAnchor="middle" fill="#FAF8F5" fontSize="10" fontFamily="monospace">
              CUMULATIVE LAYOUT SHIFT
            </text>
            <text x="410" y="136" textAnchor="middle" fill="#A8A29E" fontSize="9" fontFamily="monospace">
              p99 Core Web Vitals
            </text>
          </svg>
        )}

        {chapter.id === 'local-first' && (
          <svg viewBox="0 0 540 190" className="w-full max-w-[490px] h-auto overflow-visible">
            <path
              d="M 145 95 L 220 95 M 330 95 L 405 95"
              stroke="#C2410C"
              strokeWidth="2"
              strokeDasharray="5 5"
              className={isPlaying ? 'animate-editorial-dash' : ''}
            />
            <rect x="20" y="60" width="125" height="70" fill="#1C1B19" stroke="#E5E0D8" strokeWidth="1.2" />
            <text x="82.5" y="90" textAnchor="middle" fill="#FAF8F5" fontSize="10.5" fontFamily="monospace" fontWeight="700">
              OPTIMISTIC UI
            </text>
            <text x="82.5" y="110" textAnchor="middle" fill="#86EFAC" fontSize="9" fontFamily="monospace">
              1.4ms Frame Commit
            </text>

            <rect x="220" y="60" width="110" height="70" fill="#1C1B19" stroke="#C2410C" strokeWidth="1.8" />
            <text x="275" y="90" textAnchor="middle" fill="#FB923C" fontSize="10.5" fontFamily="monospace" fontWeight="700">
              INDEXEDDB
            </text>
            <text x="275" y="110" textAnchor="middle" fill="#E5E0D8" fontSize="9" fontFamily="monospace">
              CRDT Op Journal
            </text>

            <rect x="405" y="60" width="115" height="70" fill="#1C1B19" stroke="#22C55E" strokeWidth="1.6" />
            <text x="462.5" y="90" textAnchor="middle" fill="#86EFAC" fontSize="10.5" fontFamily="monospace" fontWeight="700">
              EDGE SYNC
            </text>
            <text x="462.5" y="110" textAnchor="middle" fill="#A8A29E" fontSize="9" fontFamily="monospace">
              Vector Clock Merge
            </text>
          </svg>
        )}
      </div>

      {/* Bottom Lecture Subtitle Strip */}
      <div className="relative z-10 flex items-center justify-between gap-3 border-t border-[#E5E0D8]/20 pt-2.5 text-xs">
        <p className="truncate text-[#E5E0D8]">
          <span className="font-mono text-[#FB923C] mr-2">TRANSCRIPT:</span>
          {chapter.caption}
        </p>
        <span className="font-mono text-[11px] text-[#86EFAC] shrink-0">
          {Math.round(progressPct)}%
        </span>
      </div>
    </div>
  );
}

export default function App() {
  // =========================================================================
  // 1. LIVE COHORT 07 COUNTDOWN TIMER (02d : 14h : 38m : 19s)
  // =========================================================================
  const [secondsRemaining, setSecondsRemaining] = useState(
    2 * 86400 + 14 * 3600 + 38 * 60 + 19
  );
  const [seatsLeft, setSeatsLeft] = useState(11);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdown = useMemo(() => {
    const d = Math.floor(secondsRemaining / 86400);
    const h = Math.floor((secondsRemaining % 86400) / 3600);
    const m = Math.floor((secondsRemaining % 3600) / 60);
    const s = secondsRemaining % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return { d: pad(d), h: pad(h), m: pad(m), s: pad(s) };
  }, [secondsRemaining]);

  // =========================================================================
  // 2. STICKY TABLE-OF-CONTENTS SCROLL-SPY & READING PROGRESS INDICATOR
  // =========================================================================
  const [activeTocId, setActiveTocId] = useState('the-letter');
  const [readingProgressPct, setReadingProgressPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setReadingProgressPct(pct);

      // Determine active chapter based on viewport offset
      const triggerY = 180;
      let currentId = TOC_CHAPTERS[0].id;
      for (const chap of TOC_CHAPTERS) {
        const el = document.getElementById(chap.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY) {
            currentId = chap.id;
          }
        }
      }
      setActiveTocId(currentId);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // =========================================================================
  // 3. INTERACTIVE 16:9 VIDEO LECTURE THEATER STATE
  // =========================================================================
  const [activeLectureId, setActiveLectureId] = useState('state-machines');
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(46);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const activeLecture =
    LECTURE_CHAPTERS.find((c) => c.id === activeLectureId) || LECTURE_CHAPTERS[0];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setElapsedSec((prev) => {
        const next = prev + 0.5 * playbackSpeed;
        if (next >= activeLecture.durationSec) {
          setIsPlaying(false);
          return 0;
        }
        return next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, activeLecture.durationSec]);

  const handleSelectLectureChapter = (chapterId, autoStart = true) => {
    setActiveLectureId(chapterId);
    setElapsedSec(0);
    setIsPlaying(autoStart);
  };

  const handleCycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    setPlaybackSpeed(next);
  };

  const lectureProgressPct = Math.min(
    100,
    (elapsedSec / (activeLecture.durationSec || 1)) * 100
  );

  // =========================================================================
  // 4. CHRONOLOGICAL 8-WEEK SYLLABUS ACCORDION STATE
  // =========================================================================
  const [syllabusFilter, setSyllabusFilter] = useState('all'); // 'all' | 'free'
  const [openWeeks, setOpenWeeks] = useState(['01', '03']);

  const displayedWeeks = useMemo(() => {
    if (syllabusFilter === 'free') {
      return SYLLABUS_WEEKS.filter((w) => w.hasFreePreview);
    }
    return SYLLABUS_WEEKS;
  }, [syllabusFilter]);

  const toggleWeek = (weekCode) => {
    setOpenWeeks((prev) =>
      prev.includes(weekCode)
        ? prev.filter((w) => w !== weekCode)
        : [...prev, weekCode]
    );
  };

  const areAllWeeksExpanded =
    displayedWeeks.length > 0 &&
    displayedWeeks.every((w) => openWeeks.includes(w.week));

  const handleToggleExpandAllWeeks = () => {
    if (areAllWeeksExpanded) {
      setOpenWeeks([]);
    } else {
      setOpenWeeks(displayedWeeks.map((w) => w.week));
    }
  };

  const handlePlayPreviewFromSyllabus = (chapterId) => {
    handleSelectLectureChapter(chapterId || 'state-machines', true);
    scrollToSection('video-lecture');
  };

  // =========================================================================
  // 5. CAPSTONE ARTIFACTS ARCHITECTURE INSPECTION STATE
  // =========================================================================
  const [inspectedArtifactIdx, setInspectedArtifactIdx] = useState(0);

  // =========================================================================
  // 6. SEAT RESERVATION MODAL STATE
  // =========================================================================
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('cohort'); // 'monograph' | 'cohort'
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantGithub, setApplicantGithub] = useState('');
  const [modalError, setModalError] = useState('');
  const [receiptData, setReceiptData] = useState(null);

  const openEnrollmentModal = (plan = 'cohort') => {
    setSelectedPlan(plan);
    setModalError('');
    setReceiptData(null);
    setModalOpen(true);
  };

  const handleConfirmEnrollment = (e) => {
    e.preventDefault();
    if (applicantName.trim().length < 2) {
      setModalError('Please enter your full name for your cohort roster and invoice.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicantEmail.trim())) {
      setModalError('Please enter a valid email address.');
      return;
    }
    const cleanHandle = applicantGithub.trim().replace(/^@/, '');
    if (cleanHandle.length < 2) {
      setModalError('Please enter your GitHub username so we can provision repository access.');
      return;
    }

    setModalError('');
    if (selectedPlan === 'cohort') {
      setSeatsLeft((prev) => Math.max(1, prev - 1));
    }
    setReceiptData({
      receiptId: `CS-07-${Math.floor(1000 + Math.random() * 9000)}`,
      name: applicantName.trim(),
      email: applicantEmail.trim(),
      github: `@${cleanHandle}`,
      track:
        selectedPlan === 'cohort'
          ? 'Live Cohort 07 + PR Code Reviews ($499)'
          : 'Self-Paced Monograph Edition ($349)',
      amount: selectedPlan === 'cohort' ? '$499.00 USD' : '$349.00 USD',
      issuedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    });
  };

  // =========================================================================
  // 7. SEARCHABLE CATEGORIZED FAQ DRAWERS STATE
  // =========================================================================
  const [faqQuery, setFaqQuery] = useState('');
  const [faqCategory, setFaqCategory] = useState('All');
  const [openFaqId, setOpenFaqId] = useState('prereq');

  const filteredFaqs = useMemo(() => {
    return FAQ_ENTRIES.filter((item) => {
      const catMatch = faqCategory === 'All' || item.category === faqCategory;
      const q = faqQuery.trim().toLowerCase();
      const textMatch =
        !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [faqCategory, faqQuery]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141413] selection:bg-[#C2410C] selection:text-[#FAF8F5]">
      {/* Editorial Typography & Subtle Keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .font-monograph-serif {
          font-family: 'Newsreader', Georgia, 'Times New Roman', serif;
        }
        .font-monograph-sans {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .font-monograph-mono {
          font-family: 'IBM Plex Mono', monospace;
        }
        @keyframes editorialDash {
          to { stroke-dashoffset: -20; }
        }
        .animate-editorial-dash {
          animation: editorialDash 1.3s linear infinite;
        }
      `}</style>

      {/* =====================================================================
          TOP SLIM COHORT URGENCY STRIP
         ===================================================================== */}
      <div className="border-b border-[#E5E0D8] bg-[#F3EFE8] px-4 py-2 font-monograph-mono text-[11px] tabular-nums">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold tracking-wider uppercase text-[#141413]">
              CRAFTSTACK PRESS // COHORT 07
            </span>
            <span className="hidden sm:inline text-[#A8A29E]">•</span>
            <span className="inline-flex items-center gap-1.5 border border-[#166534]/30 bg-[#166534]/10 px-2 py-0.5 text-[10px] font-semibold text-[#166534]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#166534]" />
              {seatsLeft} of 45 Seats Remaining
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#141413]">
            <span className="text-[#57534E]">Cohort 07 Enrollment Closes In:</span>
            <span className="font-semibold text-[#C2410C]">
              {countdown.d}d : {countdown.h}h : {countdown.m}m : {countdown.s}s
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MOBILE COLLAPSIBLE TOP PROGRESS & CHAPTER BAR
         ===================================================================== */}
      <div className="sticky top-0 z-30 lg:hidden border-b border-[#E5E0D8] bg-[#FAF8F5]/95 backdrop-blur-sm">
        {/* Reading Progress Hairline */}
        <div className="h-[2px] w-full bg-[#E5E0D8]">
          <div
            style={{ width: `${readingProgressPct}%` }}
            className="h-full bg-[#C2410C] transition-all duration-150"
          />
        </div>
        <div className="flex items-center justify-between px-4 py-2.5">
          <span className="font-monograph-mono text-[11px] font-semibold uppercase tracking-wider text-[#141413]">
            Frontend Systems Architecture
          </span>
          <button
            type="button"
            onClick={() => openEnrollmentModal('cohort')}
            className="border border-[#141413] bg-[#141413] px-3 py-1 font-monograph-mono text-[10px] uppercase tracking-widest text-[#FAF8F5] cursor-pointer"
          >
            Reserve Seat
          </button>
        </div>
      </div>

      {/* =====================================================================
          TWO-COLUMN DESKTOP EDITORIAL LAYOUT (MAX-W-6XL)
          LEFT: 240PX STICKY TOC RAIL | RIGHT: FOCUSED ~720PX MONOGRAPH STREAM
         ===================================================================== */}
      <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-10 sm:pt-16 pb-28">
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 xl:gap-16">
          {/* =================================================================
              LEFT STICKY TABLE-OF-CONTENTS & PROGRESS RAIL (240PX DESKTOP)
             ================================================================= */}
          <aside className="hidden lg:block w-[240px] shrink-0 sticky top-10 space-y-7">
            {/* Publication Colophon */}
            <div className="border-b border-[#E5E0D8] pb-4">
              <div className="font-monograph-mono text-[10px] uppercase tracking-[0.2em] text-[#C2410C] font-semibold">
                CRAFTSTACK MONOGRAPHS
              </div>
              <div className="font-monograph-serif text-lg font-medium text-[#141413] mt-1 leading-snug">
                Frontend Systems Architecture
              </div>
              <div className="font-monograph-mono text-[11px] text-[#57534E] mt-1">
                Edition 07 • Winter Cohort
              </div>
            </div>

            {/* Reading Progress Meter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-monograph-mono text-[10px] uppercase tracking-wider text-[#57534E]">
                <span>Reading Progress</span>
                <span className="tabular-nums text-[#141413] font-semibold">
                  {Math.round(readingProgressPct)}%
                </span>
              </div>
              <div className="h-[2px] w-full bg-[#E5E0D8]">
                <div
                  style={{ width: `${readingProgressPct}%` }}
                  className="h-full bg-[#C2410C] transition-all duration-150"
                />
              </div>
            </div>

            {/* Clickable Chapter Index with Active Scroll-Spy */}
            <nav aria-label="Monograph Table of Contents" className="space-y-1">
              {TOC_CHAPTERS.map((chap) => {
                const isActive = activeTocId === chap.id;
                return (
                  <button
                    key={chap.id}
                    type="button"
                    onClick={() => scrollToSection(chap.id)}
                    className={`flex w-full items-baseline gap-2.5 py-2 text-left transition-colors cursor-pointer border-l-2 pl-3 ${
                      isActive
                        ? 'border-[#C2410C] text-[#141413] font-semibold'
                        : 'border-transparent text-[#57534E] hover:text-[#141413]'
                    }`}
                  >
                    <span
                      className={`font-monograph-mono text-[11px] ${
                        isActive ? 'text-[#C2410C]' : 'text-[#8C857B]'
                      }`}
                    >
                      {chap.num}.
                    </span>
                    <span className="font-monograph-sans text-xs tracking-tight">
                      {chap.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Minimal Rail Enrollment Trigger */}
            <div className="border-t border-[#E5E0D8] pt-5 space-y-2.5">
              <div className="font-monograph-mono text-[10px] uppercase tracking-wider text-[#166534] font-semibold">
                ● {seatsLeft} Seats Left • Dec 9
              </div>
              <button
                type="button"
                onClick={() => openEnrollmentModal('cohort')}
                className="flex w-full items-center justify-between border border-[#141413] bg-[#141413] px-3.5 py-2.5 font-monograph-mono text-[11px] uppercase tracking-wider text-[#FAF8F5] hover:bg-[#C2410C] hover:border-[#C2410C] transition-colors cursor-pointer"
              >
                <span>Reserve Seat</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </aside>

          {/* =================================================================
              RIGHT COLUMN: FOCUSED ~720PX LONG-FORM EDITORIAL STREAM
             ================================================================= */}
          <main className="flex-1 min-w-0 max-w-[740px] font-monograph-sans space-y-24">
            {/* ===============================================================
                SECTION 01 — THE OPEN LETTER
               =============================================================== */}
            <article id="the-letter" className="scroll-mt-14 space-y-7">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E0D8] pb-3 font-monograph-mono text-[11px] uppercase tracking-[0.2em] text-[#C2410C] font-semibold">
                <span>MONOGRAPH // ISSUE 07</span>
                <span className="text-[#57534E]">EST. READING TIME: 7 MIN</span>
              </div>

              <h1 className="font-monograph-serif font-normal tracking-[-0.02em] text-[#141413] text-4xl sm:text-5xl lg:text-[54px] leading-[1.08]">
                Why Senior Frontend Engineers Stop Reaching for Another State Library.
              </h1>

              {/* Author Byline */}
              <div className="flex items-center gap-3.5 border-y border-[#E5E0D8] py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#141413] bg-[#F3EFE8] font-monograph-serif italic text-lg font-semibold text-[#141413]">
                  MV
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#141413]">
                    Marcus Vance — Principal UI Architect
                  </div>
                  <div className="font-monograph-mono text-[11px] text-[#57534E]">
                    Former Staff Frontend Infrastructure @ Stripe &amp; Vercel • Author of CraftStack
                  </div>
                </div>
              </div>

              {/* Persuasive Long-Form Sales Letter Prose */}
              <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.78] text-[#292524]">
                <p>
                  Every two years, the frontend ecosystem promises that a lighter store, a faster signal primitive, or a cleverer data-fetching hook will finally untangle our applications. Yet six months after every migration, the same bugs reappear in production: double-submitted checkout forms, stale drawer state after route transitions, and layout shifts that jolt the user’s eye mid-click.
                </p>

                <p>
                  The root cause is rarely the library. It is the absence of architectural invariants. When application behavior is scattered across dozens of implicit <code className="font-monograph-mono text-[14px] bg-[#F3EFE8] border border-[#E5E0D8] px-1.5 py-0.5 text-[#141413]">useEffect</code> chains and boolean flags, complexity grows quadratically with every new feature flag.
                </p>

                {/* Classic Left-Bordered Editorial Pull Quote */}
                <blockquote className="my-8 border-l-2 border-[#C2410C] pl-6 py-1">
                  <p className="font-monograph-serif italic text-2xl sm:text-[27px] leading-[1.35] text-[#141413]">
                    “Senior engineers do not eliminate complexity by installing fewer dependencies. They eliminate complexity by making illegal UI states unrepresentable.”
                  </p>
                  <footer className="mt-2.5 font-monograph-mono text-[11px] uppercase tracking-widest text-[#57534E]">
                    — Chapter I, Deterministic Interface Design
                  </footer>
                </blockquote>

                <p>
                  Over the past decade building high-throughput financial checkout flows and real-time collaborative editors, I noticed a sharp divide between mid-level developers who memorize framework APIs and Staff-level architects who design resilient client systems.
                </p>

                <p>
                  <strong>Frontend Systems Architecture</strong> is the complete, eight-week engineering monograph I wish existed when I stepped into my first Principal UI role—distilling formal state machines, intrinsic zero-CLS layout geometry, and local-first sync engines into clean, zero-fluff TypeScript.
                </p>
              </div>

              {/* Clean HTML/CSS Architectural Comparison Table */}
              <div className="pt-4">
                <div className="mb-2.5 flex items-center justify-between font-monograph-mono text-[11px] uppercase tracking-wider text-[#57534E]">
                  <span>FIG 1.1 // ARCHITECTURAL PARADIGM SHIFT</span>
                  <span>PRODUCTION TELEMETRY</span>
                </div>
                <div className="overflow-x-auto border border-[#141413]">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#141413] bg-[#F3EFE8] font-monograph-mono text-[11px] uppercase tracking-wider">
                        <th className="border-r border-[#E5E0D8] px-4 py-3 text-[#57534E]">
                          Dimension
                        </th>
                        <th className="border-r border-[#E5E0D8] px-4 py-3 text-[#57534E]">
                          Spaghetti Component State
                        </th>
                        <th className="px-4 py-3 text-[#141413] font-semibold">
                          Deterministic State Machines
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E0D8] bg-[#FAF8F5]">
                      <tr>
                        <td className="border-r border-[#E5E0D8] px-4 py-3.5 font-monograph-mono text-xs font-semibold text-[#141413]">
                          Async Lifecycle
                        </td>
                        <td className="border-r border-[#E5E0D8] px-4 py-3.5 text-[#57534E]">
                          5+ booleans (<code className="font-monograph-mono text-xs">isLoading && !isError</code>) allowing impossible states
                        </td>
                        <td className="px-4 py-3.5 text-[#141413] font-medium">
                          Explicit discriminated union states with guarded transitions
                        </td>
                      </tr>
                      <tr>
                        <td className="border-r border-[#E5E0D8] px-4 py-3.5 font-monograph-mono text-xs font-semibold text-[#141413]">
                          Network Race
                        </td>
                        <td className="border-r border-[#E5E0D8] px-4 py-3.5 text-[#57534E]">
                          Out-of-order responses overwrite fresher user selections
                        </td>
                        <td className="px-4 py-3.5 text-[#141413] font-medium">
                          Deterministic <code className="font-monograph-mono text-xs">AbortSignal</code> &amp; monotonic sequence tokens
                        </td>
                      </tr>
                      <tr>
                        <td className="border-r border-[#E5E0D8] px-4 py-3.5 font-monograph-mono text-xs font-semibold text-[#141413]">
                          Layout Stability
                        </td>
                        <td className="border-r border-[#E5E0D8] px-4 py-3.5 text-[#57534E]">
                          Content jumps as fonts, skeletons, and drawers hydrate
                        </td>
                        <td className="px-4 py-3.5 text-[#166534] font-semibold">
                          0.000 CLS via intrinsic bounding-box reservation
                        </td>
                      </tr>
                      <tr>
                        <td className="border-r border-[#E5E0D8] px-4 py-3.5 font-monograph-mono text-xs font-semibold text-[#141413]">
                          Offline &amp; Sync
                        </td>
                        <td className="border-r border-[#E5E0D8] px-4 py-3.5 text-[#57534E]">
                          Spinner-blocked UI on flaky mobile connections
                        </td>
                        <td className="px-4 py-3.5 text-[#141413] font-medium">
                          &lt; 2ms IndexedDB optimistic commit + CRDT reconciliation
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>

            {/* ===============================================================
                SECTION 02 — WIDE BREAKOUT EMBEDDED VIDEO LECTURE PLAYER
               =============================================================== */}
            <section
              id="video-lecture"
              className="scroll-mt-14 border-t border-[#E5E0D8] pt-16 space-y-6"
            >
              <div className="space-y-2">
                <div className="font-monograph-mono text-[11px] uppercase tracking-[0.2em] text-[#C2410C] font-semibold">
                  02 // OPEN LECTURE THEATER (FREE EXCERPT)
                </div>
                <h2 className="font-monograph-serif text-3xl sm:text-4xl font-normal text-[#141413]">
                  Watch How We Architect Deterministic Client Systems
                </h2>
                <p className="text-sm sm:text-base text-[#57534E]">
                  Select any of the three unedited lecture chapters below to inspect the code patterns and architectural diagrams taught inside the cohort.
                </p>
              </div>

              {/* 16:9 Editorial Video Frame */}
              <div className="border border-[#141413] bg-[#141413] shadow-[0_20px_50px_rgba(20,20,19,0.12)]">
                <div className="relative aspect-video w-full">
                  <LectureDiagramStage
                    chapter={activeLecture}
                    isPlaying={isPlaying}
                    progressPct={lectureProgressPct}
                  />

                  {!isPlaying && (
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      aria-label="Play lecture excerpt"
                      className="absolute inset-0 z-20 flex items-center justify-center bg-[#141413]/40 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 border border-[#FAF8F5] bg-[#FAF8F5] px-5 py-3 text-[#141413] transition-transform group-hover:scale-105">
                        <Play className="h-4 w-4 fill-[#C2410C] text-[#C2410C]" />
                        <span className="font-monograph-mono text-xs font-semibold uppercase tracking-widest">
                          Play Lecture ({activeLecture.timestampLabel})
                        </span>
                      </div>
                    </button>
                  )}
                </div>

                {/* Lecture Transport Controls & Interactive Scrubber */}
                <div className="border-t border-[#E5E0D8]/20 bg-[#1C1B19] px-4 py-3 space-y-2.5 text-[#FAF8F5]">
                  <div
                    role="slider"
                    aria-label="Lecture timeline scrubber"
                    aria-valuemin={0}
                    aria-valuemax={activeLecture.durationSec}
                    aria-valuenow={Math.round(elapsedSec)}
                    tabIndex={0}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const ratio = Math.max(
                        0,
                        Math.min(1, (e.clientX - rect.left) / rect.width)
                      );
                      setElapsedSec(ratio * activeLecture.durationSec);
                    }}
                    className="relative h-1.5 w-full cursor-pointer bg-[#3A3732]"
                  >
                    <div
                      style={{ width: `${lectureProgressPct}%` }}
                      className="h-full bg-[#C2410C] transition-all duration-150"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 font-monograph-mono text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsPlaying((p) => !p)}
                        className="border border-[#E5E0D8]/30 px-2.5 py-1 hover:border-[#FAF8F5] transition-colors cursor-pointer"
                      >
                        {isPlaying ? (
                          <Pause className="h-3.5 w-3.5" />
                        ) : (
                          <Play className="h-3.5 w-3.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsMuted((m) => !m)}
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                        className="text-[#A8A29E] hover:text-[#FAF8F5] cursor-pointer"
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4 text-[#FB923C]" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </button>

                      <span className="tabular-nums text-[11px] text-[#E5E0D8]">
                        {formatTimeMMSS(elapsedSec)} /{' '}
                        {formatTimeMMSS(activeLecture.durationSec)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline truncate max-w-[240px] text-[11px] text-[#A8A29E]">
                        {activeLecture.title}
                      </span>
                      <button
                        type="button"
                        onClick={handleCycleSpeed}
                        className="border border-[#E5E0D8]/30 px-2 py-0.5 text-[11px] text-[#FB923C] hover:border-[#FB923C] cursor-pointer"
                      >
                        {playbackSpeed}x
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Clickable Chapter Markers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#E5E0D8] divide-y sm:divide-y-0 sm:divide-x divide-[#E5E0D8] bg-[#F3EFE8]/60">
                {LECTURE_CHAPTERS.map((chap) => {
                  const active = chap.id === activeLectureId;
                  return (
                    <button
                      key={chap.id}
                      type="button"
                      onClick={() => handleSelectLectureChapter(chap.id, true)}
                      className={`p-3.5 text-left transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#141413] text-[#FAF8F5]'
                          : 'text-[#141413] hover:bg-[#F3EFE8]'
                      }`}
                    >
                      <div className="font-monograph-mono text-[10px] uppercase tracking-wider text-[#C2410C] font-semibold">
                        Chapter {chap.num} • {chap.timestampLabel}
                      </div>
                      <div className="mt-1 text-xs font-medium leading-snug">
                        {chap.pill.replace(/^\d+\.\s*/, '')}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ===============================================================
                SECTION 03 — CLEAN CHRONOLOGICAL 8-WEEK SYLLABUS (ACCORDION)
               =============================================================== */}
            <section
              id="syllabus"
              className="scroll-mt-14 border-t border-[#E5E0D8] pt-16 space-y-6"
            >
              <div className="space-y-2">
                <div className="font-monograph-mono text-[11px] uppercase tracking-[0.2em] text-[#C2410C] font-semibold">
                  03 // CHRONOLOGICAL CURRICULUM
                </div>
                <h2 className="font-monograph-serif text-3xl sm:text-4xl font-normal text-[#141413]">
                  The 8-Week Engineering Syllabus
                </h2>
                <p className="text-sm sm:text-base text-[#57534E]">
                  35 HD studio lectures, 8 architectural workshops, and runnable TypeScript reference repositories.
                </p>
              </div>

              {/* Filter Toggle & Expand All / Collapse All Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-y border-[#E5E0D8] py-3">
                <div className="flex items-center gap-2 font-monograph-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setSyllabusFilter('all')}
                    className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                      syllabusFilter === 'all'
                        ? 'border-[#141413] bg-[#141413] text-[#FAF8F5]'
                        : 'border-[#E5E0D8] bg-[#FAF8F5] text-[#57534E] hover:text-[#141413]'
                    }`}
                  >
                    All Weeks (08)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSyllabusFilter('free')}
                    className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                      syllabusFilter === 'free'
                        ? 'border-[#166534] bg-[#166534] text-[#FAF8F5]'
                        : 'border-[#E5E0D8] bg-[#FAF8F5] text-[#57534E] hover:text-[#141413]'
                    }`}
                  >
                    Free Preview Lessons (03)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleToggleExpandAllWeeks}
                  className="inline-flex items-center gap-1.5 font-monograph-mono text-xs text-[#C2410C] hover:underline cursor-pointer"
                >
                  {areAllWeeksExpanded ? (
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

              {/* Hairline-Bordered Typographic Syllabus Rows (Zero Cards) */}
              <div className="divide-y divide-[#E5E0D8] border-b border-[#E5E0D8]">
                {displayedWeeks.map((item) => {
                  const isOpen = openWeeks.includes(item.week);
                  return (
                    <div key={item.week} className="py-1">
                      <button
                        type="button"
                        onClick={() => toggleWeek(item.week)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start sm:items-center justify-between gap-4 py-4 text-left cursor-pointer group"
                      >
                        <div className="flex items-baseline gap-4 min-w-0">
                          <span className="font-monograph-mono text-xs font-semibold text-[#C2410C] shrink-0">
                            WEEK {item.week}
                          </span>
                          <div className="min-w-0">
                            <div className="font-monograph-serif text-xl sm:text-2xl text-[#141413] group-hover:text-[#C2410C] transition-colors">
                              {item.title}
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2.5 font-monograph-mono text-[11px] text-[#57534E]">
                              <span>{item.duration}</span>
                              {item.hasFreePreview && (
                                <span className="border border-[#166534]/35 bg-[#166534]/10 px-2 py-0.5 text-[10px] font-semibold text-[#166534]">
                                  FREE PREVIEW INCLUDED
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <ChevronDown
                          className={`h-4 w-4 text-[#57534E] shrink-0 mt-1.5 sm:mt-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#141413]' : ''
                          }`}
                        />
                      </button>

                      {/* Expanded Deliverables & Play Preview Trigger */}
                      {isOpen && (
                        <div className="pb-5 pl-0 sm:pl-16 pr-2 space-y-3.5">
                          <ul className="space-y-2 text-sm text-[#292524]">
                            {item.deliverables.map((del, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="font-monograph-mono text-xs text-[#C2410C] mt-0.5">
                                  —
                                </span>
                                <span>{del}</span>
                              </li>
                            ))}
                          </ul>

                          {item.hasFreePreview && (
                            <div className="pt-1">
                              <button
                                type="button"
                                onClick={() =>
                                  handlePlayPreviewFromSyllabus(item.previewChapterId)
                                }
                                className="inline-flex items-center gap-2 border border-[#166534] bg-[#166534]/10 px-3.5 py-1.5 font-monograph-mono text-xs font-semibold text-[#166534] hover:bg-[#166534] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                              >
                                <span>Play Preview ↑</span>
                                <span className="text-[11px] opacity-85">
                                  ({item.previewLessonTitle})
                                </span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ===============================================================
                SECTION 04 — CAPSTONE ENGINEERING ARTIFACTS
               =============================================================== */}
            <section
              id="capstone-artifacts"
              className="scroll-mt-14 border-t border-[#E5E0D8] pt-16 space-y-8"
            >
              <div className="space-y-2">
                <div className="font-monograph-mono text-[11px] uppercase tracking-[0.2em] text-[#C2410C] font-semibold">
                  04 // PRACTICAL PROOF OF WORK
                </div>
                <h2 className="font-monograph-serif text-3xl sm:text-4xl font-normal text-[#141413]">
                  Three Production Systems You Will Engineer From Scratch
                </h2>
                <p className="text-sm sm:text-base text-[#57534E]">
                  Each capstone repository includes an automated performance &amp; invariant test suite plus line-by-line PR review in Cohort 07.
                </p>
              </div>

              {/* Clean Numbered Typographic Dossier */}
              <div className="divide-y divide-[#E5E0D8] border-y border-[#141413]">
                {CAPSTONE_ARTIFACTS.map((art, idx) => {
                  const isInspected = inspectedArtifactIdx === idx;
                  return (
                    <div key={art.code} className="py-6 space-y-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-monograph-mono text-xs font-semibold text-[#C2410C]">
                          {art.code}
                        </span>
                        <span className="font-monograph-mono text-[11px] text-[#166534] font-semibold">
                          {art.benchmark}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                        <h3 className="font-monograph-serif text-2xl text-[#141413]">
                          {art.title}
                        </h3>
                        <button
                          type="button"
                          onClick={() =>
                            setInspectedArtifactIdx(isInspected ? -1 : idx)
                          }
                          className="self-start sm:self-auto font-monograph-mono text-xs underline underline-offset-4 text-[#141413] hover:text-[#C2410C] cursor-pointer"
                        >
                          {isInspected
                            ? 'Hide Architecture Blueprint −'
                            : 'Inspect Architecture Blueprint +'}
                        </button>
                      </div>

                      <div className="font-monograph-mono text-xs text-[#57534E]">
                        STACK: {art.stack}
                      </div>

                      <p className="text-sm sm:text-[15px] leading-relaxed text-[#292524]">
                        {art.summary}
                      </p>

                      {/* Expandable Architecture Notes Drawer */}
                      {isInspected && (
                        <div className="border-l-2 border-[#141413] bg-[#F3EFE8] p-4 space-y-2">
                          <div className="font-monograph-mono text-[10px] uppercase tracking-widest text-[#57534E] font-semibold">
                            SYSTEM INVARIANTS &amp; IMPLEMENTATION NOTES
                          </div>
                          <ul className="space-y-1.5 text-xs sm:text-sm text-[#141413]">
                            {art.architectureNotes.map((note, nIdx) => (
                              <li key={nIdx} className="flex items-start gap-2">
                                <span className="font-monograph-mono text-[#C2410C]">
                                  0{nIdx + 1}.
                                </span>
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ===============================================================
                SECTION 05 — SINGLE HIGH-URGENCY ENROLLMENT LEDGER
               =============================================================== */}
            <section
              id="cohort-enrollment"
              className="scroll-mt-14 border-t border-[#E5E0D8] pt-16 space-y-8"
            >
              <div className="space-y-2">
                <div className="font-monograph-mono text-[11px] uppercase tracking-[0.2em] text-[#C2410C] font-semibold">
                  05 // COHORT 07 ENROLLMENT LEDGER
                </div>
                <h2 className="font-monograph-serif text-3xl sm:text-4xl font-normal text-[#141413]">
                  Select Your Edition &amp; Lock Your Seat
                </h2>
                <p className="text-sm sm:text-base text-[#57534E]">
                  Cohort 07 begins December 9 and is strictly capped at 45 engineers so Marcus can personally review every capstone repository.
                </p>
              </div>

              {/* Crisp Editorial Enrollment Ledger Table (Zero SaaS Pricing Cards) */}
              <div className="border border-[#141413] bg-[#FAF8F5]">
                {/* Ledger Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#141413] bg-[#F3EFE8] px-5 py-3 font-monograph-mono text-[11px]">
                  <span className="font-semibold text-[#141413]">
                    CRAFTSTACK PRESS // TUITION SCHEDULE
                  </span>
                  <span className="text-[#166534] font-semibold">
                    {seatsLeft} OF 45 COHORT SEATS REMAINING
                  </span>
                </div>

                {/* Option A: Self-Paced Monograph ($349) */}
                <div className="border-b border-[#E5E0D8] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-md">
                    <div className="font-monograph-mono text-[11px] uppercase tracking-wider text-[#57534E]">
                      EDITION A // INDEPENDENT STUDY
                    </div>
                    <h3 className="font-monograph-serif text-2xl text-[#141413]">
                      Self-Paced Monograph
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#57534E]">
                      Lifetime access to all 35 HD lectures, the 8-week digital monograph, all 3 capstone starter &amp; solution repositories, and automated test suites.
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-baseline sm:items-end justify-between gap-3 shrink-0">
                    <div className="text-left sm:text-right">
                      <div className="font-monograph-mono text-3xl font-semibold text-[#141413] tabular-nums">
                        $349
                      </div>
                      <div className="font-monograph-mono text-[10px] text-[#57534E]">
                        ONE-TIME • LIFETIME ACCESS
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openEnrollmentModal('monograph')}
                      className="border border-[#141413] bg-transparent px-5 py-2.5 font-monograph-mono text-xs uppercase tracking-wider font-semibold text-[#141413] hover:bg-[#141413] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                    >
                      Acquire Monograph →
                    </button>
                  </div>
                </div>

                {/* Option B: Live Cohort 07 + Code Reviews ($499) */}
                <div className="p-6 sm:p-8 bg-[#F3EFE8]/55 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-2.5 max-w-md">
                    <div className="flex flex-wrap items-center gap-2 font-monograph-mono text-[11px]">
                      <span className="bg-[#C2410C] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#FAF8F5]">
                        COHORT 07 • STARTS DEC 9
                      </span>
                      <span className="text-[#166534] font-semibold">
                        Direct PR Code Reviews
                      </span>
                    </div>
                    <h3 className="font-monograph-serif text-2xl sm:text-3xl text-[#141413]">
                      Live Cohort 07 + Code Reviews
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#292524]">
                      Everything in the Self-Paced Monograph plus 8 live weekly architecture workshops, direct line-by-line GitHub PR reviews from Marcus Vance on all 3 capstones, and Staff RFC defense feedback.
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-baseline sm:items-end justify-between gap-3 shrink-0">
                    <div className="text-left sm:text-right">
                      <div className="flex items-baseline gap-2 sm:justify-end">
                        <span className="font-monograph-mono text-sm text-[#57534E] line-through tabular-nums">
                          $649
                        </span>
                        <span className="font-monograph-mono text-3xl sm:text-4xl font-semibold text-[#141413] tabular-nums">
                          $499
                        </span>
                      </div>
                      <div className="font-monograph-mono text-[10px] text-[#C2410C] font-semibold">
                        CLOSES IN {countdown.d}D {countdown.h}H {countdown.m}M
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openEnrollmentModal('cohort')}
                      className="border border-[#141413] bg-[#141413] px-6 py-3 font-monograph-mono text-xs uppercase tracking-wider font-semibold text-[#FAF8F5] hover:bg-[#C2410C] hover:border-[#C2410C] transition-colors cursor-pointer"
                    >
                      Reserve Cohort Seat →
                    </button>
                  </div>
                </div>

                {/* Guarantee & Employer L&D Footer Note */}
                <div className="border-t border-[#E5E0D8] px-6 py-3.5 font-monograph-mono text-[11px] text-[#57534E] flex flex-wrap items-center justify-between gap-2">
                  <span>✓ 14-Day 100% Unconditional Refund Guarantee</span>
                  <span>✓ Itemized Employer L&amp;D Expense Invoice Included</span>
                </div>
              </div>
            </section>

            {/* ===============================================================
                SECTION 06 — CATEGORIZED & SEARCHABLE FAQ DRAWERS
               =============================================================== */}
            <section
              id="common-questions"
              className="scroll-mt-14 border-t border-[#E5E0D8] pt-16 space-y-6"
            >
              <div className="space-y-2">
                <div className="font-monograph-mono text-[11px] uppercase tracking-[0.2em] text-[#C2410C] font-semibold">
                  06 // COMMON QUESTIONS
                </div>
                <h2 className="font-monograph-serif text-3xl sm:text-4xl font-normal text-[#141413]">
                  Frequently Asked Questions
                </h2>
              </div>

              {/* Search Input & Category Filter Tabs */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#57534E]" />
                  <input
                    type="text"
                    value={faqQuery}
                    onChange={(e) => setFaqQuery(e.target.value)}
                    placeholder="Filter questions (e.g. L&D invoice, time zone, prerequisites, refund)..."
                    className="w-full border border-[#E5E0D8] bg-[#FAF8F5] pl-10 pr-4 py-2.5 text-sm text-[#141413] placeholder:text-[#8C857B] focus:outline-none focus:border-[#141413]"
                  />
                </div>

                <div className="flex flex-wrap gap-2 font-monograph-mono text-[11px]">
                  {[
                    'All',
                    'Curriculum & Prerequisites',
                    'Live Cohort & Schedule',
                    'Teams & L&D Reimbursement'
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFaqCategory(cat)}
                      className={`border px-3 py-1 transition-colors cursor-pointer ${
                        faqCategory === cat
                          ? 'border-[#141413] bg-[#141413] text-[#FAF8F5]'
                          : 'border-[#E5E0D8] bg-[#FAF8F5] text-[#57534E] hover:text-[#141413]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hairline-Bordered Editorial Q&A Drawers */}
              <div className="divide-y divide-[#E5E0D8] border-y border-[#E5E0D8]">
                {filteredFaqs.length === 0 ? (
                  <div className="py-8 text-center font-monograph-mono text-xs text-[#57534E]">
                    No matching questions found. Clear your search filter to view all answers.
                  </div>
                ) : (
                  filteredFaqs.map((item) => {
                    const isOpen = openFaqId === item.id;
                    return (
                      <div key={item.id}>
                        <button
                          type="button"
                          onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-4 py-4 text-left cursor-pointer group"
                        >
                          <span className="font-monograph-serif text-lg sm:text-xl text-[#141413] group-hover:text-[#C2410C] transition-colors">
                            {item.q}
                          </span>
                          <Plus
                            className={`h-4 w-4 text-[#57534E] shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-45 text-[#C2410C]' : ''
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="pb-5 pr-6 text-sm sm:text-[15px] leading-relaxed text-[#57534E]">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Colophon Footer */}
              <footer className="pt-12 border-t border-[#E5E0D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-monograph-mono text-[11px] text-[#57534E]">
                <div>
                  CRAFTSTACK PRESS // FRONTEND SYSTEMS ARCHITECTURE
                </div>
                <div>
                  © {new Date().getFullYear()} MARCUS VANCE • ALL RIGHTS RESERVED
                </div>
              </footer>
            </section>
          </main>
        </div>
      </div>

      {/* =====================================================================
          INTERACTIVE SEAT RESERVATION MODAL (WITH GITHUB HANDLE & RECEIPT)
         ===================================================================== */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#141413]/70 p-4 backdrop-blur-xs"
          onClick={() => setModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg border border-[#141413] bg-[#FAF8F5] p-6 sm:p-8 text-[#141413] shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#E5E0D8] pb-4">
              <div>
                <div className="font-monograph-mono text-[10px] uppercase tracking-[0.2em] text-[#C2410C] font-semibold">
                  CRAFTSTACK PRESS // ENROLLMENT DESK
                </div>
                <h3 className="font-monograph-serif text-2xl text-[#141413] mt-0.5">
                  {receiptData
                    ? 'Cohort Seat Confirmed'
                    : 'Reserve Your Cohort 07 Seat'}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
                className="p-1 text-[#57534E] hover:text-[#141413] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {receiptData ? (
              /* Instant Seat Confirmation Receipt */
              <div className="mt-6 space-y-5">
                <div className="border border-[#166534] bg-[#166534]/10 p-4 space-y-1">
                  <div className="font-monograph-mono text-xs font-semibold text-[#166534]">
                    ✓ RESERVATION RECEIPT #{receiptData.receiptId}
                  </div>
                  <p className="text-xs text-[#141413] leading-relaxed">
                    Your GitHub repository invitation and L&amp;D reimbursement invoice have been dispatched to{' '}
                    <strong>{receiptData.email}</strong>.
                  </p>
                </div>

                <div className="divide-y divide-[#E5E0D8] border border-[#E5E0D8] bg-[#F3EFE8]/60 font-monograph-mono text-xs">
                  <div className="flex justify-between px-4 py-2.5">
                    <span className="text-[#57534E]">ENGINEER</span>
                    <span className="font-semibold text-[#141413]">{receiptData.name}</span>
                  </div>
                  <div className="flex justify-between px-4 py-2.5">
                    <span className="text-[#57534E]">GITHUB HANDLE</span>
                    <span className="font-semibold text-[#141413]">{receiptData.github}</span>
                  </div>
                  <div className="flex justify-between px-4 py-2.5">
                    <span className="text-[#57534E]">EDITION</span>
                    <span className="font-semibold text-[#141413]">{receiptData.track}</span>
                  </div>
                  <div className="flex justify-between px-4 py-2.5">
                    <span className="text-[#57534E]">ISSUED</span>
                    <span className="text-[#141413]">{receiptData.issuedAt}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-full border border-[#141413] bg-[#141413] py-3 font-monograph-mono text-xs uppercase tracking-widest font-semibold text-[#FAF8F5] hover:bg-[#C2410C] hover:border-[#C2410C] transition-colors cursor-pointer"
                >
                  Return to Monograph
                </button>
              </div>
            ) : (
              /* Enrollment Form */
              <form onSubmit={handleConfirmEnrollment} className="mt-5 space-y-4">
                {/* Edition Toggle */}
                <div className="grid grid-cols-2 border border-[#141413] font-monograph-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedPlan('cohort')}
                    className={`p-3 text-left transition-colors cursor-pointer ${
                      selectedPlan === 'cohort'
                        ? 'bg-[#141413] text-[#FAF8F5]'
                        : 'bg-[#FAF8F5] text-[#141413]'
                    }`}
                  >
                    <div className="font-semibold">Live Cohort 07</div>
                    <div className="text-[11px] opacity-80 mt-0.5">$499 • PR Reviews</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan('monograph')}
                    className={`border-l border-[#141413] p-3 text-left transition-colors cursor-pointer ${
                      selectedPlan === 'monograph'
                        ? 'bg-[#141413] text-[#FAF8F5]'
                        : 'bg-[#FAF8F5] text-[#141413]'
                    }`}
                  >
                    <div className="font-semibold">Self-Paced</div>
                    <div className="text-[11px] opacity-80 mt-0.5">$349 • Monograph</div>
                  </button>
                </div>

                {modalError && (
                  <div className="border border-[#C2410C] bg-[#C2410C]/10 px-3.5 py-2 text-xs text-[#C2410C] font-medium">
                    {modalError}
                  </div>
                )}

                <div>
                  <label className="block font-monograph-mono text-[11px] uppercase tracking-wider text-[#57534E] mb-1">
                    Full Name (For Certificate &amp; L&amp;D Invoice)
                  </label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Elena Rostova"
                    className="w-full border border-[#E5E0D8] bg-white px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-[#141413]"
                  />
                </div>

                <div>
                  <label className="block font-monograph-mono text-[11px] uppercase tracking-wider text-[#57534E] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="elena@engineering.dev"
                    className="w-full border border-[#E5E0D8] bg-white px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-[#141413]"
                  />
                </div>

                <div>
                  <label className="block font-monograph-mono text-[11px] uppercase tracking-wider text-[#57534E] mb-1">
                    GitHub Handle (For Private Capstone Repo Access)
                  </label>
                  <input
                    type="text"
                    value={applicantGithub}
                    onChange={(e) => setApplicantGithub(e.target.value)}
                    placeholder="@elenarostova"
                    className="w-full border border-[#E5E0D8] bg-white px-3.5 py-2.5 font-monograph-mono text-sm text-[#141413] focus:outline-none focus:border-[#141413]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full border border-[#141413] bg-[#141413] py-3.5 font-monograph-mono text-xs uppercase tracking-widest font-semibold text-[#FAF8F5] hover:bg-[#C2410C] hover:border-[#C2410C] transition-colors cursor-pointer"
                >
                  Confirm Reservation —{' '}
                  {selectedPlan === 'cohort' ? '$499' : '$349'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}