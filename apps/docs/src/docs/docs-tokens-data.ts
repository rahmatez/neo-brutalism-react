export interface DocsToken {
  name: string;
  defaultValue: string;
  usage: string;
}

export type DocsTokenComponent =
  | 'accordion'
  | 'avatar'
  | 'avatar-group'
  | 'calendar'
  | 'carousel'
  | 'chart'
  | 'chip'
  | 'cluster'
  | 'halftone'
  | 'icon'
  | 'icon-button'
  | 'media-item'
  | 'progress'
  | 'rating'
  | 'section'
  | 'split'
  | 'stack'
  | 'stat'
  | 'status-dot'
  | 'sticker'
  | 'text'
  | 'typography'
  | 'badge'
  | 'button'
  | 'callout'
  | 'card'
  | 'checkbox'
  | 'dialog'
  | 'display'
  | 'image-card'
  | 'input'
  | 'input-group'
  | 'label'
  | 'marquee'
  | 'media-frame'
  | 'combobox'
  | 'command'
  | 'context-menu'
  | 'date-picker'
  | 'data-table'
  | 'form'
  | 'hover-card'
  | 'menubar'
  | 'navigation-menu'
  | 'resizable'
  | 'select'
  | 'separator'
  | 'sidebar'
  | 'surface'
  | 'theme'
  | 'title'
  | 'textarea';

export const sharedTokens: DocsToken[] = [
  {
    name: '--nb-border',
    defaultValue: '#000000',
    usage: 'Border color and focus ring color',
  },
  {
    name: '--nb-shadow',
    defaultValue: '#000000',
    usage: 'Offset shadow color',
  },
  {
    name: '--nb-radius',
    defaultValue: '0rem',
    usage: 'Corner radius through the rounded-nb utility',
  },
  {
    name: '--nb-shadow-offset-x',
    defaultValue: '4px',
    usage: 'Horizontal shadow and press offset',
  },
  {
    name: '--nb-shadow-offset-y',
    defaultValue: '4px',
    usage: 'Vertical shadow and press offset',
  },
  {
    name: '--nb-foreground',
    defaultValue: '#000000',
    usage: 'Default foreground text color',
  },
  {
    name: '--nb-background',
    defaultValue: '#ffffff',
    usage: 'Default surface background color',
  },
];

export const componentTokens: Record<DocsTokenComponent, DocsToken[]> = {
  accordion: [
    {
      name: '--nb-accordion-item-bg',
      defaultValue: 'var(--nb-surface)',
      usage: 'Accordion item background',
    },
    {
      name: '--nb-accordion-item-fg',
      defaultValue: 'var(--nb-surface-foreground)',
      usage: 'Accordion item text color',
    },
    {
      name: '--nb-accordion-item-border-color',
      defaultValue: 'var(--nb-border)',
      usage: 'Accordion item border and trigger focus color',
    },
    {
      name: '--nb-accordion-item-border-width',
      defaultValue: 'var(--nb-border-width)',
      usage: 'Accordion item border width',
    },
    {
      name: '--nb-accordion-item-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Accordion item corner radius',
    },
    {
      name: '--nb-accordion-item-shadow',
      defaultValue:
        'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)',
      usage: 'Accordion item box shadow',
    },
    {
      name: '--nb-accordion-trigger-bg',
      defaultValue: 'var(--nb-main)',
      usage: 'Accordion trigger background',
    },
    {
      name: '--nb-accordion-trigger-fg',
      defaultValue: 'var(--nb-main-foreground)',
      usage: 'Accordion trigger text and icon color',
    },
    {
      name: '--nb-accordion-content-bg',
      defaultValue: 'var(--nb-surface)',
      usage: 'Accordion content background',
    },
    {
      name: '--nb-accordion-content-fg',
      defaultValue: 'var(--nb-surface-foreground)',
      usage: 'Accordion content text color',
    },
  ],
  avatar: [
    {
      name: '--nb-avatar-bg',
      defaultValue: 'var(--nb-surface)',
      usage: 'Fallback background',
    },
    {
      name: '--nb-avatar-fg',
      defaultValue: 'var(--nb-surface-foreground)',
      usage: 'Fallback text color',
    },
    {
      name: '--nb-avatar-border-color',
      defaultValue: 'var(--nb-border)',
      usage: 'Avatar border color',
    },
    {
      name: '--nb-avatar-border-width',
      defaultValue: 'var(--nb-border-width)',
      usage: 'Avatar border width',
    },
    {
      name: '--nb-avatar-radius',
      defaultValue: '9999px',
      usage: 'Avatar corner radius',
    },
    {
      name: '--nb-avatar-shadow',
      defaultValue: '2px 2px 0 0 var(--nb-shadow)',
      usage: 'Avatar box shadow',
    },
  ],
  badge: [
    {
      name: '--nb-badge-bg',
      defaultValue: '#ffffff',
      usage: 'Badge background, reassigned by tone',
    },
    {
      name: '--nb-badge-fg',
      defaultValue: '#000000',
      usage: 'Badge text color, reassigned by tone',
    },
    {
      name: '--nb-badge-border-color',
      defaultValue: 'var(--nb-border)',
      usage: 'Badge border color',
    },
    {
      name: '--nb-badge-border-width',
      defaultValue: 'var(--nb-border-width)',
      usage: 'Badge border width',
    },
    {
      name: '--nb-badge-radius',
      defaultValue: '9999px',
      usage: 'Badge corner radius',
    },
    {
      name: '--nb-badge-shadow',
      defaultValue: '2px 2px 0 var(--nb-shadow)',
      usage: 'Badge shadow',
    },
  ],
  button: [
    {
      name: '--nb-button-bg',
      defaultValue: 'var(--nb-primary)',
      usage: 'Button background color. Reassigned by the tone input.',
    },
    {
      name: '--nb-button-fg',
      defaultValue: 'var(--nb-primary-foreground)',
      usage: 'Button text and icon color. Reassigned by the tone input.',
    },
    {
      name: '--nb-button-border-color',
      defaultValue: 'var(--nb-border)',
      usage: 'Button border color',
    },
    {
      name: '--nb-button-border-width',
      defaultValue: 'var(--nb-border-width)',
      usage: 'Button border width, set by the border capability',
    },
    {
      name: '--nb-button-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Button corner radius',
    },
    {
      name: '--nb-button-shadow',
      defaultValue:
        'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)',
      usage: 'Button box shadow, reassigned by shadow',
    },
  ],
  callout: [
    {
      name: '--nb-callout-bg',
      defaultValue: '#ffd84d',
      usage: 'Callout background color. Reassigned by the tone input.',
    },
    {
      name: '--nb-callout-fg',
      defaultValue: '#000000',
      usage: 'Callout text color. Reassigned by the tone input.',
    },
    {
      name: '--nb-callout-border-width',
      defaultValue: '3px',
      usage: 'Callout border width. Reassigned by the size input.',
    },
    {
      name: '--nb-callout-radius',
      defaultValue: '0.75rem',
      usage: 'Callout corner radius. Reassigned by the size input.',
    },
    {
      name: '--nb-callout-shadow',
      defaultValue: '6px 6px 0 0 var(--nb-shadow)',
      usage: 'Callout box shadow. Reassigned by the shadow input.',
    },
  ],
  card: [
    {
      name: '--nb-card-bg',
      defaultValue: 'var(--nb-background)',
      usage: 'Card background',
    },
    {
      name: '--nb-card-fg',
      defaultValue: 'var(--nb-foreground)',
      usage: 'Card text color',
    },
    {
      name: '--nb-card-border-color',
      defaultValue: 'var(--nb-border)',
      usage: 'Card border color',
    },
    {
      name: '--nb-card-border-width',
      defaultValue: 'var(--nb-border-width)',
      usage: 'Card border width',
    },
    {
      name: '--nb-card-radius',
      defaultValue: '1rem',
      usage: 'Card corner radius',
    },
    {
      name: '--nb-card-shadow',
      defaultValue:
        'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)',
      usage: 'Card box shadow',
    },
  ],
  checkbox: [
    {
      name: '--nb-checkbox-bg',
      defaultValue: 'var(--nb-main)',
      usage: 'Checked background',
    },
    {
      name: '--nb-checkbox-fg',
      defaultValue: '#fff',
      usage: 'Checked text color',
    },
    {
      name: '--nb-checkbox-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Checkbox outline and focus ring color',
    },
    {
      name: '--nb-checkbox-radius',
      defaultValue: '0',
      usage: 'Checkbox corner radius',
    },
  ],
  display: [
    {
      name: '--nb-display-size',
      defaultValue: 'set by size input',
      usage: 'Font size. Overrides the size preset when set inline.',
    },
    {
      name: '--nb-display-color',
      defaultValue: 'currentColor',
      usage: 'Text color. Inherits from the parent by default.',
    },
    {
      name: '--nb-underline-color',
      defaultValue: 'var(--nb-pink)',
      usage: 'Accent underline color when underline="bar" | "wave".',
    },
    {
      name: '--nb-underline-width',
      defaultValue: '7rem (bar)',
      usage: 'Accent underline width.',
    },
    {
      name: '--nb-underline-height',
      defaultValue: '0.375rem (bar)',
      usage: 'Accent underline thickness.',
    },
    {
      name: '--nb-underline-gap',
      defaultValue: '0.75rem (bar)',
      usage: 'Space between the text and the accent underline.',
    },
    {
      name: '--nb-underline-radius',
      defaultValue: '9999px',
      usage: 'Accent underline corner radius (bar shape only).',
    },
  ],
  dialog: [
    {
      name: '--nb-dialog-bg',
      defaultValue: '#fff',
      usage: 'Dialog background',
    },
    {
      name: '--nb-dialog-fg',
      defaultValue: 'var(--nb-foreground)',
      usage: 'Dialog text color',
    },
    {
      name: '--nb-dialog-border-color',
      defaultValue: 'var(--nb-border)',
      usage: 'Dialog border color',
    },
    {
      name: '--nb-dialog-border-width',
      defaultValue: 'var(--nb-border-width)',
      usage: 'Dialog border width',
    },
    {
      name: '--nb-dialog-radius',
      defaultValue: '0.375rem',
      usage: 'Dialog corner radius',
    },
    {
      name: '--nb-dialog-shadow',
      defaultValue: '6px 6px 0 0 var(--nb-shadow)',
      usage: 'Dialog box shadow',
    },
    {
      name: '--nb-dialog-description-fg',
      defaultValue: '#4b5563',
      usage: 'Description text color',
    },
    {
      name: '--nb-dialog-content-bg',
      defaultValue: 'transparent',
      usage: 'Content area background',
    },
    {
      name: '--nb-dialog-actions-bg',
      defaultValue: 'transparent',
      usage: 'Actions area background',
    },
  ],
  'image-card': [
    {
      name: '--nb-image-card-bg',
      defaultValue: 'var(--nb-background)',
      usage: 'Image card background',
    },
    {
      name: '--nb-image-card-fg',
      defaultValue: 'var(--nb-foreground)',
      usage: 'Image card text color',
    },
    {
      name: '--nb-image-card-border-color',
      defaultValue: 'var(--nb-border)',
      usage: 'Image card border and image divider color',
    },
    {
      name: '--nb-image-card-border-width',
      defaultValue: 'var(--nb-border-width)',
      usage: 'Image card border and image divider width',
    },
    {
      name: '--nb-image-card-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Image card corner radius',
    },
    {
      name: '--nb-image-card-shadow',
      defaultValue:
        'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)',
      usage: 'Image card box shadow',
    },
  ],
  input: [
    {
      name: '--nb-input-bg',
      defaultValue: 'var(--nb-field-bg)',
      usage: 'Input background',
    },
    {
      name: '--nb-input-fg',
      defaultValue: 'var(--nb-foreground)',
      usage: 'Input text color',
    },
    {
      name: '--nb-input-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Input border and focus ring color',
    },
    {
      name: '--nb-input-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Input corner radius',
    },
    {
      name: '--nb-input-shadow',
      defaultValue:
        'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)',
      usage: 'Input box shadow',
    },
  ],
  'input-group': [
    {
      name: '--nb-input-group-bg',
      defaultValue: 'var(--nb-input-bg, var(--nb-field-bg))',
      usage: 'Group wrapper background',
    },
    {
      name: '--nb-input-group-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Group wrapper border and focus ring color',
    },
    {
      name: '--nb-input-group-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Group wrapper corner radius',
    },
    {
      name: '--nb-input-group-addon-bg',
      defaultValue: '#ffd24a',
      usage: 'Prefix and suffix background',
    },
    {
      name: '--nb-input-group-prefix-bg',
      defaultValue: 'var(--nb-input-group-addon-bg)',
      usage: 'Prefix background',
    },
    {
      name: '--nb-input-group-suffix-bg',
      defaultValue: 'var(--nb-input-group-addon-bg)',
      usage: 'Suffix background',
    },
  ],
  label: [],
  marquee: [
    {
      name: '--nb-marquee-duration',
      defaultValue: '5s',
      usage: 'Computed animation duration',
    },
  ],
  'media-frame': [
    {
      name: '--nb-media-frame-bg',
      defaultValue: 'var(--nb-surface)',
      usage: 'Frame background color. Reassigned by the tone input.',
    },
    {
      name: '--nb-media-frame-fg',
      defaultValue: 'var(--nb-surface-foreground)',
      usage: 'Frame foreground color. Reassigned by the tone input.',
    },
    {
      name: '--nb-media-frame-border-width',
      defaultValue: 'var(--nb-border-width)',
      usage: 'Frame border width. Reassigned by the shadow input.',
    },
    {
      name: '--nb-media-frame-radius',
      defaultValue: '1rem',
      usage: 'Frame corner radius. Reassigned by the radius input.',
    },
    {
      name: '--nb-media-frame-shadow',
      defaultValue: 'none',
      usage: 'Frame box shadow. Reassigned by the shadow input.',
    },
  ],
  'context-menu': [
    {
      name: '--nb-context-menu-bg',
      defaultValue: 'var(--nb-input-bg, var(--nb-field-bg))',
      usage: 'Context menu surface background',
    },
    {
      name: '--nb-context-menu-fg',
      defaultValue: 'var(--nb-foreground)',
      usage: 'Context menu text and icon color',
    },
    {
      name: '--nb-context-menu-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Menu border and separators',
    },
    {
      name: '--nb-context-menu-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Menu corner radius',
    },
  ],
  command: [
    {
      name: '--nb-command-bg',
      defaultValue: 'var(--nb-input-bg, var(--nb-field-bg))',
      usage: 'Command menu background',
    },
    {
      name: '--nb-command-fg',
      defaultValue: 'var(--nb-foreground)',
      usage: 'Command text and icon color',
    },
    {
      name: '--nb-command-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Command border, separators, and input divider',
    },
    {
      name: '--nb-command-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Command corner radius',
    },
  ],
  combobox: [
    {
      name: '--nb-combobox-bg',
      defaultValue: 'var(--nb-input-bg, var(--nb-field-bg))',
      usage: 'Combobox field background',
    },
    {
      name: '--nb-combobox-fg',
      defaultValue: 'var(--nb-foreground)',
      usage: 'Combobox text and icon color',
    },
    {
      name: '--nb-combobox-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Combobox border and focus ring color',
    },
    {
      name: '--nb-combobox-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Combobox corner radius',
    },
    {
      name: '--nb-combobox-listbox-bg',
      defaultValue: 'var(--nb-combobox-bg)',
      usage: 'Combobox listbox background',
    },
  ],
  'data-table': [
    {
      name: '--nb-data-table-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Data table border accents',
    },
    {
      name: '--nb-data-table-bg',
      defaultValue: 'var(--nb-surface)',
      usage: 'Data table surface background',
    },
  ],
  form: [
    {
      name: '--nb-danger',
      defaultValue: 'theme token',
      usage: 'Validation error text on FormLabel and FormMessage',
    },
  ],
  'hover-card': [
    {
      name: '--nb-hover-card-bg',
      defaultValue: 'tone-driven surface background',
      usage: 'Hover card panel background. Reassigned by the tone prop.',
    },
    {
      name: '--nb-hover-card-fg',
      defaultValue: 'tone-driven foreground',
      usage: 'Hover card text and icon color. Reassigned by the tone prop.',
    },
    {
      name: '--nb-hover-card-border-color',
      defaultValue: 'var(--nb-border)',
      usage: 'Hover card border color. Reassigned by the border prop.',
    },
    {
      name: '--nb-menu-bg',
      defaultValue: 'var(--nb-hover-card-bg)',
      usage: 'Shared menu surface background alias used inside the card',
    },
    {
      name: '--nb-menu-border',
      defaultValue: 'var(--nb-hover-card-border-color)',
      usage: 'Shared menu surface border alias used inside the card',
    },
    {
      name: '--nb-menu-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Corner radius for the hover card panel',
    },
  ],
  menubar: [
    {
      name: '--nb-menubar-bg',
      defaultValue: 'tone-driven surface background',
      usage: 'Menubar chrome background. Reassigned by the tone prop.',
    },
    {
      name: '--nb-menubar-fg',
      defaultValue: 'tone-driven foreground',
      usage: 'Menubar text color. Reassigned by the tone prop.',
    },
    {
      name: '--nb-menubar-border-color',
      defaultValue: 'var(--nb-border)',
      usage: 'Menubar border color. Reassigned by the border prop.',
    },
    {
      name: '--nb-menu-bg',
      defaultValue: 'var(--nb-menubar-bg)',
      usage: 'Dropdown and submenu panel background',
    },
    {
      name: '--nb-menu-border',
      defaultValue: 'var(--nb-menubar-border-color)',
      usage: 'Dropdown borders and separators',
    },
    {
      name: '--nb-menu-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Corner radius for menu rows and panels',
    },
  ],
  'navigation-menu': [
    {
      name: '--nb-navigation-menu-bg',
      defaultValue: 'tone-driven surface background',
      usage: 'Navigation chrome background. Reassigned by the tone prop.',
    },
    {
      name: '--nb-navigation-menu-fg',
      defaultValue: 'tone-driven foreground',
      usage: 'Navigation text color. Reassigned by the tone prop.',
    },
    {
      name: '--nb-navigation-menu-border-color',
      defaultValue: 'var(--nb-border)',
      usage: 'Navigation border color. Reassigned by the border prop.',
    },
    {
      name: '--nb-menu-bg',
      defaultValue: 'var(--nb-navigation-menu-bg)',
      usage: 'Dropdown viewport and content panel background',
    },
    {
      name: '--nb-menu-border',
      defaultValue: 'var(--nb-navigation-menu-border-color)',
      usage: 'Viewport border and link hover outlines',
    },
    {
      name: '--nb-yellow',
      defaultValue: 'theme accent',
      usage: 'Default link hover fill inside mega menu panels',
    },
    {
      name: '--nb-mint',
      defaultValue: 'theme accent',
      usage: 'Compact link hover fill and active link background',
    },
  ],
  resizable: [
    {
      name: '--nb-paper',
      defaultValue: 'theme token',
      usage: 'Resize handle track background',
    },
    {
      name: '--nb-border',
      defaultValue: '#000000',
      usage: 'Handle divider line and grip border',
    },
    {
      name: '--nb-yellow',
      defaultValue: 'theme accent',
      usage: 'Handle grip fill',
    },
    {
      name: '--nb-shadow',
      defaultValue: '#000000',
      usage: 'Handle grip offset shadow',
    },
  ],
  sidebar: [
    {
      name: '--sidebar-width',
      defaultValue: '16rem',
      usage: 'Expanded sidebar width (set on SidebarProvider)',
    },
    {
      name: '--sidebar-width-collapsed',
      defaultValue: '3.5rem',
      usage: 'Icon-only collapsed sidebar width (set on SidebarProvider)',
    },
    {
      name: '--nb-paper',
      defaultValue: 'theme token',
      usage: 'Sidebar column background',
    },
    {
      name: '--nb-yellow',
      defaultValue: 'theme accent',
      usage: 'Menu button hover background',
    },
    {
      name: '--nb-mint',
      defaultValue: 'theme accent',
      usage: 'Active menu button background',
    },
    {
      name: '--nb-background',
      defaultValue: '#ffffff',
      usage: 'Main content inset background',
    },
  ],
  'date-picker': [
    {
      name: '--nb-date-picker-bg',
      defaultValue: 'var(--nb-input-bg, var(--nb-field-bg))',
      usage: 'Date picker field background',
    },
    {
      name: '--nb-date-picker-fg',
      defaultValue: 'var(--nb-foreground)',
      usage: 'Date picker text and icon color',
    },
    {
      name: '--nb-date-picker-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Date picker border and focus ring color',
    },
    {
      name: '--nb-date-picker-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Date picker corner radius',
    },
    {
      name: '--nb-date-picker-panel-bg',
      defaultValue: 'var(--nb-date-picker-bg)',
      usage: 'Calendar popover panel background',
    },
  ],
  select: [
    {
      name: '--nb-select-bg',
      defaultValue: 'var(--nb-input-bg, var(--nb-field-bg))',
      usage: 'Select background',
    },
    {
      name: '--nb-select-fg',
      defaultValue: 'var(--nb-foreground)',
      usage: 'Select text and icon color',
    },
    {
      name: '--nb-select-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Select border and focus ring color',
    },
    {
      name: '--nb-select-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Select corner radius',
    },
    {
      name: '--nb-select-listbox-bg',
      defaultValue: 'var(--nb-select-bg)',
      usage: 'Custom select listbox background',
    },
  ],
  theme: [
    {
      name: '--nb-field-bg',
      defaultValue: '#faf3d6',
      usage: 'Shared field background',
    },
    {
      name: '--nb-primary',
      defaultValue: '#ff90e8',
      usage: 'Primary accent color',
    },
    {
      name: '--nb-primary-foreground',
      defaultValue: '#000000',
      usage: 'Text on primary surfaces',
    },
    {
      name: '--nb-secondary',
      defaultValue: '#c8a2ff',
      usage: 'Secondary accent color',
    },
    {
      name: '--nb-secondary-foreground',
      defaultValue: '#000000',
      usage: 'Text on secondary surfaces',
    },
    {
      name: '--nb-accent',
      defaultValue: '#8ae9ff',
      usage: 'Accent color',
    },
    {
      name: '--nb-accent-foreground',
      defaultValue: '#000000',
      usage: 'Text on accent surfaces',
    },
    {
      name: '--nb-danger',
      defaultValue: '#ff4f8a',
      usage: 'Danger states',
    },
    {
      name: '--nb-danger-foreground',
      defaultValue: '#000000',
      usage: 'Text on danger surfaces',
    },
    {
      name: '--nb-success',
      defaultValue: '#63e6be',
      usage: 'Success states',
    },
    {
      name: '--nb-success-foreground',
      defaultValue: '#000000',
      usage: 'Text on success surfaces',
    },
    {
      name: '--nb-warning',
      defaultValue: '#ff9c42',
      usage: 'Warning states',
    },
    {
      name: '--nb-warning-foreground',
      defaultValue: '#000000',
      usage: 'Text on warning surfaces',
    },
    {
      name: '--nb-main',
      defaultValue: 'oklch(90% 0.15 95)',
      usage: 'Strong component fills',
    },
    {
      name: '--nb-main-foreground',
      defaultValue: 'oklch(10% 0 0)',
      usage: 'Text on main fills',
    },
    {
      name: '--nb-surface',
      defaultValue: '#ffffff',
      usage: 'Component surface background',
    },
    {
      name: '--nb-surface-foreground',
      defaultValue: '#000000',
      usage: 'Text on component surfaces',
    },
    {
      name: '--nb-secondary-background',
      defaultValue: 'oklch(96% 0 0)',
      usage: 'Subtle secondary backgrounds',
    },
    {
      name: '--nb-border-width',
      defaultValue: '2px',
      usage: 'Border width token available to consumers',
    },
    {
      name: '--nb-reverse-shadow-offset-x',
      defaultValue: '-4px',
      usage: 'Reverse shadow horizontal offset',
    },
    {
      name: '--nb-reverse-shadow-offset-y',
      defaultValue: '-4px',
      usage: 'Reverse shadow vertical offset',
    },
    {
      name: '--nb-size-sm',
      defaultValue: '2rem',
      usage: 'Small size scale token',
    },
    {
      name: '--nb-size-md',
      defaultValue: '2.5rem',
      usage: 'Medium size scale token',
    },
    {
      name: '--nb-size-lg',
      defaultValue: '3rem',
      usage: 'Large size scale token',
    },
    {
      name: '--nb-font-sans',
      defaultValue: 'system-ui, sans-serif',
      usage: 'Default body font',
    },
    {
      name: '--nb-font-mono',
      defaultValue: 'monospace',
      usage: 'Monospace font token',
    },
    {
      name: '--nb-font-weight-normal',
      defaultValue: '500',
      usage: 'Default body font weight',
    },
    {
      name: '--nb-font-weight-bold',
      defaultValue: '700',
      usage: 'Bold component font weight',
    },
    {
      name: '--nb-focus-ring',
      defaultValue: '3px solid var(--nb-foreground)',
      usage: 'Focus outline utility',
    },
    {
      name: '--nb-focus-ring-offset',
      defaultValue: '2px',
      usage: 'Focus outline offset',
    },
  ],
  separator: [
    {
      name: '--nb-separator-color',
      defaultValue: 'var(--nb-border)',
      usage: 'Line color',
    },
    {
      name: '--nb-separator-thickness',
      defaultValue: '2px (4px for thick)',
      usage: 'Line thickness. Overrides the variant preset when set inline.',
    },
  ],
  surface: [
    {
      name: '--nb-surface-bg',
      defaultValue: 'var(--nb-surface-bg-base)',
      usage:
        'Surface background color. Set inline to override; falls back to the tone-driven base.',
    },
    {
      name: '--nb-surface-bg-base',
      defaultValue: 'var(--nb-surface)',
      usage: 'Tone-driven background base. Reassigned by the tone input.',
    },
    {
      name: '--nb-surface-fg',
      defaultValue: 'var(--nb-surface-fg-base)',
      usage:
        'Surface foreground color. Set inline to override; falls back to the tone-driven base.',
    },
    {
      name: '--nb-surface-fg-base',
      defaultValue: 'var(--nb-surface-foreground)',
      usage: 'Tone-driven foreground base. Reassigned by the tone input.',
    },
    {
      name: '--nb-surface-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Surface border color. Reassigned by the border input.',
    },
    {
      name: '--nb-surface-border-width',
      defaultValue: 'var(--nb-border-width)',
      usage: 'Surface border width. Reassigned by the border input.',
    },
    {
      name: '--nb-surface-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Surface corner radius. Reassigned by the radius input.',
    },
    {
      name: '--nb-surface-shadow',
      defaultValue:
        'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 0 var(--nb-shadow)',
      usage: 'Surface box shadow. Reassigned by the shadow input.',
    },
  ],
  title: [
    {
      name: '--nb-title-wave-width',
      defaultValue: 'min(18rem, 100%)',
      usage: 'Underline width',
    },
    {
      name: '--nb-title-wave-height',
      defaultValue: '0.625rem',
      usage: 'Underline height',
    },
    {
      name: '--nb-title-wave-gap',
      defaultValue: '0',
      usage: 'Space between title text and underline',
    },
    {
      name: '--nb-title-wave-color',
      defaultValue: '#a78bfa',
      usage: 'Underline color',
    },
  ],
  textarea: [
    {
      name: '--nb-textarea-bg',
      defaultValue: 'var(--nb-input-bg, var(--nb-field-bg))',
      usage: 'Textarea background',
    },
    {
      name: '--nb-textarea-fg',
      defaultValue: 'var(--nb-foreground)',
      usage: 'Textarea text color',
    },
    {
      name: '--nb-textarea-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Textarea border and focus ring color',
    },
    {
      name: '--nb-textarea-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Textarea corner radius',
    },
    {
      name: '--nb-textarea-shadow',
      defaultValue:
        'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)',
      usage: 'Textarea box shadow',
    },
    {
      name: '--nb-input-bg',
      defaultValue: 'var(--nb-field-bg)',
      usage: 'Shared field background consumed by the textarea default',
    },
  ],
  'avatar-group': [
    { name: '--nb-avatar-group-gap', defaultValue: 'theme spacing', usage: 'Gap between stacked avatars' },
  ],
  calendar: [
    { name: '--nb-calendar-bg', defaultValue: 'tone-driven background', usage: 'Calendar surface background' },
    { name: '--nb-calendar-fg', defaultValue: 'tone-driven foreground', usage: 'Calendar text color' },
    { name: '--nb-calendar-border-color', defaultValue: 'var(--nb-border)', usage: 'Calendar border color' },
  ],
  carousel: [
    { name: '--nb-carousel-bg', defaultValue: 'tone-driven background', usage: 'Carousel chrome background' },
    { name: '--nb-carousel-fg', defaultValue: 'tone-driven foreground', usage: 'Carousel text and icon color' },
  ],
  chart: [
    { name: '--nb-chart-1', defaultValue: 'theme series color', usage: 'Primary chart series color in config' },
    { name: '--nb-chart-grid', defaultValue: 'var(--nb-border)', usage: 'Cartesian and polar grid lines' },
    { name: '--nb-chart-muted', defaultValue: 'theme token', usage: 'Tooltip cursor and muted fills' },
    { name: '--nb-chart-muted-foreground', defaultValue: 'theme token', usage: 'Axis tick label color' },
  ],
  chip: [
    { name: '--nb-chip-bg', defaultValue: 'tone-driven background', usage: 'Chip background' },
    { name: '--nb-chip-fg', defaultValue: 'tone-driven foreground', usage: 'Chip text color' },
  ],
  cluster: [
    { name: '--nb-cluster-gap', defaultValue: 'theme spacing', usage: 'Horizontal and vertical gap between items' },
  ],
  halftone: [
    { name: '--nb-halftone-bg', defaultValue: 'tone-driven background', usage: 'Halftone panel background' },
  ],
  icon: [
    { name: '--nb-icon-size', defaultValue: '1.5rem', usage: 'Default icon box size' },
  ],
  'icon-button': [
    { name: '--nb-icon-button-bg', defaultValue: 'tone-driven background', usage: 'Icon button background' },
    { name: '--nb-icon-button-fg', defaultValue: 'tone-driven foreground', usage: 'Icon button icon color' },
  ],
  'media-item': [
    { name: '--nb-media-item-bg', defaultValue: 'tone-driven background', usage: 'Media item surface background' },
    { name: '--nb-media-item-fg', defaultValue: 'tone-driven foreground', usage: 'Media item text color' },
  ],
  progress: [
    { name: '--nb-secondary-background', defaultValue: 'theme token', usage: 'Progress track background' },
  ],
  rating: [
    { name: '--nb-rating-bg', defaultValue: 'tone-driven background', usage: 'Rating container background' },
  ],
  section: [
    { name: '--nb-section-bg', defaultValue: 'tone-driven background', usage: 'Section surface background' },
    { name: '--nb-section-padding', defaultValue: 'theme spacing', usage: 'Section inner padding' },
  ],
  split: [
    { name: '--nb-split-gap', defaultValue: 'theme spacing', usage: 'Gap between split columns' },
  ],
  stack: [
    { name: '--nb-stack-gap', defaultValue: 'theme spacing', usage: 'Vertical gap between stacked children' },
  ],
  stat: [
    { name: '--nb-stat-bg', defaultValue: 'tone-driven background', usage: 'Stat tile background' },
    { name: '--nb-stat-fg', defaultValue: 'tone-driven foreground', usage: 'Stat tile text color' },
  ],
  'status-dot': [
    { name: '--nb-status-dot-bg', defaultValue: 'tone-driven background', usage: 'Status dot container background' },
  ],
  sticker: [
    { name: '--nb-sticker-fill', defaultValue: 'theme accent', usage: 'Sticker SVG fill color' },
  ],
  text: [
    { name: '--nb-text-color', defaultValue: 'currentColor', usage: 'Body text color override' },
  ],
  typography: [
    { name: '--nb-font-sans', defaultValue: 'system-ui, sans-serif', usage: 'Typography preset body font' },
    { name: '--nb-font-mono', defaultValue: 'monospace', usage: 'Typography preset mono font' },
  ],
};
