import { Ellipsis } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IBill } from "@/models/bill";

const BillContentCard = ({ bill }: {bill: IBill }) => {
  return (
    <div className="flex gap-3 justify-between bg-border/60 hover:bg-border duration-200 overflow-hidden px-3 py-2 cursor-pointer rounded-sm relative">
      <div className="flex gap-3 flex-[5] min-w-0">
        <div className="my-auto h-12 w-12 rounded-full overflow-hidden flex justify-center items-center relative bg-muted">
          {bill.image ? (
            <Image
              src={bill.image}
              alt={bill.title}
              fill
              className="object-contain"
            />
          ) : (
            <p className="text-xl font-extrabold">{bill.title.slice(0,2)}</p>
          )}
        </div>
        <div className="my-auto flex-1 min-w-0">
          <p className="font-extrabold truncate">{bill.title}</p>
          <p className="text-xs font-medium text-gray-500 truncate">{bill.summary}</p>
        </div>
      </div>
      <div className="my-auto">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="h-6 w-6 cursor-pointer rounded-full hover:bg-muted/40 bg-border duration-200 my-auto flex justify-center items-center">
              <Ellipsis size={15} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="font-bold">Quick actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View bill</DropdownMenuItem>
            <DropdownMenuItem>Edit bill</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
export default BillContentCard;