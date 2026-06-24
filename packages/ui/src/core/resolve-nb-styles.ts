import type { CSSProperties } from 'react';
import { cn } from './cn';
import { nbBorderWidthValue, type NbBorderStrength } from '../tokens/border';
import { nbPaddingValue, type NbPadding } from '../tokens/padding';
import { nbRadiusValue, type NbRadius } from '../tokens/radius';
import { nbShadowValue, type NbShadow } from '../tokens/shadow';
import { nbSpacingValue, type NbSpacing } from '../tokens/spacing';
import { nbToneVars, type NbToneToken } from '../tokens/tone';

export interface NbStyleDefaults {
  tone?: NbToneToken;
  radius?: NbRadius;
  shadow?: NbShadow;
  border?: NbBorderStrength;
  padding?: NbPadding;
  gap?: NbSpacing;
}

export interface NbStyleProps {
  tone?: NbToneToken;
  radius?: NbRadius;
  shadow?: NbShadow;
  border?: NbBorderStrength;
  padding?: NbPadding;
  gap?: NbSpacing;
}

export interface ResolvedNbStyles {
  className: string;
  style: CSSProperties;
  dataAttributes: Record<string, string | undefined>;
}

function resolveTone(
  namespace: string,
  defaults: NbStyleDefaults,
  tone?: NbToneToken,
): { style: CSSProperties; dataTone: string; classes: string[] } {
  const resolved = tone ?? defaults.tone ?? 'default';
  const defaultVars = nbToneVars(defaults.tone ?? 'default');
  const inputVars = tone ? nbToneVars(tone) : null;

  const style: CSSProperties = {
    ['--_nb-tone-bg-default' as string]: defaultVars.bg,
    ['--_nb-tone-fg-default' as string]: defaultVars.fg,
    ['--_nb-tone-border-color-default' as string]: defaultVars.borderColor,
    ['--_nb-tone-bg-token' as string]: `var(--nb-${namespace}-bg, var(--_nb-tone-bg-default))`,
    ['--_nb-tone-fg-token' as string]: `var(--nb-${namespace}-fg, var(--_nb-tone-fg-default))`,
    ['--_nb-tone-border-color-token' as string]: `var(--nb-${namespace}-border-color, var(--_nb-tone-border-color-default))`,
    ...(inputVars
      ? {
          backgroundColor: inputVars.bg,
          color: inputVars.fg,
          borderColor: inputVars.borderColor,
        }
      : {}),
  };

  return { style, dataTone: resolved, classes: ['nb-tone'] };
}

function resolveRadius(
  namespace: string,
  defaults: NbStyleDefaults,
  radius?: NbRadius,
): { style: CSSProperties; dataRadius: string; classes: string[] } {
  const fallback = defaults.radius ?? 'md';
  const resolved = radius ?? fallback;
  const defaultVar =
    fallback === 'md' ? 'var(--nb-radius)' : nbRadiusValue(fallback);

  return {
    style: {
      ['--_nb-radius-default' as string]: defaultVar,
      ['--nb-radius-token' as string]: `var(--nb-${namespace}-radius, var(--_nb-radius-default))`,
      ...(radius ? { borderRadius: nbRadiusValue(radius) } : {}),
    },
    dataRadius: resolved,
    classes: ['nb-radius'],
  };
}

function resolveShadow(
  namespace: string,
  defaults: NbStyleDefaults,
  shadow?: NbShadow,
): { style: CSSProperties; dataShadow: string; classes: string[] } {
  const fallback = defaults.shadow ?? 'default';
  const resolved = shadow ?? fallback;

  return {
    style: {
      ['--_nb-shadow-default' as string]: nbShadowValue(fallback),
      ['--nb-shadow-token' as string]: `var(--nb-${namespace}-shadow, var(--_nb-shadow-default))`,
      ...(shadow ? { boxShadow: nbShadowValue(shadow) } : {}),
    },
    dataShadow: resolved,
    classes: ['nb-shadow'],
  };
}

function resolveBorder(
  namespace: string,
  defaults: NbStyleDefaults,
  border?: NbBorderStrength,
): { style: CSSProperties; dataBorder: string; classes: string[] } {
  const fallback = defaults.border ?? 'default';
  const resolved = border ?? fallback;

  return {
    style: {
      ['--_nb-border-width-default' as string]: nbBorderWidthValue(fallback),
      ['--nb-border-width-token' as string]: `var(--nb-${namespace}-border-width, var(--_nb-border-width-default))`,
      ...(border ? { borderWidth: nbBorderWidthValue(border) } : {}),
    },
    dataBorder: resolved,
    classes: ['nb-border-width'],
  };
}

function resolvePadding(
  namespace: string,
  defaults: NbStyleDefaults,
  padding?: NbPadding,
): { style: CSSProperties; dataPadding: string; classes: string[] } | null {
  if (defaults.padding === undefined && padding === undefined) return null;
  const fallback = defaults.padding ?? 'md';
  const resolved = padding ?? fallback;

  return {
    style: {
      ['--_nb-padding-default' as string]: nbPaddingValue(fallback),
      ['--nb-padding-token' as string]: `var(--nb-${namespace}-padding, var(--_nb-padding-default))`,
      ...(padding !== undefined ? { padding: nbPaddingValue(padding) } : {}),
    },
    dataPadding: resolved,
    classes: ['nb-padding'],
  };
}

function resolveGap(
  namespace: string,
  defaults: NbStyleDefaults,
  gap?: NbSpacing,
): { style: CSSProperties; dataGap: string; classes: string[] } | null {
  if (defaults.gap === undefined && gap === undefined) return null;
  const fallback = defaults.gap ?? 'md';
  const resolved = gap ?? fallback;
  const gapInput = gap ? nbSpacingValue(gap) : null;

  return {
    style: {
      ['--_nb-gap-default' as string]: nbSpacingValue(fallback),
      ...(gapInput ? { ['--_nb-gap-input' as string]: gapInput } : {}),
      ['--_nb-gap-resolved' as string]: `var(--_nb-gap-input, var(--nb-${namespace}-gap, var(--_nb-gap-default)))`,
      ...(gap ? { gap: nbSpacingValue(gap) } : {}),
    },
    dataGap: resolved,
    classes: ['nb-gap'],
  };
}

export type NbStyleCapabilities = {
  tone?: boolean;
  radius?: boolean;
  shadow?: boolean;
  border?: boolean;
  padding?: boolean;
  gap?: boolean;
};

const ALL_CAPABILITIES: Required<NbStyleCapabilities> = {
  tone: true,
  radius: true,
  shadow: true,
  border: true,
  padding: true,
  gap: true,
};

export function resolveNbStyles(
  namespace: string,
  defaults: NbStyleDefaults,
  props: NbStyleProps,
  capabilities: NbStyleCapabilities = ALL_CAPABILITIES,
): ResolvedNbStyles {
  const caps = { ...ALL_CAPABILITIES, ...capabilities };
  const classes: string[] = [];
  const style: CSSProperties = {};
  const dataAttributes: Record<string, string | undefined> = {};

  if (caps.tone) {
    const tone = resolveTone(namespace, defaults, props.tone);
    classes.push(...tone.classes);
    Object.assign(style, tone.style);
    dataAttributes['data-tone'] = tone.dataTone;
  }

  if (caps.radius) {
    const radius = resolveRadius(namespace, defaults, props.radius);
    classes.push(...radius.classes);
    Object.assign(style, radius.style);
    dataAttributes['data-radius'] = radius.dataRadius;
  }

  if (caps.shadow) {
    const shadow = resolveShadow(namespace, defaults, props.shadow);
    classes.push(...shadow.classes);
    Object.assign(style, shadow.style);
    dataAttributes['data-shadow'] = shadow.dataShadow;
  }

  if (caps.border) {
    const border = resolveBorder(namespace, defaults, props.border);
    classes.push(...border.classes);
    Object.assign(style, border.style);
    dataAttributes['data-border'] = border.dataBorder;
  }

  if (caps.padding) {
    const padding = resolvePadding(namespace, defaults, props.padding);
    if (padding) {
      classes.push(...padding.classes);
      Object.assign(style, padding.style);
      dataAttributes['data-padding'] = padding.dataPadding;
    }
  }

  if (caps.gap) {
    const gap = resolveGap(namespace, defaults, props.gap);
    if (gap) {
      classes.push(...gap.classes);
      Object.assign(style, gap.style);
      dataAttributes['data-gap'] = gap.dataGap;
    }
  }

  return { className: cn(classes), style, dataAttributes };
}
