import { useMemo, useState } from 'react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  PaginationState,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { User } from '../../types/user';
import UserSearch from './UserSearchInput.tsx';
import PaginationInfo from './PaginationInfo.tsx';
import PaginationButtons from './PaginationButtons.tsx';
import PaginationSizeOptions from './PaginationSizeOptions.tsx';
import SortableHeader from './SortableTableHeader.tsx';
import { useUserContext } from '../../context/useUserContext.ts';

const defaultPaginationSize = 10;
const paginationSizes = [5, 10, 15, 20];

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor((row) => `${row.name} ${row.lastname}`, {
    header: ({ column }) => <SortableHeader column={column} label="User" />,
    id: 'fullName',
    enableSorting: true,
  }),
  columnHelper.accessor(
    (row: User) => `$${row.totalProfit?.toLocaleString()}`,
    {
      header: ({ column }) => <SortableHeader column={column} label="Profit" />,
      id: 'totalProfit',
      enableSorting: true,
    }
  ),
  columnHelper.accessor(
    (row: User) => `$${Math.abs(row.totalLoss as number).toLocaleString()}`,
    {
      header: ({ column }) => <SortableHeader column={column} label="Loss" />,
      id: 'totalLoss',
      enableSorting: true,
    }
  ),
  columnHelper.accessor((row: User) => row.balance, {
    header: ({ column }) => <SortableHeader column={column} label="Balance" />,
    id: 'balance',
    cell: (value) => (
      <span
        className={
          (value.getValue() as number) >= 0 ? 'text-positive' : 'text-negative'
        }
      >
        ${Math.abs(value.getValue() as number).toLocaleString()}
      </span>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const balanceA = Math.abs(rowA.getValue<number>('balance'));
      const balanceB = Math.abs(rowB.getValue<number>('balance'));

      // Compare the absolute values of the balances
      if (balanceA < balanceB) return -1;
      if (balanceA > balanceB) return 1;
      return 0;
    },
  }),
];

const UsersTable = () => {
  const { users, loading, error } = useUserContext();
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPaginationSize,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const data = useMemo(() => users ?? [], [users]); // Memoize `data`

  // Filter users based on search input
  const filteredUsers = useMemo(
    () =>
      data.filter((user) =>
        `${user.name} ${user.lastname}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [data, search] // Dependencies
  );

  // Table configuration
  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
  });

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p className={'text-textSecondary'}>Loading...</p>; // Handle the case when user data is still loading

  return (
    <div className=" bg-secondary rounded-lg">
      <div className={'flex justify-between items-center mb-2'}>
        {/* Pagination size options */}
        <PaginationSizeOptions
          pageSize={table.getState().pagination.pageSize}
          setPageSize={(pageSize) => table.setPageSize(pageSize)}
          sizeOptions={paginationSizes}
        />

        {/* Search bar */}
        <UserSearch value={search} onChange={(value) => setSearch(value)} />
      </div>

      {/* Table */}
      <table className="w-full text-left text-textSecondary">
        <thead className="bg-primary text-textSecondary">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={`pl-4 px-2 py-2 text-[14px] ${
                    index === 0
                      ? 'rounded-tl-md' // Top-left corner
                      : index === headerGroup.headers.length - 1
                        ? 'rounded-tr-md' // Top-right corner
                        : ''
                  }`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              style={{
                backgroundColor: index % 2 === 0 ? '#013440' : '#012F39', // striped rows
                borderBottom: '1px solid #012030',
                borderTop: '1px solid #012030',
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 text-[14px]">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination  */}
      <div className={'flex justify-between items-center mt-3'}>
        <PaginationInfo
          pageIndex={table.getState().pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          totalEntries={data.length}
        />

        <PaginationButtons
          pageCount={table.getPageCount()}
          currentPage={table.getState().pagination.pageIndex}
          onPageChange={(pageIndex) =>
            setPagination({ ...pagination, pageIndex })
          }
          hasNextPage={table.getCanNextPage()}
          hasPreviousPage={table.getCanPreviousPage()}
        />
      </div>
    </div>
  );
};

export default UsersTable;
