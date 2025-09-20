import type { Meta, StoryObj } from '@storybook/react-vite';
import { createStoryRouter as withRouter } from '../../../src/testHelpers';
import NavItem from './NavItem';

const meta: Meta<typeof NavItem> = {
  title: 'Navigation/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  decorators: [
    withRouter,
    (story) => <div className="p-4 bg-primary inline-block">{story()}</div>,
  ],
  parameters: {
    reactRouter: {
      routing: { path: '/' },
    },
  },
};

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
