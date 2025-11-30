"use client";

import { Button } from "@/components/ui/button";
import { useDiscussion } from "@/hooks/useDiscussion";
// import { IUser } from "@/models/user";
// import { DiscussionComment } from "@/types/discussion";
import { IconUserStar } from "@tabler/icons-react";
import { AtSignIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react";

const DiscussionActions = ({
  id,
  likes,
  comments
}:  {
  id: string;
  likes: number;
  comments: number;
}) => {
const { like } = useDiscussion();

  return (
    <div className="w-full grid grid-cols-4 h-10">
      <Button
        variant={"ghost"}
        className="flex gap-2 h-full"
        onClick={() => like(id)}
      >
        {likes}
        <ThumbsUpIcon />
      </Button>

      <Button
        variant={"ghost"}
        className="flex gap-2 h-full"
      >
        {comments}
        <MessageCircleIcon />
      </Button>

      <Button
        variant={"ghost"}
        className="flex gap-2 h-full"
      >
        <AtSignIcon />
      </Button>

      <Button
        variant={"ghost"}
        className="flex gap-2 h-full"
      >
        {likes}
        <IconUserStar />
      </Button>
    </div>
  )
}
export default DiscussionActions;