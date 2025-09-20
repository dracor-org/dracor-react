import { render } from '@testing-library/react';
import { composeStory } from '@storybook/react-vite';
import Meta, { Basic as BasicStory } from './IdCopy.stories';

const BasicIdCopy = composeStory(BasicStory, Meta);

describe('IdCopy', () => {
  test('renders basic IdCopy component', () => {
    render(<BasicIdCopy />);
  });
});
