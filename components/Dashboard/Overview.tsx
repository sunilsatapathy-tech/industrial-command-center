import AlarmPanel from '@/components/Dashboard/AlarmPanel';
import EquipmentStatusCard from '@/components/Dashboard/EquipmentStatusCard';
import OEEChart from '@/components/Dashboard/OEEChart';
import ProductionChart from '@/components/Dashboard/ProductionChart';
import MetricCard from '@/components/UI/MetricCard';
import SectionCard from '@/components/UI/SectionCard';
import StatusBadge from '@/components/UI/StatusBadge';
import type { DashboardSnapshot } from '@/lib/types';
import { formatDate, formatNumber, formatPercent } from '@/lib/utils';

export default function Overview({ snapshot }: { snapshot: DashboardSnapshot }) {
  const downtime = snapshot.time_series_data.filter((item) => item.metric === 'downtime');
  const energy = snapshot.time_series_data.filter((item) => item.metric === 'energy');

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        <MetricCard
          label="Running assets"
          value={`${snapshot.summary.running_equipment}/${snapshot.summary.total_equipment}`}
          detail="Track current asset availability across the production environment."
          accent={<span className="text-lg font-semibold">RUN</span>}
        />
        <MetricCard
          label="Active alarms"
          value={String(snapshot.summary.active_alarms)}
          detail="Keep attention on open and acknowledged events requiring response."
          accent={<span className="text-lg font-semibold">ALM</span>}
        />
        <MetricCard
          label="Average OEE"
          value={formatPercent(snapshot.summary.average_oee)}
          detail="Measure overall equipment effectiveness across connected assets."
          accent={<span className="text-lg font-semibold">OEE</span>}
        />
        <MetricCard
          label="Inventory units"
          value={formatNumber(snapshot.summary.total_inventory_units)}
          detail="View combined material, WIP, finished goods, and maintenance stock."
          accent={<span className="text-lg font-semibold">INV</span>}
        />
      </div>

      <div className="grid gap-6 2xl:grid-cols-[1.15fr_0.85fr]">
        <ProductionChart data={snapshot.time_series_data} />
        <OEEChart equipment={snapshot.equipment} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <EquipmentStatusCard equipment={snapshot.equipment} />
        <AlarmPanel alarms={snapshot.alarms} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          title="Downtime watch"
          description="Review recent downtime activity across the current operating window."
        >
          <div className="space-y-3">
            {downtime.map((point) => (
              <div
                key={point.id}
                className="flex items-center justify-between rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] px-4 py-3"
              >
                <span className="text-sm text-[var(--muted)]">{point.label}</span>
                <span className="text-sm font-semibold text-[var(--text)]">{point.value} min</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Energy consumption"
          description="Track hourly energy usage to support performance and efficiency reviews."
        >
          <div className="space-y-3">
            {energy.map((point) => (
              <div
                key={point.id}
                className="flex items-center justify-between rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] px-4 py-3"
              >
                <span className="text-sm text-[var(--muted)]">{point.label}</span>
                <span className="text-sm font-semibold text-[var(--text)]">{point.value} kWh</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Predictive maintenance insights"
        description="A future-ready space for anomaly detection, maintenance recommendations, and asset risk signals."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {snapshot.equipment.slice(0, 3).map((item) => (
            <div key={item.id} className="rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-base font-semibold text-[var(--text)]">{item.name}</p>
                <StatusBadge value={item.status} />
              </div>
              <p className="mt-4 text-sm text-[var(--muted)]">
                Health score {item.health_score}. Recommended maintenance window {formatDate(item.next_maintenance)}.
              </p>
              <p className="mt-3 text-sm font-medium text-[var(--accent)]">
                Emerging trend detected: review temperature behavior within the next 48 hours.
              </p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
