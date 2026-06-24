import { describe, expect, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

describe('Tabs', () => {
  it('shows the default panel and switches on trigger click', () => {
    renderWithProvider(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">First panel</TabsContent>
        <TabsContent value="two">Second panel</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText('First panel')).toBeVisible();
    fireEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByText('Second panel')).toBeVisible();
  });
});
