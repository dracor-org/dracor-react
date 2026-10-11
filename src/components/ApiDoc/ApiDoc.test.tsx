import { act, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithProviders } from '../../testHelpers';

vi.mock('@scalar/api-reference-react', () => ({
  ApiReferenceReact: ({
    configuration,
  }: {
    configuration: {
      url: string;
      layout?: string;
      showSidebar?: boolean;
      mcp?: { disabled?: boolean };
      hideClientButton?: boolean;
      customCss?: string;
    };
  }) => (
    <div
      data-testid="scalar-stub"
      data-layout={configuration.layout}
      data-sidebar={String(configuration.showSidebar)}
      data-mcp-disabled={String(configuration.mcp?.disabled)}
      data-hide-client={String(configuration.hideClientButton)}
      data-css={configuration.customCss}
    >
      {configuration.url}
    </div>
  ),
}));

import ApiDoc from './ApiDoc';

describe('ApiDoc', () => {
  test('renders the ApiDoc component', () => {
    act(() => {
      renderWithProviders('/', <ApiDoc url="ecocor.yml" title="EcoCor API" />);
    });
  });

  test('hides the MCP and API client buttons', async () => {
    renderWithProviders('/', <ApiDoc url="ecocor.yml" />);
    const stub = await screen.findByTestId('scalar-stub');
    expect(stub).toHaveAttribute('data-mcp-disabled', 'true');
    expect(stub).toHaveAttribute('data-hide-client', 'true');
  });

  test('hides the "Powered by Scalar" link on request only', async () => {
    const { unmount } = renderWithProviders('/', <ApiDoc url="ecocor.yml" />);
    expect(
      (await screen.findByTestId('scalar-stub')).getAttribute('data-css') ?? ''
    ).not.toContain('scalar.com');
    unmount();
    renderWithProviders(
      '/',
      <ApiDoc
        url="ecocor.yml"
        hidePoweredBy
        configuration={{ customCss: '.mine {}' }}
      />
    );
    const css =
      (await screen.findByTestId('scalar-stub')).getAttribute('data-css') ?? '';
    expect(css).toContain('.mine {}');
    expect(css).toContain('a[href^="https://scalar.com/"]');
  });

  test('hides the version prefix on request only', async () => {
    const { unmount } = renderWithProviders('/', <ApiDoc url="ecocor.yml" />);
    expect(
      (await screen.findByTestId('scalar-stub')).getAttribute('data-css') ?? ''
    ).not.toContain('::first-letter');
    unmount();
    renderWithProviders(
      '/',
      <ApiDoc
        url="ecocor.yml"
        plainVersion
        configuration={{ customCss: '.mine {}' }}
      />
    );
    const css =
      (await screen.findByTestId('scalar-stub')).getAttribute('data-css') ?? '';
    expect(css).toContain('.mine {}');
    expect(css).toContain('.badge:has(+ .badge)::first-letter');
  });

  describe('showSidebar', () => {
    test('is off by default, in either layout', async () => {
      renderWithProviders('/', <ApiDoc url="ecocor.yml" layoutSwitch />);
      expect(await screen.findByTestId('scalar-stub')).toHaveAttribute(
        'data-sidebar',
        'false'
      );
      fireEvent.click(screen.getByRole('radio', { name: 'Modern' }));
      expect(await screen.findByTestId('scalar-stub')).toHaveAttribute(
        'data-sidebar',
        'false'
      );
      localStorage.clear();
    });

    test('can be enabled for one layout only', async () => {
      renderWithProviders(
        '/',
        <ApiDoc
          url="ecocor.yml"
          layoutSwitch={{ modern: { showSidebar: true } }}
        />
      );
      expect(await screen.findByTestId('scalar-stub')).toHaveAttribute(
        'data-sidebar',
        'false'
      );
      fireEvent.click(screen.getByRole('radio', { name: 'Modern' }));
      expect(await screen.findByTestId('scalar-stub')).toHaveAttribute(
        'data-sidebar',
        'true'
      );
      localStorage.clear();
    });

    test('can be enabled', async () => {
      renderWithProviders(
        '/',
        <ApiDoc url="ecocor.yml" configuration={{ showSidebar: true }} />
      );
      expect(await screen.findByTestId('scalar-stub')).toHaveAttribute(
        'data-sidebar',
        'true'
      );
    });
  });

  describe('layoutSwitch', () => {
    afterEach(() => localStorage.clear());

    test('is not rendered by default', async () => {
      renderWithProviders('/', <ApiDoc url="ecocor.yml" />);
      await screen.findByTestId('scalar-stub');
      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    });

    test('starts from configuration.layout', async () => {
      renderWithProviders(
        '/',
        <ApiDoc
          url="ecocor.yml"
          layoutSwitch
          configuration={{ layout: 'modern' }}
        />
      );
      expect(await screen.findByTestId('scalar-stub')).toHaveAttribute(
        'data-layout',
        'modern'
      );
      expect(screen.getByRole('radio', { name: 'Modern' })).toBeChecked();
    });

    test('switches layout and remembers the choice', async () => {
      renderWithProviders('/', <ApiDoc url="ecocor.yml" layoutSwitch />);
      fireEvent.click(await screen.findByRole('radio', { name: 'Modern' }));
      expect(await screen.findByTestId('scalar-stub')).toHaveAttribute(
        'data-layout',
        'modern'
      );
      expect(localStorage.getItem('dracor.apiDocLayout')).toBe('modern');
    });

    test('restores a stored layout under a custom key', async () => {
      localStorage.setItem('my.key', 'classic');
      renderWithProviders(
        '/',
        <ApiDoc
          url="ecocor.yml"
          layoutSwitch={{ storageKey: 'my.key' }}
          configuration={{ layout: 'modern' }}
        />
      );
      expect(await screen.findByTestId('scalar-stub')).toHaveAttribute(
        'data-layout',
        'classic'
      );
    });

    test('ignores an unknown stored value', async () => {
      localStorage.setItem('dracor.apiDocLayout', 'bogus');
      renderWithProviders(
        '/',
        <ApiDoc
          url="ecocor.yml"
          layoutSwitch
          configuration={{ layout: 'modern' }}
        />
      );
      expect(await screen.findByTestId('scalar-stub')).toHaveAttribute(
        'data-layout',
        'modern'
      );
    });
  });
});
