export const TOC_CHAPTERS = [
  { id: 'the-letter', num: '01', label: 'The Letter' },
  { id: 'video-lecture', num: '02', label: 'Free Video Lecture' },
  { id: 'syllabus', num: '03', label: 'The 8-Week Syllabus' },
  { id: 'capstone-artifacts', num: '04', label: 'Capstone Artifacts' },
  { id: 'cohort-enrollment', num: '05', label: 'Cohort Enrollment' },
  { id: 'common-questions', num: '06', label: 'Common Questions' }
];

export const LECTURE_CHAPTERS = [
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

export const SYLLABUS_WEEKS = [
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

export const CAPSTONE_ARTIFACTS = [
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

export const FAQ_ENTRIES = [
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
