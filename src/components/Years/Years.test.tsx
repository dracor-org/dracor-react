import { render } from '@testing-library/react';
import { composeStory } from '@storybook/react-vite';
import Meta, { Basic as BasicStory } from './Years.stories';

const BasicYears = composeStory(BasicStory, Meta);

describe('Years', () => {
  test('renders basic Years component', () => {
    render(<BasicYears />);
  });
});
