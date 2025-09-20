import type { Meta, StoryObj } from '@storybook/react-vite';

import DownloadButton from './DownloadButton';

const meta: Meta<typeof DownloadButton> = {
  title: 'Atoms/DownloadButton',
  component: DownloadButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CSV: Story = {
  args: {
    href: 'data:text/csv;charset=utf-8;base64,aWQsbmFtZSx0eXBlLG92ZXJhbGxGcmVxdWVuY3kNClExMTY4ODY5Nywic29sZSIsQW5pbWFsLDM5DQpRMzAwOTAyNDQsImJlYXIiLEFuaW1hbCwxMDkNClEyOTM0LCJnb2F0IixBbmltYWwsMg==',
    name: 'entities.csv',
    type: 'csv',
  },
};

export const JSON: Story = {
  args: {
    href: 'data:application/json;charset=utf-8;base64,eyJmb28iOiAiYmFyIn0=',
    name: 'foo.json',
    type: 'json',
  },
};

export const PlainText: Story = {
  args: {
    href: 'data:text/plain;charset=utf-8;Lorem ipsum',
    name: 'lorem.txt',
    type: 'txt',
  },
};

export const RDF: Story = {
  args: {
    href: 'data:text/plain;charset=utf-8;foo',
    name: 'foo.rdf',
    type: 'rdf',
  },
};

export const NoType: Story = {
  args: {
    href: 'data:text/csv;charset=utf-8;base64,aWQsbmFtZSx0eXBlLG92ZXJhbGxGcmVxdWVuY3kNClExMTY4ODY5Nywic29sZSIsQW5pbWFsLDM5DQpRMzAwOTAyNDQsImJlYXIiLEFuaW1hbCwxMDkNClEyOTM0LCJnb2F0IixBbmltYWwsMg==',
    name: 'entities.csv',
  },
};

export const EmptyName: Story = {
  args: {
    href: 'data:text/csv;charset=utf-8;base64,aWQsbmFtZSx0eXBlLG92ZXJhbGxGcmVxdWVuY3kNClExMTY4ODY5Nywic29sZSIsQW5pbWFsLDM5DQpRMzAwOTAyNDQsImJlYXIiLEFuaW1hbCwxMDkNClEyOTM0LCJnb2F0IixBbmltYWwsMg==',
    name: '',
  },
};
