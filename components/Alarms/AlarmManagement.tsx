import SectionCard from '@/components/UI/SectionCard';
import StatusBadge from '@/components/UI/StatusBadge';
import type { Alarm } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function AlarmManagement({ alarms }: { alarms: Alarm[] }) {
  return (
    <SectionCard
      title="Alarm management"
      description="Manage alarm priority, acknowledgement, and resolution across connected operations."
    >
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            <tr>
              <th className="pb-3 pr-4">Equipment</th>
              <th className="pb-3 pr-4">Alarm</th>
              <th className="pb-3 pr-4">Severity</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3 pr-4">Time</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {alarms.map((alarm) => (
              <tr key={alarm.id} className="border-t border-[var(--border)]">
                <td className="py-4 pr-4">
                  <p className="font-semibold text-[var(--text)]">{alarm.equipment_name}</p>
                  <p className="text-xs text-[var(--muted)]">{alarm.code}</p>
                </td>
                <td className="py-4 pr-4 text-[var(--muted)]">{alarm.message}</td>
                <td className="py-4 pr-4">
                  <StatusBadge value={alarm.severity} />
                </td>
                <td className="py-4 pr-4">
                  <StatusBadge value={alarm.status} />
                </td>
                <td className="py-4 pr-4 text-[var(--muted)]">{formatDate(alarm.timestamp)}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button className="rounded-full border border-[var(--border)] px-3 py-2 text-xs text-[var(--text)]">
                      Acknowledge
                    </button>
                    <button className="rounded-full border border-[var(--border)] px-3 py-2 text-xs text-[var(--text)]">
                      Resolve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
