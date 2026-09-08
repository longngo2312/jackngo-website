import { useEffect, useState } from 'react'
import { ArrowUpIcon } from './icons'

export default function ScrollTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-28 right-5 z-40 md:bottom-7 md:right-7 grid size-12 cursor-pointer place-items-center rounded-xl bg-linear-to-br from-teal to-sky text-deep shadow-[0_0_28px_-8px_rgba(45,212,191,0.8)] transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUpIcon />
    </button>
  )
}
