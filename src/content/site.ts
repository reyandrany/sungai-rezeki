export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? 'https://www.sungairezeki.com.my'
).replace(/\/$/, '')

export const SITE = {
  url: SITE_URL,
  locale: 'en_MY',
  language: 'en',
  title: 'Sungai Rezeki Sdn Bhd | Civil Engineering, Excavation & Palm Oil Logistics in Johor',
  titleShort: 'Sungai Rezeki Sdn Bhd',
  description:
    'Bumiputera contractor in Bandar Penawar, Johor. Sungai Rezeki Sdn Bhd delivers civil engineering, construction, excavation, oil palm plantation logistics and Mutiaramas ferry services. Founded by Jamaludin bin Kamal Ho; incorporated 5 February 2010.',
  keywords:
    'Sungai Rezeki Sdn Bhd, civil engineering Johor, excavation Johor, oil palm logistics, palm oil transport Kota Tinggi, Mutiaramas ferry, Bandar Penawar contractor, Bahau infrastructure, Bangi civil works',
  motto: 'Rezeki ditangan Allah, Usaha ditangan kita',
  image: {
    url: `${SITE_URL}/og-image.svg`,
    alt: 'Sungai Rezeki Sdn Bhd — civil engineering, excavation and logistics',
    width: 1200,
    height: 630,
  },
  facebook: 'https://www.facebook.com/Sungai-Rezeki-Mutiara-Mas-462390627257036/',
} as const

export const COMPANY = {
  legalName: 'Sungai Rezeki Sdn Bhd',
  founder: 'Jamaludin bin Kamal Ho',
  founded: '2010-02-05',
  heritageStart: '1993-09-16',
  ownership: 'Bumiputera-owned contractor',
  streetAddress: 'No 20/02, Jalan Cengal 1, Taman Desaru Utama',
  postalCode: '81900',
  addressLocality: 'Bandar Penawar',
  addressRegion: 'Johor',
  addressCountry: 'MY',
  address:
    'No 20/02, Jalan Cengal 1, Taman Desaru Utama, 81900 Bandar Penawar, Kota Tinggi, Johor',
  hours:
    'Monday – Friday: 8:00 AM – 5:00 PM (lunch 1:00 PM – 2:00 PM) · Saturday: 8:00 AM – 2:00 PM',
  phones: ['+60 18-589 0208'] as const,
  phoneHref: 'tel:+60185890208',
} as const

export function buildJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness', 'GeneralContractor'],
        '@id': `${SITE.url}/#organization`,
        name: COMPANY.legalName,
        legalName: COMPANY.legalName,
        url: SITE.url,
        image: SITE.image.url,
        logo: `${SITE.url}/favicon.svg`,
        description: SITE.description,
        slogan: SITE.motto,
        foundingDate: COMPANY.founded,
        founder: {
          '@type': 'Person',
          name: COMPANY.founder,
        },
        telephone: '+60185890208',
        sameAs: [SITE.facebook],
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Johor' },
          { '@type': 'AdministrativeArea', name: 'Negeri Sembilan' },
          { '@type': 'AdministrativeArea', name: 'Selangor' },
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: COMPANY.streetAddress,
          addressLocality: COMPANY.addressLocality,
          addressRegion: COMPANY.addressRegion,
          postalCode: COMPANY.postalCode,
          addressCountry: COMPANY.addressCountry,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 1.5326,
          longitude: 104.2315,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '17:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '08:00',
            closes: '14:00',
          },
        ],
        knowsAbout: [
          'Civil engineering',
          'Construction',
          'Excavation',
          'Oil palm plantation management',
          'Palm oil transport',
          'Quarry logistics',
          'Ferry services',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Industrial services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Civil Engineering & Construction' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Excavation & Mining' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Agriculture Logistics' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Maritime & Ferry Services' } },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: COMPANY.legalName,
        description: SITE.description,
        inLanguage: 'en-MY',
        publisher: { '@id': `${SITE.url}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE.url}/#webpage`,
        url: SITE.url,
        name: SITE.title,
        description: SITE.description,
        isPartOf: { '@id': `${SITE.url}/#website` },
        about: { '@id': `${SITE.url}/#organization` },
        inLanguage: 'en-MY',
        primaryImageOfPage: SITE.image.url,
      },
    ],
  }
}
