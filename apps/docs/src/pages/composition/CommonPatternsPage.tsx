import {
  Button,
  Callout,
  Chip,
  Cluster,
  Display,
  Section,
  Split,
  Stack,
  Surface,
  Text,
} from 'neobrutalism-ui-react';
import { DocsExample } from '@/docs/components/DocsExample';

const cardShellCode = `<Surface tone="cream" radius="xl" shadow="hard" border="strong" clip>
  <Section padding="lg" divider="bottom">
    <Cluster gap="sm" align="center" justify="between">
      <Display
        size="sm"
        underline="bar"
        underlineGap="xs"
        className="inline-flex flex-col items-start"
        style={{ '--nb-underline-width': '45%' } as React.CSSProperties}
      >
        Card title
      </Display>
      <Chip tone="mint">Active</Chip>
    </Cluster>
  </Section>

  <Section padding="lg">
    <Stack gap="md">
      <Text>Card content goes here.</Text>
      <Cluster gap="xs">
        <Chip tone="yellow">Tag one</Chip>
        <Chip tone="pink">Tag two</Chip>
      </Cluster>
    </Stack>
  </Section>

  <Section padding="lg" divider="top" layout="between" align="center">
    <Text tone="muted">Meta info</Text>
    <Button tone="yellow">Action</Button>
  </Section>
</Surface>`;

const toolbarCode = `<Cluster gap="sm" align="center" justify="between">
  <Display
    size="sm"
    underline="bar"
    underlineGap="xs"
    className="inline-flex flex-col items-start"
    style={{ '--nb-underline-width': '45%' } as React.CSSProperties}
  >
    Components
  </Display>

  <Cluster gap="xs">
    <Button size="sm" tone="white">Copy</Button>
    <Button size="sm" tone="black">Open</Button>
  </Cluster>
</Cluster>`;

const featureStackCode = `<Cluster gap="md">
  <Surface tone="yellow" padding="lg" radius="lg" shadow="hard" border="strong" className="flex-1 min-w-[160px]">
    <Stack gap="xs">
      <Text size="2xl" weight="black" leading="tight" underline="bar" underlineGap="xs" style={{ '--nb-underline-width': '45%' } as React.CSSProperties}>
        React native
      </Text>
      <Text size="sm">Component APIs, hooks-friendly.</Text>
    </Stack>
  </Surface>

  <Surface tone="mint" padding="lg" radius="lg" shadow="hard" border="strong" className="flex-1 min-w-[160px]">
    <Stack gap="xs">
      <Text size="2xl" weight="black" leading="tight" underline="bar" underlineGap="xs" style={{ '--nb-underline-width': '45%' } as React.CSSProperties}>
        Loud by default
      </Text>
      <Text size="sm">Chunky borders, punchy color.</Text>
    </Stack>
  </Surface>

  <Surface tone="pink" padding="lg" radius="lg" shadow="hard" border="strong" className="flex-1 min-w-[160px]">
    <Stack gap="xs">
      <Text size="2xl" weight="black" leading="tight" underline="bar" underlineGap="xs" style={{ '--nb-underline-width': '45%' } as React.CSSProperties}>
        Token driven
      </Text>
      <Text size="sm">CSS variables keep overrides local.</Text>
    </Stack>
  </Surface>
</Cluster>`;

const calloutPanelCode = `<Surface tone="cream" radius="xl" shadow="hard" border="strong" clip>
  <Section padding="lg" divider="bottom">
    <Cluster gap="sm" align="center" justify="between">
      <Display
        size="sm"
        underline="bar"
        underlineGap="xs"
        className="inline-flex flex-col items-start"
        style={{ '--nb-underline-width': '45%' } as React.CSSProperties}
      >
        Pricing
      </Display>
      <Chip tone="yellow">Early access</Chip>
    </Cluster>
  </Section>

  <Section padding="lg">
    <Stack gap="lg">
      <Callout tone="yellow" size="xl" shadow="hard">$49/mo</Callout>
      <Text>
        Everything included. No usage limits. Cancel any time.
      </Text>
      <Button tone="black" size="lg">Start free trial</Button>
    </Stack>
  </Section>
</Surface>`;

const twoColumnCode = `<Surface tone="lavender" radius="xl" shadow="hard" border="strong" clip>
  <Section padding="lg">
    <Split ratio="1:2" gap="lg" collapse="sm" align="center">
      <div className="flex aspect-square items-center justify-center border-3 border-(--nb-border) bg-(--nb-yellow) text-4xl font-black">
        42
      </div>

      <Stack gap="xs">
        <Display
          size="sm"
          underline="bar"
          underlineGap="xs"
          className="inline-flex flex-col items-start"
          style={{ '--nb-underline-width': '45%' } as React.CSSProperties}
        >
          Components shipped
        </Display>
        <Text tone="muted" size="sm">
          Fully composed, keyboard-ready, token-driven.
        </Text>
      </Stack>
    </Split>
  </Section>
</Surface>`;

const primitivesUsedCode = `<Surface tone="cream" padding="lg" radius="xl" shadow="hard" border="strong">
  <Stack gap="md">
    <Display
      size="sm"
      underline="bar"
      underlineGap="xs"
      className="inline-flex flex-col items-start"
      style={{ '--nb-underline-width': '45%' } as React.CSSProperties}
    >
      Primitives used
    </Display>

    <Cluster gap="xs">
      <Chip tone="yellow">Surface</Chip>
      <Chip tone="pink">Section</Chip>
      <Chip tone="mint">Split</Chip>
      <Chip tone="lavender">Stack</Chip>
      <Chip tone="blue">Cluster</Chip>
    </Cluster>
  </Stack>
</Surface>`;

const displayHeadingStyle = {
  '--nb-underline-width': '45%',
} as React.CSSProperties;

function FeatureCard({
  tone,
  title,
  description,
}: {
  tone: 'yellow' | 'mint' | 'pink';
  title: string;
  description: string;
}) {
  return (
    <Surface
      tone={tone}
      padding="lg"
      radius="lg"
      shadow="hard"
      border="strong"
      className="min-w-[160px] flex-1"
    >
      <Stack gap="xs">
        <Text
          size="2xl"
          weight="black"
          leading="tight"
          underline="bar"
          underlineGap="xs"
          style={displayHeadingStyle}
        >
          {title}
        </Text>
        <Text size="sm">{description}</Text>
      </Stack>
    </Surface>
  );
}

export function CommonPatternsPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <p className="eyebrow">Composition</p>
        <h1>Common Patterns</h1>
        <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          Copy-pasteable composition patterns built from neo-brutalism primitives.
          Each pattern shows the rendered output and the JSX — adjust
          tones, radii, and gaps to fit your context.
        </p>
      </header>

      <section id="card-shell" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Brutalist card shell
        </h2>
        <p className="mb-6 text-base font-medium">
          The fundamental pattern: Surface wraps, Sections divide, Stack and
          Cluster handle layout within each region.
        </p>

        <DocsExample code={cardShellCode}>
          <Surface
            tone="cream"
            radius="xl"
            shadow="hard"
            border="strong"
            clip
            className="w-full max-w-md"
          >
            <Section padding="lg" divider="bottom">
              <Cluster gap="sm" align="center" justify="between">
                <Display
                  size="sm"
                  underline="bar"
                  underlineGap="xs"
                  className="inline-flex flex-col items-start"
                  style={displayHeadingStyle}
                >
                  Card title
                </Display>
                <Chip tone="mint">Active</Chip>
              </Cluster>
            </Section>

            <Section padding="lg">
              <Stack gap="md">
                <Text>
                  Card content goes here. Use Stack to control rhythm and
                  Cluster to group inline items.
                </Text>
                <Cluster gap="xs">
                  <Chip tone="yellow">Tag one</Chip>
                  <Chip tone="pink">Tag two</Chip>
                </Cluster>
              </Stack>
            </Section>

            <Section padding="lg" divider="top" layout="between" align="center">
              <Text tone="muted">Meta info</Text>
              <Button type="button" tone="yellow">
                Action
              </Button>
            </Section>
          </Surface>
        </DocsExample>
      </section>

      <section id="toolbar-row" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Toolbar row
        </h2>
        <p className="mb-6 text-base font-medium">
          A heading and action group pushed apart. Use this inside a Surface
          section header or as a standalone toolbar.
        </p>

        <DocsExample code={toolbarCode}>
          <div className="w-full max-w-lg border-3 border-(--nb-border) bg-(--nb-paper) p-4 shadow-[3px_3px_0_0_var(--nb-shadow)]">
            <Cluster gap="sm" align="center" justify="between">
              <Display
                size="sm"
                underline="bar"
                underlineGap="xs"
                className="inline-flex flex-col items-start"
                style={displayHeadingStyle}
              >
                Components
              </Display>
              <Cluster gap="xs">
                <Button type="button" size="sm" tone="white">
                  Copy
                </Button>
                <Button type="button" size="sm" tone="black">
                  Open
                </Button>
              </Cluster>
            </Cluster>
          </div>
        </DocsExample>
      </section>

      <section id="feature-stack" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Feature card stack
        </h2>
        <p className="mb-6 text-base font-medium">
          Three loud feature cards in a Cluster that wraps on smaller screens.
          Each card is a Surface with Stack content.
        </p>

        <DocsExample code={featureStackCode}>
          <Cluster gap="md" justify="center" className="w-full">
            <FeatureCard
              tone="yellow"
              title="React native"
              description="Component APIs, hooks-friendly."
            />
            <FeatureCard
              tone="mint"
              title="Loud by default"
              description="Chunky borders, punchy color."
            />
            <FeatureCard
              tone="pink"
              title="Token driven"
              description="CSS variables keep overrides local."
            />
          </Cluster>
        </DocsExample>
      </section>

      <section id="callout-panel" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Callout panel
        </h2>
        <p className="mb-6 text-base font-medium">
          Combine <code className="font-mono">Callout</code> inside a Surface for
          an eye-catching notice or price highlight.
        </p>

        <DocsExample code={calloutPanelCode}>
          <Surface
            tone="cream"
            radius="xl"
            shadow="hard"
            border="strong"
            clip
            className="w-full max-w-md"
          >
            <Section padding="lg" divider="bottom">
              <Cluster gap="sm" align="center" justify="between">
                <Display
                  size="sm"
                  underline="bar"
                  underlineGap="xs"
                  className="inline-flex flex-col items-start"
                  style={displayHeadingStyle}
                >
                  Pricing
                </Display>
                <Chip tone="yellow">Early access</Chip>
              </Cluster>
            </Section>

            <Section padding="lg">
              <Stack gap="lg">
                <Callout tone="yellow" size="xl" shadow="hard">
                  $49/mo
                </Callout>
                <Text>Everything included. No usage limits. Cancel any time.</Text>
                <Button type="button" tone="black" size="lg">
                  Start free trial
                </Button>
              </Stack>
            </Section>
          </Surface>
        </DocsExample>
      </section>

      <section id="two-column-card" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Two-column card
        </h2>
        <p className="mb-6 text-base font-medium">
          A Surface with Split inside — the simplest media/content or
          stat/description pattern.
        </p>

        <DocsExample code={twoColumnCode}>
          <Surface
            tone="lavender"
            radius="xl"
            shadow="hard"
            border="strong"
            clip
            className="w-full max-w-xl"
          >
            <Section padding="lg">
              <Split ratio="1:2" gap="lg" collapse="sm" align="center">
                <div className="flex aspect-square items-center justify-center border-3 border-(--nb-border) bg-(--nb-yellow) text-4xl font-black">
                  42
                </div>
                <Stack gap="xs">
                  <Display
                    size="sm"
                    underline="bar"
                    underlineGap="xs"
                    className="inline-flex flex-col items-start"
                    style={displayHeadingStyle}
                  >
                    Components shipped
                  </Display>
                  <Text tone="muted" size="sm">
                    Fully composed, keyboard-ready, token-driven.
                  </Text>
                </Stack>
              </Split>
            </Section>
          </Surface>
        </DocsExample>
      </section>

      <section id="primitives-used-panel" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Primitives used panel
        </h2>
        <p className="mb-6 text-base font-medium">
          A reusable panel for documenting which primitives a recipe or
          component relies on.
        </p>

        <DocsExample code={primitivesUsedCode}>
          <Surface
            tone="cream"
            padding="lg"
            radius="xl"
            shadow="hard"
            border="strong"
            className="w-full max-w-md"
          >
            <Stack gap="md">
              <Display
                size="sm"
                underline="bar"
                underlineGap="xs"
                className="inline-flex flex-col items-start"
                style={displayHeadingStyle}
              >
                Primitives used
              </Display>
              <Cluster gap="xs">
                <Chip tone="yellow">Surface</Chip>
                <Chip tone="pink">Section</Chip>
                <Chip tone="mint">Split</Chip>
                <Chip tone="lavender">Stack</Chip>
                <Chip tone="blue">Cluster</Chip>
              </Cluster>
            </Stack>
          </Surface>
        </DocsExample>
      </section>
    </article>
  );
}
