/**
 * Central i18n configuration for TheEndRyclecle.
 * Supports the 10 most spoken trade languages globally.
 */

export const locales = [
  'en', // English
  'th', // Thai
  'zh', // Chinese (Simplified)
  'ja', // Japanese
  'es', // Spanish
  'de', // German
  'fr', // French
  'ar', // Arabic
  'hi', // Hindi
  'pt', // Portuguese
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** RTL languages — Arabic uses right-to-left layout. */
export const rtlLocales: Locale[] = ['ar'];

/** Display metadata used by the LanguageSwitcher and hreflang tags. */
export const localeMetadata: Record<
  Locale,
  { name: string; nativeName: string; flag: string; htmlLang: string }
> = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸', htmlLang: 'en-US' },
  th: { name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', htmlLang: 'th-TH' },
  zh: { name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳', htmlLang: 'zh-CN' },
  ja: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', htmlLang: 'ja-JP' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', htmlLang: 'es-ES' },
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', htmlLang: 'de-DE' },
  fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷', htmlLang: 'fr-FR' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', htmlLang: 'ar-SA' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', htmlLang: 'hi-IN' },
  pt: { name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', htmlLang: 'pt-BR' },
};

export const isValidLocale = (locale: string): locale is Locale =>
  (locales as readonly string[]).includes(locale);
