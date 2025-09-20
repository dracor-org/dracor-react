import type { Meta, StoryObj } from '@storybook/react-vite';

import AuthorInfo from './AuthorInfo';

const meta: Meta<typeof AuthorInfo> = {
  title: 'Organisms/AuthorInfo',
  component: AuthorInfo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Shakespeare: Story = {
  args: {
    name: 'William Shakespeare',
    wikidataId: 'Q692',
  },
};

export const UnknownDate: Story = {
  args: {
    name: 'Victor Grayson',
    wikidataId: 'Q7925945',
  },
};

export const Localised: Story = {
  args: {
    name: 'Victor Grayson',
    wikidataId: 'Q7925945',
    birthLabel: 'geb.',
    deathLabel: 'gest.',
    unknownLabel: 'unbekannt',
  },
};
