/**
 * Mock international price feed for TheEndRyclecle.
 *
 * Prices are illustrative, anchored to representative LME / SHFE / regional
 * benchmark levels for the materials listed. Base prices are stored in
 * USD/kg — all other currency/unit views derive from these.
 */

export type Category = 'ferrous' | 'nonFerrous' | 'nonMetals';
export type Trend = 'up' | 'down' | 'stable';

export interface PriceRow {
  /** Stable id used for table keys & translation lookups. */
  id: string;
  /** i18n key under `dashboard.materials.<id>`. */
  materialKey: string;
  category: Category;
  /** Buy indication in USD/kg. */
  buyUsdPerKg: number;
  /** Sell indication in USD/kg. */
  sellUsdPerKg: number;
  /** 24h percentage change. */
  changePct: number;
  trend: Trend;
  /** Tiny 7-point sparkline series (USD/kg). */
  sparkline: number[];
  /** Source benchmark for transparency. */
  benchmark: 'LME' | 'SHFE' | 'CME' | 'Regional';
}

export const MOCK_PRICES: PriceRow[] = [
  // ── Ferrous ───────────────────────────────────────────────────────────
  {
    id: 'ironHeavy',
    materialKey: 'ironHeavy',
    category: 'ferrous',
    buyUsdPerKg: 0.32,
    sellUsdPerKg: 0.38,
    changePct: 1.42,
    trend: 'up',
    sparkline: [0.30, 0.31, 0.30, 0.32, 0.33, 0.32, 0.34],
    benchmark: 'CME',
  },
  {
    id: 'ironLight',
    materialKey: 'ironLight',
    category: 'ferrous',
    buyUsdPerKg: 0.28,
    sellUsdPerKg: 0.33,
    changePct: 0.85,
    trend: 'up',
    sparkline: [0.26, 0.27, 0.27, 0.28, 0.28, 0.28, 0.29],
    benchmark: 'Regional',
  },
  {
    id: 'steelStructural',
    materialKey: 'steelStructural',
    category: 'ferrous',
    buyUsdPerKg: 0.41,
    sellUsdPerKg: 0.48,
    changePct: -0.32,
    trend: 'down',
    sparkline: [0.43, 0.42, 0.42, 0.41, 0.41, 0.42, 0.41],
    benchmark: 'LME',
  },
  {
    id: 'scrapCars',
    materialKey: 'scrapCars',
    category: 'ferrous',
    buyUsdPerKg: 0.22,
    sellUsdPerKg: 0.27,
    changePct: 0.00,
    trend: 'stable',
    sparkline: [0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22],
    benchmark: 'Regional',
  },

  // ── Non-Ferrous ───────────────────────────────────────────────────────
  {
    id: 'copperWire',
    materialKey: 'copperWire',
    category: 'nonFerrous',
    buyUsdPerKg: 8.42,
    sellUsdPerKg: 9.10,
    changePct: 2.18,
    trend: 'up',
    sparkline: [8.10, 8.15, 8.20, 8.30, 8.28, 8.35, 8.42],
    benchmark: 'LME',
  },
  {
    id: 'copperStripped',
    materialKey: 'copperStripped',
    category: 'nonFerrous',
    buyUsdPerKg: 7.85,
    sellUsdPerKg: 8.50,
    changePct: 1.95,
    trend: 'up',
    sparkline: [7.55, 7.60, 7.65, 7.70, 7.78, 7.80, 7.85],
    benchmark: 'LME',
  },
  {
    id: 'aluminumHeavy',
    materialKey: 'aluminumHeavy',
    category: 'nonFerrous',
    buyUsdPerKg: 2.15,
    sellUsdPerKg: 2.42,
    changePct: -0.46,
    trend: 'down',
    sparkline: [2.20, 2.18, 2.18, 2.16, 2.15, 2.16, 2.15],
    benchmark: 'LME',
  },
  {
    id: 'aluminumCans',
    materialKey: 'aluminumCans',
    category: 'nonFerrous',
    buyUsdPerKg: 1.32,
    sellUsdPerKg: 1.55,
    changePct: 0.76,
    trend: 'up',
    sparkline: [1.28, 1.29, 1.30, 1.30, 1.31, 1.32, 1.32],
    benchmark: 'Regional',
  },
  {
    id: 'brass',
    materialKey: 'brass',
    category: 'nonFerrous',
    buyUsdPerKg: 5.20,
    sellUsdPerKg: 5.75,
    changePct: 1.10,
    trend: 'up',
    sparkline: [5.05, 5.08, 5.12, 5.15, 5.18, 5.20, 5.20],
    benchmark: 'LME',
  },
  {
    id: 'stainless',
    materialKey: 'stainless',
    category: 'nonFerrous',
    buyUsdPerKg: 1.85,
    sellUsdPerKg: 2.10,
    changePct: -0.18,
    trend: 'down',
    sparkline: [1.88, 1.87, 1.87, 1.86, 1.85, 1.85, 1.85],
    benchmark: 'SHFE',
  },

  // ── Non-Metals ────────────────────────────────────────────────────────
  {
    id: 'hdpe',
    materialKey: 'hdpe',
    category: 'nonMetals',
    buyUsdPerKg: 0.65,
    sellUsdPerKg: 0.82,
    changePct: 0.45,
    trend: 'up',
    sparkline: [0.62, 0.63, 0.63, 0.64, 0.64, 0.65, 0.65],
    benchmark: 'Regional',
  },
  {
    id: 'pet',
    materialKey: 'pet',
    category: 'nonMetals',
    buyUsdPerKg: 0.38,
    sellUsdPerKg: 0.52,
    changePct: 0.00,
    trend: 'stable',
    sparkline: [0.38, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38],
    benchmark: 'Regional',
  },
  {
    id: 'occ',
    materialKey: 'occ',
    category: 'nonMetals',
    buyUsdPerKg: 0.12,
    sellUsdPerKg: 0.18,
    changePct: -1.20,
    trend: 'down',
    sparkline: [0.14, 0.13, 0.13, 0.13, 0.12, 0.12, 0.12],
    benchmark: 'Regional',
  },
  {
    id: 'ewaste',
    materialKey: 'ewaste',
    category: 'nonMetals',
    buyUsdPerKg: 1.45,
    sellUsdPerKg: 1.80,
    changePct: 3.20,
    trend: 'up',
    sparkline: [1.35, 1.38, 1.40, 1.42, 1.43, 1.44, 1.45],
    benchmark: 'Regional',
  },
];

/* ─────────────────────────────── Currency & Unit ──────────────────────── */

export type Currency = 'USD' | 'THB' | 'EUR' | 'CNY';
export type Unit = 'kg' | 'ton' | 'lb';

/** Indicative FX rates vs USD. Production builds replace this with a live FX feed. */
export const FX_RATES: Record<Currency, number> = {
  USD: 1,
  THB: 36.2,
  EUR: 0.92,
  CNY: 7.18,
};

const UNIT_MULTIPLIERS: Record<Unit, number> = {
  kg: 1,
  ton: 1000,
  lb: 0.453592,
};

/** Convert a USD/kg base price into the user's chosen currency + unit. */
export function convertPrice(
  usdPerKg: number,
  currency: Currency,
  unit: Unit,
): number {
  return usdPerKg * FX_RATES[currency] * UNIT_MULTIPLIERS[unit];
}
