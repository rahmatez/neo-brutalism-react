import { useEffect, useState } from 'react';

type DesignImage = {
  src: string;
  thumb: string;
  alt: string;
  tw: number;
  th: number;
};

// tw/th = thumb dimensions (360px wide, height proportional)
const images: DesignImage[] = [
  {
    src: 'charity-card-feed-100-families.png',
    thumb: 'charity-card-feed-100-families.webp',
    alt: 'Charity card – Feed 100 families',
    tw: 360,
    th: 450,
  },
  {
    src: 'course-card-angular-signals.png',
    thumb: 'course-card-angular-signals.webp',
    alt: 'Course card – Angular signals',
    tw: 360,
    th: 450,
  },
  {
    src: 'dashboard-growth-snapshot.png',
    thumb: 'dashboard-growth-snapshot.webp',
    alt: 'Dashboard – Growth snapshot',
    tw: 360,
    th: 450,
  },
  {
    src: 'esports-card-indie-cup.png',
    thumb: 'esports-card-indie-cup.webp',
    alt: 'Esports card – Indie cup',
    tw: 360,
    th: 288,
  },
  {
    src: 'event-ticket-angular-summit-2026.png',
    thumb: 'event-ticket-angular-summit-2026.webp',
    alt: 'Event ticket – Angular Summit 2026',
    tw: 360,
    th: 450,
  },
  {
    src: 'event-ticket-loudwave-fest.png',
    thumb: 'event-ticket-loudwave-fest.webp',
    alt: 'Event ticket – Loudwave Fest',
    tw: 360,
    th: 288,
  },
  {
    src: 'finance-card-save-smart.png',
    thumb: 'finance-card-save-smart.webp',
    alt: 'Finance card – Save smart',
    tw: 360,
    th: 450,
  },
  {
    src: 'healthcare-card-book-checkup.png',
    thumb: 'healthcare-card-book-checkup.webp',
    alt: 'Healthcare card – Book checkup',
    tw: 360,
    th: 450,
  },
  {
    src: 'listing-card-sunlit-loft.png',
    thumb: 'listing-card-sunlit-loft.webp',
    alt: 'Listing card – Sunlit loft',
    tw: 360,
    th: 450,
  },
  {
    src: 'podcast-card-design-systems-scale.png',
    thumb: 'podcast-card-design-systems-scale.webp',
    alt: 'Podcast card – Design systems at scale',
    tw: 360,
    th: 450,
  },
  {
    src: 'pricing-card-pro-plan.png',
    thumb: 'pricing-card-pro-plan.webp',
    alt: 'Pricing card – Pro plan',
    tw: 360,
    th: 450,
  },
  {
    src: 'product-card-pixelboard-mini.png',
    thumb: 'product-card-pixelboard-mini.webp',
    alt: 'Product card – Pixelboard Mini',
    tw: 360,
    th: 450,
  },
  {
    src: 'profile-card-nora-chen.png',
    thumb: 'profile-card-nora-chen.webp',
    alt: 'Profile card – Rahmat Ashari',
    tw: 360,
    th: 450,
  },
  {
    src: 'restaurant-card-brunch-special.png',
    thumb: 'restaurant-card-brunch-special.webp',
    alt: 'Restaurant card – Brunch special',
    tw: 360,
    th: 450,
  },
  {
    src: 'scholarship-card-stem-grant.png',
    thumb: 'scholarship-card-stem-grant.webp',
    alt: 'Scholarship card – STEM grant',
    tw: 360,
    th: 450,
  },
  {
    src: 'testimonial-card-loved-by-teams.png',
    thumb: 'testimonial-card-loved-by-teams.webp',
    alt: 'Testimonial card – Loved by teams',
    tw: 360,
    th: 450,
  },
  {
    src: 'travel-card-tokyo-city-escape.png',
    thumb: 'travel-card-tokyo-city-escape.webp',
    alt: 'Travel card – Tokyo city escape',
    tw: 360,
    th: 288,
  },
];

export function InspiredDesignsPage() {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelected(null);
      }
    }

    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, []);

  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Getting Started</p>
          <h1>Inspired Designs</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Neo-brutalist UI ideas to reference and make your own, built with
            neobrutalism-ui-react primitives.
          </p>
        </div>
      </header>

      <section id="gallery">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Design gallery
        </h2>
        <p className="mb-5 text-base font-medium">
          Click any card to open a full-size preview. Use these layouts as reference when composing
          with Surface, Section, Stack, and other primitives.
        </p>
      </section>

      <div className="columns-2 gap-4 lg:columns-3">
        {images.map((image, index) => (
          <picture key={image.src} className="mb-4 block">
            <source srcSet={`/design/thumb/${image.thumb}`} type="image/webp" />
            <img
              src={`/design/${image.src}`}
              alt={image.alt}
              width={image.tw}
              height={image.th}
              className="w-full cursor-pointer border-3 border-black"
              loading={index < 4 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : undefined}
              decoding="async"
              onClick={() => setSelected(image.src)}
            />
          </picture>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelected(null)}
        >
          <img
            src={`/design/${selected}`}
            alt={selected}
            className="max-h-[90vh] max-w-[90vw] border-4 border-white"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </article>
  );
}
