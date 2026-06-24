import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDocsPageSeo, OG_IMAGE_URL } from '@/docs/docs-seo-data';

function upsertMeta(
  selector: string,
  create: () => HTMLElement,
  apply: (element: HTMLElement) => void,
) {
  let element = document.head.querySelector(selector) as HTMLElement | null;
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  apply(element);
}

function setNamedMeta(name: string, content: string) {
  upsertMeta(
    `meta[name="${name}"]`,
    () => {
      const meta = document.createElement('meta');
      meta.setAttribute('name', name);
      return meta;
    },
    (meta) => meta.setAttribute('content', content),
  );
}

function setPropertyMeta(property: string, content: string) {
  upsertMeta(
    `meta[property="${property}"]`,
    () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', property);
      return meta;
    },
    (meta) => meta.setAttribute('content', content),
  );
}

export function DocsPageSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getDocsPageSeo(pathname);

    document.title = seo.title;
    setNamedMeta('description', seo.description);
    setPropertyMeta('og:title', seo.title);
    setPropertyMeta('og:description', seo.description);
    setPropertyMeta('og:type', 'website');
    setPropertyMeta('og:url', seo.canonicalUrl);
    setPropertyMeta('og:image', OG_IMAGE_URL);
    setNamedMeta('twitter:card', 'summary_large_image');
    setNamedMeta('twitter:title', seo.title);
    setNamedMeta('twitter:description', seo.description);
    setNamedMeta('twitter:image', OG_IMAGE_URL);

    upsertMeta(
      'link[rel="canonical"]',
      () => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        return link;
      },
      (link) => link.setAttribute('href', seo.canonicalUrl),
    );
  }, [pathname]);

  return null;
}
