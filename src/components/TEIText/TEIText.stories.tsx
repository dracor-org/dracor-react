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
