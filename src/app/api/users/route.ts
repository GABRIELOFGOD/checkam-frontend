// app/api/users/route.ts
import cloudinary from "@/config/cloudinary"
import { connectToDatabase } from '@/config/database';
import { Bill, IBill } from "@/models/bill";
import { User } from '@/models/user';
import { UploadApiResponse } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/users - findAll or findOne by id (via query param)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const withProjects = searchParams.get('with') === 'projects';
  await connectToDatabase();
  let projects: IBill[] = [];

  if (id) {
    // Find one by id
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    if (withProjects) {
      projects = await Bill.find({ sponsored: id });
    }
    return NextResponse.json({ user, projects });
  } else {
    // Find all
    const users = await User.find();
    return NextResponse.json(users);
  }
}

// POST /api/users - create user
export async function POST(request: NextRequest) {
  const body = await request.json();
  await connectToDatabase();
  try {
    const user = await User.create(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user', error }, { status: 400 });
  }
}

// PUT /api/users?id=... - update user by id
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await connectToDatabase();
  if (!id) {
    return NextResponse.json({ message: 'User id is required' }, { status: 400 });
  }
  const body = await request.json();
  try {
    const user = await User.findByIdAndUpdate(id, body, { new: true });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating user', error }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await connectToDatabase();

  if (!id) {
    return NextResponse.json({ message: "User id is required" }, { status: 400 });
  }

  try {
    const formData = await request.formData();

    const file = formData.get("image") as File | null;

    let imageUrl = null;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadedImage = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image" }, (error, result) => {
            if (error || !result) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      imageUrl = uploadedImage.secure_url;
    }

    const updateFields: Record<string, unknown> = {};
    if (imageUrl !== null) updateFields.image = imageUrl; // overwrite with new upload

    const user = await User.findByIdAndUpdate(id, updateFields, { new: true });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Error updating user", error }, { status: 500 });
  }
}

// DELETE /api/users?id=... - delete user by id
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await connectToDatabase();
  if (!id) {
    return NextResponse.json({ message: 'User id is required' }, { status: 400 });
  }
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting user', error }, { status: 400 });
  }
}
