import { User } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs";
import { connectToDatabase } from '@/config/database';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const { email, password, fname, lname } = body;
    const user = await User.findOne({email});
    if (user) return NextResponse.json({ error: "User is regitered already, please login" }, { status: 400 });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      password: hashedPassword,
      email,
      fname, lname
    });
    return NextResponse.json({ message: "User created successfully", user: newUser, success: true }, { status: 200 });
  } catch (error: unknown) {
    console.log("[ERROR] ", error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}