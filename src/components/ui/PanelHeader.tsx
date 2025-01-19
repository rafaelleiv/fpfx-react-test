import React from 'react';

interface PanelHeaderProps {
  iconSrc: string; // The source URL for the icon
  title: string; // The title to display
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ iconSrc, title }) => {
  return (
    <div className="flex items-center space-x-2">
      <img src={iconSrc} alt={`${title} Icon`} width="18" height="16" />
      <h2 className="text-h-panel font-bold">{title}</h2>
    </div>
  );
};

export default PanelHeader;
