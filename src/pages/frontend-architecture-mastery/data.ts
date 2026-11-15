export const previewChapters = [
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

export const curriculumModules = [
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

export const capstones = [
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

export const testimonials = [
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

export const faqItems = [
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
