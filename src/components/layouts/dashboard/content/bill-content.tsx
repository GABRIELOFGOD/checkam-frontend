import { useAdmin } from "@/providers/admin-provider";
import { Loader2 } from "lucide-react";
import BillContentCard from "./bill-content-card";

const BillContents = () => {
  const { bills } = useAdmin();
  
  const displayable = bills.data.slice(0, 11);

  return (
    <div>
      { bills.error ? (
        <div className='w-full h-[200px] flex gap-3 justify-center items-center'>
          <p className="font-bold text-sm my-auto">Error fetching bills</p>
        </div>)
        : bills.loading ? (
        <div className='w-full h-[200px] flex gap-3 justify-center items-center'>
          <Loader2 className="animate-spin my-auto" size={15} />
          <p className="font-bold text-sm my-auto">Loading bills</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 h-full w-full">
          {displayable.map((bill, i) => (
            <BillContentCard
              key={i}
              bill={bill}
            />
          ))}
        </div>
      )}
    </div>
  )
}
export default BillContents;