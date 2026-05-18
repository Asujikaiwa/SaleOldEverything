import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as a locale-aware currency string. */
export function formatCurrency(
  value: number,
  currency: 'USD' | 'THB' | 'EUR' | 'CNY',
  locale = 'en-US',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value);
}

/** Format a percentage with sign. */
export function formatPercent(value: number, locale = 'en-US'): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)}%`;
}
