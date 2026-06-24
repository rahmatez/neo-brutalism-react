# neobrutalism-ui-react

Neo-brutalist React UI primitive library — bold borders, hard shadows, and Tailwind CSS v4 design tokens.

A React port inspired by [ng-brutalism](https://github.com/khangtrannn/ng-brutalism), with full [documentation](https://neo-brutalism-react-docs.vercel.app/), composition guides, recipes, and a portfolio showcase.

[![npm version](https://img.shields.io/npm/v/neobrutalism-ui-react?style=flat-square)](https://www.npmjs.com/package/neobrutalism-ui-react)
[![license](https://img.shields.io/npm/l/neobrutalism-ui-react?style=flat-square)](https://github.com/rahmatez/neo-brutalism-react/blob/main/LICENSE)

## Features

- **70+ primitives** — actions, forms, overlays, data display, media, charts, and layout building blocks
- **Composition system** — `Surface`, `Section`, `Stack`, `Cluster`, `Split`, and related layout primitives
- **Token-driven styling** — CSS custom properties + Tailwind v4 utilities via `cn()` and `resolveNbStyles`
- **Tree-shakeable ESM** — TypeScript declarations included
- **React 18+** — developed on React 19; peer dependency `react >= 18`
- **Optional peer deps** — install Radix, cmdk, recharts, etc. only for the components you use

## Requirements

- React 18+
- React DOM 18+
- [Tailwind CSS v4](https://tailwindcss.com/docs/installation)

## Install

```bash
pnpm add neobrutalism-ui-react
# or
npm install neobrutalism-ui-react
```

Make sure your app already has React, React DOM, and Tailwind CSS v4 configured.

## Styles

Import Tailwind and the library stylesheet once in your app entry CSS (e.g. `src/styles.css`):

```css
@import "tailwindcss";
@import "neobrutalism-ui-react/styles.css";

/* Adjust the path to match your CSS file location */
@source "../node_modules/neobrutalism-ui-react/dist";
```

- **`neobrutalism-ui-react/styles.css`** — Tailwind theme tokens + base styles (recommended).
- **`neobrutalism-ui-react/theme.css`** — token sheet only; use when you already manage Tailwind elsewhere.

## Usage

```tsx
import { Button } from 'neobrutalism-ui-react';

export function Example() {
  return (
    <Button tone="background" style={{ '--nb-button-bg': '#fff' } as React.CSSProperties}>
      Ship it
    </Button>
  );
}
```

### Provider (optional)

Override theme tokens from React config, or set CSS custom properties in your own stylesheet instead:

```tsx
import { NeoBrutalismProvider } from 'neobrutalism-ui-react';

<NeoBrutalismProvider
  theme={{
    radius: '0px',
    borderWidth: '3px',
  }}
>
  <App />
</NeoBrutalismProvider>
```

## Dependencies

### Required peer dependencies

Installed in **your app** (not bundled with this package):

| Package | Version |
|---------|---------|
| `react` | `>=18` |
| `react-dom` | `>=18` |
| `tailwindcss` | `^4.0.0` |

### Bundled dependencies

Shipped with `neobrutalism-ui-react`:

| Package | Purpose |
|---------|---------|
| `clsx` | Conditional class names |
| `tailwind-merge` | Merge Tailwind classes via `cn()` |

### Optional peer dependencies

Install only when you use the related components:

| Package | Components |
|---------|------------|
| `@radix-ui/react-context-menu` | Context Menu |
| `@radix-ui/react-hover-card` | Hover Card |
| `@radix-ui/react-menubar` | Menubar |
| `@radix-ui/react-navigation-menu` | Navigation Menu |
| `cmdk` | Command |
| `react-hook-form` | Form |
| `react-resizable-panels` | Resizable |
| `recharts` | Chart |

```bash
pnpm add @radix-ui/react-context-menu @radix-ui/react-hover-card \
  @radix-ui/react-menubar @radix-ui/react-navigation-menu \
  cmdk react-hook-form react-resizable-panels recharts
```

## Components

Accordion · Alert · Alert Dialog · Avatar · Avatar Group · Badge · Breadcrumb · Button · Calendar · Callout · Card · Carousel · Chart · Checkbox · Chip · Cluster · Collapsible · Combobox · Command · Context Menu · Data Table · Date Picker · Dialog · Display · Drawer · Dropdown Menu · Form · Halftone · Hover Card · Icon · Icon Button · Image Card · Input · Input Group · Input OTP · Label · Marquee · Media Frame · Media Item · Menubar · Navigation Menu · Pagination · Popover · Progress · Radio Group · Rating · Resizable · Scroll Area · Section · Select · Separator · Sheet · Sidebar · Skeleton · Slider · Split · Stack · Stat · Status Dot · Sticker · Surface · Switch · Table · Tabs · Text · Textarea · Title · Toast · Tooltip · Typography

Browse live examples in the [documentation](https://neo-brutalism-react-docs.vercel.app/components/button).

## Links

- [Documentation](https://neo-brutalism-react-docs.vercel.app/)
- [Installation guide](https://neo-brutalism-react-docs.vercel.app/docs/installation)
- [GitHub](https://github.com/rahmatez/neo-brutalism-react)
- [Changelog](https://github.com/rahmatez/neo-brutalism-react/blob/main/packages/ui/CHANGELOG.md)

## License

[MIT](https://github.com/rahmatez/neo-brutalism-react/blob/main/LICENSE) © [Rahmat Ashari](https://github.com/rahmatez)
