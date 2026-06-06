import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import DebouncedInput from './DebouncedInput';

const meta: Meta<typeof DebouncedInput> = {
  title: 'Atoms/DebouncedInput',
  component: DebouncedInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    value: 'hello',
    onChange: fn(),
    placeholder: 'Search...',
  },
};

export const Debounced: Story = {
  args: {
    value: '',
    onChange: fn(),
    debounce: 300,
    placeholder: 'Type to search...',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await userEvent.type(input, 'abc');
    expect(args.onChange).not.toHaveBeenCalledWith('abc');

    await new Promise((resolve) => setTimeout(resolve, 350));
    expect(args.onChange).toHaveBeenLastCalledWith('abc');
  },
};
