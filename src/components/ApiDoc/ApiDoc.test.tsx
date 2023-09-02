import { render, act } from '@testing-library/react';
import { withProviders } from '../../testHelpers';

import ApiDoc from './ApiDoc';

jest.mock('swagger-ui-react/swagger-ui.css', () => '');

describe('ApiDoc', () => {
  // This test currently throws a "Warning: An update to
  // Connect(WithSystem(WithErrorBoundary(Z))) inside a test was not wrapped in
  // act(...)". Run yarn test with --silent to hide those.
  test.skip('renders the ApiDoc component', () => {
    act(() => {
      render(withProviders(<ApiDoc url="ecocor.yml" title="EcoCor API" />));
    });
  });
});
