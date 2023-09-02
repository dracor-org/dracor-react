import { render } from '@testing-library/react';
import { withRouter } from '../../testHelpers';

import IdLink from './IdLink';

describe('IdLink', () => {
  test('renders the IdLink component', () => {
    render(withRouter(<IdLink>wikidata:Q42</IdLink>));
  });
});
