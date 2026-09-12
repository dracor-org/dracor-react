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
            value: 'http://www.wikidata.org/.well-known/genid/abc123',
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

export const CustomFetcher: Story = {
  args: {
    wikidataId: 'Q692',
    fetcher: async () => ({
      name: 'William Shakespeare',
      birthDate: '1564',
      birthPlace: 'Stratford-upon-Avon',
      deathDate: '1616',
      deathPlace: 'Stratford-upon-Avon',
    }),
  },
};

export const RejectingFetcher: Story = {
  args: {
    wikidataId: 'Q692',
    name: 'William Shakespeare',
    fetcher: () => Promise.reject(new Error('boom')),
  },
};

export const MockedEmptyBindings: Story = {
  args: { wikidataId: 'Q692', name: 'William Shakespeare' },
  beforeEach() {
    spyOn(globalThis, 'fetch').mockResolvedValueOnce(sparqlResponse([]));
    return () => restoreAllMocks();
  },
};

export const MockedMissingResults: Story = {
  args: { wikidataId: 'Q692', name: 'William Shakespeare' },
  beforeEach() {
    spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );
    return () => restoreAllMocks();
  },
};

export const NameOnlyFetcher: Story = {
  args: {
    wikidataId: 'Q692',
    fetcher: async () => ({ name: 'William Shakespeare' }),
  },
};

export const NoWikidataId: Story = {
  args: {
    // Reachable at runtime because the check is `if (wikidataId)`. We
    // want the false branch — hence the empty string.
    wikidataId: '',
    name: 'Anonymous',
  },
};

export const Translator: Story = {
  args: {
    wikidataId: 'Q57281',
    name: 'August Wilhelm Schlegel',
    translator: true,
    fetcher: async () => ({
      name: 'August Wilhelm Schlegel',
      birthDate: '1767',
      deathDate: '1845',
    }),
  },
};

export const TranslatorLocalisedLabel: Story = {
  args: {
    wikidataId: 'Q57281',
    name: 'August Wilhelm Schlegel',
    translator: true,
    translatorLabel: 'Übersetzer',
    fetcher: async () => ({ name: 'August Wilhelm Schlegel' }),
  },
};
