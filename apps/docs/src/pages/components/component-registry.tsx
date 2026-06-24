import type { ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Callout,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Chip,
  Cluster,
  Dialog,
  DialogActions,
  DialogClose,
  DialogContent,
  DialogTitle,
  Display,
  Halftone,
  Icon,
  IconButton,
  ImageCard,
  Input,
  InputGroup,
  InputPrefix,
  Label,
  Marquee,
  MarqueeItem,
  MediaFrame,
  MediaItem,
  Progress,
  Rating,
  Section,
  Select,
  SelectOption,
  Separator,
  Split,
  Stack,
  Stat,
  StatusDot,
  Sticker,
  Surface,
  Text,
  Textarea,
  Title,
} from 'neobrutalism-ui-react';
import type { ComponentDocConfig } from '@/docs/components/ComponentDocPage';
import { NEW_COMPONENT_REGISTRY } from './component-registry-new';

const GITHUB_BASE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components';

function doc(
  slug: string,
  title: string,
  description: string,
  preview: ReactNode,
  usageCode: string,
  extra?: Partial<ComponentDocConfig>,
): ComponentDocConfig {
  const component = title.replace(/\s+/g, '');
  return {
    eyebrow: `Neo-Brutalist React ${title}`,
    title,
    description,
    stats: [
      { value: 'Tone', label: 'Shared vocabulary', tone: 'yellow' },
      { value: 'Token', label: 'Design system', tone: 'mint' },
      { value: 'Tailwind', label: 'Utility-first', tone: 'pink' },
    ],
    sourcePath: `${GITHUB_BASE}/${slug}`,
    importCode: `import { ${component} } from 'neobrutalism-ui-react';`,
    sections: [
      {
        id: 'preview',
        title: 'Preview',
        example: { preview, code: usageCode },
      },
      {
        id: 'usage',
        title: 'Usage',
        code: usageCode,
        codeTitle: 'Example',
      },
    ],
    apiTokens: [
      { name: 'className', type: 'string', description: 'Additional CSS classes' },
      { name: '...props', type: 'HTMLAttributes', description: 'Native element props' },
    ],
    ...extra,
  };
}

export const COMPONENT_REGISTRY: Record<string, ComponentDocConfig> = {
  accordion: doc(
    'accordion',
    'Accordion',
    'Collapsible sections with brutalist borders and hard shadows.',
    (
      <Accordion type="single" collapsible className="w-full max-w-md">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. Built with native button semantics.</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Title</AccordionTrigger>
    <AccordionContent>Content</AccordionContent>
  </AccordionItem>
</Accordion>`,
  ),
  avatar: doc(
    'avatar',
    'Avatar',
    'Circular identity surface with tone and border tokens.',
    <Avatar alt="User">KT</Avatar>,
    `<Avatar alt="User">KT</Avatar>`,
  ),
  'avatar-group': doc(
    'avatar-group',
    'Avatar Group',
    'Overlapping avatars with overflow indicator.',
    (
      <AvatarGroup>
        <Avatar alt="A">A</Avatar>
        <Avatar alt="B">B</Avatar>
        <Avatar alt="C">C</Avatar>
      </AvatarGroup>
    ),
    `<AvatarGroup>
  <Avatar alt="A">A</Avatar>
  <Avatar alt="B">B</Avatar>
</AvatarGroup>`,
  ),
  badge: doc(
    'badge',
    'Badge',
    'Compact label chip for status and metadata.',
    <Badge>New</Badge>,
    `<Badge tone="primary">New</Badge>`,
  ),
  button: doc(
    'button',
    'Button',
    'Neo-brutalist button with hard borders, shared tone tokens, and press motion.',
    <Button>Button</Button>,
    `<Button tone="primary" size="lg">Get started</Button>`,
    {
      sections: [
        {
          id: 'preview',
          title: 'Preview',
          example: { preview: <Button>Button</Button>, code: `<Button>Button</Button>` },
        },
        {
          id: 'usage',
          title: 'Usage',
          code: `import { Button } from 'neobrutalism-ui-react';\n\n<Button tone="primary">Click me</Button>`,
          codeTitle: 'Import',
        },
        {
          id: 'tones',
          title: 'Tones',
          example: {
            preview: (
              <Cluster gap="sm" className="flex-wrap justify-center">
                <Button>Default</Button>
                <Button tone="primary">Primary</Button>
                <Button tone="secondary">Secondary</Button>
                <Button tone="danger">Danger</Button>
              </Cluster>
            ),
            code: `<Button tone="primary">Primary</Button>`,
          },
        },
        {
          id: 'sizes',
          title: 'Sizes',
          example: {
            preview: (
              <Cluster gap="sm" className="flex-wrap justify-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </Cluster>
            ),
            code: `<Button size="lg">Large</Button>`,
          },
        },
      ],
    },
  ),
  callout: doc(
    'callout',
    'Callout',
    'Highlighted panel for tips, warnings, and feature callouts.',
    <Callout tone="warning">Important notice</Callout>,
    `<Callout tone="warning" size="md">Important notice</Callout>`,
  ),
  card: doc(
    'card',
    'Card',
    'Structured content shell with header, body, and footer regions.',
    (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Card title</CardTitle>
        </CardHeader>
        <CardContent>Card content goes here.</CardContent>
      </Card>
    ),
    `<Card>
  <CardHeader><CardTitle>Title</CardTitle></CardHeader>
  <CardContent>Content</CardContent>
</Card>`,
  ),
  checkbox: doc(
    'checkbox',
    'Checkbox',
    'Brutalist checkbox with custom check artwork.',
    <Checkbox aria-label="Accept terms" />,
    `<Checkbox aria-label="Accept terms" />`,
  ),
  chip: doc(
    'chip',
    'Chip',
    'Pill-shaped tag for filters and metadata.',
    <Chip>Design</Chip>,
    `<Chip tone="pink">Design</Chip>`,
  ),
  cluster: doc(
    'cluster',
    'Cluster',
    'Horizontal flow layout with gap tokens and wrapping.',
    (
      <Cluster gap="sm">
        <Badge>A</Badge>
        <Badge>B</Badge>
        <Badge>C</Badge>
      </Cluster>
    ),
    `<Cluster gap="md" wrap="wrap">...</Cluster>`,
  ),
  dialog: doc(
    'dialog',
    'Dialog',
    'Native dialog element with brutalist chrome.',
    (
      <Dialog>
        <DialogTitle>Dialog</DialogTitle>
        <DialogContent>Dialog body content.</DialogContent>
        <DialogActions>
          <DialogClose>Close</DialogClose>
        </DialogActions>
      </Dialog>
    ),
    `const ref = useRef<DialogHandle>(null);
<Dialog ref={ref}>
  <DialogTitle>Title</DialogTitle>
  <DialogContent>...</DialogContent>
</Dialog>`,
  ),
  display: doc(
    'display',
    'Display',
    'Expressive display typography with optional underline accents.',
    <Display size="lg">Display</Display>,
    `<Display size="xl" underline="bar">Hero</Display>`,
  ),
  halftone: doc(
    'halftone',
    'Halftone',
    'Decorative halftone dot pattern for neo-brutalist flair.',
    <Halftone shape="circle" />,
    `<Halftone shape="circle" color="var(--nb-pink)" />`,
  ),
  icon: doc(
    'icon',
    'Icon',
    'Mask-based icon primitive with tone and size tokens.',
    <Icon src="/tokyo-city-escape/nb-arrow-right.svg" decorative />,
    `<Icon src="/icon.svg" size="md" decorative />`,
  ),
  'icon-button': doc(
    'icon-button',
    'Icon Button',
    'Square/circle icon-only action control.',
    (
      <IconButton aria-label="Next">
        <Icon src="/tokyo-city-escape/nb-arrow-right.svg" decorative />
      </IconButton>
    ),
    `<IconButton aria-label="Next" shape="circle">...</IconButton>`,
  ),
  'image-card': doc(
    'image-card',
    'Image Card',
    'Media card with caption and brutalist frame.',
    (
      <ImageCard image="/design/card.png" alt="Card design" className="max-w-xs">
        <span className="border-t border-(--nb-border) px-4 py-2 text-center font-bold">
          Inspired design
        </span>
      </ImageCard>
    ),
    `<ImageCard image="/image.jpg" alt="...">Caption</ImageCard>`,
  ),
  input: doc(
    'input',
    'Input',
    'Text field with field background and size scale.',
    <Input placeholder="Email" className="max-w-xs" />,
    `<Input placeholder="Email" size="md" />`,
  ),
  'input-group': doc(
    'input-group',
    'Input Group',
    'Input with prefix/suffix slots for composed fields.',
    (
      <InputGroup className="max-w-xs">
        <InputPrefix>$</InputPrefix>
        <Input placeholder="Amount" />
      </InputGroup>
    ),
    `<InputGroup>
  <InputPrefix>$</InputPrefix>
  <Input />
</InputGroup>`,
  ),
  label: doc(
    'label',
    'Label',
    'Form label with bold brutalist typography.',
    <Label htmlFor="demo-input">Label</Label>,
    `<Label htmlFor="email">Email</Label>`,
  ),
  marquee: doc(
    'marquee',
    'Marquee',
    'Infinite scrolling ticker for announcements.',
    (
      <Marquee className="max-w-md">
        <MarqueeItem>Neo Brutalism</MarqueeItem>
        <MarqueeItem>React</MarqueeItem>
        <MarqueeItem>Tailwind v4</MarqueeItem>
      </Marquee>
    ),
    `<Marquee>
  <MarqueeItem>Item</MarqueeItem>
</Marquee>`,
  ),
  'media-frame': doc(
    'media-frame',
    'Media Frame',
    'Aspect-ratio media container with brutalist border.',
    (
      <MediaFrame ratio="16/9" className="max-w-xs">
        <img src="/design/card.png" alt="" className="size-full object-cover" />
      </MediaFrame>
    ),
    `<MediaFrame ratio="square">...</MediaFrame>`,
  ),
  'media-item': doc(
    'media-item',
    'Media Item',
    'Icon + title + description row for lists and menus.',
    <MediaItem title="Media item" description="Supporting text" />,
    `<MediaItem title="Title" description="Description" variant="boxed" />`,
  ),
  progress: doc(
    'progress',
    'Progress',
    'Chunky progress bar with offset shadow track.',
    <Progress value={60} className="max-w-xs" />,
    `<Progress value={60} max={100} />`,
  ),
  rating: doc(
    'rating',
    'Rating',
    'Star rating control with brutalist styling.',
    <Rating value={4} />,
    `<Rating value={4} onValueChange={setValue} />`,
  ),
  section: doc(
    'section',
    'Section',
    'Page section primitive with padding and divider tokens.',
    (
      <Section padding="md" className="border-4 border-(--nb-border)">
        <Text>Section content</Text>
      </Section>
    ),
    `<Section padding="lg" divider="bottom">...</Section>`,
  ),
  select: doc(
    'select',
    'Select',
    'Custom select dropdown with keyboard support.',
    (
      <Select placeholder="Pick one" className="max-w-xs">
        <SelectOption value="a">Option A</SelectOption>
        <SelectOption value="b">Option B</SelectOption>
      </Select>
    ),
    `<Select placeholder="Pick one">
  <SelectOption value="a">A</SelectOption>
</Select>`,
  ),
  separator: doc(
    'separator',
    'Separator',
    'Bold divider line between content regions.',
    <Separator className="max-w-xs" />,
    `<Separator orientation="horizontal" />`,
  ),
  split: doc(
    'split',
    'Split',
    'Two-column responsive split layout primitive.',
    (
      <Split className="max-w-md">
        <Surface padding="sm">Left</Surface>
        <Surface padding="sm">Right</Surface>
      </Split>
    ),
    `<Split ratio="1:1" gap="md">...</Split>`,
  ),
  stack: doc(
    'stack',
    'Stack',
    'Vertical flow layout with gap and separator tokens.',
    (
      <Stack gap="sm" className="max-w-xs">
        <Surface padding="sm">One</Surface>
        <Surface padding="sm">Two</Surface>
      </Stack>
    ),
    `<Stack gap="md" align="stretch">...</Stack>`,
  ),
  stat: doc(
    'stat',
    'Stat',
    'Metric display tile for dashboards and docs headers.',
    <Stat label="Users" value="12k" />,
    `<Stat label="Users" value="12k" />`,
  ),
  'status-dot': doc(
    'status-dot',
    'Status Dot',
    'Small presence indicator for online/offline states.',
    <StatusDot state="online" />,
    `<StatusDot state="online" />`,
  ),
  sticker: doc(
    'sticker',
    'Sticker',
    'Decorative rotated sticker shape for playful layouts.',
    <Sticker tone="pink">NEW</Sticker>,
    `<Sticker tone="yellow" shape="burst">SALE</Sticker>`,
  ),
  surface: doc(
    'surface',
    'Surface',
    'Foundational panel primitive — borders, tone, shadow, and padding.',
    <Surface padding="md" className="inline-flex">Surface</Surface>,
    `<Surface tone="yellow" padding="md" shadow="default">...</Surface>`,
  ),
  text: doc(
    'text',
    'Text',
    'Body typography primitive with size, weight, and underline tokens.',
    <Text size="lg" weight="bold">Text</Text>,
    `<Text size="lg" weight="bold" underline="bar">Hello</Text>`,
  ),
  textarea: doc(
    'textarea',
    'Textarea',
    'Multi-line text field with brutalist field styling.',
    <Textarea placeholder="Message" className="max-w-xs" />,
    `<Textarea placeholder="Message" rows={4} />`,
  ),
  title: doc(
    'title',
    'Title',
    'Section title with optional wave underline decoration.',
    <Title>Section title</Title>,
    `<Title underline>Section title</Title>`,
  ),
  ...NEW_COMPONENT_REGISTRY,
};

export const COMPONENT_SLUGS = Object.keys(COMPONENT_REGISTRY);
