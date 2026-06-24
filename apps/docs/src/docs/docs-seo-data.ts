import { docsNavGroups, findDocsNavItem } from './docs.navigation';

export const APP_TITLE = 'Neo Brutalism React';
export const SITE_URL = 'https://neo-brutalism-react-docs.vercel.app';
export const OG_IMAGE_URL = `${SITE_URL}/og.svg`;
export const DEFAULT_DESCRIPTION =
  'Neo-brutalist React UI primitive library and composition system. Build loud React interfaces with Surface, Section, Stack, Cluster, Split, forms, media, and recipes — Tailwind v4, bold borders, hard shadows.';

export const AUTHOR_NAME = 'Rahmat Ashari';
export const AUTHOR_URL = 'https://github.com/rahmatez';
export const REPO_URL = 'https://github.com/rahmatez/neo-brutalism-react';
export const NPM_PACKAGE = 'neobrutalism-ui-react';

export interface DocsPublicRoute {
  path: string;
  label: string;
  priority: string;
  changefreq: 'weekly' | 'monthly';
  sourceFile?: string;
}

export const STATIC_PUBLIC_ROUTES: readonly DocsPublicRoute[] = [
  {
    path: '/',
    label: 'Home',
    priority: '1.0',
    changefreq: 'weekly',
    sourceFile: 'apps/docs/src/pages/HomePage.tsx',
  },
  {
    path: '/showcase/portfolio',
    label: 'Portfolio Showcase',
    priority: '0.8',
    changefreq: 'monthly',
    sourceFile: 'apps/docs/src/pages/showcase/PortfolioShowcasePage.tsx',
  },
];

const NAV_ROUTES: DocsPublicRoute[] = docsNavGroups.flatMap((group) =>
  group.items.flatMap((item) =>
    item.path
      ? [
          {
            path: item.path,
            label: item.label,
            priority: item.path.startsWith('/components/') ? '0.7' : '0.8',
            changefreq: 'weekly' as const,
            sourceFile: sourceFileForPath(item.path),
          },
        ]
      : [],
  ),
);

export const DOCS_PUBLIC_ROUTES: readonly DocsPublicRoute[] = [
  ...STATIC_PUBLIC_ROUTES,
  ...NAV_ROUTES,
];

export const PAGE_DESCRIPTIONS: Record<string, string> = {
  '/':
    'Neo Brutalism React is a neo-brutalist React UI primitive library and composition system for building loud interfaces with Surface, Section, Stack, Cluster, Split, actions, forms, media, and recipes.',
  '/docs/introduction':
    'Get started with Neo Brutalism React — a token-driven primitive composition system for React and Tailwind v4.',
  '/docs/installation':
    'Install neobrutalism-ui-react in your React project. Requires React 18+, Tailwind v4, and Node 20+.',
  '/docs/inspired-designs':
    'Explore the visual references behind Neo Brutalism React: loud layouts, chunky borders, bold color, and React UI patterns with bite.',
  '/docs/faq':
    'FAQ for React developers using the neo-brutalist primitive library and composition system.',
  '/composition/overview':
    'Learn the Neo Brutalism React composition system: Surface, Section, Stack, Cluster, Split, and typography working together.',
  '/recipes/travel-card':
    'Travel card recipe composed from Surface, Split, MediaFrame, Chip, and other neo-brutalist React primitives.',
  '/recipes/podcast-card':
    'Podcast card recipe with chips, host metadata, waveform player, and CTA built from React primitives.',
  '/recipes/open-to-work-card':
    'Open to Work profile card recipe for portfolios and hiring pages.',
  '/showcase/portfolio':
    'Portfolio showcase built with Neo Brutalism React primitives, OpenLayers map, and neo-brutalist layout patterns.',
};

function sourceFileForPath(routePath: string): string | undefined {
  if (routePath.startsWith('/docs/')) {
    const slug = routePath.slice('/docs/'.length);
    const pascal = slug
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    return `apps/docs/src/pages/docs/${pascal}Page.tsx`;
  }

  if (routePath.startsWith('/composition/')) {
    const slug = routePath.slice('/composition/'.length);
    const pascal = slug
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    return `apps/docs/src/pages/composition/${pascal}Page.tsx`;
  }

  if (routePath.startsWith('/recipes/')) {
    const slug = routePath.slice('/recipes/'.length);
    const pascal = slug
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    return `apps/docs/src/pages/recipes/${pascal}RecipePage.tsx`;
  }

  if (routePath.startsWith('/components/')) {
    const slug = routePath.slice('/components/'.length);
    const pascal = slug
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    return `apps/docs/src/pages/components/${pascal}Page.tsx`;
  }

  return undefined;
}

export function getDocsPageSeo(path: string) {
  const normalized = path === '' ? '/' : path.split(/[?#]/, 1)[0] || '/';
  const navItem = findDocsNavItem(normalized);
  const route =
    DOCS_PUBLIC_ROUTES.find((entry) => entry.path === normalized) ??
    STATIC_PUBLIC_ROUTES.find((entry) => entry.path === normalized);
  const label = navItem?.label ?? route?.label ?? APP_TITLE;
  const description =
    PAGE_DESCRIPTIONS[normalized] ??
    `Neo-brutalist ${label} documentation for React — ${NPM_PACKAGE} with bold borders, hard shadows, and Tailwind v4 tokens.`;
  const canonicalPath = normalized === '/' ? '/' : `${normalized}/`;
  const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;

  return {
    title: normalized === '/' ? `${APP_TITLE} — Neo-Brutalist React UI Library` : `${label} | ${APP_TITLE}`,
    description,
    canonicalUrl,
  };
}
