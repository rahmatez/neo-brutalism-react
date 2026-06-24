import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('merges tailwind classes with conflict resolution', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('handles conditional classes', () => {
    expect(cn('flex', false && 'hidden', 'w-full')).toBe('flex w-full');
  });
});
