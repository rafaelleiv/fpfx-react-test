import React from 'react';

interface PaginationSizeOptionsProps {
  sizeOptions: number[]; // Array of available page sizes
  pageSize: number; // Current page size
  setPageSize: (size: number) => void; // Function to set the page size
}

const PaginationSizeOptions: React.FC<PaginationSizeOptionsProps> = ({
  sizeOptions,
  pageSize,
  setPageSize,
}: PaginationSizeOptionsProps) => {
  return (
    <div className="flex items-center">
      <label htmlFor="pageSize" className="text-textSecondary mr-2 text-[16px]">
        Show
      </label>
      <select
        id="pageSize"
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="bg-primary text-textSecondary pl-1 pr-2 py-2 rounded font-semibold focus:outline-none"
      >
        {sizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <span className="ml-2 text-textSecondary text-[16px]">Entries</span>
    </div>
  );
};

export default PaginationSizeOptions;
