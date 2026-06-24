import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { JobListingCard } from './examples/JobListingCard';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/card';

const importCode = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardActions,
  CardContent,
  CardFooter,
} from 'neobrutalism-ui-react';`;

const templateCode = `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardActions>
    <Button>Action</Button>
  </CardActions>
</Card>`;

const actionsExampleCode = `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm">
      Check your inbox for the latest updates from your team.
    </p>
  </CardContent>
  <CardActions align="end">
    <Button size="sm" tone="background">Mark all read</Button>
    <Button size="sm">Open inbox</Button>
  </CardActions>
</Card>`;

const partsRows = [
  { name: 'Card', description: 'Root container with border, shadow, and background' },
  { name: 'CardHeader', description: 'Top section for title and description content' },
  { name: 'CardTitle', description: 'Heading text inside the header' },
  { name: 'CardDescription', description: 'Subtitle or description text inside the header' },
  { name: 'CardActions', description: 'Action row for one or more card-level commands' },
  { name: 'CardContent', description: 'Main body area' },
  { name: 'CardFooter', description: 'Bottom section for metadata, summaries, and supporting layout' },
];

export function CardPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Card</p>
          <h1>Card</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Card component. A bold content block with header, content, and
            footer slots wrapped in thick borders and an offset shadow.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">7</span>
            <span className="nb-stat-tile__label">Parts</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">SLOT</span>
            <span className="nb-stat-tile__label">Composable</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">∞</span>
            <span className="nb-stat-tile__label">Layouts</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <p className="mb-4 text-sm font-medium">
          The live demo is a styled composition showcase. The Code tab below shows the underlying
          card primitive usage; see the{' '}
          <a
            className="underline"
            href="https://github.com/rahmatez/neo-brutalism-react/blob/main/apps/docs/src/pages/components/examples/JobListingCard.tsx"
            target="_blank"
            rel="noreferrer"
          >
            example source
          </a>{' '}
          for the full implementation.
        </p>
        <DocsExample code={templateCode}>
          <JobListingCard />
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={templateCode} />
      </section>

      <section id="parts">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Sub-parts
        </h2>
        <p className="mb-4 text-sm font-medium">
          The card component is composed of 7 sub-parts that can be used independently.
        </p>
        <DocsApiTable variant="parts" rows={partsRows} />
      </section>

      <section id="actions">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Actions
        </h2>
        <p className="mb-4 text-sm font-medium">
          Use <code className="font-mono text-sm">&lt;CardActions&gt;</code> for card-level commands.
          It can sit directly under the card or inside the footer when the footer also contains
          supporting metadata.
        </p>
        <DocsExample code={actionsExampleCode}>
          <Card className="notifications-demo w-full max-w-sm">
            <CardHeader className="max-sm:px-4!">
              <CardTitle>
                <h2 className="mt-0!">Notifications</h2>
              </CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent className="max-sm:px-4!">
              <p className="text-sm">
                Check your inbox for the latest updates from your team.
              </p>
            </CardContent>
            <CardActions align="end" className="gap-2! max-sm:px-3!">
              <Button size="sm" tone="background">
                Mark all read
              </Button>
              <Button size="sm">Open inbox</Button>
            </CardActions>
          </Card>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="card" />

      <style>{`
        .notifications-demo [data-slot='card-title'] h2 {
          max-width: 100%;
          overflow-wrap: anywhere;
        }
        .notifications-demo [data-slot='card-actions'] {
          flex-wrap: nowrap;
        }
        @media (max-width: 480px) {
          .notifications-demo [data-slot='card-title'] h2 {
            padding: 0.25rem 0.55rem;
            font-size: 1.125rem;
            letter-spacing: 0;
          }
        }
        @media (max-width: 374px) {
          .notifications-demo [data-slot='card-actions'] {
            flex-wrap: wrap;
            justify-content: stretch;
          }
          .notifications-demo [data-slot='card-actions'] button {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </article>
  );
}
