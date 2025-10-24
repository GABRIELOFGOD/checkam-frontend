"use client";

import { IConstituency } from "@/models/constituency";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ConstituencyDashboardCard from "./constituency-dashboard-card";

const ConstituencyComponent = ({ refresh, setRefresh }: { refresh: boolean, setRefresh:  Dispatch<SetStateAction<boolean>> }) => {
  const [constituencies, setConstituencies] = useState<IConstituency[]>([]);
  const [loading, setLoading] = useState(true);

  const getConstituencies = async () => {
    try {
      const response = await fetch("/api/constituency");
      const data = await response.json();
      setConstituencies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getConstituencies();
  }, [refresh]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center flex-col">
        <Loader2 size={30} />
        <p>Loading constituencies</p>
      </div>
    )
  }
  
  return (
    <div className=" flex flex-col gap-2 h-full overflow-y-auto">
      {constituencies.map((constituency, id) => (
        <ConstituencyDashboardCard
          key={id}
          constituency={constituency}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ))}
    </div>
  )
}
export default ConstituencyComponent;