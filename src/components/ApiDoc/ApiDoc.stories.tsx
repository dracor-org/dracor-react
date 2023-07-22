import type { Meta, StoryObj } from '@storybook/react';
import {HelmetProvider} from 'react-helmet-async';

import ApiDoc from './ApiDoc';

const meta = {
  title: 'Pages/ApiDoc',
  component: ApiDoc,
  tags: ['autodocs'],
  decorators: [
    (story) => <HelmetProvider>{story()}</HelmetProvider>
  ],
  parameters: {
    reactRouter: {
      routePath: '/',
    }
  },
} satisfies Meta<typeof ApiDoc>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ecocor: Story = {
  args: {
    url: 'ecocor.yaml',
  },
};
