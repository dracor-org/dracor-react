import { renderWithRouter } from '../../testHelpers';
import IdLink from './IdLink';

describe('IdLink', () => {
  test('renders the IdLink component', () => {
    const { getByText } = renderWithRouter('/', () => (
      <IdLink>wikidata:Q42</IdLink>
    ));
    expect(getByText('Q42')).toBeDefined();
  });
});
