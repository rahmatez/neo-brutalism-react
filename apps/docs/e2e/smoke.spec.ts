import { expect, test } from '@playwright/test';

const SMOKE_ROUTES = [
  { path: '/', heading: /neo-brutalist React UI library/i },
  { path: '/docs/introduction', heading: /Build loud/i },
  { path: '/docs/installation', heading: /Installation/i },
  { path: '/components/button', heading: /Button/i },
  { path: '/components/chart', heading: /Chart/i },
  { path: '/composition/overview', heading: /Build loud/i },
  { path: '/recipes/travel-card', heading: /Travel Card/i },
] as const;

for (const route of SMOKE_ROUTES) {
  test(`smoke: ${route.path}`, async ({ page }) => {
    await page.goto(route.path);
    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible({
      timeout: 15_000,
    });
  });
}

test('smoke: docs layout navigation is visible', async ({ page }) => {
  await page.goto('/docs/introduction');
  await expect(page.getByRole('navigation').first()).toBeVisible();
});
