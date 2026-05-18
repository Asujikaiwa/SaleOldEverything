import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {
  locales,
  isValidLocale,
  rtlLocales,
  localeMetadata,
  type Locale,
} from '@/i18n/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

/** Pre-render every supported locale at build-time. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.theendryclecle.com';

/**
 * Per-locale metadata + hreflang alternates for SEO.
 * Every supported language is emitted so Google can map
 * regional variants correctly across the 10 locales.
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  if (!isValidLocale(locale)) return {};

  const t = await getTranslations({ locale, namespace: 'meta' });

  const languages = Object.fromEntries(
    locales.map((l) => [localeMetadata[l].htmlLang, `${SITE_URL}/${l}`]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: `%s · TheEndRyclecle`,
    },
    description: t('description'),
    keywords: t('keywords'),
    applicationName: 'TheEndRyclecle',
    authors: [{ name: 'TheEndRyclecle Trading Desk' }],
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ...languages,
        'x-default': `${SITE_URL}/en`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}`,
      siteName: 'TheEndRyclecle',
      title: t('title'),
      description: t('description'),
      locale: localeMetadata[locale as Locale].htmlLang,
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeMetadata[l].htmlLang),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: { index: true, follow: true },
    manifest: '/manifest.json',
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!isValidLocale(locale)) notFound();

  // Enables static rendering with next-intl
  setRequestLocale(locale);

  const messages = await getMessages();
  const meta = await getTranslations({ locale, namespace: 'meta' });
  const dir = rtlLocales.includes(locale as Locale) ? 'rtl' : 'ltr';
  const htmlLang = localeMetadata[locale as Locale].htmlLang;

  return (
    <html lang={htmlLang} dir={dir} className={inter.variable}>
      <body className="bg-white font-sans text-ink antialiased">
        <StructuredData
          locale={locale}
          siteUrl={SITE_URL}
          name={meta('title')}
          description={meta('description')}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-blue-900 focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
