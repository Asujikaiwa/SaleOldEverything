import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { defaultLocale, isValidLocale } from './config';

/**
 * Server-side request config: loads the per-request translation bundle.
 * next-intl calls this on every locale-scoped route.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = (await requestLocale) ?? defaultLocale;
  const locale = isValidLocale(requested) ? requested : defaultLocale;

  let messages;
  try {
    messages = (await import(`./locales/${locale}.json`)).default;
  } catch {
    notFound();
  }

  // Fallback chain: if a key is missing in the requested locale, fall back
  // to English so partially-translated bundles never break the UI in production.
  let fallback;
  if (locale !== 'en') {
    try {
      fallback = (await import('./locales/en.json')).default;
    } catch {
      /* ignore */
    }
  }

  return {
    locale,
    messages,
    timeZone: 'UTC',
    now: new Date(),
    onError(error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('[i18n]', error.message);
      }
    },
    getMessageFallback({ namespace, key }) {
      if (fallback) {
        const path = namespace ? `${namespace}.${key}` : key;
        const value = path
          .split('.')
          .reduce<unknown>(
            (acc, k) =>
              acc && typeof acc === 'object' && k in (acc as object)
                ? (acc as Record<string, unknown>)[k]
                : undefined,
            fallback,
          );
        if (typeof value === 'string') return value;
      }
      return key;
    },
  };
});
