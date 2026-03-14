'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import NotificationPanel from '@/components/Notifications/NotificationPanel';
import DarkModeToggle from '@/components/UI/DarkModeToggle';
import { demoUsers } from '@/lib/demo-data';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import type { NotificationItem, Role, UserProfile } from '@/lib/types';
import { cn, titleCase } from '@/lib/utils';

const navItems: Array<{
  href: string;
  label: string;
  roles: Role[];
}> = [
  { href: '/dashboard', label: 'Dashboard', roles: ['admin', 'manager', 'operator'] },
  { href: '/equipment', label: 'Equipment', roles: ['admin', 'manager', 'operator'] },
  { href: '/production', label: 'Production', roles: ['admin', 'manager', 'operator'] },
  { href: '/alarms', label: 'Alarms', roles: ['admin', 'manager', 'operator'] },
  { href: '/reports', label: 'Reports', roles: ['admin', 'manager'] },
  { href: '/inventory', label: 'Inventory', roles: ['admin', 'manager', 'operator'] },
  { href: '/settings', label: 'Settings', roles: ['admin'] },
];

function mapSessionToProfile(user: {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
}): UserProfile {
  const role = (typeof user.user_metadata?.role === 'string'
    ? user.user_metadata.role
    : 'admin') as Role;

  return {
    id: user.id,
    email: user.email || 'user@factoryops.ai',
    full_name:
      typeof user.user_metadata?.full_name === 'string'
        ? user.user_metadata.full_name
        : 'Factory User',
    role,
    plant:
      typeof user.user_metadata?.plant === 'string'
        ? user.user_metadata.plant
        : 'Plant North',
    created_at: new Date().toISOString(),
  };
}

export default function AppShell({
  children,
  title,
  description,
  notifications,
  requiredRoles = ['admin', 'manager', 'operator'],
}: {
  children: ReactNode;
  title: string;
  description: string;
  notifications: NotificationItem[];
  requiredRoles?: Role[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const supabase = getSupabaseBrowserClient();

    async function loadSession() {
      if (!isSupabaseConfigured || !supabase) {
        setProfile(demoUsers[0]);
        setLoading(false);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!active) {
        return;
      }

      if (!session?.user) {
        router.replace('/login');
        return;
      }

      setProfile(mapSessionToProfile(session.user));
      setLoading(false);
    }

    loadSession();

    const subscription = supabase?.auth.onAuthStateChange((_event, session) => {
      if (!active) {
        return;
      }

      if (!session?.user) {
        setProfile(null);
        router.replace('/login');
        return;
      }

      setProfile(mapSessionToProfile(session.user));
      setLoading(false);
    });

    return () => {
      active = false;
      subscription?.data.subscription.unsubscribe();
    };
  }, [router]);

  const visibleNav = navItems.filter((item) => item.roles.includes(profile?.role || 'admin'));
  const canAccess = profile ? requiredRoles.includes(profile.role) : false;

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient();

    if (supabase) {
      await supabase.auth.signOut();
    }

    router.push('/login');
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] px-6 py-5 text-sm text-[var(--muted)]">
          Loading command center workspace...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.18),_transparent_30%),linear-gradient(180deg,var(--bg),var(--bg-soft))]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] gap-6 px-4 py-4 lg:px-6">
        <aside className="hidden w-72 shrink-0 rounded-[32px] border border-[var(--border)] bg-[var(--panel)] p-6 lg:block">
          <div>
            <p className="font-ui text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Industrial</p>
            <h1 className="mt-3 text-2xl font-semibold text-[var(--text)]">Command Center</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              A connected industrial workspace for production visibility, equipment insight, and faster response.
            </p>
          </div>

          <nav className="mt-8 space-y-2 rounded-[28px] bg-[#008b8b] p-4">
            {visibleNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block rounded-2xl border px-4 py-3 text-sm font-medium transition',
                  pathname === item.href
                    ? 'border-[#d8fff8] bg-[#d8fff8] text-[#0d5f61] shadow-[0_12px_24px_rgba(216,255,248,0.30)]'
                    : 'border-transparent bg-white/6 text-white hover:border-[#a7f3ea] hover:bg-[#63d6cc] hover:text-[#083c3d]'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-4">
            <p className="font-ui text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Signed In</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text)]">{profile?.full_name}</p>
            <p className="text-sm text-[var(--muted)]">{profile?.plant}</p>
            <div className="font-ui mt-4 inline-flex rounded-full border border-[var(--border)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              {titleCase(profile?.role || 'admin')}
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="rounded-[32px] border border-[var(--border)] bg-[var(--panel)] p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-5">
              <div>
                <p className="font-ui text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Operations Workspace</p>
                <h2 className="mt-2 text-3xl font-semibold text-[var(--text)]">{title}</h2>
                <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">{description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <DarkModeToggle />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
                >
                  Logout
                </button>
              </div>
            </div>

            <nav className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:hidden">
              {visibleNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'whitespace-nowrap rounded-full border px-3 py-2 text-sm',
                    pathname === item.href
                      ? 'border-[var(--accent)] bg-[var(--panel-strong)] text-[var(--text)]'
                      : 'border-[var(--border)] text-[var(--muted)]'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {!canAccess ? (
              <div className="mt-8 rounded-[28px] border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-200">
                Your current role does not have permission to access this area.
              </div>
            ) : (
              <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                <div>{children}</div>
                <NotificationPanel notifications={notifications} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
