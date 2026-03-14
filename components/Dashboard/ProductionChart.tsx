'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import SectionCard from '@/components/UI/SectionCard';
import type { TimeSeriesPoint } from '@/lib/types';

export default function ProductionChart({ data }: { data: TimeSeriesPoint[] }) {
  const throughput = data.filter((item) => item.metric === 'throughput');

  return (
    <SectionCard title="Production throughput" description="Follow current throughput trends to understand output performance over time.">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={throughput}>
            <defs>
              <linearGradient id="throughputFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.15)" strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                background: '#0f172a',
                border: '1px solid rgba(148,163,184,0.2)',
                borderRadius: 16,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2dd4bf"
              strokeWidth={3}
              fill="url(#throughputFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
