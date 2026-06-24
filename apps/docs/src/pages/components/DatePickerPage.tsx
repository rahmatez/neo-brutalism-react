import {
  Button,
  DatePicker,
  InputGroup,
  InputPrefix,
  Label,
  startOfDay,
  Text,
  type DateRange,
} from 'neobrutalism-ui-react';
import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/date-picker';

const importCode = `import { DatePicker } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<div className="w-80">
  <DatePicker placeholder="Pick a date" />
</div>`;

const rangeExampleCode = `const [range, setRange] = useState<DateRange | undefined>();

<div className="w-80 space-y-3">
  <DatePicker
    mode="range"
    placeholder="Select date range"
    value={range}
    onValueChange={setRange}
  />
  <p className="text-sm font-medium">
    {range?.from
      ? \`\${range.from.toLocaleDateString()} → \${range.to?.toLocaleDateString() ?? '…'}\`
      : 'Pick a start and end date'}
  </p>
</div>`;

const inputVariantCode = `<div className="w-80">
  <DatePicker variant="input" placeholder="MM/DD/YYYY or Jun 11, 2026" />
</div>`;

const controlledExampleCode = `const [date, setDate] = useState<Date | undefined>(new Date());
const [open, setOpen] = useState(false);

<div className="flex w-80 flex-col gap-3">
  <div className="flex flex-wrap gap-2">
    <Button type="button" onClick={() => setOpen(true)}>Open</Button>
    <Button type="button" tone="secondary" onClick={() => setDate(undefined)}>Clear</Button>
  </div>
  <DatePicker
    value={date}
    onValueChange={setDate}
    open={open}
    onOpenChange={setOpen}
    clearable
  />
</div>`;

const presetsExampleCode = `<DatePicker
  className="w-80"
  clearable
  presets={[
    { label: 'Today', value: () => new Date() },
    { label: 'Tomorrow', value: () => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return d;
    }},
    { label: 'Next week', value: () => {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      return d;
    }},
  ]}
/>`;

const disabledDatesCode = `<DatePicker
  className="w-80"
  disabledDates={(date) => [0, 6].includes(date.getDay())}
  placeholder="Weekdays only"
/>`;

const clearableExampleCode = `<DatePicker className="w-80" clearable defaultValue={new Date()} />`;

const disabledExampleCode = `<DatePicker className="w-80" disabled defaultValue={new Date()} />`;

const withLabelCode = `<div className="grid w-80 gap-2">
  <Label htmlFor="event-date">Event date</Label>
  <DatePicker id="event-date" placeholder="Select a date" />
</div>`;

const inputGroupCode = `<div className="w-90">
  <Label className="mb-2 block">Travel dates</Label>
  <InputGroup>
    <InputPrefix aria-hidden="true">📅</InputPrefix>
    <DatePicker placeholder="Departure date" />
  </InputGroup>
</div>`;

const customBackgroundCode = `<DatePicker
  className="w-80"
  placeholder="Custom field"
  style={{ '--nb-date-picker-bg': '#bdf7c8' } as React.CSSProperties}
/>`;

const datePickerApiRows = [
  {
    name: 'mode',
    type: "'single' | 'range'",
    default: "'single'",
    description: 'Single date or start/end range selection.',
  },
  {
    name: 'value / defaultValue',
    type: 'Date | DateRange',
    description: 'Controlled or initial selected value.',
  },
  {
    name: 'onValueChange',
    type: '(value) => void',
    description: 'Called when the selection changes.',
  },
  {
    name: 'variant',
    type: "'button' | 'input'",
    default: "'button'",
    description: 'Button trigger or editable text input with calendar affordance.',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "'Pick a date'",
    description: 'Shown when no date is selected.',
  },
  {
    name: 'open / onOpenChange',
    type: 'boolean',
    description: 'Control the calendar panel visibility.',
  },
  {
    name: 'closeOnSelect',
    type: 'boolean',
    default: 'true',
    description: 'Close after a full selection (single date or complete range).',
  },
  {
    name: 'clearable',
    type: 'boolean',
    default: 'false',
    description: 'Show a clear control when a value is set.',
  },
  {
    name: 'presets',
    type: 'DatePickerPreset[]',
    description: 'Quick-select chips rendered above the calendar.',
  },
  {
    name: 'locale / weekStartsOn',
    type: 'string / 0 | 1',
    description: 'Passed through to the embedded Calendar.',
  },
  {
    name: 'min / max / disabledDates',
    type: 'Date / matcher',
    description: 'Date constraints forwarded to Calendar.',
  },
  {
    name: 'dateFormat / rangeSeparator',
    type: 'Intl options / string',
    description: 'Control how values are formatted in the trigger.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Applied to the focusable trigger input/button for label association.',
  },
];

function DefaultDatePickerDemo() {
  return (
    <div className="w-80">
      <DatePicker placeholder="Pick a date" />
    </div>
  );
}

function RangeDatePickerDemo() {
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <div className="w-80 space-y-3">
      <DatePicker
        mode="range"
        placeholder="Select date range"
        value={range}
        onValueChange={(value) => setRange(value as DateRange | undefined)}
      />
      <Text size="sm" tone="muted">
        {range?.from
          ? `${range.from.toLocaleDateString()} → ${range.to?.toLocaleDateString() ?? '…'}`
          : 'Pick a start and end date'}
      </Text>
    </div>
  );
}

function InputVariantDemo() {
  return (
    <div className="w-80">
      <DatePicker variant="input" placeholder="MM/DD/YYYY or Jun 11, 2026" />
    </div>
  );
}

function ControlledDatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-80 flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => setOpen(true)}>
          Open
        </Button>
        <Button type="button" tone="secondary" onClick={() => setDate(undefined)}>
          Clear
        </Button>
      </div>
      <DatePicker
        value={date}
        onValueChange={(value) => setDate(value as Date | undefined)}
        open={open}
        onOpenChange={setOpen}
        clearable
      />
      <Text size="sm" tone="muted">
        Selected: {date ? date.toLocaleDateString() : 'None'}
      </Text>
    </div>
  );
}

function PresetsDatePickerDemo() {
  return (
    <DatePicker
      className="w-80"
      clearable
      presets={[
        { label: 'Today', value: () => startOfDay(new Date()) },
        {
          label: 'Tomorrow',
          value: () => {
            const d = new Date();
            d.setDate(d.getDate() + 1);
            return startOfDay(d);
          },
        },
        {
          label: 'Next week',
          value: () => {
            const d = new Date();
            d.setDate(d.getDate() + 7);
            return startOfDay(d);
          },
        },
      ]}
    />
  );
}

function DisabledWeekendsDemo() {
  return (
    <DatePicker
      className="w-80"
      disabledDates={(date) => [0, 6].includes(date.getDay())}
      placeholder="Weekdays only"
    />
  );
}

function ClearableDatePickerDemo() {
  return <DatePicker className="w-80" clearable defaultValue={new Date()} />;
}

function DisabledDatePickerDemo() {
  return <DatePicker className="w-80" disabled defaultValue={new Date()} />;
}

function InputGroupDemo() {
  return (
    <div className="w-90">
      <Label className="mb-2 block">Travel dates</Label>
      <InputGroup>
        <InputPrefix aria-hidden="true">📅</InputPrefix>
        <DatePicker placeholder="Departure date" />
      </InputGroup>
    </div>
  );
}

const mintFieldStyle = { '--nb-date-picker-bg': '#bdf7c8' } as CSSProperties;

export function DatePickerPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Date Picker</p>
          <h1>Date Picker</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Calendar + field combo for choosing dates in forms. Composes the built-in{' '}
            <Link to="/components/calendar" className="font-bold underline underline-offset-2">
              Calendar
            </Link>{' '}
            with a neo-brutalist trigger, range selection, typed input, presets, and full keyboard
            support — no extra date library required.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">2</span>
            <span className="nb-stat-tile__label">Modes</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">Input</span>
            <span className="nb-stat-tile__label">Variant</span>
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
        <DocsExample code={defaultExampleCode} layout="dropdown">
          <DefaultDatePickerDemo />
        </DocsExample>
      </section>

      <section id="when-to-use">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          When to Use
        </h2>
        <div className="max-w-3xl space-y-4 font-medium">
          <p>
            Use <strong>Date Picker</strong> in forms when users need to choose one date or a range
            with a compact field and calendar popover — booking flows, filters, deadlines, and
            scheduling UIs.
          </p>
          <p>
            Use{' '}
            <Link to="/components/calendar" className="font-bold underline underline-offset-2">
              Calendar
            </Link>{' '}
            alone when the date grid should stay visible on the page (dashboards, inline planners)
            without a collapsed trigger.
          </p>
        </div>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Basic picker" code={defaultExampleCode} />
      </section>

      <section id="range">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Range
        </h2>
        <DocsExample code={rangeExampleCode} layout="dropdown">
          <RangeDatePickerDemo />
        </DocsExample>
      </section>

      <section id="input-variant">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Input Variant
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Set <code className="font-mono">variant="input"</code> to allow typing dates. Values are
          parsed on blur or Enter using locale-aware month names and numeric order inferred from{' '}
          <code className="font-mono">locale</code> (for example <code className="font-mono">06/15/2026</code>{' '}
          in <code className="font-mono">en-US</code> vs <code className="font-mono">15/06/2026</code>{' '}
          in <code className="font-mono">en-GB</code>). Typed values must also pass{' '}
          <code className="font-mono">min</code>, <code className="font-mono">max</code>, and{' '}
          <code className="font-mono">disabledDates</code> — invalid input reverts and sets{' '}
          <code className="font-mono">aria-invalid</code>.
        </p>
        <DocsExample code={inputVariantCode} layout="dropdown">
          <InputVariantDemo />
        </DocsExample>
      </section>

      <section id="controlled">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Controlled
        </h2>
        <DocsExample code={controlledExampleCode} layout="dropdown">
          <ControlledDatePickerDemo />
        </DocsExample>
      </section>

      <section id="clearable">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Clearable
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          The clear control is a separate button beside the trigger so it does not nest interactive
          elements inside the main field button.
        </p>
        <DocsExample code={clearableExampleCode} layout="dropdown">
          <ClearableDatePickerDemo />
        </DocsExample>
      </section>

      <section id="disabled">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Disabled
        </h2>
        <DocsExample code={disabledExampleCode} layout="dropdown">
          <DisabledDatePickerDemo />
        </DocsExample>
      </section>

      <section id="presets">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Presets
        </h2>
        <DocsExample code={presetsExampleCode} layout="dropdown">
          <PresetsDatePickerDemo />
        </DocsExample>
      </section>

      <section id="disabled-dates">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Disabled Dates
        </h2>
        <DocsExample code={disabledDatesCode} layout="dropdown">
          <DisabledWeekendsDemo />
        </DocsExample>
      </section>

      <section id="with-label">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          With Label
        </h2>
        <DocsExample code={withLabelCode} layout="dropdown">
          <div className="grid w-80 gap-2">
            <Label htmlFor="event-date">Event date</Label>
            <DatePicker id="event-date" placeholder="Select a date" />
          </div>
        </DocsExample>
      </section>

      <section id="input-group">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Input Group
        </h2>
        <DocsExample code={inputGroupCode} layout="dropdown">
          <InputGroupDemo />
        </DocsExample>
      </section>

      <section id="custom-background">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Custom Background
        </h2>
        <DocsExample code={customBackgroundCode} layout="dropdown">
          <DatePicker className="w-80" placeholder="Custom field" style={mintFieldStyle} />
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="date-picker" />

      <section id="accessibility">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Accessibility
        </h2>
        <ul className="list-disc space-y-2 pl-6 font-medium">
          <li>
            The trigger exposes <code className="font-mono">aria-haspopup="dialog"</code> and{' '}
            <code className="font-mono">aria-expanded</code>; the calendar panel uses dialog
            semantics with an embedded grid.
          </li>
          <li>
            Arrow keys navigate days inside the calendar; Escape closes the panel and returns focus
            to the trigger.
          </li>
          <li>
            The calendar panel is portaled to <code className="font-mono">document.body</code> and
            repositioned on scroll/resize so it is not clipped by overflow containers.
          </li>
          <li>
            Pair with <code className="font-mono">Label</code> and pass{' '}
            <code className="font-mono">id</code> on the picker — it is forwarded to the focusable
            trigger for correct <code className="font-mono">htmlFor</code> association.
          </li>
          <li>
            Disabled dates remain perceivable in the grid but cannot be activated — mirror the same
            constraints in any server-side validation.
          </li>
        </ul>
      </section>

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={datePickerApiRows} variant="props-desc" minWidth="min-w-160" />
        <p className="mt-4 max-w-3xl text-sm font-medium">
          Calendar-specific props such as <code className="font-mono">calendarTone</code> and{' '}
          <code className="font-mono">calendarBorder</code> are forwarded to the embedded{' '}
          <Link to="/components/calendar" className="font-bold underline underline-offset-2">
            Calendar
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
