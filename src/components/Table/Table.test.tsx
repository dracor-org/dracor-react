import { render } from '@testing-library/react';
import { composeStory } from '@storybook/react';
import Meta, { Basic as BasicStory } from './Table.stories';

const BasicTable = composeStory(BasicStory, Meta);

describe('Years', () => {
  test('renders basic Table component', () => {
    render(<BasicTable />);
  });
});
