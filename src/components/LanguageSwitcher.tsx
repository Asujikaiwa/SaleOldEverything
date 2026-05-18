'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { locales, localeMetadata, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

/**
 * Accessible language dropdown. Switches the URL segment in place
 * (e.g. /en/dashboard → /th/dashboard) without losing the current route.
 */
export default function LanguageSwitcher() {
  const t = useTranslations('languageSwitcher');
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function selectLocale(locale: Locale) {
    setOpen(false);
    if (locale === currentLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  }

  const current = localeMetadata[currentLocale];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('select')}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-muted ring-1 ring-inset ring-slate-200 transition hover:text-ink hover:ring-slate-300',
          isPending && 'opacity-60',
        )}
      >
        <Globe className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">{current.nativeName}</span>
        <span className="sm:hidden uppercase">{currentLocale}</span>
        <ChevronDown
          className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('label')}
          className="absolute right-0 z-50 mt-2 max-h-80 w-56 overflow-auto rounded-xl bg-white p-1 shadow-card-hover ring-1 ring-slate-200 animate-fade-in"
        >
          {locales.map((loc) => {
            const m = localeMetadata[loc];
            const active = loc === currentLocale;
            return (
              <li key={loc}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => selectLocale(loc)}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition',
                    active
                      ? 'bg-brand-green-50 text-brand-green-700'
                      : 'text-ink hover:bg-surface-muted',
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden className="text-base leading-none">
                      {m.flag}
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="font-medium">{m.nativeName}</span>
                      <span className="text-xs text-ink-subtle">{m.name}</span>
                    </span>
                  </span>
                  {active && (
                    <Check className="h-4 w-4 text-brand-green-600" aria-hidden />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
