import UsersChart from './ui/UsersChart.tsx';

const Overview = () => {
  return (
    <div className={'flex flex-col space-y-3'}>
      <div className="flex items-center space-x-2">
        <img
          src="/assets/chart-icon.svg"
          alt="Chart Icon"
          width="18"
          height="16"
        />
        <h2 className="text-h-panel font-bold text-left decoration-skip-ink-none underline-from-font">
          Overview
        </h2>
      </div>

      <UsersChart />
    </div>
  );
};
export default Overview;
