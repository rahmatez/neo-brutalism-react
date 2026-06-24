import type { DataTableColumn, DataTableColumnAlign } from './data-table-types';

export function dataTableAlignClass(align: DataTableColumnAlign = 'left'): string {
  if (align === 'right') return 'text-right';
  if (align === 'center') return 'text-center';
  return 'text-left';
}

export function getDataTableColumnAlign<TData>(
  column: DataTableColumn<TData>,
): DataTableColumnAlign {
  return column.align ?? column.meta?.align ?? 'left';
}
