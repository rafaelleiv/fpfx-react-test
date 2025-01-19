import UsersTable from './ui/UsersTable.tsx';
import PanelHeader from './ui/PanelHeader.tsx';

const LeaderBoard = () => {
  return (
    <div className={'flex flex-col space-y-3'}>
      {/* Header with image and title */}
      <PanelHeader iconSrc="/assets/trophy-icon.svg" title="Leaderboard" />

      {/* Table for the users */}
      <UsersTable />
    </div>
  );
};
export default LeaderBoard;
