import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import NavBar from './NavBar';

const meta = {
  title: 'Navigation/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: '/',
    }
  },
  argTypes: {
    logo: {
      control: { type: 'select' },
      options: ['dracor.svg', 'ecocor.svg', 'einakter.svg'],
    }
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EcoCor: Story = {
  args: {
    title: 'EcoCor',
    logo: 'ecocor.svg',
    gitHubUrl: 'https://github.com/EcoCor',
    version: '1.2.3',
    navItems: [
      { label: 'About', href: '/about' },
      { label: 'Corpora', href: '/corpora', active: true },
      { label: 'Merch', href: '/merch' },
    ],
  },
};
