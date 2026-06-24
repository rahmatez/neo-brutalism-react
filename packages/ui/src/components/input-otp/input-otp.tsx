'use client';

import {
  forwardRef,
  useId,
  useRef,
  type ClipboardEvent,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../core/cn';

export interface InputOTPProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  /** Accessible name for the digit group. */
  'aria-label'?: string;
}

export const InputOTP = forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      className,
      length = 6,
      value = '',
      onChange,
      'aria-label': ariaLabel = 'One-time passcode',
      ...props
    },
    ref,
  ) => {
    const groupId = useId();
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const chars = Array.from({ length }, (_, i) => value[i] ?? '');

    const updateValue = (nextChars: string[]) => {
      onChange?.(nextChars.join('').slice(0, length));
    };

    const updateAt = (index: number, char: string) => {
      const next = chars.map((c, i) => (i === index ? char : c));
      updateValue(next);
    };

    const focusIndex = (index: number) => {
      const clamped = Math.max(0, Math.min(length - 1, index));
      inputsRef.current[clamped]?.focus();
      inputsRef.current[clamped]?.select();
    };

    const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Backspace' && !chars[index] && index > 0) {
        focusIndex(index - 1);
      }
      if (event.key === 'ArrowLeft' && index > 0) {
        event.preventDefault();
        focusIndex(index - 1);
      }
      if (event.key === 'ArrowRight' && index < length - 1) {
        event.preventDefault();
        focusIndex(index + 1);
      }
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
      if (!pasted) return;

      const next = Array.from({ length }, (_, i) => pasted[i] ?? '');
      updateValue(next);

      const nextFocus = pasted.length >= length ? length - 1 : pasted.length;
      focusIndex(nextFocus);
    };

    return (
      <div
        ref={ref}
        id={groupId}
        role="group"
        aria-label={ariaLabel}
        data-nb-input-otp=""
        className={cn('flex gap-2', className)}
        {...props}
      >
        {chars.map((char, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={char}
            aria-label={`Digit ${index + 1} of ${length}`}
            className="size-12 border-2 border-(--nb-border) bg-(--nb-paper) text-center text-lg font-black shadow-[3px_3px_0_0_var(--nb-shadow)] outline-none focus:bg-(--nb-yellow)"
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '').slice(-1);
              updateAt(index, v);
              if (v && index < length - 1) focusIndex(index + 1);
            }}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
          />
        ))}
      </div>
    );
  },
);
InputOTP.displayName = 'InputOTP';
