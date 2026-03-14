import AlarmManagement from '@/components/Alarms/AlarmManagement';
import AppShell from '@/components/Layout/AppShell';
import { getAlarms, getDashboardSnapshot } from '@/lib/data';

export default async function AlarmsPage() {
  const [alarms, snapshot] = await Promise.all([getAlarms(), getDashboardSnapshot()]);

  return (
    <AppShell
      title="Alarm and Event Management"
      description="Respond to critical events faster with clear alarm visibility, response status, and resolution tracking."
      notifications={snapshot.notifications}
    >
      <AlarmManagement alarms={alarms} />
    </AppShell>
  );
}
