'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import {
  Controller,
  FormProvider,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form';
import { cn } from '../../core/cn';
import { Label } from '../label/label';
import {
  FormFieldContext,
  FormItemContext,
  useFormField,
  useFormItemContextValue,
  useFormItemId,
  useFormItemSlot,
  useFormItemSlotRegistrar,
  useFormItemSlots,
} from './form-context';
import { FormSlot } from './form-slot';

const Form = FormProvider;

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

export interface FormItemProps extends ComponentPropsWithoutRef<'div'> {
  /** Horizontal label + control layout (checkbox / switch rows). */
  layout?: 'vertical' | 'horizontal';
}

const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, layout = 'vertical', ...props }, ref) => {
    const id = useFormItemId();
    const [slots, setSlots] = useFormItemSlots();
    const setSlot = useFormItemSlotRegistrar(setSlots);
    const value = useFormItemContextValue(id, slots, setSlot);

    return (
      <FormItemContext.Provider value={value}>
        <div
          ref={ref}
          data-nb-form-item=""
          data-layout={layout}
          className={cn(
            layout === 'horizontal'
              ? 'flex flex-row items-start gap-3 space-y-0'
              : 'grid gap-2',
            className,
          )}
          {...props}
        />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = 'FormItem';

export interface FormLabelProps extends Omit<ComponentPropsWithoutRef<typeof Label>, 'htmlFor'> {
  optional?: boolean;
  /** Pass `false` for composite controls wired with `aria-labelledby`. */
  htmlFor?: string | false;
}

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, optional, htmlFor, children, ...props }, ref) => {
    const { error, formItemId, formLabelId } = useFormField();
    const labelFor = htmlFor === false ? undefined : (htmlFor ?? formItemId);

    return (
      <Label
        ref={ref}
        id={formLabelId}
        data-nb-form-label=""
        className={cn(error && 'text-(--nb-danger)', className)}
        htmlFor={labelFor}
        {...props}
      >
        {children}
        {optional ? (
          <span className="ml-1 font-medium text-(--nb-foreground)/60">(optional)</span>
        ) : null}
      </Label>
    );
  },
);
FormLabel.displayName = 'FormLabel';

const FormControl = forwardRef<HTMLElement, ComponentPropsWithoutRef<typeof FormSlot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, describedBy } = useFormField();

    return (
      <FormSlot
        ref={ref}
        data-nb-form-control=""
        id={formItemId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        {...props}
      />
    );
  },
);
FormControl.displayName = 'FormControl';

const FormDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    useFormItemSlot('description', true);

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        data-nb-form-description=""
        className={cn('text-sm font-medium text-(--nb-foreground)/70', className)}
        {...props}
      />
    );
  },
);
FormDescription.displayName = 'FormDescription';

const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error.message ?? '') : children;
    const visible = Boolean(body);

    useFormItemSlot('message', visible);

    if (!visible) return null;

    return (
      <p
        ref={ref}
        id={formMessageId}
        role="alert"
        data-nb-form-message=""
        className={cn('text-sm font-bold text-(--nb-danger)', className)}
        {...props}
      >
        {body}
      </p>
    );
  },
);
FormMessage.displayName = 'FormMessage';

export interface FormActionsProps extends ComponentPropsWithoutRef<'div'> {
  align?: 'start' | 'end' | 'between';
}

const FormActions = forwardRef<HTMLDivElement, FormActionsProps>(
  ({ className, align = 'end', ...props }, ref) => (
    <div
      ref={ref}
      data-nb-form-actions=""
      className={cn(
        'flex flex-wrap items-center gap-3 pt-2',
        align === 'start' && 'justify-start',
        align === 'end' && 'justify-end',
        align === 'between' && 'justify-between',
        className,
      )}
      {...props}
    />
  ),
);
FormActions.displayName = 'FormActions';

export interface FormRootProps<TFieldValues extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit' | 'onInvalid'> {
  form: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  onSubmitInvalid?: SubmitErrorHandler<TFieldValues>;
  children?: ReactNode;
}

function FormRoot<TFieldValues extends FieldValues>({
  form,
  onSubmit,
  onSubmitInvalid,
  children,
  ...props
}: FormRootProps<TFieldValues>) {
  return (
    <Form {...form}>
      <form
        data-nb-form=""
        noValidate
        onSubmit={form.handleSubmit(onSubmit, onSubmitInvalid)}
        {...props}
      >
        {children}
      </form>
    </Form>
  );
}

export {
  Form,
  FormActions,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRoot,
  useFormField,
};
