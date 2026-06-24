import { describe, expect, it } from 'vitest';
import { getPaginationItems } from './data-table-pagination';

describe('getPaginationItems', () => {
  it('returns all pages when total is small', () => {
    expect(getPaginationItems(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('inserts ellipsis for many pages near the start', () => {
    expect(getPaginationItems(2, 20)).toEqual([1, 2, 3, 'ellipsis', 20]);
  });

  it('inserts ellipsis for many pages in the middle', () => {
    expect(getPaginationItems(10, 20)).toEqual([1, 'ellipsis', 9, 10, 11, 'ellipsis', 20]);
  });

  it('inserts ellipsis for many pages near the end', () => {
    expect(getPaginationItems(19, 20)).toEqual([1, 'ellipsis', 18, 19, 20]);
  });
});
