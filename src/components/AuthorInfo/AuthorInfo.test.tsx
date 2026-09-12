import { render, screen, waitFor } from '@testing-library/react';
import { composeStory } from '@storybook/react-vite';
import { spyOn, restoreAllMocks } from 'storybook/test';
import Meta, {
  Shakespeare as ShakespeareStory,
  CustomFetcher as CustomFetcherStory,
  MockedNonOK as MockedNonOKStory,
  MockedEmptyBindings as MockedEmptyBindingsStory,
  MockedMissingResults as MockedMissingResultsStory,
  NameOnlyFetcher as NameOnlyFetcherStory,
  NoWikidataId as NoWikidataIdStory,
  RejectingFetcher as RejectingFetcherStory,
  Translator as TranslatorStory,
  TranslatorLocalisedLabel as TranslatorLocalisedLabelStory,
} from './AuthorInfo.stories';

const ShakespeareInfo = composeStory(ShakespeareStory, Meta);
const CustomFetcherInfo = composeStory(CustomFetcherStory, Meta);
const MockedNonOKInfo = composeStory(MockedNonOKStory, Meta);
const MockedEmptyBindingsInfo = composeStory(MockedEmptyBindingsStory, Meta);
const MockedMissingResultsInfo = composeStory(MockedMissingResultsStory, Meta);
const NameOnlyFetcherInfo = composeStory(NameOnlyFetcherStory, Meta);
const NoWikidataIdInfo = composeStory(NoWikidataIdStory, Meta);
const RejectingFetcherInfo = composeStory(RejectingFetcherStory, Meta);
const TranslatorInfo = composeStory(TranslatorStory, Meta);
const TranslatorLocalisedLabelInfo = composeStory(
  TranslatorLocalisedLabelStory,
  Meta
);

describe('AuthorInfo', () => {
  test('renders basic AuthorInfo component', () => {
    render(<ShakespeareInfo />);
  });

  test('uses a caller-provided fetcher instead of the SPARQL default', async () => {
    render(<CustomFetcherInfo />);
    expect(
      await screen.findByText(/1564, Stratford-upon-Avon/)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/1616, Stratford-upon-Avon/)
    ).toBeInTheDocument();
  });

  test('renders without birth/death rows when the SPARQL request fails', async () => {
    render(<MockedNonOKInfo />);
    await waitFor(() => {
      expect(screen.queryByText(/b\./)).not.toBeInTheDocument();
      expect(screen.queryByText(/d\./)).not.toBeInTheDocument();
    });
  });

  test('handles empty SPARQL bindings without throwing', async () => {
    render(<MockedEmptyBindingsInfo />);
    // No bindings means no birth/death rows are ever rendered.
    await waitFor(() => {
      expect(screen.queryByText(/b\./)).not.toBeInTheDocument();
      expect(screen.queryByText(/d\./)).not.toBeInTheDocument();
    });
  });

  test('handles SPARQL responses without a results field', async () => {
    render(<MockedMissingResultsInfo />);
    await waitFor(() => {
      expect(screen.queryByText(/b\./)).not.toBeInTheDocument();
      expect(screen.queryByText(/d\./)).not.toBeInTheDocument();
    });
  });

  test('renders when fetcher returns just a name (no dates / places)', async () => {
    render(<NameOnlyFetcherInfo />);
    // Wait a tick for the async fetcher to resolve.
    await waitFor(() =>
      expect(screen.getAllByText('William Shakespeare').length).toBeGreaterThan(
        0
      )
    );
    expect(screen.queryByText(/b\./)).not.toBeInTheDocument();
    expect(screen.queryByText(/d\./)).not.toBeInTheDocument();
  });

  test('does not call the fetcher when wikidataId is empty', () => {
    const fetchSpy = spyOn(globalThis, 'fetch');
    render(<NoWikidataIdInfo />);
    expect(fetchSpy).not.toHaveBeenCalled();
    restoreAllMocks();
  });

  test('renders a Translator side badge when translator is true', async () => {
    render(<TranslatorInfo />);
    expect(await screen.findByText('Translator')).toBeInTheDocument();
  });

  test('respects a custom translatorLabel', async () => {
    render(<TranslatorLocalisedLabelInfo />);
    expect(await screen.findByText('Übersetzer')).toBeInTheDocument();
    expect(screen.queryByText('Translator')).not.toBeInTheDocument();
  });

  test('swallows fetcher rejections without unmounting the component', async () => {
    const errSpy = spyOn(console, 'error').mockImplementation(() => {});
    render(<RejectingFetcherInfo />);
    await waitFor(() => expect(errSpy).toHaveBeenCalled());
    // Static name prop still renders.
    expect(screen.getByText('William Shakespeare')).toBeInTheDocument();
    restoreAllMocks();
  });
});
