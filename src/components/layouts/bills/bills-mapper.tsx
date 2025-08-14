import { FileIcon } from "lucide-react";
import BillCard from "./bill-card";
import { IBill } from "@/models/bill";

const BillsMapper = ({ bills }: { bills: IBill[] }) => {
  return (
    <div className="flex flex-col gap-5 md:gap-10">
      {bills.length < 1 ? (
        <div className="flex gap-3 flex-col w-full justify-center items-center">
          <FileIcon size={30} className="text-muted-foreground" />
          <p className="text-lg text-gray-500">No bills found</p>
        </div>
      ) : bills.map((item, i) => (
        <BillCard
          key={i}
          bill={item}
        />
      ))}
    </div>
  )
}

export default BillsMapper;