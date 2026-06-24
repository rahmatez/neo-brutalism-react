import type { ReactNode } from 'react';

export type DataTableSortDirection = 'asc' | 'desc';

export interface DataTableSortState {
  columnId: string;
  direction: DataTableSortDirection;
}

export interface DataTableCellContext<TData> {
  row: TData;
  rowIndex: number;
  value: unknown;
  column: DataTableColumn<TData>;
}

export type DataTableColumnAlign = 'left' | 'center' | 'right';

export interface DataTableColumnMeta {
  align?: DataTableColumnAlign;
}

export interface DataTableColumn<TData> {
  id: string;
  header: ReactNode;
  accessorKey?: keyof TData & string;
  accessorFn?: (row: TData) => unknown;
  cell?: (context: DataTableCellContext<TData>) => ReactNode;
  sortable?: boolean;
  sortFn?: (left: TData, right: TData) => number;
  enableGlobalFilter?: boolean;
  /** Shorthand for `meta.align`. */
  align?: DataTableColumnAlign;
  meta?: DataTableColumnMeta;
  className?: string;
  headerClassName?: string;
}
