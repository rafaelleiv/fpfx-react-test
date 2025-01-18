import React from 'react';
import { Column } from '@tanstack/react-table';
import { User } from '../../types/user';

interface SortableHeaderProps {
  column: Column<User, string | number>;
  label: string;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({ column, label }) => {
  const isSorted = column.getIsSorted();

  return (
    <div
      className="flex justify-between items-center cursor-pointer select-none"
      onClick={column.getToggleSortingHandler()}
    >
      <span className="mr-2">{label}</span>

      {/* Sorting Icons */}
      <div className="flex flex-col items-center -space-y-3">
        {/* Upward Caret (Ascending) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3 w-3 ${
            isSorted === 'asc' ? 'fill-textSecondary' : 'fill-gray-500'
          }`}
          viewBox="0 0 24 24"
        >
          <path d="M12 4l-6 6h12l-6-6z" />
        </svg>

        {/* Downward Caret (Descending) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3 w-3 ${
            isSorted === 'desc' ? 'fill-textSecondary' : 'fill-gray-500'
          }`}
          viewBox="0 0 24 24"
        >
          <path d="M12 20l6-6H6l6 6z" />
        </svg>
      </div>
    </div>
  );
};

export default SortableHeader;
