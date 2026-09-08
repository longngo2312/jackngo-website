import { education } from '../data/profile'
import { Section, SectionHeader } from './ui'
import { stagger } from '../lib/reveal'
import { CapIcon } from './icons'

export default function EducationSection() {
  return (
    <Section id="education">
      <SectionHeader
        eyebrow="Academic Background"
        title="Education"
        framing="The coursework behind the systems work — data structures, databases, and the math under the models."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {education.map((ed, i) => (
          <article
            key={ed.id}
            className="reveal panel panel-hover edge-lit p-7 sm:p-9"
            style={stagger(i)}
          >
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line-hot bg-teal/8 text-teal">
                <CapIcon />
              </span>

              <div className="min-w-0">
                <h3 className="font-display text-[22px] font-semibold leading-snug text-ink">
                  {ed.degree}
                </h3>
                <p className="mt-1 text-[14px] font-medium text-sky">{ed.school}</p>
                <p className="mt-2 font-mono text-[11.5px] tracking-wide text-ink-faint">
                  {ed.meta}
                </p>
              </div>
            </div>

            <span className="mt-6 inline-flex rounded-full border border-line-hot bg-teal/8 px-4 py-1.5 font-mono text-[12px] font-medium tracking-wide text-teal">
              {ed.badge}
            </span>

            <p className="mt-6 text-[14.5px] leading-[1.8] text-ink-soft">{ed.summary}</p>

            <div className="mt-6 border-t border-line-soft pt-5">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-faint">
                Coursework
              </p>
              <ul className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                {ed.coursework.map(course => (
                  <li
                    key={course}
                    className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink-soft"
                  >
                    <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-teal/70" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
