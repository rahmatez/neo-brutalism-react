import {
  Button,
  Checkbox,
  Combobox,
  ComboboxOption,
  DatePicker,
  Form,
  FormActions,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRoot,
  Input,
  NativeSelect,
  Switch,
  Textarea,
} from 'neobrutalism-ui-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/form';

const importCode = `import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormRoot,
  FormActions,
} from 'neobrutalism-ui-react';
import { useForm } from 'react-hook-form';`;

const basicExampleCode = `const form = useForm({ defaultValues: { email: '' } });

<FormRoot form={form} onSubmit={(values) => console.log(values)} className="grid max-w-md gap-4">
  <FormField
    control={form.control}
    name="email"
    rules={{ required: 'Email is required.' }}
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="m@example.com" {...field} />
        </FormControl>
        <FormDescription>We will never share your email.</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
  <FormActions>
    <Button type="submit">Save</Button>
  </FormActions>
</FormRoot>`;

const zodExampleCode = `const schema = z.object({
  email: z.string().email('Enter a valid email.'),
  bio: z.string().min(10, 'Bio must be at least 10 characters.'),
});

const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: { email: '', bio: '' },
});`;

const compositeControlsExampleCode = `<FormField
  control={form.control}
  name="framework"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Framework</FormLabel>
      <FormControl>
        <Combobox
          placeholder="Select framework"
          value={field.value || null}
          onValueChange={(value) => field.onChange(value ?? '')}
          onBlur={field.onBlur}
        >
          <ComboboxOption value="react" label="React">React</ComboboxOption>
          <ComboboxOption value="vue" label="Vue">Vue</ComboboxOption>
        </Combobox>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>`;

const submittingExampleCode = `<Button type="submit" disabled={form.formState.isSubmitting}>
  {form.formState.isSubmitting ? 'Saving…' : 'Save'}
</Button>`;

const horizontalExampleCode = `<FormField
  control={form.control}
  name="marketing"
  render={({ field }) => (
    <FormItem layout="horizontal">
      <FormControl>
        <Checkbox checked={field.value} onChange={field.onChange} />
      </FormControl>
      <div className="grid gap-1">
        <FormLabel>Marketing emails</FormLabel>
        <FormDescription>Receive product updates once a month.</FormDescription>
      </div>
    </FormItem>
  )}
/>`;

const formApiRows = [
  {
    name: 'Form',
    type: 'FormProvider',
    description: 'Re-export of react-hook-form `FormProvider`. Wrap fields or use via `FormRoot`.',
  },
  {
    name: 'FormRoot',
    type: '{ form, onSubmit, onSubmitInvalid?, ...formProps }',
    description: 'Combines `FormProvider` with a native `<form>` and `handleSubmit`.',
  },
  {
    name: 'FormField',
    type: 'Controller',
    description: 'Connects a field name to react-hook-form and provides field context.',
  },
  {
    name: 'FormItem',
    type: 'div',
    description: 'Field layout wrapper. `layout="horizontal"` for checkbox / switch rows.',
  },
  {
    name: 'FormLabel',
    type: 'Label',
    description:
      'Accessible label wired to the control id. `optional` shows a muted hint. Pass `htmlFor={false}` for composite widgets.',
  },
  {
    name: 'FormControl',
    type: 'Slot',
    description: 'Clones the child control with `id`, `aria-describedby`, and `aria-invalid`.',
  },
  {
    name: 'FormDescription',
    type: 'p',
    description: 'Helper text referenced by the control `aria-describedby`.',
  },
  {
    name: 'FormMessage',
    type: 'p',
    description: 'Validation message from field error state (`role="alert"`).',
  },
  {
    name: 'FormActions',
    type: 'div',
    description: 'Footer row for submit / cancel buttons (`align`: start | end | between).',
  },
  {
    name: 'useFormField',
    type: '() => field state',
    description: 'Access ids and error state inside custom field layouts.',
  },
];

const profileSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  bio: z.string().min(12, 'Tell us a little more about yourself.'),
  marketing: z.boolean(),
  notifications: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

function BasicFormDemo() {
  const form = useForm<Pick<ProfileFormValues, 'email'>>({
    defaultValues: { email: '' },
    mode: 'onSubmit',
  });

  return (
    <FormRoot
      form={form}
      onSubmit={(values) => window.alert(JSON.stringify(values, null, 2))}
      className="grid max-w-md gap-4"
    >
      <FormField
        control={form.control}
        name="email"
        rules={{ required: 'Email is required.' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="m@example.com" {...field} />
            </FormControl>
            <FormDescription>We will never share your email.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormActions>
        <Button type="submit">Save</Button>
      </FormActions>
    </FormRoot>
  );
}

function ZodFormDemo() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: '',
      bio: '',
      marketing: false,
      notifications: true,
    },
    mode: 'onBlur',
  });

  return (
    <FormRoot
      form={form}
      onSubmit={(values) => window.alert(JSON.stringify(values, null, 2))}
      className="grid max-w-lg gap-5"
    >
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="you@company.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel optional>Bio</FormLabel>
            <FormControl>
              <Textarea placeholder="Designer building bold interfaces…" rows={4} {...field} />
            </FormControl>
            <FormDescription>Shown on your public profile.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="marketing"
        render={({ field }) => (
          <FormItem layout="horizontal">
            <FormControl>
              <Checkbox checked={field.value} onChange={field.onChange} />
            </FormControl>
            <div className="grid gap-1">
              <FormLabel>Marketing emails</FormLabel>
              <FormDescription>Product news, no more than once a month.</FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="notifications"
        render={({ field }) => (
          <FormItem layout="horizontal">
            <FormControl>
              <Switch
                checked={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            </FormControl>
            <div className="grid gap-1">
              <FormLabel>Push notifications</FormLabel>
              <FormDescription>Alerts for comments and mentions.</FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormActions align="between">
        <Button type="button" tone="secondary" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit">Create profile</Button>
      </FormActions>
    </FormRoot>
  );
}

const compositeSchema = z.object({
  role: z.string().min(1, 'Pick a role.'),
  framework: z.string().min(1, 'Pick a framework.'),
  startDate: z.date({ required_error: 'Pick a start date.' }),
});

type CompositeFormValues = z.infer<typeof compositeSchema>;

function CompositeControlsDemo() {
  const form = useForm<CompositeFormValues>({
    resolver: zodResolver(compositeSchema),
    defaultValues: { role: '', framework: '', startDate: undefined },
    mode: 'onSubmit',
  });

  return (
    <FormRoot
      form={form}
      onSubmit={(values) => window.alert(JSON.stringify(values, null, 2))}
      className="grid max-w-md gap-5"
    >
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Role</FormLabel>
            <FormControl>
              <NativeSelect {...field}>
                <option value="" disabled>
                  Select role
                </option>
                <option value="designer">Designer</option>
                <option value="engineer">Engineer</option>
                <option value="pm">Product manager</option>
              </NativeSelect>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="framework"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Framework</FormLabel>
            <FormControl>
              <Combobox
                className="w-full"
                placeholder="Select framework"
                searchPlaceholder="Filter frameworks…"
                value={field.value || null}
                onValueChange={(value) => field.onChange(value ?? '')}
                onBlur={field.onBlur}
              >
                <ComboboxOption value="react" label="React">
                  React
                </ComboboxOption>
                <ComboboxOption value="vue" label="Vue">
                  Vue
                </ComboboxOption>
                <ComboboxOption value="svelte" label="Svelte">
                  Svelte
                </ComboboxOption>
              </Combobox>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Start date</FormLabel>
            <FormControl>
              <DatePicker
                variant="button"
                placeholder="Pick a date"
                value={field.value}
                onValueChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormActions>
        <Button type="submit">Continue</Button>
      </FormActions>
    </FormRoot>
  );
}

function SubmittingFormDemo() {
  const form = useForm<Pick<ProfileFormValues, 'email'>>({
    defaultValues: { email: '' },
    mode: 'onSubmit',
  });

  return (
    <FormRoot
      form={form}
      onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        window.alert(JSON.stringify(values, null, 2));
      }}
      className="grid max-w-md gap-4"
    >
      <FormField
        control={form.control}
        name="email"
        rules={{ required: 'Email is required.' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="m@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormActions>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving…' : 'Save'}
        </Button>
      </FormActions>
    </FormRoot>
  );
}

function ManualProviderDemo() {
  const form = useForm({ defaultValues: { name: '' } });

  return (
    <Form {...form}>
      <form
        className="grid max-w-md gap-4"
        onSubmit={form.handleSubmit((values) => window.alert(JSON.stringify(values)))}
      >
        <FormField
          control={form.control}
          name="name"
          rules={{ required: 'Name is required.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input placeholder="Neo Brutalist" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormActions>
          <Button type="submit">Update</Button>
        </FormActions>
      </form>
    </Form>
  );
}

export function FormPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Form</p>
          <h1>Form</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Accessible form field primitives built on{' '}
            <a
              href="https://react-hook-form.com/"
              className="font-bold underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              react-hook-form
            </a>
            . Compose{' '}
            <Link to="/components/label" className="font-bold underline underline-offset-2">
              Label
            </Link>
            ,{' '}
            <Link to="/components/input" className="font-bold underline underline-offset-2">
              Input
            </Link>
            , and validation messages with automatic{' '}
            <code className="font-mono">aria-describedby</code> /{' '}
            <code className="font-mono">aria-invalid</code> wiring.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">RHF</span>
            <span className="nb-stat-tile__label">Powered</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">A11y</span>
            <span className="nb-stat-tile__label">Wired</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">Zod</span>
            <span className="nb-stat-tile__label">Ready</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={basicExampleCode} layout="spacious">
          <BasicFormDemo />
        </DocsExample>
      </section>

      <section id="when-to-use">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          When to Use
        </h2>
        <div className="max-w-3xl space-y-4 font-medium">
          <p>
            Use <strong>Form</strong> when fields need validation, error messages, and consistent
            label/control relationships — sign-up flows, settings panels, and checkout steps.
          </p>
          <p>
            For a single labeled input with no validation state,{' '}
            <Link to="/components/label" className="font-bold underline underline-offset-2">
              Label
            </Link>{' '}
            +{' '}
            <Link to="/components/input" className="font-bold underline underline-offset-2">
              Input
            </Link>{' '}
            is enough. Reach for Form when errors and helper text must stay in sync with field state.
          </p>
        </div>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Basic field" code={basicExampleCode} />
      </section>

      <section id="validation">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Schema Validation
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Pair with <code className="font-mono">zod</code> and{' '}
          <code className="font-mono">@hookform/resolvers</code> for typed schemas.{' '}
          <code className="font-mono">FormMessage</code> renders resolver errors automatically.
        </p>
        <DocsCodeBlock className="mb-5 block" title="Zod resolver" code={zodExampleCode} />
        <DocsExample code={zodExampleCode} layout="spacious">
          <ZodFormDemo />
        </DocsExample>
      </section>

      <section id="composite-controls">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Composite Controls
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Wrap <code className="font-mono">NativeSelect</code>,{' '}
          <code className="font-mono">Combobox</code>, and{' '}
          <code className="font-mono">DatePicker</code> in <code className="font-mono">FormControl</code>{' '}
          — ids, <code className="font-mono">aria-invalid</code>, and{' '}
          <code className="font-mono">aria-describedby</code> forward to the focusable trigger.
          Map custom <code className="font-mono">value</code> /{' '}
          <code className="font-mono">onValueChange</code> handlers to the controller field.
        </p>
        <DocsExample code={compositeControlsExampleCode} layout="spacious">
          <CompositeControlsDemo />
        </DocsExample>
      </section>

      <section id="submitting">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Submitting State
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Read <code className="font-mono">form.formState.isSubmitting</code> to disable the submit
          button or show a loading label while an async handler runs.
        </p>
        <DocsExample code={submittingExampleCode} layout="spacious">
          <SubmittingFormDemo />
        </DocsExample>
      </section>

      <section id="horizontal">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Horizontal Fields
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Set <code className="font-mono">layout="horizontal"</code> on{' '}
          <code className="font-mono">FormItem</code> for checkbox and switch rows.
        </p>
        <DocsCodeBlock title="Checkbox row" code={horizontalExampleCode} />
      </section>

      <section id="provider">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Manual Provider
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Prefer <code className="font-mono">FormRoot</code> for the common case. Use{' '}
          <code className="font-mono">Form</code> directly when you need full control over the native{' '}
          <code className="font-mono">&lt;form&gt;</code> element.
        </p>
        <DocsExample code={`const form = useForm({ defaultValues: { name: '' } });

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>...</form>
</Form>`}>
          <ManualProviderDemo />
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="form" />

      <section id="accessibility">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Accessibility
        </h2>
        <ul className="list-disc space-y-2 pl-6 font-medium">
          <li>
            <code className="font-mono">FormLabel</code> sets <code className="font-mono">htmlFor</code>{' '}
            to the control id generated by <code className="font-mono">FormControl</code>.
          </li>
          <li>
            <code className="font-mono">aria-describedby</code> only references helper or error nodes
            that are actually rendered — no phantom ids.
          </li>
          <li>
            Invalid fields expose <code className="font-mono">aria-invalid</code> with matching danger
            borders on <code className="font-mono">Input</code>, <code className="font-mono">Textarea</code>,
            and composite triggers; messages use <code className="font-mono">role="alert"</code>.
          </li>
          <li>
            <code className="font-mono">FormRoot</code> sets <code className="font-mono">noValidate</code>{' '}
            so custom validation UX is not fighting native browser tooltips.
          </li>
        </ul>
      </section>

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={formApiRows} variant="props-desc" minWidth="min-w-160" />
        <p className="mt-4 max-w-3xl text-sm font-medium">
          Form state, resolvers, and submit handlers come from{' '}
          <code className="font-mono">useForm</code> in react-hook-form — not re-exported here to
          keep bundle boundaries clear.
        </p>
      </section>
    </article>
  );
}
