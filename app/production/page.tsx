import AppShell from '@/components/Layout/AppShell';
import ProductionManagement from '@/components/Production/ProductionManagement';
import {
  getDashboardSnapshot,
  getProductionLines,
  getProductionOrders,
  getQualityRecords,
  getShifts,
} from '@/lib/data';

export default async function ProductionPage() {
  const [lines, orders, qualityRecords, shifts, snapshot] = await Promise.all([
    getProductionLines(),
    getProductionOrders(),
    getQualityRecords(),
    getShifts(),
    getDashboardSnapshot(),
  ]);

  return (
    <AppShell
      title="Production Control"
      description="Track line performance, production orders, and batch execution with clearer visibility into throughput and quality."
      notifications={snapshot.notifications}
    >
      <ProductionManagement lines={lines} orders={orders} qualityRecords={qualityRecords} shifts={shifts} />
    </AppShell>
  );
}
