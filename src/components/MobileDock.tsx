import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from 'motion/react'
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react'

export type MobileDockItemData = {
  icon: React.ReactNode
  label: React.ReactNode
  onClick: () => void
  isActive?: boolean
  className?: string
}

export type MobileDockProps = {
  items: MobileDockItemData[]
  className?: string
  distance?: number
  panelHeight?: number
  baseItemSize?: number
  dockHeight?: number
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
      className={`relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border-2 shadow-md transition-colors duration-300 ${
        isActive
          ? 'border-line-hot bg-teal/12 text-teal'
          : 'border-line-soft bg-panel text-ink-mute'
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
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} pointer-events-none absolute -top-7 left-1/2 w-fit whitespace-pre rounded-md border border-line-soft bg-deep px-2 py-0.5 font-mono text-[11px] text-ink`}
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
 * The original floating bottom dock, used as the phone navigation.
 *
 * Two changes were needed to make it work as a real fixed nav rather than a
 * demo: the growing height wrapper is `pointer-events-none` so it can't
 * swallow taps on the page beneath it, and sizes are tuned so six items fit
 * inside a 360px viewport (6x40 + 5x8 gaps + padding).
 */
export default function MobileDock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 56,
  distance = 120,
  panelHeight = 58,
  dockHeight = 140,
  baseItemSize = 40,
}: MobileDockProps) {
  const mouseX = useMotionValue(Infinity)
  const isHovered = useMotionValue(0)

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [dockHeight, magnification]
  )
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight])
  const height = useSpring(heightRow, spring)

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center md:hidden">
      <motion.div style={{ height }} className="relative mx-2 flex max-w-full items-end">
        <motion.div
          onMouseMove={({ pageX }) => {
            isHovered.set(1)
            mouseX.set(pageX)
          }}
          onMouseLeave={() => {
            isHovered.set(0)
            mouseX.set(Infinity)
          }}
          className={`${className} pointer-events-auto absolute bottom-3 left-1/2 flex w-fit -translate-x-1/2 items-end gap-2 rounded-2xl border-2 border-line-soft bg-deep/90 px-3 pb-2 pt-1.5 backdrop-blur-xl`}
          style={{ height: panelHeight }}
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
        </motion.div>
      </motion.div>
    </div>
  )
}
