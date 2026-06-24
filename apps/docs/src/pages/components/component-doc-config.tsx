import type { ReactNode } from 'react';
import type {
  ComponentDocConfig,
  ComponentDocStat,
} from '@/docs/components/ComponentDocPage';
import type { DocsTokenComponent } from '@/docs/docs-tokens-data';

const GITHUB_BASE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components';

export interface FullDocVariant {
  id: string;
  title: string;
  preview: ReactNode;
  code: string;
}

export interface FullDocOptions {
  slug: string;
  title: string;
  description: string;
  preview: ReactNode;
  usageCode: string;
  importNames?: string;
  variants?: FullDocVariant[];
  apiRows?: Array<{ name: string; description: string }>;
  customizationComponent?: DocsTokenComponent;
  stats?: ComponentDocStat[];
}

export function fullDoc({
  slug,
  title,
  description,
  preview,
  usageCode,
  importNames,
  variants = [],
  apiRows,
  customizationComponent,
  stats,
}: FullDocOptions): ComponentDocConfig {
  const imports = importNames ?? title.replace(/\s+/g, '');
  return {
    eyebrow: `Neo-Brutalist React ${title}`,
    title,
    description,
    stats: stats ?? [
      { value: 'A11y', label: 'Semantics', tone: 'mint' },
      { value: 'TW4', label: 'Token-driven', tone: 'yellow' },
    ],
    sourcePath: `${GITHUB_BASE}/${slug}`,
    importCode: `import { ${imports} } from 'neobrutalism-ui-react';`,
    usageCode,
    customizationComponent,
    apiRows,
    sections: [
      { id: 'preview', title: 'Preview', example: { preview, code: usageCode } },
      ...variants.map((variant) => ({
        id: variant.id,
        title: variant.title,
        example: { preview: variant.preview, code: variant.code },
      })),
    ],
  };
}

export function plannedDoc(title: string, description: string): ComponentDocConfig {
  return {
    eyebrow: `Neo-Brutalist React ${title}`,
    title,
    description,
    stats: [{ value: 'Soon', label: 'Planned', tone: 'lavender' }],
    sourcePath: GITHUB_BASE,
    importCode: `// ${title} — planned for a future release`,
    sections: [
      {
        id: 'preview',
        title: 'Status',
        content: (
          <p className="text-base font-medium">
            {description} Track progress in the{' '}
            <a href="https://github.com/rahmatez/neo-brutalism-react" className="underline">
              GitHub repository
            </a>
            .
          </p>
        ),
      },
    ],
  };
}

export const PLANNED_COMPONENT_SLUGS = new Set<string>();
