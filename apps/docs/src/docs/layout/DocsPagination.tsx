import { Link, useLocation } from 'react-router-dom';
import { FLAT_DOC_NAV } from '../nav';

export function DocsPagination() {
  const { pathname } = useLocation();
  const idx = FLAT_DOC_NAV.findIndex((item) => item.path === pathname);
  const prev = idx > 0 ? FLAT_DOC_NAV[idx - 1] : null;
  const next = idx >= 0 && idx < FLAT_DOC_NAV.length - 1 ? FLAT_DOC_NAV[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="docs-pagination" aria-label="Documentation pagination">
      {prev ? (
        <Link to={prev.path} className="docs-pagination__link">
          <span className="docs-pagination__label">Previous</span>
          <span>{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link to={next.path} className="docs-pagination__link ml-auto text-right">
          <span className="docs-pagination__label">Next</span>
          <span>{next.label}</span>
        </Link>
      ) : null}
    </nav>
  );
}
