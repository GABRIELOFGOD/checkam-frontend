"use client";

import { Button } from "@/components/ui/button";
import { useDiscussion } from "@/hooks/useDiscussion";
import { useUser } from "@/providers/user-provider";
// import { IUser } from "@/models/user";
// import { DiscussionComment } from "@/types/discussion";
import { IconUserStar } from "@tabler/icons-react";
import { AtSignIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DiscussionActions = ({
  id,
  likes,
  comments,
  tags
}:  {
  id: string;
  likes: ObjectId[];
  comments: number;
  tags: number;
}) => {
  const [liked, setLiked] = useState(false);
const { like } = useDiscussion();

const { user } = useUser();
const router = useRouter();

useEffect(() => {
  if (user) {
    if (likes.includes(user?._id)){
      setLiked(true);
    }
  }
}, []);

  return (
    <div className="w-full grid grid-cols-4 h-10">
      <Button
        variant={"ghost"}
        className="flex gap-2 h-full"
        onClick={() => {
          like(id);
          setLiked(!liked);
          router.refresh();
        }}
      >
        {likes.length}
        <ThumbsUpIcon color={liked ? "blue" : "black"} />
      </Button>

      <Button
        variant={"ghost"}
        className="flex gap-2 h-full"
        onClick={() => {
          router.push(`/discussion/${id}#comment`);
        }}
      >
        {comments}
        <MessageCircleIcon />
      </Button>

      <Button
        variant={"ghost"}
        className="flex gap-2 h-full"
      >
        {tags}
        <AtSignIcon />
      </Button>

      <Button
        variant={"ghost"}
        className="flex gap-2 h-full"
      >
        {tags}
        <IconUserStar />
      </Button>
    </div>
  )
}
export default DiscussionActions;