import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Fetch courses using Supabase client

  return NextResponse.json({ courses: [] }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const _body = await request.json();

    // TODO: Create a new course using Supabase client (check instructor role)

    return NextResponse.json({ message: 'Course creation scaffold ready' }, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
