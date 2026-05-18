import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Recycle } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');

  const sections = [
    {
      title: t('sections.product'),
      links: [
        { href: '/#dashboard', label: t('links.dashboard') },
        { href: '/#materials', label: t('links.materials') },
        { href: '/api-docs', label: t('links.api') },
      ],
    },
    {
      title: t('sections.company'),
      links: [
        { href: '/about', label: t('links.about') },
        { href: '/careers', label: t('links.careers') },
        { href: '/press', label: t('links.press') },
      ],
    },
    {
      title: t('sections.legal'),
      links: [
        { href: '/privacy', label: t('links.privacy') },
        { href: '/terms', label: t('links.terms') },
        { href: '/#compliance', label: t('links.compliance') },
      ],
    },
    {
      title: t('sections.connect'),
      links: [
        { href: '/contact', label: t('links.contact') },
        { href: '/support', label: t('links.support') },
      ],
    },
  ];

  return (
    <footer className="bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,_1fr)]">
          {/* Brand block */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-green-600 to-brand-blue-700 text-white">
                <Recycle className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-base font-bold tracking-tight text-ink">
                TheEnd<span className="text-brand-green-600">Rycle</span>cle
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-ink-muted">
              {t('tagline')}
            </p>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink">
                {s.title}
              </h4>
              <ul role="list" className="mt-4 space-y-3">
                {s.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-muted transition hover:text-brand-green-700"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <p className="text-xs text-ink-muted">{t('disclaimer')}</p>
          <p className="mt-3 text-xs text-ink-subtle">{t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
