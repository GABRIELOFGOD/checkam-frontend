import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/config/database";
import Article from "@/models/article";
import { User } from "@/models/user";
import { verify } from "jsonwebtoken";
import cloudinary from "@/config/cloudinary";
import { UploadApiResponse } from "cloudinary";

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

    // const { title, content } = await req.json();
    const formData = await req.formData();
    
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as File | null;

    // Validate input
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Article image
    let imageUrl = ""
    if (image) {
      const imageBuffer = Buffer.from(await image.arrayBuffer())
      const uploadedImage = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image" }, (error, result) => {
            if (error || !result) {
              console.log("Error", error);
              reject(error);
            }
            else resolve(result)
          })
          .end(imageBuffer)
      });
      imageUrl = uploadedImage.secure_url
    }

    // Create article
    const article = await Article.create({
      title,
      content,
      image: imageUrl,
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
    const id = searchParams.get("id");

    if (id) {
      const articles = await Article.findById(id)
      .populate("author", "fname lname email");

      return NextResponse.json(articles);
    }

    // Get articles with optional limit
    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .limit(limit || 0)
      .populate("author", "fname lname email");

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
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
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { title, content } = await req.json();

    // Validate input
    if (!id || !title || !content) {
      return NextResponse.json(
        { error: "ID, title, and content are required" },
        { status: 400 }
      );
    }

    // Update article
    const article = await Article.findByIdAndUpdate(id, {
      title,
      content,
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}