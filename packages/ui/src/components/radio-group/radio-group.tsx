import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '../../core/cn';
import { nbToneVars, type NbToneToken } from '../../tokens/tone';

type RadioGroupContextValue = {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  tone: NbToneToken;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroup() {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) throw new Error('RadioGroupItem must be used within RadioGroup');
  return ctx;
}

export interface RadioGroupProps extends ComponentPropsWithoutRef<'div'> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  tone?: NbToneToken;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      name: nameProp,
      value,
      defaultValue,
      onValueChange,
      tone = 'lavender',
      children,
      ...props
    },
    ref,
  ) => {
    const autoName = useId();
    const name = nameProp ?? autoName;
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const resolvedValue = value ?? internalValue;
    const handleValueChange = (next: string) => {
      if (value === undefined) setInternalValue(next);
      onValueChange?.(next);
    };
    return (
      <RadioGroupContext.Provider value={{ name, value: resolvedValue, onValueChange: handleValueChange, tone }}>
        <div
          ref={ref}
          role="radiogroup"
          data-nb-radio-group=""
          className={cn('flex flex-col gap-2', className)}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

export interface RadioGroupItemProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'name'> {
  value: string;
}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, id, onChange, children, ...props }, ref) => {
    const { name, value: groupValue, onValueChange, tone } = useRadioGroup();
    const vars = nbToneVars(tone);
    const checked = groupValue === value;
    return (
      <label
        htmlFor={id}
        className={cn(
          'inline-flex cursor-pointer items-center gap-2 font-bold',
          props.disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        <input
          ref={ref}
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          data-nb-radio=""
          data-state={checked ? 'checked' : 'unchecked'}
          className="peer sr-only"
          onChange={(e) => {
            onValueChange?.(value);
            onChange?.(e);
          }}
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            'grid size-5 place-content-center rounded-full border-2 border-(--nb-border) bg-(--nb-paper) shadow-[2px_2px_0_0_var(--nb-shadow)]',
            'peer-checked:bg-(--nb-radio-bg)',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-(--nb-border) peer-focus-visible:ring-offset-2',
          )}
          style={{ ['--nb-radio-bg' as string]: vars.bg }}
        >
          <span className="size-2 rounded-full border border-(--nb-border) bg-(--nb-border) opacity-0 peer-checked:opacity-100" />
        </span>
        {children}
      </label>
    );
  },
);
RadioGroupItem.displayName = 'RadioGroupItem';
