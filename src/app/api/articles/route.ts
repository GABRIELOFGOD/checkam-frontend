import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/config/database";
import Article from "@/models/article";
import { User } from "@/models/user";
import { verify } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {

    // Connect to database
    await connectToDatabase();
    const authHeader = req.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization token missing or invalid" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    let decoded
    try {
      decoded = verify(token, process.env.JWT_SECRET!) as { email: string }
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    const { title, content } = await req.json();

    // Validate input
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Create article
    const article = await Article.create({
      title,
      content,
      author: user._id,
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Connect to database
    await connectToDatabase();

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit")) || undefined;

    // Get articles with optional limit
    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .limit(limit || 0)
      .populate("author", "name email");

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
