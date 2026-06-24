'use client';

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { useFormContext, type FieldPath, type FieldValues } from 'react-hook-form';

export interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export type FormItemSlot = 'description' | 'message';

export interface FormItemSlots {
  description: boolean;
  message: boolean;
}

export interface FormItemContextValue {
  id: string;
  slots: FormItemSlots;
  setSlot: (slot: FormItemSlot, mounted: boolean) => void;
}

export const FormItemContext = createContext<FormItemContextValue | null>(null);

export function buildFormFieldDescribedBy({
  formDescriptionId,
  formMessageId,
  slots,
}: {
  formDescriptionId: string;
  formMessageId: string;
  slots: FormItemSlots;
}): string | undefined {
  const ids: string[] = [];
  if (slots.description) ids.push(formDescriptionId);
  if (slots.message) ids.push(formMessageId);
  return ids.length > 0 ? ids.join(' ') : undefined;
}

export function useFormField() {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error('useFormField must be used within <FormField>.');
  }

  if (!itemContext) {
    throw new Error('useFormField must be used within <FormItem>.');
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id, slots } = itemContext;

  const formItemId = `${id}-form-item`;
  const formLabelId = `${id}-form-label`;
  const formDescriptionId = `${id}-form-item-description`;
  const formMessageId = `${id}-form-item-message`;

  const describedBy = buildFormFieldDescribedBy({
    formDescriptionId,
    formMessageId,
    slots,
  });

  return {
    id,
    name: fieldContext.name,
    formItemId,
    formLabelId,
    formDescriptionId,
    formMessageId,
    describedBy,
    slots,
    ...fieldState,
  };
}

export function useFormItemId(): string {
  return useId();
}

export function useFormItemSlots(): [
  FormItemSlots,
  Dispatch<SetStateAction<FormItemSlots>>,
] {
  return useState<FormItemSlots>({ description: false, message: false });
}

export function useFormItemSlotRegistrar(
  setSlots: Dispatch<SetStateAction<FormItemSlots>>,
): (slot: FormItemSlot, mounted: boolean) => void {
  return useCallback((slot, mounted) => {
    setSlots((previous) => {
      if (previous[slot] === mounted) return previous;
      return { ...previous, [slot]: mounted };
    });
  }, [setSlots]);
}

export function useFormItemContextValue(
  id: string,
  slots: FormItemSlots,
  setSlot: (slot: FormItemSlot, mounted: boolean) => void,
): FormItemContextValue {
  return useMemo(() => ({ id, slots, setSlot }), [id, setSlot, slots]);
}

export function useFormItemSlot(slot: FormItemSlot, mounted: boolean) {
  const itemContext = useContext(FormItemContext);
  const setSlot = itemContext?.setSlot;

  useLayoutEffect(() => {
    if (!setSlot) return;
    setSlot(slot, mounted);
    return () => setSlot(slot, false);
  }, [mounted, setSlot, slot]);
}
