import { render } from '@testing-library/react';
import { composeStory } from '@storybook/react-vite';
import Meta, {
  Single as SingleStory,
  WithLink as WithLinkStory,
  WithPseudonym as WithPseudonymStory,
} from './Authors.stories';

describe('Authors', () => {
  test('renders single author', () => {
    const SingleAuthor = composeStory(SingleStory, Meta);
    render(<SingleAuthor />);
  });

  test('renders single author with link', () => {
    const AuthorWithLink = composeStory(WithLinkStory, Meta);
    render(<AuthorWithLink />);
  });

  test('renders single author with pseudonym', () => {
    const AuthorWithPseudonym = composeStory(WithPseudonymStory, Meta);
    render(<AuthorWithPseudonym />);
  });
});
