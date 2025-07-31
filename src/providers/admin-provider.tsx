"use client";

import { IUser } from "@/models/user";
import { ALLUSERS } from "@/utils/constants";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useUser } from "./user-provider";
import { usePathname, useRouter } from "next/navigation";

export type UserDataProp = {
  data: IUser[];
  error: boolean;
  loading: boolean;
};

type AdminContextType = {
  users: UserDataProp;
  adminLoads: boolean;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

type AdminProviderProps = {
  children: ReactNode;
};

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [adminLoads, setAdminLoads] = useState<boolean>(false);
  const [users, setUsers] = useState<UserDataProp>({ data: [], error: false, loading: true });
  // const [bills, setBils] = useState([]);
  // const [infographs, setInfoGraphs] = useState([]);

  const { isLoaded, user } = useUser();
  const router = useRouter();
    const path = usePathname();

  const getUsers = async () => {
    try {
      const req = await fetch(ALLUSERS, { next: { revalidate: 3600 } });
      const res = await req.json();
      if (!req.ok || res.error) throw new Error(res.error);
      setUsers((prev) => ({ ...prev, data: res as IUser[] }));
    } catch (error) {
      console.log("[USERS ERROR] ", error);
      setUsers((prev) => ({ ...prev, error: true }));
    } finally {
      setUsers((prev) => ({ ...prev, loading: false }));
    }
  }

  useEffect(() => {
    if (isLoaded && !user) {
      router.push(`/login?back=${path}`);
    } else {
      if (isLoaded && user?.role !== "admin") {
        router.push("/");
      } else {
        setAdminLoads(true);
        getUsers();
      }
    }
    
  }, [isLoaded]);

  return (
    <AdminContext.Provider value={{ users, adminLoads }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

