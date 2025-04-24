import { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortDirection,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import DebouncedInput from '../DebouncedInput';

export interface Props<TData = unknown> {
  data: TData[];
  columns: ColumnDef<TData>[];
  defaultSort?: SortingState;
}

function Table<T>({ columns, data: initialData, defaultSort = [] }: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>(defaultSort);
  const [globalFilter, setGlobalFilter] = useState('');
  const [data] = useState(initialData);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
  });

  return (
    <>
      <div className="mb-2">
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder={'Search'}
        />
        {globalFilter !== '' && (
          <span className="ml-2">({table.getRowModel().rows.length})</span>
        )}
      </div>
      <div className="flex">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}{' '}
                        <SortIndicator status={header.column.getIsSorted()} />
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr key={row.id} className={i % 2 ? '' : 'bg-neutral-200'}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;

export function SortIndicator({ status }: { status: false | SortDirection }) {
  return (
    <>
      <span className={status !== 'asc' ? 'opacity-40' : ''}>▲</span>
      <span className={status !== 'desc' ? 'opacity-40' : ''}>▼</span>
    </>
  );
}
