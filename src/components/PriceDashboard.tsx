'use client';

/**
 * PriceDashboard
 * ──────────────
 * The core trading-floor component for TheEndRyclecle.
 *
 * Features:
 *  - Live(-style) buy / sell prices anchored to LME / SHFE / regional benchmarks
 *  - Category filters: Ferrous · Non-Ferrous · Industrial Non-Metals
 *  - Currency switcher (USD / THB / EUR / CNY) and unit switcher (kg / ton / lb)
 *  - 24h change indicator (green up arrow / red down arrow / neutral)
 *  - 7-day sparkline rendered as an inline SVG
 *  - Auto-refresh every 60 seconds with timestamp
 *  - Fully internationalized via next-intl
 *  - Accessible: semantic table, ARIA labels, keyboard-friendly controls
 *
 * Data source: `src/lib/mockData.ts` (replace with a websocket / SWR feed in prod).
 */

import { useEffect, useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  RefreshCw,
  Search,
  TrendingUp,
} from 'lucide-react';
import {
  MOCK_PRICES,
  convertPrice,
  type Category,
  type Currency,
  type PriceRow,
  type Unit,
} from '@/lib/mockData';
import { cn, formatCurrency, formatPercent } from '@/lib/utils';

type CategoryFilter = 'all' | Category;

const CURRENCIES: readonly Currency[] = ['USD', 'THB', 'EUR', 'CNY'] as const;
const UNITS: readonly Unit[] = ['kg', 'ton', 'lb'] as const;

export default function PriceDashboard() {
  const t = useTranslations('dashboard');
  const locale = useLocale();

  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [unit, setUnit] = useState<Unit>('kg');
  const [search, setSearch] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [tick, setTick] = useState(0);

  // Simulated 60-second refresh — replace with a websocket or SWR subscription
  // to the production price feed.
  useEffect(() => {
    const id = setInterval(() => {
      setLastUpdated(new Date());
      setTick((n) => n + 1);
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  const rows = useMemo<PriceRow[]>(() => {
    return MOCK_PRICES.filter((row) => {
      if (filter !== 'all' && row.category !== filter) return false;
      if (!search) return true;
      const haystack = `${row.id} ${row.materialKey} ${row.benchmark}`.toLowerCase();
      return haystack.includes(search.toLowerCase());
    });
  }, [filter, search]);

  const formattedTime = lastUpdated.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-title"
      className="bg-surface-muted py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-green-50 px-3 py-1 text-xs font-semibold text-brand-green-700 ring-1 ring-inset ring-brand-green-200">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden />
              LME · SHFE · CME
            </div>
            <h2
              id="dashboard-title"
              className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              {t('sectionTitle')}
            </h2>
            <p className="mt-2 max-w-2xl text-base text-ink-muted">
              {t('sectionSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-ink-muted shadow-card">
            <RefreshCw
              key={tick}
              className="h-4 w-4 text-brand-green-600 animate-spin [animation-duration:1.2s] [animation-iteration-count:1]"
              aria-hidden
            />
            <span>
              {t('lastUpdated')}:{' '}
              <span className="font-mono text-ink">{formattedTime}</span>
            </span>
          </div>
        </div>

        {/* Controls ──────────────────────────────────────────────── */}
        <div className="mt-8 grid gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          {/* Search */}
          <label className="relative block">
            <span className="sr-only">Search materials</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Copper, HDPE, A380…"
              className="w-full rounded-lg border border-slate-200 bg-surface-muted py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-ink-subtle focus:border-brand-blue-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-700/20"
            />
          </label>

          {/* Currency */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-ink-muted">
              {t('currency')}
            </span>
            <div
              role="radiogroup"
              aria-label={t('currency')}
              className="inline-flex rounded-lg bg-surface-muted p-1"
            >
              {CURRENCIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={currency === c}
                  onClick={() => setCurrency(c)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-semibold transition',
                    currency === c
                      ? 'bg-brand-blue-700 text-white shadow-sm'
                      : 'text-ink-muted hover:text-ink',
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Unit */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-ink-muted">{t('unit')}</span>
            <div
              role="radiogroup"
              aria-label={t('unit')}
              className="inline-flex rounded-lg bg-surface-muted p-1"
            >
              {UNITS.map((u) => (
                <button
                  key={u}
                  type="button"
                  role="radio"
                  aria-checked={unit === u}
                  onClick={() => setUnit(u)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-semibold uppercase transition',
                    unit === u
                      ? 'bg-brand-green-600 text-white shadow-sm'
                      : 'text-ink-muted hover:text-ink',
                  )}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category filter pills ─────────────────────────────────── */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(
            [
              ['all', t('filters.all')],
              ['ferrous', t('filters.ferrous')],
              ['nonFerrous', t('filters.nonFerrous')],
              ['nonMetals', t('filters.nonMetals')],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key as CategoryFilter)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition ring-1 ring-inset',
                filter === key
                  ? 'bg-brand-blue-900 text-white ring-brand-blue-900'
                  : 'bg-white text-ink-muted ring-slate-200 hover:bg-brand-blue-50 hover:text-brand-blue-900',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Price Table ───────────────────────────────────────────── */}
        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-brand-blue-900 text-white">
                <tr>
                  <Th>{t('columns.material')}</Th>
                  <Th>{t('columns.grade')}</Th>
                  <Th align="right">{t('columns.buy')}</Th>
                  <Th align="right">{t('columns.sell')}</Th>
                  <Th align="right">{t('columns.change')}</Th>
                  <Th align="center">{t('columns.trend')}</Th>
                  <Th align="right">{t('columns.action')}</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <PriceRowItem
                    key={row.id}
                    row={row}
                    currency={currency}
                    unit={unit}
                    locale={locale}
                  />
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-sm text-ink-muted"
                    >
                      No materials match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────── Sub-components ─────────────────── */

function Th({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
}) {
  return (
    <th
      scope="col"
      className={cn(
        'px-4 py-3 text-xs font-semibold uppercase tracking-wider sm:px-6',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
      )}
    >
      {children}
    </th>
  );
}

interface PriceRowItemProps {
  row: PriceRow;
  currency: Currency;
  unit: Unit;
  locale: string;
}

function PriceRowItem({ row, currency, unit, locale }: PriceRowItemProps) {
  // Call the translation hooks inside the row so we don't have to pass
  // weakly-typed `t` functions down through props.
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');

  const buy = convertPrice(row.buyUsdPerKg, currency, unit);
  const sell = convertPrice(row.sellUsdPerKg, currency, unit);
  const intlLocale = locale === 'th' ? 'th-TH' : 'en-US';

  const isUp = row.trend === 'up';
  const isDown = row.trend === 'down';
  const trendColor = isUp
    ? 'text-brand-green-600'
    : isDown
      ? 'text-danger'
      : 'text-ink-muted';

  const TrendIcon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : Minus;
  const trendLabel = isUp
    ? tCommon('up')
    : isDown
      ? tCommon('down')
      : tCommon('stable');

  return (
    <tr className="group transition hover:bg-brand-green-50/40">
      {/* Material */}
      <td className="whitespace-nowrap px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <CategoryDot category={row.category} />
          <div>
            <div className="text-sm font-semibold text-ink">
              {t(`materials.${row.materialKey}.name`)}
            </div>
            <div className="text-xs text-ink-subtle">
              {t(`categories.${row.category}`)} · {row.benchmark}
            </div>
          </div>
        </div>
      </td>

      {/* Grade */}
      <td className="whitespace-nowrap px-4 py-4 text-sm text-ink-muted sm:px-6">
        {t(`materials.${row.materialKey}.grade`)}
      </td>

      {/* Buy */}
      <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-mono text-ink sm:px-6">
        {formatCurrency(buy, currency, intlLocale)}
        <div className="text-[10px] font-sans uppercase tracking-wider text-ink-subtle">
          /{unit}
        </div>
      </td>

      {/* Sell */}
      <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-mono font-semibold text-brand-blue-900 sm:px-6">
        {formatCurrency(sell, currency, intlLocale)}
        <div className="text-[10px] font-sans uppercase tracking-wider text-ink-subtle">
          /{unit}
        </div>
      </td>

      {/* 24h Change */}
      <td className="whitespace-nowrap px-4 py-4 text-right text-sm sm:px-6">
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
            isUp && 'bg-brand-green-50 text-brand-green-700',
            isDown && 'bg-red-50 text-danger',
            !isUp && !isDown && 'bg-slate-100 text-ink-muted',
          )}
        >
          <TrendIcon className="h-3 w-3" aria-label={trendLabel} />
          {formatPercent(row.changePct, intlLocale)}
        </span>
      </td>

      {/* 7d Sparkline */}
      <td className="px-4 py-4 sm:px-6">
        <div className="flex justify-center">
          <Sparkline data={row.sparkline} color={trendColor} />
        </div>
      </td>

      {/* Action */}
      <td className="whitespace-nowrap px-4 py-4 text-right sm:px-6">
        <button
          type="button"
          className="rounded-lg bg-brand-green-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-green-700 focus:outline-none focus:ring-2 focus:ring-brand-green-600/30"
        >
          {t('actions.quote')}
        </button>
      </td>
    </tr>
  );
}

function CategoryDot({ category }: { category: Category }) {
  const color =
    category === 'ferrous'
      ? 'bg-brand-blue-700'
      : category === 'nonFerrous'
        ? 'bg-brand-green-600'
        : 'bg-amber-500';
  return (
    <span
      className={cn('h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white', color)}
      aria-hidden
    />
  );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return null;
  const w = 80;
  const h = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = w / (data.length - 1);

  const points = data
    .map((v, i) => {
      const x = i * stepX;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className={cn('overflow-visible', color)}
      aria-hidden
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}
