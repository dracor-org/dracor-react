import { act } from '@testing-library/react';
import { renderWithProviders } from '../../testHelpers';

import ApiDoc from './ApiDoc';

describe('ApiDoc', () => {
  test('renders the ApiDoc component', () => {
    act(() => {
      renderWithProviders('/', <ApiDoc url="ecocor.yml" title="EcoCor API" />);
    });
  });
});
