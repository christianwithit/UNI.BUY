import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Profile } from '../types/database';

interface CurrentUserContextType {
  user: Profile | null;
  loading: boolean;
  setUser: (updates: Partial<Profile>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      // Get current auth user
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

      if (authError || !authUser) {
        setUserState(null);
        setLoading(false);
        return;
      }

      // Fetch profile from database
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (profileError) {
        console.error('Error loading profile:', profileError);
        setUserState(null);
      } else {
        setUserState(profile);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      setUserState(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    setLoading(true);
    await loadUser();
  };

  const setUser = async (updates: Partial<Profile>) => {
    if (!user) {
      console.error('Cannot update user: no user logged in');
      return;
    }

    try {
      // Update in database
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }

      // Update local state
      setUserState({ ...user, ...updates });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  return (
    <CurrentUserContext.Provider value={{ user, loading, setUser, refreshUser }}>
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
