import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';
import { composeStory } from '@storybook/react-vite';
import IdCopy from './IdCopy';
import Meta, { Basic as BasicStory } from './IdCopy.stories';

const BasicIdCopy = composeStory(BasicStory, Meta);

const mockWriteText = vi.fn().mockResolvedValue(undefined);

beforeAll(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: mockWriteText },
    configurable: true,
  });
});

beforeEach(() => {
  mockWriteText.mockClear();
});

describe('IdCopy', () => {
  test('renders basic IdCopy component', () => {
    render(<BasicIdCopy />);
  });

  test('copies correct URI to clipboard on click', () => {
    render(<IdCopy prefix="https://www.wikidata.org/entity/">Q782653</IdCopy>);
    fireEvent.click(screen.getByTitle('copy to clipboard'));
    expect(mockWriteText).toHaveBeenCalledWith(
      'https://www.wikidata.org/entity/Q782653'
    );
  });

  test('copies explicit uri prop to clipboard', () => {
    render(<IdCopy uri="https://www.wikidata.org/entity/Q42">Q42</IdCopy>);
    fireEvent.click(screen.getByTitle('copy to clipboard'));
    expect(mockWriteText).toHaveBeenCalledWith(
      'https://www.wikidata.org/entity/Q42'
    );
  });

  test('shows copied feedback after click', () => {
    render(<IdCopy prefix="https://www.wikidata.org/entity/">Q782653</IdCopy>);
    fireEvent.click(screen.getByTitle('copy to clipboard'));
    expect(screen.getByTitle('Copied!')).toBeInTheDocument();
  });

  test('reverts to clipboard icon after 1.5s', () => {
    vi.useFakeTimers();
    render(<IdCopy prefix="https://www.wikidata.org/entity/">Q782653</IdCopy>);
    fireEvent.click(screen.getByTitle('copy to clipboard'));
    expect(screen.getByTitle('Copied!')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1500));
    expect(screen.getByTitle('copy to clipboard')).toBeInTheDocument();
    vi.useRealTimers();
  });
});
