import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function resolveHeadingId(el: HTMLElement, text: string, seen: Set<string>): string | null {
  if (el.id && !seen.has(el.id)) return el.id;

  const sectionId = el.closest<HTMLElement>('section[id]')?.id;
  const slug = slugify(text);

  if (el.tagName === 'H2' && sectionId && !seen.has(sectionId)) {
    return sectionId;
  }

  let id = slug || sectionId || null;
  if (!id) return null;

  if (seen.has(id) && sectionId) {
    id = `${sectionId}-${slug || 'section'}`;
  }

  const baseId = id;
  let counter = 2;
  while (seen.has(id)) {
    id = `${baseId}-${counter++}`;
  }

  if (!el.id) {
    el.id = id;
  }

  return id;
}

function extractHeadings(): TocHeading[] {
  const content = document.querySelector('[data-docs-content]');
  if (!content) return [];

  const overview = content.querySelector<HTMLElement>('#overview');
  const marked = content.querySelectorAll<HTMLElement>('[data-docs-heading]');
  const nodes = [...(overview ? [overview] : []), ...Array.from(marked)];

  const seen = new Set<string>();
  const out: TocHeading[] = [];

  nodes.forEach((el) => {
    const isOverview = el.id === 'overview';
    const text = isOverview ? 'Overview' : el.textContent?.trim() || '';
    const id = isOverview ? 'overview' : resolveHeadingId(el, text, seen);

    if (!id || !text || seen.has(id)) return;

    seen.add(id);
    out.push({
      id,
      text,
      level: isOverview ? 2 : el.tagName === 'H3' ? 3 : 2,
    });
  });

  return out;
}

export function DocsToc() {
  const location = useLocation();
  const [headings, setHeadings] = useState<TocHeading[]>([]);

  useEffect(() => {
    const content = document.querySelector('[data-docs-content]');
    if (!content) return;

    let frame = 0;

    const update = () => {
      setHeadings(extractHeadings());
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    scheduleUpdate();

    const observer = new MutationObserver(scheduleUpdate);
    observer.observe(content, { childList: true, subtree: true });

    const retries = [50, 150, 400, 800].map((ms) => window.setTimeout(scheduleUpdate, ms));

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      retries.forEach(clearTimeout);
    };
  }, [location.pathname]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc__header">On this page</p>
      {headings.length === 0 ? (
        <p className="text-xs font-medium opacity-60">No headings yet</p>
      ) : (
        headings.map((heading) => (
          <button
            key={heading.id}
            type="button"
            className={`toc__item w-full text-left ${heading.level === 3 ? 'toc__item--sub' : ''}`}
            onClick={() => scrollTo(heading.id)}
          >
            <span className="toc__marker" aria-hidden="true" />
            <span className="toc__text">{heading.text}</span>
          </button>
        ))
      )}
    </nav>
  );
}
