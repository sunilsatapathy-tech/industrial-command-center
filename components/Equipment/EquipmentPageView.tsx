import SectionCard from '@/components/UI/SectionCard';
import StatusBadge from '@/components/UI/StatusBadge';
import type { Alarm, Equipment, MaintenanceRecord } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function EquipmentPageView({
  equipment,
  alarms,
  maintenance,
}: {
  equipment: Equipment[];
  alarms: Alarm[];
  maintenance: MaintenanceRecord[];
}) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Asset registry"
        description="Access connected asset details, live telemetry, and operational readiness in one view."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {equipment.map((item) => (
            <div key={item.id} className="rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-[var(--text)]">{item.name}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{item.location}</p>
                </div>
                <StatusBadge value={item.status} />
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Temperature</p>
                  <p className="mt-1 text-lg font-semibold text-[var(--text)]">{item.temperature} F</p>
                </div>
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Speed</p>
                  <p className="mt-1 text-lg font-semibold text-[var(--text)]">{item.speed} rpm</p>
                </div>
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Utilization</p>
                  <p className="mt-1 text-lg font-semibold text-[var(--text)]">{item.utilization}%</p>
                </div>
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Energy</p>
                  <p className="mt-1 text-lg font-semibold text-[var(--text)]">{item.energy_consumption} kWh</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm text-[var(--muted)]">
                <span>OEE {item.oee}%</span>
                <span>Uptime {item.uptime_percentage}%</span>
                <span>Next PM {formatDate(item.next_maintenance)}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Active equipment alarms" description="See current alarms by asset so response teams can act quickly.">
          <div className="space-y-3">
            {alarms.map((alarm) => (
              <div key={alarm.id} className="rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[var(--text)]">{alarm.equipment_name}</p>
                  <StatusBadge value={alarm.severity} />
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{alarm.message}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Maintenance schedule" description="Review upcoming, completed, and overdue maintenance work activity.">
          <div className="space-y-3">
            {maintenance.map((record) => (
              <div key={record.id} className="rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[var(--text)]">{record.title}</p>
                  <StatusBadge value={record.status} />
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{record.equipment_name}</p>
                <p className="mt-3 text-sm text-[var(--muted)]">{record.description}</p>
                <p className="font-ui mt-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  {formatDate(record.scheduled_for)} · {record.technician_name}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
