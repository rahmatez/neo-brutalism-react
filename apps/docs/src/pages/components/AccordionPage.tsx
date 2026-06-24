import { useState, type CSSProperties } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/accordion';

const importCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'neobrutalism-ui-react';`;

const exampleCode = `<Accordion className="block w-full max-w-xl" collapsible>
  <AccordionItem>
    <AccordionTrigger>Lorem, ipsum dolor.</AccordionTrigger>
    <AccordionContent>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem>
    <AccordionTrigger>Lorem ipsum dolor sit amet consectetur.</AccordionTrigger>
    <AccordionContent>
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

const singleCollapsibleCode = `<Accordion collapsible className="block w-full max-w-xl">
  <AccordionItem value="only">
    <AccordionTrigger>Single collapsible panel</AccordionTrigger>
    <AccordionContent>
      Click the trigger again to collapse this panel when collapsible is enabled.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

const multipleExampleCode = `<Accordion
  className="block w-full max-w-xl"
  type="multiple"
  defaultValue={['item-1']}
>
  <AccordionItem value="item-1">
    <AccordionTrigger>Can multiple panels open?</AccordionTrigger>
    <AccordionContent>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>Can panels start open?</AccordionTrigger>
    <AccordionContent>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

const defaultOpenCode = `<Accordion collapsible className="block w-full max-w-xl" defaultValue="overview">
  <AccordionItem value="overview">
    <AccordionTrigger>Overview</AccordionTrigger>
    <AccordionContent>
      This panel starts open via the defaultValue prop.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="details">
    <AccordionTrigger>Details</AccordionTrigger>
    <AccordionContent>
      Duis aute irure dolor in reprehenderit in voluptate velit.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

const controlledExampleCode = `const [value, setValue] = useState<string | string[] | null>('overview');

<div className="flex w-full max-w-xl flex-col gap-4">
  <div className="flex flex-wrap gap-3">
    <Button
      size="sm"
      tone="background"
      type="button"
      style={{ '--nb-button-bg': 'var(--nb-warning)' }}
      onClick={() => setValue('overview')}
    >
      Overview
    </Button>
    <Button
      size="sm"
      tone="background"
      type="button"
      style={{ '--nb-button-bg': 'var(--nb-success)' }}
      onClick={() => setValue('details')}
    >
      Details
    </Button>
    <Button
      size="sm"
      tone="background"
      type="button"
      style={{ '--nb-button-bg': 'var(--nb-primary)' }}
      onClick={() => setValue(null)}
    >
      Collapse All
    </Button>
  </div>

  <Accordion value={value} onValueChange={setValue}>
    <AccordionItem value="overview">
      <AccordionTrigger style={{ '--nb-accordion-trigger-bg': '#b8a4ff' }}>
        Overview
      </AccordionTrigger>
      <AccordionContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="details">
      <AccordionTrigger style={{ '--nb-accordion-trigger-bg': '#b8a4ff' }}>
        Details
      </AccordionTrigger>
      <AccordionContent>
        Duis aute irure dolor in reprehenderit in voluptate velit.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>`;

const disabledExampleCode = `<Accordion collapsible className="block w-full max-w-xl" defaultValue="enabled">
  <AccordionItem value="enabled">
    <AccordionTrigger>Enabled item</AccordionTrigger>
    <AccordionContent>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="disabled" disabled>
    <AccordionTrigger>Disabled item</AccordionTrigger>
    <AccordionContent>
      Excepteur sint occaecat cupidatat non proident.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

const accordionApiRows = [
  { name: 'type', type: "'single' | 'multiple'", default: "'single'" },
  { name: 'collapsible', type: 'boolean', default: 'false' },
  { name: 'value', type: 'string | string[] | null', default: 'null' },
  { name: 'defaultValue', type: 'string | string[] | null', default: 'null' },
  { name: 'onValueChange', type: '(value: string | string[] | null) => void', default: 'undefined' },
];

const accordionItemApiRows = [
  { name: 'value', type: 'string', default: 'generated' },
  { name: 'disabled', type: 'boolean', default: 'false' },
];

const accordionPartsRows = [
  {
    name: 'AccordionTrigger',
    description: 'Toggles its parent item open or closed. Has no props beyond standard element attributes.',
  },
  {
    name: 'AccordionContent',
    description: 'Collapsible body region for an item. Has no props beyond standard element attributes.',
  },
];

function ControlledAccordionExample() {
  const [value, setValue] = useState<string | string[] | null>('overview');

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <Button
          size="sm"
          tone="background"
          type="button"
          style={{ '--nb-button-bg': 'var(--nb-warning)' } as CSSProperties}
          onClick={() => setValue('overview')}
        >
          Overview
        </Button>
        <Button
          size="sm"
          tone="background"
          type="button"
          style={{ '--nb-button-bg': 'var(--nb-success)' } as CSSProperties}
          onClick={() => setValue('details')}
        >
          Details
        </Button>
        <Button
          size="sm"
          tone="background"
          type="button"
          style={{ '--nb-button-bg': 'var(--nb-primary)' } as CSSProperties}
          onClick={() => setValue(null)}
        >
          Collapse All
        </Button>
      </div>

      <Accordion value={value} onValueChange={setValue}>
        <AccordionItem value="overview">
          <AccordionTrigger style={{ '--nb-accordion-trigger-bg': '#b8a4ff' } as CSSProperties}>
            Overview
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="details">
          <AccordionTrigger style={{ '--nb-accordion-trigger-bg': '#b8a4ff' } as CSSProperties}>
            Details
          </AccordionTrigger>
          <AccordionContent>
            Duis aute irure dolor in reprehenderit in voluptate velit.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function AccordionPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Accordion</p>
          <h1>Accordion</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Accordion component. A vertically stacked set of interactive
            headings that reveal related content panels with native button semantics, ARIA state, and
            brutalist borders.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">4</span>
            <span className="nb-stat-tile__label">Parts</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">A11y</span>
            <span className="nb-stat-tile__label">ARIA-ready</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">∞</span>
            <span className="nb-stat-tile__label">Items</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={exampleCode}>
          <Accordion className="block w-full max-w-xl" collapsible>
            <AccordionItem>
              <AccordionTrigger>Lorem, ipsum dolor.</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem>
              <AccordionTrigger>Lorem ipsum dolor sit amet consectetur.</AccordionTrigger>
              <AccordionContent>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={exampleCode} />
      </section>

      <section id="single-collapsible">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Single collapsible
        </h2>
        <DocsExample code={singleCollapsibleCode}>
          <Accordion collapsible className="block w-full max-w-xl">
            <AccordionItem value="only">
              <AccordionTrigger>Single collapsible panel</AccordionTrigger>
              <AccordionContent>
                Click the trigger again to collapse this panel when collapsible is enabled.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DocsExample>
      </section>

      <section id="multiple">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Multiple
        </h2>
        <DocsExample code={multipleExampleCode}>
          <Accordion
            className="block w-full max-w-xl"
            type="multiple"
            defaultValue={['item-1']}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Can multiple panels open?</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Can panels start open?</AccordionTrigger>
              <AccordionContent>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DocsExample>
      </section>

      <section id="controlled">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Controlled
        </h2>
        <DocsExample code={controlledExampleCode}>
          <ControlledAccordionExample />
        </DocsExample>
      </section>

      <section id="disabled-item">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Disabled item
        </h2>
        <DocsExample code={disabledExampleCode}>
          <Accordion collapsible className="block w-full max-w-xl" defaultValue="enabled">
            <AccordionItem value="enabled">
              <AccordionTrigger>Enabled item</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="disabled" disabled>
              <AccordionTrigger>Disabled item</AccordionTrigger>
              <AccordionContent>
                Excepteur sint occaecat cupidatat non proident.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DocsExample>
      </section>

      <section id="default-open">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Default opened item
        </h2>
        <DocsExample code={defaultOpenCode}>
          <Accordion collapsible className="block w-full max-w-xl" defaultValue="overview">
            <AccordionItem value="overview">
              <AccordionTrigger>Overview</AccordionTrigger>
              <AccordionContent>
                This panel starts open via the defaultValue prop.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="details">
              <AccordionTrigger>Details</AccordionTrigger>
              <AccordionContent>
                Duis aute irure dolor in reprehenderit in voluptate velit.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="accordion" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <h3 className="mt-6 mb-3 text-xl font-bold">Accordion</h3>
        <DocsApiTable rows={accordionApiRows} />
        <h3 className="mt-8 mb-3 text-xl font-bold">Accordion Item</h3>
        <DocsApiTable rows={accordionItemApiRows} />
        <h3 className="mt-8 mb-3 text-xl font-bold">Parts</h3>
        <DocsApiTable rows={accordionPartsRows} variant="parts" />
      </section>
    </article>
  );
}
