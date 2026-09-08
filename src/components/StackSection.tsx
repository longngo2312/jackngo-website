import { stack, type StackItem } from '../data/profile'
import { Section, SectionHeader } from './ui'
import { stagger } from '../lib/reveal'

export default function StackSection() {
  return (
    <Section id="stack">
      <SectionHeader
        eyebrow="Toolchain"
        title="Stack"
        framing="What I reach for, grouped by the job it does rather than ranked by a made-up percentage."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {stack.map((group, i) => (
          <article
            key={group.group}
            className="reveal panel panel-hover p-6 sm:p-8"
            style={stagger(i)}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-teal">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-[19px] font-semibold text-ink">{group.group}</h3>
              <span className="rule-fade flex-1" />
            </div>

            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {group.items.map(item => (
                <li key={item.name}>
                  <StackTile item={item} />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}

function StackTile({ item }: { item: StackItem }) {
  return (
    <div className="group flex h-full items-center gap-3 rounded-xl border border-line-soft bg-deep/50 px-3.5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-hot hover:bg-deep/80">
      <span className="grid size-8 shrink-0 place-items-center">
        {item.logo ? (
          <img
            src={item.logo}
            alt=""
            width={28}
            height={28}
            loading="lazy"
            className={`size-7 object-contain transition-transform duration-300 group-hover:scale-110 ${
              item.invert ? 'invert' : ''
            }`}
          />
        ) : (
          // No official mark to ship — a monogram tile keeps the grid even.
          <span className="grid size-7 place-items-center rounded-md border border-line-hot bg-teal/10 font-mono text-[9px] font-semibold tracking-tight text-teal">
            {item.mono}
          </span>
        )}
      </span>

      <span className="min-w-0 truncate font-mono text-[12px] text-ink-soft transition-colors duration-300 group-hover:text-ink">
        {item.name}
      </span>
    </div>
  )
}
