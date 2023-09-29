import { render } from '@testing-library/react';
import { composeStory } from '@storybook/react';
import Meta, { Shakespeare as ShakespeareStory } from './AuthorInfo.stories';

const ShakespeareInfo = composeStory(ShakespeareStory, Meta);

describe('AuthorInfo', () => {
  test('renders basic AuthorInfo component', () => {
    render(<ShakespeareInfo />);
  });
});
