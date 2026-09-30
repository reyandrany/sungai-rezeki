import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { COMPANY } from '../content/site.ts'

export const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white'

export const FOCUS_RING_INVERSE = `${FOCUS_RING} focus-visible:ring-offset-slate-900`

export const BUTTON_PRIMARY = `inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 shadow-[0_10px_25px_-12px_rgb(245_158_11/0.9)] transition-colors duration-200 hover:bg-amber-400 motion-safe:active:translate-y-px motion-reduce:transition-none ${FOCUS_RING}`

export const BUTTON_SECONDARY = `inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-50 motion-reduce:transition-none ${FOCUS_RING}`

export const BUTTON_SECONDARY_INVERSE = `inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:border-amber-400 hover:bg-white/10 motion-reduce:transition-none ${FOCUS_RING_INVERSE}`

export const CARD_SURFACE =
  'rounded-2xl border border-slate-200 bg-white shadow-[0_12px_30px_-24px_rgb(15_23_42/0.45)]'

export const INPUT_CLASS = `mt-2 block min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 transition-colors duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-100 motion-reduce:transition-none`

export function Logo({ inverse = false, to = '/' }: { inverse?: boolean; to?: string }) {
  return (
    <Link
      to={to}
      aria-label={`${COMPANY.legalName} — laman utama`}
      className={`flex min-w-0 cursor-pointer items-center gap-3 rounded-lg ${inverse ? FOCUS_RING_INVERSE : FOCUS_RING}`}
    >
      <img
        src="/sungai-rezeki.webp"
        alt=""
        width={48}
        height={48}
        className="size-12 shrink-0 object-contain"
      />
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
    </Link>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
  as = 'h2',
}: {
  eyebrow: string
  title: ReactNode
  description?: string
  inverse?: boolean
  as?: 'h1' | 'h2'
}) {
  const Heading = as
  return (
    <div className="max-w-2xl">
      <p className={`mb-3 text-xs font-extrabold uppercase tracking-[0.2em] ${inverse ? 'text-amber-400' : 'text-amber-600'}`}>
        {eyebrow}
      </p>
      <Heading
        className={`text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          inverse ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </Heading>
      {description ? (
        <p className={`mt-5 text-pretty leading-7 ${inverse ? 'text-slate-300' : 'text-slate-600'}`}>
          {description}
        </p>
      ) : null}
    </div>
  )
}

export function PageFrame({
  children,
  tone = 'slate',
}: {
  children: ReactNode
  tone?: 'slate' | 'white'
}) {
  return (
    <div className={tone === 'white' ? 'bg-white' : 'bg-slate-50'}>
      <div className="mx-auto max-w-[1280px] px-4 pt-32 pb-20 sm:px-6 sm:pt-36 sm:pb-24 lg:px-8 lg:pt-40 lg:pb-28">
        {children}
      </div>
    </div>
  )
}
