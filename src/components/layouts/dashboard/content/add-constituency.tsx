"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const AddConstituency = ({ open, setOpen, setRefresh, refresh }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, setRefresh: Dispatch<SetStateAction<boolean>>, refresh: boolean }) => {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
  setSubmitting(true);
    try {
      const response = await fetch("/api/constituency",{
        method: "POST",
        body: JSON.stringify({ name: text }),
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!response.ok) throw new Error("Failed to create");
      const data = await response.json();
      toast.success(data.message);
      setRefresh(!refresh);
      setOpen(false);
    } catch (error: unknown) {
      console.log("Error creating constituency", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open Input Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new constituency</DialogTitle>
          <DialogDescription>
            Add constituency users can reference while creating discussion.
          </DialogDescription>
        </DialogHeader>

        <Input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Constituency name"
        />

        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <div className="flex gap-3">
                <Loader2 className="animate-spin my-auto" />
                <p className="my-auto">Saving...</p>
              </div>
            ) : (<p>Save</p>)}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}
export default AddConstituency;