"use client";

import { use, useEffect, useState } from "react";
// import DiscussionDisplayCard from "./discussion-display-card";
import { Loader2 } from "lucide-react";
import DiscussionDisplayCard from "@/components/layouts/discussion/discussion-display-card";
import CreateDiscussionButton from "@/components/layouts/discussion/create-discussion-button";
import { DisplayCardDiscussionType } from "../page";
import DiscussionDisplaySingleCard from "@/components/layouts/discussion/discussion-display-single-card";
// import CreateDiscussionButton from "./create-discussion-button";

const SingleDiscussion = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [discussion, setDiscussion] = useState<DisplayCardDiscussionType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
  
    const getDiscussions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/discussion");
        const data = await response.json() as DisplayCardDiscussionType;
        setDiscussion(data);
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
        <div className="w-full h-[500px] flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      )
    }
    
    return (
      <div className="h-full w-full flex flex-col gap-3 relative md:overflow-y-auto px-3 md:px-10">
          <DiscussionDisplaySingleCard
            id={id}
            discussion={discussion!}
          />
        <CreateDiscussionButton />
      </div>
    )
}
export default SingleDiscussion;