#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.resolve(__dirname, '..');
const workspaceRoot = path.resolve(docsRoot, '../..');
const distDir = path.resolve(docsRoot, 'dist');
const publicDir = path.resolve(docsRoot, 'public');

const jiti = createJiti(import.meta.url, { interopDefault: true });
const seoModule = await jiti.import(path.resolve(docsRoot, 'src/docs/docs-seo-data.ts'));

const { DOCS_PUBLIC_ROUTES, getDocsPageSeo, APP_TITLE, AUTHOR_NAME, AUTHOR_URL, REPO_URL, NPM_PACKAGE } =
  seoModule;

const targets = process.argv.includes('--dist-only') ? [distDir] : [publicDir, distDir];

for (const dir of targets) {
  mkdirSync(dir, { recursive: true });
}

const sitemap = buildSitemap();
const llms = buildLlmsTxt();
const robots = buildRobotsTxt();

for (const dir of targets) {
  writeFileSync(path.join(dir, 'sitemap.xml'), sitemap);
  writeFileSync(path.join(dir, 'llms.txt'), llms);
  writeFileSync(path.join(dir, 'robots.txt'), robots);
}

if (targets.includes(distDir)) {
  const indexPath = path.join(distDir, 'index.html');
  const notFoundPath = path.join(distDir, '404.html');
  copyFileSync(indexPath, notFoundPath);
}

console.log(
  `Wrote sitemap.xml, llms.txt, robots.txt (${DOCS_PUBLIC_ROUTES.length} routes) to: ${targets.join(', ')}`,
);
if (targets.includes(distDir)) {
  console.log(`Wrote 404.html SPA fallback to ${path.join(distDir, '404.html')}`);
}

function buildSitemap() {
  const urls = DOCS_PUBLIC_ROUTES.map((route) => {
    const loc = canonicalLoc(route.path);
    const lastmod = gitLastmod(route.sourceFile);
    const lastmodTag = lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '';
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      lastmodTag.trimEnd(),
      `    <priority>${route.priority}</priority>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n');
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildLlmsTxt() {
  const lines = [
    `# ${APP_TITLE}`,
    '',
    `> ${APP_TITLE} is a neo-brutalist React UI library by ${AUTHOR_NAME}. Built with composable primitives, hooks-friendly patterns, and Tailwind v4. It ships as ${NPM_PACKAGE}. Bold borders, offset shadows, punchy colors.`,
    '',
    `- Author: ${AUTHOR_NAME} (${AUTHOR_URL})`,
    `- Repository: ${REPO_URL}`,
    `- License: MIT`,
    '',
    '## Pages',
    '',
  ];

  for (const route of DOCS_PUBLIC_ROUTES) {
    const seo = getDocsPageSeo(route.path);
    lines.push(`- [${seo.title}](${seo.canonicalUrl}): ${seo.description}`);
  }

  lines.push('');
  return lines.join('\n');
}

function buildRobotsTxt() {
  const sitemapUrl = getDocsPageSeo('/').canonicalUrl.replace(/\/$/, '') + '/sitemap.xml';
  return `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
}

function canonicalLoc(routePath) {
  if (routePath === '/') {
    return getDocsPageSeo('/').canonicalUrl.replace(/\/$/, '') + '/';
  }
  return getDocsPageSeo(routePath).canonicalUrl;
}

function gitLastmod(relPath) {
  if (!relPath) {
    return isoNow();
  }

  const fullPath = path.resolve(workspaceRoot, relPath);
  try {
    readFileSync(fullPath);
  } catch {
    return isoNow();
  }

  try {
    const out = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', fullPath],
      { cwd: workspaceRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim();
    return out || isoNow();
  } catch {
    return isoNow();
  }
}

function isoNow() {
  return new Date().toISOString();
}
