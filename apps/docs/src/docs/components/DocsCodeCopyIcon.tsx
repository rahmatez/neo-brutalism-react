export function DocsCodeCopyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
      className={className}
    >
      <rect x="5" y="5" width="9" height="9" />
      <path d="M2 11V2h9v2" />
      <line x1="7" y1="8.5" x2="12" y2="8.5" />
      <line x1="7" y1="10.5" x2="12" y2="10.5" />
    </svg>
  );
}
