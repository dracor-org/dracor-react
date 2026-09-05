import type { Meta, StoryObj } from '@storybook/react-vite';

import ApiDoc from './ApiDoc';

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

export const WithTitle: Story = {
  args: {
    url: 'ecocor.yaml',
    title: 'EcoCor API',
  },
};

/**
 * Uses Scalar's `customCss` option to hide the OpenAPI title and left-align
 * the license / terms-of-service links. Useful when the surrounding page
 * already provides its own heading.
 */
export const HiddenTitle: Story = {
  args: {
    url: 'ecocor.yaml',
    configuration: {
      customCss: `
        /* hide the OpenAPI title */
        .introduction-section .section-header { display: none; }
        /* collapse the 2-col header grid so links get full width */
        .introduction-section .section-header-wrapper {
          grid-template-columns: 1fr;
        }
        /* left-align the license / TOS links */
        .introduction-section .section-header-wrapper
          > :last-child
          > div:first-child {
          margin-left: 0;
        }
      `,
    },
  },
};
