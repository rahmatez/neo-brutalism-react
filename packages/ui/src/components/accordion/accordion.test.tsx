import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './index';

describe('Accordion', () => {
  it('expands a section when trigger is clicked', () => {
    renderWithProvider(
      <Accordion type="single" collapsible>
        <AccordionItem value="one">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Body text</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Section' }));
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });
});
