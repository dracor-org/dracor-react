import { render } from '@testing-library/react';
import { composeStory } from '@storybook/react-vite';
import Meta, { Basic as BasicStory } from './Tabs.stories';

const BasicTabs = composeStory(BasicStory, Meta);

describe('Tabs', () => {
  test('renders basic Tabs component', () => {
    render(<BasicTabs />);
  });
});
