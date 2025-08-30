import { connectToDatabase } from "@/config/database";
import { Feedback } from "@/models/feedback";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

interface JwtPayload {
  email: string;
}

async function authenticateAdmin(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Authorization token missing or invalid", status: 401 };
  }

  const token = authHeader.split(" ")[1];
  let decoded: JwtPayload;
  try {
    decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch {
    return { error: "Invalid token", status: 401 };
  }

  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    return { error: "Please login", status: 403 };
  }

  // Here you can check if user is admin
  // if (!user.isAdmin) return { error: "Unauthorized", status: 403 };

  return { user };
}

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const { name, email, topic, message } = body;

    if (!topic || !message) {
      return NextResponse.json(
        { error: "Topic and message are required" },
        { status: 400 }
      );
    }

    const newFeedback = await Feedback.create({
      name,
      email,
      topic,
      message,
    });

    return NextResponse.json(
      { message: "Feedback submitted", data: newFeedback },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit feedback", details: error },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const auth = await authenticateAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const feedbacks = await Feedback.find()
    .sort({ createdAt: -1 });

  return NextResponse.json(feedbacks, { status: 200 });
}

export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const auth = await authenticateAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "ID and status required" }, { status: 400 });
    }

    const updated = await Feedback.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated) {
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update feedback", err: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const auth = await authenticateAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  await Feedback.findByIdAndDelete(id);
  return NextResponse.json({ message: "Feedback deleted" }, { status: 200 });
}