import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/profile'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger: 0.2,
        duration: 0.7,
        ease: 'power2.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen w-full py-24 px-4 md:px-8 lg:px-16 flex flex-col items-center">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-[family-name:var(--font-display)] text-[var(--jarvis-cyan)] text-xs tracking-[0.3em]">02</span>
          <div className="glow-line flex-1" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-[0.2em] text-[var(--jarvis-cyan)] glow-text">
            PROJECTS
          </h2>
          <div className="glow-line flex-1" />
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="project-card hud-panel p-6 md:p-8 transition-all duration-500 hex-grid-bg"
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl tracking-wider text-[var(--jarvis-cyan)]">
            {project.name}
          </h3>
          <p className="text-xs text-[var(--jarvis-text-dim)] tracking-wider mt-1">
            {project.subtitle}
          </p>
        </div>
        <span className={`text-[10px] tracking-wider px-2 py-0.5 border ${
          project.status === 'OPERATIONAL'
            ? 'text-[var(--jarvis-green)] border-[var(--jarvis-green)]'
            : 'text-[var(--jarvis-amber)] border-[var(--jarvis-amber)]'
        }`}>
          {project.status}
        </span>
      </div>

      <div className={`grid grid-cols-1 ${expanded ? 'lg:grid-cols-2' : ''} gap-6`}>
        {/* Left: description + metrics */}
        <div>
          <p className="text-sm text-[var(--jarvis-text)] leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {project.metrics.map(metric => (
                <div key={metric.label} className="text-center p-3 border border-[var(--jarvis-border)]">
                  <div className="text-lg font-bold text-[var(--jarvis-cyan)] glow-text">{metric.value}</div>
                  <div className="text-[10px] text-[var(--jarvis-text-dim)] tracking-wider mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map(t => (
              <span
                key={t}
                className="text-[10px] tracking-wider px-2 py-0.5 border border-[var(--jarvis-border)] text-[var(--jarvis-text-dim)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Architecture diagram (visible when expanded) */}
        {expanded && project.architecture && (
          <div className="border border-[var(--jarvis-border)] p-4 bg-[rgba(0,0,0,0.3)]">
            <div className="text-[10px] tracking-[0.2em] text-[var(--jarvis-cyan)] mb-3 font-[family-name:var(--font-display)]">
              ◇ SYSTEM ARCHITECTURE
            </div>
            <ArchitectureDiagram nodes={project.architecture} />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 border-t border-[var(--jarvis-border)]">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-wider text-[var(--jarvis-cyan)] hover:glow-text transition-all"
        >
          ▸ VIEW SOURCE
        </a>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[10px] text-[var(--jarvis-text-dim)] hover:text-[var(--jarvis-cyan)] transition-colors cursor-pointer ml-auto tracking-wider"
        >
          {expanded ? '[ ▲ COLLAPSE SCHEMATIC ]' : '[ ▼ EXPAND SCHEMATIC ]'}
        </button>
      </div>
    </div>
  )
}

/** Renders architecture flow as an animated SVG HUD diagram */
function ArchitectureDiagram({ nodes }: { nodes: { from: string; to: string }[] }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [animated, setAnimated] = useState(false)

  // Extract unique node names preserving order
  const nodeNames: string[] = []
  nodes.forEach(n => {
    if (!nodeNames.includes(n.from)) nodeNames.push(n.from)
    if (!nodeNames.includes(n.to)) nodeNames.push(n.to)
  })

  const cols = Math.min(nodeNames.length, 4)
  const rows = Math.ceil(nodeNames.length / cols)
  const nodeW = 120
  const nodeH = 32
  const gapX = 160
  const gapY = 60
  const padX = 20
  const padY = 20
  const svgW = padX * 2 + cols * nodeW + (cols - 1) * (gapX - nodeW)
  const svgH = padY * 2 + rows * nodeH + (rows - 1) * (gapY - nodeH)

  const nodePositions = new Map<string, { x: number; y: number }>()
  nodeNames.forEach((name, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    nodePositions.set(name, {
      x: padX + col * gapX,
      y: padY + row * gapY,
    })
  })

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!animated || !svgRef.current) return
    const paths = svgRef.current.querySelectorAll('.flow-path')
    const rects = svgRef.current.querySelectorAll('.flow-node')

    gsap.from(rects, {
      opacity: 0,
      scale: 0.8,
      stagger: 0.08,
      duration: 0.4,
      ease: 'power2.out',
    })

    gsap.from(paths, {
      strokeDashoffset: 200,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.3,
    })
  }, [animated])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full h-auto"
      style={{ minHeight: 150 }}
    >
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="#00d4ff" strokeWidth="1" />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Connection lines */}
      {nodes.map((edge, i) => {
        const from = nodePositions.get(edge.from)!
        const to = nodePositions.get(edge.to)!
        const x1 = from.x + nodeW / 2
        const y1 = from.y + nodeH
        const x2 = to.x + nodeW / 2
        const y2 = to.y
        return (
          <path
            key={i}
            className="flow-path"
            d={`M${x1},${y1} C${x1},${y1 + 15} ${x2},${y2 - 15} ${x2},${y2}`}
            fill="none"
            stroke="#00d4ff"
            strokeWidth="1"
            strokeDasharray="4 2"
            opacity="0.5"
            markerEnd="url(#arrow)"
            filter="url(#glow)"
          />
        )
      })}

      {/* Nodes */}
      {nodeNames.map((name, i) => {
        const pos = nodePositions.get(name)!
        return (
          <g key={i} className="flow-node">
            <rect
              x={pos.x}
              y={pos.y}
              width={nodeW}
              height={nodeH}
              fill="rgba(0, 212, 255, 0.06)"
              stroke="#00d4ff"
              strokeWidth="1"
              opacity="0.7"
            />
            {/* Corner accents */}
            <line x1={pos.x} y1={pos.y} x2={pos.x + 8} y2={pos.y} stroke="#00d4ff" strokeWidth="2" />
            <line x1={pos.x} y1={pos.y} x2={pos.x} y2={pos.y + 8} stroke="#00d4ff" strokeWidth="2" />
            <line x1={pos.x + nodeW} y1={pos.y + nodeH} x2={pos.x + nodeW - 8} y2={pos.y + nodeH} stroke="#00d4ff" strokeWidth="2" />
            <line x1={pos.x + nodeW} y1={pos.y + nodeH} x2={pos.x + nodeW} y2={pos.y + nodeH - 8} stroke="#00d4ff" strokeWidth="2" />
            <text
              x={pos.x + nodeW / 2}
              y={pos.y + nodeH / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#e0f7ff"
              fontSize="9"
              fontFamily="'Fira Code', monospace"
              letterSpacing="0.5"
            >
              {name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
