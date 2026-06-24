import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './index';

describe('Collapsible', () => {
  it('toggles content visibility', () => {
    renderWithProvider(
      <Collapsible>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>Hidden copy</CollapsibleContent>
      </Collapsible>,
    );

    expect(screen.queryByText('Hidden copy')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Details' }));
    expect(screen.getByText('Hidden copy')).toBeInTheDocument();
  });
});
