import type { ReactNode } from 'react'
import { stagger, useReveal } from '../lib/reveal'

/**
 * The repeating hierarchy from the reference: eyebrow -> title -> one-sentence
 * framing. Every section uses it so the page reads as one system.
 */
export function SectionHeader({
  eyebrow,
  title,
  framing,
}: {
  eyebrow: string
  title: string
  framing: string
}) {
  return (
    <header className="mb-14">
      <div className="reveal flex items-center gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">
          {eyebrow}
        </span>
        <span className="rule-fade w-16 shrink-0 sm:w-28" />
      </div>

      <h2
        className="reveal mt-4 font-display text-[clamp(2.4rem,6vw,3.9rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink"
        style={stagger(1)}
      >
        {title}
      </h2>

      <p
        className="reveal mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-mute"
        style={stagger(2)}
      >
        {framing}
      </p>
    </header>
  )
}

/** Small monospace chip used for tech tags and skill pills. */
export function Chip({ children, tone = 'muted' }: { children: ReactNode; tone?: 'muted' | 'hot' }) {
  const base =
    'inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11.5px] tracking-wide transition-colors duration-300'
  const tones = {
    muted: 'border-line-soft bg-panel/60 text-ink-soft hover:border-line-hot hover:text-teal',
    hot: 'border-line-hot bg-teal/8 text-teal',
  }
  return <span className={`${base} ${tones[tone]}`}>{children}</span>
}

/** Status pill: colored by lifecycle so it reads at a glance. */
export function StatusTag({ status }: { status: string }) {
  const tone =
    status === 'Active'
      ? 'border-emerald/40 text-emerald'
      : status === 'Shipped'
        ? 'border-sky/40 text-sky'
        : 'border-line-soft text-ink-faint'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.16em] ${tone}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

/**
 * Renders the lightweight `**bold**` / `*italic*` markers used in resume
 * bullets, so metrics stand out without hand-writing JSX per line.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean)

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-ink">
              {part.slice(2, -2)}
            </strong>
          )
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={i} className="italic text-ink-soft">
              {part.slice(1, -1)}
            </em>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

/** Consistent section shell: id anchor, vertical rhythm, max width. */
export function Section({
  id,
  children,
  className = '',
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id={id}
      ref={ref}
      className={`w-full scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}
