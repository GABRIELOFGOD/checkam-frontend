import { BillType } from "@/data/bills";
import BillCard from "./bill-card";

const BillsMapper = ({ bills }: { bills: BillType[] }) => {
  return (
    <div className="flex flex-col gap-5 md:gap-10">
      {bills.map((item, i) => (
        <BillCard
          key={i}
          bill={item}
        />
      ))}
    </div>
  )
}

export default BillsMapper;