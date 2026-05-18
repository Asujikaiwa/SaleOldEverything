/**
 * Emits Organization + WebSite JSON-LD for rich-result SEO.
 * Rendered server-side inside the locale layout.
 */

interface StructuredDataProps {
  locale: string;
  siteUrl: string;
  name: string;
  description: string;
}

export default function StructuredData({
  locale,
  siteUrl,
  name,
  description,
}: StructuredDataProps) {
  const localeUrl = `${siteUrl}/${locale}`;

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}#org`,
        name: 'TheEndRyclecle',
        url: siteUrl,
        logo: `${siteUrl}/icon.png`,
        description,
        foundingDate: '2021',
        sameAs: [
          'https://www.linkedin.com/company/theendryclecle',
          'https://twitter.com/theendryclecle',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+44-20-7946-0958',
            contactType: 'Trading Desk',
            availableLanguage: [
              'English',
              'Thai',
              'Chinese',
              'Japanese',
              'Spanish',
              'German',
              'French',
              'Arabic',
              'Hindi',
              'Portuguese',
            ],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`,
        url: localeUrl,
        name,
        description,
        inLanguage: locale,
        publisher: { '@id': `${siteUrl}#org` },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${localeUrl}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify is safe here — content is server-built from typed inputs.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
