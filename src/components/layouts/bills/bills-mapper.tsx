import BillCard from "./bill-card";
import { IBill } from "@/models/bill";

const BillsMapper = ({ bills }: { bills: IBill[] }) => {
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