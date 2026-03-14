import AppShell from '@/components/Layout/AppShell';
import SettingsPanel from '@/components/Settings/SettingsPanel';
import { getDashboardSnapshot } from '@/lib/data';

export default async function SettingsPage() {
  const snapshot = await getDashboardSnapshot();

  return (
    <AppShell
      title="Administration and Governance"
      description="Support platform readiness, user governance, and deployment oversight with a more structured administrative view."
      notifications={snapshot.notifications}
      requiredRoles={['admin']}
    >
      <SettingsPanel />
    </AppShell>
  );
}
