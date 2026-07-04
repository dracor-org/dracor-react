import { render } from '@testing-library/react';
import { composeStory } from '@storybook/react-vite';
import Meta, { Default, WithCommit, NoGender } from './CorpusCard.stories';

const DefaultCard = composeStory(Default, Meta);
const WithCommitCard = composeStory(WithCommit, Meta);
const NoGenderCard = composeStory(NoGender, Meta);

describe('CorpusCard', () => {
  test('renders default corpus card', () => {
    render(<DefaultCard />);
  });

  test('renders card with commit', () => {
    render(<WithCommitCard />);
  });

  test('renders card without gender breakdown', () => {
    render(<NoGenderCard />);
  });
});
