export function canSelectDataTableRow<TData>(
  row: TData,
  enableRowSelection?: boolean | ((row: TData) => boolean),
): boolean {
  if (enableRowSelection === undefined) return true;
  if (typeof enableRowSelection === 'function') return enableRowSelection(row);
  return enableRowSelection;
}

export function isInteractiveTableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest('button, a, input, select, textarea, label, [role="button"], [data-nb-data-table-no-row-click]'),
  );
}
