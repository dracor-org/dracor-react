import type { Meta, StoryObj } from '@storybook/react-vite';
import Theme from './Theme';

const meta: Meta<typeof Theme> = {
  title: 'Theme',
  component: Theme,
  tags: ['autodocs'],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
