import type { DataTableColumn, DataTableSortState } from './data-table-types';

export function getRowId<TData>(
  row: TData,
  index: number,
  getRowIdFn?: (row: TData, index: number) => string,
): string {
  if (getRowIdFn) return getRowIdFn(row, index);
  const record = row as Record<string, unknown>;
  if (typeof record.id === 'string' || typeof record.id === 'number') {
    return String(record.id);
  }
  return String(index);
}

export function getColumnValue<TData>(row: TData, column: DataTableColumn<TData>): unknown {
  if (column.accessorFn) return column.accessorFn(row);
  if (column.accessorKey) return row[column.accessorKey];
  return undefined;
}

function defaultSortValue(value: unknown): string | number {
  if (value == null) return '';
  if (typeof value === 'number') return value;
  if (value instanceof Date) return value.getTime();
  return String(value).toLowerCase();
}

export function defaultColumnSortFn<TData>(
  left: TData,
  right: TData,
  column: DataTableColumn<TData>,
): number {
  const a = defaultSortValue(getColumnValue(left, column));
  const b = defaultSortValue(getColumnValue(right, column));
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function sortRows<TData>(
  rows: TData[],
  columns: DataTableColumn<TData>[],
  sort: DataTableSortState | null | undefined,
): TData[] {
  if (!sort) return rows;
  const column = columns.find((entry) => entry.id === sort.columnId);
  if (!column || column.sortable === false) return rows;

  const compare = column.sortFn
    ? (left: TData, right: TData) => column.sortFn!(left, right)
    : (left: TData, right: TData) => defaultColumnSortFn(left, right, column);

  const sorted = [...rows].sort(compare);
  return sort.direction === 'desc' ? sorted.reverse() : sorted;
}

export function defaultGlobalFilterFn<TData>(
  row: TData,
  query: string,
  columns: DataTableColumn<TData>[],
): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  return columns.some((column) => {
    if (column.enableGlobalFilter === false) return false;
    const value = getColumnValue(row, column);
    if (value == null) return false;
    return String(value).toLowerCase().includes(normalized);
  });
}

export function filterRows<TData>(
  rows: TData[],
  query: string,
  columns: DataTableColumn<TData>[],
  filterFn: (row: TData, query: string, columns: DataTableColumn<TData>[]) => boolean = defaultGlobalFilterFn,
): TData[] {
  if (!query.trim()) return rows;
  return rows.filter((row) => filterFn(row, query, columns));
}

export function paginateRows<TData>(rows: TData[], page: number, pageSize: number): TData[] {
  const start = (page - 1) * pageSize;
  return rows.slice(start, start + pageSize);
}

export function getPageCount(totalRows: number, pageSize: number): number {
  return Math.max(1, Math.ceil(totalRows / pageSize));
}

export function toggleSortState(
  current: DataTableSortState | null | undefined,
  columnId: string,
): DataTableSortState | null {
  if (!current || current.columnId !== columnId) {
    return { columnId, direction: 'asc' };
  }
  if (current.direction === 'asc') {
    return { columnId, direction: 'desc' };
  }
  return null;
}
