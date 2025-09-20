import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColumnDef } from '@tanstack/react-table';

import Table from './Table';

const meta: Meta<typeof Table> = {
  title: 'Organisms/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

interface Play {
  id: string;
  title: string;
  author: {
    name: string;
    ref: string;
  };
  year: number;
}

const data: Play[] = [
  {
    id: 'ger000088',
    title: 'Emilia Galotti',
    author: {
      name: 'Lessing, Gotthold Ephraim',
      ref: '',
    },
    year: 1772,
  },
  {
    id: 'ita000110',
    title: 'Il re pastore',
    author: {
      name: 'Metastasio, Pietro',
      ref: 'Q29473',
    },
    year: 1751,
  },
];

const columns: ColumnDef<Play>[] = [
  {
    accessorKey: 'author',
    header: 'Author',
    accessorFn: (row) => row.author.name,
    cell: (info) => info.row.original.author.name,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    accessorFn: (row) => row.title,
    cell: (info) => info.row.original.title,
  },
  {
    accessorKey: 'year',
    header: 'Year',
    accessorFn: (row) => row.year,
    cell: (info) => info.row.original.year,
  },
];

export const Basic: Story = {
  args: {
    data,
    columns: columns as ColumnDef<unknown>[],
  },
};
