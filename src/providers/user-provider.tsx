"use client";
import { IUser } from '@/models/user';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type UserContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLoaded: boolean;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");
      const req = await fetch("/api/auth", {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        }
      });

      const res = await req.json();
      if (!req.ok) throw new Error(res.error);
      if (res.error) throw new Error(res.error);
      setUser(res.user as IUser);

    } catch (error: unknown) {
      if (error == typeof Error){
        console.log("[ERROR] ", error);
      }
      console.log("[ERROR] ", error);
    } finally {
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoaded }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}