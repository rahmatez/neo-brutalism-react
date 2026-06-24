import {
  Badge,
  Button,
  DataTable,
  filterRows,
  paginateRows,
  sortRows,
  useDataTable,
  type DataTableColumn,
  type DataTableSortState,
} from 'neobrutalism-ui-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/data-table';

const importCode = `import { DataTable, type DataTableColumn } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `const columns: DataTableColumn<Payment>[] = [
  { id: 'email', header: 'Email', accessorKey: 'email', sortable: true },
  {
    id: 'amount',
    header: 'Amount',
    accessorKey: 'amount',
    sortable: true,
    meta: { align: 'right' },
    cell: ({ value }) => \`$\${value}\`,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ value }) => <Badge tone={value === 'Paid' ? 'success' : 'warning'}>{String(value)}</Badge>,
  },
];

<DataTable data={payments} columns={columns} caption="Recent payments" pageSize={5} />`;

const controlledExampleCode = `const [search, setSearch] = useState('');
const [sort, setSort] = useState<DataTableSortState | null>(null);
const [page, setPage] = useState(1);

<DataTable
  data={payments}
  columns={columns}
  search={search}
  onSearchChange={setSearch}
  sort={sort}
  onSortChange={setSort}
  page={page}
  onPageChange={setPage}
/>`;

const serverSideExampleCode = `// Parent fetches/slices data — table skips client sort/filter/page logic.
const pageData = paginateRows(sortedRows, page, pageSize);

<DataTable
  data={pageData}
  columns={columns}
  rowCount={sortedRows.length}
  manualPagination
  manualSorting
  manualFiltering
  search={search}
  onSearchChange={setSearch}
  sort={sort}
  onSortChange={setSort}
  page={page}
  onPageChange={setPage}
  pageSize={pageSize}
  onPageSizeChange={setPageSize}
/>`;

const selectionExampleCode = `<DataTable
  data={payments}
  columns={columns}
  selectable
  enableRowSelection={(row) => row.status !== 'Failed'}
  onSelectionChange={(ids) => console.log(ids)}
/>`;

const toolbarExampleCode = `<DataTable
  data={payments}
  columns={columns}
  toolbar={
    <Button type="button" tone="secondary" size="sm">
      Export CSV
    </Button>
  }
/>`;

const stickyHeaderExampleCode = `<DataTable
  data={longPayments}
  columns={columns}
  stickyHeader
  maxHeight="16rem"
  searchable={false}
  pageSize={longPayments.length}
/>`;

const rowClickExampleCode = `<DataTable
  data={payments}
  columns={columns}
  onRowClick={(row) => console.log(row.id)}
/>`;

const loadingExampleCode = `<DataTable data={[]} columns={columns} loading loadingRowCount={4} />`;

const headlessExampleCode = `const table = useDataTable({ data: payments, columns, pageSize: 5 });

// Drive your own UI from table.pageRows, table.sort, table.setSearch, etc.`;

const dataTableApiRows = [
  {
    name: 'data',
    type: 'TData[]',
    description: 'Full dataset rendered by the table.',
  },
  {
    name: 'columns',
    type: 'DataTableColumn<TData>[]',
    description: 'Column definitions with accessor, cell renderer, and sort config.',
  },
  {
    name: 'searchable',
    type: 'boolean',
    default: 'true',
    description: 'Show the global search field above the table.',
  },
  {
    name: 'paginated',
    type: 'boolean',
    default: 'true',
    description: 'Paginate rows client-side with the built-in footer.',
  },
  {
    name: 'pageSize',
    type: 'number',
    default: '10',
    description: 'Rows per page when paginated.',
  },
  {
    name: 'selectable',
    type: 'boolean',
    default: 'false',
    description: 'Enable per-row and per-page checkbox selection.',
  },
  {
    name: 'sort / onSortChange',
    type: 'DataTableSortState',
    description: 'Controlled column sorting state.',
  },
  {
    name: 'search / onSearchChange',
    type: 'string',
    description: 'Controlled global filter query.',
  },
  {
    name: 'selectedRowIds / onSelectionChange',
    type: 'string[]',
    description: 'Controlled row selection ids.',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Render skeleton rows instead of data.',
  },
  {
    name: 'pageSizeOptions',
    type: 'number[]',
    default: '[5, 10, 20, 50]',
    description: 'Rows-per-page choices in the footer selector.',
  },
  {
    name: 'manualSorting / manualFiltering / manualPagination',
    type: 'boolean',
    default: 'false',
    description: 'Skip client logic; parent supplies pre-processed `data` (and `rowCount` when paginated).',
  },
  {
    name: 'rowCount',
    type: 'number',
    description: 'Total filtered rows for server-driven pagination footers.',
  },
  {
    name: 'toolbar / footer',
    type: 'ReactNode',
    description: 'Custom slots beside search or above pagination.',
  },
  {
    name: 'stickyHeader',
    type: 'boolean',
    default: 'false',
    description: 'Keep header visible inside a scrollable table body.',
  },
  {
    name: 'maxHeight',
    type: 'string | number',
    default: '24rem',
    description: 'Scroll container height when `stickyHeader` is enabled.',
  },
  {
    name: 'onRowClick',
    type: '(row, rowIndex) => void',
    description: 'Row click handler; ignores interactive targets (buttons, links, inputs).',
  },
  {
    name: 'enableRowSelection',
    type: 'boolean | (row) => boolean',
    description: 'Disable selection per row; header checkbox selects only eligible rows.',
  },
];

const columnApiRows = [
  {
    name: 'align / meta.align',
    type: "'left' | 'center' | 'right'",
    description: 'Cell and header text alignment (`align` is shorthand for `meta.align`).',
  },
  {
    name: 'sortable',
    type: 'boolean',
    default: 'true',
    description: 'Enable column sorting unless set to false.',
  },
  {
    name: 'enableGlobalFilter',
    type: 'boolean',
    default: 'true',
    description: 'Include column values in global search.',
  },
];

interface Payment {
  id: string;
  email: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed';
}

const payments: Payment[] = [
  { id: '1', email: 'alex@example.com', amount: 120, status: 'Paid' },
  { id: '2', email: 'zoe@example.com', amount: 80, status: 'Pending' },
  { id: '3', email: 'mika@example.com', amount: 200, status: 'Paid' },
  { id: '4', email: 'lee@example.com', amount: 45, status: 'Failed' },
  { id: '5', email: 'sam@example.com', amount: 310, status: 'Paid' },
  { id: '6', email: 'ivy@example.com', amount: 150, status: 'Pending' },
];

function usePaymentColumns(): DataTableColumn<Payment>[] {
  return useMemo(
    () => [
      { id: 'email', header: 'Email', accessorKey: 'email', sortable: true },
      {
        id: 'amount',
        header: 'Amount',
        accessorKey: 'amount',
        sortable: true,
        meta: { align: 'right' },
        cell: ({ value }) => `$${value}`,
      },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        sortable: true,
        cell: ({ value }) => (
          <Badge
            tone={
              value === 'Paid' ? 'success' : value === 'Pending' ? 'warning' : 'danger'
            }
          >
            {String(value)}
          </Badge>
        ),
      },
    ],
    [],
  );
}

function DefaultDataTableDemo() {
  const columns = usePaymentColumns();
  return <DataTable data={payments} columns={columns} caption="Recent payments" pageSize={5} />;
}

function SelectionDataTableDemo() {
  const columns = usePaymentColumns();
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="space-y-3">
      <DataTable
        data={payments}
        columns={columns}
        selectable
        selectedRowIds={selected}
        onSelectionChange={setSelected}
        pageSize={5}
      />
      <p className="text-sm font-medium">
        Selected ids: <code className="font-mono">{selected.join(', ') || 'none'}</code>
      </p>
    </div>
  );
}

function LoadingDataTableDemo() {
  const columns = usePaymentColumns();
  return <DataTable data={[]} columns={columns} loading loadingRowCount={4} pageSize={5} />;
}

function ControlledDataTableDemo() {
  const columns = usePaymentColumns();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<DataTableSortState | null>(null);
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-3">
      <DataTable
        data={payments}
        columns={columns}
        caption="Controlled table"
        pageSize={5}
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        page={page}
        onPageChange={setPage}
      />
      <p className="text-sm font-medium">
        Search: <code className="font-mono">{search || '∅'}</code> · Sort:{' '}
        <code className="font-mono">
          {sort ? `${sort.columnId} ${sort.direction}` : 'none'}
        </code>{' '}
        · Page: <code className="font-mono">{page}</code>
      </p>
    </div>
  );
}

function ServerSideDataTableDemo() {
  const columns = usePaymentColumns();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<DataTableSortState | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filtered = useMemo(
    () => filterRows(payments, search, columns),
    [columns, search],
  );
  const sorted = useMemo(() => sortRows(filtered, columns, sort), [columns, filtered, sort]);
  const pageData = useMemo(
    () => paginateRows(sorted, page, pageSize),
    [page, pageSize, sorted],
  );

  return (
    <DataTable
      data={pageData}
      columns={columns}
      caption="Server-driven page"
      rowCount={sorted.length}
      manualPagination
      manualSorting
      manualFiltering
      search={search}
      onSearchChange={setSearch}
      sort={sort}
      onSortChange={setSort}
      page={page}
      onPageChange={setPage}
      pageSize={pageSize}
      onPageSizeChange={setPageSize}
    />
  );
}

function ToolbarDataTableDemo() {
  const columns = usePaymentColumns();
  return (
    <DataTable
      data={payments}
      columns={columns}
      pageSize={5}
      toolbar={
        <Button type="button" tone="secondary" size="sm">
          Export CSV
        </Button>
      }
    />
  );
}

function StickyHeaderDataTableDemo() {
  const columns = usePaymentColumns();
  const longPayments = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: String(index + 1),
        email: `user${index + 1}@example.com`,
        amount: (index + 1) * 25,
        status: (['Paid', 'Pending', 'Failed'] as const)[index % 3],
      })),
    [],
  );

  return (
    <DataTable
      data={longPayments}
      columns={columns}
      caption="Scrollable table"
      stickyHeader
      maxHeight="16rem"
      searchable={false}
      pageSize={longPayments.length}
      pageSizeOptions={[]}
    />
  );
}

function RowClickDataTableDemo() {
  const columns = usePaymentColumns();
  const [lastClicked, setLastClicked] = useState<string>('none');

  return (
    <div className="space-y-3">
      <DataTable
        data={payments}
        columns={columns}
        pageSize={5}
        onRowClick={(row) => setLastClicked(row.email)}
      />
      <p className="text-sm font-medium">
        Last clicked: <code className="font-mono">{lastClicked}</code>
      </p>
    </div>
  );
}

function DisabledSelectionDataTableDemo() {
  const columns = usePaymentColumns();
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="space-y-3">
      <DataTable
        data={payments}
        columns={columns}
        selectable
        selectedRowIds={selected}
        onSelectionChange={setSelected}
        enableRowSelection={(row) => row.status !== 'Failed'}
        pageSize={5}
      />
      <p className="text-sm font-medium">
        Failed rows cannot be selected. Selected:{' '}
        <code className="font-mono">{selected.join(', ') || 'none'}</code>
      </p>
    </div>
  );
}

function HeadlessDataTableDemo() {
  const columns = usePaymentColumns();
  const table = useDataTable({ data: payments, columns, pageSize: 3 });

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button type="button" tone="secondary" onClick={() => table.setSearch('paid')}>
          Filter paid
        </Button>
        <Button type="button" tone="secondary" onClick={() => table.toggleSort('amount')}>
          Sort amount
        </Button>
      </div>
      <ul className="list-disc space-y-1 pl-6 text-sm font-medium">
        {table.pageRows.map((row) => (
          <li key={row.id}>
            {row.email} — ${row.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DataTablePage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Data Table</p>
          <h1>Data Table</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Sortable, searchable, paginated tables for dashboards and admin UIs. Composes{' '}
            <Link to="/components/table" className="font-bold underline underline-offset-2">
              Table
            </Link>
            ,{' '}
            <Link to="/components/pagination" className="font-bold underline underline-offset-2">
              Pagination
            </Link>
            , and{' '}
            <Link to="/components/checkbox" className="font-bold underline underline-offset-2">
              Checkbox
            </Link>{' '}
            primitives with a column-driven API and optional{' '}
            <code className="font-mono">useDataTable</code> headless hook — no extra table
            library required.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">Sort</span>
            <span className="nb-stat-tile__label">Columns</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">Filter</span>
            <span className="nb-stat-tile__label">Global</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">Zero</span>
            <span className="nb-stat-tile__label">Extra deps</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode} layout="spacious">
          <DefaultDataTableDemo />
        </DocsExample>
      </section>

      <section id="when-to-use">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          When to Use
        </h2>
        <div className="max-w-3xl space-y-4 font-medium">
          <p>
            Use <strong>Data Table</strong> when rows need client-side sorting, filtering,
            pagination, or bulk selection — invoices, users, orders, and analytics lists.
          </p>
          <p>
            Use{' '}
            <Link to="/components/table" className="font-bold underline underline-offset-2">
              Table
            </Link>{' '}
            primitives directly for static markup, simple docs tables, or fully custom data grids
            where you manage state yourself.
          </p>
        </div>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Column-driven table" code={defaultExampleCode} />
      </section>

      <section id="controlled">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Controlled
        </h2>
        <DocsExample code={controlledExampleCode} layout="spacious">
          <ControlledDataTableDemo />
        </DocsExample>
      </section>

      <section id="server-side">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Server-side Mode
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Set <code className="font-mono">manualPagination</code>,{' '}
          <code className="font-mono">manualSorting</code>, and{' '}
          <code className="font-mono">manualFiltering</code> when the parent fetches or slices
          data. Pass <code className="font-mono">rowCount</code> for accurate pagination footers.
        </p>
        <DocsExample code={serverSideExampleCode} layout="spacious">
          <ServerSideDataTableDemo />
        </DocsExample>
      </section>

      <section id="toolbar">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Custom Toolbar
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Pass <code className="font-mono">toolbar</code> to slot actions beside the search field —
          export, filters, or view toggles.
        </p>
        <DocsExample code={toolbarExampleCode} layout="spacious">
          <ToolbarDataTableDemo />
        </DocsExample>
      </section>

      <section id="sticky-header">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Sticky Header
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Enable <code className="font-mono">stickyHeader</code> with <code className="font-mono">maxHeight</code>{' '}
          so column labels stay visible while the body scrolls.
        </p>
        <DocsExample code={stickyHeaderExampleCode} layout="spacious">
          <StickyHeaderDataTableDemo />
        </DocsExample>
      </section>

      <section id="row-click">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Row Click
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Use <code className="font-mono">onRowClick</code> for row-level navigation or detail
          drawers. Clicks on buttons, links, and inputs are ignored automatically.
        </p>
        <DocsExample code={rowClickExampleCode} layout="spacious">
          <RowClickDataTableDemo />
        </DocsExample>
      </section>

      <section id="selection">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Row Selection
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          The header checkbox selects every row in the current filtered result, not only the active
          page. Use <code className="font-mono">enableRowSelection</code> to skip ineligible rows.
        </p>
        <DocsExample code={selectionExampleCode} layout="spacious">
          <SelectionDataTableDemo />
        </DocsExample>
        <h3 className="mt-8 mb-3 text-xl font-bold">Disabled rows</h3>
        <DocsExample code={selectionExampleCode} layout="spacious">
          <DisabledSelectionDataTableDemo />
        </DocsExample>
      </section>

      <section id="loading">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Loading
        </h2>
        <DocsExample code={loadingExampleCode} layout="spacious">
          <LoadingDataTableDemo />
        </DocsExample>
      </section>

      <section id="headless">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Headless Hook
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          <code className="font-mono">useDataTable</code> exposes the same sort/filter/pagination
          logic without rendering UI — useful for cards, mobile lists, or custom layouts.
        </p>
        <DocsExample code={headlessExampleCode}>
          <HeadlessDataTableDemo />
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="data-table" />

      <section id="accessibility">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Accessibility
        </h2>
        <ul className="list-disc space-y-2 pl-6 font-medium">
          <li>
            Semantic table markup with an optional <code className="font-mono">&lt;caption&gt;</code>{' '}
            for the table title.
          </li>
          <li>
            Sortable headers use <code className="font-mono">aria-sort</code> on the{' '}
            <code className="font-mono">&lt;th&gt;</code> element.
          </li>
          <li>Search field has a visible label for screen readers.</li>
          <li>Selection checkboxes expose row-specific labels.</li>
          <li>Pagination reuses the Pagination nav landmark with page buttons.</li>
        </ul>
      </section>

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={dataTableApiRows} variant="props-desc" minWidth="min-w-160" />
        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">DataTableColumn</code>
        </h3>
        <DocsApiTable rows={columnApiRows} variant="props-desc" minWidth="min-w-140" />
        <p className="mt-4 max-w-3xl text-sm font-medium">
          Column helpers also include <code className="font-mono">accessorKey</code>,{' '}
          <code className="font-mono">accessorFn</code>, <code className="font-mono">cell</code>, and{' '}
          <code className="font-mono">sortFn</code>.
        </p>
      </section>
    </article>
  );
}
