import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/HeroSection';
import PriceDashboard from '@/components/PriceDashboard';
import TrustSection from '@/components/TrustSection';
import { isValidLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { locale: string };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = params;
  if (!isValidLocale(locale)) notFound();

  // Enables static rendering for this page in the given locale.
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <PriceDashboard />
      <TrustSection />
    </>
  );
}
