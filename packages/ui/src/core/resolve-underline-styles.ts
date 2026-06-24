import type { CSSProperties } from 'react';
import {
  nbUnderlineGapValue,
  nbUnderlineWidthValue,
  type NbUnderlineGap,
  type NbUnderlineVariant,
  type NbUnderlineWidth,
} from '../tokens/typography';

export interface UnderlineStyleProps {
  underline?: NbUnderlineVariant;
  underlineGap?: NbUnderlineGap;
  underlineWidth?: NbUnderlineWidth;
}

export function resolveUnderlineStyles({
  underline = 'none',
  underlineGap,
  underlineWidth,
}: UnderlineStyleProps): {
  dataAttributes: Record<string, string | undefined>;
  style: CSSProperties;
} {
  const style = {} as CSSProperties & Record<string, string>;

  if (underlineGap) {
    style['--nb-underline-gap'] = nbUnderlineGapValue(underlineGap);
  }
  if (underlineWidth) {
    const width = nbUnderlineWidthValue(underlineWidth);
    if (width) {
      style['--nb-underline-width'] = width;
    }
  }

  return {
    dataAttributes: {
      'data-underline': underline === 'none' ? undefined : underline,
    },
    style,
  };
}

export function resolveResetMargin(reset = true): Record<string, string | undefined> {
  return reset ? { 'data-nb-reset-margin': '' } : {};
}
