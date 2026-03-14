import { NextResponse } from 'next/server';
import { getReports } from '@/lib/data';

export async function GET() {
  const data = await getReports();
  return NextResponse.json({ data, source: 'reports' });
}
