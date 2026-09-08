import { experience } from '../data/profile'
import { Chip, RichText, Section, SectionHeader } from './ui'
import { stagger } from '../lib/reveal'

export default function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeader
        eyebrow="Career Path"
        title="Experience"
        framing="Where I've shipped production software — product engineering, real-time systems, and applied research."
      />

      <div className="relative">
        {/* Spine — hidden on mobile where the offset would waste width. */}
        <span
          aria-hidden
          className="absolute bottom-6 left-[7px] top-3 hidden w-px bg-linear-to-b from-teal via-line-hot to-transparent sm:block"
        />

        <ol className="flex flex-col gap-6">
          {experience.map((job, i) => (
            <li key={job.id} className="reveal relative sm:pl-12" style={stagger(i)}>
              {/* Node */}
              <span
                aria-hidden
                className="absolute left-0 top-8 hidden size-[15px] place-items-center rounded-full border border-line-hot bg-deep sm:grid"
              >
                <span className="size-[5px] rounded-full bg-teal shadow-[0_0_8px_var(--color-teal)]" />
              </span>

              <article className="panel panel-hover p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-[21px] font-semibold leading-snug text-ink sm:text-[23px]">
                      {job.role}
                    </h3>
                    <p className="mt-1.5 text-[14px] font-medium text-sky">{job.org}</p>
                  </div>

                  <span className="rounded-lg border border-line-soft px-3 py-1.5 font-mono text-[11.5px] tracking-wide text-ink-mute">
                    {job.meta}
                  </span>
                </div>

                <ul className="mt-6 flex flex-col gap-3">
                  {job.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex gap-3 text-[14.5px] leading-[1.75] text-ink-soft">
                      <span aria-hidden className="mt-[9px] size-1 shrink-0 rounded-full bg-teal" />
                      <span>
                        <RichText text={bullet} />
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-line-soft pt-5">
                  {job.tags.map(tag => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
