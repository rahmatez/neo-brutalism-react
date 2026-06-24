import { type ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

let lastPathname: string | undefined;

export function PageTransition({ children, className }: PageTransitionProps) {
  const { pathname } = useLocation();
  const shouldAnimate = lastPathname !== undefined && lastPathname !== pathname;
  const contentKey = useRef(pathname);

  if (shouldAnimate) {
    contentKey.current = pathname;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    lastPathname = pathname;
  }, [pathname]);

  return (
    <div
      key={shouldAnimate ? contentKey.current : 'page-static'}
      className={[shouldAnimate && 'page-route-enter', className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}
