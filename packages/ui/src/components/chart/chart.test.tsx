import { describe, expect, it } from 'vitest';
import { Bar, BarChart, XAxis } from 'recharts';
import { renderWithProvider } from '../../test/render';
import { ChartContainer } from './chart';

const config = {
  sales: {
    label: 'Sales',
    color: 'var(--nb-chart-1)',
  },
} as const;

describe('Chart', () => {
  it('renders a chart container with recharts content', () => {
    const { container } = renderWithProvider(
      <ChartContainer config={config} className="h-[200px] w-full">
        <BarChart data={[{ month: 'Jan', sales: 12 }]}>
          <XAxis dataKey="month" />
          <Bar dataKey="sales" fill="var(--color-sales)" />
        </BarChart>
      </ChartContainer>,
    );

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  });
});
