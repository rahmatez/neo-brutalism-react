import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildDocsSearchIndex, filterDocsSearch } from '../docs-search';

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5" />
      <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function isMacPlatform() {
  if (typeof navigator === 'undefined') return true;
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform);
}

export function DocsSearch() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const index = useMemo(() => buildDocsSearchIndex(), []);
  const results = useMemo(() => filterDocsSearch(query, index), [index, query]);
  const shortcutLabel = isMacPlatform() ? '⌘K' : 'Ctrl+K';

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);

  const openSearch = useCallback(() => {
    setOpen(true);
    setQuery('');
    setActiveIndex(0);
  }, []);

  const goTo = useCallback(
    (path: string) => {
      close();
      navigate(path);
    },
    [close, navigate],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
        if (!open) {
          setQuery('');
          setActiveIndex(0);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((current) => Math.min(current + 1, Math.max(results.length - 1, 0)));
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((current) => Math.max(current - 1, 0));
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [close, open, results.length]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const active = listRef.current.querySelector<HTMLElement>('[data-active="true"]');
    active?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

  return (
    <>
      <button
        type="button"
        className="docs-search-trigger inline-flex h-11 min-w-0 items-center gap-2 border-4 border-(--nb-border) bg-(--nb-paper) px-3 text-sm font-bold text-black shadow-[4px_4px_0_0_var(--nb-shadow)] transition-transform hover:-translate-y-0.5 sm:h-12 sm:px-4"
        aria-label={`Search documentation (${shortcutLabel})`}
        onClick={openSearch}
      >
        <SearchIcon />
        <span className="hidden truncate sm:inline">Search…</span>
        <kbd className="docs-search-kbd hidden font-mono text-[0.65rem] font-black tracking-wide uppercase lg:inline-flex">
          {shortcutLabel}
        </kbd>
      </button>

      {open ? (
        <>
          <div
            className="docs-search-backdrop fixed inset-0 z-60 bg-black/50"
            aria-hidden="true"
            onClick={close}
          />
          <div
            className="docs-search-dialog fixed top-[max(5.5rem,12vh)] right-3 left-3 z-70 mx-auto flex max-h-[min(32rem,calc(100vh-7rem))] w-full max-w-xl flex-col overflow-hidden border-4 border-(--nb-border) bg-(--nb-paper) shadow-[10px_10px_0_0_var(--nb-shadow)] sm:right-6 sm:left-6"
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation"
          >
            <div className="flex items-center gap-3 border-b-4 border-(--nb-border) bg-(--nb-yellow) px-4 py-3">
              <SearchIcon />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && results[activeIndex]) {
                    event.preventDefault();
                    goTo(results[activeIndex].path);
                  }
                }}
                placeholder="Search docs, components, recipes…"
                className="min-w-0 flex-1 bg-transparent text-base font-medium outline-none placeholder:font-bold placeholder:text-black/45"
                aria-controls="docs-search-results"
                aria-activedescendant={
                  results[activeIndex] ? `docs-search-result-${activeIndex}` : undefined
                }
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                type="button"
                className="docs-search-kbd shrink-0 px-2 py-1 font-mono text-[0.65rem] font-black tracking-wide uppercase"
                onClick={close}
              >
                Esc
              </button>
            </div>

            <div
              id="docs-search-results"
              ref={listRef}
              className="flex-1 overflow-y-auto p-2"
              role="listbox"
              aria-label="Search results"
            >
              {results.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm font-medium text-black/60">
                  No results for &ldquo;{query}&rdquo;
                </p>
              ) : (
                results.map((result, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={`${result.path}-${result.label}-${index}`}
                      id={`docs-search-result-${index}`}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive ? 'true' : 'false'}
                      className={`docs-search-result flex w-full flex-col gap-0.5 px-3 py-2.5 text-left ${isActive ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => goTo(result.path)}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-display text-sm font-black uppercase">
                          {result.label}
                        </span>
                        <span className="shrink-0 font-mono text-[0.65rem] font-bold tracking-wide text-black/55 uppercase">
                          {result.group}
                        </span>
                      </span>
                      {result.hint ? (
                        <span className="text-xs font-medium text-black/60">{result.hint}</span>
                      ) : (
                        <span className="font-mono text-xs font-medium text-black/45">{result.path}</span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
