import { render } from '@testing-library/react';
import { composeStory } from '@storybook/react';
import Meta, { CSV as CsvStory } from './DownloadButton.stories';

const CsvDownloadButton = composeStory(CsvStory, Meta);

describe('DownloadButton', () => {
  // TODO: figure out how to fix the warning "A suspended resource finished
  // loading inside a test, but the event was not wrapped in act(...)".
  // Wrapping the render call in act(...) does not eliminate the warning.
  test.skip('renders basic DownloadButton component', () => {
    render(<CsvDownloadButton />);
  });
});
