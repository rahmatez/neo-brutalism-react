import { docsNavGroups } from './docs.navigation';
import { TOP_SECTIONS } from './layout/sections';

export interface DocsSearchResult {
  label: string;
  path: string;
  group: string;
  /** Parent page label for in-page TOC hits */
  hint?: string;
}

const SHOWCASE_ENTRIES: readonly DocsSearchResult[] = [
  { label: 'Portfolio Showcase', path: '/showcase/portfolio', group: 'Showcase' },
];

export function buildDocsSearchIndex(): DocsSearchResult[] {
  const results: DocsSearchResult[] = [];

  for (const group of docsNavGroups) {
    for (const item of group.items) {
      if (!item.path) continue;

      results.push({
        label: item.label,
        path: item.path,
        group: group.label,
      });

      if (item.toc) {
        for (const tocItem of item.toc) {
          results.push({
            label: tocItem.label,
            path: `${item.path}#${tocItem.fragment}`,
            group: group.label,
            hint: item.label,
          });
        }
      }
    }
  }

  for (const section of TOP_SECTIONS) {
    results.push({
      label: section.label,
      path: section.path,
      group: 'Navigate',
    });
  }

  return [...results, ...SHOWCASE_ENTRIES];
}

export function filterDocsSearch(
  query: string,
  index: readonly DocsSearchResult[],
): DocsSearchResult[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return index.filter((item) => !item.hint).slice(0, 14);
  }

  const terms = normalized.split(/\s+/).filter(Boolean);

  return index
    .filter((item) => {
      const haystack = `${item.label} ${item.group} ${item.hint ?? ''} ${item.path}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    })
    .slice(0, 20);
}
