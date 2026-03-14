import { NextResponse } from 'next/server';
import { getAlarms } from '@/lib/data';

export async function GET() {
  const data = await getAlarms();
  return NextResponse.json({ data, source: 'alarms' });
}

export async function POST(request: Request) {
  const payload = await request.json();

  return NextResponse.json(
    {
      message: 'Alarm create endpoint ready for Supabase insert integration.',
      data: {
        ...payload,
        status: 'open',
      },
    },
    { status: 201 }
  );
}

export async function PATCH(request: Request) {
  const payload = await request.json();

  return NextResponse.json({
    message: 'Alarm update endpoint ready for acknowledge or resolve actions.',
    data: payload,
  });
}
