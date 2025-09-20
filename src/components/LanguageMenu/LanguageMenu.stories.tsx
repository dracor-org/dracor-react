import type { Meta, StoryObj } from '@storybook/react-vite';
import LanguageMenu from './LanguageMenu';

const meta: Meta<typeof LanguageMenu> = {
  title: 'Navigation/LanguageMenu',
  component: LanguageMenu,
  tags: ['autodocs'],
  decorators: [
    (story) => <div className="p-4 bg-primary text-neutral-100">{story()}</div>,
  ],
  parameters: {
    reactRouter: {
      routing: { path: '/' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    languages: ['en', 'fr', 'de', 'zh'],
    current: 'fr',
    onSelect: (lng: string) => console.log({ lng }),
  },
};
