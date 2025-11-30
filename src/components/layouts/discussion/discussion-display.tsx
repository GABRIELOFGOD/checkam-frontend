"use client";

import { IDiscussionType } from "@/models/discussions";
import { useEffect, useState } from "react";
import DiscussionDisplayCard from "./discussion-display-card";
import { Loader2 } from "lucide-react";
import CreateDiscussionButton from "./create-discussion-button";

interface DisplayCardDiscussionType extends IDiscussionType {
  _id: string;
}

const DiscussionDisplay = () => {
  const [discussions, setDiscussions] = useState<DisplayCardDiscussionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDiscussions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/discussion");
      const data = await response.json() as DisplayCardDiscussionType[];
      setDiscussions(data);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDiscussions();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[200px] flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }
  
  return (
    <div className="flex w-full md:gap-5 h-full">
      <div className="lg:flex flex-col p-5 hidden w-[25%]"></div>
      <div className="h-full w-full flex flex-col gap-3 relative h-full md:overflow-y-auto px-3">
        {discussions.map((disc, id) => (
          <DiscussionDisplayCard
            id={disc._id}
            key={id}
            discussion={disc}
          />
        ))}
        <CreateDiscussionButton />
      </div>
      <div className="lg:flex flex-col p-5 hidden w-[25%]"></div>
    </div>
  )
}
export default DiscussionDisplay;