import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelmetProvider } from 'react-helmet-async';

import DocPage from './DocPage';

const meta: Meta<typeof DocPage> = {
  title: 'Pages/DocPage',
  component: DocPage,
  tags: ['autodocs'],
  decorators: [(story) => <HelmetProvider>{story()}</HelmetProvider>],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithURL: Story = {
  args: {
    url: 'about.md',
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
