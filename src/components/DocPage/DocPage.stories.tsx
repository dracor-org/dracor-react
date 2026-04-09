import type { Meta, StoryObj } from '@storybook/react-vite';
import rehypeRaw from 'rehype-raw';

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
