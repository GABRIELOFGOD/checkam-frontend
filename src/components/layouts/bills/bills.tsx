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
import { BillCategories } from "@/data/category";
import { Search } from "lucide-react";
import Loading from "@/components/general-loader";

const Bills = () => {
  const [bills, setBills] = useState<IBill[]>([]);
  const [billSearch, setBillSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllBills();
  }, [user]);

  if (isLoading) {
    return (
      <div className="h-screen top-0 left-0 w-full justify-center items-center flex z-50">
        <Loading />;
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex flex-col gap-10">
        <div className="flex gap-3 flex-col">
          <PagesTop
            title='Bills'
            short='Engage with all the bills currently in discussion and the laws at the Osun State House of Assembly. A bill is simply a proposed law and tracking bills helps you understand decisions that affect your life.'
            searchState={billSearch}
            searchChange={setBillSearch}
            gotSearch={false}
          />
          <div className="flex flex-col gap-3 md:flex-row">
            <div
              className="h-12 w-full flex-1 md:flex-[4] shadow-sm border-2 border-muted/20 rounded-md flex gap-3 px-3"
            >
              <Search size={20} className="my-auto text-muted/40" />
              <input
                type="search"
                placeholder="Search"
                className="h-full w-full border-none outline-none"
                value={billSearch}
                onChange={e => setBillSearch(e.target.value)}
              />
            </div>
            <div className="w-full flex-1 h-12">
              <Select>
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {BillCategories.map((ctg) => (
                    <SelectItem
                      key={ctg.id}
                      value="development"
                    >
                      {ctg.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {bills && <BillsMapper
          bills={bills}
        />}
      </div>
    </div>
  )
}

export default Bills;