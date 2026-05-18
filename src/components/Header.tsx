import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Recycle } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-green-600 to-brand-blue-700 text-white shadow-sm transition group-hover:shadow-card-hover">
            <Recycle className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-base font-bold tracking-tight text-ink">
            TheEnd<span className="text-brand-green-600">Rycle</span>cle
          </span>
        </Link>

        {/* Links */}
        <ul className="hidden items-center gap-1 md:flex">
          {[
            ['/', t('home')],
            ['/#dashboard', t('dashboard')],
            ['/#materials', t('materials')],
            ['/#compliance', t('compliance')],
            ['/about', t('about')],
            ['/contact', t('contact')],
          ].map(([href, label]) => (
            <li key={href}>
              <Link
                href={href}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-muted transition hover:bg-surface-muted hover:text-ink"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/login"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition hover:text-ink sm:inline-flex"
          >
            {t('login')}
          </Link>
          <Link
            href="/contact"
            className="rounded-lg bg-brand-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-green-700 focus:outline-none focus:ring-2 focus:ring-brand-green-600/30"
          >
            {t('cta')}
          </Link>
        </div>
      </nav>
    </header>
  );
}
