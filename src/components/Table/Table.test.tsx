import { render } from '@testing-library/react';
import { composeStory } from '@storybook/react-vite';
import Meta, { Basic as BasicStory } from './Table.stories';

const BasicTable = composeStory(BasicStory, Meta);

describe('Table', () => {
  test('renders basic Table component', () => {
    render(<BasicTable />);
  });
});
