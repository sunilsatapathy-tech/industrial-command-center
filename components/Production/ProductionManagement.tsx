import SectionCard from '@/components/UI/SectionCard';
import StatusBadge from '@/components/UI/StatusBadge';
import type { ProductionLine, ProductionOrder, QualityRecord, Shift } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function ProductionManagement({
  lines,
  orders,
  qualityRecords,
  shifts,
}: {
  lines: ProductionLine[];
  orders: ProductionOrder[];
  qualityRecords: QualityRecord[];
  shifts: Shift[];
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Production lines" description="Review line performance against target output and operating ownership.">
          <div className="space-y-3">
            {lines.map((line) => (
              <div key={line.id} className="rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[var(--text)]">{line.name}</p>
                    <p className="text-sm text-[var(--muted)]">{line.description}</p>
                  </div>
                  <p className="text-sm font-semibold text-[var(--accent)]">
                    {line.current_output}/{line.target_output}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Shifts" description="Keep current shift coverage, timing, and supervision clearly visible.">
          <div className="space-y-3">
            {shifts.map((shift) => (
              <div key={shift.id} className="rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-4">
                <p className="font-semibold text-[var(--text)]">{shift.name}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {shift.start_time} to {shift.end_time} · {shift.supervisor}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Production orders" description="Track order progress, batch execution, and schedule alignment in real time.">
        <div className="grid gap-4 lg:grid-cols-2">
          {orders.map((order) => (
            <div key={order.id} className="rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-[var(--text)]">{order.product_name}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{order.batch_number}</p>
                </div>
                <StatusBadge value={order.status} />
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Line</p>
                  <p className="mt-1 font-semibold text-[var(--text)]">{order.line_name}</p>
                </div>
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Quantity</p>
                  <p className="mt-1 font-semibold text-[var(--text)]">{order.quantity}</p>
                </div>
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Start</p>
                  <p className="mt-1 font-semibold text-[var(--text)]">{formatDate(order.start_time)}</p>
                </div>
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Finish</p>
                  <p className="mt-1 font-semibold text-[var(--text)]">{formatDate(order.end_time)}</p>
                </div>
              </div>
              <div className="mt-5">
                <div className="font-ui flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  <span>Completion</span>
                  <span>{order.completion_percentage}%</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-slate-800/60">
                  <div
                    className="h-3 rounded-full bg-[var(--accent)]"
                    style={{ width: `${order.completion_percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Quality checkpoints" description="Review inspection outcomes and first-pass quality observations across active orders.">
        <div className="space-y-3">
          {qualityRecords.map((record) => (
            <div key={record.id} className="rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-[var(--text)]">Order #{record.production_order_id}</p>
                <StatusBadge value={record.result} />
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">{record.notes}</p>
              <p className="font-ui mt-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Defect rate {record.defect_rate}% · {formatDate(record.checked_at)}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
