import LegislatorCard from "./legislator-card";
import Link from "next/link";
import { IUser } from "@/models/user";

const LegislatorMapper = ({ legislators }: { legislators: IUser[] }) => {
  if (!legislators.length) {
    return (
      <div className="w-full h-[200px] flex flex-col items-center justify-center">
        <p className="text-xl font-bold italic text-gray-400 text-center">No legislature data yet!</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {legislators.map((item, i) => (
        <Link
          key={i}
          href={`/legislators/${item._id}`}
        >
          <LegislatorCard
            legislator={item}
          />
        </Link>
      ))}
    </div>
  )
}

export default LegislatorMapper;