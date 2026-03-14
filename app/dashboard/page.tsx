import Overview from '@/components/Dashboard/Overview';
import AppShell from '@/components/Layout/AppShell';
import { getDashboardSnapshot } from '@/lib/data';

export default async function DashboardPage() {
  const snapshot = await getDashboardSnapshot();

  return (
    <AppShell
      title="Operational Overview"
      description="See plant performance, equipment health, and maintenance priorities in one operational overview built for faster decisions."
      notifications={snapshot.notifications}
    >
      <Overview snapshot={snapshot} />
    </AppShell>
  );
}
