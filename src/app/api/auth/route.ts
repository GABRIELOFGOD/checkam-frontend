import { User } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from '@/config/database';

// POST /api/auth/register
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const { email, password } = body;
    const user = await User.findOne({email});
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const token = jwt.sign({ email }, process.env.JWT_SECRET!);
    return NextResponse.json({ message: 'Login successful', token });
  } catch (error) {
    console.log("[ERROR] ", error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

// GET /api/auth/me
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Authorization token missing or invalid' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    const user = await User.findOne({ email: decoded.email }).select('-password');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (err: unknown) {
    return NextResponse.json({ error: 'Invalid or expired token', err }, { status: 401 });
  }
}