import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';

export const Pagination = forwardRef<HTMLElement, ComponentPropsWithoutRef<'nav'>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} aria-label="Pagination" data-nb-pagination="" className={cn(className)} {...props} />
  ),
);
Pagination.displayName = 'Pagination';

export const PaginationContent = forwardRef<HTMLUListElement, ComponentPropsWithoutRef<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} data-nb-pagination-content="" className={cn('flex flex-wrap items-center gap-2', className)} {...props} />
  ),
);
PaginationContent.displayName = 'PaginationContent';

export const PaginationItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} data-nb-pagination-item="" className={cn(className)} {...props} />
  ),
);
PaginationItem.displayName = 'PaginationItem';

export interface PaginationLinkProps extends ComponentPropsWithoutRef<'button'> {
  isActive?: boolean;
}

export const PaginationLink = forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      data-nb-pagination-link=""
      data-state={isActive ? 'active' : 'inactive'}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'min-w-10 border-2 border-(--nb-border) px-3 py-2 text-sm font-black shadow-[3px_3px_0_0_var(--nb-shadow)]',
        isActive ? 'bg-(--nb-mint)' : 'bg-(--nb-paper) hover:bg-(--nb-yellow)',
        className,
      )}
      {...props}
    />
  ),
);
PaginationLink.displayName = 'PaginationLink';

export const PaginationPrevious = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ className, children = 'Prev', ...props }, ref) => (
    <PaginationLink ref={ref} className={cn(className)} {...props}>
      {children}
    </PaginationLink>
  ),
);
PaginationPrevious.displayName = 'PaginationPrevious';

export const PaginationNext = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ className, children = 'Next', ...props }, ref) => (
    <PaginationLink ref={ref} className={cn(className)} {...props}>
      {children}
    </PaginationLink>
  ),
);
PaginationNext.displayName = 'PaginationNext';
