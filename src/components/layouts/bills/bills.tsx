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
import PagesTop from "../pages-top";
import { useUser } from "@/providers/user-provider";
import { toast } from "sonner";
import { ALLBILLS } from "@/utils/constants";
import { IBill } from "@/models/bill";

const Bills = () => {
  const [bills, setBills] = useState<IBill[]>([]);
  const [billSearch, setBillSearch] = useState<string>("");
  const { user } = useUser();

  const fetchAllBills = async () => {
    try {
      const req = await fetch(ALLBILLS);
      const res = await req.json();
      if (!req.ok) throw new Error(res.error);
      setBills(res);
    } catch (error) {
      toast.error("Error fetching all bills, check your internet and reload");
      console.log("ERROR FETCHING BILLS", error);
    }
  }

  useEffect(() => {
    fetchAllBills();
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