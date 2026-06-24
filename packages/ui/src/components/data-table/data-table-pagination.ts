export type DataTablePaginationToken = number | 'ellipsis';

export function getPaginationItems(
  current: number,
  total: number,
): DataTablePaginationToken[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: DataTablePaginationToken[] = [1];

  if (current > 3) {
    items.push('ellipsis');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (current < total - 2) {
    items.push('ellipsis');
  }

  if (total > 1) {
    items.push(total);
  }

  return items;
}
