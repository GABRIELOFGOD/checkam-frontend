import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/database";
import Article from "@/models/article";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Connect to database
    await connectToDatabase();

    const article = await Article.findById(params.id).populate(
      "author",
      "name email"
    );

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Connect to database
    await connectToDatabase();

    const { title, content, status } = await req.json();

    const article = await Article.findByIdAndUpdate(
      params.id,
      { title, content, status },
      { new: true, runValidators: true }
    );

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Connect to database
    await connectToDatabase();

    const article = await Article.findByIdAndDelete(params.id);

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
