import { render } from '@testing-library/react';
import { composeStory } from '@storybook/react-vite';
import Meta, {
  Default,
  WithCommit,
  WithPopover,
  NoMetrics,
} from './CorpusCard.stories';

const DefaultCard = composeStory(Default, Meta);
const WithCommitCard = composeStory(WithCommit, Meta);
const WithPopoverCard = composeStory(WithPopover, Meta);
const NoMetricsCard = composeStory(NoMetrics, Meta);

describe('CorpusCard', () => {
  test('renders default corpus card', () => {
    render(<DefaultCard />);
  });

  test('renders card with commit and updated', () => {
    render(<WithCommitCard />);
  });

  test('renders card with popover row', () => {
    render(<WithPopoverCard />);
  });

  test('renders card without metrics', () => {
    render(<NoMetricsCard />);
  });
});
