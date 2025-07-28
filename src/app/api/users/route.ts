// app/api/users/route.ts
import { IUser } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  
}

export async function POST(request: NextRequest) {
}

export async function PUT(request: NextRequest) {
  
}

export async function DELETE(request: NextRequest) {
  // const body = await request.json();
  // const { id } = body;
  // const idx = users.findIndex((u) => u.id === id);

  // if (idx === -1) {
  //   return NextResponse.json({ message: 'User not found' }, { status: 404 });
  // }

  // const [deleted] = users.splice(idx, 1);
  // return NextResponse.json(deleted);
}
