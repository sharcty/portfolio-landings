import { Suspense } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { pageRoutes } from './pageRoutes';
import PageMetadata from './PageMetadata';

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
          {pageRoutes.map(({ path, title }) => (
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

export default function App() {
  return (
    <BrowserRouter>
      <PageMetadata />
      <Suspense fallback={<div className="p-8 text-slate-500">Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {pageRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
