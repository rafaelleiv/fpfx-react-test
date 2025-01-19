import React from 'react';

interface SummaryCardProps {
  title: string; // The title of the card
  value: number; // The value to display
  valueClassName: string; // Class for styling the value (color)
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  valueClassName,
}) => {
  return (
    <div className="bg-primary px-3 py-2 rounded mb-2">
      <h3 className="text-textSecondary">{title}</h3>
      <p className={`text-[20px] font-semibold ${valueClassName}`}>
        ${Math.abs(value).toLocaleString()}
      </p>
    </div>
  );
};

export default SummaryCard;
