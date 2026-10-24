import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRouter } from '@tanstack/react-router';
import { expect, userEvent, waitFor, within } from 'storybook/test';
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

export const NoActiveTab: Story = {
  ...Scrollable,
  parameters: {
    router: {
      initialEntries: ['/unknown'],
      routes: ['/$tab'],
    },
  },
  play: async ({ canvasElement }) => {
    const first = await within(canvasElement).findByRole('link', {
      name: 'Network',
    });
    await expect(first.parentElement!.parentElement!.scrollLeft).toBe(0);
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

function HistoryButtons() {
  const router = useRouter();
  return (
    <div className="flex gap-2 mt-4">
      <button onClick={() => router.history.back()}>Back</button>
      <button onClick={() => router.history.forward()}>Forward</button>
    </div>
  );
}

// The tabs stay mounted while the location changes, as they do in a layout
// route, so the active tab has to be scrolled into view on every navigation.
export const BackForward: Story = {
  ...Scrollable,
  parameters: {
    router: {
      initialEntries: ['/downloads', '/network'],
      initialIndex: 1,
      routes: ['/$tab'],
    },
  },
  render: (args) => (
    <>
      <Tabs {...args} />
      <HistoryButtons />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const network = await canvas.findByRole('link', { name: 'Network' });
    const row = network.parentElement!.parentElement!;
    await expect(row.scrollLeft).toBe(0);

    await userEvent.click(canvas.getByRole('button', { name: 'Back' }));
    await waitFor(() => expect(row.scrollLeft).toBeGreaterThan(0));

    await userEvent.click(canvas.getByRole('button', { name: 'Forward' }));
    await waitFor(() => expect(row.scrollLeft).toBe(0));
  },
};

export const CustomBaseline: Story = {
  ...Basic,
  decorators: [
    (story) => (
      <div className="p-4 bg-primary [--tabs-baseline:transparent]">
        {story()}
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const link = await within(canvasElement).findByRole('link', {
      name: 'Entities',
    });
    const row = link.parentElement!.parentElement!;
    // Tailwind composes several shadow layers; the baseline is the inset one
    await expect(getComputedStyle(row).boxShadow).toMatch(
      /rgba\(0, 0, 0, 0\) 0px -1px 0px 0px inset$/
    );
  },
};

export const KeyboardFocus: Story = {
  ...Scrollable,
  play: async ({ canvasElement }) => {
    const link = await within(canvasElement).findByRole('link', {
      name: 'Network',
    });
    await userEvent.tab();
    await expect(link).toHaveFocus();
    // focus is shown as an inset ring rather than an outline that the
    // scrolling row would clip
    const style = getComputedStyle(link);
    await expect(style.outlineStyle).toBe('none');
    await expect(style.boxShadow).toMatch(/inset/);
  },
};
