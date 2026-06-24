import { useState } from 'react';
import { Calendar, Text, type DateRange } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/calendar';

const importCode = `import { Calendar } from 'neobrutalism-ui-react';`;

const singleCode = `const [date, setDate] = useState<Date | undefined>();

<Calendar mode="single" selected={date} onSelect={setDate} />`;

const rangeCode = `const [range, setRange] = useState<DateRange | undefined>();

<Calendar mode="range" selected={range} onSelect={setRange} />`;

const disabledCode = `<Calendar
  mode="single"
  disabled={(date) => [0, 6].includes(date.getDay())}
/>`;

const calendarApiRows = [
  { name: 'mode', type: "'single' | 'range' | 'multiple'", default: "'single'", description: 'Selection behavior.' },
  { name: 'selected', type: 'Date | DateRange | Date[]', description: 'Controlled selected value.' },
  { name: 'onSelect', type: 'function', description: 'Called when the selection changes.' },
  { name: 'month', type: 'Date', description: 'Controlled visible month.' },
  { name: 'onMonthChange', type: 'function', description: 'Called when navigating months.' },
  { name: 'weekStartsOn', type: '0 | 1', default: '0', description: '0 = Sunday, 1 = Monday.' },
  { name: 'min / max', type: 'Date', description: 'Disable dates outside the allowed window.' },
  { name: 'disabled', type: 'Date[] | (date) => boolean', description: 'Additional disabled dates.' },
  { name: 'selectedTone', type: 'NbToneToken', default: "'mint'", description: 'Tone for selected days.' },
  { name: 'rangeTone', type: 'NbToneToken', default: "'lavender'", description: 'Tone for in-range days.' },
];

function SingleCalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="space-y-3">
      <Calendar mode="single" selected={date} onSelect={(value) => setDate(value as Date | undefined)} />
      <Text size="sm" tone="muted">
        Selected: {date ? date.toLocaleDateString() : 'None'}
      </Text>
    </div>
  );
}

function RangeCalendarDemo() {
  const [range, setRange] = useState<DateRange | undefined>();
  return (
    <div className="space-y-3">
      <Calendar mode="range" selected={range} onSelect={(value) => setRange(value as DateRange | undefined)} />
      <Text size="sm" tone="muted">
        {range?.from
          ? `${range.from.toLocaleDateString()} → ${range.to?.toLocaleDateString() ?? '…'}`
          : 'Pick a start and end date'}
      </Text>
    </div>
  );
}

function DisabledWeekendsDemo() {
  return (
    <Calendar
      mode="single"
      defaultMonth={new Date()}
      disabled={(date) => [0, 6].includes(date.getDay())}
    />
  );
}

export function CalendarPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Calendar</p>
          <h1>Calendar</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A date grid picker with single, range, and multiple selection modes. Built with semantic
            table markup, keyboard arrow navigation, locale-aware labels, and neo-brutalist day
            styling — no external date library required.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">3</span>
            <span className="nb-stat-tile__label">Modes</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">A11y</span>
            <span className="nb-stat-tile__label">Grid + labels</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">Zero</span>
            <span className="nb-stat-tile__label">Extra deps</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={singleCode}>
          <SingleCalendarDemo />
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Single date" code={singleCode} />
      </section>

      <section id="range">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Range selection
        </h2>
        <DocsExample code={rangeCode}>
          <RangeCalendarDemo />
        </DocsExample>
      </section>

      <section id="disabled">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Disabled dates
        </h2>
        <p className="mb-4 text-base font-medium">
          Pass <code className="font-mono text-sm">min</code>, <code className="font-mono text-sm">max</code>, a{' '}
          <code className="font-mono text-sm">Date[]</code>, or a matcher function. Weekends disabled below:
        </p>
        <DocsExample code={disabledCode}>
          <DisabledWeekendsDemo />
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="calendar" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={calendarApiRows} />
      </section>
    </article>
  );
}
