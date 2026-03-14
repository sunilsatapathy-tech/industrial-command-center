# Industrial Automation Command Center

Industrial Automation Command Center is a full-stack manufacturing operations starter built with Next.js App Router, TypeScript, TailwindCSS, Recharts, and Supabase. It includes role-aware authentication, realtime-ready equipment monitoring, alarm workflows, production tracking, maintenance visibility, historical metrics, reporting, and inventory views.

## Stack

- Next.js 14 with App Router and TypeScript
- TailwindCSS for styling
- Supabase for PostgreSQL, Auth, Storage-ready setup, and Realtime
- Recharts for dashboard visualizations
- Vercel-ready deployment structure

## Modules Included

- Authentication with login/register and role metadata (`admin`, `manager`, `operator`)
- Dashboard with OEE, throughput, downtime, alarm, and energy visibility
- Equipment monitoring with live-status-ready cards
- Alarm management with acknowledgement and resolve workflow placeholders
- Production management with lines, orders, batches, shifts, and quality checkpoints
- Inventory tracking for raw material, WIP, finished goods, and MRO stock
- Reports center for production, quality, and performance reports
- Settings page for role governance and environment readiness
- Predictive maintenance placeholder and notification feed

## Project Structure

```text
app/
  api/
    alarms/
    dashboard/
    equipment/
    inventory/
    production/
    reports/
  alarms/
  dashboard/
  equipment/
  inventory/
  login/
  production/
  reports/
  settings/
components/
  Alarms/
  Auth/
  Dashboard/
  Equipment/
  Inventory/
  Layout/
  Notifications/
  Production/
  Reports/
  Settings/
  UI/
lib/
  data.ts
  demo-data.ts
  supabase/
    client.ts
    server.ts
  types.ts
  utils.ts
styles/
  globals.css
supabase_schema.sql
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase values:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

If the variables are missing, the UI still runs in demo mode with bundled sample data so the project can be previewed immediately.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

4. In Supabase SQL Editor, run `supabase_schema.sql` after enabling email/password authentication.

## Supabase Setup

1. Create a new Supabase project.
2. Enable Email authentication in Supabase Auth.
3. Run the SQL schema from `supabase_schema.sql`.
4. Add the environment variables to `.env.local`.
5. Optionally create Storage buckets for report exports or equipment attachments.
6. Enable Realtime on `equipment` and `alarms` tables if you want browser subscriptions to receive live updates.

## API Endpoints

- `GET /api/dashboard`
- `GET, POST /api/equipment`
- `GET, POST, PATCH /api/alarms`
- `GET, POST /api/production`
- `GET /api/reports`
- `GET, PATCH /api/inventory`

These endpoints currently return Supabase-backed data when configured, or demo data otherwise. The POST/PATCH handlers are scaffolded for direct Supabase inserts and updates.

## Deployment on Vercel

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` in the Vercel project settings.
4. Redeploy the application.
5. In Supabase, add the Vercel production URL to the Auth redirect and allowed origins settings.

## Notes

- Role-based access is driven from Supabase `user_metadata.role`.
- The `users` table mirrors authenticated users through a trigger on `auth.users`.
- For production hardening, add write policies, server-side auth checks, audit logging, and direct mutation logic in the API routes.
