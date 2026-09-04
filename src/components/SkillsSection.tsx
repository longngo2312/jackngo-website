import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '../data/profile'

gsap.registerPlugin(ScrollTrigger)

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activated, setActivated] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => setActivated(true),
        once: true,
      })

      gsap.from('.skill-row', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        x: -20,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const categories = [...new Set(skills.map(s => s.category))]

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen py-24 px-4 md:px-8 lg:px-16 flex items-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-[family-name:var(--font-display)] text-[var(--jarvis-cyan)] text-xs tracking-[0.3em]">03</span>
          <div className="glow-line flex-1" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-[0.2em] text-[var(--jarvis-cyan)] glow-text">
            SYSTEMS
          </h2>
          <div className="glow-line flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map(cat => (
            <div key={cat} className="hud-panel p-6">
              <h3 className="text-xs tracking-[0.2em] text-[var(--jarvis-cyan)] mb-5 font-[family-name:var(--font-display)]">
                ◇ {cat.toUpperCase()}
              </h3>
              <div className="space-y-4">
                {skills.filter(s => s.category === cat).map(skill => (
                  <div key={skill.name} className="skill-row">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-[var(--jarvis-text)]">{skill.name}</span>
                      <span className="text-xs text-[var(--jarvis-cyan)] tabular-nums">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-[rgba(0,212,255,0.08)] relative overflow-hidden">
                      <div
                        className="skill-bar-fill"
                        style={{ width: activated ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
