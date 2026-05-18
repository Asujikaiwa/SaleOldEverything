import { useTranslations } from 'next-intl';
import {
  Award,
  FileCheck2,
  Ship,
  ShieldCheck,
  Gem,
  ClipboardCheck,
  type LucideIcon,
} from 'lucide-react';

const ITEMS: { key: string; Icon: LucideIcon }[] = [
  { key: 'iso', Icon: Award },
  { key: 'basel', Icon: FileCheck2 },
  { key: 'shipping', Icon: Ship },
  { key: 'kyc', Icon: ShieldCheck },
  { key: 'rmi', Icon: Gem },
  { key: 'audit', Icon: ClipboardCheck },
];

export default function TrustSection() {
  const t = useTranslations('trust');

  return (
    <section
      id="compliance"
      aria-labelledby="trust-title"
      className="relative overflow-hidden bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-blue-900 py-20 text-white sm:py-28"
    >
      {/* subtle pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="trust-title"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {t('sectionTitle')}
          </h2>
          <p className="mt-4 text-base text-brand-blue-100/90">
            {t('sectionSubtitle')}
          </p>
        </div>

        <ul
          role="list"
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ITEMS.map(({ key, Icon }) => (
            <li
              key={key}
              className="group rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm transition hover:bg-white/10 hover:ring-brand-green-400/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-500/20 ring-1 ring-brand-green-400/40">
                  <Icon className="h-5 w-5 text-brand-green-300" aria-hidden />
                </span>
                <h3 className="text-base font-semibold">
                  {t(`items.${key}.title`)}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-brand-blue-100/80">
                {t(`items.${key}.description`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
