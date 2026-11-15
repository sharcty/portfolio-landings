import { describe, expect, it } from 'vitest';
import { pageRoutes } from './pageRoutes';

describe('portfolio page routes', () => {
  it('defines unique, non-root paths with a title for every landing', () => {
    const paths = pageRoutes.map(({ path }) => path);

    expect(pageRoutes).toHaveLength(9);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).not.toContain('/');
    expect(pageRoutes.every(({ title }) => title.trim().length > 0)).toBe(true);
  });

  it('includes the expected shareable page URLs', () => {
    const paths = pageRoutes.map(({ path }) => path);

    expect(paths).toContain('/aethervault-institutional');
    expect(paths).toContain('/aura-one-spatial');
  });
});
