/** Copy-paste snippets for ChartPage DocsExample sections. */

export const barDefaultCode = `const chartConfig = {
  desktop: { label: 'Desktop', color: 'var(--nb-chart-1)' },
} satisfies ChartConfig;

<ChartContainer config={chartConfig}>
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
  </BarChart>
</ChartContainer>`;

export const barHorizontalCode = `<ChartContainer config={chartConfig}>
  <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: -20 }}>
    <XAxis type="number" dataKey="desktop" hide />
    <YAxis
      dataKey="month"
      type="category"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
  </BarChart>
</ChartContainer>`;

export const lineMultipleCode = `const chartConfig = {
  desktop: { label: 'Desktop', color: 'var(--nb-chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--nb-chart-2)' },
} satisfies ChartConfig;

<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
    <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
    <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
  </LineChart>
</ChartContainer>`;

export const lineInteractiveCode = `const [activeChart, setActiveChart] = useState<'desktop' | 'mobile'>('desktop');

<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
  <LineChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="date" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent nameKey="views" />} />
    <Line
      dataKey={activeChart}
      type="monotone"
      stroke={\`var(--color-\${activeChart})\`}
      strokeWidth={2}
      dot={false}
      activeDot={{ fill: 'var(--nb-chart-active-dot)' }}
    />
  </LineChart>
</ChartContainer>`;

export const areaStackedCode = `<ChartContainer config={chartConfig}>
  <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
    <Area
      dataKey="mobile"
      type="natural"
      fill="var(--color-mobile)"
      stroke="var(--color-mobile)"
      activeDot={{ fill: 'var(--nb-chart-active-dot)' }}
      stackId="a"
    />
    <Area
      dataKey="desktop"
      type="natural"
      fill="var(--color-desktop)"
      stroke="var(--color-desktop)"
      activeDot={{ fill: 'var(--nb-chart-active-dot)' }}
      stackId="a"
    />
  </AreaChart>
</ChartContainer>`;

export const pieDonutCode = `const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  // ...
];

<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
  <PieChart>
    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
    <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} />
  </PieChart>
</ChartContainer>`;

export const pieLegendCode = `<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
  <PieChart>
    <Pie data={chartData} dataKey="visitors" />
    <ChartLegend
      content={<ChartLegendContent nameKey="browser" />}
      className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
    />
  </PieChart>
</ChartContainer>`;

export const tooltipAdvancedCode = `<ChartTooltip
  content={
    <ChartTooltipContent
      hideLabel
      className="w-[180px]"
      formatter={(value, name, item, index) => (
        <>
          <div style={{ '--color-bg': \`var(--color-\${name})\` } as React.CSSProperties} />
          {chartConfig[name as keyof typeof chartConfig]?.label ?? name}
          <span>{value} kcal</span>
          {index === 1 && (
            <div>
              Total {item.payload.running + item.payload.swimming} kcal
            </div>
          )}
        </>
      )}
    />
  }
  cursor={false}
  defaultIndex={1}
/>`;

export const installCode = `pnpm add neobrutalism-ui-react recharts`;

export const installNoteCode = `# peer dependency — required for Chart primitives
pnpm add recharts@^2.13.0`;
