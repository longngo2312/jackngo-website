import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { asset } from '../lib/asset'
import { Chip } from './ui'
import DepthText from './DepthText'
import { prefersReducedMotion, stagger, useReveal } from '../lib/reveal'
import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon, ChatIcon } from './icons'

/** Per-phase delays, in ms. Deleting runs faster than typing, the way a real
 *  backspace-held terminal does. */
const TYPE_MS = 55
const DELETE_MS = 26
const HOLD_FULL_MS = 2000
const HOLD_EMPTY_MS = 650

/**
 * Types the shell command out, holds it, deletes it, and repeats. Driven by a
 * self-scheduling timeout rather than an interval so each phase can set its
 * own delay, and so only one timer is ever pending.
 */
function TypedCommand() {
  const full = profile.command
  // Reduced motion starts fully typed, so the effect never has to correct it.
  const [typed, setTyped] = useState(() => (prefersReducedMotion() ? full : ''))

  useEffect(() => {
    if (prefersReducedMotion()) return

    let count = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      if (deleting) {
        count -= 1
        setTyped(full.slice(0, count))
        if (count === 0) {
          deleting = false
          timer = setTimeout(tick, HOLD_EMPTY_MS)
        } else {
          timer = setTimeout(tick, DELETE_MS)
        }
        return
      }

      count += 1
      setTyped(full.slice(0, count))
      if (count === full.length) {
        deleting = true
        timer = setTimeout(tick, HOLD_FULL_MS)
      } else {
        timer = setTimeout(tick, TYPE_MS)
      }
    }

    timer = setTimeout(tick, 400)
    return () => clearTimeout(timer)
  }, [full])

  return (
    <p className="font-mono text-[12px] sm:text-[14.5px]">
      <span className="text-teal">{profile.prompt}</span>{' '}
      <span className="term-caret text-ink-soft">{typed}</span>
    </p>
  )
}

/** Portrait with its glow ring. Shared by the mobile stack and desktop card. */
function Portrait({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute -inset-2 rounded-full bg-linear-to-br from-teal/45 to-sky/25 blur-lg" />
      <img
        src={asset("/JackNgo.png")}
        alt={`Portrait of ${profile.name}`}
        width={160}
        height={160}
        className="relative size-32 rounded-full border border-line-hot object-cover sm:size-36 lg:size-40"
      />
    </div>
  )
}

export default function HeroSection() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex w-full items-center px-5 pb-20 pt-[calc(var(--nav-h)+3.5rem)] sm:px-8 lg:min-h-screen lg:px-12 lg:pt-[calc(var(--nav-h)+2rem)]"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* ── Identity: centered on mobile, left-aligned from lg ── */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Portrait leads the stack on mobile only. */}
          <div className="reveal mb-7 lg:hidden">
            <Portrait />
          </div>

          {/* Status line */}
          <div
            className="reveal flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-faint sm:text-[11px]"
            style={stagger(1)}
          >
            <span className="text-amber">⚡</span>
            <span className="size-1.5 animate-pulse rounded-full bg-emerald shadow-[0_0_8px_var(--color-emerald)]" />
            <span>{profile.status}</span>
          </div>

          <div className="reveal mt-5 sm:mt-6" style={stagger(2)}>
            <TypedCommand />
          </div>

          {/* Name — the anchor of the whole page, extruded and inline */}
          <h1 className="reveal mt-5 font-display sm:mt-7" style={stagger(3)}>
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
              fontSize="clamp(2.5rem, 11vw, 5.4rem)"
              fontWeight={900}
              shadow
            />
          </h1>

          {/* Role + divider */}
          <div
            className="reveal mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start"
            style={stagger(4)}
          >
            <p className="text-[17px] font-medium text-ink sm:text-[19px]">{profile.role}</p>
            <span className="hidden h-4 w-px bg-line-hot sm:block" />
            <p className="font-mono text-[12px] tracking-wide text-ink-mute sm:text-[12.5px]">
              {profile.specialty}
            </p>
          </div>

          {/* Mission — the rule reads as a margin note only once left-aligned. */}
          <p
            className="reveal mt-6 max-w-xl text-[14.5px] leading-[1.75] text-ink-soft sm:text-[15px] lg:border-l lg:border-line-hot lg:pl-5"
            style={stagger(5)}
          >
            {profile.mission}
          </p>

          {/* Skill pills */}
          <div
            className="reveal mt-7 flex flex-wrap justify-center gap-2 lg:justify-start"
            style={stagger(6)}
          >
            {profile.pills.map(pill => (
              <Chip key={pill}>{pill}</Chip>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="reveal mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center lg:justify-start"
            style={stagger(7)}
          >
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-linear-to-r from-teal to-sky px-6 py-3.5 text-[14px] font-semibold text-deep shadow-[0_0_34px_-10px_rgba(45,212,191,0.85)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <DownloadIcon />
              Download Résumé
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-line-soft px-6 py-3.5 text-[14px] font-medium text-ink transition-colors duration-300 hover:border-line-hot hover:text-teal"
            >
              <ChatIcon />
              Let&rsquo;s Connect
            </a>
          </div>
        </div>

        {/* ── Profile card ── */}
        <aside className="reveal panel edge-lit p-6 sm:p-8 lg:p-9" style={stagger(4)}>
          {/* The portrait already leads the mobile stack, so it's desktop-only here. */}
          <div className="hidden flex-col items-center text-center lg:flex">
            <Portrait />
            <h2 className="mt-6 font-display text-2xl font-semibold text-ink">{profile.name}</h2>
            <p className="mt-1.5 font-mono text-[11.5px] tracking-wide text-ink-mute">
              {profile.specialty} · {profile.location}
            </p>
          </div>

          <div className="flex justify-center gap-2.5 lg:mt-5">
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

          <p className="mt-6 rounded-xl border border-line-soft bg-deep/50 p-5 text-center text-[13.5px] leading-[1.8] text-ink-soft lg:mt-7 lg:text-left">
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
