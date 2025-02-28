import type { Meta, StoryObj } from '@storybook/react';

import IdCopy from './IdCopy';

const meta = {
  title: 'Atoms/IdCopy',
  component: IdCopy,
  tags: ['autodocs'],
} satisfies Meta<typeof IdCopy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'Q782653',
    prefix: 'https://www.wikidata.org/entity/',
  },
};

export const WithUri: Story = {
  args: {
    children: 'Q42',
    uri: 'https://www.wikidata.org/entity/Q42',
  },
};
