import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertDialog,
  AlertDialogActions,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DropdownMenu,
  DropdownMenuItem,
  InputOTP,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  Skeleton,
  Slider,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  ToastProvider,
  Tooltip,
  useToast,
  type AlertDialogHandle,
  type SheetHandle,
} from 'neobrutalism-ui-react';
import { useRef } from 'react';
import type { ComponentDocConfig } from '@/docs/components/ComponentDocPage';
import { fullDoc } from './component-doc-config';

function ToastDemo() {
  const { toast } = useToast();
  return (
    <Button
      type="button"
      onClick={() => toast({ title: 'Saved!', description: 'Your changes are live.' })}
    >
      Show toast
    </Button>
  );
}

function AlertDialogDemo() {
  const ref = useRef<AlertDialogHandle>(null);

  return (
    <div className="flex flex-col items-start gap-3">
      <Button type="button" tone="secondary" onClick={() => ref.current?.open()}>
        Delete project
      </Button>
      <AlertDialog ref={ref}>
        <AlertDialogContent className="p-6">
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription className="mt-2 font-medium">
            This action cannot be undone. All files will be permanently removed.
          </AlertDialogDescription>
          <AlertDialogActions className="mt-5 flex flex-wrap gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="button" onClick={() => ref.current?.close()}>
              Confirm delete
            </Button>
          </AlertDialogActions>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function SheetDemo() {
  const ref = useRef<SheetHandle>(null);

  return (
    <div className="flex flex-col items-start gap-3">
      <Button type="button" onClick={() => ref.current?.open()}>
        Open filters
      </Button>
      <Sheet ref={ref}>
        <SheetContent>
          <SheetTitle>Filters</SheetTitle>
          <p className="mt-3 font-medium">Narrow results by status, owner, and date range.</p>
          <SheetClose />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export const NEW_COMPONENT_REGISTRY: Record<string, ComponentDocConfig> = {
  alert: fullDoc({
    slug: 'alert',
    title: 'Alert',
    description:
      'Accessible alert banner for inline status messages. Composes title and description slots with callout-grade borders and tone tokens.',
    preview: (
      <Alert className="max-w-md">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>You can compose alerts with title and description.</AlertDescription>
      </Alert>
    ),
    usageCode: `<Alert>
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Message body</AlertDescription>
</Alert>`,
    importNames: 'Alert, AlertTitle, AlertDescription',
    variants: [
      {
        id: 'tones',
        title: 'Tones',
        preview: (
          <div className="flex max-w-md flex-col gap-3">
            <Alert tone="mint">
              <AlertTitle>Update</AlertTitle>
              <AlertDescription>Check your configuration.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something needs attention.</AlertDescription>
            </Alert>
          </div>
        ),
        code: `<Alert variant="destructive">...</Alert>`,
      },
    ],
    apiRows: [
      { name: 'Alert', description: 'Root alert region with role="alert".' },
      { name: 'AlertTitle', description: 'Bold alert heading.' },
      { name: 'AlertDescription', description: 'Supporting alert copy.' },
    ],
    customizationComponent: 'callout',
  }),
  'alert-dialog': fullDoc({
    slug: 'alert-dialog',
    title: 'Alert Dialog',
    description:
      'Confirmation dialog alias built on the Dialog primitive. Use for destructive or irreversible actions that need explicit confirmation.',
    preview: <AlertDialogDemo />,
    usageCode: `const dialogRef = useRef<AlertDialogHandle>(null);

<Button onClick={() => dialogRef.current?.open()}>Delete project</Button>
<AlertDialog ref={dialogRef}>
  <AlertDialogContent className="p-6">
    <AlertDialogTitle>Delete project?</AlertDialogTitle>
    <AlertDialogDescription className="mt-2 font-medium">
      This action cannot be undone.
    </AlertDialogDescription>
    <AlertDialogActions className="mt-4 flex gap-2">
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <Button onClick={() => dialogRef.current?.close()}>Confirm</Button>
    </AlertDialogActions>
  </AlertDialogContent>
</AlertDialog>`,
    importNames:
      'AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogActions, AlertDialogHandle',
    apiRows: [{ name: 'AlertDialog', description: 'Alias of Dialog for confirmation flows.' }],
    customizationComponent: 'dialog',
  }),
  breadcrumb: fullDoc({
    slug: 'breadcrumb',
    title: 'Breadcrumb',
    description:
      'Navigation trail for docs and app hierarchy. Compose links, separators, and the current page label.',
    preview: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Components</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    usageCode: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Components</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    importNames:
      'Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator',
    apiRows: [
      { name: 'Breadcrumb', description: 'Landmark navigation wrapper.' },
      { name: 'BreadcrumbLink', description: 'Anchor link to a parent route.' },
      { name: 'BreadcrumbPage', description: 'Current page label.' },
    ],
  }),
  collapsible: fullDoc({
    slug: 'collapsible',
    title: 'Collapsible',
    description:
      'Single open/close region without accordion chrome. Ideal for lightweight disclosure blocks.',
    preview: (
      <Collapsible className="max-w-md border-2 border-(--nb-border) p-4 shadow-[4px_4px_0_0_var(--nb-shadow)]">
        <CollapsibleTrigger className="font-black uppercase">Toggle details</CollapsibleTrigger>
        <CollapsibleContent className="mt-3 text-sm font-medium">
          Hidden content revealed on demand.
        </CollapsibleContent>
      </Collapsible>
    ),
    usageCode: `<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>`,
    importNames: 'Collapsible, CollapsibleTrigger, CollapsibleContent',
    apiRows: [
      { name: 'Collapsible', description: 'Root disclosure container.' },
      { name: 'CollapsibleTrigger', description: 'Button that toggles visibility.' },
      { name: 'CollapsibleContent', description: 'Collapsible panel content.' },
    ],
  }),
  drawer: fullDoc({
    slug: 'drawer',
    title: 'Drawer',
    description:
      'Side panel overlay using the native dialog element. Slides in from an edge with brutalist framing.',
    preview: (
      <Drawer>
        <DrawerContent>
          <DrawerTitle>Drawer</DrawerTitle>
          <Text size="sm" className="mt-2">
            Slide-in panel from the edge.
          </Text>
          <DrawerClose />
        </DrawerContent>
      </Drawer>
    ),
    usageCode: `<Drawer side="right">
  <DrawerContent>
    <DrawerTitle>Panel</DrawerTitle>
    <DrawerClose />
  </DrawerContent>
</Drawer>`,
    importNames: 'Drawer, DrawerContent, DrawerTitle, DrawerClose',
    customizationComponent: 'dialog',
    apiRows: [
      { name: 'Drawer', description: 'Native dialog shell with edge positioning.' },
      { name: 'DrawerContent', description: 'Panel body and chrome.' },
    ],
  }),
  'dropdown-menu': fullDoc({
    slug: 'dropdown-menu',
    title: 'Dropdown Menu',
    description: 'Popover menu for actions and navigation. Anchored to a trigger with keyboard support.',
    preview: (
      <DropdownMenu trigger="Open menu">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
      </DropdownMenu>
    ),
    usageCode: `<DropdownMenu trigger="Open">
  <DropdownMenuItem>Edit</DropdownMenuItem>
  <DropdownMenuItem>Duplicate</DropdownMenuItem>
</DropdownMenu>`,
    importNames: 'DropdownMenu, DropdownMenuItem',
    apiRows: [
      { name: 'DropdownMenu', description: 'Menu trigger + floating list.' },
      { name: 'DropdownMenuItem', description: 'Selectable menu action.' },
    ],
  }),
  'input-otp': fullDoc({
    slug: 'input-otp',
    title: 'Input OTP',
    description: 'One-time passcode digit inputs with grouped styling and paste-friendly behavior.',
    preview: <InputOTP length={4} />,
    usageCode: `<InputOTP length={6} value={code} onChange={setCode} />`,
    variants: [
      {
        id: 'length',
        title: 'Six digits',
        preview: <InputOTP length={6} />,
        code: `<InputOTP length={6} />`,
      },
    ],
    apiRows: [{ name: 'InputOTP', description: 'Grouped OTP digit inputs.' }],
    customizationComponent: 'input',
  }),
  pagination: fullDoc({
    slug: 'pagination',
    title: 'Pagination',
    description: 'Page navigation controls for tables, lists, and docs indexes.',
    preview: (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
    usageCode: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
    importNames:
      'Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext',
    apiRows: [{ name: 'Pagination', description: 'Composable pagination nav primitives.' }],
  }),
  popover: fullDoc({
    slug: 'popover',
    title: 'Popover',
    description: 'Anchored floating panel using the native Popover API with neo-brutalist shadow treatment.',
    preview: (
      <Popover trigger="Open popover">
        <Text size="sm">Popover content with brutalist shadow.</Text>
      </Popover>
    ),
    usageCode: `<Popover trigger="Open">
  <p>Popover content</p>
</Popover>`,
    apiRows: [{ name: 'Popover', description: 'Native popover trigger + content region.' }],
  }),
  'radio-group': fullDoc({
    slug: 'radio-group',
    title: 'Radio Group',
    description: 'Accessible single-choice radio cluster with shared group semantics.',
    preview: (
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a">Option A</RadioGroupItem>
        <RadioGroupItem value="b">Option B</RadioGroupItem>
      </RadioGroup>
    ),
    usageCode: `<RadioGroup defaultValue="a">
  <RadioGroupItem value="a">Option A</RadioGroupItem>
  <RadioGroupItem value="b">Option B</RadioGroupItem>
</RadioGroup>`,
    importNames: 'RadioGroup, RadioGroupItem',
    apiRows: [
      { name: 'RadioGroup', description: 'Single-select radio group root.' },
      { name: 'RadioGroupItem', description: 'Individual radio option.' },
    ],
    customizationComponent: 'checkbox',
  }),
  'scroll-area': fullDoc({
    slug: 'scroll-area',
    title: 'Scroll Area',
    description: 'Styled overflow container with brutalist borders for long content regions.',
    preview: (
      <ScrollArea className="h-32 w-full max-w-md p-4">
        <p className="font-medium">Scrollable content with neo-brutalist border treatment.</p>
        <p className="mt-8 font-medium">More content below the fold.</p>
      </ScrollArea>
    ),
    usageCode: `<ScrollArea className="h-48">
  <p>Long content...</p>
</ScrollArea>`,
    apiRows: [{ name: 'ScrollArea', description: 'Overflow container with styled chrome.' }],
  }),
  sheet: fullDoc({
    slug: 'sheet',
    title: 'Sheet',
    description:
      'Alias for Drawer — slide-over panel pattern. Exports Sheet, SheetContent, SheetTitle, and SheetClose.',
    preview: <SheetDemo />,
    usageCode: `const sheetRef = useRef<SheetHandle>(null);

<Button onClick={() => sheetRef.current?.open()}>Open filters</Button>
<Sheet ref={sheetRef}>
  <SheetContent>
    <SheetTitle>Filters</SheetTitle>
    <SheetClose />
  </SheetContent>
</Sheet>`,
    importNames: 'Sheet, SheetContent, SheetTitle, SheetClose, SheetHandle',
    customizationComponent: 'dialog',
    apiRows: [{ name: 'Sheet', description: 'Alias export of Drawer primitives.' }],
  }),
  skeleton: fullDoc({
    slug: 'skeleton',
    title: 'Skeleton',
    description: 'Loading placeholder blocks for text, media, and custom layouts.',
    preview: (
      <div className="flex max-w-xs flex-col gap-3">
        <Skeleton variant="circle" />
        <Skeleton variant="text" />
        <Skeleton className="h-20" />
      </div>
    ),
    usageCode: `<Skeleton variant="text" />
<Skeleton variant="circle" />
<Skeleton className="h-24" />`,
    variants: [
      {
        id: 'card',
        title: 'Card shell',
        preview: (
          <div className="max-w-xs border-2 border-(--nb-border) p-4 shadow-[4px_4px_0_0_var(--nb-shadow)]">
            <Skeleton className="mb-3 h-24" />
            <Skeleton variant="text" />
            <Skeleton variant="text" className="mt-2 w-2/3" />
          </div>
        ),
        code: `<Skeleton className="h-24" />\n<Skeleton variant="text" />`,
      },
    ],
    apiRows: [{ name: 'Skeleton', description: 'Placeholder block with variant presets.' }],
  }),
  slider: fullDoc({
    slug: 'slider',
    title: 'Slider',
    description: 'Range input with brutalist thumb styling and token-driven track colors.',
    preview: <Slider defaultValue={40} className="max-w-xs" />,
    usageCode: `<Slider defaultValue={50} min={0} max={100} />`,
    variants: [
      {
        id: 'range',
        title: 'Custom range',
        preview: <Slider defaultValue={75} min={0} max={100} step={5} className="max-w-xs" />,
        code: `<Slider defaultValue={75} min={0} max={100} step={5} />`,
      },
    ],
    apiRows: [{ name: 'Slider', description: 'Native range input with neo-brutalist thumb.' }],
  }),
  switch: fullDoc({
    slug: 'switch',
    title: 'Switch',
    description: 'Toggle control for boolean settings with bold on/off affordance.',
    preview: <Switch defaultChecked aria-label="Enable notifications" />,
    usageCode: `<Switch checked={on} onChange={(event) => setOn(event.target.checked)} aria-label="Enable feature" />`,
    variants: [
      {
        id: 'labeled',
        title: 'With label',
        preview: (
          <label className="flex items-center gap-3 font-bold">
            <Switch defaultChecked aria-label="Dark mode" />
            Dark mode
          </label>
        ),
        code: `<label className="flex items-center gap-3">\n  <Switch aria-label="Dark mode" />\n  Dark mode\n</label>`,
      },
    ],
    apiRows: [{ name: 'Switch', description: 'Boolean toggle input.' }],
    customizationComponent: 'checkbox',
  }),
  table: fullDoc({
    slug: 'table',
    title: 'Table',
    description: 'Semantic data table primitives for docs, dashboards, and settings screens.',
    preview: (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Rahmat Ashari</TableCell>
            <TableCell>Host</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Neo Brutalism</TableCell>
            <TableCell>Library</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
    usageCode: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Value</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    importNames:
      'Table, TableHeader, TableBody, TableRow, TableHead, TableCell',
    variants: [
      {
        id: 'striped',
        title: 'With badge',
        preview: (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Label</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Badge tone="success">Live</Badge>
                </TableCell>
                <TableCell>Production</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ),
        code: `<TableCell><Badge tone="success">Live</Badge></TableCell>`,
      },
    ],
    apiRows: [
      { name: 'Table', description: 'Table root element.' },
      { name: 'TableHeader / TableBody', description: 'Semantic table sections.' },
      { name: 'TableRow / TableCell', description: 'Row and cell primitives.' },
    ],
  }),
  tabs: fullDoc({
    slug: 'tabs',
    title: 'Tabs',
    description:
      'Primitive tab model with keyboard support. Compose triggers and panels with brutalist trigger styling.',
    preview: (
      <Tabs defaultValue="one" className="max-w-md">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">First panel</TabsContent>
        <TabsContent value="two">Second panel</TabsContent>
      </Tabs>
    ),
    usageCode: `<Tabs defaultValue="one">
  <TabsList>
    <TabsTrigger value="one">One</TabsTrigger>
    <TabsTrigger value="two">Two</TabsTrigger>
  </TabsList>
  <TabsContent value="one">First panel</TabsContent>
  <TabsContent value="two">Second panel</TabsContent>
</Tabs>`,
    importNames: 'Tabs, TabsList, TabsTrigger, TabsContent',
    apiRows: [
      { name: 'Tabs', description: 'Controlled or uncontrolled tab root.' },
      { name: 'TabsTrigger', description: 'Tab button with active styling.' },
      { name: 'TabsContent', description: 'Panel shown for the active value.' },
    ],
  }),
  toast: fullDoc({
    slug: 'toast',
    title: 'Toast',
    description:
      'Ephemeral notification stack with provider hook and Sonner-style useToast API. Legacy /components/sonner redirects here.',
    preview: (
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    ),
    usageCode: `import { ToastProvider, useToast } from 'neobrutalism-ui-react';

function App() {
  return (
    <ToastProvider>
      <SaveButton />
    </ToastProvider>
  );
}

function SaveButton() {
  const { toast } = useToast();
  return (
    <button type="button" onClick={() => toast({ title: 'Saved!' })}>
      Save
    </button>
  );
}`,
    importNames: 'ToastProvider, useToast',
    apiRows: [
      { name: 'ToastProvider', description: 'Mounts the toast viewport and context.' },
      { name: 'useToast', description: 'Imperative API for showing notifications.' },
    ],
  }),
  tooltip: fullDoc({
    slug: 'tooltip',
    title: 'Tooltip',
    description: 'Hover and focus tooltip wrapper for icon buttons and compact controls.',
    preview: (
      <Tooltip content="Neo-brutalist tip">
        <Button type="button">Hover me</Button>
      </Tooltip>
    ),
    usageCode: `<Tooltip content="Help text">
  <Button type="button">Hover</Button>
</Tooltip>`,
    apiRows: [{ name: 'Tooltip', description: 'Wraps a trigger and shows floating help text.' }],
  }),
};
