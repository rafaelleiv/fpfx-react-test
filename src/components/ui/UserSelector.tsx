import React from 'react';
import { User } from '@/types/user';

interface UserSelectorProps {
  users: User[]; // List of users
  selectedUserId: string | null; // ID of the selected user
  onSelect: (userId: string) => void; // Function to call when a user is selected
}

const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUserId,
  onSelect,
}) => {
  return (
    <div className="flex items-center">
      <label
        htmlFor="userSelect"
        className="text-textSecondary mr-2 text-[16px]"
      >
        Select user
      </label>
      <select
        id="userSelect"
        value={selectedUserId || ''}
        onChange={(e) => onSelect(e.target.value)}
        className="bg-primary text-textSecondary px-2 py-2 rounded focus:outline-none"
      >
        {/* Display users' list */}
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} {user.lastname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelector;
