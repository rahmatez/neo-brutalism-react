import { DocsApiTable, type ApiTableRow } from './DocsApiTable';

interface TokenRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface DocsTokensProps {
  tokens: TokenRow[];
}

export function DocsTokens({ tokens }: DocsTokensProps) {
  const rows: ApiTableRow[] = tokens.map((row) => ({
    name: row.name,
    type: row.type,
    default: row.default,
    description: row.description,
  }));

  return <DocsApiTable rows={rows} variant="props-desc" />;
}

export { DocsApiTable, type ApiTableRow } from './DocsApiTable';
export { DocsCustomizationTokens } from './DocsCustomizationTokens';
