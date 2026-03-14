create extension if not exists pgcrypto;

create table if not exists roles (
  name text primary key
);

insert into roles (name)
values ('admin'), ('manager'), ('operator')
on conflict (name) do nothing;

create table if not exists users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  full_name text not null,
  role text not null references roles (name),
  plant text not null default 'Plant North',
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, role, plant)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'Factory User'),
    coalesce(new.raw_user_meta_data ->> 'role', 'operator'),
    coalesce(new.raw_user_meta_data ->> 'plant', 'Plant North')
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        role = excluded.role,
        plant = excluded.plant;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists production_lines (
  id bigserial primary key,
  name text not null,
  description text not null,
  target_output integer not null default 0,
  current_output integer not null default 0,
  supervisor text not null,
  created_at timestamptz not null default now()
);

create table if not exists equipment (
  id bigserial primary key,
  name text not null,
  status text not null check (status in ('Running', 'Idle', 'Fault', 'Maintenance')),
  location text not null,
  production_line_id bigint references production_lines (id) on delete set null,
  temperature numeric(6,2) not null default 0,
  speed numeric(8,2) not null default 0,
  utilization numeric(5,2) not null default 0,
  oee numeric(5,2) not null default 0,
  uptime_percentage numeric(5,2) not null default 0,
  energy_consumption numeric(10,2) not null default 0,
  health_score numeric(5,2) not null default 0,
  last_updated timestamptz not null default now(),
  next_maintenance timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists alarms (
  id bigserial primary key,
  equipment_id bigint not null references equipment (id) on delete cascade,
  equipment_name text not null,
  severity text not null check (severity in ('critical', 'high', 'medium', 'low')),
  message text not null,
  status text not null check (status in ('open', 'acknowledged', 'resolved')),
  timestamp timestamptz not null default now(),
  line_name text not null,
  code text not null,
  acknowledged_by text,
  resolved_at timestamptz
);

create table if not exists production_orders (
  id bigserial primary key,
  product_name text not null,
  quantity integer not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  production_line_id bigint not null references production_lines (id) on delete cascade,
  line_name text not null,
  status text not null check (status in ('Scheduled', 'In Progress', 'Completed', 'Delayed')),
  batch_number text not null unique,
  completion_percentage numeric(5,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists maintenance_records (
  id bigserial primary key,
  equipment_id bigint not null references equipment (id) on delete cascade,
  equipment_name text not null,
  title text not null,
  description text not null,
  status text not null check (status in ('Scheduled', 'Completed', 'Overdue')),
  scheduled_for timestamptz not null,
  completed_at timestamptz,
  technician_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists time_series_data (
  id bigserial primary key,
  equipment_id bigint references equipment (id) on delete cascade,
  metric text not null check (metric in ('throughput', 'downtime', 'energy')),
  value numeric(10,2) not null,
  timestamp timestamptz not null default now(),
  label text not null
);

create table if not exists inventory_items (
  id bigserial primary key,
  name text not null,
  type text not null check (type in ('Raw Material', 'WIP', 'Finished Goods', 'MRO')),
  quantity integer not null default 0,
  unit text not null default 'pcs',
  reorder_level integer not null default 0,
  location text not null,
  status text not null check (status in ('Healthy', 'Low', 'Critical')),
  created_at timestamptz not null default now()
);

create table if not exists reports (
  id bigserial primary key,
  type text not null check (type in ('Production', 'Quality', 'Performance')),
  title text not null,
  status text not null check (status in ('Ready', 'Draft')),
  period_start timestamptz not null,
  period_end timestamptz not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists shifts (
  id bigserial primary key,
  name text not null,
  start_time time not null,
  end_time time not null,
  supervisor text not null
);

create table if not exists quality_records (
  id bigserial primary key,
  production_order_id bigint not null references production_orders (id) on delete cascade,
  result text not null check (result in ('Pass', 'Review', 'Fail')),
  checked_at timestamptz not null,
  defect_rate numeric(5,2) not null default 0,
  notes text not null default ''
);

alter table users enable row level security;
alter table equipment enable row level security;
alter table alarms enable row level security;
alter table production_lines enable row level security;
alter table production_orders enable row level security;
alter table maintenance_records enable row level security;
alter table time_series_data enable row level security;
alter table inventory_items enable row level security;
alter table reports enable row level security;
alter table shifts enable row level security;
alter table quality_records enable row level security;

create policy "authenticated users can read users"
on users for select to authenticated using (true);

create policy "authenticated users can read equipment"
on equipment for select to authenticated using (true);

create policy "authenticated users can read alarms"
on alarms for select to authenticated using (true);

create policy "authenticated users can read production lines"
on production_lines for select to authenticated using (true);

create policy "authenticated users can read production orders"
on production_orders for select to authenticated using (true);

create policy "authenticated users can read maintenance records"
on maintenance_records for select to authenticated using (true);

create policy "authenticated users can read time series data"
on time_series_data for select to authenticated using (true);

create policy "authenticated users can read inventory items"
on inventory_items for select to authenticated using (true);

create policy "authenticated users can read reports"
on reports for select to authenticated using (true);

create policy "authenticated users can read shifts"
on shifts for select to authenticated using (true);

create policy "authenticated users can read quality records"
on quality_records for select to authenticated using (true);
