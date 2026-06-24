import uiPackage from '../../../../packages/ui/package.json';

/** Published library version (`neobrutalism-ui-react` on npm). */
export const LIBRARY_VERSION = uiPackage.version;
export const LIBRARY_VERSION_LABEL = `v${uiPackage.version}`;

/** Resolve a public-folder asset path against the Vite `base` URL (GitHub Pages subpath). */
export function siteAsset(path: string): string {
  const normalized = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${normalized}`;
}

export const SITE_BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');
