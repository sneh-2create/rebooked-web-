'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type User = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  signIn: (params: { name: string; email: string }) => void;
  signOut: () => void;
};

const STORAGE_KEY = 'rebooked_user_v1';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as User;
      if (parsed?.email && parsed?.name) setUser(parsed);
    } catch {
      // Ignore storage errors (private mode, disabled storage, etc.)
    }
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      signIn: ({ name, email }) => {
        const nextUser = { name, email };
        setUser(nextUser);
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
        } catch {
          // Ignore storage errors
        }
      },
      signOut: () => {
        setUser(null);
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          // Ignore storage errors
        }
      },
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

