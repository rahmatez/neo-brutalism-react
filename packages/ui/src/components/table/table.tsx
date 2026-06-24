import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';

export const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...props }, ref) => (
    <div data-nb-table-wrapper="" className="w-full overflow-x-auto">
      <table
        ref={ref}
        data-nb-table=""
        className={cn('w-full border-collapse text-left text-sm font-medium', className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = 'Table';

export const TableHeader = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<'thead'>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} data-nb-table-header="" className={cn('border-b-4 border-(--nb-border)', className)} {...props} />
  ),
);
TableHeader.displayName = 'TableHeader';

export const TableBody = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<'tbody'>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} data-nb-table-body="" className={cn('[&_tr:nth-child(even)]:bg-(--nb-paper)', className)} {...props} />
  ),
);
TableBody.displayName = 'TableBody';

export const TableRow = forwardRef<HTMLTableRowElement, ComponentPropsWithoutRef<'tr'>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} data-nb-table-row="" className={cn('border-b-2 border-(--nb-border)', className)} {...props} />
  ),
);
TableRow.displayName = 'TableRow';

export const TableHead = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'th'>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      data-nb-table-head=""
      className={cn('px-4 py-3 font-black uppercase tracking-wide', className)}
      {...props}
    />
  ),
);
TableHead.displayName = 'TableHead';

export const TableCell = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} data-nb-table-cell="" className={cn('px-4 py-3', className)} {...props} />
  ),
);
TableCell.displayName = 'TableCell';
