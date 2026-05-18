import type { MetadataRoute } from 'next';
import { locales, localeMetadata } from '@/i18n/config';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.theendryclecle.com';

const ROUTES = ['', '/about', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((route) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            localeMetadata[l].htmlLang,
            `${SITE_URL}/${l}${route}`,
          ]),
        ),
      },
    })),
  );
}
