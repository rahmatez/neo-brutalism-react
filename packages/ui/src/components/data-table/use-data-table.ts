'use client';

import { useCallback, useMemo, useState } from 'react';
import type { DataTableColumn, DataTableSortState } from './data-table-types';
import { canSelectDataTableRow } from './data-table-row';
import {
  filterRows,
  getPageCount,
  getRowId,
  paginateRows,
  sortRows,
  toggleSortState,
} from './data-table-utils';

export interface UseDataTableOptions<TData> {
  data: TData[];
  columns: DataTableColumn<TData>[];
  getRowId?: (row: TData, index: number) => string;
  pageSize?: number;
  defaultPageSize?: number;
  onPageSizeChange?: (pageSize: number) => void;
  defaultPage?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  defaultSort?: DataTableSortState | null;
  sort?: DataTableSortState | null;
  onSortChange?: (sort: DataTableSortState | null) => void;
  defaultSearch?: string;
  search?: string;
  onSearchChange?: (search: string) => void;
  globalFilterFn?: (
    row: TData,
    query: string,
    columns: DataTableColumn<TData>[],
  ) => boolean;
  defaultSelectedRowIds?: string[];
  selectedRowIds?: string[];
  onSelectionChange?: (rowIds: string[]) => void;
  enableRowSelection?: boolean | ((row: TData) => boolean);
  manualSorting?: boolean;
  manualFiltering?: boolean;
  manualPagination?: boolean;
  /** Total filtered rows — required for correct pagination when `manualPagination` is true. */
  rowCount?: number;
}

export function useDataTable<TData>({
  data,
  columns,
  getRowId: getRowIdFn,
  pageSize: controlledPageSize,
  defaultPageSize = 10,
  onPageSizeChange,
  defaultPage = 1,
  page: controlledPage,
  onPageChange,
  defaultSort = null,
  sort: controlledSort,
  onSortChange,
  defaultSearch = '',
  search: controlledSearch,
  onSearchChange,
  globalFilterFn,
  defaultSelectedRowIds = [],
  selectedRowIds: controlledSelectedRowIds,
  onSelectionChange,
  enableRowSelection,
  manualSorting = false,
  manualFiltering = false,
  manualPagination = false,
  rowCount,
}: UseDataTableOptions<TData>) {
  const [uncontrolledPageSize, setUncontrolledPageSize] = useState(defaultPageSize);
  const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage);
  const [uncontrolledSort, setUncontrolledSort] = useState<DataTableSortState | null>(defaultSort);
  const [uncontrolledSearch, setUncontrolledSearch] = useState(defaultSearch);
  const [uncontrolledSelectedRowIds, setUncontrolledSelectedRowIds] =
    useState<string[]>(defaultSelectedRowIds);

  const pageSize = controlledPageSize ?? uncontrolledPageSize;
  const page = controlledPage ?? uncontrolledPage;
  const sort = controlledSort !== undefined ? controlledSort : uncontrolledSort;
  const search = controlledSearch ?? uncontrolledSearch;
  const selectedRowIds =
    controlledSelectedRowIds !== undefined
      ? controlledSelectedRowIds
      : uncontrolledSelectedRowIds;

  const setPage = useCallback(
    (next: number) => {
      if (controlledPage === undefined) setUncontrolledPage(next);
      onPageChange?.(next);
    },
    [controlledPage, onPageChange],
  );

  const setPageSize = useCallback(
    (next: number) => {
      if (controlledPageSize === undefined) setUncontrolledPageSize(next);
      onPageSizeChange?.(next);
      setPage(1);
    },
    [controlledPageSize, onPageSizeChange, setPage],
  );

  const setSort = useCallback(
    (next: DataTableSortState | null) => {
      if (controlledSort === undefined) setUncontrolledSort(next);
      onSortChange?.(next);
      if (manualPagination) setPage(1);
    },
    [controlledSort, manualPagination, onSortChange, setPage],
  );

  const setSearch = useCallback(
    (next: string) => {
      if (controlledSearch === undefined) setUncontrolledSearch(next);
      onSearchChange?.(next);
      setPage(1);
    },
    [controlledSearch, onSearchChange, setPage],
  );

  const setSelectedRowIds = useCallback(
    (next: string[]) => {
      if (controlledSelectedRowIds === undefined) setUncontrolledSelectedRowIds(next);
      onSelectionChange?.(next);
    },
    [controlledSelectedRowIds, onSelectionChange],
  );

  const filteredRows = useMemo(() => {
    if (manualFiltering) return data;
    return filterRows(data, search, columns, globalFilterFn);
  }, [columns, data, globalFilterFn, manualFiltering, search]);

  const sortedRows = useMemo(() => {
    if (manualSorting) return filteredRows;
    return sortRows(filteredRows, columns, sort);
  }, [columns, filteredRows, manualSorting, sort]);

  const filteredCount = manualFiltering ? (rowCount ?? data.length) : filteredRows.length;
  const totalRows = manualPagination ? (rowCount ?? data.length) : data.length;

  const pageCount = useMemo(
    () => getPageCount(filteredCount, pageSize),
    [filteredCount, pageSize],
  );

  const currentPage = Math.min(Math.max(page, 1), pageCount);

  const pageRows = useMemo(() => {
    if (manualPagination) return sortedRows;
    return paginateRows(sortedRows, currentPage, pageSize);
  }, [currentPage, manualPagination, pageSize, sortedRows]);

  const rowIds = useMemo(
    () => sortedRows.map((row, index) => getRowId(row, index, getRowIdFn)),
    [getRowIdFn, sortedRows],
  );

  const selectableRows = useMemo(
    () => sortedRows.filter((row) => canSelectDataTableRow(row, enableRowSelection)),
    [enableRowSelection, sortedRows],
  );

  const selectableRowIds = useMemo(
    () =>
      selectableRows.map((row) => {
        const index = sortedRows.indexOf(row);
        return getRowId(row, index, getRowIdFn);
      }),
    [getRowIdFn, selectableRows, sortedRows],
  );

  const allFilteredSelected =
    selectableRowIds.length > 0 &&
    selectableRowIds.every((id) => selectedRowIds.includes(id));
  const someFilteredSelected =
    selectableRowIds.some((id) => selectedRowIds.includes(id)) && !allFilteredSelected;

  const toggleSort = useCallback(
    (columnId: string) => {
      setSort(toggleSortState(sort, columnId));
    },
    [setSort, sort],
  );

  const canSelectRow = useCallback(
    (row: TData) => canSelectDataTableRow(row, enableRowSelection),
    [enableRowSelection],
  );

  const toggleRow = useCallback(
    (rowId: string, row: TData) => {
      if (!canSelectRow(row)) return;
      setSelectedRowIds(
        selectedRowIds.includes(rowId)
          ? selectedRowIds.filter((id) => id !== rowId)
          : [...selectedRowIds, rowId],
      );
    },
    [canSelectRow, selectedRowIds, setSelectedRowIds],
  );

  const toggleAllFilteredRows = useCallback(() => {
    if (allFilteredSelected) {
      setSelectedRowIds(selectedRowIds.filter((id) => !selectableRowIds.includes(id)));
      return;
    }
    setSelectedRowIds([...new Set([...selectedRowIds, ...selectableRowIds])]);
  }, [allFilteredSelected, selectableRowIds, selectedRowIds, setSelectedRowIds]);

  const clearSelection = useCallback(() => {
    setSelectedRowIds([]);
  }, [setSelectedRowIds]);

  return {
    columns,
    search,
    setSearch,
    sort,
    setSort,
    toggleSort,
    page: currentPage,
    setPage,
    pageSize,
    setPageSize,
    pageCount,
    filteredRows,
    sortedRows,
    pageRows,
    rowIds,
    selectableRowIds,
    canSelectRow,
    selectedRowIds,
    toggleRow,
    toggleAllFilteredRows,
    allFilteredSelected,
    someFilteredSelected,
    clearSelection,
    totalRows,
    filteredCount,
    manualPagination,
    manualFiltering,
    manualSorting,
  };
}

export type UseDataTableReturn<TData> = ReturnType<typeof useDataTable<TData>>;
