import { useState, useEffect, useCallback } from 'react'

const BOOT_LINES = [
  { text: '> INITIALIZING J.A.R.V.I.S. PROTOCOL...', delay: 0 },
  { text: '> Loading neural network modules...', delay: 400 },
  { text: '> Establishing secure connection... [OK]', delay: 800 },
  { text: '> Calibrating holographic display... [OK]', delay: 1200 },
  { text: '> Backend systems................ [ONLINE]', delay: 1600 },
  { text: '> AI/ML subsystems.............. [ONLINE]', delay: 2000 },
  { text: '> Threat assessment............. [CLEAR]', delay: 2400 },
  { text: '> All systems operational.', delay: 2800 },
  { text: '', delay: 3200 },
  { text: '> Welcome back, sir.', delay: 3400 },
]

const TOTAL_DURATION = 4200

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [fading, setFading] = useState(false)

  const handleSkip = useCallback(() => {
    setFading(true)
    setTimeout(onComplete, 500)
  }, [onComplete])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(prev => [...prev, i])
        }, line.delay)
      )
    })

    timers.push(
      setTimeout(() => {
        setFading(true)
        setTimeout(onComplete, 800)
      }, TOTAL_DURATION)
    )

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-800 ${fading ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: '#060b18' }}
    >
      {/* Arc Reactor during boot */}
      <div className="arc-reactor mb-12 scale-75">
        <div className="core" />
        <div className="ring" />
        <div className="ring" />
        <div className="ring" />
        <div className="ring" />
      </div>

      {/* Terminal output */}
      <div className="font-mono text-sm max-w-xl w-full px-8 text-center">
        {BOOT_LINES.map((line, i) => (
          <div
            key={i}
            className={`transition-opacity duration-300 mb-1 ${
              visibleLines.includes(i) ? 'opacity-100' : 'opacity-0'
            } ${line.text.includes('[OK]') || line.text.includes('[ONLINE]') || line.text.includes('[CLEAR]')
              ? 'text-[var(--jarvis-green)]'
              : line.text.includes('Welcome')
              ? 'text-[var(--jarvis-cyan)] glow-text text-base'
              : 'text-[var(--jarvis-text-dim)]'
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 text-xs text-[var(--jarvis-text-dim)] hover:text-[var(--jarvis-cyan)] transition-colors cursor-pointer border border-[var(--jarvis-border)] px-3 py-1"
      >
        SKIP &gt;&gt;
      </button>
    </div>
  )
}
