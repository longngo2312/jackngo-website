import { useEffect, useRef } from 'react'
import { Camera, Geometry, Mesh, Program, Renderer } from 'ogl'
import { prefersReducedMotion } from '../lib/reveal'

interface ParticlesProps {
  particleCount?: number
  particleSpread?: number
  speed?: number
  particleColors?: string[]
  moveParticlesOnHover?: boolean
  particleHoverFactor?: number
  alphaParticles?: boolean
  particleBaseSize?: number
  sizeRandomness?: number
  cameraDistance?: number
  disableRotation?: boolean
  pixelRatio?: number
  className?: string
}

/** Site palette: teal, emerald, sky, plus a muted ink for depth. */
const defaultColors: string[] = ['#2dd4bf', '#34d399', '#38bdf8', '#7a949c']

const hexToRgb = (hex: string): [number, number, number] => {
  let h = hex.replace(/^#/, '')
  if (h.length === 3) {
    h = h
      .split('')
      .map(c => c + c)
      .join('')
  }
  const int = parseInt(h.slice(0, 6), 16)
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255]
}

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor = color;

    vec3 pos = position * uSpread;
    pos.z *= 10.0;

    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

    vec4 mvPos = viewMatrix * mPos;

    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }

    gl_Position = projectionMatrix * mvPos;
  }
`

const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));

    // Hue drift is dialed down from the original 0.2 so particles stay inside
    // the site palette instead of cycling through off-brand colors.
    vec3 tint = vColor + 0.06 * sin(uv.yxx + uTime + vRandom.y * 6.28);

    if (uAlphaParticles < 0.5) {
      if (d > 0.5) discard;
      gl_FragColor = vec4(tint, 1.0);
    } else {
      float circle = smoothstep(0.5, 0.1, d) * 0.85;
      gl_FragColor = vec4(tint, circle);
    }
  }
`

/**
 * WebGL particle field used as the page backdrop. Deliberately quiet: low
 * alpha, palette-locked colors, and it stops rendering when the tab is hidden
 * or the visitor asks for reduced motion.
 */
export default function Particles({
  particleCount = 190,
  particleSpread = 12,
  speed = 0.055,
  particleColors,
  moveParticlesOnHover = true,
  particleHoverFactor = 0.45,
  alphaParticles = true,
  particleBaseSize = 240,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  pixelRatio,
  className = '',
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Cap DPR: this is a decorative full-screen layer, and 3x retina costs a
    // lot of fill rate for detail nobody sees.
    const dpr = pixelRatio ?? Math.min(window.devicePixelRatio || 1, 2)
    const reduced = prefersReducedMotion()

    const renderer = new Renderer({ dpr, depth: false, alpha: true })
    const gl = renderer.gl
    container.appendChild(gl.canvas)
    gl.clearColor(0, 0, 0, 0)
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    gl.canvas.style.display = 'block'

    const camera = new Camera(gl, { fov: 15 })
    camera.position.set(0, 0, cameraDistance)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container
      if (!w || !h) return
      renderer.setSize(w, h)
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height })
    }
    // ResizeObserver catches container changes the window resize event misses.
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    // The backdrop is pointer-events:none, so a listener on the container would
    // never fire — track on window and map into container space instead.
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      }
    }
    const trackPointer = moveParticlesOnHover && !reduced
    if (trackPointer) window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const count = particleCount
    const positions = new Float32Array(count * 3)
    const randoms = new Float32Array(count * 4)
    const colors = new Float32Array(count * 3)
    const palette = particleColors?.length ? particleColors : defaultColors

    for (let i = 0; i < count; i++) {
      // Rejection-sample inside the unit sphere for an even distribution.
      let x: number, y: number, z: number, len: number
      do {
        x = Math.random() * 2 - 1
        y = Math.random() * 2 - 1
        z = Math.random() * 2 - 1
        len = x * x + y * y + z * z
      } while (len > 1 || len === 0)
      const r = Math.cbrt(Math.random())
      positions.set([x * r, y * r, z * r], i * 3)
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4)
      colors.set(hexToRgb(palette[Math.floor(Math.random() * palette.length)]), i * 3)
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    })

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize * dpr },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false,
    })

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program })

    // Reduced motion: draw one static frame and stop.
    if (reduced) {
      renderer.render({ scene: particles, camera })
      return () => {
        ro.disconnect()
        if (container.contains(gl.canvas)) container.removeChild(gl.canvas)
      }
    }

    let raf = 0
    let lastTime = performance.now()
    let elapsed = 0

    const update = (t: number) => {
      raf = requestAnimationFrame(update)
      // Clamp delta so a backgrounded tab doesn't resume with a huge jump.
      const delta = Math.min(t - lastTime, 64)
      lastTime = t
      elapsed += delta * speed

      program.uniforms.uTime.value = elapsed * 0.001

      if (trackPointer) {
        // Ease toward the pointer instead of snapping to it.
        particles.position.x +=
          (-mouseRef.current.x * particleHoverFactor - particles.position.x) * 0.05
        particles.position.y +=
          (-mouseRef.current.y * particleHoverFactor - particles.position.y) * 0.05
      }

      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15
        particles.rotation.z += 0.01 * speed
      }

      renderer.render({ scene: particles, camera })
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else {
        lastTime = performance.now()
        raf = requestAnimationFrame(update)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(update)

    return () => {
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      if (trackPointer) window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(raf)
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas)
      // Free the GL context rather than waiting on GC — hot reloads otherwise
      // pile up contexts until the browser drops the oldest.
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [
    particleCount,
    particleSpread,
    speed,
    particleColors,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
    pixelRatio,
  ])

  return <div ref={containerRef} className={`h-full w-full ${className}`} />
}
