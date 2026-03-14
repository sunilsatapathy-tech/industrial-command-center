import SectionCard from '@/components/UI/SectionCard';
import StatusBadge from '@/components/UI/StatusBadge';
import type { InventoryItem } from '@/lib/types';

export default function InventoryOverview({ items }: { items: InventoryItem[] }) {
  return (
    <SectionCard
      title="Inventory tracking"
      description="Monitor raw materials, work-in-progress, finished goods, and MRO inventory with reorder context."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-[var(--text)]">{item.name}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.type}</p>
              </div>
              <StatusBadge value={item.status} />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Quantity</p>
                <p className="mt-1 font-semibold text-[var(--text)]">
                  {item.quantity} {item.unit}
                </p>
              </div>
              <div>
                <p className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Reorder</p>
                <p className="mt-1 font-semibold text-[var(--text)]">{item.reorder_level}</p>
              </div>
              <div>
                <p className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Location</p>
                <p className="mt-1 font-semibold text-[var(--text)]">{item.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
