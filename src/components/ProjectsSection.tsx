import { projects } from '../data/profile'
import { Chip, Section, SectionHeader, StatusTag } from './ui'
import { stagger } from '../lib/reveal'
import { ArrowIcon } from './icons'

export default function ProjectsSection() {
  const [lead, ...rest] = projects

  return (
    <Section id="projects">
      <SectionHeader
        eyebrow="Selected Work"
        title="Featured Projects"
        framing="End-to-end systems I designed, built, and measured — from retrieval pipelines to multi-tenant backends."
      />

      {/* Lead project gets a wider, two-column treatment. */}
      <article className="reveal panel panel-hover edge-lit mb-6 p-7 sm:p-9">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusTag status={lead.status} />
              <span className="font-mono text-[11.5px] text-ink-faint">
                {lead.meta}
              </span>
            </div>

            <h3 className="mt-4 font-display text-[28px] font-semibold leading-tight text-ink sm:text-[34px]">
              {lead.name}
            </h3>
            <p className="mt-2 font-mono text-[12.5px] tracking-wide text-teal">
              {lead.subtitle}
            </p>

            <p className="mt-5 max-w-2xl text-[14.5px] leading-[1.8] text-ink-soft">
              {lead.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {lead.tech.map(t => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>

            <RepoLink href={lead.repo} />
          </div>

          {/* Metrics rail */}
          <div className="flex flex-col gap-3 lg:border-l lg:border-line-soft lg:pl-8">
            {lead.metrics.map(m => (
              <div key={m.label} className="rounded-xl border border-line-soft bg-deep/50 px-5 py-4">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">
                  {m.label}
                </p>
                <p className="mt-1.5 font-display text-[26px] font-semibold leading-none text-teal">
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Remaining projects */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {rest.map((p, i) => (
          <article
            key={p.id}
            className="reveal panel panel-hover flex flex-col p-6 sm:p-7"
            style={stagger(i)}
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <StatusTag status={p.status} />
              <span className="font-mono text-[11px] text-ink-faint">
                {p.meta}
              </span>
            </div>

            <h3 className="mt-4 font-display text-[22px] font-semibold leading-snug text-ink">
              {p.name}
            </h3>
            <p className="mt-1.5 font-mono text-[11.5px] tracking-wide text-teal">
              {p.subtitle}
            </p>

            <p className="mt-4 flex-1 text-[14px] leading-[1.75] text-ink-soft">{p.description}</p>

            {p.metrics.length > 0 && (
              <dl className="mt-5 grid grid-cols-3 items-end gap-2 border-y border-line-soft py-4">
                {p.metrics.map(m => (
                  // Column-reverse keeps the numbers on one baseline even when
                  // a label wraps to two lines.
                  <div key={m.label} className="flex flex-col-reverse">
                    <dt className="mt-1 font-mono text-[9.5px] uppercase leading-tight tracking-[0.14em] text-ink-faint">
                      {m.label}
                    </dt>
                    <dd className="font-display text-[19px] font-semibold leading-none text-teal">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {p.tech.map(t => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>

            <RepoLink href={p.repo} />
          </article>
        ))}
      </div>
    </Section>
  )
}

function RepoLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-6 inline-flex items-center gap-2 font-mono text-[12.5px] text-sky transition-colors duration-300 hover:text-teal"
    >
      View source
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        <ArrowIcon />
      </span>
    </a>
  )
}
