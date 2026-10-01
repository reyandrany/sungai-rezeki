import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { MORE_LINKS, NAV, SERVICES } from '../content/catalog.ts'
import { COMPANY, SITE } from '../content/site.ts'
import Seo from './Seo.tsx'
import { BUTTON_PRIMARY, FOCUS_RING, FOCUS_RING_INVERSE, Logo } from './ui.tsx'

const linkClass = (isActive: boolean) =>
  `block cursor-pointer rounded-lg px-4 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 motion-reduce:transition-none ${FOCUS_RING} ${
    isActive ? 'text-amber-600' : 'text-slate-600'
  }`

export default function SiteShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    setMenuOpen(false)
    if (hash) {
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView()
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <div className="min-h-svh overflow-x-clip bg-slate-50 text-slate-800 antialiased">
      <Seo />
      <a
        href="#kandungan"
        className={`fixed top-3 left-4 z-60 -translate-y-24 rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-transform focus:translate-y-0 motion-reduce:transition-none ${FOCUS_RING}`}
      >
        Langkau ke kandungan
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <nav
          aria-label="Utama"
          className="mx-auto flex h-19 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        >
          <Logo />
          <ul className="hidden items-center gap-1 xl:flex">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => linkClass(isActive)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="ml-3">
              <Link to="/hubungi" className={BUTTON_PRIMARY}>
                Hubungi pejabat
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </li>
          </ul>
          <button
            type="button"
            aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={menuOpen}
            aria-controls="menu-mudah-alih"
            onClick={() => setMenuOpen((open) => !open)}
            className={`grid size-12 cursor-pointer place-items-center rounded-xl border border-slate-200 bg-white text-slate-900 transition-colors hover:bg-slate-50 motion-reduce:transition-none xl:hidden ${FOCUS_RING}`}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </nav>
        <div id="menu-mudah-alih" data-open={menuOpen} inert={!menuOpen} className="menu-panel xl:hidden">
          <div className="min-h-0 overflow-hidden">
          <div className="border-t border-slate-200 bg-white px-4 pt-3 pb-5 shadow-lg">
          <ul className="grid gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex min-h-12 cursor-pointer items-center rounded-lg px-4 text-sm font-bold hover:bg-slate-100 ${FOCUS_RING} ${
                      isActive ? 'text-amber-600' : 'text-slate-700'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/hubungi" onClick={() => setMenuOpen(false)} className={`mt-3 w-full ${BUTTON_PRIMARY}`}>
            Hubungi pejabat
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          </div>
          </div>
        </div>
      </header>

      <main id="kandungan" key={pathname} className="page-enter">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-300">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <Logo inverse />
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              {SITE.motto}. {COMPANY.ownership}, berdaftar {COMPANY.registration}.
            </p>
          </div>
          <nav aria-labelledby="footer-servis">
            <h2 id="footer-servis" className="text-sm font-extrabold tracking-[0.12em] text-white uppercase">
              Servis
            </h2>
            <ul className="mt-4 grid gap-3 text-sm">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/servis#${service.id}`}
                    className={`cursor-pointer rounded transition-colors hover:text-amber-400 motion-reduce:transition-none ${FOCUS_RING_INVERSE}`}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="footer-syarikat">
            <h2 id="footer-syarikat" className="text-sm font-extrabold tracking-[0.12em] text-white uppercase">
              Syarikat
            </h2>
            <ul className="mt-4 grid gap-3 text-sm">
              {[...NAV.filter((item) => item.to !== '/'), ...MORE_LINKS].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`cursor-pointer rounded transition-colors hover:text-amber-400 motion-reduce:transition-none ${FOCUS_RING_INVERSE}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-slate-800">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>
              © {new Date().getFullYear()} {COMPANY.legalName} ({COMPANY.registration}). Hak cipta terpelihara.
            </p>
            <p>Bandar Penawar, Johor, Malaysia</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
