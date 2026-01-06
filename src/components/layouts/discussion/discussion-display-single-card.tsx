"use client";

import { Button } from "@/components/ui/button";
import { IDiscussionType } from "@/models/discussions";
import { EllipsisIcon } from "lucide-react";
import DiscussionActions from "./discussion-actions";
import DiscussionImages from "./discussion-images";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useDiscussionComment } from "@/hooks/use-comment";
import { useState } from "react";

const DiscussionDisplaySingleCard = ({ discussion, id }: { discussion: IDiscussionType, id: string }) => {
  const { newComment } = useDiscussionComment();

  const [comment, setComment] = useState<string>("");
  
  // console.log("Single discussion", discussion);
  return (
      <div>
        <div className="flex flex-col gap-3 rounded-sm shadow-sm p-4">
        <div className="flex justify-between gap-5">
          <div className="flex flex-col gap-[1px]">
            <p className="font-bold truncate">{discussion.postedBy.fname} {discussion.postedBy.lname}</p>
            <p className="text-sm font-light text-gray-500 truncate">{discussion.constituencies.length === 0 ? "" : discussion.constituencies.length === 1 ? discussion.constituencies[0].name : `${discussion.constituencies[0].name} and ${discussion.constituencies.length-1} other constituencies`}</p>
          </div>
          <Button
            variant={"secondary"}
            size={"sm"}
            className="rounded-full h-7 w-7 flex justify-center items-center my-auto bg-gray-400 hover:bg-gray-300"
          >
            <EllipsisIcon size={15} color="white" />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Link href={`/discussion/${id}`} className="text-gray-800 text-lg line-clamp-4 leading-6">{discussion.content}</Link>
            {/* images show here: get image urls by discussion.images */}
          {discussion.images && (<DiscussionImages images={discussion.images} />)}
          <DiscussionActions
            id={id}
            comments={discussion.comments.length}
            likes={discussion.likes}
            tags={discussion.tags.length}
          />
        </div>
      </div>

      <div id="comment" className="mt-5 w-full flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Comments</h3>
        <div>
          <div className="flex flex-col gap-2">
            <Textarea
              className="w-full h-32 border border-dashed border-gray-300 rounded-md flex justify-center items-center"
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  newComment(id, comment || "");
                  setComment("");
                }
              }}
            />
            <Button
              className="self-end"
              onClick={() => {
                newComment(id, comment || "");
                setComment("");
              }}
            >Post Comment</Button>
          </div>
          <div>
            <p className="text-gray-400 italic font-semibold text-center my-5">No comments yet!</p>
          </div>
        </div>
      </div>
      </div>
    )
}
export default DiscussionDisplaySingleCard;