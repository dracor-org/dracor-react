import type { Meta, StoryObj } from '@storybook/react-vite';
import { restoreAllMocks, spyOn, within } from 'storybook/test';

import AuthorInfo from './AuthorInfo';

const sparqlResponse = (bindings: object[]) =>
  new Response(JSON.stringify({ results: { bindings } }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

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

export const MockedWithImage: Story = {
  args: { wikidataId: 'Q692' },
  beforeEach() {
    spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      sparqlResponse([
        {
          authorLabel: { value: 'William Shakespeare' },
          img: {
            value:
              'http://commons.wikimedia.org/wiki/Special:FilePath/Shakespeare.jpg',
          },
          birthDate: { value: '1564' },
          birthPlaceLabel: { value: 'Stratford-upon-Avon' },
          deathDate: { value: '1616' },
          deathPlaceLabel: { value: 'Stratford-upon-Avon' },
        },
      ])
    );
    return () => restoreAllMocks();
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByTitle('William Shakespeare');
  },
};

export const MockedUnknownDate: Story = {
  args: { wikidataId: 'Q7925945', unknownLabel: 'unknown' },
  beforeEach() {
    spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      sparqlResponse([
        {
          authorLabel: { value: 'Victor Grayson' },
          birthDate: {
            value:
              'http://www.wikidata.org/.well-known/genid/abc123',
          },
        },
      ])
    );
    return () => restoreAllMocks();
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText(/unknown/);
  },
};

export const MockedNonOK: Story = {
  args: { wikidataId: 'Q692' },
  beforeEach() {
    spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('', { status: 503 })
    );
    return () => restoreAllMocks();
  },
};
