'use client';

import { createContext, useContext, type RefObject } from 'react';

export type CarouselOrientation = 'horizontal' | 'vertical';

export interface CarouselOptions {
  loop?: boolean;
  align?: 'start' | 'center';
}

export interface CarouselApi {
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  selectedIndex: number;
  slideCount: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

export interface CarouselContextValue {
  viewportRef: RefObject<HTMLDivElement | null>;
  orientation: CarouselOrientation;
  options: CarouselOptions;
  api: CarouselApi;
  setApi?: (api: CarouselApi) => void;
}

export const CarouselContext = createContext<CarouselContextValue | null>(null);

export function useCarousel(): CarouselContextValue {
  const ctx = useContext(CarouselContext);
  if (!ctx) {
    throw new Error('Carousel components must be used within Carousel');
  }
  return ctx;
}
