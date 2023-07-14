import { render } from '@testing-library/react';
import { withRouter } from '../../testHelpers';

import NavBar from './NavBar';

describe('NavBar', () => {
  test('renders the NavBar component', () => {
    render(withRouter(<NavBar title="DraCor" />));
  });
});
