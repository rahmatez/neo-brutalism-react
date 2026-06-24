import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from 'neobrutalism-ui-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { ChartAreaStacked } from '@/chart-examples/area-stacked';
import { ChartBarDefault } from '@/chart-examples/bar-default';
import { ChartBarHorizontal } from '@/chart-examples/bar-horizontal';
import { ChartLineInteractive } from '@/chart-examples/line-interactive';
import { ChartLineMultiple } from '@/chart-examples/line-multiple';
import { ChartPieDonut } from '@/chart-examples/pie-donut';
import { ChartPieLegend } from '@/chart-examples/pie-legend';
import { ChartTooltipAdvanced } from '@/chart-examples/tooltip-advanced';
import {
  areaStackedCode,
  barDefaultCode,
  barHorizontalCode,
  installCode,
  installNoteCode,
  lineInteractiveCode,
  lineMultipleCode,
  pieDonutCode,
  pieLegendCode,
  tooltipAdvancedCode,
} from './chart-page-codes';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/chart';

const importCode = `import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from 'neobrutalism-ui-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';`;

const usageCode = `const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--nb-chart-1)',
  },
} satisfies ChartConfig;

const chartData = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
];

<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
  </BarChart>
</ChartContainer>`;

const chartData = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--nb-chart-1)',
  },
} satisfies ChartConfig;

function ChartPreview() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[220px] w-full max-w-lg">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={6} />
      </BarChart>
    </ChartContainer>
  );
}

const chartPartsRows = [
  {
    name: 'ChartContainer',
    description:
      'Root wrapper: provides config context, injects --color-* CSS variables, and renders Recharts ResponsiveContainer.',
  },
  {
    name: 'ChartStyle',
    description:
      'Internal style tag that maps ChartConfig colors to --color-{key} per light/dark theme selector.',
  },
  {
    name: 'ChartTooltip',
    description: 'Recharts Tooltip re-export. Pass ChartTooltipContent as content for neo-brutalist styling.',
  },
  {
    name: 'ChartTooltipContent',
    description:
      'Custom tooltip body with hard shadow, series indicators (dot / line / dashed), and config-driven labels.',
  },
  {
    name: 'ChartLegend',
    description: 'Recharts Legend re-export. Pair with ChartLegendContent for token-aware legend rows.',
  },
  {
    name: 'ChartLegendContent',
    description: 'Legend renderer that resolves labels and color swatches from ChartConfig.',
  },
  {
    name: 'useChart',
    description: 'Hook to read the active ChartConfig inside custom tooltip or legend renderers.',
  },
];

const chartContainerApiRows = [
  {
    name: 'config',
    type: 'ChartConfig',
    description: 'Required. Maps data keys to label, optional icon, and color or light/dark theme colors.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Size and layout overrides. Defaults include aspect-video; use min-h-[…] for dashboards.',
  },
  {
    name: 'initialDimension',
    type: '{ width: number; height: number }',
    default: '320 × 200',
    description: 'Placeholder size for ResponsiveContainer before layout measurement (SSR-friendly).',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Optional stable id for the data-chart attribute and injected CSS variables.',
  },
];

const chartConfigApiRows = [
  {
    name: '[seriesKey].label',
    type: 'ReactNode',
    description: 'Human-readable name shown in tooltips and legends.',
  },
  {
    name: '[seriesKey].color',
    type: 'string',
    description: 'CSS color or var(--nb-chart-N). Becomes --color-{seriesKey} inside the container.',
  },
  {
    name: '[seriesKey].theme',
    type: '{ light: string; dark: string }',
    description: 'Per-theme colors when color alone is not enough (uses .dark selector).',
  },
  {
    name: '[seriesKey].icon',
    type: 'ComponentType',
    description: 'Optional Lucide or custom icon rendered in tooltip/legend instead of a color swatch.',
  },
];

const tooltipContentApiRows = [
  {
    name: 'indicator',
    type: "'dot' | 'line' | 'dashed'",
    default: "'dot'",
    description: 'Swatch style beside each series row.',
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    default: 'false',
    description: 'Suppress the shared axis/category label row.',
  },
  {
    name: 'hideIndicator',
    type: 'boolean',
    default: 'false',
    description: 'Hide color swatches (useful with a custom formatter).',
  },
  {
    name: 'nameKey',
    type: 'string',
    description: 'Payload field used to resolve ChartConfig entries for each series.',
  },
  {
    name: 'labelKey',
    type: 'string',
    description: 'Alternate key for the shared tooltip label row.',
  },
  {
    name: 'labelFormatter',
    type: '(value, payload) => ReactNode',
    description: 'Format the shared label (e.g. date strings).',
  },
  {
    name: 'formatter',
    type: '(value, name, item, index, payload) => ReactNode',
    description: 'Fully custom row content; receives Recharts tooltip payload items.',
  },
  {
    name: 'color',
    type: 'string',
    description: 'Override indicator color for all rows.',
  },
];

const legendContentApiRows = [
  {
    name: 'nameKey',
    type: 'string',
    description: 'Payload field that maps pie slices (or series) to ChartConfig keys.',
  },
  {
    name: 'hideIcon',
    type: 'boolean',
    default: 'false',
    description: 'Hide config icons and show only color swatches.',
  },
  {
    name: 'verticalAlign',
    type: "'top' | 'bottom'",
    default: "'bottom'",
    description: 'Adjusts legend padding relative to the chart.',
  },
];

const themeRows = [
  { token: '--nb-chart-1 … --nb-chart-5', role: 'Default series palette (mint, pink, lavender, yellow, blue).' },
  { token: '--nb-chart-muted', role: 'Tooltip cursor and radial bar backgrounds.' },
  { token: '--nb-chart-muted-foreground', role: 'Axis tick labels.' },
  { token: '--nb-chart-grid', role: 'Cartesian and polar grid lines.' },
  { token: '--nb-chart-active-dot', role: 'Active point fill on area/line charts.' },
  { token: '--color-{key}', role: 'Per-series color injected by ChartContainer from config.' },
];

export function ChartPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Chart</p>
          <h1>Chart</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Composable chart primitives built on Recharts with neo-brutalist tooltips, token-driven
            palettes, and 40+ ready-made examples. Wrap any Recharts chart in{' '}
            <code className="font-mono text-sm">ChartContainer</code>, declare a{' '}
            <code className="font-mono text-sm">ChartConfig</code>, and use{' '}
            <code className="font-mono text-sm">var(--color-*)</code> fills — the same ergonomic
            pattern as shadcn/ui, styled for hard borders and loud shadows.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">Recharts</span>
            <span className="nb-stat-tile__label">v2 composable</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">40+</span>
            <span className="nb-stat-tile__label">Examples</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">A11y</span>
            <span className="nb-stat-tile__label">accessibilityLayer</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={usageCode}>
          <ChartPreview />
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <p className="mb-4 max-w-3xl text-base font-medium">
          Map each data series in <code className="font-mono text-sm">ChartConfig</code>, then reference{' '}
          <code className="font-mono text-sm">var(--color-desktop)</code> (or your key) on Recharts{' '}
          <code className="font-mono text-sm">fill</code> / <code className="font-mono text-sm">stroke</code>{' '}
          props. See <a href="#dependencies" className="underline">Dependencies</a> for installing Recharts.
        </p>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Bar chart" code={usageCode} />
      </section>

      <section id="dependencies">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Dependencies
        </h2>
        <p className="mb-4 max-w-3xl text-base font-medium">
          Chart primitives ship with <strong>neobrutalism-ui-react</strong> but render through{' '}
          <strong>Recharts</strong>, which is a required peer dependency. Install both in your app:
        </p>
        <DocsCodeBlock className="mb-5 block" title="Install" code={installCode} />
        <DocsCodeBlock title="Peer dependency" code={installNoteCode} />
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm font-medium">
          <li>
            Supported range: <code className="font-mono">recharts@^2.13.0</code> (docs and examples
            pin <code className="font-mono">2.15.x</code>).
          </li>
          <li>
            Import chart types directly from <code className="font-mono">recharts</code> (
            <code className="font-mono">BarChart</code>, <code className="font-mono">Line</code>,{' '}
            <code className="font-mono">PieChart</code>, etc.) — only wrappers come from this library.
          </li>
          <li>
            For SSR, set <code className="font-mono">initialDimension</code> on{' '}
            <code className="font-mono">ChartContainer</code> so{' '}
            <code className="font-mono">ResponsiveContainer</code> has a non-zero size before hydration.
          </li>
          <li>
            Recharts adds meaningful bundle weight; lazy-load chart routes in production apps when possible.
          </li>
        </ul>
      </section>

      <section id="bar">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Bar charts
        </h2>
        <p className="mb-4 max-w-3xl text-base font-medium">
          Vertical and horizontal bars with neo-brutalist tooltips. More variants (stacked, mixed,
          labels) live in <code className="font-mono">chart-examples/</code>.
        </p>
        <div className="grid gap-8 xl:grid-cols-2">
          <DocsExample code={barDefaultCode}>
            <ChartBarDefault />
          </DocsExample>
          <DocsExample code={barHorizontalCode}>
            <ChartBarHorizontal />
          </DocsExample>
        </div>
      </section>

      <section id="line">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Line charts
        </h2>
        <p className="mb-4 max-w-3xl text-base font-medium">
          Multiple series and card-embedded interactive filters with config-driven stroke colors.
        </p>
        <div className="grid gap-8">
          <DocsExample code={lineMultipleCode}>
            <ChartLineMultiple />
          </DocsExample>
          <DocsExample code={lineInteractiveCode}>
            <ChartLineInteractive />
          </DocsExample>
        </div>
      </section>

      <section id="area">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Area charts
        </h2>
        <p className="mb-4 max-w-3xl text-base font-medium">
          Stacked areas with shared stackId and active dots using{' '}
          <code className="font-mono text-sm">--nb-chart-active-dot</code>.
        </p>
        <DocsExample code={areaStackedCode}>
          <ChartAreaStacked />
        </DocsExample>
      </section>

      <section id="pie">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Pie &amp; donut
        </h2>
        <p className="mb-4 max-w-3xl text-base font-medium">
          Donut inner radius, per-slice fills via <code className="font-mono text-sm">var(--color-*)</code>,
          and legends resolved through <code className="font-mono text-sm">ChartLegendContent</code>.
        </p>
        <div className="grid gap-8 xl:grid-cols-2">
          <DocsExample code={pieDonutCode}>
            <ChartPieDonut />
          </DocsExample>
          <DocsExample code={pieLegendCode}>
            <ChartPieLegend />
          </DocsExample>
        </div>
      </section>

      <section id="tooltips">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Tooltips
        </h2>
        <p className="mb-4 max-w-3xl text-base font-medium">
          Custom <code className="font-mono text-sm">formatter</code> rows, totals, and stacked bar
          highlights with <code className="font-mono text-sm">defaultIndex</code>.
        </p>
        <DocsExample code={tooltipAdvancedCode}>
          <ChartTooltipAdvanced />
        </DocsExample>
      </section>

      <section id="theme">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Theme tokens
        </h2>
        <p className="mb-4 max-w-3xl text-base font-medium">
          Override chart palette and chrome in <code className="font-mono text-sm">theme.css</code> or
          your app root. Series colors can also point at any CSS variable in{' '}
          <code className="font-mono text-sm">ChartConfig</code>.
        </p>
        <div className="overflow-x-auto border-2 border-(--nb-border) shadow-[4px_4px_0_0_var(--nb-shadow)]">
          <table className="w-full min-w-lg border-collapse text-left text-sm font-medium">
            <thead className="border-b-2 border-(--nb-border) bg-(--nb-mint)">
              <tr>
                <th className="px-4 py-3 font-black uppercase">Token</th>
                <th className="px-4 py-3 font-black uppercase">Role</th>
              </tr>
            </thead>
            <tbody>
              {themeRows.map((row) => (
                <tr key={row.token} className="border-b border-(--nb-border) last:border-b-0">
                  <td className="px-4 py-3 font-mono text-xs">{row.token}</td>
                  <td className="px-4 py-3">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <DocsCustomizationTokens component="chart" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>

        <h3 data-docs-heading className="mt-8 mb-3 text-xl font-bold">
          Sub-parts
        </h3>
        <p className="mb-4 max-w-3xl text-sm font-medium">
          Chart is a thin wrapper layer on Recharts — compose these parts with any{' '}
          <code className="font-mono text-sm">*Chart</code> primitive from{' '}
          <code className="font-mono text-sm">recharts</code>.
        </p>
        <DocsApiTable variant="parts" rows={chartPartsRows} minWidth="min-w-120" />

        <h3 data-docs-heading className="mt-10 mb-3 text-xl font-bold">
          ChartContainer
        </h3>
        <DocsApiTable variant="props-desc" rows={chartContainerApiRows} />

        <h3 data-docs-heading className="mt-10 mb-3 text-xl font-bold">
          ChartConfig
        </h3>
        <DocsApiTable variant="props-desc" rows={chartConfigApiRows} />

        <h3 data-docs-heading className="mt-10 mb-3 text-xl font-bold">
          ChartTooltipContent
        </h3>
        <DocsApiTable variant="props-desc" rows={tooltipContentApiRows} />

        <h3 data-docs-heading className="mt-10 mb-3 text-xl font-bold">
          ChartLegendContent
        </h3>
        <DocsApiTable variant="props-desc" rows={legendContentApiRows} />

        <p className="mt-6 max-w-3xl text-sm font-medium">
          Full example source lives under{' '}
          <code className="font-mono">apps/docs/src/chart-examples/</code> — bar, line,
          area, pie, and tooltip variants you can copy into dashboards or admin panels.
        </p>
      </section>
    </article>
  );
}
