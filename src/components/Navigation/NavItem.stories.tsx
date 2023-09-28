import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import NavItem from './NavItem';

const meta = {
  title: 'Navigation/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  decorators: [
    withRouter,
    (story) => <div className="p-4 bg-primary inline-block">{story()}</div>
  ],
  parameters: {
    reactRouter: {
      routing: { path: '/' },
    }
  },
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    href: '/',
    label: 'Home',
  },
};

export const Active: Story = {
  args: {
    href: '/',
    label: 'Active',
    active: true,
  },
};
