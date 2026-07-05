import type { Meta, StoryObj } from '@storybook/react-vite';

import DracorCorpusCard from './DracorCorpusCard';

const meta: Meta<typeof DracorCorpusCard> = {
  title: 'Molecules/DracorCorpusCard',
  component: DracorCorpusCard,
  tags: ['autodocs'],
  parameters: {
    router: {
      initialEntries: ['/'],
      routes: ['/'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'ger',
    title: 'German Drama Corpus',
    to: '/',
    metrics: {
      plays: 704,
      characters: 13832,
      male: 10982,
      female: 2847,
      sp: 115234,
      stage: 43217,
      wordcount: { text: 8248968, sp: 6432100, stage: 1816868 },
      updated: '2024-12-01T10:30:00Z',
    },
  },
};

export const WithCommit: Story = {
  args: {
    name: 'shake',
    title: 'Shakespeare Drama Corpus',
    to: '/',
    commit: 'ae2d0c4d965bf796284334f6b99a529d9e485943',
    repo: 'https://github.com/dracor-org/shakedracor',
    metrics: {
      plays: 37,
      characters: 1244,
      male: 982,
      female: 262,
      sp: 31420,
      stage: 8934,
      wordcount: { text: 884229, sp: 835112, stage: 49117 },
      updated: '2024-11-15T08:00:00Z',
    },
  },
};

export const NoGender: Story = {
  args: {
    name: 'cal',
    title: 'Calderón Drama Corpus',
    to: '/',
    metrics: {
      plays: 244,
      characters: 1742,
      male: 0,
      female: 0,
      sp: 68900,
      stage: 12400,
      wordcount: { text: 3200000, sp: 2900000, stage: 300000 },
      updated: '2024-10-20T12:00:00Z',
    },
  },
};

export const NeoLatin: Story = {
  args: {
    name: 'neolat',
    title: 'Neo-Latin Drama Corpus',
    acronym: 'NeoLatDraCor',
    to: '/',
    commit: '75eef622ff3e85d2f5d92b4717aae0810283efc9',
    repo: 'https://github.com/dracor-org/neolatdracor',
    metrics: {
      plays: 22,
      characters: 320,
      male: 226,
      female: 62,
      sp: 4641,
      stage: 609,
      wordcount: { text: 125228, sp: 115474, stage: 1712 },
      updated: '2026-05-08T18:47:05Z',
    },
  },
};
