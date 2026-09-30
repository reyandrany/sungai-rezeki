import { MEDIA } from './site.ts'

export const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-field'

export function media(path: string) {
  return `${MEDIA}${path}`
}

export function mapHref(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export const NAV = [
  { label: 'Laman utama', to: '/' },
  { label: 'Tentang kami', to: '/tentang-kami' },
  { label: 'Servis', to: '/servis' },
  { label: 'Projek', to: '/projek' },
  { label: 'Aset kenderaan', to: '/aset-kenderaan' },
  { label: 'Anak syarikat', to: '/anak-syarikat' },
] as const

export const MORE_LINKS = [
  { label: 'Pelanggan kami', to: '/anak-syarikat#pelanggan' },
  { label: 'Hubungi kami', to: '/hubungi' },
] as const

export const LEDGER = [
  { label: 'Projek', value: '105', to: '/projek' },
  { label: 'Hektar naungan', value: '21,196.49', to: '/projek' },
  { label: 'Aset kenderaan', value: '115', to: '/aset-kenderaan' },
  { label: 'Anak syarikat', value: '6', to: '/anak-syarikat' },
] as const

export const LEADERS = [
  {
    name: 'Jamaludin Bin Kamal Ho',
    role: 'Chief Executive Officer',
    photo: '/staff/leadership/Jamaludin-1.jpg',
  },
  {
    name: 'Norhidayah Abbdul Rahim',
    role: 'Chief Financial Officer',
    photo: '/staff/leadership/Norhidayah-1.jpg',
  },
  {
    name: 'Nurul Syahira',
    role: 'CEO Personal Assistant',
    photo: '/staff/management/syahira.jpg',
  },
  { name: 'Subrina', role: 'Account Assistant', photo: null },
  { name: 'Murni', role: 'HR Assistant', photo: '/staff/management/murni.jpg' },
  { name: 'Nur Assikin', role: 'Purchasing Clerk', photo: null },
] as const

export const UNITS = [
  'Pengurusan',
  'Operasi',
  'Bengkel',
  'Keselamatan',
  'Runner',
  'Laman Desaru',
  'Rezeki IQ Farm',
] as const

export const SERVICES = [
  {
    id: 'persawitan',
    title: 'Persawitan',
    image: '/services/thumbnails/persawitan.jpg',
    alt: 'Kerja penuaian di ladang sawit',
    tasks: ['Memotong', 'Mengangkut', 'Menanam semula', 'Membersihkan kawasan ladang'],
    paragraphs: [
      'Kami mempunyai keupayaan penuh dalam menguruskan operasi ladang secara menyeluruh, termasuk pemotongan hasil dan pengangkutan yang efisien. Dengan tenaga kerja yang berpengalaman dan peralatan yang moden, setiap proses — daripada penyelenggaraan ladang hingga kutipan hasil — dijalankan dengan cekap dan sistematik.',
      'Di dalam ladang, lori rigid memudahkan pergerakan hasil di kawasan berbukit atau berbatas. Bagi penghantaran ke kilang, treler membawa muatan besar. Sistem logistik ini memastikan penghantaran tepat pada masanya.',
    ],
  },
  {
    id: 'agrikultur',
    title: 'Agrikultur',
    image: '/services/thumbnails/agrikultur.jpg',
    alt: 'Hasil pertanian dan ternakan Sungai Rezeki',
    tasks: ['Kelapa pandan segar', 'Lembu', 'Kambing untuk dipasarkan, kenduri, korban dan aqiqah'],
    paragraphs: [
      'Sektor agrikultur merangkumi kelapa pandan segar, lembu dan kambing — untuk kegunaan harian, majlis kenduri, serta ibadah korban dan aqiqah. Kelapa pandan dikenali dengan aroma wangi serta air yang manis. Lembu dan kambing dipelihara dengan kaedah penternakan yang menjaga kualiti daging, kebersihan dan keselamatan makanan.',
      'Bekalan pergi terus dari ladang kepada pelanggan individu, dan juga sebagai pembekal tetap kepada syarikat serta organisasi terpilih. Prinsipnya: harga berpatutan, penghantaran dipercayai, dan jaminan kualiti.',
    ],
  },
  {
    id: 'pelancongan',
    title: 'Pelancongan',
    image: '/services/thumbnails/pelancongan.jpg',
    alt: 'Perkhidmatan feri dari jeti di Negeri Johor',
    tasks: [
      'Feri dari beberapa jeti penumpang di Negeri Johor',
      'Terminal Feri Tanjung Belungkor – Batu Ampar (Harbour Bay)',
      'Stulang Laut (Berjaya Waterfront) – Batu Ampar (Harbour Bay)',
    ],
    paragraphs: [
      'Syarikat mempunyai pengalaman mengendalikan perkhidmatan feri antarabangsa yang menghubungkan Malaysia dan Indonesia. Laluan Tanjung Belungkor – Batu Ampar dan Stulang Laut – Batu Ampar pernah beroperasi di bawah pengurusan kami, untuk ribuan penumpang, dengan pematuhan piawaian keselamatan dan prosedur imigresen kedua-dua negara.',
    ],
  },
  {
    id: 'makanan',
    title: 'F & B',
    image: '/services/thumbnails/makanan-minuman.jpg',
    alt: 'Operasi makanan dan minuman kumpulan Sungai Rezeki',
    tasks: ['Sebuah restoran', 'Tempahan makanan untuk syarikat perhotelan'],
    paragraphs: [
      'Perkhidmatan makanan dan minuman merangkumi hospitaliti, korporat dan agensi kerajaan — dari dapur hingga pelanggan akhir, dengan penekanan pada kualiti, kebersihan dan kepuasan.',
      'Pembekalan staff meal kepada hotel seperti Anantara dan Hard Rock Hotel. Pengurusan penuh ke atas 22 gerai makanan di foodcourt milik syarikat. Sebuah bistro untuk kakitangan Desaru Coast. Katering majlis rasmi untuk Johor Plantation Group, Jabatan Kastam Diraja Malaysia dan Jabatan Imigresen Malaysia.',
    ],
  },
  {
    id: 'lain-lain',
    title: 'Lain-lain',
    image: '/services/thumbnails/lain-lain.jpg',
    alt: 'Kerja sivil dan penyelenggaraan infrastruktur',
    tasks: ['Menyelenggara jalan raya', 'Kerja sivil dan kejuruteraan', 'Kerja kimpalan', 'Aktiviti melombong'],
    paragraphs: [
      'Kerja sivil telah disiapkan untuk sektor pendidikan, agensi kerajaan dan industri perladangan: projek sekolah, kerja awam di bawah Jabatan Kerja Raya, serta penyelenggaraan menyeluruh untuk Johor Plantation Group.',
      'Skop JKR termasuk pembinaan dan penyelenggaraan jalan, jambatan kecil dan kemudahan awam. Di ladang, skopnya pembaikan infrastruktur, jalan dalam ladang, dan kemudahan untuk pekerja.',
    ],
  },
] as const

export const FLEET = [
  { name: 'Penggerak Utama (Treler)', units: 26, image: '/vehicles/treler.png' },
  { name: 'Lori Rigid - Sampah', units: 25, image: '/vehicles/rigid.png' },
  { name: 'Eurostar Mini Tractor Grabber', units: 24, image: '/vehicles/eurostar.png' },
  { name: 'Bonded', units: 4, image: null },
  { name: 'Kubota', units: 10, image: null },
  { name: 'Ursus', units: 2, image: null },
  { name: 'Excavator', units: 6, image: null },
  { name: 'Backhoe', units: 3, image: null },
  { name: 'Pickup 4x4', units: 10, image: null },
  { name: 'Lain-lain', units: 5, image: null },
] as const

export const GROUP = [
  'Perniagaan Insan Permai',
  'MZ Ho Enterprise',
  'Laman Desaru Bistro',
  'Rezeki IQ Farming Sdn Bhd',
  'Sejuta Rezeki Nor Enterprise',
  'Lilyho Holiday Travel & Travel Sdn Bhd',
] as const

export const CLIENTS = [
  { file: 'jpj.png', name: 'JPJ (Jabatan Pengangkutan Jalan)' },
  { file: 'kulim.png', name: 'Kulim (Malaysia) Berhad' },
  { file: 'jkr.png', name: 'JKR (Jabatan Kerja Raya)' },
  { file: 'kpdnkk.png', name: 'KPDNKK (Kementerian Perdagangan Dalam Negeri, Koperasi dan Kepenggunaan)' },
  { file: 'southern-reef.png', name: 'Southern Reef' },
  { file: 'tradewinds.png', name: 'Tradewinds Plantation Berhad' },
  { file: 'kejora.png', name: 'KEJORA (Lembaga Kemajuan Johor Tenggara)' },
  { file: 'mp-pengarang.png', name: 'Majlis Perbandaran Pengerang' },
  { file: 'hsb.png', name: 'HSB' },
  { file: 'desaru-mini-zoo.png', name: 'Desaru Mini Zoo' },
  { file: 'pln.png', name: 'PLN (Perusahaan Listrik Negara)' },
  { file: 'jpg.png', name: 'Johor Plantations Group Berhad' },
  { file: 'hard-rock.png', name: 'Hard Rock Hotel Desaru Coast' },
  { file: 'antara.png', name: 'Anantara Vacation Club / Anantara Desaru Coast Resort & Villas' },
  { file: 'yp-plantation.png', name: 'YP Plantation Holdings Sdn. Bhd.' },
  { file: 'tunamaya.png', name: 'Tunamaya Beach & Spa Resort' },
  { file: 'lotus-desaru.png', name: 'Lotus Desaru Beach Resort & Spa' },
  { file: 'dash.png', name: 'Dash Outdoors' },
  { file: 'desaru-coast.png', name: 'Desaru Coast' },
] as const

export const WORKSHOPS = [
  { name: 'Bengkel Utama', lines: ['Jalan Tanjung Balau,', 'Bandar Penawar', '81930, Kota Tinggi', 'Johor'] },
  { name: 'Bengkel Ladang Sedenak', lines: ['Sedenak Estate', 'K.B. 124, Kulai', '81900, Johor', 'Malaysia'] },
  { name: 'Bengkel Ladang Palong', lines: ['Palong Estate', 'K.B 530, Segamat', '85009, Johor', 'Malaysia'] },
  { name: 'Bengkel Ladang UMAC', lines: ['P.O Box 31, Bandar Tun Razak', '26900, Pahang Darul Makmur', 'Malaysia'] },
  { name: 'Bengkel Ladang Pasir Logok', lines: ['K.B 504, Kota Tinggi', '81909, Johor', 'Malaysia'] },
  { name: 'Bengkel Ladang Sungai Papan', lines: ['Peti Surat 15, Bandar Penawar', '81930 Kota Tinggi', 'Johor'] },
] as const

export const QUOTE =
  'Nama Sungai Rezeki berasal daripada sebuah ladang yang bernama Ladang Sungai Papan iaitu ladang milik Kulim Malaysia Berhad, yang kini dikenali sebagai Johor Plantation Berhad (JPB) anak syarikat Johor Corporation (JCorp). Ladang ini bukan sekadar lokasi biasa; ia merupakan tempat saya dibesarkan dan menerima pendidikan awal. Seawal usia 16 tahun, sewaktu di bangku persekolahan, saya mula mendalami dunia perladangan secara langsung, segalanya bermula di Ladang Sungai Papan. Perjalanan ini bermula dengan asas yang sederhana — diasaskan di tanah yang telah membentuk saya sejak kecil. Dari kehidupan di tengah-tengah barisan tanaman hingga mempelajari nilai kerja keras pada usia muda, pengalaman ini menjadi pemangkin kepada pertumbuhan yang lebih besar. Kisah ini bukan sekadar tentang permulaan yang kecil, tetapi juga tentang bagaimana usaha dan dedikasi mampu mengubah sesuatu yang sederhana menjadi pencapaian yang bermakna. Ia mencerminkan peluang yang hadir dalam bentuk yang tidak dijangka — bahawa rezeki sentiasa mengalir bagi mereka yang berusaha mencarinya dengan tekad dan kesungguhan.'
