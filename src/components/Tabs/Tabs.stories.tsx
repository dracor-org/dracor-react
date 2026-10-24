import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Organisms/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  parameters: {
    router: {
      initialEntries: ['/entities'],
      routes: ['/entities', '/metrics', '/text'],
    },
  },
  args: {
    data: [
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Entities', to: '/entities' },
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Metrics', to: '/metrics' },
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Full text', to: '/text' },
    ],
  },
};

export const WithParams: Story = {
  parameters: {
    router: {
      initialEntries: ['/ger/goethe-faust/network'],
      routes: ['/$corpus/$play/$tab'],
    },
  },
  args: {
    data: [
      {
        label: 'Network',
        // @ts-expect-error - FIXME: `to` is not fully typed
        to: '/$corpus/$play/$tab',
        params: { corpus: 'ger', play: 'goethe-faust', tab: 'network' },
      },
      {
        label: 'Text',
        // @ts-expect-error - FIXME: `to` is not fully typed
        to: '/$corpus/$play/$tab',
        params: { corpus: 'ger', play: 'goethe-faust', tab: 'text' },
      },
    ],
  },
};

const manyTabs = [
  'Network',
  'Speech distribution',
  'Relations',
  'Characters',
  'Structure',
  'Full text',
  'Downloads',
].map((label) => ({
  label,
  to: '/$tab',
  params: { tab: label.toLowerCase().replace(/ /g, '-') },
}));

export const Scrollable: Story = {
  decorators: [(story) => <div className="max-w-xs">{story()}</div>],
  parameters: {
    router: {
      initialEntries: ['/downloads'],
      routes: ['/$tab'],
    },
  },
  args: {
    // @ts-expect-error - FIXME: `to` is not fully typed
    data: manyTabs,
  },
  play: async ({ canvasElement }) => {
    const active = await within(canvasElement).findByRole('link', {
      name: 'Downloads',
    });
    const row = active.parentElement!.parentElement!;
    // single row that overflows horizontally
    await expect(row.scrollWidth).toBeGreaterThan(row.clientWidth);
    await expect(row.clientHeight).toBe(active.offsetHeight);
    // deep-linked tab at the end has been scrolled into view
    await expect(row.scrollLeft).toBeGreaterThan(0);
    await expect(active.getBoundingClientRect().right).toBeLessThanOrEqual(
      row.getBoundingClientRect().right + 1 // allow for subpixel rounding
    );
  },
};

export const Wrapping: Story = {
  ...Scrollable,
  args: {
    ...Scrollable.args,
    wrap: true,
  },
  play: async ({ canvasElement }) => {
    const active = await within(canvasElement).findByRole('link', {
      name: 'Downloads',
    });
    const row = active.parentElement!.parentElement!;
    await expect(row.scrollWidth).toBe(row.clientWidth);
    await expect(row.clientHeight).toBeGreaterThan(active.offsetHeight);
  },
};
