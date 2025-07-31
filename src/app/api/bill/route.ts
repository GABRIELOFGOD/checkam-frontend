import { connectToDatabase } from "@/config/database";
import Bill from "@/models/bill";
import { NextRequest, NextResponse } from "next/server";

// GET /api/users - findAll or findOne by id (via query param)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await connectToDatabase();

  if (id) {
    // Find one by id
    const user = await Bill.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'Bill not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } else {
    // Find all
    const users = await Bill.find();
    return NextResponse.json(users);
  }
}

// POST /api/users - create user
export async function POST(request: NextRequest) {
  const body = await request.json();
  await connectToDatabase();
  try {
    const user = await Bill.create(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user', error }, { status: 400 });
  }
}

// PUT /api/users?id=... - update user by id
export async function PUT(request: NextRequest) {
  // const { searchParams } = new URL(request.url);
  // const id = searchParams.get('id');
  // await connectToDatabase();
  // if (!id) {
  //   return NextResponse.json({ message: 'User id is required' }, { status: 400 });
  // }
  // const body = await request.json();
  // try {
  //   const user = await User.findByIdAndUpdate(id, body, { new: true });
  //   if (!user) {
  //     return NextResponse.json({ message: 'User not found' }, { status: 404 });
  //   }
  //   return NextResponse.json(user);
  // } catch (error) {
  //   return NextResponse.json({ message: 'Error updating user', error }, { status: 400 });
  // }
}

// DELETE /api/users?id=... - delete user by id
export async function DELETE(request: NextRequest) {
  // const { searchParams } = new URL(request.url);
  // const id = searchParams.get('id');
  // await connectToDatabase();
  // if (!id) {
  //   return NextResponse.json({ message: 'User id is required' }, { status: 400 });
  // }
  // try {
  //   const user = await User.findByIdAndDelete(id);
  //   if (!user) {
  //     return NextResponse.json({ message: 'User not found' }, { status: 404 });
  //   }
  //   return NextResponse.json(user);
  // } catch (error) {
  //   return NextResponse.json({ message: 'Error deleting user', error }, { status: 400 });
  // }
}
