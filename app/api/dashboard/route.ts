import { NextResponse } from 'next/server';
import { getDashboardSnapshot } from '@/lib/data';

export async function GET() {
  const data = await getDashboardSnapshot();
  return NextResponse.json({ data, source: 'dashboard' });
}
