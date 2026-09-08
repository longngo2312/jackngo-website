import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRightIcon } from './icons'

export type CardNavLink = {
  label: string
  href: string
  ariaLabel: string
  /** Opens in a new tab and shows the external arrow. */
  external?: boolean
}

export type CardNavItem = {
  label: string
  bgColor: string
  textColor: string
  links: CardNavLink[]
}

export interface CardNavProps {
  /** Rendered in the top bar — a monogram node here rather than an image src. */
  logo?: ReactNode
  logoAlt?: string
  items: CardNavItem[]
  className?: string
  baseColor?: string
  menuColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
  ctaLabel?: string
  ctaHref?: string
  onNavigate?: (href: string) => void
}

const TOP_BAR = 60
// The content div carries its own p-2, so no extra padding is added here.
const PADDING = 0

/**
 * Expanding card navigation for small screens. Ported from the GSAP original
 * to `motion`, which the Dock already pulls in — a second animation runtime
 * would have cost ~25KB gzip for the same two tweens.
 */
export default function CardNav({
  logo,
  items,
  className = '',
  baseColor = '#0b1418',
  menuColor = '#e6f0f2',
  buttonBgColor = 'rgba(45,212,191,0.12)',
  buttonTextColor = '#2dd4bf',
  ctaLabel = 'resume.pdf',
  ctaHref,
  onNavigate,
}: CardNavProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  // Measure the cards while they're laid out but hidden, so the height tween
  // has a real target instead of the original's hardcoded 260px fallback.
  const measure = useCallback(() => {
    const el = contentRef.current
    if (!el) return
    setContentHeight(el.scrollHeight)
  }, [])

  useLayoutEffect(() => {
    measure()
  }, [measure, items])

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  // Close on Escape, matching the sheet it replaces.
  useEffect(() => {
    if (!isExpanded) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isExpanded])

  const handleLink = (e: React.MouseEvent, link: CardNavLink) => {
    if (link.external) return
    e.preventDefault()
    setIsExpanded(false)
    onNavigate?.(link.href)
  }

  return (
    <div
      className={`card-nav-container fixed left-1/2 top-3 z-50 w-[92%] max-w-[800px] -translate-x-1/2 ${className}`}
    >
      <motion.nav
        animate={{ height: isExpanded ? TOP_BAR + contentHeight + PADDING : TOP_BAR }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative block overflow-hidden rounded-2xl border border-line-soft shadow-lg backdrop-blur-xl will-change-[height]"
        style={{ backgroundColor: baseColor, height: TOP_BAR }}
      >
        {/* Top bar */}
        <div className="absolute inset-x-0 top-0 z-[2] flex h-[60px] items-center justify-between p-2 pl-3">
          <div className="flex items-center gap-2.5">{logo}</div>

          <div className="flex items-center gap-2">
            {ctaHref && (
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center rounded-lg px-3.5 font-mono text-[12px] font-medium"
                style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              >
                {ctaLabel}
              </a>
            )}

            <button
              type="button"
              onClick={() => setIsExpanded(v => !v)}
              aria-label={isExpanded ? 'Close menu' : 'Open menu'}
              aria-expanded={isExpanded}
              className="group flex size-9 cursor-pointer flex-col items-center justify-center gap-[6px] rounded-lg"
              style={{ color: menuColor }}
            >
              <span
                className={`h-[2px] w-[26px] origin-center bg-current transition-transform duration-300 ${
                  isExpanded ? 'translate-y-[4px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[2px] w-[26px] origin-center bg-current transition-transform duration-300 ${
                  isExpanded ? '-translate-y-[4px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={contentRef}
          className={`absolute inset-x-0 top-[60px] z-[1] flex flex-col items-stretch gap-2 p-2 ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
          aria-hidden={!isExpanded}
        >
          {items.slice(0, 3).map((item, idx) => (
            <motion.div
              key={`${item.label}-${idx}`}
              animate={isExpanded ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                delay: isExpanded ? 0.08 * idx : 0,
              }}
              className="relative flex min-h-[60px] select-none flex-col gap-2 rounded-xl border border-line-soft px-4 py-3"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="font-display text-[19px] font-semibold tracking-[-0.01em]">
                {item.label}
              </div>

              <div className="mt-auto flex flex-col gap-1">
                {item.links.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    onClick={e => handleLink(e, lnk)}
                    {...(lnk.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="inline-flex items-center gap-1.5 font-mono text-[13.5px] no-underline transition-opacity duration-300 hover:opacity-70"
                  >
                    <ArrowUpRightIcon />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.nav>
    </div>
  )
}
