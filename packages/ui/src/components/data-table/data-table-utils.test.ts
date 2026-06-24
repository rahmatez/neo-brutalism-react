import { describe, expect, it } from 'vitest';
import type { DataTableColumn } from './data-table-types';
import {
  defaultGlobalFilterFn,
  filterRows,
  getPageCount,
  paginateRows,
  sortRows,
  toggleSortState,
} from './data-table-utils';

interface Row {
  id: string;
  name: string;
  role: string;
}

const rows: Row[] = [
  { id: '1', name: 'Zoe', role: 'Designer' },
  { id: '2', name: 'Alex', role: 'Engineer' },
  { id: '3', name: 'Mika', role: 'Manager' },
];

const columns: DataTableColumn<Row>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
  { id: 'role', header: 'Role', accessorKey: 'role', sortable: true },
];

describe('data-table-utils', () => {
  it('sorts rows ascending and descending', () => {
    const asc = sortRows(rows, columns, { columnId: 'name', direction: 'asc' });
    expect(asc.map((row) => row.name)).toEqual(['Alex', 'Mika', 'Zoe']);

    const desc = sortRows(rows, columns, { columnId: 'name', direction: 'desc' });
    expect(desc.map((row) => row.name)).toEqual(['Zoe', 'Mika', 'Alex']);
  });

  it('filters rows with the global filter', () => {
    const filtered = filterRows(rows, 'eng', columns, defaultGlobalFilterFn);
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.name).toBe('Alex');
  });

  it('paginates rows', () => {
    expect(paginateRows(rows, 1, 2).map((row) => row.id)).toEqual(['1', '2']);
    expect(getPageCount(rows.length, 2)).toBe(2);
  });

  it('cycles sort state', () => {
    expect(toggleSortState(null, 'name')).toEqual({ columnId: 'name', direction: 'asc' });
    expect(toggleSortState({ columnId: 'name', direction: 'asc' }, 'name')).toEqual({
      columnId: 'name',
      direction: 'desc',
    });
    expect(toggleSortState({ columnId: 'name', direction: 'desc' }, 'name')).toBeNull();
  });
});
