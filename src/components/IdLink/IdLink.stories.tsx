import type { Meta, StoryObj } from '@storybook/react';

import IdLink from './IdLink';

const meta: Meta<typeof IdLink> = {
  title: 'Atoms/IdLink',
  component: IdLink,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Wikidata: Story = {
  args: {
    children: 'wikidata:Q782653',
  },
};

export const WikidataURI: Story = {
  args: {
    children: 'https://www.wikidata.org/entity/Q42',
  },
};

export const Dracor: Story = {
  args: {
    children: 'dracor:ger000088',
  },
};

export const DracorURI: Story = {
  args: {
    children: 'https://dracor.org/id/ger000088',
  },
};

export const Wega: Story = {
  args: {
    children: 'wega:A020816',
  },
};

export const WegaURI: Story = {
  args: {
    children: 'https://weber-gesamtausgabe.de/A020816',
  },
};
