import type { ReactNode } from 'react';
import { DocsApiTable } from './DocsApiTable';
import { DocsCodeBlock } from './DocsCodeBlock';
import { DocsCustomizationTokens } from './DocsCustomizationTokens';
import { DocsExample } from './DocsExample';
import { DocsSourceTile } from './DocsSourceTile';
import type { DocsTokenComponent } from '../docs-tokens-data';

export interface ComponentDocStat {
  value: string;
  label: string;
  tone: 'yellow' | 'mint' | 'pink' | 'lavender' | 'peach' | 'blue';
}

export interface ComponentDocSection {
  id: string;
  title: string;
  content?: ReactNode;
  example?: { preview: ReactNode; code: string };
  code?: string;
  codeTitle?: string;
}

export interface ComponentDocConfig {
  eyebrow: string;
  title: string;
  description: string;
  stats?: ComponentDocStat[];
  sourcePath: string;
  importCode: string;
  usageCode?: string;
  sections: ComponentDocSection[];
  customizationComponent?: DocsTokenComponent;
  apiRows?: Array<{ name: string; description: string }>;
  /** @deprecated Prefer apiRows */
  apiTokens?: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
  }>;
}

export function ComponentDocPage({ config }: { config: ComponentDocConfig }) {
  const usageTemplate = config.usageCode ?? config.sections.find((s) => s.example)?.example?.code ?? '';

  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>{config.eyebrow}</p>
          <h1>{config.title}</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">{config.description}</p>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {config.stats?.map((stat) => (
            <div key={stat.label} className={`nb-stat-tile nb-stat-tile--${stat.tone}`}>
              <span className="nb-stat-tile__value">{stat.value}</span>
              <span className="nb-stat-tile__label">{stat.label}</span>
            </div>
          ))}
          <DocsSourceTile href={config.sourcePath} />
        </div>
      </header>

      {config.sections.map((section) => (
        <section key={section.id} id={section.id}>
          <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
            {section.title}
          </h2>
          {section.content}
          {section.example && (
            <DocsExample code={section.example.code}>{section.example.preview}</DocsExample>
          )}
          {section.code && (
            <DocsCodeBlock
              className="mb-5 block"
              title={section.codeTitle}
              code={section.code}
            />
          )}
        </section>
      ))}

      {usageTemplate ? (
        <section id="usage">
          <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
            Usage
          </h2>
          <DocsCodeBlock className="mb-5 block" title="Import" code={config.importCode} />
          <DocsCodeBlock title="Template" code={usageTemplate} />
        </section>
      ) : null}

      {config.customizationComponent ? (
        <DocsCustomizationTokens component={config.customizationComponent} />
      ) : null}

      {config.apiRows && config.apiRows.length > 0 ? (
        <section id="api">
          <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
            API
          </h2>
          <DocsApiTable rows={config.apiRows} variant="parts" />
        </section>
      ) : null}

      {!config.apiRows?.length && config.apiTokens && config.apiTokens.length > 0 ? (
        <section id="api">
          <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
            API
          </h2>
          <DocsCodeBlock className="mb-5 block" title="Import" code={config.importCode} />
          <div className="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <table className="w-full min-w-160 border-collapse text-left text-sm">
              <thead className="bg-nb-secondary text-nb-secondary-fg">
                <tr>
                  <th className="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">
                    Prop
                  </th>
                  <th className="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">
                    Type
                  </th>
                  <th className="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="font-medium">
                {config.apiTokens.map((token) => (
                  <tr key={token.name} className="border-b border-(--nb-border)">
                    <td className="border-r border-(--nb-border) px-4 py-3 font-mono">
                      {token.name}
                    </td>
                    <td className="border-r border-(--nb-border) px-4 py-3 font-mono text-xs">
                      {token.type}
                    </td>
                    <td className="px-4 py-3">{token.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </article>
  );
}
