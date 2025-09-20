import type { Meta, StoryObj } from '@storybook/react-vite';
import { createStoryRouter as withRouter } from '../../../src/testHelpers';
import NavMenu from './NavMenu';

const meta: Meta<typeof NavMenu> = {
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
};

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
