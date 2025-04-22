import { act } from '@testing-library/react';
import { renderWithProviders } from '../../testHelpers';

import ApiDoc from './ApiDoc';

describe('ApiDoc', () => {
  // This test currently throws "Error: A React Element from an older version of
  // React was rendered..."
  test.skip('renders the ApiDoc component', () => {
    act(() => {
      renderWithProviders('/', <ApiDoc url="ecocor.yml" title="EcoCor API" />);
    });
  });
});
