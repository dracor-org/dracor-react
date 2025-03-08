// TODO: This test currently throws "SyntaxError: Unexpected identifier 'assert'".
// This may be caused by storybook-addon-react-router-v6 in Tabs.stories. We
// should tak care of this when migrating to a newer router.

// import { render } from '@testing-library/react';
// import { composeStory } from '@storybook/react';
// import Meta, { Basic as BasicStory } from './Tabs.stories';

// const BasicTabs = composeStory(BasicStory, Meta);

describe('Tabs', () => {
  test.skip('renders basic Tabs component', () => {
    // render(<BasicTabs />);
  });
});
