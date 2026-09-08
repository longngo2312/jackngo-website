import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { Chip } from './ui'
import DepthText from './DepthText'
import { prefersReducedMotion, stagger, useReveal } from '../lib/reveal'
import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon, ChatIcon } from './icons'

/** Types out the shell command once on mount, then leaves the caret blinking. */
function TypedCommand() {
  // Reduced motion starts fully typed, so the effect never has to correct it.
  const [typed, setTyped] = useState(() => (prefersReducedMotion() ? profile.command : ''))

  useEffect(() => {
    if (prefersReducedMotion()) return

    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(profile.command.slice(0, i))
      if (i >= profile.command.length) clearInterval(id)
    }, 45)

    return () => clearInterval(id)
  }, [])

  return (
    <p className="font-mono text-[13px] sm:text-[14.5px]">
      <span className="text-teal">{profile.prompt}</span>{' '}
      <span className="term-caret text-ink-soft">{typed}</span>
    </p>
  )
}

export default function HeroSection() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex w-full items-center px-5 pb-24 pt-[calc(var(--nav-h)+3rem)] sm:px-8 lg:min-h-screen lg:px-12 lg:pt-[calc(var(--nav-h)+2rem)]"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* ── Left: identity ── */}
        <div>
          {/* Status line */}
          <div className="reveal flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
            <span className="text-amber">⚡</span>
            <span className="size-1.5 animate-pulse rounded-full bg-emerald shadow-[0_0_8px_var(--color-emerald)]" />
            <span>{profile.status}</span>
          </div>

          <div className="reveal mt-6" style={stagger(1)}>
            <TypedCommand />
          </div>

          {/* Name — the anchor of the whole page, extruded and inline */}
          <h1 className="reveal mt-7 font-display" style={stagger(2)}>
            <DepthText
              text="Jack Ngo"
              layers={34}
              depth={2.4}
              faceColor="#f8fafc"
              depthColor="#3ac2ed"
              tilt={7.5}
              pointerTracking
              smoothing={0.14}
              perspective={900}
              autoOrbit
              orbitSpeed={0.35}
              fontSize="clamp(2.6rem, 7.5vw, 5.4rem)"
              fontWeight={900}
              shadow
            />
          </h1>

          {/* Role + divider */}
          <div className="reveal mt-7 flex flex-wrap items-center gap-4" style={stagger(3)}>
            <p className="text-[17px] font-medium text-ink sm:text-[19px]">{profile.role}</p>
            <span className="hidden h-4 w-px bg-line-hot sm:block" />
            <p className="font-mono text-[12.5px] tracking-wide text-ink-mute">
              {profile.specialty}
            </p>
          </div>

          {/* Mission */}
          <p
            className="reveal mt-7 max-w-xl border-l border-line-hot pl-5 text-[15px] leading-[1.75] text-ink-soft"
            style={stagger(4)}
          >
            {profile.mission}
          </p>

          {/* Skill pills */}
          <div className="reveal mt-8 flex flex-wrap gap-2" style={stagger(5)}>
            {profile.pills.map(pill => (
              <Chip key={pill}>{pill}</Chip>
            ))}
          </div>

          {/* CTAs */}
          <div className="reveal mt-9 flex flex-wrap gap-3" style={stagger(6)}>
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-linear-to-r from-teal to-sky px-6 py-3.5 text-[14px] font-semibold text-deep shadow-[0_0_34px_-10px_rgba(45,212,191,0.85)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <DownloadIcon />
              Download Résumé
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-xl border border-line-soft px-6 py-3.5 text-[14px] font-medium text-ink transition-colors duration-300 hover:border-line-hot hover:text-teal"
            >
              <ChatIcon />
              Let&rsquo;s Connect
            </a>
          </div>
        </div>

        {/* ── Right: profile card ── */}
        <aside className="reveal panel edge-lit p-7 sm:p-9" style={stagger(3)}>
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <span className="absolute -inset-2 rounded-full bg-linear-to-br from-teal/45 to-sky/25 blur-lg" />
              <img
                src="/JackNgo.png"
                alt={`Portrait of ${profile.name}`}
                width={160}
                height={160}
                className="relative size-36 rounded-full border border-line-hot object-cover sm:size-40"
              />
            </div>

            <h2 className="mt-6 font-display text-2xl font-semibold text-ink">
              {profile.name}
            </h2>
            <p className="mt-1.5 font-mono text-[11.5px] tracking-wide text-ink-mute">
              {profile.specialty} · {profile.location}
            </p>

            <div className="mt-5 flex gap-2.5">
              <IconLink href={`mailto:${profile.email}`} label="Email">
                <MailIcon />
              </IconLink>
              <IconLink href={profile.links.linkedin} label="LinkedIn" external>
                <LinkedinIcon />
              </IconLink>
              <IconLink href={profile.links.github} label="GitHub" external>
                <GithubIcon />
              </IconLink>
            </div>
          </div>

          <p className="mt-7 rounded-xl border border-line-soft bg-deep/50 p-5 text-[13.5px] leading-[1.8] text-ink-soft">
            {profile.snapshot}
          </p>
        </aside>
      </div>
    </section>
  )
}

function IconLink({
  href,
  label,
  external,
  children,
}: {
  href: string
  label: string
  external?: boolean
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="grid size-10 place-items-center rounded-lg border border-line-soft text-ink-mute transition-all duration-300 hover:-translate-y-0.5 hover:border-line-hot hover:text-teal"
    >
      {children}
    </a>
  )
}
