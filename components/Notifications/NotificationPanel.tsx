import SectionCard from '@/components/UI/SectionCard';
import type { NotificationItem } from '@/lib/types';
import { formatDate } from '@/lib/utils';

const tone = {
  critical: {
    card: 'border-rose-300 bg-rose-50',
    label: 'text-rose-700',
    meta: 'text-rose-600',
    message: 'text-rose-950',
  },
  warning: {
    card: 'border-amber-300 bg-amber-50',
    label: 'text-amber-700',
    meta: 'text-amber-600',
    message: 'text-amber-950',
  },
  info: {
    card: 'border-sky-300 bg-sky-50',
    label: 'text-sky-700',
    meta: 'text-sky-600',
    message: 'text-sky-950',
  },
};

export default function NotificationPanel({ notifications }: { notifications: NotificationItem[] }) {
  return (
    <SectionCard
      title="Notifications"
      description="Stay informed with operational alerts, maintenance updates, and system-generated insights."
      action={
        <span className="font-ui rounded-full border border-[var(--border)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          Live feed
        </span>
      }
    >
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-3xl border p-4 shadow-sm ${tone[notification.severity].card}`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className={`font-ui text-sm font-semibold uppercase tracking-[0.2em] ${tone[notification.severity].label}`}>
                {notification.kind}
              </p>
              <span className={`text-xs font-medium ${tone[notification.severity].meta}`}>
                {formatDate(notification.created_at)}
              </span>
            </div>
            <p className={`mt-3 text-sm leading-6 ${tone[notification.severity].message}`}>
              {notification.message}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
