import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ChevronRight, HardHat, Leaf, Anchor, Construction, ShieldCheck, UtensilsCrossed, Sprout } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { COMPANY, SITE } from '../content/site.ts'
import { LEDGER, SERVICES, media } from '../content/catalog.ts'
import { BUTTON_PRIMARY, BUTTON_SECONDARY, CARD_SURFACE, FOCUS_RING, SectionHeading } from './ui.tsx'

const ICONS: Record<(typeof SERVICES)[number]['id'], LucideIcon> = {
  persawitan: Leaf,
  agrikultur: Sprout,
  pelancongan: Anchor,
  makanan: UtensilsCrossed,
  'lain-lain': Construction,
}

const HIGHLIGHTS = [
  'Lebih 20 tahun mengurus ladang sawit',
  'Berdaftar Kementerian Kewangan Malaysia',
  'Pejabat di Bandar Penawar, Johor',
]

export default function LandingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-50 pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute -top-48 -right-48 size-[35rem] rounded-full bg-amber-100/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="min-w-0">
            <p className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-extrabold tracking-[0.12em] text-amber-800 uppercase">
              <ShieldCheck size={16} className="shrink-0" aria-hidden="true" />
              <span className="min-w-0 break-words">{COMPANY.registration} · Bumiputera Johor</span>
            </p>
            <h1 className="text-balance text-[2.5rem] leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-[4.25rem]">
              {SITE.motto.split(' ').slice(0, 1).join(' ')}{' '}
              <span className="text-amber-600">{SITE.motto.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-slate-600 sm:text-xl">
              {COMPANY.ownership}. Berdaftar dengan {COMPANY.registrar}. {COMPANY.experience}.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/hubungi" className={BUTTON_PRIMARY}>
                Hubungi pejabat
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/projek" className={BUTTON_SECONDARY}>
                Buka daftar projek
                <ChevronRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="shrink-0 text-amber-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[610px] lg:mx-0">
            <div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] border border-amber-300/70" />
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-slate-200 shadow-[0_28px_60px_-28px_rgb(15_23_42/0.6)] sm:aspect-[4/4.2]">
              <img
                src={media('/hero.jpg')}
                alt="Gambar utama Sungai Rezeki Sdn Bhd"
                width={1400}
                height={1600}
                fetchPriority="high"
                className="size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-center gap-4 rounded-2xl border border-white/20 bg-slate-900/85 p-4 text-white backdrop-blur sm:inset-x-7 sm:bottom-7 sm:p-5">
                <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-xl bg-amber-500 text-slate-900">
                  <HardHat size={24} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold tracking-[0.15em] text-amber-400 uppercase">{COMPANY.addressLocality}</p>
                  <p className="mt-1 text-sm leading-snug font-bold sm:text-base">{COMPANY.experience}</p>
                </div>
              </div>
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

      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Servis kami"
            title="Lima bidang, satu rantaian kerja."
            description="Persawitan, agrikultur, feri, makanan dan kerja sivil — diurus sebagai satu operasi."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => {
              const Icon = ICONS[service.id]
              return (
                <li key={service.id}>
                  <Link
                    to={`/servis#${service.id}`}
                    className={`group flex h-full cursor-pointer flex-col p-6 transition duration-200 hover:border-amber-300 hover:shadow-[0_24px_60px_-28px_rgb(15_23_42/0.55)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none ${CARD_SURFACE} ${FOCUS_RING}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-900 text-amber-500">
                        <Icon size={22} />
                      </span>
                      <span className="text-xs font-extrabold text-slate-400 tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-7 text-xl leading-snug font-extrabold text-slate-900">{service.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{service.tasks.join(' · ')}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}
