import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from 'neobrutalism-ui-react';
import { Link } from 'react-router-dom';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/resizable';

const installCode = `pnpm add neobrutalism-ui-react react-resizable-panels`;

const importCode = `import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<ResizablePanelGroup direction="horizontal" className="min-h-48 rounded-(--nb-radius) border-2 border-(--nb-border)">
  <ResizablePanel defaultSize={50} minSize={25}>
    <div className="flex h-full items-center justify-center bg-(--nb-mint) p-4 font-mono font-bold">
      Panel A
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50} minSize={25}>
    <div className="flex h-full items-center justify-center bg-(--nb-yellow) p-4 font-mono font-bold">
      Panel B
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`;

const verticalExampleCode = `<ResizablePanelGroup direction="vertical" className="min-h-64 rounded-(--nb-radius) border-2 border-(--nb-border)">
  <ResizablePanel defaultSize={40} minSize={20}>
    <div className="flex h-full items-center justify-center bg-(--nb-mint) p-4 font-mono font-bold">
      Header
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={60} minSize={30}>
    <div className="flex h-full items-center justify-center bg-(--nb-yellow) p-4 font-mono font-bold">
      Content
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`;

const collapsibleExampleCode = `<ResizablePanelGroup direction="horizontal" className="min-h-48 rounded-(--nb-radius) border-2 border-(--nb-border)">
  <ResizablePanel id="sidebar" defaultSize={25} minSize={15} collapsible>
    <div className="flex h-full items-center justify-center bg-(--nb-paper) p-4 font-mono text-sm font-bold">
      Collapsible sidebar — drag past minSize to collapse
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={75} minSize={40}>
    <div className="flex h-full items-center justify-center bg-(--nb-mint) p-4 font-mono font-bold">
      Editor
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`;

const persistExampleCode = `<ResizablePanelGroup
  autoSaveId="nb-docs-resizable-layout"
  direction="horizontal"
  className="min-h-48 rounded-(--nb-radius) border-2 border-(--nb-border)"
>
  <ResizablePanel defaultSize={35} minSize={20}>
    <div className="flex h-full items-center justify-center bg-(--nb-paper) p-4 font-mono text-sm font-bold">
      Tree
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={65} minSize={30}>
    <div className="flex h-full items-center justify-center bg-(--nb-yellow) p-4 font-mono font-bold">
      Canvas
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`;

const partsRows = [
  { name: 'ResizablePanelGroup', description: 'Flex container that holds panels and handles.' },
  { name: 'ResizablePanel', description: 'Single resizable region with size constraints.' },
  { name: 'ResizableHandle', description: 'Drag target between panels with brutalist grip.' },
];

const groupApiRows = [
  {
    name: 'direction',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Layout axis for panels and handle orientation.',
  },
  {
    name: 'autoSaveId',
    type: 'string | null',
    default: 'null',
    description: 'Persist panel sizes to localStorage under this id.',
  },
  {
    name: 'onLayout',
    type: '(sizes: number[]) => void',
    default: 'undefined',
    description: 'Called when panel sizes change.',
  },
];

const panelApiRows = [
  {
    name: 'defaultSize',
    type: 'number',
    default: 'undefined',
    description: 'Initial size percentage (uncontrolled).',
  },
  {
    name: 'minSize',
    type: 'number',
    default: '0',
    description: 'Minimum size percentage.',
  },
  {
    name: 'maxSize',
    type: 'number',
    default: '100',
    description: 'Maximum size percentage.',
  },
  {
    name: 'collapsible',
    type: 'boolean',
    default: 'false',
    description: 'Allow collapsing the panel to zero width.',
  },
];

const handleApiRows = [
  {
    name: 'withHandle',
    type: 'boolean',
    default: 'true',
    description: 'Show the yellow grip indicator on the handle.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevent dragging this handle.',
  },
];

const panelSurfaceClass =
  'flex h-full min-h-48 items-center justify-center p-4 font-mono font-bold';

function ResizablePreview() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-48 rounded-(--nb-radius) border-2 border-(--nb-border)"
    >
      <ResizablePanel defaultSize={50} minSize={25}>
        <div className={`${panelSurfaceClass} bg-(--nb-mint)`}>Panel A</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} minSize={25}>
        <div className={`${panelSurfaceClass} bg-(--nb-yellow)`}>Panel B</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function ResizableVerticalPreview() {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-64 rounded-(--nb-radius) border-2 border-(--nb-border)"
    >
      <ResizablePanel defaultSize={40} minSize={20}>
        <div className={`${panelSurfaceClass} bg-(--nb-mint)`}>Header</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60} minSize={30}>
        <div className={`${panelSurfaceClass} bg-(--nb-yellow)`}>Content</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function ResizableCollapsiblePreview() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-48 rounded-(--nb-radius) border-2 border-(--nb-border)"
    >
      <ResizablePanel id="sidebar" defaultSize={25} minSize={15} collapsible>
        <div className="flex h-full min-h-48 items-center justify-center bg-(--nb-paper) p-4 text-center font-mono text-sm font-bold">
          Collapsible sidebar — drag past minSize to collapse
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75} minSize={40}>
        <div className={`${panelSurfaceClass} bg-(--nb-mint)`}>Editor</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function ResizablePersistPreview() {
  return (
    <ResizablePanelGroup
      autoSaveId="nb-docs-resizable-layout"
      direction="horizontal"
      className="min-h-48 rounded-(--nb-radius) border-2 border-(--nb-border)"
    >
      <ResizablePanel defaultSize={35} minSize={20}>
        <div className="flex h-full min-h-48 items-center justify-center bg-(--nb-paper) p-4 font-mono text-sm font-bold">
          Tree
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={65} minSize={30}>
        <div className={`${panelSurfaceClass} bg-(--nb-yellow)`}>Canvas</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function ResizablePage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Resizable</p>
          <h1>Resizable</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Drag-to-resize panel layouts for editors, dashboards, and split views. Wraps{' '}
            <a
              href="https://github.com/bvaughn/react-resizable-panels"
              className="font-bold underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              react-resizable-panels
            </a>{' '}
            with neo-brutalist handles and keyboard-accessible resize targets.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">Drag</span>
            <span className="nb-stat-tile__label">Resize</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">2-up</span>
            <span className="nb-stat-tile__label">Split</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Drag the center handle to resize the two panels.
        </p>
        <DocsExample code={defaultExampleCode}>
          <ResizablePreview />
        </DocsExample>
      </section>

      <section id="when-to-use">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          When to Use
        </h2>
        <div className="max-w-3xl space-y-4 font-medium">
          <p>
            Use <strong>Resizable</strong> when users need adjustable workspace — code editors with
            a file tree, inbox layouts with a message list and detail pane, or docs with a table of
            contents beside content.
          </p>
          <p>
            For fixed proportional columns without drag handles, compose{' '}
            <Link to="/components/split" className="font-bold underline underline-offset-2">
              Split
            </Link>{' '}
            or CSS grid. Resizable adds persisted sizes and interactive adjustment.
          </p>
        </div>
      </section>

      <section id="dependencies">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Dependencies
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Resizable re-exports styled primitives from{' '}
          <code className="font-mono">react-resizable-panels</code>. Install it alongside the UI
          package.
        </p>
        <DocsCodeBlock title="Install" code={installCode} />
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Horizontal split" code={defaultExampleCode} />
      </section>

      <section id="vertical">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Vertical split
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Set <code className="font-mono">direction="vertical"</code> for stacked panels — useful for
          header / content layouts or preview panes above an editor.
        </p>
        <DocsExample code={verticalExampleCode}>
          <ResizableVerticalPreview />
        </DocsExample>
      </section>

      <section id="collapsible">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Collapsible panels
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Mark a panel with <code className="font-mono">collapsible</code> so users can drag it
          closed entirely. Pair with an <code className="font-mono">id</code> when coordinating
          imperative collapse from your app.
        </p>
        <DocsExample code={collapsibleExampleCode}>
          <ResizableCollapsiblePreview />
        </DocsExample>
      </section>

      <section id="persistence">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Persisted layout
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Pass <code className="font-mono">autoSaveId</code> to store panel sizes in{' '}
          <code className="font-mono">localStorage</code>. Reload this page and drag the handle —
          your split should restore on the next visit.
        </p>
        <DocsExample code={persistExampleCode}>
          <ResizablePersistPreview />
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="resizable" />

      <section id="accessibility">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Accessibility
        </h2>
        <ul className="list-disc space-y-2 pl-6 font-medium">
          <li>
            Handles are keyboard focusable — arrow keys resize panels when the handle is focused
            (provided by react-resizable-panels).
          </li>
          <li>Set meaningful <code className="font-mono">minSize</code> values so panels cannot be dragged unusably small.</li>
          <li>
            Pair with <code className="font-mono">autoSaveId</code> so users keep their preferred
            layout across sessions.
          </li>
        </ul>
      </section>

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>

        <h3 className="mt-6 mb-3 text-xl font-bold">Sub-parts</h3>
        <DocsApiTable rows={partsRows} variant="parts" minWidth="min-w-160" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">ResizablePanelGroup</code>
        </h3>
        <DocsApiTable rows={groupApiRows} variant="props-desc" minWidth="min-w-140" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">ResizablePanel</code>
        </h3>
        <DocsApiTable rows={panelApiRows} variant="props-desc" minWidth="min-w-140" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">ResizableHandle</code>
        </h3>
        <DocsApiTable rows={handleApiRows} variant="props-desc" minWidth="min-w-140" />
      </section>
    </article>
  );
}
