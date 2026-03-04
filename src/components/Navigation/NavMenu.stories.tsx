import type { Meta, StoryObj } from '@storybook/react-vite';
import NavMenu from './NavMenu';

const meta: Meta<typeof NavMenu> = {
  title: 'Navigation/NavMenu',
  component: NavMenu,
  tags: ['autodocs'],
  decorators: [(story) => <div className="p-4 bg-primary">{story()}</div>],
  parameters: {
    reactRouter: {
      routing: { path: '/' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  parameters: {
    router: {
      initialEntries: ['/'],
      routes: ['/', '/foo', '/bar'],
    },
  },
  args: {
    label: 'Things',
    items: [
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Foo', to: '/foo' },
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Bar', to: '/bar' },
      { label: 'Lorem ipsum dolor', href: 'https://example.com' },
    ],
  },
};

export const Active: Story = {
  parameters: {
    router: {
      initialEntries: ['/foo'],
      routes: ['/', '/foo', '/bar'],
    },
  },
  args: {
    label: 'Active',
    items: [
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Foo', to: '/foo' },
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Bar', to: '/bar' },
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Lorem ipsum dolor', to: '/lorem' },
      { label: 'DraCor', href: 'https://dracor.org' },
    ],
  },
};

export const RouteParams: Story = {
  parameters: {
    router: {
      initialEntries: ['/corpora/$corpusId'],
      routes: ['/', '/corpora/$corpusId'],
      params: { corpusId: 'shake' },
    },
  },
  args: {
    label: 'Corpora',
    items: [
      {
        label: 'Greek',
        // @ts-expect-error - FIXME: `to` is not fully typed
        to: '/corpora/$corpusId',
        params: { corpusId: 'greek' },
      },
      {
        label: 'Roman',
        // @ts-expect-error - FIXME: `to` is not fully typed
        to: '/corpora/$corpusId',
        params: { corpusId: 'rom' },
      },
      {
        label: 'Shakespeare',
        // @ts-expect-error - FIXME: `to` is not fully typed
        to: '/corpora/$corpusId',
        params: { corpusId: 'shake' },
      },
    ],
  },
};
