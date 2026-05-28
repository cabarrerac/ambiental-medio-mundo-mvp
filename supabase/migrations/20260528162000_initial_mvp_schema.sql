create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'client', 'driver')),
  full_name text not null,
  company text,
  created_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  nit text,
  contact_email text,
  address text,
  created_at timestamptz not null default now()
);

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  plate text not null unique,
  driver_name text not null,
  status text not null default 'available',
  capacity_kg numeric not null default 1200
);

create table if not exists public.routes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  zone text not null,
  driver_name text not null,
  vehicle_plate text,
  status text not null default 'scheduled',
  progress integer not null default 0 check (progress between 0 and 100),
  route_date date not null default current_date
);

create table if not exists public.route_stops (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references public.routes(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  stop_order integer not null,
  name text not null,
  address text not null,
  status text not null default 'pending'
);

create table if not exists public.manifests (
  id text primary key,
  client_id uuid references public.clients(id) on delete set null,
  route_id uuid references public.routes(id) on delete set null,
  waste_type text not null,
  quantity numeric not null,
  unit text not null default 'kg',
  amount_cop integer not null default 0,
  status text not null default 'pending',
  collected_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null
);

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.vehicles enable row level security;
alter table public.routes enable row level security;
alter table public.route_stops enable row level security;
alter table public.manifests enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select to authenticated
  using (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

drop policy if exists "authenticated_read_clients" on public.clients;
create policy "authenticated_read_clients" on public.clients
  for select to authenticated
  using (true);

drop policy if exists "authenticated_read_vehicles" on public.vehicles;
create policy "authenticated_read_vehicles" on public.vehicles
  for select to authenticated
  using (true);

drop policy if exists "authenticated_read_routes" on public.routes;
create policy "authenticated_read_routes" on public.routes
  for select to authenticated
  using (true);

drop policy if exists "authenticated_read_route_stops" on public.route_stops;
create policy "authenticated_read_route_stops" on public.route_stops
  for select to authenticated
  using (true);

drop policy if exists "authenticated_read_manifests" on public.manifests;
create policy "authenticated_read_manifests" on public.manifests
  for select to authenticated
  using (true);

drop policy if exists "authenticated_insert_manifests" on public.manifests;
create policy "authenticated_insert_manifests" on public.manifests
  for insert to authenticated
  with check (created_by = auth.uid());

insert into public.clients (id, name, nit, contact_email, address) values
  ('11111111-1111-4111-8111-111111111111', 'Clínica San Juan de Dios', '900123456-1', 'operaciones@clinicasanjuan.co', 'Cra. 10 #18-75, Bogotá'),
  ('22222222-2222-4222-8222-222222222222', 'Laboratorio Norte', '901223456-2', 'logistica@labnorte.co', 'Calle 127 #19-22, Bogotá'),
  ('33333333-3333-4333-8333-333333333333', 'Hotel Capital', '902323456-3', 'ambiental@hotelcapital.co', 'Av. El Dorado #69-76, Bogotá')
on conflict (id) do update set
  name = excluded.name,
  nit = excluded.nit,
  contact_email = excluded.contact_email,
  address = excluded.address;

insert into public.vehicles (plate, driver_name, status, capacity_kg) values
  ('AMM-409', 'Laura Mendoza', 'on_route', 1400),
  ('AMM-412', 'Carlos Rojas', 'on_route', 1200),
  ('AMM-421', 'Mateo Ruiz', 'available', 1600)
on conflict (plate) do update set
  driver_name = excluded.driver_name,
  status = excluded.status,
  capacity_kg = excluded.capacity_kg;

insert into public.routes (id, code, zone, driver_name, vehicle_plate, status, progress) values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'RTA-BOG-409', 'Zona Norte - Hospitales', 'Laura Mendoza', 'AMM-409', 'in_progress', 66),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'RTA-BOG-412', 'Chapinero - Restaurantes', 'Carlos Rojas', 'AMM-412', 'in_progress', 38),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'RTA-BOG-421', 'Puente Aranda - Industrial', 'Mateo Ruiz', 'AMM-421', 'scheduled', 84)
on conflict (code) do update set
  zone = excluded.zone,
  driver_name = excluded.driver_name,
  vehicle_plate = excluded.vehicle_plate,
  status = excluded.status,
  progress = excluded.progress;

insert into public.route_stops (route_id, client_id, stop_order, name, address, status) values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '11111111-1111-4111-8111-111111111111', 1, 'Clínica San Juan de Dios', 'Cra. 10 #18-75, Bogotá', 'current'),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '22222222-2222-4222-8222-222222222222', 2, 'Laboratorio Norte', 'Calle 127 #19-22, Bogotá', 'pending'),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', null, 3, 'Centro Médico Cedritos', 'Av. 9 #146-60, Bogotá', 'pending')
on conflict do nothing;

insert into public.manifests (id, client_id, route_id, waste_type, quantity, unit, amount_cop, status) values
  ('MNF-2408', '11111111-1111-4111-8111-111111111111', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Biosanitarios', 245, 'kg', 612000, 'certified'),
  ('MNF-2407', '22222222-2222-4222-8222-222222222222', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Químicos', 82, 'L', 344000, 'in_transit'),
  ('MNF-2406', '33333333-3333-4333-8333-333333333333', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'Aprovechables', 390, 'kg', 351000, 'pending')
on conflict (id) do update set
  client_id = excluded.client_id,
  route_id = excluded.route_id,
  waste_type = excluded.waste_type,
  quantity = excluded.quantity,
  unit = excluded.unit,
  amount_cop = excluded.amount_cop,
  status = excluded.status;
