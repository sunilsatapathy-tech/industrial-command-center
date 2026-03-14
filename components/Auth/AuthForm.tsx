'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import type { Role } from '@/lib/types';

const roles: Role[] = ['admin', 'manager', 'operator'];

const showcaseSlides = [
  {
    eyebrow: 'Plant Operations',
    title: 'Operate every line from one connected workspace.',
    description:
      'Give operations teams a shared view of equipment condition, production flow, alarm response, and maintenance readiness.',
    stats: [
      ['98.4%', 'Asset readiness'],
      ['12 min', 'Average response'],
      ['1,640', 'Units this shift'],
    ],
    highlights: [
      'Track equipment, production, and alarms in one live view.',
      'Keep response teams aligned with clearer operational visibility.',
    ],
    accent: 'from-cyan-300/30 via-teal-300/10 to-transparent',
  },
  {
    eyebrow: 'Production Intelligence',
    title: 'Turn live plant data into clearer decisions.',
    description:
      'Monitor throughput, shift performance, and line readiness with a cleaner control layer built to keep output on target.',
    stats: [
      ['84.3%', 'Average OEE'],
      ['03', 'Active alarms'],
      ['07', 'Orders in progress'],
    ],
    highlights: [
      'Follow lines and active batches with more context and less noise.',
      'See where planned output is drifting before it affects the shift.',
    ],
    accent: 'from-emerald-300/30 via-teal-300/10 to-transparent',
  },
  {
    eyebrow: 'Connected Performance',
    title: 'Unify equipment, alarms, and reporting in one control layer.',
    description:
      'Create a modern operating environment that improves visibility, speeds up response, and supports better plant decisions.',
    stats: [
      ['24/7', 'Operational visibility'],
      ['99.1%', 'Line uptime'],
      ['06', 'Critical assets monitored'],
    ],
    highlights: [
      'Bring realtime operations and reporting into one coordinated workspace.',
      'Surface insights that help teams improve uptime and reduce delays.',
    ],
    accent: 'from-sky-300/30 via-cyan-300/10 to-transparent',
  },
] as const;

function ArrowButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/6 text-lg text-white transition hover:border-white/20 hover:bg-white/12"
      aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
    >
      {direction === 'left' ? '<' : '>'}
    </button>
  );
}

export default function AuthForm() {
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [form, setForm] = useState({
    full_name: '',
    plant: 'Plant North',
    role: 'operator' as Role,
    email: '',
    password: '',
  });

  const currentSlide = showcaseSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % showcaseSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  function showPreviousSlide() {
    setActiveSlide((current) => (current - 1 + showcaseSlides.length) % showcaseSlides.length);
  }

  function showNextSlide() {
    setActiveSlide((current) => (current + 1) % showcaseSlides.length);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!isSupabaseConfigured || !supabase) {
        setSuccess('Demo mode enabled. Use any credentials to preview the command center.');
        router.push('/dashboard');
        return;
      }

      if (mode === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

        if (signInError) {
          throw signInError;
        }

        router.push('/dashboard');
        router.refresh();
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.full_name,
            plant: form.plant,
            role: form.role,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      setSuccess('Registration created. Check your email if confirmation is enabled, then sign in.');
      setMode('login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:h-[calc(100vh-2.5rem)] xl:grid-cols-[1.02fr_0.98fr] xl:items-stretch">
      <section className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(160deg,#052630,#0a3842)] shadow-[0_30px_120px_rgba(2,14,19,0.24)] xl:h-full">
        <div className="relative h-full p-6 sm:p-7">
          <div className={`pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-br ${currentSlide.accent}`} />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.14),transparent_28%)]" />

          <div className="relative flex h-full flex-col">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-ui text-xs uppercase tracking-[0.3em] text-teal-100/80">
                  {currentSlide.eyebrow}
                </p>
                <p className="mt-3 text-sm text-slate-300">
                  Industrial Automation Command Center
                </p>
              </div>

              <div className="flex items-center gap-2">
                <ArrowButton direction="left" onClick={showPreviousSlide} />
                <ArrowButton direction="right" onClick={showNextSlide} />
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div key={currentSlide.title} className="transition-all duration-500">
                <h2 className="max-w-md text-[1.95rem] font-semibold leading-[1.05] text-white sm:text-[2.2rem] 2xl:text-[2.45rem]">
                  {currentSlide.title}
                </h2>
                <p className="mt-4 max-w-lg text-[15px] leading-7 text-slate-200">
                  {currentSlide.description}
                </p>

                <div className="mt-5 space-y-3">
                  {currentSlide.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3"
                    >
                      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <p className="text-sm leading-7 text-slate-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03))] p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-ui text-[11px] uppercase tracking-[0.28em] text-teal-100/75">
                      Live Snapshot
                    </p>
                    <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                      Active
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {currentSlide.stats.map(([value, label]) => (
                      <div
                        key={label}
                        className="min-w-0 rounded-2xl border border-white/8 bg-white/[0.04] px-2 py-3"
                      >
                        <p className="whitespace-nowrap text-[clamp(1.1rem,1.15vw,1.35rem)] font-semibold leading-5 tracking-[-0.04em] text-white">
                          {value}
                        </p>
                        <p className="mt-1 text-[10px] leading-5 text-slate-300">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                    <div className="flex items-end gap-2">
                      {[54, 76, 68, 86, 72, 91].map((height, index) => (
                        <div key={height + index} className="flex-1">
                          <div className="flex h-20 items-end rounded-2xl bg-white/[0.05] p-2">
                            <div
                              className="w-full rounded-xl bg-[linear-gradient(180deg,var(--accent),rgba(45,212,191,0.16))] transition-all duration-700"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex justify-between text-[11px] text-slate-400">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <div className="flex items-center gap-3">
                    {showcaseSlides.map((slide, index) => (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        className={`group relative h-3 rounded-full transition-all duration-500 ${
                          index === activeSlide ? 'w-14 bg-white/16' : 'w-3 bg-white/25 hover:bg-white/35'
                        }`}
                        aria-label={`Show slide ${index + 1}`}
                      >
                        <span
                          className={`absolute inset-[2px] rounded-full transition-all duration-500 ${
                            index === activeSlide ? 'bg-[var(--accent)]' : 'bg-transparent'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300">
                    {String(activeSlide + 1).padStart(2, '0')} / {String(showcaseSlides.length).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-[var(--border)] bg-[var(--panel)] p-6 sm:p-7 shadow-[0_30px_120px_rgba(4,15,24,0.12)] xl:h-full">
        <div className="rounded-[28px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 xl:h-full xl:overflow-auto">
          <div className="flex gap-2 rounded-full bg-[var(--panel-strong)] p-1">
            {(['login', 'register'] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
                  mode === item
                    ? 'bg-[var(--accent)] text-slate-950 shadow-[0_12px_30px_rgba(15,118,110,0.28)]'
                    : 'bg-transparent text-[var(--text)]'
                }`}
              >
                {item === 'login' ? 'Login' : 'Register'}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <p className="text-2xl font-semibold text-[var(--text)] sm:text-3xl">
              {mode === 'login' ? 'Access your command center' : 'Create your plant workspace'}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)] sm:text-base">
              {mode === 'login'
                ? 'Sign in to monitor operations, track production, and manage alarms from one connected workspace.'
                : 'Register a new account with plant details and role access to begin configuring your operations workspace.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {mode === 'register' ? (
              <>
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.full_name}
                  onChange={(event) => setForm({ ...form, full_name: event.target.value })}
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                  required
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Plant"
                    value={form.plant}
                    onChange={(event) => setForm({ ...form, plant: event.target.value })}
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                    required
                  />
                  <select
                    value={form.role}
                    onChange={(event) => setForm({ ...form, role: event.target.value as Role })}
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : null}

            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              required
            />

            {error ? (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </div>
            ) : null}
            {success ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                {success}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(15,118,110,0.24)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Working...' : mode === 'login' ? 'Enter command center' : 'Create account'}
            </button>
          </form>

          <div className="mt-5 rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-4">
            <p className="text-sm font-semibold text-[var(--text)]">Platform access</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Connect Supabase to enable production authentication and realtime data services. Until then,
              demo mode keeps the full experience available for evaluation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
