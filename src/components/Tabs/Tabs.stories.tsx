import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import Tabs from './Tabs';

const meta = {
  title: 'Organisms/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: '/metrics',
    }
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    data: [
      { label: 'Entities', href: '/entities', active: true },
      { label: 'Metrics', href: '/metrics' },
      { label: 'Full text', href: '/text' },
    ],
  },
};
