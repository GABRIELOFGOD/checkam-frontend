import { IBill } from "@/models/bill";
import { BookIcon, ImageIcon, PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AdminBillCard = ({ bill }: { bill: IBill }) => {
  return (
    <div className="w-full border border-border rounded-md p-2">
      <Link href={`/dashboard/bill/${bill._id}`} className="h-fit w-fit">
        <div className="w-full h-[200px] overflow-hidden rounded-t-md relative">
          {bill.image ? <Image
            src={bill.image}
            alt={bill.title}
            fill
            className="object-contain"
          /> : (<div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={30} />
          </div>)}
        </div>
      </Link>

      <div className="mt-1">
        <div>
          <p className="font-bold truncate">{bill.title}</p>
          <p className="text-sm italic text-gray-500 line-clamp-2">{bill.summary}</p>
        </div>

        <div className="flex justify-between w-full mt-2 h-full mb-auto">
          <div className="flex gap-2 my-auto">
            <BookIcon size={15} className="my-auto text-gray-500/90" />
            <p className="text-xs text-gray-400 my-auto capitalize">{bill.stage}</p>
          </div>
          <Link href={`/dashboard/bill/${bill._id}`} className="text-gray-400 my-auto">
            <PencilIcon size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}
export default AdminBillCard;