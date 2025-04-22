import { renderWithRouter } from '../../testHelpers';
import NavBar from './NavBar';

describe('NavBar', () => {
  test('renders the NavBar component', () => {
    const { getByTitle } = renderWithRouter('/', () => (
      <NavBar title="DraCor" />
    ));
    expect(getByTitle('DraCor')).toBeDefined();
  });
});
