'use client';

import { useEffect, useState } from 'react';
import SectionCard from '@/components/UI/SectionCard';
import StatusBadge from '@/components/UI/StatusBadge';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type { Alarm } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function AlarmPanel({ alarms }: { alarms: Alarm[] }) {
  const [items, setItems] = useState(alarms);

  useEffect(() => {
    setItems(alarms);
  }, [alarms]);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    const channel = supabase
      .channel('alarm-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'alarms' }, (payload) => {
        const updated = payload.new as Alarm;
        setItems((current) => {
          const rest = current.filter((item) => item.id !== updated.id);
          return [updated, ...rest].sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
        });
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  return (
    <SectionCard title="Alarm alerts" description="Review prioritized alarms with current acknowledgement and resolution status.">
      <div className="space-y-3">
        {items.slice(0, 5).map((alarm) => (
          <div
            key={alarm.id}
            className="rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-[var(--text)]">{alarm.equipment_name}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{alarm.message}</p>
              </div>
              <div className="flex gap-2">
                <StatusBadge value={alarm.severity} />
                <StatusBadge value={alarm.status} />
              </div>
            </div>
            <div className="font-ui mt-3 flex flex-wrap justify-between gap-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              <span>{alarm.line_name}</span>
              <span>{alarm.code}</span>
              <span>{formatDate(alarm.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
