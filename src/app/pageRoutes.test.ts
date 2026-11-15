import { describe, expect, it } from 'vitest';
import { getPageMetadata, pageMetadata, pageRoutes } from './pageRoutes';
import { getHeroTabs } from '../pages/veloce-ai/data';

describe('portfolio page routes', () => {
  it('defines unique, non-root paths with a title for every landing', () => {
    const paths = pageRoutes.map(({ path }) => path);

    expect(pageRoutes).toHaveLength(9);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).not.toContain('/');
    expect(
      pageRoutes.every(
        ({ title, description }) =>
          title.trim().length > 0 && description.trim().length > 0
      )
    ).toBe(true);
  });

  it('includes the expected shareable page URLs', () => {
    const paths = pageRoutes.map(({ path }) => path);

    expect(paths).toContain('/aethervault-institutional');
    expect(paths).toContain('/aura-one-spatial');
  });

  it('resolves page title and description from the route registry', () => {
    expect(getPageMetadata('/aura-one-spatial/')).toEqual({
      title: 'Aura One Spatial | Portfolio Landings',
      description: pageRoutes.find(({ path }) => path === '/aura-one-spatial')?.description
    });
  });

  it('provides home and not-found metadata', () => {
    expect(getPageMetadata('/')).toEqual(pageMetadata.home);
    expect(getPageMetadata('/missing-page')).toEqual(pageMetadata.notFound);
  });

  it('keeps hero demo data responsive to simulation state', () => {
    const firstSimulation = getHeroTabs(1);
    const nextSimulation = getHeroTabs(2);

    expect(firstSimulation.scoring.metric1Value).toBe('1,428');
    expect(nextSimulation.scoring.metric1Value).toBe('1,594');
    expect(firstSimulation.forecast.rows).toHaveLength(3);
  });
});
