"use client";

import { Button } from "@/components/ui/button";
import { PenBoxIcon } from "lucide-react";
import Link from "next/link";

function CreateDiscussionButton() {
  return (
    <div className="fixed bottom-10 right-5 md:right-10 flex items-center justify-center">
      <Button
        className={`h-12 w-12 rounded-full animate-bounce shadow-md opacity-80`}
        variant={"default"}
        onClick={() => {}}
      >
        <Link href={"/discussion/new"}>
          <PenBoxIcon />
        </Link>
      </Button>
    </div>
  )
}
export default CreateDiscussionButton;