import { useState } from 'react';
import { useUserContext } from '@/context/useUserContext.ts';
import PanelHeader from '@/components/ui/PanelHeader.tsx';
import UserSelector from '@/components/ui/UserSelector.tsx';
import UsersChart from '@/components/ui/UsersChart.tsx';

const Overview = () => {
  const { users, loading, error } = useUserContext();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Find the selected user; default to the first user if none is selected
  const selectedUser =
    users.find((user) => user.id === selectedUserId) || users[0];

  // Show an error message if something goes wrong
  if (error) return <p>Error: {error}</p>;

  // Show a loading message until users are loaded
  if (loading) return <p className={'text-textSecondary'}>Loading...</p>;

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        {/* Header with image and title */}
        <PanelHeader iconSrc="/assets/chart-icon.svg" title="Overview" />

        {/* User selector */}
        <UserSelector
          users={users}
          selectedUserId={selectedUserId}
          onSelect={setSelectedUserId}
        />
      </div>

      {/* Chart for the selected user */}
      <UsersChart user={selectedUser} />
    </div>
  );
};

export default Overview;
