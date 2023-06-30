import React from 'react';
import { render } from '@testing-library/react';

import Navigation from './Navigation';

describe('Navigation', () => {
  test('renders the Navigation component', () => {
    render(<Navigation title="DraCor" />);
  });
});
