import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { profile } from '../data/profile'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      })
      gsap.from('.arc-reactor-hero', {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-4"
    >
      {/* Arc Reactor centerpiece */}
      <div className="arc-reactor-hero arc-reactor mb-10 lg:mb-16">
        <div className="core" />
        <div className="ring" />
        <div className="ring" />
        <div className="ring" />
        <div className="ring" />
      </div>

      {/* Name */}
      <h1
        ref={titleRef}
        className="hero-line font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.15em] text-[var(--jarvis-cyan)] glow-text text-center"
      >
        {profile.name.toUpperCase()}
      </h1>

      {/* Divider */}
      <div className="hero-line glow-line w-48 md:w-80 my-6" />

      {/* Tagline */}
      <p className="hero-line font-[family-name:var(--font-display)] text-sm md:text-base tracking-[0.3em] text-[var(--jarvis-text-dim)] uppercase">
        {profile.tagline}
      </p>

      {/* Status line */}
      <div className="hero-line mt-8 flex items-center gap-3 text-xs text-[var(--jarvis-text-dim)]">
        <div className="status-dot" />
        <span>STATUS: <span className="text-[var(--jarvis-green)]">{profile.status}</span></span>
        <span className="mx-2 text-[var(--jarvis-border-active)]">|</span>
        <span>{profile.location}</span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-[var(--jarvis-text-dim)] animate-bounce">
        <span className="text-[10px] tracking-widest">SCROLL</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <path d="M8 4L8 20M8 20L2 14M8 20L14 14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  )
}
