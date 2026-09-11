import { render, screen } from '@testing-library/react';
import { composeStory } from '@storybook/react-vite';
import Meta, {
  Basic as BasicStory,
  WithParams as WithParamsStory,
} from './Tabs.stories';

const BasicTabs = composeStory(BasicStory, Meta);
const WithParams = composeStory(WithParamsStory, Meta);

describe('Tabs', () => {
  test('renders basic Tabs component', () => {
    render(<BasicTabs />);
  });

  test('forwards params through to the underlying Link', async () => {
    render(<WithParams />);
    expect(await screen.findByRole('link', { name: 'Network' })).toHaveAttribute(
      'href',
      '/ger/goethe-faust/network'
    );
    expect(await screen.findByRole('link', { name: 'Text' })).toHaveAttribute(
      'href',
      '/ger/goethe-faust/text'
    );
  });
});
