import type { Meta, StoryObj } from '@storybook/react-vite';

import ApiDoc from './ApiDoc';
import 'swagger-ui-react/swagger-ui.css';

const meta: Meta<typeof ApiDoc> = {
  title: 'Pages/ApiDoc',
  component: ApiDoc,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Ecocor: Story = {
  args: {
    url: 'ecocor.yaml',
  },
};
