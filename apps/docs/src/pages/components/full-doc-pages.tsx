import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

type LazyPage = LazyExoticComponent<ComponentType>;

function lazyNamedPage(
  loader: () => Promise<Record<string, ComponentType>>,
  exportName: string,
): LazyPage {
  return lazy(async () => {
    const module = await loader();
    const Page = module[exportName];
    if (!Page) {
      throw new Error(`Missing page export: ${exportName}`);
    }
    return { default: Page };
  });
}

/** Code-split component doc pages — one async chunk per route. */
export const FULL_DOC_PAGES: Record<string, LazyPage> = {
  accordion: lazyNamedPage(() => import('./AccordionPage'), 'AccordionPage'),
  avatar: lazyNamedPage(() => import('./AvatarPage'), 'AvatarPage'),
  'avatar-group': lazyNamedPage(() => import('./AvatarGroupPage'), 'AvatarGroupPage'),
  badge: lazyNamedPage(() => import('./BadgePage'), 'BadgePage'),
  button: lazyNamedPage(() => import('./ButtonPage'), 'ButtonPage'),
  calendar: lazyNamedPage(() => import('./CalendarPage'), 'CalendarPage'),
  carousel: lazyNamedPage(() => import('./CarouselPage'), 'CarouselPage'),
  chart: lazyNamedPage(() => import('./ChartPage'), 'ChartPage'),
  callout: lazyNamedPage(() => import('./CalloutPage'), 'CalloutPage'),
  card: lazyNamedPage(() => import('./CardPage'), 'CardPage'),
  checkbox: lazyNamedPage(() => import('./CheckboxPage'), 'CheckboxPage'),
  chip: lazyNamedPage(() => import('./ChipPage'), 'ChipPage'),
  combobox: lazyNamedPage(() => import('./ComboboxPage'), 'ComboboxPage'),
  command: lazyNamedPage(() => import('./CommandPage'), 'CommandPage'),
  'context-menu': lazyNamedPage(() => import('./ContextMenuPage'), 'ContextMenuPage'),
  'date-picker': lazyNamedPage(() => import('./DatePickerPage'), 'DatePickerPage'),
  'data-table': lazyNamedPage(() => import('./DataTablePage'), 'DataTablePage'),
  form: lazyNamedPage(() => import('./FormPage'), 'FormPage'),
  'hover-card': lazyNamedPage(() => import('./HoverCardPage'), 'HoverCardPage'),
  menubar: lazyNamedPage(() => import('./MenubarPage'), 'MenubarPage'),
  'navigation-menu': lazyNamedPage(() => import('./NavigationMenuPage'), 'NavigationMenuPage'),
  resizable: lazyNamedPage(() => import('./ResizablePage'), 'ResizablePage'),
  sidebar: lazyNamedPage(() => import('./SidebarPage'), 'SidebarPage'),
  cluster: lazyNamedPage(() => import('./ClusterPage'), 'ClusterPage'),
  dialog: lazyNamedPage(() => import('./DialogPage'), 'DialogPage'),
  display: lazyNamedPage(() => import('./DisplayPage'), 'DisplayPage'),
  halftone: lazyNamedPage(() => import('./HalftonePage'), 'HalftonePage'),
  icon: lazyNamedPage(() => import('./IconPage'), 'IconPage'),
  'icon-button': lazyNamedPage(() => import('./IconButtonPage'), 'IconButtonPage'),
  'image-card': lazyNamedPage(() => import('./ImageCardPage'), 'ImageCardPage'),
  input: lazyNamedPage(() => import('./InputPage'), 'InputPage'),
  'input-group': lazyNamedPage(() => import('./InputGroupPage'), 'InputGroupPage'),
  label: lazyNamedPage(() => import('./LabelPage'), 'LabelPage'),
  marquee: lazyNamedPage(() => import('./MarqueePage'), 'MarqueePage'),
  'media-frame': lazyNamedPage(() => import('./MediaFramePage'), 'MediaFramePage'),
  'media-item': lazyNamedPage(() => import('./MediaItemPage'), 'MediaItemPage'),
  progress: lazyNamedPage(() => import('./ProgressPage'), 'ProgressPage'),
  rating: lazyNamedPage(() => import('./RatingPage'), 'RatingPage'),
  section: lazyNamedPage(() => import('./SectionPage'), 'SectionPage'),
  select: lazyNamedPage(() => import('./SelectPage'), 'SelectPage'),
  separator: lazyNamedPage(() => import('./SeparatorPage'), 'SeparatorPage'),
  split: lazyNamedPage(() => import('./SplitPage'), 'SplitPage'),
  surface: lazyNamedPage(() => import('./SurfacePage'), 'SurfacePage'),
  stack: lazyNamedPage(() => import('./StackPage'), 'StackPage'),
  stat: lazyNamedPage(() => import('./StatPage'), 'StatPage'),
  'status-dot': lazyNamedPage(() => import('./StatusDotPage'), 'StatusDotPage'),
  sticker: lazyNamedPage(() => import('./StickerPage'), 'StickerPage'),
  text: lazyNamedPage(() => import('./TextPage'), 'TextPage'),
  textarea: lazyNamedPage(() => import('./TextareaPage'), 'TextareaPage'),
  title: lazyNamedPage(() => import('./TitlePage'), 'TitlePage'),
  typography: lazyNamedPage(() => import('./TypographyPage'), 'TypographyPage'),
};

export const REGISTRY_DOC_SLUGS = [
  'alert',
  'alert-dialog',
  'breadcrumb',
  'collapsible',
  'drawer',
  'dropdown-menu',
  'input-otp',
  'pagination',
  'popover',
  'radio-group',
  'scroll-area',
  'sheet',
  'skeleton',
  'slider',
  'switch',
  'table',
  'tabs',
  'toast',
  'tooltip',
] as const;

export type RegistryDocSlug = (typeof REGISTRY_DOC_SLUGS)[number];

export function isRegistryDocSlug(slug: string): slug is RegistryDocSlug {
  return (REGISTRY_DOC_SLUGS as readonly string[]).includes(slug);
}
