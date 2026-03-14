import { ReactNode } from 'react';

export default function MetricCard({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: string;
  detail: string;
  accent: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-[0_24px_80px_rgba(4,15,24,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-ui text-sm uppercase tracking-[0.24em] text-[var(--muted)]">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-[var(--text)]">{value}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{detail}</p>
        </div>
        <div className="rounded-2xl bg-[var(--panel-strong)] p-3 text-[var(--accent)]">{accent}</div>
      </div>
    </div>
  );
}
