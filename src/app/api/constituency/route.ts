import { connectToDatabase } from "@/config/database";
import { NextRequest, NextResponse } from "next/server";
import Constituency from "@/models/constituency";
import { User } from "@/models/user";
import { verify } from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const constituency = await Constituency.findOne({ _id: id });
      if (!constituency) {
        return NextResponse.json({ message: "Constituency not found" }, { status: 404 });
      }

      return NextResponse.json(constituency);
    } else {
      const constituencies = await Constituency.find();
      return NextResponse.json(constituencies);
    }
  } catch (error) {
    console.error("ERROR GET", error)
        return NextResponse.json({ message: "Error fetching bills" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectToDatabase()
    
  const authHeader = request.headers.get("authorization")
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
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name } = body;
    if (!name) return NextResponse.json({
      message: "Name is required to create constituency"
    }, { status: 400 });

    await Constituency.create({ name });
    return NextResponse.json({ message: "Constituency created" }, { status: 201 });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Error creating bill", error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  await connectToDatabase()
    
  const authHeader = request.headers.get("authorization")
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
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      await Constituency.findByIdAndDelete(id);
      return NextResponse.json({ message: "Constituency removed successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Please select a constituency to be deleted" }, { status: 400 });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Error creating bill", error }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  await connectToDatabase()
    
  const authHeader = request.headers.get("authorization")
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
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const body = await request.json();
    const { name } = body;
    if (!name) return NextResponse.json({
      message: "Enter new name to update"
    }, { status: 400 });

    await Constituency.findByIdAndUpdate(id, { name });

    return NextResponse.json({
      message: "Constituency name updated successfully"
    }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Error creating bill", error }, { status: 500 });
  }
}
