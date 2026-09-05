import { act } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithProviders } from '../../testHelpers';

vi.mock('@scalar/api-reference-react', () => ({
  ApiReferenceReact: ({
    configuration,
  }: {
    configuration: { url: string };
  }) => <div data-testid="scalar-stub">{configuration.url}</div>,
}));

import ApiDoc from './ApiDoc';

describe('ApiDoc', () => {
  test('renders the ApiDoc component', () => {
    act(() => {
      renderWithProviders('/', <ApiDoc url="ecocor.yml" title="EcoCor API" />);
    });
  });
});
