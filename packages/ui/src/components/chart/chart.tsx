'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

import { cn } from '../../core/cn';

const THEMES = { light: '', dark: '.dark' } as const;

const INITIAL_DIMENSION = { width: 320, height: 200 } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

export interface ChartContainerProps extends React.ComponentProps<'div'> {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
  initialDimension?: {
    width: number;
    height: number;
  };
}

const chartSurfaceClassName = [
  'flex aspect-video justify-center text-xs font-medium',
  '[&_.recharts-cartesian-axis-tick_text]:fill-[var(--nb-chart-muted-foreground)]',
  '[&_.recharts-cartesian-grid_line]:stroke-[var(--nb-chart-grid)]',
  '[&_.recharts-curve.recharts-tooltip-cursor]:stroke-[var(--nb-border)]',
  "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
  '[&_.recharts-layer]:outline-none',
  '[&_.recharts-polar-grid_line]:stroke-[var(--nb-chart-grid)]',
  '[&_.recharts-radial-bar-background-sector]:fill-[var(--nb-chart-muted)]',
  '[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-[var(--nb-chart-muted)]',
  '[&_.recharts-reference-line_line]:stroke-[var(--nb-border)]',
  "[&_.recharts-sector[stroke='#fff']]:stroke-transparent",
  '[&_.recharts-sector]:outline-none',
  '[&_.recharts-surface]:outline-none',
].join(' ');

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ id, className, children, config, initialDimension = INITIAL_DIMENSION, ...props }, ref) => {
    const uniqueId = React.useId();
    const chartId = `chart-${id ?? uniqueId.replace(/:/g, '')}`;

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          data-chart={chartId}
          data-slot="chart"
          ref={ref}
          className={cn(chartSurfaceClassName, className)}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          <RechartsPrimitive.ResponsiveContainer initialDimension={initialDimension}>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  },
);
ChartContainer.displayName = 'ChartContainer';

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, itemConfig]) => itemConfig.theme ?? itemConfig.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ?? itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join('\n')}
}
`,
          )
          .join('\n'),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

export type ChartTooltipContentProps = React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<'div'> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: 'line' | 'dot' | 'dashed';
    nameKey?: string;
    labelKey?: string;
  };

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  (
    {
      active,
      payload,
      className,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey ?? item?.dataKey ?? item?.name ?? 'value'}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === 'string'
          ? (config[label]?.label ?? label)
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn('font-black uppercase', labelClassName)}>{labelFormatter(value, payload)}</div>
        );
      }

      if (!value) {
        return null;
      }

      return <div className={cn('font-black uppercase', labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== 'dot';

    return (
      <div
        ref={ref}
        data-slot="chart-tooltip"
        className={cn(
          'grid min-w-[8rem] items-start gap-1.5 border-2 border-(--nb-border) bg-(--nb-yellow) px-2.5 py-1.5 text-xs font-bold shadow-[4px_4px_0_0_var(--nb-shadow)]',
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload
            .filter((item) => item.type !== 'none')
            .map((item, index) => {
              const key = `${nameKey ?? item.name ?? item.dataKey ?? 'value'}`;
              const itemConfig = getPayloadConfigFromPayload(config, item, key);
              const indicatorColor = color ?? item.payload?.fill ?? item.color;

              return (
                <div
                  key={item.dataKey ?? index}
                  className={cn(
                    'flex w-full flex-wrap items-stretch gap-2',
                    indicator === 'dot' && 'items-center',
                  )}
                >
                  {formatter && item?.value !== undefined && item.name ? (
                    formatter(item.value, item.name, item, index, item.payload)
                  ) : (
                    <>
                      {itemConfig?.icon ? (
                        <itemConfig.icon />
                      ) : (
                        !hideIndicator && (
                          <div
                            className={cn(
                              'shrink-0 border-2 border-(--nb-border)',
                              indicator === 'dot' && 'size-2.5',
                              indicator === 'line' && 'w-1',
                              indicator === 'dashed' && 'w-0 border-dashed bg-transparent',
                            )}
                            style={{ backgroundColor: indicatorColor }}
                          />
                        )
                      )}
                      <div
                        className={cn(
                          'flex flex-1 justify-between leading-none',
                          nestLabel ? 'items-end' : 'items-center',
                        )}
                      >
                        <div className="grid gap-1.5">
                          {nestLabel ? tooltipLabel : null}
                          <span className="text-(--nb-foreground)">{itemConfig?.label ?? item.name}</span>
                        </div>
                        {item.value != null && (
                          <span className="font-black tabular-nums text-(--nb-foreground)">
                            {typeof item.value === 'number'
                              ? item.value.toLocaleString()
                              : String(item.value)}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = 'ChartTooltipContent';

const ChartLegend = RechartsPrimitive.Legend;

type ChartLegendContentProps = React.ComponentProps<'div'> &
  Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {
    hideIcon?: boolean;
    nameKey?: string;
  };

const ChartLegendContent = React.forwardRef<HTMLDivElement, ChartLegendContentProps>(
  ({ className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey }, ref) => {
    const { config } = useChart();

    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        data-slot="chart-legend"
        className={cn(
          'flex flex-wrap items-center justify-center gap-4 font-bold',
          verticalAlign === 'top' ? 'pb-3' : 'pt-3',
          className,
        )}
      >
        {payload
          .filter((item) => item.type !== 'none')
          .map((item) => {
            const key = `${nameKey ?? item.dataKey ?? 'value'}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);

            return (
              <div
                key={item.value}
                className={cn(
                  'flex items-center gap-1.5 [&>svg]:size-3 [&>svg]:text-(--nb-foreground)',
                )}
              >
                {itemConfig?.icon && !hideIcon ? (
                  <itemConfig.icon />
                ) : (
                  <div
                    className="size-2 shrink-0 border-2 border-(--nb-border)"
                    style={{ backgroundColor: item.color }}
                  />
                )}
                {itemConfig?.label}
              </div>
            );
          })}
      </div>
    );
  },
);
ChartLegendContent.displayName = 'ChartLegendContent';

function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const payloadPayload =
    'payload' in payload &&
    typeof payload.payload === 'object' &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === 'string') {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  useChart,
};
