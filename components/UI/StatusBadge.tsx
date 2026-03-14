import { cn, titleCase } from '@/lib/utils';

const palette: Record<string, string> = {
  Running: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Idle: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Fault: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  Maintenance: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  critical: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  high: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  low: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  open: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  acknowledged: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  resolved: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Healthy: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Low: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Critical: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  Ready: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Draft: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  Completed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Scheduled: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  Delayed: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  'In Progress': 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  Pass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Review: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Fail: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  Overdue: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
};

export default function StatusBadge({ value }: { value: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide',
        palette[value] || 'border-[var(--border)] bg-[var(--panel-strong)] text-[var(--text)]'
      )}
    >
      {titleCase(value)}
    </span>
  );
}
