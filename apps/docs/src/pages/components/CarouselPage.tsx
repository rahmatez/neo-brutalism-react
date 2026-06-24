import {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Surface,
  Text,
  Title,
} from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/carousel';

const importCode = `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
} from 'neobrutalism-ui-react';`;

const basicCode = `<Carousel className="max-w-lg">
  <CarouselContent>
    <CarouselItem label="Slide 1">...</CarouselItem>
    <CarouselItem label="Slide 2">...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
  <CarouselIndicators />
</Carousel>`;

const loopCode = `<Carousel opts={{ loop: true }} autoplay={4000} className="max-w-lg">
  ...
</Carousel>`;

const slides = [
  { title: 'Build loud', body: 'Bold borders, hard shadows, zero timid UI.', tone: 'mint' as const },
  { title: 'Stay sharp', body: 'Composable primitives you style with tokens.', tone: 'lavender' as const },
  { title: 'Ship fast', body: 'Scroll-snap carousel with no extra dependencies.', tone: 'yellow' as const },
];

function CarouselDemo({ loop = false, autoplay = false }: { loop?: boolean; autoplay?: number | false }) {
  return (
    <Carousel
      className="max-w-lg"
      opts={loop ? { loop: true } : undefined}
      autoplay={autoplay}
      tabIndex={0}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={slide.title} label={`Slide ${index + 1}: ${slide.title}`}>
            <Surface tone={slide.tone} padding="lg" className="mx-1 min-h-48">
              <Title className="text-xl">
                {slide.title}
              </Title>
              <Text size="md" weight="medium" className="mt-3">
                {slide.body}
              </Text>
            </Surface>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  );
}

const carouselApiRows = [
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Scroll axis.' },
  { name: 'opts.loop', type: 'boolean', default: 'false', description: 'Wrap from last slide to first.' },
  { name: 'opts.align', type: "'start' | 'center'", default: "'start'", description: 'Active slide detection alignment.' },
  { name: 'autoplay', type: 'number | false', default: 'false', description: 'Auto-advance interval in ms.' },
  { name: 'pauseOnHover', type: 'boolean', default: 'true', description: 'Pause autoplay while hovered.' },
  { name: 'setApi', type: '(api: CarouselApi) => void', description: 'Receive imperative scroll API.' },
];

export function CarouselPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Carousel</p>
          <h1>Carousel</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A scroll-snap carousel with previous/next controls, dot indicators, keyboard navigation,
            optional loop and autoplay — built on native overflow scrolling with neo-brutalist
            chrome. No Embla or Swiper dependency.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">Snap</span>
            <span className="nb-stat-tile__label">CSS scroll</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">A11y</span>
            <span className="nb-stat-tile__label">Carousel roles</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">API</span>
            <span className="nb-stat-tile__label">Composable</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={basicCode}>
          <CarouselDemo />
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Basic carousel" code={basicCode} />
      </section>

      <section id="loop">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Loop &amp; autoplay
        </h2>
        <DocsExample code={loopCode}>
          <CarouselDemo loop autoplay={4000} />
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="carousel" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={carouselApiRows} />
      </section>
    </article>
  );
}
