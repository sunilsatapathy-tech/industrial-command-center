import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getShowcaseEntry } from '@/lib/home-nav-data';

type ShowcasePageProps = {
  params: {
    section: string;
    slug: string;
  };
};

export default function ShowcaseDetailPage({ params }: ShowcasePageProps) {
  const result = getShowcaseEntry(params.section, params.slug);

  if (!result) {
    notFound();
  }

  const { section, entry } = result;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#edf7f7_0%,#dff1f1_100%)] text-slate-950">
      <section className="border-b border-slate-200 bg-white/95">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
            {entry.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-6xl">
            {entry.heroTitle}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-600">
            {entry.heroDescription}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/"
              className="rounded-xl bg-[#0b58a2] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#094986]"
            >
              Return to Homepage
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-slate-300 px-6 py-3 text-base font-semibold text-slate-800 transition hover:border-sky-300 hover:text-sky-700"
            >
              Open Command Center
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <div className="space-y-8">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <div className="grid gap-4 md:grid-cols-3">
              {entry.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_100%)] px-5 py-5"
                >
                  <p className="text-3xl font-semibold tracking-tight text-slate-950">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Overview
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {entry.label}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{entry.summary}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {entry.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-5"
                >
                  <div className="mb-4 h-10 w-10 rounded-2xl bg-[linear-gradient(135deg,#dbeafe,#bfdbfe)]" />
                  <p className="text-base leading-7 text-slate-700">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <div className="h-52 bg-[linear-gradient(135deg,#0b4f8f_0%,#0d6cae_36%,#04111d_100%)] p-6">
              <div className="flex h-full items-end rounded-[20px] border border-white/15 bg-white/10 p-5 backdrop-blur">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                    Demo Workspace
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    {section.label}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-lg font-semibold text-slate-950">Latest updates</p>
              <div className="mt-4 space-y-4">
                {entry.updates.map((update) => (
                  <div key={update} className="rounded-[18px] border border-slate-200 px-4 py-4">
                    <p className="text-sm leading-7 text-slate-600">{update}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Section context
            </p>
            <p className="mt-3 text-lg leading-8 text-slate-600">{section.description}</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
