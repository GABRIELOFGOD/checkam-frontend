import { LegislatorType } from "@/data/legislator";
import LegislatorCard from "./legislator-card";
import Link from "next/link";
import { slugify } from "@/lib/helper";

const LegislatorMapper = ({ legislators }: { legislators: LegislatorType[] }) => {
  if (!legislators.length) {
    return (
      <div className="w-full h-[200px] flex flex-col items-center justify-center">
        <p className="text-xl font-bold italic text-gray-400 text-center">No legislature data yet!</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {legislators.map((item, i) => (
        <Link
          key={i}
          href={`/legislators/${slugify(item.name)}`}
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