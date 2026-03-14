import SectionCard from '@/components/UI/SectionCard';
import StatusBadge from '@/components/UI/StatusBadge';
import type { ReportItem } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function ReportsCenter({ reports }: { reports: ReportItem[] }) {
  return (
    <SectionCard
      title="Operational reports"
      description="Access production, quality, and performance reports prepared for plant review and leadership alignment."
    >
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-[var(--text)]">{report.title}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{report.type} report</p>
              </div>
              <StatusBadge value={report.status} />
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{report.data.summary}</p>
            <div className="mt-4 flex flex-wrap justify-between gap-3 text-sm text-[var(--muted)]">
              <span>
                Window: {formatDate(report.period_start)} to {formatDate(report.period_end)}
              </span>
              <span>KPI: {report.data.kpi}</span>
              <span>Generated: {formatDate(report.created_at)}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
