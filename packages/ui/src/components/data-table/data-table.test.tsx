import { describe, expect, it, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { DataTable, type DataTableColumn } from './index';

interface Payment {
  id: string;
  email: string;
  amount: number;
  status: string;
}

const data: Payment[] = [
  { id: '1', email: 'alex@example.com', amount: 120, status: 'Paid' },
  { id: '2', email: 'zoe@example.com', amount: 80, status: 'Pending' },
  { id: '3', email: 'mika@example.com', amount: 200, status: 'Paid' },
  { id: '4', email: 'lee@example.com', amount: 45, status: 'Failed' },
  { id: '5', email: 'sam@example.com', amount: 310, status: 'Paid' },
];

const columns: DataTableColumn<Payment>[] = [
  { id: 'email', header: 'Email', accessorKey: 'email', sortable: true },
  {
    id: 'amount',
    header: 'Amount',
    accessorKey: 'amount',
    sortable: true,
    meta: { align: 'right' },
  },
  { id: 'status', header: 'Status', accessorKey: 'status', sortable: true },
];

describe('DataTable', () => {
  it('renders rows and supports search filtering', () => {
    renderWithProvider(
      <DataTable data={data} columns={columns} paginated={false} pageSizeOptions={[]} />,
    );

    expect(screen.getByText('alex@example.com')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search table rows'), {
      target: { value: 'zoe' },
    });
    expect(screen.queryByText('alex@example.com')).not.toBeInTheDocument();
    expect(screen.getByText('zoe@example.com')).toBeInTheDocument();
  });

  it('sorts when a sortable header is clicked', () => {
    renderWithProvider(
      <DataTable
        data={data}
        columns={columns}
        searchable={false}
        paginated={false}
        pageSizeOptions={[]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /amount/i }));
    const cells = screen.getAllByRole('cell').map((cell) => cell.textContent);
    expect(cells[1]).toBe('45');
  });

  it('supports row selection', () => {
    const onSelectionChange = vi.fn();

    renderWithProvider(
      <DataTable
        data={data}
        columns={columns}
        selectable
        searchable={false}
        paginated={false}
        pageSizeOptions={[]}
        onSelectionChange={onSelectionChange}
      />,
    );

    fireEvent.click(screen.getByLabelText('Select row 1'));
    expect(onSelectionChange).toHaveBeenCalledWith(['1']);
  });

  it('selects all filtered rows from the header checkbox', () => {
    const onSelectionChange = vi.fn();

    renderWithProvider(
      <DataTable
        data={data}
        columns={columns}
        selectable
        searchable={false}
        paginated
        pageSize={2}
        pageSizeOptions={[]}
        onSelectionChange={onSelectionChange}
      />,
    );

    fireEvent.click(screen.getByLabelText('Select all filtered rows'));
    expect(onSelectionChange).toHaveBeenCalledWith(['1', '2', '3', '4', '5']);
  });

  it('renders server-side row count in the footer', () => {
    renderWithProvider(
      <DataTable
        data={data.slice(0, 2)}
        columns={columns}
        searchable={false}
        manualPagination
        manualSorting
        manualFiltering
        rowCount={5}
        page={1}
        pageSize={2}
        pageSizeOptions={[]}
      />,
    );

    expect(screen.getByText('1–2 of 5 rows')).toBeInTheDocument();
  });

  it('changes page size from the footer selector', () => {
    const onPageSizeChange = vi.fn();

    renderWithProvider(
      <DataTable
        data={data}
        columns={columns}
        searchable={false}
        pageSize={5}
        pageSizeOptions={[5, 10]}
        onPageSizeChange={onPageSizeChange}
      />,
    );

    fireEvent.change(screen.getByLabelText('Rows per page'), { target: { value: '10' } });
    expect(onPageSizeChange).toHaveBeenCalledWith(10);
  });

  it('renders pagination ellipsis for many pages', () => {
    const manyRows = Array.from({ length: 25 }, (_, index) => ({
      id: String(index + 1),
      email: `user${index + 1}@example.com`,
      amount: index * 10,
      status: 'Paid',
    }));

    renderWithProvider(
      <DataTable
        data={manyRows}
        columns={columns}
        searchable={false}
        pageSize={1}
        pageSizeOptions={[]}
      />,
    );

    expect(screen.getByText('…')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    expect(screen.getByText('user2@example.com')).toBeInTheDocument();
  });

  it('renders skeleton rows while loading', () => {
    const { container } = renderWithProvider(
      <DataTable
        data={[]}
        columns={columns}
        loading
        loadingRowCount={3}
        searchable={false}
        paginated={false}
        pageSizeOptions={[]}
      />,
    );

    expect(container.querySelectorAll('[data-nb-skeleton]').length).toBeGreaterThan(0);
  });

  it('supports controlled sort via onSortChange', () => {
    const onSortChange = vi.fn();

    renderWithProvider(
      <DataTable
        data={data}
        columns={columns}
        searchable={false}
        paginated={false}
        pageSizeOptions={[]}
        sort={null}
        onSortChange={onSortChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /amount/i }));
    expect(onSortChange).toHaveBeenCalledWith({ columnId: 'amount', direction: 'asc' });
  });

  it('calls onRowClick when a row is clicked', () => {
    const onRowClick = vi.fn();

    renderWithProvider(
      <DataTable
        data={data}
        columns={columns}
        searchable={false}
        paginated={false}
        pageSizeOptions={[]}
        onRowClick={onRowClick}
      />,
    );

    fireEvent.click(screen.getByText('alex@example.com'));
    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
  });

  it('does not call onRowClick when an interactive cell is clicked', () => {
    const onRowClick = vi.fn();
    const actionColumns: DataTableColumn<Payment>[] = [
      ...columns,
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <button type="button" data-nb-data-table-no-row-click>
            Edit
          </button>
        ),
      },
    ];

    renderWithProvider(
      <DataTable
        data={data}
        columns={actionColumns}
        searchable={false}
        paginated={false}
        pageSizeOptions={[]}
        onRowClick={onRowClick}
      />,
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'Edit' })[0]!);
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('disables selection for rows rejected by enableRowSelection', () => {
    const onSelectionChange = vi.fn();

    renderWithProvider(
      <DataTable
        data={data}
        columns={columns}
        selectable
        searchable={false}
        paginated={false}
        pageSizeOptions={[]}
        enableRowSelection={(row) => row.status !== 'Failed'}
        onSelectionChange={onSelectionChange}
      />,
    );

    const failedCheckbox = screen.getByLabelText('Select row 4');
    expect(failedCheckbox).toBeDisabled();
    fireEvent.click(failedCheckbox);
    expect(onSelectionChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('Select all filtered rows'));
    expect(onSelectionChange).toHaveBeenCalledWith(['1', '2', '3', '5']);
  });

  it('right-aligns columns via align shorthand', () => {
    const alignColumns: DataTableColumn<Payment>[] = [
      { id: 'email', header: 'Email', accessorKey: 'email' },
      { id: 'amount', header: 'Amount', accessorKey: 'amount', align: 'right' },
    ];

    renderWithProvider(
      <DataTable
        data={data}
        columns={alignColumns}
        searchable={false}
        paginated={false}
        pageSizeOptions={[]}
      />,
    );

    const amountHeader = screen.getByRole('columnheader', { name: /amount/i });
    expect(amountHeader).toHaveClass('text-right');
  });
});
