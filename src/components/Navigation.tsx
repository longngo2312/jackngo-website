import { useEffect, useState } from 'react'
import { navItems, profile } from '../data/profile'
import Dock from './Dock'
import { LogoTile } from './Logo'
import MobileDock from './MobileDock'
import RotatingText from './RotatingText'
import { prefersReducedMotion } from '../lib/reveal'
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
            <LogoTile />
            <span className="hidden leading-tight lg:block">
              <span className="block text-[13.5px] font-semibold text-ink">{profile.name}</span>
              {/* Rotating specialty. The fixed height plus overflow-hidden
                  gives the y-axis transition something to clip against —
                  without it, exiting characters ride up over the name. The
                  min-width stops the header reflowing as phrases swap. */}
              <span className="block h-4 min-w-42 overflow-hidden font-mono text-[10.5px] leading-4 tracking-wide text-ink-faint">
                <RotatingText
                  texts={profile.rotating}
                  mainClassName="text-teal leading-4"
                  auto={!prefersReducedMotion()}
                  rotationInterval={2800}
                  staggerDuration={0.015}
                  staggerFrom="first"
                  splitBy="characters"
                  transition={{ type: 'spring', damping: 28, stiffness: 340 }}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-120%', opacity: 0 }}
                  splitLevelClassName="overflow-hidden"
                />
              </span>
            </span>
          </a>

          {/* Absolute centering so the dock sits on the true page center,
              independent of the logo and résumé button widths. Phones get the
              floating bottom dock instead. */}
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

      {/* ── Mobile: floating bottom dock ── */}
      <MobileDock
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
