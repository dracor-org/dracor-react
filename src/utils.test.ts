import { formatEra, formatYear } from './utils';

describe('formatEra', () => {
  test('returns empty string for null', () => {
    expect(formatEra(null as unknown as string)).toBe('');
  });

  test('formats negative year as BCE', () => {
    expect(formatEra('-399')).toBe('399 BCE');
  });

  test('formats year below ceBefore threshold as CE', () => {
    expect(formatEra('500', 1000)).toBe('500 CE');
  });

  test('formats year above ceBefore threshold as plain number', () => {
    expect(formatEra('1600', 1000)).toBe('1600');
  });

  test('uses ceBefore=0 by default, returning plain number', () => {
    expect(formatEra('500')).toBe('500');
  });
});

describe('formatYear', () => {
  test('formats a plain year', () => {
    expect(formatYear(1900)).toBe('1900');
  });

  test('formats a negative year as BCE', () => {
    expect(formatYear('-0399')).toBe('399 BCE');
  });

  test('formats a BCE range', () => {
    expect(formatYear('-0500/-0400')).toBe('500-400 BCE');
  });

  test('formats a mixed-era range', () => {
    expect(formatYear('-0100/0200')).toBe('100 BCE-200 CE');
  });

  test('formats YYYY-MM as month and year', () => {
    expect(formatYear('1900-06')).toBe('June 1900');
  });

  test('formats YYYY-MM-DD as full date', () => {
    expect(formatYear('1900-06-15')).toBe('15 June 1900');
  });

  test('formats not-before year with >', () => {
    expect(formatYear('>1600')).toBe('after 1600');
  });

  test('formats not-after year with <', () => {
    expect(formatYear('<1600')).toBe('before 1600');
  });

  test('returns the input string unchanged for unrecognised formats', () => {
    expect(formatYear('unknown')).toBe('unknown');
  });
});
