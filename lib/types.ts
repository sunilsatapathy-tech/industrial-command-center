export type Role = 'admin' | 'operator' | 'manager';

export type EquipmentStatus = 'Running' | 'Idle' | 'Fault' | 'Maintenance';
export type AlarmSeverity = 'critical' | 'high' | 'medium' | 'low';
export type AlarmStatus = 'open' | 'acknowledged' | 'resolved';
export type OrderStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Delayed';
export type InventoryStatus = 'Healthy' | 'Low' | 'Critical';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  plant: string;
  created_at: string;
}

export interface Equipment {
  id: number;
  name: string;
  status: EquipmentStatus;
  location: string;
  production_line_id: number;
  temperature: number;
  speed: number;
  utilization: number;
  oee: number;
  uptime_percentage: number;
  energy_consumption: number;
  health_score: number;
  last_updated: string;
  next_maintenance: string;
}

export interface Alarm {
  id: number;
  equipment_id: number;
  equipment_name: string;
  severity: AlarmSeverity;
  message: string;
  status: AlarmStatus;
  timestamp: string;
  line_name: string;
  code: string;
  acknowledged_by?: string | null;
  resolved_at?: string | null;
}

export interface ProductionLine {
  id: number;
  name: string;
  description: string;
  target_output: number;
  current_output: number;
  supervisor: string;
}

export interface ProductionOrder {
  id: number;
  product_name: string;
  quantity: number;
  start_time: string;
  end_time: string;
  production_line_id: number;
  line_name: string;
  status: OrderStatus;
  batch_number: string;
  completion_percentage: number;
}

export interface MaintenanceRecord {
  id: number;
  equipment_id: number;
  equipment_name: string;
  title: string;
  description: string;
  status: 'Scheduled' | 'Completed' | 'Overdue';
  scheduled_for: string;
  completed_at?: string | null;
  technician_name: string;
}

export interface TimeSeriesPoint {
  id: number;
  equipment_id: number | null;
  metric: 'throughput' | 'downtime' | 'energy';
  value: number;
  timestamp: string;
  label: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  type: 'Raw Material' | 'WIP' | 'Finished Goods' | 'MRO';
  quantity: number;
  unit: string;
  reorder_level: number;
  location: string;
  status: InventoryStatus;
}

export interface ReportItem {
  id: number;
  type: 'Production' | 'Quality' | 'Performance';
  title: string;
  status: 'Ready' | 'Draft';
  period_start: string;
  period_end: string;
  created_at: string;
  data: {
    summary: string;
    kpi: number;
  };
}

export interface Shift {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
  supervisor: string;
}

export interface QualityRecord {
  id: number;
  production_order_id: number;
  result: 'Pass' | 'Review' | 'Fail';
  checked_at: string;
  defect_rate: number;
  notes: string;
}

export interface NotificationItem {
  id: string;
  kind: 'alarm' | 'maintenance' | 'insight';
  severity: 'critical' | 'warning' | 'info';
  message: string;
  created_at: string;
}

export interface DashboardSummary {
  total_equipment: number;
  running_equipment: number;
  active_alarms: number;
  open_work_orders: number;
  average_oee: number;
  total_inventory_units: number;
}

export interface DashboardSnapshot {
  summary: DashboardSummary;
  equipment: Equipment[];
  alarms: Alarm[];
  production_lines: ProductionLine[];
  production_orders: ProductionOrder[];
  maintenance_records: MaintenanceRecord[];
  time_series_data: TimeSeriesPoint[];
  inventory_items: InventoryItem[];
  reports: ReportItem[];
  quality_records: QualityRecord[];
  shifts: Shift[];
  notifications: NotificationItem[];
}
