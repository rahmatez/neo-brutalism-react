import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import { NeoBrutalismProvider } from '../core/provider';

export function renderWithProvider(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult {
  return render(ui, { wrapper: NeoBrutalismProvider, ...options });
}
