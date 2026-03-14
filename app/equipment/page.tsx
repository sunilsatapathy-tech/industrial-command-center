import AppShell from '@/components/Layout/AppShell';
import EquipmentPageView from '@/components/Equipment/EquipmentPageView';
import { getAlarms, getDashboardSnapshot, getEquipment, getMaintenanceRecords } from '@/lib/data';

export default async function EquipmentPage() {
  const [equipment, alarms, maintenance, snapshot] = await Promise.all([
    getEquipment(),
    getAlarms(),
    getMaintenanceRecords(),
    getDashboardSnapshot(),
  ]);

  return (
    <AppShell
      title="Equipment Operations"
      description="Monitor asset condition, operating status, and maintenance readiness with the context needed to keep production moving."
      notifications={snapshot.notifications}
    >
      <EquipmentPageView equipment={equipment} alarms={alarms} maintenance={maintenance} />
    </AppShell>
  );
}
