import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from 'motion/react'
import React, { Children, cloneElement, useEffect, useRef, useState } from 'react'

export type DockItemData = {
  icon: React.ReactNode
  label: React.ReactNode
  onClick: () => void
  /** Lights the item when its section is in view. */
  isActive?: boolean
  className?: string
}

export type DockProps = {
  items: DockItemData[]
  className?: string
  distance?: number
  baseItemSize?: number
  magnification?: number
  spring?: SpringOptions
}

type DockItemProps = {
  className?: string
  children: React.ReactNode
  onClick?: () => void
  mouseX: MotionValue<number>
  spring: SpringOptions
  distance: number
  baseItemSize: number
  magnification: number
  label?: React.ReactNode
  isActive?: boolean
}

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  label,
  isActive,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isHovered = useMotionValue(0)

  // Horizontal gap between the pointer and this item's center.
  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize }
    return val - rect.x - baseItemSize / 2
  })

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  )
  const size = useSpring(targetSize, spring)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.()
    }
  }

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`relative inline-flex shrink-0 cursor-pointer items-center justify-center transition-colors duration-300 ${
        isActive ? 'text-teal' : 'text-ink-mute hover:text-ink'
      } ${className}`}
      tabIndex={0}
      role="link"
      aria-label={typeof label === 'string' ? label : undefined}
      aria-current={isActive ? 'true' : undefined}
    >
      {Children.map(children, child =>
        React.isValidElement(child)
          ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, {
              isHovered,
            })
          : child
      )}

      {/* Active marker: an underline that grows in, rather than a ring. */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-1/2 h-0.5 w-5 origin-center -translate-x-1/2 rounded-full bg-teal shadow-[0_0_8px_var(--color-teal)]"
      />
    </motion.div>
  )
}

type DockLabelProps = {
  className?: string
  children: React.ReactNode
  isHovered?: MotionValue<number>
}

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isHovered) return
    const unsubscribe = isHovered.on('change', latest => setIsVisible(latest === 1))
    return () => unsubscribe()
  }, [isHovered])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 4 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          // Labels hang below the bar, since there's nothing above it.
          className={`${className} pointer-events-none absolute left-1/2 top-full w-fit whitespace-pre rounded-md border border-line-soft bg-deep px-2.5 py-1 font-mono text-[11px] text-ink shadow-lg`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

type DockIconProps = {
  className?: string
  children: React.ReactNode
  isHovered?: MotionValue<number>
}

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`flex items-center justify-center ${className}`}>{children}</div>
}

/**
 * Inline magnifying dock, sized to sit inside the fixed top bar. Magnification
 * is deliberately restrained (38 -> 52px) so items never overflow the header.
 */
export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 52,
  distance = 140,
  baseItemSize = 38,
}: DockProps) {
  const mouseX = useMotionValue(Infinity)

  return (
    <div
      onMouseMove={({ pageX }) => mouseX.set(pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`${className} flex items-center gap-4 lg:gap-6`}
      style={{ height: magnification }}
      role="toolbar"
      aria-label="Section navigation"
    >
      {items.map((item, index) => (
        <DockItem
          key={index}
          onClick={item.onClick}
          className={item.className}
          mouseX={mouseX}
          spring={spring}
          distance={distance}
          magnification={magnification}
          baseItemSize={baseItemSize}
          label={item.label}
          isActive={item.isActive}
        >
          <DockIcon>{item.icon}</DockIcon>
          <DockLabel>{item.label}</DockLabel>
        </DockItem>
      ))}
    </div>
  )
}
