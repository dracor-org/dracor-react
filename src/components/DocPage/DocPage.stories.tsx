import type { Meta, StoryObj } from '@storybook/react-vite';
import rehypeRaw from 'rehype-raw';
import { restoreAllMocks, spyOn, within } from 'storybook/test';

import DocPage from './DocPage';

const meta: Meta<typeof DocPage> = {
  title: 'Pages/DocPage',
  component: DocPage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithURL: Story = {
  args: {
    url: 'about.md',
  },
};

export const WithHTML: Story = {
  args: {
    url: 'html.md',
    rehypePlugins: [rehypeRaw],
  },
};

export const NotFound: Story = {
  args: {
    url: 'no-such-file.md',
  },
};

export const NoMarkdown: Story = {
  args: {
    url: 'dracor.svg',
  },
};

export const ServerError: Story = {
  args: { url: 'error.md' },
  beforeEach() {
    spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('', { status: 500 })
    );
    return () => restoreAllMocks();
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText('Something went wrong.');
  },
};

export const WithMatch: Story = {
  args: {
    match: () => 'about.md',
  },
};
