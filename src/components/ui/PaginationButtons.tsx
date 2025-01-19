import React from 'react';

interface PaginationButtonsProps {
  pageCount: number; // Total number of pages
  currentPage: number; // Current active page
  onPageChange: (pageIndex: number) => void; // Callback for changing pages
  hasNextPage: boolean; // Whether the next page exists
  hasPreviousPage: boolean; // Whether the previous page exists
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  pageCount,
  currentPage,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
}) => {
  return (
    <div className="flex items-center justify-center space-x-1">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
        className={`px-3 py-1 rounded text-textSecondary ${
          hasPreviousPage
            ? 'bg-[#013440] text-textSecondary'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: pageCount }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          className={`px-3 py-1 rounded text-textSecondary ${
            currentPage === index
              ? 'bg-[#012030] text-textSecondary'
              : 'bg-[#013440] text-textPrimary'
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={`px-3 py-1 rounded text-textSecondary ${
          hasNextPage
            ? 'bg-[#013440] text-textSecondary'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
