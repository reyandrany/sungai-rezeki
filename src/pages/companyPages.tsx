import { useMemo, useState } from 'react'
import { ArrowUpRight, CheckCircle2, MapPin } from 'lucide-react'
import { ESTATE_PROJECTS } from '../content/projects.ts'
import { COMPANY } from '../content/site.ts'
import {
  CLIENTS,
  FLEET,
  GROUP,
  LEADERS,
  QUOTE,
  SERVICES,
  UNITS,
  WORKSHOPS,
  mapHref,
  media,
} from '../content/catalog.ts'
import { BUTTON_PRIMARY, CARD_SURFACE, FOCUS_RING, INPUT_CLASS, PageFrame, SectionHeading } from '../components/ui.tsx'

export function AboutPage() {
  return (
    <PageFrame tone="white">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-xl lg:mx-0">
          <img
            src={media('/sawit.jpg')}
            alt="Kawasan ladang sawit"
            width={1200}
            height={1500}
            className="aspect-[4/5] w-full rounded-[1.75rem] object-cover shadow-[0_28px_60px_-28px_rgb(15_23_42/0.55)] sm:aspect-[4/3] lg:aspect-[4/5]"
          />
          <div className={`${CARD_SURFACE} absolute -bottom-6 left-4 max-w-xs p-5 sm:left-8 sm:-bottom-8`}>
            <p className="text-xs font-extrabold tracking-[0.16em] text-amber-600 uppercase">Pendaftaran</p>
            <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">{COMPANY.registration}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{COMPANY.registrar}</p>
          </div>
        </div>
        <div className="pt-8 lg:pt-0">
          <SectionHeading
            as="h1"
            eyebrow="Tentang kami"
            title="Dari Ladang Sungai Papan ke operasi hari ini."
            description="Sungai Rezeki Sdn Bhd (SRSB) adalah syarikat pemilikan 100% Bumiputera Negeri Johor yang berdaftar dengan Kementerian Kewangan Malaysia dan berpengalaman lebih 20 tahun mengurus ladang sawit."
          />
        </div>
      </div>

      <div className="mt-24 grid gap-5 lg:grid-cols-2">
        <article className={`${CARD_SURFACE} p-7 sm:p-8`}>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Misi</h2>
          <p className="mt-4 text-pretty leading-7 text-slate-600">
            Kami beriltizam untuk menjalin kerjasama strategik dengan syarikat-syarikat Bumiputera dalam
            industri logistik dan pengangkutan, sebagai usaha memperkukuh jaringan perniagaan serta
            membuktikan bahawa syarikat Bumiputera mampu bersaing secara kompetitif. Usaha ini turut
            disasarkan untuk memberi impak positif kepada masyarakat melalui penciptaan peluang pekerjaan
            dan menyokong pertumbuhan ekonomi tempatan.
          </p>
          <p className="mt-4 text-pretty leading-7 text-slate-600">
            Selaras dengan slogan “Mekanisasi Solusi Kehadapan”, tumpuan kami ialah inovasi dalam mekanisasi
            dan penyelesaian logistik yang lebih cekap serta mampan — perkhidmatan yang lebih responsif,
            sistematik dan bernilai tambah.
          </p>
        </article>
        <article className={`${CARD_SURFACE} p-7 sm:p-8`}>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Visi</h2>
          <p className="mt-4 text-pretty leading-7 text-slate-600">
            Menjadi peneraju utama dalam industri logistik dan pengangkutan, dikenali atas kecemerlangan
            perkhidmatan yang menepati piawaian kualiti tertinggi. Menjadi rakan logistik pilihan dengan
            mengutamakan kecekapan operasi, keselamatan, kebolehpercayaan serta pematuhan kepada standard
            industri yang ketat.
          </p>
          <p className="mt-4 text-pretty leading-7 text-slate-600">
            Kami komited menerapkan teknologi terkini dan memantapkan kemahiran tenaga kerja supaya
            perkhidmatan kekal relevan, inovatif dan kompetitif — asas kepada industri logistik yang lebih
            progresif, mampan dan berimpak tinggi.
          </p>
        </article>
      </div>

      <div className="mt-20">
        <SectionHeading
          eyebrow="Pasukan"
          title="Barisan peneraju"
          description={`Carta organisasi merangkumi ${UNITS.join(', ')}.`}
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERS.map((person) => (
            <li key={person.name} className={`overflow-hidden ${CARD_SURFACE}`}>
              {person.photo ? (
                <img
                  src={media(person.photo)}
                  alt={`${person.name}, ${person.role}`}
                  width={640}
                  height={800}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              ) : (
                <div className="grid aspect-[4/5] place-items-center bg-slate-900 text-5xl font-extrabold text-amber-500">
                  {person.name.slice(0, 1)}
                </div>
              )}
              <div className="px-5 py-5">
                <p className="text-lg leading-snug font-extrabold text-slate-900">{person.name}</p>
                <p className="mt-1 text-sm font-semibold text-amber-700">{person.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <blockquote className="mt-16 rounded-[1.75rem] bg-slate-900 px-6 py-10 text-white sm:px-10 sm:py-12">
        <p className="text-xs font-extrabold tracking-[0.2em] text-amber-400 uppercase">Chief Executive Officer</p>
        <p className="mt-5 max-w-4xl text-pretty text-lg leading-8 text-slate-200">{QUOTE}</p>
        <footer className="mt-6 text-sm font-bold text-white">Jamaludin Bin Kamal Ho</footer>
      </blockquote>
    </PageFrame>
  )
}

export function ServicesPage() {
  return (
    <PageFrame>
      <SectionHeading
        as="h1"
        eyebrow="Servis kami"
        title="Lima bidang, satu rantaian kerja."
        description="Persawitan, agrikultur, feri, makanan dan kerja sivil — diurus sebagai satu operasi."
      />
      <div className="mt-12 grid gap-6">
        {SERVICES.map((service, index) => (
          <article
            id={service.id}
            key={service.id}
            className={`scroll-mt-28 overflow-hidden lg:grid lg:grid-cols-2 ${CARD_SURFACE}`}
          >
            <figure className="relative min-h-72 bg-slate-200 lg:min-h-full">
              <img
                src={media(service.image)}
                alt={service.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
            </figure>
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-extrabold tracking-[0.16em] text-amber-600 uppercase">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">{service.title}</h2>
              <ul className="mt-6 grid gap-2">
                {service.tasks.map((task) => (
                  <li key={task} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-amber-600" aria-hidden="true" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
              {service.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="mt-4 text-pretty leading-7 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </PageFrame>
  )
}

export function ProjectsPage() {
  const [estate, setEstate] = useState('Semua ladang')
  const [work, setWork] = useState('Semua jenis')
  const [query, setQuery] = useState('')
  const estates = useMemo(
    () => ['Semua ladang', ...new Set(ESTATE_PROJECTS.map((project) => project.estate))],
    [],
  )
  const works = useMemo(
    () => ['Semua jenis', ...new Set(ESTATE_PROJECTS.map((project) => project.work))],
    [],
  )
  const projects = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return ESTATE_PROJECTS.filter((project) => {
      if (estate !== 'Semua ladang' && project.estate !== estate) return false
      if (work !== 'Semua jenis' && project.work !== work) return false
      if (!needle) return true
      return `${project.estate} ${project.block} ${project.work}`.toLowerCase().includes(needle)
    })
  }, [estate, query, work])

  return (
    <PageFrame>
      <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionHeading
          as="h1"
          eyebrow="Projek"
          title="Daftar 105 projek."
          description="Semua entri di bawah diambil daripada daftar projek syarikat. Pelanggan bagi senarai ini ialah Johor Plantation Group. Jumlah hektar naungan yang diisytiharkan: 21,196.49."
        />
        <figure className="relative min-h-52 overflow-hidden rounded-[1.75rem] bg-slate-200">
          <img
            src={media('/home-project.jpg')}
            alt="Kerja projek di ladang"
            width={1400}
            height={900}
            className="absolute inset-0 size-full object-cover"
          />
        </figure>
      </div>

      <form
        className={`mt-10 grid gap-4 p-4 sm:grid-cols-3 sm:p-5 ${CARD_SURFACE}`}
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="text-sm font-bold text-slate-900">
          Ladang
          <select
            value={estate}
            onChange={(event) => setEstate(event.target.value)}
            className={`${INPUT_CLASS} cursor-pointer`}
          >
            {estates.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-bold text-slate-900">
          Jenis kerja
          <select
            value={work}
            onChange={(event) => setWork(event.target.value)}
            className={`${INPUT_CLASS} cursor-pointer`}
          >
            {works.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-bold text-slate-900">
          Cari blok atau ladang
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Contoh: P04"
            className={INPUT_CLASS}
          />
        </label>
      </form>
      <p className="mt-4 text-sm font-semibold text-slate-500" aria-live="polite">
        Menunjukkan {projects.length} daripada {ESTATE_PROJECTS.length} projek.
      </p>

      {projects.length === 0 ? (
        <p className={`mt-6 px-5 py-8 text-slate-600 ${CARD_SURFACE}`}>
          Tiada projek yang sepadan. Kosongkan carian atau pilih “Semua ladang”.
        </p>
      ) : (
        <div className={`mt-4 overflow-x-auto ${CARD_SURFACE}`}>
          <table className="w-full min-w-[720px] border-collapse text-left">
            <caption className="sr-only">
              Daftar projek Sungai Rezeki mengikut ladang, blok, jenis kerja dan keluasan
            </caption>
            <thead className="bg-slate-900 text-white">
              <tr>
                {['Ladang', 'Blok', 'Jenis kerja', 'Hektar'].map((heading) => (
                  <th key={heading} scope="col" className="px-4 py-3 text-xs font-extrabold tracking-[0.14em] uppercase">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={`${project.estate}-${project.block}-${project.work}`} className="border-t border-slate-200">
                  <th scope="row" className="px-4 py-3 font-bold text-slate-900">
                    {project.estate}
                  </th>
                  <td className="px-4 py-3 font-semibold text-slate-800 tabular-nums">{project.block}</td>
                  <td className="px-4 py-3 text-slate-600">{project.work}</td>
                  <td className="px-4 py-3 font-bold text-amber-700 tabular-nums">
                    {project.hectares === 'N/A' ? 'N/A' : `${project.hectares} Ha`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageFrame>
  )
}

export function FleetPage() {
  const photographed = FLEET.filter((item) => item.image !== null)

  return (
    <PageFrame>
      <SectionHeading
        as="h1"
        eyebrow="Aset kenderaan"
        title="115 aset kenderaan."
        description="Armada yang menyokong pengangkutan hasil, kerja ladang dan operasi bengkel."
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-3">
        {photographed.map((item) => (
          <li key={item.name} className={`overflow-hidden ${CARD_SURFACE}`}>
            <img
              src={media(item.image ?? '')}
              alt={item.name}
              width={900}
              height={600}
              loading="lazy"
              className="aspect-[3/2] w-full bg-slate-100 object-cover"
            />
            <div className="flex items-end justify-between gap-3 px-5 py-5">
              <p className="text-base leading-snug font-extrabold text-slate-900">{item.name}</p>
              <p className="text-3xl leading-none font-extrabold text-amber-600 tabular-nums">{item.units}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={`mt-8 overflow-hidden ${CARD_SURFACE}`}>
        <table className="w-full border-collapse">
          <caption className="sr-only">Senarai penuh aset kenderaan dan bilangan unit</caption>
          <tbody>
            {FLEET.map((item) => (
              <tr key={item.name} className="border-t border-slate-200 first:border-t-0">
                <th scope="row" className="px-5 py-4 text-left font-bold text-slate-900">
                  {item.name}
                </th>
                <td className="px-5 py-4 text-right text-2xl font-extrabold text-amber-600 tabular-nums">
                  {item.units}
                  <span className="ml-2 text-sm font-semibold text-slate-500">unit</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageFrame>
  )
}

export function GroupPage() {
  return (
    <PageFrame tone="white">
      <SectionHeading
        as="h1"
        eyebrow="Anak syarikat"
        title="Enam entiti kumpulan."
        description="Perniagaan yang beroperasi di bawah payung Sungai Rezeki Sdn Bhd."
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GROUP.map((name, index) => (
          <li key={name} className={`p-6 ${CARD_SURFACE}`}>
            <p className="text-xs font-extrabold tracking-[0.16em] text-amber-600 tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </p>
            <h2 className="mt-4 text-xl leading-snug font-extrabold text-slate-900">{name}</h2>
          </li>
        ))}
      </ul>

      <section id="pelanggan" className="mt-20 scroll-mt-28 border-t border-slate-200 pt-16">
        <SectionHeading
          eyebrow="Pelanggan kami"
          title="Pelanggan yang sudah bersama kami."
          description="Agensi kerajaan, perladangan, hotel dan organisasi yang tercatat dalam senarai pelanggan syarikat."
        />
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CLIENTS.map((client) => (
            <li
              key={client.file}
              className={`flex min-h-40 flex-col items-center justify-center gap-4 px-4 py-6 ${CARD_SURFACE}`}
            >
              <img
                src={media(`/clients/${client.file}`)}
                alt={client.name}
                width={220}
                height={80}
                loading="lazy"
                className="max-h-14 w-auto max-w-[9.5rem] object-contain"
              />
              <span className="text-center text-xs leading-snug font-semibold text-slate-500">{client.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </PageFrame>
  )
}

export function ContactPage() {
  return (
    <PageFrame tone="white">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <SectionHeading
            as="h1"
            eyebrow="Hubungi kami"
            title="Pejabat dan bengkel."
            description="Lawati pejabat di Bandar Penawar, atau bengkel yang terdekat dengan ladang."
          />
          <address className={`mt-8 p-6 not-italic sm:p-7 ${CARD_SURFACE}`}>
            <span className="grid size-12 place-items-center rounded-xl bg-slate-900 text-amber-500">
              <MapPin size={22} aria-hidden="true" />
            </span>
            <p className="mt-5 text-lg font-extrabold text-slate-900">{COMPANY.legalName}</p>
            <p className="mt-2 max-w-[32ch] text-pretty leading-7 text-slate-600">{COMPANY.address}</p>
            <a href={mapHref(COMPANY.address)} className={`mt-5 ${BUTTON_PRIMARY}`}>
              Buka peta pejabat
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </address>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {WORKSHOPS.map((workshop) => {
            const address = [workshop.name, ...workshop.lines].join(', ')
            return (
              <li key={workshop.name} className={`p-5 ${CARD_SURFACE}`}>
                <h2 className="text-lg leading-snug font-extrabold text-slate-900">{workshop.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {workshop.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <a
                  href={mapHref(address)}
                  className={`mt-4 inline-flex min-h-11 cursor-pointer items-center gap-1 text-sm font-bold text-amber-700 underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-amber-800 ${FOCUS_RING}`}
                >
                  Buka peta
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </PageFrame>
  )
}
