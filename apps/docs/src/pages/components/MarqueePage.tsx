import { Marquee, MarqueeItem } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/marquee';

interface MarqueeSkill {
  text: string;
  iconSlug: string;
  iconLabel: string;
}

const skills: MarqueeSkill[] = [
  { text: 'ArcGIS', iconSlug: 'arcgis', iconLabel: 'ArcGIS' },
  { text: 'QGIS', iconSlug: 'qgis', iconLabel: 'QGIS' },
  { text: 'Docker', iconSlug: 'docker', iconLabel: 'Docker' },
  { text: 'OpenLayers', iconSlug: 'openlayers', iconLabel: 'OpenLayers' },
  { text: 'Leaflet', iconSlug: 'leaflet', iconLabel: 'Leaflet' },
  { text: 'Kubernetes', iconSlug: 'kubernetes', iconLabel: 'Kubernetes' },
  { text: 'Argo CD', iconSlug: 'argo', iconLabel: 'Argo CD' },
  { text: 'Apache Airflow', iconSlug: 'apacheairflow', iconLabel: 'Apache Airflow' },
  { text: 'GeoServer', iconSlug: 'osgeo', iconLabel: 'OSGeo' },
  { text: 'Python', iconSlug: 'python', iconLabel: 'Python' },
  { text: 'JavaScript', iconSlug: 'javascript', iconLabel: 'JavaScript' },
  { text: 'TypeScript', iconSlug: 'typescript', iconLabel: 'TypeScript' },
  { text: 'React', iconSlug: 'react', iconLabel: 'React' },
  { text: 'PostGIS', iconSlug: 'postgresql', iconLabel: 'PostgreSQL' },
  { text: 'Version Control', iconSlug: 'git', iconLabel: 'Git' },
];

const importCode = `import { Marquee, MarqueeItem } from 'neobrutalism-ui-react';`;

const defaultExampleComponentCode = `const skills = [
  { text: 'ArcGIS', iconSlug: 'arcgis', iconLabel: 'ArcGIS' },
  { text: 'QGIS', iconSlug: 'qgis', iconLabel: 'QGIS' },
  { text: 'Docker', iconSlug: 'docker', iconLabel: 'Docker' },
  // ...
];`;

const defaultExampleTemplateCode = `<Marquee className="w-full" duration="10s">
  {skills.map((skill) => (
    <MarqueeItem key={skill.text}>
      <span className="mx-4 flex items-center sm:mx-6 lg:mx-8">
        <img
          className="mr-2 h-7 w-7 object-contain sm:mr-3 sm:h-9 sm:w-9"
          src={\`https://cdn.simpleicons.org/\${skill.iconSlug}/000000\`}
          alt={\`\${skill.iconLabel} logo\`}
          loading="lazy"
        />
        <span className="font-heading text-lg sm:text-xl lg:text-2xl">
          {skill.text}
        </span>
      </span>
    </MarqueeItem>
  ))}
</Marquee>`;

const reverseExampleCode = defaultExampleTemplateCode.replace(
  'duration="10s"',
  'duration="10s" reverse',
);

const customSpeedExampleCode = defaultExampleTemplateCode.replace(
  'duration="10s"',
  'duration="20s"',
);

const pauseOnHoverExampleCode = defaultExampleTemplateCode.replace(
  'duration="10s"',
  'duration="10s" pauseOnHover={false}',
);

const marqueeApiRows = [
  { name: 'duration', type: 'string', default: "'5s'" },
  { name: 'reverse', type: 'boolean', default: 'false' },
  { name: 'pauseOnHover', type: 'boolean', default: 'true' },
];

function MarqueeSkillStrip({
  duration = '10s',
  reverse,
  pauseOnHover,
}: {
  duration?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <Marquee className="w-full" duration={duration} reverse={reverse} pauseOnHover={pauseOnHover}>
      {skills.map((skill) => (
        <MarqueeItem key={skill.text}>
          <span className="mx-4 flex items-center sm:mx-6 lg:mx-8">
            <img
              className="mr-2 h-7 w-7 object-contain sm:mr-3 sm:h-9 sm:w-9"
              src={`https://cdn.simpleicons.org/${skill.iconSlug}/000000`}
              alt={`${skill.iconLabel} logo`}
              loading="lazy"
            />
            <span className="font-heading text-lg sm:text-xl lg:text-2xl">{skill.text}</span>
          </span>
        </MarqueeItem>
      ))}
    </Marquee>
  );
}

export function MarqueePage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Marquee</p>
          <h1>Marquee</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Marquee component. A horizontally scrolling ticker that loops its
            content infinitely. Supports configurable speed, reverse direction, and pause on hover.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">∞</span>
            <span className="nb-stat-tile__label">Loop</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">2</span>
            <span className="nb-stat-tile__label">Directions</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">CSS</span>
            <span className="nb-stat-tile__label">Pure</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleTemplateCode}>
          <MarqueeSkillStrip duration="10s" />
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock className="mb-5 block" title="Component" code={defaultExampleComponentCode} />
        <DocsCodeBlock title="Template" code={defaultExampleTemplateCode} />
      </section>

      <section id="reverse">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Reverse
        </h2>
        <DocsExample code={reverseExampleCode}>
          <MarqueeSkillStrip duration="10s" reverse />
        </DocsExample>
      </section>

      <section id="custom-speed">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Custom speed
        </h2>
        <DocsExample code={customSpeedExampleCode}>
          <MarqueeSkillStrip duration="20s" />
        </DocsExample>
      </section>

      <section id="pause-on-hover">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Disable pause
        </h2>
        <DocsExample code={pauseOnHoverExampleCode}>
          <MarqueeSkillStrip duration="10s" pauseOnHover={false} />
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="marquee" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={marqueeApiRows} />
      </section>
    </article>
  );
}
