import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Fetch user enrollments using Supabase client

  return NextResponse.json({ enrollments: [] }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const _body = await request.json();

    // TODO: Create a new enrollment (after payment is processed)

    return NextResponse.json({ message: 'Enrollment creation scaffold ready' }, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to process enrollment' }, { status: 500 });
  }
}
