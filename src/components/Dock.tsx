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

export type DockItemData = {
  icon: React.ReactNode
  label: React.ReactNode
  onClick: () => void
  /** Lights the item and its underline when its section is in view. */
  isActive?: boolean
  className?: string
}

export type DockProps = {
  items: DockItemData[]
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
      className={`relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border shadow-md transition-colors duration-300 ${
        isActive
          ? 'border-line-hot bg-teal/12 text-teal'
          : 'border-line-soft bg-panel text-ink-mute hover:border-line-hot hover:text-ink'
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

      {/* Active marker sits below the pill, out of the icon's way. */}
      {isActive && (
        <span
          aria-hidden
          className="absolute -bottom-2 size-1 rounded-full bg-teal shadow-[0_0_8px_var(--color-teal)]"
        />
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
          className={`${className} pointer-events-none absolute -top-7 left-1/2 w-fit whitespace-pre rounded-md border border-line-soft bg-deep px-2.5 py-1 font-mono text-[11px] text-ink`}
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

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 64,
  distance = 180,
  panelHeight = 64,
  dockHeight = 200,
  baseItemSize = 46,
}: DockProps) {
  const mouseX = useMotionValue(Infinity)
  const isHovered = useMotionValue(0)

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [dockHeight, magnification]
  )
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight])
  const height = useSpring(heightRow, spring)

  return (
    // The growing wrapper must not swallow clicks on the page behind it, so
    // only the panel itself takes pointer events back.
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden justify-center md:flex">
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
          className={`${className} pointer-events-auto absolute bottom-4 left-1/2 flex w-fit -translate-x-1/2 items-end gap-3 rounded-2xl border border-line-soft bg-deep/85 px-4 pb-3 pt-2 backdrop-blur-xl`}
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
