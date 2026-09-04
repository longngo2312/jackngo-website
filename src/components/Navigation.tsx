import { useState, useEffect } from 'react'
import { navItems } from '../data/profile'

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    navItems.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop nav links in top bar are sufficient — no right-side nav */}

      {/* Mobile nav */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden p-3 hud-panel cursor-pointer"
        aria-label="Toggle navigation"
      >
        <div className="w-5 flex flex-col gap-1">
          <span className={`block h-[2px] bg-[var(--jarvis-cyan)] transition-all ${isOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block h-[2px] bg-[var(--jarvis-cyan)] transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-[2px] bg-[var(--jarvis-cyan)] transition-all ${isOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </div>
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[rgba(6,11,24,0.95)] flex items-center justify-center lg:hidden">
          <div className="flex flex-col gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-xl font-[family-name:var(--font-display)] tracking-[0.3em] cursor-pointer transition-colors ${
                  activeSection === item.id
                    ? 'text-[var(--jarvis-cyan)] glow-text'
                    : 'text-[var(--jarvis-text-dim)] hover:text-[var(--jarvis-cyan)]'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Top HUD bar */}
      <header className="fixed top-0 left-0 right-0 z-30 px-6 py-3 flex items-center justify-between border-b border-[var(--jarvis-border)]" style={{ background: 'rgba(6, 11, 24, 0.8)', backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center gap-3">
          <div className="status-dot" />
          <span className="font-[family-name:var(--font-display)] text-[var(--jarvis-cyan)] text-sm tracking-[0.2em]">
            J.A.R.V.I.S.
          </span>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-xs tracking-[0.2em] cursor-pointer transition-all duration-300 ${
                activeSection === item.id
                  ? 'text-[var(--jarvis-cyan)] glow-text'
                  : 'text-[var(--jarvis-text-dim)] hover:text-[var(--jarvis-cyan)]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6 text-xs text-[var(--jarvis-text-dim)]">
          <span>SYS: <span className="text-[var(--jarvis-green)]">ONLINE</span></span>
          <span>SEC: <span className="text-[var(--jarvis-green)]">CLEAR</span></span>
          <TimeDisplay />
        </div>
      </header>
    </>
  )
}

function TimeDisplay() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="font-mono tabular-nums">
      {time.toLocaleTimeString('en-US', { hour12: false })}
    </span>
  )
}
