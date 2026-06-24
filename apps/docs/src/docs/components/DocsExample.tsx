import { Suspense, lazy, useState, type ReactNode } from 'react';
import { cn } from 'neobrutalism-ui-react';

const DocsCodeBlock = lazy(() =>
  import('./DocsCodeBlock').then((module) => ({ default: module.DocsCodeBlock })),
);

interface DocsExampleProps {
  code: string;
  children: ReactNode;
  /** Extra vertical space for open dropdowns / popovers in the preview panel. */
  layout?: 'default' | 'dropdown' | 'spacious';
}

export function DocsExample({ code, children, layout = 'default' }: DocsExampleProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const isDropdown = layout === 'dropdown';
  const isSpacious = layout === 'spacious';

  return (
    <div
      className={cn(
        'docs-example border-4 border-(--nb-border) bg-white shadow-[8px_8px_0_0_var(--nb-shadow)]',
        isDropdown || isSpacious ? 'overflow-visible' : 'overflow-hidden',
      )}
    >
      <div className="flex items-center border-b-4 border-(--nb-border) bg-white">
        <button
          type="button"
          className={`docs-example__tab ${tab === 'preview' ? 'is-active' : ''}`}
          onClick={() => setTab('preview')}
        >
          <span className="docs-example__dot" aria-hidden="true" />
          Preview
        </button>
        <button
          type="button"
          className={`docs-example__tab docs-example__tab--code ${tab === 'code' ? 'is-active' : ''}`}
          onClick={() => setTab('code')}
        >
          <span className="docs-example__dot" aria-hidden="true" />
          Code
        </button>
      </div>
      <div>
        {tab === 'preview' ? (
          <div
            className={cn(
              'docs-preview-grid flex w-full min-w-0 px-5 sm:px-10',
              isDropdown
                ? 'min-h-[300px] items-start justify-center pt-10 pb-44 sm:pb-52'
                : isSpacious
                  ? 'min-h-[320px] items-start justify-center py-8 sm:py-10'
                  : 'min-h-[240px] items-center justify-center py-10 sm:py-20',
            )}
          >
            <div className="w-full min-w-0">{children}</div>
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="px-5 py-8 font-mono text-sm font-medium text-(--nb-muted-fg)">
                Loading highlighter…
              </div>
            }
          >
            <DocsCodeBlock variant="embedded" title="Code" code={code} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
