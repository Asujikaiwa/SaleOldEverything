import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
});

export const config = {
  // Match all routes except api, _next, static assets, and files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
