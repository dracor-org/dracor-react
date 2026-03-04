import type { Meta, StoryObj } from '@storybook/react-vite';
import NavItem from './NavItem';

const meta: Meta<typeof NavItem> = {
  title: 'Navigation/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  decorators: [
    (story) => <div className="p-4 bg-primary inline-block">{story()}</div>,
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  parameters: {
    router: {
      initialEntries: ['/foo'],
      routes: ['/', '/foo'],
    },
  },
  args: {
    to: '/',
    label: 'Home',
  },
};

export const Active: Story = {
  args: {
    to: '/',
    label: 'Active',
  },
};

export const External: Story = {
  args: {
    href: 'https://dracor.org',
    label: 'DraCor',
  },
};
