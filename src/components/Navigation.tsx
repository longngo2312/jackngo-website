import { useEffect, useState } from 'react'
import { navItems, profile } from '../data/profile'
import Dock from './Dock'
import CardNav, { type CardNavItem } from './CardNav'
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

/** Mobile card groups — six sections don't fit a phone bar, three cards do. */
const CARD_ITEMS: CardNavItem[] = [
  {
    label: 'Profile',
    bgColor: '#0d1a1d',
    textColor: '#e6f0f2',
    links: [
      { label: 'Home', href: 'home', ariaLabel: 'Go to home' },
      { label: 'Experience', href: 'experience', ariaLabel: 'Go to experience' },
      { label: 'Education', href: 'education', ariaLabel: 'Go to education' },
    ],
  },
  {
    label: 'Work',
    bgColor: '#0c1a22',
    textColor: '#e6f0f2',
    links: [
      { label: 'Projects', href: 'projects', ariaLabel: 'Go to projects' },
      { label: 'Stack', href: 'stack', ariaLabel: 'Go to stack' },
    ],
  },
  {
    label: 'Connect',
    bgColor: '#0d1c19',
    textColor: '#e6f0f2',
    links: [
      { label: 'Contact', href: 'contact', ariaLabel: 'Go to contact' },
      {
        label: 'GitHub',
        href: profile.links.github,
        ariaLabel: 'GitHub profile',
        external: true,
      },
      {
        label: 'LinkedIn',
        href: profile.links.linkedin,
        ariaLabel: 'LinkedIn profile',
        external: true,
      },
    ],
  },
]

export default function Navigation() {
  const [active, setActive] = useState('home')
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

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* ── Desktop: fixed bar with the dock inline ── */}
      <header
        className={`fixed inset-x-0 top-0 z-40 hidden h-[var(--nav-h)] transition-colors duration-300 md:block ${
          scrolled ? 'border-b border-line-soft bg-deep/85 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <nav className="relative mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#home" className="flex shrink-0 items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-teal to-sky font-display text-[15px] font-semibold text-deep shadow-[0_0_22px_-6px_rgba(45,212,191,0.7)]">
              {profile.initials}
            </span>
            <span className="hidden leading-tight lg:block">
              <span className="block text-[13.5px] font-semibold text-ink">{profile.name}</span>
              <span className="block font-mono text-[10.5px] tracking-wide text-ink-faint">
                {profile.specialty}
              </span>
            </span>
          </a>

          {/* Absolute centering so the dock sits on the true page center,
              independent of the logo and résumé button widths. */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dock
              items={navItems.map(item => ({
                icon: NAV_ICONS[item.id],
                label: item.label,
                isActive: active === item.id,
                onClick: () => goTo(item.id),
              }))}
            />
          </div>

          <a
            href={profile.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg border border-line-hot px-4 py-2 font-mono text-[12px] tracking-wide text-teal transition-colors duration-300 hover:bg-teal/10"
          >
            resume.pdf
          </a>
        </nav>
      </header>

      {/* ── Mobile: expanding card nav ── */}
      <div className="md:hidden">
        <CardNav
          items={CARD_ITEMS}
          ctaHref={profile.links.resume}
          ctaLabel="resume.pdf"
          onNavigate={goTo}
          logo={
            <>
              <span className="grid size-9 place-items-center rounded-lg bg-linear-to-br from-teal to-sky font-display text-[13px] font-semibold text-deep">
                {profile.initials}
              </span>
              <span className="text-[13.5px] font-semibold text-ink">{profile.name}</span>
            </>
          }
        />
      </div>
    </>
  )
}
