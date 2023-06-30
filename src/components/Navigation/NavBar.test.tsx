import React from 'react';
import { render } from '@testing-library/react';

import NavBar from './NavBar';

describe('NavBar', () => {
  test('renders the NavBar component', () => {
    render(<NavBar title="DraCor" />);
  });
});
