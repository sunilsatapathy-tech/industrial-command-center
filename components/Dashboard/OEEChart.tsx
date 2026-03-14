'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import SectionCard from '@/components/UI/SectionCard';
import type { Equipment } from '@/lib/types';

export default function OEEChart({ equipment }: { equipment: Equipment[] }) {
  const data = equipment.map((item) => ({
    name: item.name,
    oee: item.oee,
  }));

  return (
    <SectionCard title="OEE metrics" description="Compare equipment effectiveness across assets to identify performance opportunities.">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.15)" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                background: '#0f172a',
                border: '1px solid rgba(148,163,184,0.2)',
                borderRadius: 16,
              }}
            />
            <Bar dataKey="oee" fill="#f59e0b" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
