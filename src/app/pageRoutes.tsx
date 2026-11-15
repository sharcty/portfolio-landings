import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

export type PageRoute = {
  path: `/${string}`;
  title: string;
  Component: LazyExoticComponent<ComponentType>;
};

export const pageRoutes = [
  {
    path: '/aethervault-institutional',
    title: 'AetherVault Institutional',
    Component: lazy(() => import('../pages/aethervault-institutional'))
  },
  {
    path: '/aethervault-swiss-grid',
    title: 'AetherVault Swiss Grid',
    Component: lazy(() => import('../pages/aethervault-swiss-grid'))
  },
  {
    path: '/aura-one-acoustic',
    title: 'Aura One Acoustic',
    Component: lazy(() => import('../pages/aura-one-acoustic'))
  },
  {
    path: '/aura-one-spatial',
    title: 'Aura One Spatial',
    Component: lazy(() => import('../pages/aura-one-spatial'))
  },
  {
    path: '/craftstack-monograph',
    title: 'Craftstack Monograph',
    Component: lazy(() => import('../pages/craftstack-monograph'))
  },
  {
    path: '/frontend-architecture-mastery',
    title: 'Frontend Architecture Mastery',
    Component: lazy(() => import('../pages/frontend-architecture-mastery'))
  },
  {
    path: '/heliogrid-case-study',
    title: 'HelioGrid Case Study',
    Component: lazy(() => import('../pages/heliogrid-case-study'))
  },
  {
    path: '/heliogrid-custom-solar',
    title: 'HelioGrid Custom Solar',
    Component: lazy(() => import('../pages/heliogrid-custom-solar'))
  },
  {
    path: '/veloce-ai',
    title: 'Veloce AI',
    Component: lazy(() => import('../pages/veloce-ai'))
  }
] satisfies PageRoute[];
