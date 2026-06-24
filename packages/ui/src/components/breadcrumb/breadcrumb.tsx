import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';

export const Breadcrumb = forwardRef<HTMLElement, ComponentPropsWithoutRef<'nav'>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} aria-label="Breadcrumb" data-nb-breadcrumb="" {...props} className={cn(className)} />
  ),
);
Breadcrumb.displayName = 'Breadcrumb';

export const BreadcrumbList = forwardRef<HTMLOListElement, ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      data-nb-breadcrumb-list=""
      className={cn('flex flex-wrap items-center gap-2 text-sm font-bold', className)}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = 'BreadcrumbList';

export const BreadcrumbItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} data-nb-breadcrumb-item="" className={cn('inline-flex items-center gap-2', className)} {...props} />
  ),
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<'a'>>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      data-nb-breadcrumb-link=""
      className={cn('underline decoration-(--nb-border) underline-offset-4 hover:bg-(--nb-yellow)', className)}
      {...props}
    />
  ),
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

export const BreadcrumbPage = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} aria-current="page" data-nb-breadcrumb-page="" className={cn('font-black', className)} {...props} />
  ),
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

export const BreadcrumbSeparator = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
  ({ className, children = '/', ...props }, ref) => (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      data-nb-breadcrumb-separator=""
      className={cn('font-black opacity-60', className)}
      {...props}
    >
      {children}
    </span>
  ),
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
