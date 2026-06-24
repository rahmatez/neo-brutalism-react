import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel';

describe('Carousel', () => {
  it('renders slides and navigation controls', () => {
    renderWithProvider(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide A</CarouselItem>
          <CarouselItem>Slide B</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );

    expect(screen.getByText('Slide A')).toBeInTheDocument();
    expect(screen.getByText('Slide B')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });
});
