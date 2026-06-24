import { cn } from '../../core/cn';

export const menuSurfaceTokens = cn(
  '[--nb-menu-fg:var(--_nb-tone-fg-token,var(--_nb-tone-fg-default))]',
  '[--nb-menu-border:var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))]',
  '[--nb-menu-bg:var(--_nb-tone-bg-token,var(--_nb-tone-bg-default))]',
  '[--nb-menu-radius:var(--nb-radius)]',
);

export const menuContentClassName = cn(
  menuSurfaceTokens,
  'z-50 overflow-hidden rounded-(--nb-menu-radius)',
  'border-2 border-(--nb-menu-border) bg-(--nb-menu-bg)',
  'text-(--nb-menu-fg) shadow-[4px_4px_0_0_var(--nb-shadow)]',
);

export const menuItemClassName = cn(
  'relative flex cursor-default select-none items-center gap-3 rounded-(--nb-menu-radius)',
  'px-3 py-2.5 font-mono text-sm font-bold text-(--nb-menu-fg) outline-none transition-colors',
  'focus:bg-[#e8d6ff] data-[highlighted]:bg-[#e8d6ff] data-[state=open]:bg-[#e8d6ff]',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  '[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[2.5]',
);

export const menuIndicatorItemClassName = cn(menuItemClassName, 'pl-8');

export const menuShortcutClassName = cn(
  'ms-auto inline-flex shrink-0 items-center',
  'font-mono text-[10px] font-black tracking-widest text-gray-500 uppercase',
);

export const menuSeparatorClassName = '-mx-1 my-1 h-0.5 bg-(--nb-menu-border)';

export const menuLabelClassName =
  'px-3 py-2 font-mono text-xs font-black tracking-widest text-gray-500 uppercase';
