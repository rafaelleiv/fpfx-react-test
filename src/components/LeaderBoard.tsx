import UsersTable from './ui/UsersTable.tsx';

const LeaderBoard = () => {
  return (
    <div className={'flex flex-col space-y-3'}>
      <div className="flex items-center space-x-2">
        <img
          src="/assets/trophy-icon.svg"
          alt="Trophy Icon"
          width="18"
          height="16"
        />
        <h2 className="text-h-panel font-bold text-left decoration-skip-ink-none underline-from-font">
          Leaderboard
        </h2>
      </div>

      <UsersTable />
    </div>
  );
};
export default LeaderBoard;
