import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/config/database";
import Discussion from "@/models/discussions";
import Comment from "@/models/comment";
import { authenticateRequest } from "@/lib/auth-utils";
import { IUser } from "@/models/user";
// import { Types } from "mongoose";

export async function POST(request: NextRequest) {
  await connectToDatabase();

  type AuthResult = { error?: NextResponse } | { user: IUser };
  const authResult = (await authenticateRequest(request)) as AuthResult;
  if ("error" in authResult && authResult.error) return authResult.error;
  const { user } = authResult as { user: IUser };

  try {
    const body = await request.json();
    const { discussionId, message, parentId } = body;

    if (!discussionId || !message) {
      return NextResponse.json(
        { error: "discussionId and message are required" },
        { status: 400 }
      );
    }

    const discussion = await Discussion.findById(discussionId);
    if (!discussion)
      return NextResponse.json(
        { error: "Discussion not found" },
        { status: 404 }
      );

    const newComment = await Comment.create({
      discussion: discussion._id,
      parent: parentId || null,
      by: user._id,
      message,
    });
    // push comment id into discussion.comments
    discussion.comments = discussion.comments || [];
    discussion.comments.push(newComment._id);
    await discussion.save();
    await discussion.save();

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
