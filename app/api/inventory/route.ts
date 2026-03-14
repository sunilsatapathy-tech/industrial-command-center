import { NextResponse } from 'next/server';
import { getInventoryItems } from '@/lib/data';

export async function GET() {
  const data = await getInventoryItems();
  return NextResponse.json({ data, source: 'inventory' });
}

export async function PATCH(request: Request) {
  const payload = await request.json();

  return NextResponse.json({
    message: 'Inventory adjustment endpoint ready for Supabase update integration.',
    data: payload,
  });
}
