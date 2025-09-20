import { render } from '@testing-library/react';
import { composeStory } from '@storybook/react';
import Meta, {
  Wikidata as WikidataStory,
  WikidataURI as WikidataURIStory,
  Dracor as DracorStory,
  DracorURI as DracorURIStory,
} from './IdLink.stories';

describe('Authors', () => {
  test('renders Wikidata ID', () => {
    const Wikidata = composeStory(WikidataStory, Meta);
    render(<Wikidata />);
  });

  test('renders Wikidata URI', () => {
    const WikidataURI = composeStory(WikidataURIStory, Meta);
    render(<WikidataURI />);
  });

  test('renders Dracor ID', () => {
    const Dracor = composeStory(DracorStory, Meta);
    render(<Dracor />);
  });

  test('renders Dracor URI', () => {
    const DracorURI = composeStory(DracorURIStory, Meta);
    render(<DracorURI />);
  });
});
