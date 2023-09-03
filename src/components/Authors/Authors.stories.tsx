import type { Meta, StoryObj } from '@storybook/react';

import Authors from './Authors';

const meta = {
  title: 'Atoms/Authors',
  component: Authors,
  tags: ['autodocs'],
} satisfies Meta<typeof Authors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    data: [
      { name: 'William Shakespeare' },
    ]
  },
};

export const WithLink: Story = {
  args: {
    data: [
      {
        name: 'William Shakespeare',
        ref: 'https://www.wikidata.org/entity/Q692'
      },
    ]
  }
};

export const WithPseudonym: Story = {
  args: {
    data: [
      {
        name: 'Alfred Henschke',
        pseudonym: 'Klabund',
        ref: 'https://www.wikidata.org/entity/Q61263'
      },
    ]
  }
};

export const MultipleAuthors: Story = {
  args: {
    data: [
      {
        name: 'Jean-Baptiste Poquelin',
        pseudonym: 'Molière',
        ref: 'wikidata:Q687'
      },
      {
        name: 'Jean-Baptiste Lully',
        ref: 'wikidata:Q1192'
      },
    ]
  }
};
