'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { AlertTriangle, RotateCw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function LocaleError({ error, reset }: ErrorProps) {
  const t = useTranslations('errors.boundary');

  useEffect(() => {
    // In production, forward to Sentry / Datadog / your error pipeline.
    // eslint-disable-next-line no-console
    console.error('[locale-error]', error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-surface-muted px-4 py-20">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-danger ring-1 ring-red-100">
          <AlertTriangle className="h-7 w-7" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-base text-ink-muted">{t('description')}</p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-ink-subtle">
            ref: {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-green-700"
          >
            <RotateCw className="h-4 w-4" aria-hidden />
            {t('retry')}
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-blue-900 ring-1 ring-inset ring-brand-blue-200 transition hover:bg-brand-blue-50"
          >
            {t('home')}
          </Link>
        </div>
      </div>
    </section>
  );
}
