import type { Meta, StoryObj } from '@storybook/react';

import AuthorInfo from './AuthorInfo';

const meta = {
  title: 'Organisms/AuthorInfo',
  component: AuthorInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof AuthorInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Shakespeare: Story = {
  args: {
    name: 'William Shakespeare',
    wikidataId: 'Q692',
  },
};
