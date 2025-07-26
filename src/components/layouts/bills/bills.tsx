"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BillsMapper from "./bills-mapper";
import { useEffect, useState } from "react";
import { BillType } from "@/data/bills";
import { bills as allBills } from "@/data/bills";
import PagesTop from "../pages-top";
import { useUser } from "@clerk/nextjs";

const Bills = () => {
  const [bills, setBills] = useState<BillType[]>([]);
  const [billSearch, setBillSearch] = useState<string>("");
  const { user } = useUser();

  useEffect(() => {
    setBills(allBills);
    console.log("[USER] ", user?.publicMetadata);
  }, [user]);
  
  return (
    <div>
      <div className="flex flex-col gap-10">
        <div className="flex gap-3 flex-col">
          <PagesTop
            title='Bills'
            short='Track the progress of bills in the Osun State House of Assembly'
            searchState={billSearch}
            searchChange={setBillSearch}
          />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="education">Educate</SelectItem>
              <SelectItem value="health">Health</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {bills && <BillsMapper
          bills={bills}
        />}
      </div>
    </div>
  )
}

export default Bills;