import type { ReactNode } from 'react';

export interface ApiTableRow {
  name: string;
  type?: string;
  default?: string;
  description?: ReactNode;
}

type DocsApiTableVariant = 'props' | 'props-desc' | 'parts';

interface DocsApiTableProps {
  rows: ApiTableRow[];
  variant?: DocsApiTableVariant;
  minWidth?: string;
}

const tableShell =
  'overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]';
const thClass = 'border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold';
const thLast = 'border-b-2 border-(--nb-border) px-4 py-3 font-bold';

export function DocsApiTable({
  rows,
  variant = 'props',
  minWidth = 'min-w-160',
}: DocsApiTableProps) {
  if (variant === 'parts') {
    return (
      <div className={tableShell}>
        <table className={`w-full ${minWidth} border-collapse text-left`}>
          <thead className="bg-nb-secondary text-nb-secondary-fg">
            <tr>
              <th className={thClass}>Part</th>
              <th className={thLast}>Description</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {rows.map((row, index) => (
              <tr
                key={row.name}
                className={index < rows.length - 1 ? 'border-b-2 border-(--nb-border)' : ''}
              >
                <td className="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  {row.name}
                </td>
                <td className="px-4 py-3">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const fourCol = variant === 'props-desc';

  return (
    <div className={tableShell}>
      <table className={`w-full ${minWidth} border-collapse text-left`}>
        <thead className="bg-nb-secondary text-nb-secondary-fg">
          <tr>
            <th className={thClass}>Input</th>
            <th className={thClass}>Type</th>
            {fourCol ? <th className={thClass}>Default</th> : null}
            {!fourCol ? <th className={thLast}>Default</th> : null}
            {fourCol ? <th className={thLast}>Description</th> : null}
          </tr>
        </thead>
        <tbody className="font-medium">
          {rows.map((row, index) => (
            <tr
              key={row.name}
              className={index < rows.length - 1 ? 'border-b-2 border-(--nb-border)' : ''}
            >
              <td
                className={`border-r-2 border-(--nb-border) px-4 py-3 ${fourCol ? 'font-mono text-sm' : ''}`}
              >
                {row.name}
              </td>
              <td className="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                {row.type}
              </td>
              <td
                className={`${fourCol ? 'border-r-2 border-(--nb-border) ' : ''}px-4 py-3 font-mono text-sm`}
              >
                {row.default}
              </td>
              {fourCol ? <td className="px-4 py-3">{row.description}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
