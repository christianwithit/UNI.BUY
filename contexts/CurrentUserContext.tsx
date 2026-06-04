import React, { createContext, useContext, useState } from 'react';

export interface MockUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  university: string;
  bio: string;
  avatarUri: string | null;
  joinDate: string;
}

interface CurrentUserContextType {
  user: MockUser;
  setUser: (user: MockUser) => void;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

// Mock user that matches MOCK_USERS[0] (Sarah Nakato, id: 1)
const INITIAL_USER: MockUser = {
  id: 1,
  name: 'Sarah Nakato',
  email: 'sarah.nakato@mak.ac.ug',
  phone: '+256 700 123 456',
  university: 'Makerere University',
  bio: 'Computer Science student. Selling quality electronics.',
  avatarUri: null,
  joinDate: 'January 2024',
};

export function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser>(INITIAL_USER);

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error('useCurrentUser must be used within CurrentUserProvider');
  }
  return context;
};
