import { NextResponse } from 'next/server';
import { getProductionLines, getProductionOrders, getQualityRecords, getShifts } from '@/lib/data';

export async function GET() {
  const [orders, lines, quality_records, shifts] = await Promise.all([
    getProductionOrders(),
    getProductionLines(),
    getQualityRecords(),
    getShifts(),
  ]);

  return NextResponse.json({
    data: { orders, lines, quality_records, shifts },
    source: 'production',
  });
}

export async function POST(request: Request) {
  const payload = await request.json();

  return NextResponse.json(
    {
      message: 'Production order endpoint ready for Supabase insert integration.',
      data: payload,
    },
    { status: 201 }
  );
}
