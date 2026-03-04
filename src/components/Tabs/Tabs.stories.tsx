import type { Meta, StoryObj } from '@storybook/react-vite';
import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Organisms/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  parameters: {
    router: {
      initialEntries: ['/entities'],
      routes: ['/entities', '/metrics', '/text'],
    },
  },
  args: {
    data: [
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Entities', to: '/entities' },
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Metrics', to: '/metrics' },
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Full text', to: '/text' },
    ],
  },
};
