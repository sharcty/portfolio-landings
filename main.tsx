import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './styles.css';

const pages = [
  {
    path: '/aethervault-institutional',
    title: 'AetherVault Institutional',
    Component: lazy(() => import('./aethervault_institutional_on_chain_yield_treasury_protocol'))
  },
  {
    path: '/aethervault-swiss-grid',
    title: 'AetherVault Swiss Grid',
    Component: lazy(() => import('./aethervault_swiss_grid_financial_terminal'))
  },
  {
    path: '/aura-one-acoustic',
    title: 'Aura One Acoustic',
    Component: lazy(() => import('./aura_one_flagship_acoustic_headphones'))
  },
  {
    path: '/aura-one-spatial',
    title: 'Aura One Spatial',
    Component: lazy(() => import('./aura_one_flagship_spatial_audio_anc_headphones'))
  },
  {
    path: '/craftstack-monograph',
    title: 'Craftstack Monograph',
    Component: lazy(() => import('./craftstack_frontend_systems_architecture_monograph'))
  },
  {
    path: '/frontend-architecture-mastery',
    title: 'Frontend Architecture Mastery',
    Component: lazy(() => import('./frontend_architecture_mastery_craftstack_academy'))
  },
  {
    path: '/heliogrid-case-study',
    title: 'HelioGrid Case Study',
    Component: lazy(() => import('./heliogrid_energy_conversion_first_split_hero_case_study_ledger'))
  },
  {
    path: '/heliogrid-custom-solar',
    title: 'HelioGrid Custom Solar',
    Component: lazy(() => import('./heliogrid_energy_custom_architectural_solar_battery_storage'))
  },
  {
    path: '/veloce-ai',
    title: 'Veloce AI',
    Component: lazy(() => import('./veloce_ai_autonomous_revenue_workflow_platform'))
  }
];

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          Selected work
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          Portfolio landings
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-300">
          Explore each project on its own page.
        </p>
        <nav aria-label="Portfolio pages" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map(({ path, title }) => (
            <Link
              key={path}
              to={path}
              className="rounded-2xl border border-slate-700 bg-slate-900 p-6 text-lg font-semibold transition hover:border-cyan-400 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {title}
              <span aria-hidden="true" className="ml-2 text-cyan-300">↗</span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-slate-300">That portfolio page does not exist.</p>
      <Link to="/" className="mt-6 font-semibold text-cyan-300 hover:text-cyan-200">
        Back to all projects
      </Link>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-8 text-slate-500">Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {pages.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
