"use client";

import { useAdmin } from "@/providers/admin-provider";
import { Loader2 } from "lucide-react";
import AdminBillCard from "./admin-bill-card";
import { IconFileInvoice } from "@tabler/icons-react";

const AdminBillMapper = () => {
  const { bills } = useAdmin();

  return (
    <div className="w-full">
      {bills.error ? (
        <div className="w-full h-[200px] flex items-center justify-center ">
          <p className="text-sm font-bold">Error fetching bills, please reload the page</p>
        </div>
      ) : bills.loading ? (
        <div className='w-full h-[200px] flex gap-3 justify-center items-center'>
          <Loader2 className="animate-spin my-auto" size={15} />
          <p className="font-semibold text-sm my-auto">Loading bills</p>
        </div>
      ) : bills.data.length < 1 ? (
        <div className="w-full h-fit p-5 flex flex-col items-center justify-center">
          <IconFileInvoice size={30} className="text-gray-700 animate-pulse" />
          <p className="text-gray-400 italic font-bold">No bills yet!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {bills.data.map((bill, i) => (
            <AdminBillCard
              key={i}
              bill={bill}
            />
          ))}
        </div>
      )}
    </div>
  )
}
export default AdminBillMapper;