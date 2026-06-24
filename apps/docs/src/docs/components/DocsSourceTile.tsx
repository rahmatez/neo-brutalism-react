interface DocsSourceTileProps {
  href: string;
}

export function DocsSourceTile({ href }: DocsSourceTileProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="nb-stat-tile nb-stat-tile--lavender nb-stat-tile--interactive"
    >
      <span className="nb-stat-tile__value">Source</span>
      <span className="nb-stat-tile__label">View on GitHub</span>
    </a>
  );
}
