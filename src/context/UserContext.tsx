import React, { createContext, useEffect, useState } from 'react';
import { User } from '@/types/user';

// API URL
const usersApiUrl = 'http://localhost:8000/users';

interface UserContextProps {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(usersApiUrl);

        // Check response status
        if (!response.ok) {
          setError('Failed to fetch users');
          return; // Exit the function early if the response is not OK
        }

        const data = await response.json();
        // calculate the total profit, loss and balance for each user
        data.forEach((user: User) => {
          user.totalProfit = user.profit.reduce(
            (acc: number, val: number) => acc + val,
            0
          );
          user.totalLoss = user.loss.reduce(
            (acc: number, val: number) => acc + val,
            0
          );
          user.balance = user.totalProfit + user.totalLoss;
        });
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers().then();
  }, []);

  return (
    <UserContext.Provider value={{ users, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
