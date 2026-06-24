import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { ContactUsDialog } from './examples/ContactUsDialog';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/dialog';

const importCode = `import {
  Button,
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogActions,
  DialogClose,
  IconButton,
  Input,
  InputGroup,
  InputPrefix,
  Label,
  Select,
  SelectOption,
  Textarea,
} from 'neobrutalism-ui-react';`;

const contactUsExampleCode = `<Button style={{ '--nb-button-bg': '#fff' }} onClick={() => dialogRef.current?.open()}>
  Contact Us
</Button>
<Dialog ref={dialogRef}>
  <div className="relative bg-(--nb-field-bg) px-6 pt-7 pb-5 sm:px-10 sm:pt-9 sm:pb-6">
    <DialogClose aria-label="Close dialog" className="absolute right-6 top-6 ...">
      &times;
    </DialogClose>

    <span className="inline-block border-2 ...">Let's Talk</span>

    <DialogTitle className="mt-4 font-mono text-3xl font-black">
      Send us a message
    </DialogTitle>

    <DialogDescription className="mt-3 font-mono text-base font-medium">
      Fill in the form below and we'll get back to you as soon as possible.
    </DialogDescription>
  </div>

  <DialogContent className="border-y-0 bg-white px-6 pb-6 pt-4 sm:px-10">
    <form className="grid gap-5">...</form>
  </DialogContent>

  <DialogActions className="flex-col ... sm:flex-row">
    ...
  </DialogActions>
</Dialog>`;

const dialogPartsRows = [
  {
    name: 'Dialog',
    description: (
      <>
        Root component. Renders the native <code className="font-mono">&lt;dialog&gt;</code> modal.
        Exposes <code className="font-mono">open()</code> and <code className="font-mono">close()</code>{' '}
        for ref access.
      </>
    ),
  },
  {
    name: 'DialogTitle',
    description: 'Styles the dialog title when applied to a heading element.',
  },
  {
    name: 'DialogDescription',
    description: 'Muted supporting text below the title.',
  },
  {
    name: 'DialogContent',
    description: 'Scrollable body section with top and bottom borders.',
  },
  {
    name: 'DialogActions',
    description: 'Footer section with right-aligned action buttons.',
  },
  {
    name: 'DialogClose',
    description: 'Button that closes the dialog on click.',
  },
];

export function DialogPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Dialog</p>
          <h1>Dialog</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Dialog component — a brutalist modal built on the native{' '}
            <code className="font-mono">&lt;dialog&gt;</code> element. Compound API with SSR-safe
            open/close. Click the backdrop to dismiss.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">6</span>
            <span className="nb-stat-tile__label">Parts</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">SSR</span>
            <span className="nb-stat-tile__label">Safe</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">A11Y</span>
            <span className="nb-stat-tile__label">Native</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <p className="mb-4 text-sm font-medium">
          The snippet below mirrors the example markup used by the docs.
        </p>
        <DocsExample code={contactUsExampleCode}>
          <ContactUsDialog />
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={contactUsExampleCode} />
      </section>

      <DocsCustomizationTokens component="dialog" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable variant="parts" rows={dialogPartsRows} />
      </section>
    </article>
  );
}
