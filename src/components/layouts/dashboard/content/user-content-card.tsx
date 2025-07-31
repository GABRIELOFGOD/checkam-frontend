import { IUser } from "@/models/user";
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

const UserContentCard = ({ user }: { user: IUser }) => {
  return (
    <div className="flex gap-3 justify-between bg-border/60 hover:bg-border duration-200 ease-in-out px-3 py-2 cursor-pointer rounded-sm">
      <div className="flex gap-3">
        <div className="my-auto h-12 w-12 rounded-full overflow-hidden flex justify-center items-center bg-muted">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.fname}
              fill
              className="object-contain"
            />
          ) : (
            <p className="text-xl font-extrabold">{user.fname.slice(0,1)}{user.lname.slice(0,1)}</p>
          )}
        </div>
        <div className="my-auto">
          <p className="font-extrabold truncate">{user.fname} {user.lname}</p>
          <p className="text-xs font-medium text-gray-500 truncate">{user.email}</p>
        </div>
      </div>
      <div className="my-auto relative">
        <DropdownMenu>
          <DropdownMenuTrigger className="my-auto hidden md:flex">
            <button className="h-6 w-6 cursor-pointer rounded-full hover:bg-muted/40 bg-border duration-200 my-auto flex justify-center items-center">
              <Ellipsis size={15} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="font-bold">Quick actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View profile</DropdownMenuItem>
            <DropdownMenuItem>Block user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
export default UserContentCard;