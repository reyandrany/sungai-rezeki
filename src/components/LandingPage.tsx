import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { COMPANY, SITE } from '../content/site.ts'
import { CLIENTS, FLEET, GROUP, LEDGER, SERVICES, media } from '../content/catalog.ts'
import { ESTATE_PROJECTS } from '../content/projects.ts'
import { BUTTON_PRIMARY, BUTTON_SECONDARY, CARD_SURFACE, FOCUS_RING, SectionHeading } from './ui.tsx'

const featuredProjects = ['P04', 'P06', 'P10']
  .map((block) =>
    ESTATE_PROJECTS.find(
      (project) =>
        project.work === 'HARVESTING' && project.estate === 'Ladang Sungai Papan' && project.block === block,
    ),
  )
  .filter((project) => project !== undefined)

const photographedFleet = FLEET.filter((item) => item.image !== null)

export default function LandingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-50 pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute -top-48 -right-48 size-[35rem] rounded-full bg-amber-100/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="min-w-0">
            <p className="mb-4 text-xs font-extrabold tracking-[0.2em] text-amber-600 uppercase">
              {COMPANY.registration} · {COMPANY.addressLocality}
            </p>
            <h1 className="text-balance text-[2.5rem] leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-[4.25rem]">
              Mekanisasi <span className="text-amber-600">Solusi Kehadapan</span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-slate-600">
              {COMPANY.ownership}. {COMPANY.experience}, dari pejabat di {COMPANY.addressLocality}, Johor.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/hubungi" className={BUTTON_PRIMARY}>
                Hubungi pejabat
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/projek" className={BUTTON_SECONDARY}>
                Daftar projek
                <ChevronRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[610px] lg:mx-0">
            <div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] border border-amber-300/70" />
            <div className="hero-reveal relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-slate-200 shadow-[0_28px_60px_-28px_rgb(15_23_42/0.6)] sm:aspect-[4/4.2]">
              <img
                src={media('/hero.jpg')}
                alt="Ladang sawit di bawah naungan Sungai Rezeki"
                width={1400}
                height={1600}
                fetchPriority="high"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Angka syarikat" className="bg-slate-900">
        <div className="mx-auto grid max-w-[1280px] divide-y divide-slate-700 px-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-8">
          {LEDGER.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex cursor-pointer items-center justify-center gap-4 px-3 py-8 hover:bg-white/5 ${FOCUS_RING} focus-visible:ring-offset-slate-900`}
            >
              <strong className="text-3xl font-extrabold tracking-tight text-amber-500 tabular-nums sm:text-4xl">
                {item.value}
              </strong>
              <span className="max-w-28 text-sm leading-snug font-bold text-slate-300">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Servis"
              title="Lima bidang operasi."
              description="Ringkasan sahaja. Skop, laluan, dan perenggan penuh ada di halaman servis."
            />
            <Link to="/servis" className={BUTTON_SECONDARY}>
              Halaman servis
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <Link
                  to={`/servis#${service.id}`}
                  className={`group flex h-full cursor-pointer flex-col overflow-hidden transition duration-200 hover:border-amber-300 motion-safe:hover:-translate-y-1 motion-reduce:transition-none ${CARD_SURFACE} ${FOCUS_RING}`}
                >
                  <img
                    src={media(service.image)}
                    alt={service.alt}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-slate-900">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{service.tasks[0]}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <img
            src={media('/sawit.jpg')}
            alt="Kawasan ladang sawit"
            width={1200}
            height={900}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-[1.75rem] object-cover"
          />
          <div>
            <SectionHeading
              eyebrow="Tentang kami"
              title={SITE.motto}
              description={`${COMPANY.legalName} berdaftar dengan ${COMPANY.registrar}. Misi, visi, dan barisan peneraju ada di halaman tentang kami.`}
            />
            <Link to="/tentang-kami" className={`mt-8 ${BUTTON_PRIMARY}`}>
              Halaman tentang kami
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div className="relative min-h-72 overflow-hidden rounded-[1.75rem] bg-slate-200">
            <img
              src={media('/home-project.jpg')}
              alt="Kerja projek di ladang"
              width={1400}
              height={900}
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Projek"
              title="Tiga blok di Ladang Sungai Papan."
              description="Contoh penuaian. Daftar penuh 105 projek, dengan tapisan ladang dan jenis kerja, ada di halaman projek."
            />
            <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              {featuredProjects.map((project) => (
                <li key={project.block} className="flex items-baseline justify-between gap-4 py-4">
                  <span className="font-extrabold text-slate-900">
                    {project.estate} · {project.block}
                  </span>
                  <span className="shrink-0 font-bold text-amber-700 tabular-nums">{project.hectares} Ha</span>
                </li>
              ))}
            </ul>
            <Link to="/projek" className={`mt-8 ${BUTTON_SECONDARY}`}>
              Halaman projek
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Aset kenderaan"
              title="Tiga armada yang bergambar."
              description="Treler, lori rigid, dan Eurostar. Sepuluh kategori yang berjumlah 115 unit ada di halaman aset."
            />
            <Link to="/aset-kenderaan" className={BUTTON_SECONDARY}>
              Halaman aset
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-3">
            {photographedFleet.map((item) => (
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
                  <h3 className="text-base leading-snug font-extrabold text-slate-900">{item.name}</h3>
                  <p className="shrink-0 text-sm font-bold text-amber-700">{item.units}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Kumpulan"
              title="Enam entiti, dan pelanggan yang bersama kami."
              description="Logo sahaja di sini. Nama penuh setiap pelanggan ada di halaman anak syarikat."
            />
            <Link to="/anak-syarikat" className={BUTTON_SECONDARY}>
              Halaman anak syarikat
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {GROUP.map((name) => (
              <li key={name} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-800">
                {name}
              </li>
            ))}
          </ul>
          <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {CLIENTS.map((client) => (
              <li key={client.file} className={`grid min-h-24 place-items-center px-3 py-4 ${CARD_SURFACE}`}>
                <img
                  src={media(`/clients/${client.file}`)}
                  alt={client.name}
                  width={160}
                  height={64}
                  loading="lazy"
                  className="max-h-10 w-auto max-w-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-extrabold tracking-[0.2em] text-amber-400 uppercase">Pejabat</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">{COMPANY.addressLocality}</h2>
            <p className="mt-4 max-w-md text-slate-300">{COMPANY.address}</p>
            <p className="mt-3 text-sm text-slate-400">Enam bengkel disenaraikan di halaman hubungi.</p>
          </div>
          <Link to="/hubungi" className={BUTTON_PRIMARY}>
            Halaman hubungi
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
