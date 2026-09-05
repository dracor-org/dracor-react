import { render, screen } from '@testing-library/react';
import { composeStory } from '@storybook/react-vite';
import { ColumnDef } from '@tanstack/react-table';
import Meta, { Basic as BasicStory } from './Table.stories';
import Table from './Table';

const BasicTable = composeStory(BasicStory, Meta);

describe('Table', () => {
  test('renders basic Table component', () => {
    render(<BasicTable />);
  });

  test('re-renders rows when `data` prop changes', () => {
    interface Row {
      title: string;
    }
    const columns: ColumnDef<Row>[] = [
      {
        accessorKey: 'title',
        header: 'Title',
        cell: (info) => info.row.original.title,
      },
    ];
    const first = [{ title: 'First' }];
    const second = [{ title: 'Second' }];

    const { rerender } = render(<Table<Row> data={first} columns={columns} />);
    expect(screen.getByText('First')).toBeInTheDocument();

    rerender(<Table<Row> data={second} columns={columns} />);
    expect(screen.queryByText('First')).not.toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });
});
