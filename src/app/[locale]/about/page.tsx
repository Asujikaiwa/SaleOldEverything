import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { isValidLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { Sparkles, ShieldCheck, Recycle } from 'lucide-react';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('headline'),
    description: t('subheadline'),
  };
}

export default function AboutPage({ params }: PageProps) {
  const { locale } = params;
  if (!isValidLocale(locale)) notFound();
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations('about');

  const values = [
    { key: 'transparency', Icon: Sparkles },
    { key: 'compliance', Icon: ShieldCheck },
    { key: 'circular', Icon: Recycle },
  ] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(5,150,105,0.08),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(29,78,216,0.08),_transparent_45%)]"
        />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {t('headline')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
            {t('subheadline')}
          </p>
          <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl bg-slate-100 text-center">
            {(['founded', 'team', 'offices'] as const).map((k) => (
              <div key={k} className="bg-white px-6 py-6">
                <dt className="text-xs font-medium uppercase tracking-wider text-ink-subtle">
                  {t(`stats.${k}`)}
                </dt>
                <dd className="mt-1 text-2xl font-bold text-brand-blue-900">
                  {t(`stats.${k}Value`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface-muted py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {t('missionTitle')}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            {t('missionBody')}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {t('valuesTitle')}
          </h2>
          <ul role="list" className="mt-12 grid gap-6 lg:grid-cols-3">
            {values.map(({ key, Icon }) => (
              <li
                key={key}
                className="rounded-2xl bg-surface-muted p-6 ring-1 ring-slate-100 transition hover:shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-700 ring-1 ring-brand-green-200">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">
                  {t(`values.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {t(`values.${key}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
