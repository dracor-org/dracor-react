import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import NavMenu from './NavMenu';

const meta = {
  title: 'Navigation/NavMenu',
  component: NavMenu,
  tags: ['autodocs'],
  decorators: [
    withRouter,
    (story) => <div className="p-4 bg-primary">{story()}</div>,
  ],
  parameters: {
    reactRouter: {
      routing: { path: '/' },
    },
  },
} satisfies Meta<typeof NavMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    label: 'Things',
    items: [
      { label: 'Foo', href: '/foo' },
      { label: 'Bar', href: '/bar' },
      { label: 'Lorem ipsum dolor', href: '/lorem' },
    ],
  },
};

export const Active: Story = {
  args: {
    label: 'Active',
    items: [
      { label: 'Foo', href: '/foo' },
      { label: 'Bar', href: '/bar', selected: true },
      { label: 'Lorem ipsum dolor', href: '/lorem' },
      { label: 'DraCor', href: 'https://dracor.org' },
    ],
  },
};
