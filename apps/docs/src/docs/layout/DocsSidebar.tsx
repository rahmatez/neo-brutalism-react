import { NavLink } from 'react-router-dom';
import { DOC_NAV } from '../nav';

const GROUP_COLORS = ['yellow', 'pink', 'mint', 'lavender'] as const;

export function DocsSidebar() {
  return (
    <aside
      className="docs-sidebar fixed top-32 left-8 hidden h-[calc(100vh-9rem)] w-72 overflow-y-auto border-4 border-(--nb-border) bg-(--nb-paper) px-4 py-5 shadow-[8px_8px_0_0_var(--nb-shadow)] lg:block"
      aria-label="Documentation navigation"
    >
      {DOC_NAV.map((group, idx) => (
        <section
          key={group.label}
          className={`sidebar-group ${idx === 0 ? 'pt-0' : ''}`}
          data-color={GROUP_COLORS[idx % GROUP_COLORS.length]}
        >
          <div className="sidebar-group__header">
            <span className="sidebar-group__chip">{group.label}</span>
            {group.label !== 'Getting started' && (
              <span className="sidebar-group__count">{group.items.length}</span>
            )}
          </div>
          <div className="space-y-1">
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'is-active' : ''}`
                }
                end={item.path === '/docs'}
              >
                <span className="sidebar-link__bullet" aria-hidden="true" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </section>
      ))}
    </aside>
  );
}
