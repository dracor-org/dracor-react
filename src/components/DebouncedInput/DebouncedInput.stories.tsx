import { useState } from 'react';
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

export const ExternalValueChange: Story = {
  args: { onChange: fn() },
  render: (args) => {
    function Wrapper() {
      const [val, setVal] = useState('initial');
      return (
        <>
          <DebouncedInput {...args} value={val} />
          <button onClick={() => setVal('updated')}>Change value</button>
        </>
      );
    }
    return <Wrapper />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('textbox')).toHaveValue('initial');
    await userEvent.click(canvas.getByRole('button', { name: 'Change value' }));
    expect(canvas.getByRole('textbox')).toHaveValue('updated');
  },
};
