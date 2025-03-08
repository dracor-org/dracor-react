import type { Meta, StoryObj } from '@storybook/react';

import TEIText from './TEIText';

const meta = {
  title: 'Pages/TEIText',
  component: TEIText,
  tags: ['autodocs'],
} satisfies Meta<typeof TEIText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MobyDick: Story = {
  args: {
    url: 'moby-dick.xml',
  },
};

export const DracorOdd: Story = {
  args: {
    url: 'https://raw.githubusercontent.com/dracor-org/dracor-schema/refs/heads/main/dracor.odd',
  },
};
