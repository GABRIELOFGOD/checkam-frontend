import { Button } from "@/components/ui/button";
import { IConstituency } from "@/models/constituency";
import { EllipsisIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

const ConstituencyDashboardCard = ({
  constituency,
  refresh,
  setRefresh
}: {
  constituency: IConstituency;
  refresh: boolean;
  setRefresh:  Dispatch<SetStateAction<boolean>>;
}) => {

  const deleteConstituency = async () => {
    try {
      const response = await fetch(`/api/constituency?id=${constituency._id}`, {
        method: "DELETE",
        headers: {
          "authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      toast.success(data.message);
      setRefresh(!refresh);
    } catch (error: unknown) {
      console.log("Error deleting", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }
  
  return (
    <div className="w-full bg-gray-400/20 rounded-md p-2 flex justify-between">
      <p className="font-semibold my-auto capitalize">{constituency.name}</p>

      <DropdownMenu>
        <DropdownMenuTrigger className="my-auto hidden md:flex">
          <Button
            variant={"outline"}
            className="rounded-full flex justify-center my-auto items-center h-7 w-7"
          >
            <EllipsisIcon size={12} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-bold">
            Quick actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={deleteConstituency}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default ConstituencyDashboardCard;
