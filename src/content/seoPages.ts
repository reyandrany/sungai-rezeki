export const SITE_ORIGIN = 'https://www.sungairezeki.com.my'

const TITLE_SHORT = 'Sungai Rezeki Sdn Bhd'

export const PAGES = [
  {
    path: '/',
    title: 'Sungai Rezeki Sdn Bhd | Mekanisasi Solusi Kehadapan',
    description:
      'Syarikat pemilikan 100% Bumiputera Negeri Johor, berdaftar dengan Kementerian Kewangan Malaysia. Lebih 20 tahun mengurus ladang sawit, logistik, feri, agrikultur dan makanan, dari pejabat di Bandar Penawar.',
  },
  {
    path: '/tentang-kami',
    title: `Tentang kami | ${TITLE_SHORT}`,
    description:
      'Misi, visi, dan barisan peneraju Sungai Rezeki Sdn Bhd, syarikat Bumiputera Johor yang berdaftar dengan Kementerian Kewangan Malaysia.',
  },
  {
    path: '/servis',
    title: `Servis | ${TITLE_SHORT}`,
    description:
      'Persawitan, agrikultur, feri, makanan dan minuman, serta kerja sivil Sungai Rezeki Sdn Bhd.',
  },
  {
    path: '/projek',
    title: `Projek | ${TITLE_SHORT}`,
    description:
      'Daftar 105 projek ladang Sungai Rezeki untuk Johor Plantation Group, meliputi 21,196.49 hektar.',
  },
  {
    path: '/aset-kenderaan',
    title: `Aset kenderaan | ${TITLE_SHORT}`,
    description: '115 aset kenderaan Sungai Rezeki, termasuk treler, lori rigid, dan jentera ladang.',
  },
  {
    path: '/anak-syarikat',
    title: `Anak syarikat | ${TITLE_SHORT}`,
    description: 'Enam entiti kumpulan Sungai Rezeki dan senarai pelanggan syarikat.',
  },
  {
    path: '/hubungi',
    title: `Hubungi kami | ${TITLE_SHORT}`,
    description:
      'Pejabat Sungai Rezeki di Bandar Penawar, 81930 Kota Tinggi, dan enam bengkel ladang di Johor serta Pahang.',
  },
] as const

export type SitePage = (typeof PAGES)[number]

export function pageUrl(path: string) {
  return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`
}

export function getPage(pathname: string): SitePage {
  return PAGES.find((page) => page.path === pathname) ?? PAGES[0]
}
