import type { Meta, StoryObj } from '@storybook/react-vite';

import Commit from './Commit';

const meta: Meta<typeof Commit> = {
  title: 'Atoms/Commit',
  component: Commit,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DracorReact: Story = {
  args: {
    repo: 'https://github.com/dracor-org/dracor-react',
    children: 'fbc84064706416da8a5c70705fa3730319ebe7ce',
  },
};

export const NoRepo: Story = {
  args: {
    children: '108eb6db0feec0fa2278221507c8897d1cb46158',
  },
};
