# TheEndRyclecle

> Production-ready global scrap-metal & recyclables trading platform.
> Next.js 14 (App Router) · TypeScript · Tailwind CSS · `next-intl` (10 locales)

---

## Directory layout

```
theendryclecle/
├── middleware.ts                       # next-intl locale routing
├── next.config.js                      # withNextIntl plugin
├── tailwind.config.ts                  # Eco-Trust palette
├── tsconfig.json                       # path aliases (@/*)
├── postcss.config.js
├── package.json
│
└── src/
    ├── app/
    │   ├── layout.tsx                  # root pass-through layout
    │   ├── globals.css                 # Tailwind + base styles
    │   ├── robots.ts                   # SEO
    │   ├── sitemap.ts                  # SEO with hreflang per locale
    │   │
    │   └── [locale]/                   # ── i18n route segment ──
    │       ├── layout.tsx              # html lang/dir + Header/Footer + hreflang alternates
    │       ├── page.tsx                # home: Hero + PriceDashboard + TrustSection
    │       ├── about/page.tsx          # (placeholder)
    │       ├── contact/page.tsx        # (placeholder)
    │       └── dashboard/page.tsx      # (placeholder)
    │
    ├── components/
    │   ├── Header.tsx                  # sticky nav + language switcher + CTA
    │   ├── Footer.tsx                  # localized footer w/ disclaimer
    │   ├── HeroSection.tsx             # banner, search, CTAs, stats
    │   ├── LanguageSwitcher.tsx        # accessible dropdown (10 locales)
    │   ├── PriceDashboard.tsx          # ⭐ core feature
    │   └── TrustSection.tsx            # ISO/Basel/RMI compliance grid
    │
    ├── i18n/
    │   ├── config.ts                   # locales[], metadata, RTL list
    │   ├── request.ts                  # getRequestConfig for next-intl
    │   ├── navigation.ts               # Link/redirect/usePathname helpers
    │   └── locales/
    │       ├── en.json   (English)
    │       ├── th.json   (ไทย)
    │       ├── zh.json   (简体中文)
    │       ├── ja.json   (日本語)
    │       ├── es.json   (Español)
    │       ├── de.json   (Deutsch)
    │       ├── fr.json   (Français)
    │       ├── ar.json   (العربية — RTL)
    │       ├── hi.json   (हिन्दी)
    │       └── pt.json   (Português)
    │
    └── lib/
        ├── mockData.ts                 # LME-anchored mock price feed + FX/unit conversion
        └── utils.ts                    # cn(), formatCurrency, formatPercent
```

---

## Eco-Trust palette

| Token                       | Hex       | Usage                                  |
| --------------------------- | --------- | -------------------------------------- |
| `brand-green-600` (primary) | `#059669` | CTAs, accents, "up" trends, success    |
| `brand-green-500`           | `#10B981` | Highlights & secondary accents         |
| `brand-blue-700` (accent)   | `#1D4ED8` | Focus rings, accent surfaces           |
| `brand-blue-900` (deep)     | `#1E3A8A` | Table headers, hero CTAs, trust band   |
| `surface`                   | `#FFFFFF` | Default background                     |
| `surface-muted`             | `#F8FAFC` | Section backgrounds                    |
| `ink`                       | `#0F172A` | Body text                              |
| `danger`                    | `#DC2626` | "down" trends                          |

---

## SEO

- Dynamic per-locale metadata in `[locale]/layout.tsx` (`generateMetadata`)
- `alternates.languages` emits `hreflang` for all 10 locales + `x-default`
- `sitemap.ts` produces a per-route × per-locale matrix
- `robots.ts` allows all + points to sitemap
- `generateStaticParams` pre-renders every locale at build-time

---

## Run

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /en)
npm run build
npm run type-check
```
