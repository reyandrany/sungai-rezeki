import { getPage, PAGES, type SitePage } from './seoPages.ts'

export type { SitePage }
export { getPage, PAGES }

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? 'https://www.sungairezeki.com.my'
).replace(/\/$/, '')

export const SITE = {
  url: SITE_URL,
  locale: 'ms_MY',
  language: 'ms',
  title: 'Sungai Rezeki Sdn Bhd | Mekanisasi Solusi Kehadapan',
  titleShort: 'Sungai Rezeki Sdn Bhd',
  description:
    'Syarikat pemilikan 100% Bumiputera Negeri Johor, berdaftar dengan Kementerian Kewangan Malaysia. Lebih 20 tahun mengurus ladang sawit, logistik, feri, agrikultur dan makanan, dari pejabat di Bandar Penawar.',
  keywords:
    'Sungai Rezeki Sdn Bhd, 889171-P, ladang sawit Johor, Johor Plantation Group, logistik perladangan, feri Johor, Bandar Penawar, Kota Tinggi, Mekanisasi Solusi Kehadapan',
  motto: 'Mekanisasi Solusi Kehadapan',
  registration: '889171-P',
  image: {
    url: `${SITE_URL}/hero.jpg`,
    alt: 'Gambar utama Sungai Rezeki Sdn Bhd',
    width: 1200,
    height: 630,
  },
} as const

export const COMPANY = {
  legalName: 'Sungai Rezeki Sdn Bhd',
  shortName: 'SRSB',
  registration: '889171-P',
  ownership: 'Pemilikan 100% Bumiputera Negeri Johor',
  registrar: 'Kementerian Kewangan Malaysia',
  experience: 'Lebih 20 tahun mengurus ladang sawit',
  ceo: 'Jamaludin Bin Kamal Ho',
  cfo: 'Norhidayah Abbdul Rahim',
  streetAddress: 'No. 20/02 Jalan Cengal 1, Taman Desaru Utama',
  postalCode: '81930',
  addressLocality: 'Bandar Penawar',
  addressRegion: 'Johor',
  addressCountry: 'MY',
  address:
    'No. 20/02 Jalan Cengal 1, Taman Desaru Utama, Bandar Penawar, 81930 Kota Tinggi, Johor',
} as const

export function pageUrl(path: string) {
  return path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`
}

export function buildJsonLd(page: SitePage = PAGES[0]): Record<string, unknown> {
  const url = pageUrl(page.path)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': `${SITE.url}/#organization`,
        name: COMPANY.legalName,
        legalName: COMPANY.legalName,
        url: SITE.url,
        image: SITE.image.url,
        logo: `${SITE_URL}/sungai-rezeki.webp`,
        description: SITE.description,
        slogan: SITE.motto,
        identifier: COMPANY.registration,
        address: {
          '@type': 'PostalAddress',
          streetAddress: COMPANY.streetAddress,
          addressLocality: COMPANY.addressLocality,
          addressRegion: COMPANY.addressRegion,
          postalCode: COMPANY.postalCode,
          addressCountry: COMPANY.addressCountry,
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Johor' },
          { '@type': 'AdministrativeArea', name: 'Pahang' },
        ],
        employee: [
          { '@type': 'Person', name: COMPANY.ceo, jobTitle: 'Chief Executive Officer' },
          { '@type': 'Person', name: COMPANY.cfo, jobTitle: 'Chief Financial Officer' },
        ],
        knowsAbout: [
          'Pengurusan ladang sawit',
          'Logistik perladangan',
          'Perkhidmatan feri',
          'Agrikultur dan ternakan',
          'Makanan dan minuman',
          'Kerja sivil',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: `${SITE.url}/`,
        name: COMPANY.legalName,
        description: SITE.description,
        inLanguage: 'ms-MY',
        publisher: { '@id': `${SITE.url}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: 'ms-MY',
        isPartOf: { '@id': `${SITE.url}/#website` },
        about: { '@id': `${SITE.url}/#organization` },
      },
    ],
  }
}
