import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { techStack } from '../data/profile'

gsap.registerPlugin(ScrollTrigger)

export default function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tech-orbit', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Split icons into two orbits
  const innerOrbit = techStack.filter((_, i) => i % 2 === 0)
  const outerOrbit = techStack.filter((_, i) => i % 2 !== 0)

  return (
    <section id="techstack" ref={sectionRef} className="min-h-screen py-24 px-4 md:px-8 lg:px-16 flex flex-col items-center justify-center w-full">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-[family-name:var(--font-display)] text-[var(--jarvis-cyan)] text-xs tracking-[0.3em]">03</span>
          <div className="glow-line flex-1" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-[0.2em] text-[var(--jarvis-cyan)] glow-text">
            TECH STACK
          </h2>
          <div className="glow-line flex-1" />
        </div>

        {/* Orbital display */}
        <div className="tech-orbit flex items-center justify-center">
          <div className="relative w-[340px] h-[340px] md:w-[500px] md:h-[500px] lg:w-[580px] lg:h-[580px]">
            {/* Center arc reactor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="arc-reactor scale-[0.35] md:scale-[0.45]">
                <div className="core" />
                <div className="ring" />
                <div className="ring" />
                <div className="ring" />
                <div className="ring" />
              </div>
            </div>

            {/* Inner orbit ring (visual) */}
            <div
              className="absolute rounded-full border border-[var(--jarvis-border)] opacity-20"
              style={{ inset: '25%' }}
            />

            {/* Outer orbit ring (visual) */}
            <div
              className="absolute rounded-full border border-dashed border-[var(--jarvis-border)] opacity-15"
              style={{ inset: '5%' }}
            />

            {/* Inner orbit - spinning container */}
            <div
              className="absolute rounded-full"
              style={{
                inset: '25%',
                animation: 'orbit-spin 50s linear infinite',
              }}
            >
              {innerOrbit.map((tech, i) => {
                const angle = (i / innerOrbit.length) * 360
                const rad = (angle * Math.PI) / 180
                // Position on the edge of this container (50% = center, so offset by 50%)
                const x = 50 + 50 * Math.cos(rad)
                const y = 50 + 50 * Math.sin(rad)

                return (
                  <div
                    key={tech.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      animation: 'orbit-counter-spin 50s linear infinite',
                    }}
                  >
                    <TechIcon tech={tech} />
                  </div>
                )
              })}
            </div>

            {/* Outer orbit - spinning container (reverse) */}
            <div
              className="absolute rounded-full"
              style={{
                inset: '5%',
                animation: 'orbit-spin 70s linear infinite reverse',
              }}
            >
              {outerOrbit.map((tech, i) => {
                const angle = (i / outerOrbit.length) * 360
                const rad = (angle * Math.PI) / 180
                const x = 50 + 50 * Math.cos(rad)
                const y = 50 + 50 * Math.sin(rad)

                return (
                  <div
                    key={tech.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      animation: 'orbit-counter-spin 70s linear infinite reverse',
                    }}
                  >
                    <TechIcon tech={tech} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TechIcon({ tech }: { tech: { name: string; icon: string } }) {
  return (
    <div className="group flex flex-col items-center gap-1 cursor-default">
      <div className="relative w-11 h-11 md:w-14 md:h-14 flex items-center justify-center border border-[var(--jarvis-border)] bg-[rgba(6,11,24,0.85)] backdrop-blur-sm hover:border-[var(--jarvis-cyan)] hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all duration-300">
        {/* Corner accents */}
        <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-[var(--jarvis-cyan)] opacity-60" />
        <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-[var(--jarvis-cyan)] opacity-60" />

        <img
          src={tech.icon}
          alt={tech.name}
          className="w-6 h-6 md:w-8 md:h-8"
          style={{ filter: 'drop-shadow(0 0 4px rgba(0, 212, 255, 0.3))' }}
        />
      </div>
      <span className="text-[7px] md:text-[9px] tracking-[0.15em] text-[var(--jarvis-text-dim)] group-hover:text-[var(--jarvis-cyan)] transition-colors whitespace-nowrap">
        {tech.name.toUpperCase()}
      </span>
    </div>
  )
}
