import { buildDemoSnapshot, buildNotifications, buildSummary } from '@/lib/demo-data';
import { createSupabaseServerClient, isSupabaseServerConfigured } from '@/lib/supabase/server';
import type {
  Alarm,
  DashboardSnapshot,
  Equipment,
  InventoryItem,
  MaintenanceRecord,
  ProductionLine,
  ProductionOrder,
  QualityRecord,
  ReportItem,
  Shift,
  TimeSeriesPoint,
} from '@/lib/types';

const demoSnapshot = buildDemoSnapshot();

async function readTable<T>(table: string, orderBy?: string): Promise<T[] | null> {
  if (!isSupabaseServerConfigured) {
    return null;
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  try {
    let query = supabase.from(table).select('*');

    if (orderBy) {
      query = query.order(orderBy, { ascending: false });
    }

    const { data, error } = await query;

    if (error || !data) {
      return null;
    }

    return data as T[];
  } catch {
    return null;
  }
}

export async function getEquipment() {
  return (await readTable<Equipment>('equipment', 'last_updated')) ?? demoSnapshot.equipment;
}

export async function getAlarms() {
  return (await readTable<Alarm>('alarms', 'timestamp')) ?? demoSnapshot.alarms;
}

export async function getProductionLines() {
  return (await readTable<ProductionLine>('production_lines')) ?? demoSnapshot.production_lines;
}

export async function getProductionOrders() {
  return (await readTable<ProductionOrder>('production_orders', 'start_time')) ?? demoSnapshot.production_orders;
}

export async function getMaintenanceRecords() {
  return (await readTable<MaintenanceRecord>('maintenance_records', 'scheduled_for')) ?? demoSnapshot.maintenance_records;
}

export async function getTimeSeriesData() {
  return (await readTable<TimeSeriesPoint>('time_series_data', 'timestamp')) ?? demoSnapshot.time_series_data;
}

export async function getInventoryItems() {
  return (await readTable<InventoryItem>('inventory_items')) ?? demoSnapshot.inventory_items;
}

export async function getReports() {
  return (await readTable<ReportItem>('reports', 'created_at')) ?? demoSnapshot.reports;
}

export async function getQualityRecords() {
  return (await readTable<QualityRecord>('quality_records', 'checked_at')) ?? demoSnapshot.quality_records;
}

export async function getShifts() {
  return (await readTable<Shift>('shifts')) ?? demoSnapshot.shifts;
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const [
    equipment,
    alarms,
    production_lines,
    production_orders,
    maintenance_records,
    time_series_data,
    inventory_items,
    reports,
    quality_records,
    shifts,
  ] = await Promise.all([
    getEquipment(),
    getAlarms(),
    getProductionLines(),
    getProductionOrders(),
    getMaintenanceRecords(),
    getTimeSeriesData(),
    getInventoryItems(),
    getReports(),
    getQualityRecords(),
    getShifts(),
  ]);

  return {
    summary: buildSummary(equipment, alarms, maintenance_records, inventory_items),
    equipment,
    alarms,
    production_lines,
    production_orders,
    maintenance_records,
    time_series_data,
    inventory_items,
    reports,
    quality_records,
    shifts,
    notifications: buildNotifications(),
  };
}
