"use client";

import { Button } from "@/components/ui/button";
import { IConstituency } from "@/models/constituency";
import { EllipsisIcon, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  // DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";

const ConstituencyDashboardCard = ({
  constituency,
  refresh,
  setRefresh,
}: {
  constituency: IConstituency;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(constituency.name);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const deleteConstituency = async () => {
    try {
      const response = await fetch(`/api/constituency?id=${constituency._id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      toast.success(data.message);
      setRefresh(!refresh);
    } catch (error: unknown) {
      console.log("Error deleting", error);
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const res = await fetch(`/api/constituency?id=${constituency._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: text }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("Constituency updated");
      setOpen(false);
      setRefresh(!refresh);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

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

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={deleteConstituency}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit constituency</DialogTitle>
            <DialogDescription>Update the constituency name.</DialogDescription>
          </DialogHeader>

          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Constituency name"
          />

          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? (
                <div className="flex gap-3">
                  <Loader2 className="animate-spin my-auto" />
                  <p className="my-auto">Saving...</p>
                </div>
              ) : (
                <p>Save</p>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConstituencyDashboardCard;
