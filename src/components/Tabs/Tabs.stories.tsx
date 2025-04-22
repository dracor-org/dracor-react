import type { Meta, StoryObj } from '@storybook/react';
import { createStoryRouter as withRouter } from '../../../src/testHelpers';
import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Organisms/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      location: {
        pathParams: { page: 'metrics' },
      },
      routing: { path: '/:page' },
    },
  },
};

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
