import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import langBash from 'shiki/langs/bash.mjs';
import langCss from 'shiki/langs/css.mjs';
import langHtml from 'shiki/langs/html.mjs';
import langJson from 'shiki/langs/json.mjs';
import langTsx from 'shiki/langs/tsx.mjs';
import langTypescript from 'shiki/langs/typescript.mjs';
import themeNord from 'shiki/themes/nord.mjs';
import type { HighlightLanguage } from './highlight-language';

const LANG_ALIASES: Partial<Record<HighlightLanguage, string>> = {
  shell: 'bash',
  ts: 'typescript',
};

let highlighterPromise: Promise<HighlighterCore> | null = null;

function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [themeNord],
      langs: [langBash, langTypescript, langTsx, langCss, langJson, langHtml],
      engine: createOnigurumaEngine(() => import('shiki/wasm')),
    });
  }
  return highlighterPromise;
}

export async function highlightCode(
  code: string,
  language: HighlightLanguage = 'tsx',
): Promise<string> {
  const highlighter = await getHighlighter();
  const lang = LANG_ALIASES[language] ?? language;
  return highlighter.codeToHtml(code, {
    lang,
    theme: 'nord',
  });
}
