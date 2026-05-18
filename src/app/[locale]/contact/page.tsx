import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { isValidLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('headline'),
    description: t('subheadline'),
  };
}

export default function ContactPage({ params }: PageProps) {
  const { locale } = params;
  if (!isValidLocale(locale)) notFound();
  setRequestLocale(locale);
  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations('contact');

  const channels = [
    { key: 'phone', Icon: Phone },
    { key: 'email', Icon: Mail },
    { key: 'hours', Icon: Clock },
  ] as const;

  return (
    <section className="bg-surface-muted py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {t('headline')}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{t('subheadline')}</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          {/* Channels */}
          <ul role="list" className="space-y-4">
            {channels.map(({ key, Icon }) => (
              <li
                key={key}
                className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-700 ring-1 ring-brand-blue-100">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                    {t(`channels.${key}`)}
                  </div>
                  <div className="mt-0.5 text-base font-semibold text-ink">
                    {t(`channels.${key}Value`)}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
