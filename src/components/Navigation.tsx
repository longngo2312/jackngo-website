import { useEffect, useState } from 'react'
import { navItems, profile } from '../data/profile'
import Dock from './Dock'
import { BriefcaseIcon, CapIcon, GridIcon, HomeIcon, LayersIcon, MailIcon } from './icons'

/** Icon per section id, keyed so the dock stays in sync with navItems. */
const NAV_ICONS: Record<string, React.ReactNode> = {
  home: <HomeIcon />,
  experience: <BriefcaseIcon />,
  education: <CapIcon />,
  projects: <GridIcon />,
  stack: <LayersIcon />,
  contact: <MailIcon />,
}

export default function Navigation() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // Pick the entry nearest the top of the viewport rather than the last
        // one to fire, so fast scrolls don't leave the wrong item lit.
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    )

    navItems.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 h-[var(--nav-h)] transition-colors duration-300 ${
          scrolled ? 'border-b border-line-soft bg-deep/85 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          {/* Monogram + identity */}
          <a href="#home" className="group flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-teal to-sky font-display text-[15px] font-semibold text-deep shadow-[0_0_22px_-6px_rgba(45,212,191,0.7)]">
              {profile.initials}
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-[13.5px] font-semibold text-ink">{profile.name}</span>
              <span className="block font-mono text-[10.5px] tracking-wide text-ink-faint">
                {profile.specialty}
              </span>
            </span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg border border-line-hot px-4 py-2 font-mono text-[12px] tracking-wide text-teal transition-colors duration-300 hover:bg-teal/10 sm:block"
            >
              resume.pdf
            </a>

            <button
              type="button"
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              className="grid size-10 cursor-pointer place-items-center rounded-lg border border-line-soft text-ink md:hidden"
            >
              <span className="flex w-5 flex-col gap-1.5">
                <span
                  className={`h-px bg-current transition-transform duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`}
                />
                <span
                  className={`h-px bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}
                />
                <span
                  className={`h-px bg-current transition-transform duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile sheet — the dock is hover-driven, so touch keeps this list. */}
        {open && (
          <div className="fixed inset-0 top-[var(--nav-h)] z-40 bg-deep/97 px-6 pt-8 backdrop-blur-xl md:hidden">
            <ul className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline gap-4 border-b border-line-soft py-4 font-display text-2xl transition-colors hover:text-teal ${
                      active === item.id ? 'text-teal' : 'text-ink'
                    }`}
                  >
                    <span className="font-mono text-[11px] text-teal">0{i + 1}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block rounded-xl border border-line-hot py-3.5 text-center font-mono text-[13px] text-teal"
            >
              Download resume.pdf
            </a>
          </div>
        )}
      </header>

      <Dock
        items={navItems.map(item => ({
          icon: NAV_ICONS[item.id],
          label: item.label,
          isActive: active === item.id,
          onClick: () => goTo(item.id),
        }))}
      />
    </>
  )
}
