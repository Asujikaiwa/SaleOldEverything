import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createSharedPathnamesNavigation({
    locales,
    defaultLocale,
    localePrefix: 'always',
  });
