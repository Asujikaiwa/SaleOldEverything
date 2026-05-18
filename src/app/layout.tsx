/**
 * Root layout — does not render any locale-specific UI.
 * next-intl routes through [locale]/layout.tsx for translations.
 */
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
