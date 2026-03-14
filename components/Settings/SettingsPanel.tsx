import SectionCard from '@/components/UI/SectionCard';
import { isSupabaseServerConfigured } from '@/lib/supabase/server';

export default function SettingsPanel() {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Platform settings"
        description="Review environment readiness, deployment status, and role-governance settings for the platform."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-5">
            <p className="text-sm font-semibold text-[var(--text)]">Supabase connection</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {isSupabaseServerConfigured
                ? 'Environment variables detected. Server data routes can connect to Supabase.'
                : 'Environment variables missing. The app is running with bundled demo data.'}
            </p>
          </div>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-5">
            <p className="text-sm font-semibold text-[var(--text)]">Deployment target</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Optimized for Vercel with environment-managed Supabase keys and App Router API endpoints.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Role matrix" description="Reference recommended access levels for each operational role.">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              <tr>
                <th className="pb-3 pr-4">Module</th>
                <th className="pb-3 pr-4">Admin</th>
                <th className="pb-3 pr-4">Manager</th>
                <th className="pb-3">Operator</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Dashboard', 'Full', 'Full', 'Full'],
                ['Equipment', 'Full', 'Full', 'View'],
                ['Production', 'Full', 'Full', 'Update'],
                ['Alarms', 'Full', 'Full', 'Acknowledge'],
                ['Reports', 'Full', 'View', 'Restricted'],
                ['Inventory', 'Full', 'Full', 'View'],
                ['Settings', 'Full', 'Restricted', 'Restricted'],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-[var(--border)]">
                  {row.map((cell) => (
                    <td key={cell} className="py-4 pr-4 text-[var(--muted)]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
