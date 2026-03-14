import { NextResponse } from 'next/server';
import { getEquipment } from '@/lib/data';

export async function GET() {
  const data = await getEquipment();
  return NextResponse.json({ data, source: 'equipment' });
}

export async function POST(request: Request) {
  const payload = await request.json();

  return NextResponse.json(
    {
      message: 'Equipment create endpoint ready for Supabase insert integration.',
      data: payload,
    },
    { status: 201 }
  );
}
