import { connectToDatabase } from "@/config/database";
import Comment from "@/models/comment";
import Discussion from "@/models/discussions";
import { User } from "@/models/user";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectToDatabase();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json(
      { error: "Discussion ID is required" },
      { status: 400 }
    );

  // === AUTH HEADER CHECK ===
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Authorization token missing or invalid" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  let decoded;
  try {
    decoded = verify(token, process.env.JWT_SECRET!) as { email: string };
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    const user = await User.findOne({ email: decoded.email });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const post = await Discussion.findById(id);
    if (!post)
      return NextResponse.json(
        { error: "Discussion not exist or has been deleted" },
        { status: 404 }
      );

    const { message } = await request.json();
    if (!message)
      return NextResponse.json(
        { error: "Write your comment to be posted" },
        { status: 400 }
      );

    await Comment.create({
      discussion: post._id,
      by: user._id,
      message,
    });

    return NextResponse.json({ message: "Comment posted" }, { status: 201 });
  } catch (error: unknown) {
    console.log("Error posting comment", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, error },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Error posting comment", error },
        { status: 500 }
      );
    }
  }
}
