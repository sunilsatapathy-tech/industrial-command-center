'use client';

import { useEffect, useState } from 'react';
import SectionCard from '@/components/UI/SectionCard';
import StatusBadge from '@/components/UI/StatusBadge';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type { Equipment } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function EquipmentStatusCard({ equipment }: { equipment: Equipment[] }) {
  const [items, setItems] = useState(equipment);

  useEffect(() => {
    setItems(equipment);
  }, [equipment]);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    const channel = supabase
      .channel('equipment-live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'equipment' },
        (payload) => {
          const updated = payload.new as Equipment;
          setItems((current) => {
            const rest = current.filter((item) => item.id !== updated.id);
            return [updated, ...rest].sort((a, b) => a.id - b.id);
          });
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  return (
    <SectionCard
      title="Equipment status"
      description="Review current operating state, utilization, and maintenance readiness for critical assets."
    >
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-[var(--text)]">{item.name}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {item.location} · Line {item.production_line_id}
                </p>
              </div>
              <StatusBadge value={item.status} />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div>
                <p className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Temp</p>
                <p className="mt-1 text-lg font-semibold text-[var(--text)]">{item.temperature} F</p>
              </div>
              <div>
                <p className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Utilization</p>
                <p className="mt-1 text-lg font-semibold text-[var(--text)]">{item.utilization}%</p>
              </div>
              <div>
                <p className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Updated</p>
                <p className="mt-1 text-lg font-semibold text-[var(--text)]">{formatDate(item.last_updated)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
