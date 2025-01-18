import { useEffect, useMemo, useState } from 'react';
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

const usersApiUrl = 'http://localhost:8000/users';

const defaultPaginationSize = 10;
const paginationSizes = [5, 10, 20];

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor((row) => `${row.name} ${row.lastname}`, {
    header: ({ column }) => <SortableHeader column={column} label="User" />,
    id: 'fullName',
    enableSorting: true,
  }),
  columnHelper.accessor(
    (row: User) => {
      const totalProfit = row.profit.reduce((acc, val) => acc + val, 0);
      return `$${totalProfit.toLocaleString()}`;
    },
    {
      header: ({ column }) => <SortableHeader column={column} label="Profit" />,
      id: 'profit',
      enableSorting: true,
    }
  ),
  columnHelper.accessor(
    (row: User) => {
      const totalLoss = row.loss.reduce((acc, val) => acc + val, 0);
      return `$${Math.abs(totalLoss).toLocaleString()}`;
    },
    {
      header: ({ column }) => <SortableHeader column={column} label="Loss" />,
      id: 'loss',
      enableSorting: true,
    }
  ),
  columnHelper.accessor(
    (row: User) => {
      return (
        row.profit.reduce((acc, val) => acc + val, 0) +
        row.loss.reduce((acc, val) => acc + val, 0)
      );
    },
    {
      header: ({ column }) => (
        <SortableHeader column={column} label="Balance" />
      ),
      id: 'balance',
      cell: (value) => (
        <span
          className={value.getValue() >= 0 ? 'text-positive' : 'text-negative'}
        >
          ${Math.abs(value.getValue()).toLocaleString()}
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
    }
  ),
];

const UsersTable = () => {
  const [data, setData] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPaginationSize,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  // Get users data
  useEffect(() => {
    fetch(usersApiUrl)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  // Filter users based on search input
  const filteredUsers = useMemo(
    () =>
      data.filter((user) =>
        `${user.name} ${user.lastname}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [data, search]
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
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-4 text-[14px]">
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
                <td key={cell.id} className="p-4 text-[14px]">
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
