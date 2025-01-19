import React from 'react';

interface SummaryCardProps {
  title: string; // The title of the card
  value: number; // The value to display
  textColor: string; // Class for styling (color)
  containerStyle?: string; // Class for styling
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  textColor,
  containerStyle,
}) => {
  return (
    <div className={`bg-primary px-3 py-2 rounded mb-2 ${containerStyle}`}>
      <h3 className="text-textSecondary">{title}</h3>
      <p className={`sm:text-[20px] font-semibold ${textColor}`}>
        ${Math.abs(value).toLocaleString()}
      </p>
    </div>
  );
};

export default SummaryCard;
