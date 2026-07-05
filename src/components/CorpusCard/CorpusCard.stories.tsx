import type { Meta, StoryObj } from '@storybook/react-vite';

import CorpusCard, { CorpusCardRow } from './CorpusCard';

const meta: Meta<typeof CorpusCard> = {
  title: 'Molecules/CorpusCard',
  component: CorpusCard,
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
    title: 'EcoCor Corpus of English Novels',
    to: '/',
    className: 'w-full md:w-96',
    children: (
      <>
        <CorpusCardRow label="Number of texts" value={128} />
        <CorpusCardRow label="Number of authors" value={87} />
        <CorpusCardRow label="Number of paragraphs" value={42317} />
        <CorpusCardRow label="Number of Words" value={4218933} />
        <CorpusCardRow label="Number of Entities" value={12043} />
      </>
    ),
  },
};

export const WithCommit: Story = {
  args: {
    title: 'German EcoCor',
    to: '/',
    className: 'w-full md:w-96',
    commit: 'f086cb0ea1f99907d99fba12807e866875ed645d',
    repo: 'https://github.com/EcoCor/eco-de',
    updated: '2026-05-08T18:47:05Z',
    children: (
      <>
        <CorpusCardRow label="Number of texts" value={190} />
        <CorpusCardRow label="Number of authors" value={95} />
        <CorpusCardRow label="Number of Paragraphs" value={123638} />
        <CorpusCardRow label="Number of Words" value={7395276} />
      </>
    ),
  },
};

export const WithPopover: Story = {
  args: {
    title: 'ELTeC English Novel Corpus',
    to: '/',
    className: 'w-full md:w-96',
    commit: '639316c845b80f29bc51b805ce7e7230d4ec63a8',
    repo: 'https://github.com/clscor-io/ELTeC-eng',
    updated: '2026-04-12T09:15:00Z',
    children: (
      <>
        <CorpusCardRow
          label="ELTeC Score"
          value={100}
          valueClassName="text-2xl"
          popoverContent={
            <table className="m-0 text-xs">
              <caption className="text-gray-600">Sub&nbsp;scores</caption>
              <tbody>
                <tr>
                  <th className="p-0.5 text-right italic">text</th>
                  <td className="p-0.5 text-right">10</td>
                </tr>
                <tr>
                  <th className="p-0.5 text-right italic">range</th>
                  <td className="p-0.5 text-right">9</td>
                </tr>
                <tr>
                  <th className="p-0.5 text-right italic">female</th>
                  <td className="p-0.5 text-right">11</td>
                </tr>
                <tr>
                  <th className="p-0.5 text-right italic">reprint</th>
                  <td className="p-0.5 text-right">10</td>
                </tr>
              </tbody>
            </table>
          }
        />
        <CorpusCardRow label="Number of texts" value={100} />
        <CorpusCardRow label="Number of authors" value={80} />
        <CorpusCardRow label="Number of Paragraphs" value={233391} />
        <CorpusCardRow label="Number of Words" value={12560916} />
      </>
    ),
  },
};

export const NoMetrics: Story = {
  args: {
    title: 'An empty corpus card',
    to: '/',
    className: 'w-full md:w-96',
  },
};
