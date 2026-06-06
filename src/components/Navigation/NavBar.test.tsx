import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import NavBar, { NavBarProps } from './NavBar';
import '@testing-library/jest-dom';

vi.mock('@tanstack/react-router', () => ({
  // simple Link that just renders an anchor around children
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
  // useLocation returns a stable pathname for the component logic
  useLocation: () => ({ pathname: '/' }),
}));

vi.mock('./NavItem', () => ({
  __esModule: true,
  default: ({ label }: { label: string }) => (
    <div data-testid="nav-item">{label}</div>
  ),
}));

vi.mock('./NavMenu', () => ({
  __esModule: true,
  default: ({ label }: { label: string }) => (
    <div data-testid="nav-menu">{label}</div>
  ),
}));

describe('NavBar', () => {
  it('renders title as text when no logo is provided', () => {
    render(<NavBar title="MyApp" />);
    expect(screen.getByRole('link', { name: 'MyApp' })).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('shows mobile nav when menu button is clicked', async () => {
    const { container } = render(
      <NavBar title="MyApp" logo="/logo.png" navItems={[{ label: 'Home', to: '/' }]} />
    );
    const navDiv = container.querySelector('.grow') as HTMLElement;
    expect(navDiv.classList).toContain('hidden');
    await userEvent.click(screen.getByRole('button'));
    expect(navDiv.classList).not.toContain('hidden');
  });

  it('renders custom gitHubIcon when provided', () => {
    const icon = <span data-testid="custom-icon">★</span>;
    render(<NavBar title="MyApp" gitHubUrl="https://github.com" gitHubIcon={icon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders the logo image with the correct src and title', () => {
    render(<NavBar title="MyApp" logo="/logo.png" version="1.0.0" />);

    // getByAltText is reliable for images
    const logo = screen.getByAltText('MyApp logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.png');
    expect(logo).toHaveAttribute('title', 'MyApp (1.0.0)');
  });

  const baseProps: NavBarProps = {
    title: 'MyApp',
    logo: '/logo.png',
    version: '1.0.0',
  };

  it('renders GitHub link when provided', () => {
    render(<NavBar {...baseProps} gitHubUrl="https://github.com/example" />);
    const link = screen.getByRole('link', { name: /GitHub/i });
    expect(link).toHaveAttribute('href', 'https://github.com/example');
  });

  it('renders NavItem and NavMenu', () => {
    render(
      <NavBar
        {...baseProps}
        navItems={[
          { label: 'Docs', href: '/docs' },
          { label: 'More', items: [{ label: 'SubItem', href: '/sub' }] },
        ]}
      />
    );
    expect(screen.getByTestId('nav-item')).toHaveTextContent('Docs');
    expect(screen.getByTestId('nav-menu')).toHaveTextContent('More');
  });
});
