import { useEffect, useRef, type CSSProperties } from 'react'
import { prefersReducedMotion } from '../lib/reveal'

type DepthTextProps = {
  text: string
  /** Number of stacked copies forming the extrusion. More = smoother sides. */
  layers?: number
  /** Z-distance in px between consecutive layers. */
  depth?: number
  /** Color of the front-most face. */
  faceColor?: string
  /** Color of the extruded side; darkens toward the back. */
  depthColor?: string
  /** Max rotation in degrees on each axis. */
  tilt?: number
  /** Rotate toward the pointer. */
  pointerTracking?: boolean
  /** Lerp factor per frame, 0–1. Lower = heavier, slower follow. */
  smoothing?: number
  perspective?: number
  /** Idle rotation when the pointer isn't driving it. */
  autoOrbit?: boolean
  orbitSpeed?: number
  fontSize?: string
  fontWeight?: number
  /** Cast a soft shadow beneath the text. */
  shadow?: boolean
  className?: string
}

/** #rrggbb -> [r,g,b] */
function parseHex(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const full =
    h.length === 3
      ? h
          .split('')
          .map(c => c + c)
          .join('')
      : h
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ]
}

/** Blends toward black by `t` so the extrusion reads as a lit solid. */
function shade(hex: string, t: number) {
  const [r, g, b] = parseHex(hex)
  const k = 1 - t
  return `rgb(${Math.round(r * k)}, ${Math.round(g * k)}, ${Math.round(b * k)})`
}

/**
 * Extruded 3D text built from stacked CSS layers — no WebGL, no dependency.
 * The whole stack shares one `preserve-3d` parent, so a single rotation on
 * that parent moves every layer together and the sides stay coherent.
 */
export default function DepthText({
  text,
  layers = 34,
  depth = 2.4,
  faceColor = '#f8fafc',
  depthColor = '#3ac2ed',
  tilt = 7.5,
  pointerTracking = false,
  smoothing = 0.14,
  perspective = 900,
  autoOrbit = false,
  orbitSpeed = 0.35,
  fontSize = 'clamp(3rem, 12vw, 7rem)',
  fontWeight = 900,
  shadow = false,
  className = '',
}: DepthTextProps) {
  const stageRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    // Static render honors the OS motion preference.
    if (prefersReducedMotion() || (!pointerTracking && !autoOrbit)) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    const start = performance.now()

    const onPointerMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect()
      // Normalize against the element's own center, clamped so the tilt
      // saturates once the pointer is roughly a box-width away.
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
      targetY = Math.max(-1, Math.min(1, nx)) * tilt
      targetX = -Math.max(-1, Math.min(1, ny)) * tilt
    }

    const frame = (now: number) => {
      let tx = targetX
      let ty = targetY

      if (autoOrbit) {
        const t = ((now - start) / 1000) * orbitSpeed
        // Lissajous drift so the idle motion never looks like a loop.
        ty += Math.sin(t) * tilt * 0.6
        tx += Math.cos(t * 0.7) * tilt * 0.35
      }

      currentX += (tx - currentX) * smoothing
      currentY += (ty - currentY) * smoothing
      stage.style.transform = `rotateX(${currentX.toFixed(3)}deg) rotateY(${currentY.toFixed(3)}deg)`
      raf = requestAnimationFrame(frame)
    }

    if (pointerTracking) window.addEventListener('pointermove', onPointerMove, { passive: true })
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [pointerTracking, autoOrbit, orbitSpeed, tilt, smoothing])

  const typography: CSSProperties = {
    fontSize,
    fontWeight,
    lineHeight: 0.95,
    letterSpacing: '-0.035em',
    whiteSpace: 'nowrap',
  }

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ perspective: `${perspective}px` }}
    >
      {/* Real text for assistive tech and copy/paste; the layers are decorative. */}
      <span className="sr-only">{text}</span>

      <span
        ref={stageRef}
        aria-hidden
        className="relative inline-block will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Back-to-front: sides first, face last so it paints on top. */}
        {Array.from({ length: layers }).map((_, i) => {
          const isFace = i === layers - 1
          // i = 0 is deepest. Darken the far layers for a lit-solid falloff.
          const t = 1 - i / Math.max(1, layers - 1)
          return (
            <span
              key={i}
              className={i === 0 ? 'block' : 'absolute inset-0 block'}
              style={{
                ...typography,
                color: isFace ? faceColor : shade(depthColor, t * 0.72),
                transform: `translateZ(${(i - (layers - 1)) * depth}px)`,
                textShadow:
                  isFace && shadow ? '0 18px 40px rgba(0,0,0,0.55)' : undefined,
              }}
            >
              {text}
            </span>
          )
        })}
      </span>
    </span>
  )
}
