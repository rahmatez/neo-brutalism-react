import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuLinkClassName,
} from './index';

describe('NavigationMenu', () => {
  it('renders navigation triggers', () => {
    renderWithProvider(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Analytics</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>,
    );

    expect(screen.getByRole('button', { name: /products/i })).toBeInTheDocument();
  });

  it('applies styled link classes', () => {
    renderWithProvider(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Docs</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const link = screen.getByRole('link', { name: 'Docs' });
    expect(link).toHaveAttribute('data-nb-navigation-menu-link', '');
    expect(link.className).toContain('font-mono');
    expect(link.className).toContain('hover:bg-(--nb-yellow)');
  });

  it('supports compact link variant', () => {
    expect(navigationMenuLinkClassName('compact')).toContain('hover:bg-(--nb-mint)');
    expect(navigationMenuLinkClassName('compact')).toContain('px-3');
  });
});
