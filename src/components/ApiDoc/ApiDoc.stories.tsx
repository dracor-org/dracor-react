import type { Meta, StoryObj } from '@storybook/react';
import { HelmetProvider } from 'react-helmet-async';

import ApiDoc from './ApiDoc';
import 'swagger-ui-react/swagger-ui.css';

const meta = {
  title: 'Pages/ApiDoc',
  component: ApiDoc,
  tags: ['autodocs'],
  decorators: [(story) => <HelmetProvider>{story()}</HelmetProvider>],
  parameters: {
    reactRouter: {
      routing: { path: '/' },
    },
  },
} satisfies Meta<typeof ApiDoc>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ecocor: Story = {
  args: {
    url: 'ecocor.yaml',
  },
};
