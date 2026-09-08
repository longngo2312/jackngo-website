import { useEffect, useRef } from 'react'

/** True when the visitor has asked the OS to reduce motion. */
export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Scroll reveal. Adds `is-in` once an element crosses into view, then stops
 * observing it — reveals are one-way, so scrolling back up doesn't re-animate.
 * Attach the returned ref to a container; every descendant `.reveal` is picked
 * up, plus the container itself if it carries the class.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.matches('.reveal')
      ? [el, ...el.querySelectorAll<HTMLElement>('.reveal')]
      : [...el.querySelectorAll<HTMLElement>('.reveal')]

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    targets.forEach(t => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return ref
}

/** Staggers a reveal by index without needing a class per position. */
export function stagger(i: number, step = 90) {
  return { transitionDelay: `${i * step}ms` }
}
