import { useEffect, useMemo, useState } from 'react';
import { DocsCodeCopyIcon } from './DocsCodeCopyIcon';
import { inferLanguage, type HighlightLanguage } from '../highlight-language';

type DocsCodeBlockVariant = 'standalone' | 'embedded';

interface DocsCodeBlockProps {
  code: string;
  title?: string;
  language?: HighlightLanguage;
  variant?: DocsCodeBlockVariant;
  className?: string;
}

export function DocsCodeBlock({
  code,
  title = 'Code',
  language,
  variant = 'standalone',
  className = '',
}: DocsCodeBlockProps) {
  const [html, setHtml] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const resolvedLanguage = useMemo(
    () => language ?? inferLanguage(title, code),
    [language, title, code],
  );

  useEffect(() => {
    let cancelled = false;
    import('../syntax-highlighter').then(({ highlightCode }) =>
      highlightCode(code, resolvedLanguage).then((result) => {
        if (!cancelled) setHtml(result);
      }),
    );
    return () => {
      cancelled = true;
    };
  }, [code, resolvedLanguage]);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const isStandalone = variant === 'standalone';

  return (
    <div
      className={`docs-code-block-host block ${className}`}
      data-variant={variant}
    >
      <div
        className={`bg-black text-white ${
          isStandalone
            ? 'border-4 border-(--nb-border) shadow-[8px_8px_0_0_var(--nb-shadow)]'
            : ''
        }`}
      >
        <div className="relative overflow-hidden bg-black">
          <div
            className="flex h-11 items-center gap-2 border-b-2 border-white/20 bg-black px-4 text-xs font-black tracking-[0.12em] text-white/80 uppercase"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="inline-block size-2.5 rounded-full border border-white/40 bg-(--nb-pink)" />
            <span className="inline-block size-2.5 rounded-full border border-white/40 bg-(--nb-yellow)" />
            <span className="inline-block size-2.5 rounded-full border border-white/40 bg-(--nb-mint)" />
            <span className="ml-2">{title}</span>
          </div>

          <button
            type="button"
            onClick={copy}
            className={`docs-code-copy-button absolute z-10 inline-flex items-center gap-2 border-2 border-black bg-(--nb-yellow) px-3.5 py-1.5 text-xs font-black tracking-[0.15em] text-black uppercase shadow-[3px_3px_0_0_#fff] transition-transform hover:-translate-y-0.5 hover:-rotate-2 focus-visible:outline-(--nb-focus-ring) focus-visible:outline-offset-(--nb-focus-ring-offset) ${
              isStandalone ? 'top-14 right-3' : 'top-3 right-3'
            }`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <DocsCodeCopyIcon className="size-4" />
            {copied ? 'Copied' : 'Copy'}
          </button>

          <div className="docs-code-block-pre relative">
            {html ? (
              <div
                className="docs-code-block-shiki"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <pre
                className="docs-code-block-fallback m-0 bg-black pl-16 pr-24 pt-6 pb-7 text-xs text-white"
                style={{ fontFamily: 'var(--font-mono)', lineHeight: '1rem' }}
              >
                <code>{code}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
