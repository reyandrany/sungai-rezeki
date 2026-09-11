import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import {
  Anchor,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Construction,
  Eye,
  HardHat,
  Leaf,
  MapPin,
  Menu,
  Phone,
  Pickaxe,
  Send,
  ShieldCheck,
  Target,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*  Company data                                                              */
/* -------------------------------------------------------------------------- */

type SectionId = 'home' | 'services' | 'about' | 'projects' | 'contact'

interface NavItem {
  label: string
  id: SectionId
}

interface Stat {
  value: number
  suffix: string
  label: string
}

interface Service {
  icon: LucideIcon
  title: string
  description: string
}

interface Project {
  title: string
  category: string
  description: string
  image: string
}

interface ContactDetail {
  icon: LucideIcon
  label: string
  value: string
  href?: string
}

const COMPANY = {
  legalName: 'Sungai Rezeki Sdn Bhd',
  address:
    'No 20/02, Jalan Cengal 1, Taman Desaru Utama, 81930 Bandar Penawar, Kota Tinggi, Johor',
  hours: 'Mon – Fri: 8:00 AM – 5:00 PM (Lunch: 1:00 PM – 2:00 PM) | Sat: 8:00 AM – 2:00 PM',
  // Verified public sources list the registered office but no current corporate
  // line. Add the confirmed numbers here; the layout adapts to either state.
  phones: [] as string[],
} as const

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

const STATS: Stat[] = [
  { value: 30, suffix: '+', label: 'Years Of Group Track Record' },
  { value: 500, suffix: '+', label: 'Completed Projects' },
  { value: 50, suffix: '+', label: 'Heavy Machinery Fleet' },
]

const SERVICES: Service[] = [
  {
    icon: Construction,
    title: 'Civil Engineering & Construction',
    description:
      'Building foundations, earthworks and infrastructure delivery engineered for demanding industrial sites.',
  },
  {
    icon: Pickaxe,
    title: 'Excavation & Mining',
    description:
      'Gold, stone and sand extraction carried out by experienced operators with heavy-duty equipment.',
  },
  {
    icon: Leaf,
    title: 'Agriculture Logistics',
    description:
      'Palm oil harvesting, estate operations and transport planned around dependable supply movement.',
  },
  {
    icon: Anchor,
    title: 'Maritime & Ferry Services',
    description:
      'Ferry services operated in cooperation with Berjaya Waterfront City for reliable coastal connectivity.',
  },
]

const PROJECTS: Project[] = [
  {
    title: 'Bahau Infrastructure Development',
    category: 'Civil Infrastructure',
    description: 'Site preparation, drainage and access road works.',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Bangi Civil Works',
    category: 'Engineering & Construction',
    description: 'Foundation and structural civil works packages.',
    image:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Waterfront Ferry Logistics',
    category: 'Maritime Operations',
    description: 'Passenger and cargo ferry operations support.',
    image:
      'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=85',
  },
]

const CONTACT_DETAILS: ContactDetail[] = [
  { icon: MapPin, label: 'Registered office', value: COMPANY.address },
  { icon: Clock3, label: 'Working hours', value: COMPANY.hours },
  ...(COMPANY.phones.length > 0
    ? COMPANY.phones.map((phone) => ({
        icon: Phone,
        label: 'Telephone',
        value: phone,
        href: `tel:${phone.replace(/[^+\d]/g, '')}`,
      }))
    : []),
]

/* -------------------------------------------------------------------------- */
/*  Shared styling tokens                                                     */
/* -------------------------------------------------------------------------- */

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white'

const BUTTON_PRIMARY = `inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 shadow-[0_10px_25px_-12px_rgb(245_158_11/0.9)] transition-colors duration-200 hover:bg-amber-400 motion-safe:active:translate-y-px motion-reduce:transition-none ${FOCUS_RING}`

const BUTTON_SECONDARY = `inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-50 motion-reduce:transition-none ${FOCUS_RING}`

const CARD_SURFACE =
  'rounded-2xl border border-slate-200 bg-white shadow-[0_12px_30px_-24px_rgb(15_23_42/0.45)]'

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                     */
/* -------------------------------------------------------------------------- */

function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return prefersReduced
}

/** Tracks which section is in view so navigation can mark the current link. */
function useActiveSection(ids: SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(ids[0] ?? 'home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          setActive(visible.target.id as SectionId)
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0.01, 0.25, 0.5] },
    )

    for (const id of ids) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [ids])

  return active
}

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                */
/* -------------------------------------------------------------------------- */

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a
      href="#home"
      aria-label={`${COMPANY.legalName} — back to top`}
      className={`flex min-w-0 cursor-pointer items-center gap-3 rounded-lg ${FOCUS_RING} ${
        inverse ? 'focus-visible:ring-offset-slate-900' : ''
      }`}
    >
      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-500 text-sm font-extrabold tracking-tight text-slate-900"
      >
        SR
      </span>
      <span className="min-w-0">
        <span
          className={`block truncate text-sm font-extrabold leading-tight sm:text-base ${
            inverse ? 'text-white' : 'text-slate-900'
          }`}
        >
          Sungai Rezeki
        </span>
        <span
          className={`block text-[10px] font-bold uppercase tracking-[0.2em] ${
            inverse ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          Sdn Bhd
        </span>
      </span>
    </a>
  )
}

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: string
  inverse?: boolean
}

function SectionHeading({ eyebrow, title, description, inverse = false }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-600">
        {eyebrow}
      </p>
      <h2
        className={`text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          inverse ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-pretty leading-7 ${inverse ? 'text-slate-300' : 'text-slate-600'}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Header                                                                    */
/* -------------------------------------------------------------------------- */

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), [])
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-19 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? 'page' : undefined}
                className={`block cursor-pointer rounded-lg px-4 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 motion-reduce:transition-none ${FOCUS_RING} ${
                  activeSection === item.id ? 'text-amber-600' : 'text-slate-600'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a href="#contact" className={BUTTON_PRIMARY}>
              Get a Quote
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </li>
        </ul>

        <button
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className={`grid size-12 cursor-pointer place-items-center rounded-xl border border-slate-200 bg-white text-slate-900 transition-colors hover:bg-slate-50 motion-reduce:transition-none lg:hidden ${FOCUS_RING}`}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        hidden={!menuOpen}
        className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 shadow-lg lg:hidden"
      >
        <ul className="grid gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                aria-current={activeSection === item.id ? 'page' : undefined}
                className={`flex min-h-12 cursor-pointer items-center rounded-lg px-4 text-sm font-bold hover:bg-slate-100 ${FOCUS_RING} ${
                  activeSection === item.id ? 'text-amber-600' : 'text-slate-700'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className={`mt-3 w-full ${BUTTON_PRIMARY}`}
        >
          Get a Quote
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero() {
  const highlights = ['Years of core experience', 'Multi-sector capability', 'Johor-based operations']

  return (
    <section
      id="home"
      className="relative scroll-mt-19 overflow-hidden bg-slate-50 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-48 size-[35rem] rounded-full bg-amber-100/70 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="min-w-0">
          <p className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-amber-800">
            <ShieldCheck size={16} className="shrink-0" aria-hidden="true" />
            <span className="min-w-0 break-words">Trusted industrial partner since 2010</span>
          </p>

          <h1 className="text-balance text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-[4.25rem]">
            Building Infrastructure, <span className="text-amber-600">Powering Industries</span>{' '}
            Since 2010
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-slate-600 sm:text-xl">
            Integrated capability across civil engineering, excavation, palm oil logistics and
            maritime transport — delivered by teams built for demanding environments.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className={BUTTON_PRIMARY}>
              Discuss Your Project
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#services" className={BUTTON_SECONDARY}>
              Explore Capabilities
              <ChevronRight size={18} aria-hidden="true" />
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 size={17} className="shrink-0 text-amber-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[610px] lg:mx-0">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[2rem] border border-amber-300/70"
          />
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-slate-200 shadow-[0_28px_60px_-28px_rgb(15_23_42/0.6)] sm:aspect-[4/4.2]">
            <img
              src="https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=1400&q=90"
              alt="Excavator moving earth at a large civil engineering site"
              loading="eager"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"
            />
            <div className="absolute inset-x-5 bottom-5 flex items-center gap-4 rounded-2xl border border-white/20 bg-slate-900/85 p-4 text-white backdrop-blur sm:inset-x-7 sm:bottom-7 sm:p-5">
              <span
                aria-hidden="true"
                className="grid size-12 shrink-0 place-items-center rounded-xl bg-amber-500 text-slate-900"
              >
                <HardHat size={24} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-amber-400">
                  Built to deliver
                </p>
                <p className="mt-1 text-sm font-bold leading-snug sm:text-base">
                  Safety. Capability. Accountability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Stats                                                                     */
/* -------------------------------------------------------------------------- */

function StatCounter({ stat, animate }: { stat: Stat; animate: boolean }) {
  const [displayed, setDisplayed] = useState(animate ? 0 : stat.value)

  useEffect(() => {
    if (!animate) {
      setDisplayed(stat.value)
      return
    }

    let frame = 0
    const duration = 1100
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplayed(Math.round(stat.value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [animate, stat.value])

  return (
    <div className="flex items-center justify-center gap-4 py-8 sm:px-3">
      <strong className="text-4xl font-extrabold tracking-tight text-amber-500 tabular-nums lg:text-5xl">
        {displayed}
        {stat.suffix}
      </strong>
      <span className="max-w-28 text-sm font-bold leading-snug text-slate-300 lg:text-base">
        {stat.label}
      </span>
    </div>
  )
}

function Stats() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} aria-label="Company milestones" className="bg-slate-900">
      <div className="mx-auto grid max-w-[1280px] divide-y divide-slate-700 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
        {STATS.map((stat) => (
          <StatCounter
            key={stat.label}
            stat={stat}
            animate={inView && !prefersReducedMotion}
          />
        ))}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Services                                                                  */
/* -------------------------------------------------------------------------- */

function Services() {
  return (
    <section id="services" className="scroll-mt-19 bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Core capabilities"
          title="One partner across essential industrial operations."
          description="Experienced crews, maintained machinery and clear accountability at every phase of delivery."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <li key={service.title} className="min-w-0">
              <article
                className={`group h-full min-w-0 p-6 transition duration-200 motion-safe:hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_24px_60px_-28px_rgb(15_23_42/0.55)] motion-reduce:transition-none ${CARD_SURFACE}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-900 text-amber-500"
                  >
                    <service.icon size={22} />
                  </span>
                  <span className="text-xs font-extrabold text-slate-400 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-7 hyphens-auto break-words text-xl font-extrabold leading-snug text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-4 break-words text-sm leading-6 text-slate-600">
                  {service.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  About                                                                     */
/* -------------------------------------------------------------------------- */

function About() {
  const principles: { icon: LucideIcon; title: string; description: string }[] = [
    {
      icon: Eye,
      title: 'Our Vision',
      description:
        'To be a trusted, progressive partner powering infrastructure and essential industries across Malaysia.',
    },
    {
      icon: Target,
      title: 'Our Mission',
      description:
        'To deliver safe, dependable work through capable people, responsible operations and long-term client relationships.',
    },
  ]

  return (
    <section id="about" className="scroll-mt-19 bg-slate-50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85"
            alt="Engineers reviewing construction drawings on an industrial site"
            loading="lazy"
            className="aspect-4/3 w-full rounded-[1.75rem] object-cover shadow-[0_24px_60px_-28px_rgb(15_23_42/0.55)]"
          />
          <div className="relative -mt-12 ml-4 max-w-72 rounded-2xl border border-slate-700 bg-slate-900 p-5 text-white shadow-lg sm:ml-8">
            <Award className="mb-3 text-amber-500" aria-hidden="true" />
            <p className="font-extrabold">Rooted in experience</p>
            <p className="mt-1 text-sm leading-6 text-slate-300">
              Evolving alongside the industries we serve.
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <SectionHeading
            eyebrow="Our foundation"
            title="From a local enterprise to a multi-sector industrial partner."
          />
          <p className="mt-6 text-pretty leading-7 text-slate-600">
            The company began in 1993 as{' '}
            <strong className="font-bold text-slate-900">Perniagaan Insan Permai</strong>, built on
            dependable delivery and hands-on site discipline. That strong foundation carried the business
            into its formal incorporation as{' '}
            <strong className="font-bold text-slate-900">Sungai Rezeki Sdn Bhd</strong> in 2010, 
            founded by <strong className="font-bold text-slate-900">Mr. Jamaludin bin Kamal Ho</strong>. 
            Under his leadership, the company has broadened its capabilities across construction, excavation, 
            agriculture logistics and maritime transport while keeping the core values behind its reputation.
          </p>


          <ul className="mt-8 grid gap-4">
            {principles.map((principle) => (
              <li key={principle.title} className={`flex gap-4 p-5 ${CARD_SURFACE}`}>
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700"
                >
                  <principle.icon size={21} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-900">{principle.title}</h3>
                  <p className="mt-1 break-words text-sm leading-6 text-slate-600">
                    {principle.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Projects                                                                  */
/* -------------------------------------------------------------------------- */

function Projects() {
  return (
    <section id="projects" className="scroll-mt-19 bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Selected portfolio"
          title="Field-proven capability across sectors."
          description="Representative works spanning infrastructure delivery, civil engineering packages and transport logistics."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <li key={project.title}>
              <article className="group relative flex min-h-90 overflow-hidden rounded-2xl bg-slate-900">
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition duration-500 motion-safe:group-hover:scale-105 group-hover:opacity-70 motion-reduce:transform-none motion-reduce:transition-none"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/25 to-transparent"
                />
                <div className="relative mt-auto p-6 text-white">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-400">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-balance text-2xl font-extrabold leading-tight">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{project.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Contact                                                                   */
/* -------------------------------------------------------------------------- */

type FieldName = 'name' | 'company' | 'email' | 'phone' | 'service' | 'message'

type FormValues = Record<FieldName, string>

type FormErrors = Partial<Record<FieldName, string>>

const EMPTY_FORM: FormValues = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}

const FIELD_LABELS: Record<FieldName, string> = {
  name: 'Full name',
  company: 'Company',
  email: 'Work email',
  phone: 'Phone number',
  service: 'Service required',
  message: 'Project details',
}

const REQUIRED_MESSAGES: Record<FieldName, string> = {
  name: 'Enter your full name.',
  company: 'Enter your company or organisation name.',
  email: 'Enter your work email address.',
  phone: 'Enter a phone number we can reach you on.',
  service: 'Select the service you need.',
  message: 'Describe the project you need support with.',
}

function validateField(field: FieldName, value: string): string | undefined {
  const trimmed = value.trim()

  if (trimmed.length === 0) {
    return REQUIRED_MESSAGES[field]
  }

  if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
    return 'Enter a valid email address, for example name@company.com.'
  }

  if (field === 'phone' && !/^[+\d][\d\s()-]{6,}$/.test(trimmed)) {
    return 'Enter a reachable phone number, including country or area code.'
  }

  if (field === 'message' && trimmed.length < 20) {
    return 'Describe the project in at least 20 characters.'
  }

  return undefined
}

const INPUT_CLASS = `mt-2 block min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 transition-colors duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-100 aria-invalid:border-red-600 aria-invalid:ring-red-100 motion-reduce:transition-none`

function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const summaryRef = useRef<HTMLDivElement | null>(null)

  const setField = useCallback((field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }, [])

  const handleBlur = useCallback((field: FieldName) => {
    setValues((current) => {
      const message = validateField(field, current[field])
      setErrors((existing) => {
        const next = { ...existing }
        if (message) next[field] = message
        else delete next[field]
        return next
      })
      return current
    })
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: FormErrors = {}
    for (const field of Object.keys(EMPTY_FORM) as FieldName[]) {
      const message = validateField(field, values[field])
      if (message) nextErrors[field] = message
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false)
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }

    setSubmitted(true)
    setValues(EMPTY_FORM)
  }

  const errorEntries = Object.entries(errors) as [FieldName, string][]

  const describedBy = (field: FieldName): string | undefined =>
    errors[field] ? `${field}-error` : undefined

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-title"
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-28px_rgb(15_23_42/0.55)] sm:p-8"
    >
      <h3 id="contact-form-title" className="text-2xl font-extrabold text-slate-900">
        Request a project discussion
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Fields marked with an asterisk (*) are required.
      </p>

      {errorEntries.length > 0 ? (
        <div
          ref={summaryRef}
          role="alert"
          tabIndex={-1}
          aria-labelledby="contact-error-title"
          className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <h4 id="contact-error-title" className="text-sm font-extrabold text-red-900">
            There is a problem with {errorEntries.length}{' '}
            {errorEntries.length === 1 ? 'field' : 'fields'}
          </h4>
          <ul className="mt-2 grid gap-1 text-sm text-red-800">
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a
                  href={`#${field}`}
                  onClick={() => document.getElementById(field)?.focus()}
                  className={`cursor-pointer font-semibold underline ${FOCUS_RING}`}
                >
                  {FIELD_LABELS[field]}: {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {submitted ? (
        <p
          role="status"
          className="mt-5 flex gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm font-semibold text-emerald-900"
        >
          <CheckCircle2 size={20} className="shrink-0" aria-hidden="true" />
          Thank you — your enquiry has been recorded for the project team.
        </p>
      ) : null}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {(['name', 'company', 'email', 'phone'] as const).map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-bold text-slate-700">
              {FIELD_LABELS[field]} *
            </label>
            <input
              id={field}
              name={field}
              type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
              inputMode={field === 'phone' ? 'tel' : undefined}
              autoComplete={
                field === 'name'
                  ? 'name'
                  : field === 'company'
                    ? 'organization'
                    : field === 'email'
                      ? 'email'
                      : 'tel'
              }
              required
              value={values[field]}
              onChange={(event) => setField(field, event.target.value)}
              onBlur={() => handleBlur(field)}
              aria-invalid={errors[field] ? true : undefined}
              aria-describedby={describedBy(field)}
              placeholder={
                field === 'email'
                  ? 'name@company.com'
                  : field === 'phone'
                    ? '+60 7 000 0000'
                    : field === 'company'
                      ? 'Company or organisation'
                      : 'Your full name'
              }
              className={INPUT_CLASS}
            />
            {errors[field] ? (
              <p id={`${field}-error`} className="mt-2 text-sm font-semibold text-red-700">
                {errors[field]}
              </p>
            ) : null}
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor="service" className="block text-sm font-bold text-slate-700">
            {FIELD_LABELS.service} *
          </label>
          <select
            id="service"
            name="service"
            required
            value={values.service}
            onChange={(event) => setField('service', event.target.value)}
            onBlur={() => handleBlur('service')}
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={describedBy('service')}
            className={`${INPUT_CLASS} cursor-pointer`}
          >
            <option value="">Select a service</option>
            {SERVICES.map((service) => (
              <option key={service.title} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
          {errors.service ? (
            <p id="service-error" className="mt-2 text-sm font-semibold text-red-700">
              {errors.service}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-bold text-slate-700">
            {FIELD_LABELS.message} *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={values.message}
            onChange={(event) => setField('message', event.target.value)}
            onBlur={() => handleBlur('message')}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy('message')}
            placeholder="Project location, scope and expected timeline"
            className={INPUT_CLASS}
          />
          {errors.message ? (
            <p id="message-error" className="mt-2 text-sm font-semibold text-red-700">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <button type="submit" className={`mt-6 w-full sm:w-auto ${BUTTON_PRIMARY}`}>
        Send Enquiry
        <Send size={17} aria-hidden="true" />
      </button>
      <p className="mt-4 text-xs leading-5 text-slate-500">
        By submitting this form you consent to being contacted about this enquiry.
      </p>
    </form>
  )
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-19 bg-slate-100 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <div className="min-w-0">
          <SectionHeading
            eyebrow="Start a conversation"
            title="Bring us your next industrial challenge."
            description="Talk to our team about project requirements, operational support or long-term partnership."
          />

          <address className="mt-9 grid gap-4 not-italic">
            {CONTACT_DETAILS.map((detail) => (
              <div key={detail.label + detail.value} className={`flex gap-4 p-5 ${CARD_SURFACE}`}>
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-xl bg-slate-900 text-amber-500"
                >
                  <detail.icon size={20} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    {detail.label}
                  </p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className={`mt-1 block cursor-pointer break-words text-sm font-bold leading-6 text-slate-900 underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-amber-700 ${FOCUS_RING}`}
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="mt-1 break-words text-sm font-bold leading-6 text-slate-900">
                      {detail.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </address>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Logo inverse />
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
            Civil engineering, excavation and integrated logistics grounded in dependable Malaysian
            expertise.
          </p>
        </div>

        <nav aria-labelledby="footer-capabilities">
          <h2 id="footer-capabilities" className="text-sm font-extrabold uppercase tracking-[0.12em] text-white">
            Capabilities
          </h2>
          <ul className="mt-4 grid gap-3 text-sm">
            {SERVICES.map((service) => (
              <li key={service.title}>
                <a
                  href="#services"
                  className={`cursor-pointer rounded transition-colors hover:text-amber-400 motion-reduce:transition-none ${FOCUS_RING} focus-visible:ring-offset-slate-900`}
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company">
          <h2 id="footer-company" className="text-sm font-extrabold uppercase tracking-[0.12em] text-white">
            Company
          </h2>
          <ul className="mt-4 grid gap-3 text-sm">
            {NAV_ITEMS.filter((item) => item.id !== 'home').map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`cursor-pointer rounded transition-colors hover:text-amber-400 motion-reduce:transition-none ${FOCUS_RING} focus-visible:ring-offset-slate-900`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {COMPANY.legalName}. All rights reserved.
          </p>
          <p>Bandar Penawar, Johor, Malaysia</p>
        </div>
      </div>
    </footer>
  )
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-800 antialiased selection:bg-amber-200 selection:text-slate-900">
      <a
        href="#main-content"
        className={`fixed left-4 top-3 z-60 -translate-y-24 rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-transform focus:translate-y-0 motion-reduce:transition-none ${FOCUS_RING}`}
      >
        Skip to content
      </a>

      <Header />

      <main id="main-content">
        <Hero />
        <Stats />
        <Services />
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
