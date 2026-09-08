import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/reveal'

/** Outer node positions, 8 spokes at 45° on a 24x24 box (extent 1.9 -> 22.1). */
const NODES: [number, number][] = [
  [20.25, 12],
  [17.83, 17.83],
  [12, 20.25],
  [6.17, 17.83],
  [3.75, 12],
  [6.17, 6.17],
  [12, 3.75],
  [17.83, 6.17],
]

/**
 * Neural-network node mark: a hub with eight weighted edges out to
 * surrounding nodes. Uses `currentColor` and carries no fixed size, so one
 * definition serves the header tile, the extruded stack, and anything else.
 */
export function NodeMark({
  className = 'size-6',
  color = 'currentColor',
}: {
  className?: string
  color?: string
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <g stroke={color} strokeWidth="1.5" strokeLinecap="round">
        {NODES.map(([x, y]) => (
          <line key={`l${x}-${y}`} x1="12" y1="12" x2={x} y2={y} />
        ))}
      </g>
      <g fill={color}>
        {NODES.map(([x, y]) => (
          <circle key={`c${x}-${y}`} cx={x} cy={y} r="1.85" />
        ))}
        <circle cx="12" cy="12" r="3.15" />
      </g>
    </svg>
  )
}

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

/** Linear blend between two hex colors, t=0 -> a, t=1 -> b. */
function mix(a: string, b: string, t: number) {
  const [r1, g1, b1] = parseHex(a)
  const [r2, g2, b2] = parseHex(b)
  return `rgb(${Math.round(r1 + (r2 - r1) * t)}, ${Math.round(g1 + (g2 - g1) * t)}, ${Math.round(
    b1 + (b2 - b1) * t
  )})`
}

/**
 * The mark extruded into 3D: copies of the flat SVG stacked along Z inside one
 * `preserve-3d` parent, so a single rotation on that parent turns the whole
 * solid and the extruded sides stay coherent. Same technique as DepthText —
 * no WebGL context spun up for a 40px logo.
 *
 * Depth is deliberately shallow: the mark renders ~25px wide, so anything past
 * a few px of extrusion stops reading as a solid and starts reading as blur.
 */
export function NodeMark3D({
  className = 'size-6',
  layers = 8,
  depth = 0.5,
  faceColor = '#04080a',
  sideColor = '#0b3a35',
  tilt = 11,
  speed = 0.3,
  perspective = 220,
}: {
  className?: string
  layers?: number
  depth?: number
  faceColor?: string
  sideColor?: string
  tilt?: number
  speed?: number
  perspective?: number
}) {
  const stageRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || prefersReducedMotion()) return

    let raf = 0
    const start = performance.now()

    const frame = (now: number) => {
      const t = ((now - start) / 1000) * speed
      // Lissajous drift so the idle rotation never reads as a plain spin.
      const ry = Math.sin(t) * tilt
      const rx = Math.cos(t * 0.7) * tilt * 0.5
      stage.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [tilt, speed])

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ perspective: `${perspective}px` }}
    >
      <span
        ref={stageRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {Array.from({ length: layers }).map((_, i) => {
          const isFace = i === layers - 1
          // i = 0 is the deepest layer; blend the sides toward the face.
          const t = i / Math.max(1, layers - 1)
          return (
            <span
              key={i}
              className="absolute inset-0"
              style={{ transform: `translateZ(${(i - (layers - 1)) * depth}px)` }}
            >
              <NodeMark
                className="size-full"
                color={isFace ? faceColor : mix(sideColor, faceColor, t * 0.85)}
              />
            </span>
          )
        })}
      </span>
    </span>
  )
}

/** The mark on its gradient tile, as used in the header. */
export function LogoTile({ className = 'size-10' }: { className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl bg-linear-to-br from-teal to-sky shadow-[0_0_22px_-6px_rgba(45,212,191,0.7)] ${className}`}
    >
      <NodeMark3D className="size-[62%]" />
    </span>
  )
}
