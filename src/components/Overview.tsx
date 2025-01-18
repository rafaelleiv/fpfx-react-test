import { useState } from 'react';
import UsersChart from './ui/UsersChart.tsx';
import { useUserContext } from '../context/useUserContext.ts';

const Overview = () => {
  const { users, loading, error } = useUserContext();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const selectedUser =
    users.find((user) => user.id === selectedUserId) || users[0];

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p className={'text-textSecondary'}>Loading...</p>; // Handle the case when user data is still loading

  return (
    <div className={'flex flex-col space-y-3'}>
      <div className={'flex flex-row justify-between items-center'}>
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
        <div className="flex items-center">
          <label
            htmlFor="userSelect"
            className="text-textSecondary mr-2 text-sm"
          >
            Select user
          </label>
          <select
            id="userSelect"
            value={selectedUserId || ''}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="bg-primary text-textSecondary px-2 py-2 rounded text-[14px] focus:outline-none"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} {user.lastname}
              </option>
            ))}
          </select>
        </div>
      </div>

      <UsersChart user={selectedUser} />
    </div>
  );
};

export default Overview;
