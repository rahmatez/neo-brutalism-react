export type HighlightLanguage =
  | 'html'
  | 'tsx'
  | 'typescript'
  | 'ts'
  | 'bash'
  | 'shell'
  | 'json'
  | 'css';

export function inferLanguage(title: string, code: string): HighlightLanguage {
  const normalizedTitle = title.trim().toLowerCase();
  const trimmedCode = code.trimStart();

  if (
    normalizedTitle.endsWith('.css') ||
    normalizedTitle.endsWith('.scss') ||
    trimmedCode.startsWith('@import ') ||
    trimmedCode.startsWith('@tailwind ') ||
    trimmedCode.startsWith(':root') ||
    trimmedCode.startsWith('@theme')
  ) {
    return 'css';
  }

  if (
    normalizedTitle === 'import' ||
    normalizedTitle.endsWith('.ts') ||
    normalizedTitle === 'component' ||
    trimmedCode.startsWith('import ')
  ) {
    return trimmedCode.includes('jsx') || trimmedCode.includes('<') ? 'tsx' : 'typescript';
  }

  if (
    normalizedTitle === 'install' ||
    trimmedCode.startsWith('npm ') ||
    trimmedCode.startsWith('pnpm ') ||
    trimmedCode.startsWith('npx ') ||
    trimmedCode.startsWith('pnpx ')
  ) {
    return 'bash';
  }

  return 'tsx';
}
