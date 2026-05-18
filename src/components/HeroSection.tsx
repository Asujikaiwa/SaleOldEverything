import { useTranslations } from 'next-intl';
import { ArrowRight, Search, ShieldCheck, Globe2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Decorative background — Eco-Trust gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(5,150,105,0.08),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(29,78,216,0.10),_transparent_45%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,_rgba(15,23,42,0.04)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(15,23,42,0.04)_1px,_transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,_black_40%,_transparent_75%)]"
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-green-200 bg-brand-green-50 px-4 py-1.5 text-xs font-semibold text-brand-green-700">
            <Globe2 className="h-3.5 w-3.5" aria-hidden />
            {t('badge')}
          </div>

          {/* Headline */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {t('headline')}
          </h1>

          {/* Sub-headline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
            {t('subheadline')}
          </p>

          {/* Search */}
          <form
            role="search"
            className="mx-auto mt-10 flex max-w-2xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-card ring-1 ring-slate-200 sm:flex-row sm:items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle"
                aria-hidden
              />
              <input
                type="search"
                placeholder={t('searchPlaceholder')}
                aria-label={t('searchPlaceholder')}
                className="w-full rounded-xl border-0 bg-transparent py-3 pl-11 pr-3 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand-blue-700/20"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-800 focus:outline-none focus:ring-2 focus:ring-brand-blue-700/30"
            >
              {t('searchButton')}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </form>

          {/* CTAs */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#dashboard"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-green-700 sm:w-auto"
            >
              {t('ctaPrimary')}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-blue-900 ring-1 ring-inset ring-brand-blue-200 transition hover:bg-brand-blue-50 sm:w-auto"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden />
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>

        {/* Stats */}
        <dl className="mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-slate-100 text-center sm:grid-cols-4">
          {[
            ['volume', t('stats.volume'), t('stats.volumeValue')],
            ['countries', t('stats.countries'), t('stats.countriesValue')],
            ['materials', t('stats.materials'), t('stats.materialsValue')],
            ['uptime', t('stats.uptime'), t('stats.uptimeValue')],
          ].map(([key, label, value]) => (
            <div key={key} className="bg-white px-6 py-8">
              <dt className="text-xs font-medium uppercase tracking-wider text-ink-subtle">
                {label}
              </dt>
              <dd className="mt-2 text-2xl font-bold text-brand-blue-900 sm:text-3xl">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
