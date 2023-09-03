import type { Meta, StoryObj } from '@storybook/react';

import Years from './Years';

const meta = {
  title: 'Atoms/Years',
  component: Years,
  tags: ['autodocs'],
} satisfies Meta<typeof Years>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    written: 1897,
    premiere: 1920,
    print: 1903,
  },
};

export const German: Story = {
  args: {
    written: 1897,
    premiere: 1920,
    print: 1903,
    labelPremiered: 'Premiere',
    labelPrinted: 'Druck',
    labelWritten: 'Geschrieben',
  },
};
