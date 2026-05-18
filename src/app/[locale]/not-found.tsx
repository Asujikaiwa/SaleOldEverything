import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('errors.notFound');

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-surface-muted px-4 py-20">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-green-600 to-brand-blue-700 text-white shadow-card">
          <Compass className="h-7 w-7" aria-hidden />
        </div>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-brand-blue-700">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-base text-ink-muted">{t('description')}</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-green-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t('cta')}
        </Link>
      </div>
    </section>
  );
}
