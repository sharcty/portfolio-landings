import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

export type PageRoute = {
  path: `/${string}`;
  title: string;
  description: string;
  Component: LazyExoticComponent<ComponentType>;
};

export const pageMetadata = {
  home: {
    title: 'Portfolio Landings',
    description: 'Explore a collection of interactive product and brand landing pages.'
  },
  notFound: {
    title: 'Page Not Found | Portfolio Landings',
    description: 'The requested portfolio page could not be found.'
  }
} as const;

export const pageRoutes = [
  {
    path: '/aethervault-institutional',
    title: 'AetherVault Institutional',
    description: 'Explore AetherVault’s institutional on-chain yield and treasury protocol.',
    Component: lazy(() => import('../pages/aethervault-institutional'))
  },
  {
    path: '/aethervault-swiss-grid',
    title: 'AetherVault Swiss Grid',
    description: 'Explore a Swiss-grid financial terminal for digital asset markets.',
    Component: lazy(() => import('../pages/aethervault-swiss-grid'))
  },
  {
    path: '/aura-one-acoustic',
    title: 'Aura One Acoustic',
    description: 'Discover the Aura One flagship acoustic headphones.',
    Component: lazy(() => import('../pages/aura-one-acoustic'))
  },
  {
    path: '/aura-one-spatial',
    title: 'Aura One Spatial',
    description: 'Discover Aura One spatial audio and active noise-cancelling headphones.',
    Component: lazy(() => import('../pages/aura-one-spatial'))
  },
  {
    path: '/craftstack-monograph',
    title: 'Craftstack Monograph',
    description: 'Explore CraftStack’s frontend systems architecture monograph.',
    Component: lazy(() => import('../pages/craftstack-monograph'))
  },
  {
    path: '/frontend-architecture-mastery',
    title: 'Frontend Architecture Mastery',
    description: 'Explore the CraftStack Academy frontend architecture course.',
    Component: lazy(() => import('../pages/frontend-architecture-mastery'))
  },
  {
    path: '/heliogrid-case-study',
    title: 'HelioGrid Case Study',
    description: 'Read the HelioGrid energy conversion case study.',
    Component: lazy(() => import('../pages/heliogrid-case-study'))
  },
  {
    path: '/heliogrid-custom-solar',
    title: 'HelioGrid Custom Solar',
    description: 'Explore custom architectural solar and battery storage by HelioGrid.',
    Component: lazy(() => import('../pages/heliogrid-custom-solar'))
  },
  {
    path: '/veloce-ai',
    title: 'Veloce AI',
    description: 'Explore Veloce AI’s autonomous revenue workflow platform.',
    Component: lazy(() => import('../pages/veloce-ai'))
  }
] satisfies PageRoute[];

export function normalizePathname(pathname: string): string {
  const normalizedPath = pathname.replace(/\/+$/, '');
  return normalizedPath || '/';
}

export function getPageMetadata(pathname: string) {
  const normalizedPath = normalizePathname(pathname);
  if (normalizedPath === '/') return pageMetadata.home;

  const route = pageRoutes.find(({ path }) => path === normalizedPath);
  return route
    ? { title: `${route.title} | ${pageMetadata.home.title}`, description: route.description }
    : pageMetadata.notFound;
}
