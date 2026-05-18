'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle2 } from 'lucide-react';

const MATERIALS = [
  'ferrous',
  'nonFerrous',
  'nonMetals',
  'eWaste',
  'mixed',
] as const;

type MaterialKey = (typeof MATERIALS)[number];

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const tDash = useTranslations('dashboard.filters');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function getMaterialLabel(key: MaterialKey): string {
    switch (key) {
      case 'ferrous':
        return tDash('ferrous');
      case 'nonFerrous':
        return tDash('nonFerrous');
      case 'nonMetals':
        return tDash('nonMetals');
      case 'eWaste':
        return 'E-waste';
      case 'mixed':
        return 'Mixed / Other';
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate POST → /api/contact (wire to real endpoint or HubSpot/Salesforce
    // in production).
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-2xl bg-brand-green-50 p-8 text-center ring-1 ring-brand-green-200"
      >
        <CheckCircle2
          className="h-10 w-10 text-brand-green-600"
          aria-hidden
        />
        <p className="text-base font-medium text-brand-green-800">
          {t('success')}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('name')} name="name" required />
        <Field label={t('company')} name="company" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('email')} name="email" type="email" required />
        <Field label={t('country')} name="country" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label={t('material')}
          name="material"
          required
          placeholder={t('selectMaterial')}
          options={MATERIALS.map((k) => ({ value: k, label: getMaterialLabel(k) }))}
        />
        <Field label={t('volume')} name="volume" placeholder="e.g. 50 t / mo" />
      </div>

      <label className="block">
        <span className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
          {t('message')}
        </span>
        <textarea
          name="message"
          rows={5}
          className="mt-1 w-full rounded-lg border border-slate-200 bg-surface-muted px-3 py-2.5 text-sm text-ink focus:border-brand-blue-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-700/20"
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-green-700 disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden />
        {submitting ? t('sending') : t('submit')}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-slate-200 bg-surface-muted px-3 py-2.5 text-sm text-ink placeholder:text-ink-subtle focus:border-brand-blue-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-700/20"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  required,
  placeholder,
  options,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="mt-1 w-full rounded-lg border border-slate-200 bg-surface-muted px-3 py-2.5 text-sm text-ink focus:border-brand-blue-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-700/20"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
