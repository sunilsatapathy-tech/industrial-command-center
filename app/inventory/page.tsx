import InventoryOverview from '@/components/Inventory/InventoryOverview';
import AppShell from '@/components/Layout/AppShell';
import { getDashboardSnapshot, getInventoryItems } from '@/lib/data';

export default async function InventoryPage() {
  const [items, snapshot] = await Promise.all([getInventoryItems(), getDashboardSnapshot()]);

  return (
    <AppShell
      title="Inventory Control"
      description="Follow material availability, work-in-progress, and finished goods inventory with better replenishment visibility."
      notifications={snapshot.notifications}
    >
      <InventoryOverview items={items} />
    </AppShell>
  );
}
