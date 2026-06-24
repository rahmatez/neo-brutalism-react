import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { DOC_NAV } from '../nav';
import { TOP_SECTIONS, type Section } from './sections';

const GROUP_COLORS = ['yellow', 'pink', 'mint', 'lavender'] as const;

interface DocsMobileDrawerProps {
  open: boolean;
  onClose: () => void;
  activeSection: Section;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function DocsMobileDrawer({ open, onClose, activeSection }: DocsMobileDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        aria-hidden="true"
        onClick={onClose}
      />

      <aside
        id="docs-mobile-drawer"
        className="mobile-drawer fixed top-3 right-3 bottom-3 z-50 flex w-[min(20rem,calc(100vw-1.5rem))] flex-col overflow-hidden border-4 border-(--nb-border) bg-(--nb-paper) shadow-[8px_8px_0_0_var(--nb-shadow)] lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Documentation navigation"
      >
        <div className="flex items-center justify-between gap-3 border-b-4 border-(--nb-border) bg-(--nb-yellow) px-4 py-3">
          <span className="font-display text-base font-black tracking-wide uppercase">Menu</span>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border-3 border-(--nb-border) bg-(--nb-paper) shadow-[3px_3px_0_0_var(--nb-shadow)] transition-transform hover:-translate-y-0.5"
            aria-label="Close navigation menu"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <section className="mb-5">
            <p className="mb-3 inline-block border-3 border-(--nb-border) bg-(--nb-lavender) px-2 py-0.5 font-mono text-[0.65rem] font-black tracking-wider text-white uppercase shadow-[2px_2px_0_0_var(--nb-shadow)]">
              Sections
            </p>
            <div className="flex flex-col gap-2">
              {TOP_SECTIONS.map((chip) => (
                <NavLink
                  key={chip.section}
                  to={chip.path}
                  className={`section-chip ${activeSection === chip.section ? 'section-chip--active' : ''}`}
                  onClick={onClose}
                >
                  {chip.label}
                </NavLink>
              ))}
            </div>
          </section>

          {DOC_NAV.map((group, idx) => (
            <section
              key={group.label}
              className="drawer-group"
              data-color={GROUP_COLORS[idx % GROUP_COLORS.length]}
            >
              <div className="drawer-group__header">
                <span className="drawer-group__chip">{group.label}</span>
                {group.label !== 'Getting started' && (
                  <span className="drawer-group__count">{group.items.length}</span>
                )}
              </div>

              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `drawer-link ${isActive ? 'is-active' : ''}`}
                    end={item.path === '/docs'}
                    onClick={onClose}
                  >
                    <span className="drawer-link__bullet" aria-hidden="true" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </section>
          ))}
        </div>
      </aside>
    </>
  );
}
