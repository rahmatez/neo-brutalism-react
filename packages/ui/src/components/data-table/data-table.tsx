'use client';

import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cn } from '../../core/cn';
import {
  resolveNbStyles,
  type NbStyleDefaults,
} from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbToneToken } from '../../tokens/tone';
import { Checkbox } from '../checkbox/checkbox';
import { Input } from '../input/input';
import { NativeSelect } from '../select/native-select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../pagination/pagination';
import { Skeleton } from '../skeleton/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table/table';
import { dataTableAlignClass, getDataTableColumnAlign } from './data-table-align';
import { getPaginationItems } from './data-table-pagination';
import { isInteractiveTableTarget } from './data-table-row';
import type { DataTableColumn, DataTableSortState } from './data-table-types';
import { getColumnValue, getRowId as resolveRowId } from './data-table-utils';
import { useDataTable, type UseDataTableOptions } from './use-data-table';

const DEFAULTS: NbStyleDefaults = { tone: 'surface', border: 'default' };
const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

function SortIcon({ direction }: { direction: DataTableSortState['direction'] | null }) {
  return (
    <svg
      className="size-4 shrink-0 opacity-80"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {direction === 'asc' ? (
        <path d="m7 14 5-5 5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      ) : direction === 'desc' ? (
        <path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      ) : (
        <>
          <path
            d="m8 9 4-3 4 3"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
          <path
            d="m8 15 4 3 4-3"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
        </>
      )}
    </svg>
  );
}

export interface DataTableProps<TData>
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'>,
    UseDataTableOptions<TData> {
  columns: DataTableColumn<TData>[];
  data: TData[];
  caption?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  paginated?: boolean;
  pageSizeOptions?: number[];
  selectable?: boolean;
  loading?: boolean;
  loadingRowCount?: number;
  emptyMessage?: string;
  toolbar?: ReactNode;
  footer?: ReactNode;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  manualPagination?: boolean;
  rowCount?: number;
  stickyHeader?: boolean;
  maxHeight?: string | number;
  onRowClick?: (row: TData, rowIndex: number) => void;
  getRowClassName?: (row: TData, rowIndex: number) => string | undefined;
  enableRowSelection?: boolean | ((row: TData) => boolean);
  tone?: NbToneToken;
  border?: NbBorderStrength;
}

function DataTableInner<TData>(
  {
    className,
    data,
    columns,
    caption,
    searchable = true,
    searchPlaceholder = 'Search rows…',
    paginated = true,
    selectable = false,
    loading = false,
    loadingRowCount = 5,
    emptyMessage = 'No results found.',
    toolbar,
    footer,
    tone,
    border,
    style,
    getRowId,
    pageSize,
    defaultPageSize,
    onPageSizeChange,
    defaultPage,
    page,
    onPageChange,
    defaultSort,
    sort,
    onSortChange,
    defaultSearch,
    search: controlledSearch,
    onSearchChange,
    globalFilterFn,
    defaultSelectedRowIds,
    selectedRowIds,
    onSelectionChange,
    manualSorting,
    manualFiltering,
    manualPagination,
    rowCount,
    stickyHeader = false,
    maxHeight = '24rem',
    onRowClick,
    getRowClassName,
    enableRowSelection,
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    ...props
  }: DataTableProps<TData>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const searchInputId = useId();
  const pageSizeSelectId = useId();
  const table = useDataTable({
    data,
    columns,
    getRowId,
    pageSize,
    defaultPageSize,
    onPageSizeChange,
    defaultPage,
    page,
    onPageChange,
    defaultSort,
    sort,
    onSortChange,
    defaultSearch,
    search: controlledSearch,
    onSearchChange,
    globalFilterFn,
    defaultSelectedRowIds,
    selectedRowIds,
    onSelectionChange,
    manualSorting,
    manualFiltering,
    manualPagination,
    rowCount,
    enableRowSelection,
  });

  const styles = resolveNbStyles('data-table', DEFAULTS, { tone, border });
  const columnCount = columns.length + (selectable ? 1 : 0);

  const renderCell = (row: TData, rowIndex: number, column: DataTableColumn<TData>) => {
    const value = getColumnValue(row, column);
    if (column.cell) return column.cell({ row, rowIndex, value, column });
    if (value == null) return '—';
    return String(value);
  };

  const paginationItems = getPaginationItems(table.page, table.pageCount);
  const scrollMaxHeight =
    typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;

  const showToolbar =
    searchable || toolbar || (selectable && table.selectedRowIds.length > 0);
  const showFooter = paginated || footer || pageSizeOptions.length > 0;
  const showPageSizeSelector = pageSizeOptions.length > 0 && paginated;

  const footerLabel = (() => {
    if (loading) return 'Loading…';
    if (table.manualPagination && rowCount != null) {
      const start = (table.page - 1) * table.pageSize + 1;
      const end = Math.min(table.page * table.pageSize, rowCount);
      return `${start}–${end} of ${rowCount} row${rowCount === 1 ? '' : 's'}`;
    }
    return `${table.filteredCount} of ${table.totalRows} row${table.totalRows === 1 ? '' : 's'}`;
  })();

  return (
    <div
      ref={ref}
      data-nb-data-table=""
      className={cn(
        styles.className,
        'w-full overflow-hidden rounded-(--nb-radius) border-2 border-(--nb-data-table-border) shadow-nb',
        '[--nb-data-table-border:var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))]',
        className,
      )}
      style={{ ...styles.style, ...style }}
      {...styles.dataAttributes}
      {...props}
    >
      {showToolbar ? (
        <div className="flex flex-col gap-3 border-b-2 border-(--nb-data-table-border) px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {searchable ? (
              <div className="w-full max-w-xs">
                <label htmlFor={searchInputId} className="sr-only">
                  Search table
                </label>
                <Input
                  id={searchInputId}
                  size="sm"
                  value={table.search}
                  onChange={(event) => table.setSearch(event.target.value)}
                  placeholder={searchPlaceholder}
                  aria-label="Search table rows"
                />
              </div>
            ) : null}
            {toolbar}
          </div>
          {selectable && table.selectedRowIds.length > 0 ? (
            <p className="text-sm font-bold">{table.selectedRowIds.length} selected</p>
          ) : null}
        </div>
      ) : null}

      <div
        className={cn(stickyHeader && 'overflow-auto')}
        style={stickyHeader ? { maxHeight: scrollMaxHeight } : undefined}
      >
        <Table className="rounded-none border-0 shadow-none">
          {caption ? (
            <caption className="border-b-2 border-(--nb-data-table-border) px-4 py-3 text-left text-sm font-black uppercase tracking-wide">
              {caption}
            </caption>
          ) : null}
          <TableHeader className="bg-(--nb-yellow)">
            <TableRow className="border-b-2 border-(--nb-border) hover:bg-transparent">
              {selectable ? (
                <TableHead
                  className={cn(
                    'w-12 bg-(--nb-yellow)',
                    stickyHeader && 'sticky top-0 z-20',
                  )}
                >
                  <Checkbox
                    aria-label="Select all filtered rows"
                    checked={table.allFilteredSelected}
                    ref={(node) => {
                      if (node) node.indeterminate = table.someFilteredSelected;
                    }}
                    onChange={table.toggleAllFilteredRows}
                    disabled={loading || table.selectableRowIds.length === 0}
                  />
                </TableHead>
              ) : null}
              {columns.map((column) => {
                const isSorted = table.sort?.columnId === column.id;
                const direction = isSorted ? table.sort?.direction ?? null : null;
                const sortable = column.sortable !== false;
                const align = getDataTableColumnAlign(column);

                return (
                  <TableHead
                    key={column.id}
                    scope="col"
                    aria-sort={
                      sortable
                        ? direction === 'asc'
                          ? 'ascending'
                          : direction === 'desc'
                            ? 'descending'
                            : 'none'
                        : undefined
                    }
                    className={cn(
                      'bg-(--nb-yellow)',
                      stickyHeader && 'sticky top-0 z-20 shadow-[0_2px_0_0_var(--nb-border)]',
                      dataTableAlignClass(align),
                      column.headerClassName,
                    )}
                  >
                  {sortable ? (
                    <button
                      type="button"
                      className={cn(
                        'inline-flex w-full items-center gap-3 uppercase',
                        align === 'right'
                          ? 'justify-end flex-row-reverse'
                          : align === 'center'
                            ? 'justify-center'
                            : 'justify-between text-left',
                      )}
                      onClick={() => table.toggleSort(column.id)}
                    >
                      <span>{column.header}</span>
                      <SortIcon direction={direction} />
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white [&_tr:nth-child(even)]:bg-(--nb-paper)">
          {loading
            ? Array.from({ length: loadingRowCount }, (_, rowIndex) => (
                <TableRow key={`loading-${rowIndex}`}>
                  {Array.from({ length: columnCount }, (_, cellIndex) => (
                    <TableCell key={`loading-${rowIndex}-${cellIndex}`}>
                      <Skeleton variant="text" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : null}

          {!loading && table.pageRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columnCount} className="py-10 text-center font-bold text-gray-500">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : null}

          {!loading
            ? table.pageRows.map((row, rowIndex) => {
                const sortedIndex = table.sortedRows.indexOf(row);
                const absoluteIndex = sortedIndex >= 0 ? sortedIndex : rowIndex;
                const rowId = resolveRowId(row, absoluteIndex, getRowId);
                const rowSelectable = table.canSelectRow(row);

                return (
                  <TableRow
                    key={rowId}
                    data-state={table.selectedRowIds.includes(rowId) ? 'selected' : undefined}
                    data-clickable={onRowClick ? 'true' : undefined}
                    className={cn(
                      'data-[state=selected]:bg-(--nb-mint)/35',
                      onRowClick && 'cursor-pointer hover:bg-(--nb-yellow)/35',
                      getRowClassName?.(row, absoluteIndex),
                    )}
                    onClick={(event) => {
                      if (!onRowClick || isInteractiveTableTarget(event.target)) return;
                      onRowClick(row, absoluteIndex);
                    }}
                  >
                    {selectable ? (
                      <TableCell>
                        <Checkbox
                          aria-label={`Select row ${rowId}`}
                          checked={table.selectedRowIds.includes(rowId)}
                          disabled={!rowSelectable}
                          onChange={() => table.toggleRow(rowId, row)}
                        />
                      </TableCell>
                    ) : null}
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        className={cn(
                          'align-middle',
                          dataTableAlignClass(getDataTableColumnAlign(column)),
                          column.className,
                        )}
                      >
                        {renderCell(row, absoluteIndex, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            : null}
        </TableBody>
        </Table>
      </div>

      {showFooter ? (
        <div className="flex flex-col gap-4 border-t-2 border-(--nb-data-table-border) bg-(--nb-paper) px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="shrink-0 text-sm font-bold text-(--nb-foreground)/70">{footerLabel}</p>
          <div className="flex flex-wrap items-center gap-3">
            {showPageSizeSelector ? (
              <div className="flex items-center gap-2">
                <label htmlFor={pageSizeSelectId} className="text-sm font-bold">
                  Rows
                </label>
                <NativeSelect
                  id={pageSizeSelectId}
                  className="h-10 min-w-16 px-3 text-sm"
                  value={table.pageSize}
                  onChange={(event) => table.setPageSize(Number(event.target.value))}
                  aria-label="Rows per page"
                >
                  {pageSizeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            ) : null}
            {footer}
            {paginated && !loading && table.pageCount > 1 ? (
              <Pagination>
                <PaginationContent className="gap-1.5">
                  <PaginationItem>
                    <PaginationPrevious
                      disabled={table.page <= 1}
                      onClick={() => table.setPage(table.page - 1)}
                    />
                  </PaginationItem>
                  {paginationItems.map((item, index) =>
                    item === 'ellipsis' ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <span
                          aria-hidden="true"
                          className="inline-flex min-w-10 items-center justify-center px-2 py-2 text-sm font-black"
                        >
                          …
                        </span>
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={item}>
                        <PaginationLink
                          isActive={item === table.page}
                          onClick={() => table.setPage(item)}
                        >
                          {item}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}
                  <PaginationItem>
                    <PaginationNext
                      disabled={table.page >= table.pageCount}
                      onClick={() => table.setPage(table.page + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export const DataTable = forwardRef(DataTableInner) as <TData>(
  props: DataTableProps<TData> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof DataTableInner>;

(DataTable as { displayName?: string }).displayName = 'DataTable';
