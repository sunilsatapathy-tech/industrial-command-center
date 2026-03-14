import AppShell from '@/components/Layout/AppShell';
import ReportsCenter from '@/components/Reports/ReportsCenter';
import { getDashboardSnapshot, getReports } from '@/lib/data';

export default async function ReportsPage() {
  const [reports, snapshot] = await Promise.all([getReports(), getDashboardSnapshot()]);

  return (
    <AppShell
      title="Reporting and Analytics"
      description="Turn production, quality, and performance data into reporting that supports plant review and continuous improvement."
      notifications={snapshot.notifications}
      requiredRoles={['admin', 'manager']}
    >
      <ReportsCenter reports={reports} />
    </AppShell>
  );
}
