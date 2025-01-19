import React from 'react';

interface PaginationInfoProps {
  pageIndex: number; // Current page index (0-based)
  pageSize: number; // Number of entries per page
  totalEntries: number; // Total number of entries in the table
}

const PaginationInfo: React.FC<PaginationInfoProps> = ({
  pageIndex,
  pageSize,
  totalEntries,
}) => {
  // Calculate the starting and ending indexes
  const startIndex = pageIndex * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, totalEntries);

  return (
    <div className="text-textSecondary">
      {`Showing ${startIndex} to ${endIndex} of ${totalEntries} entries`}
    </div>
  );
};

export default PaginationInfo;
