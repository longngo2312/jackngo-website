import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function HolographicRings() {
  const group = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.rotation.x = Math.sin(t * 0.1) * 0.1
    group.current.rotation.z = Math.cos(t * 0.15) * 0.05
  })

  const ringData = [
    { radius: 3, tube: 0.008, color: '#00d4ff', speed: 0.3, tilt: 0.3 },
    { radius: 3.5, tube: 0.005, color: '#1e90ff', speed: -0.2, tilt: 0.6 },
    { radius: 4, tube: 0.006, color: '#00d4ff', speed: 0.15, tilt: 1.0 },
    { radius: 4.5, tube: 0.004, color: '#0891b2', speed: -0.25, tilt: 0.8 },
    { radius: 5, tube: 0.003, color: '#00d4ff', speed: 0.1, tilt: 1.2 },
  ]

  return (
    <group ref={group}>
      {ringData.map((ring, i) => (
        <Ring key={i} {...ring} />
      ))}
    </group>
  )
}

function Ring({ radius, tube, color, speed, tilt }: {
  radius: number
  tube: number
  color: string
  speed: number
  tilt: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.z = clock.getElapsedTime() * speed
  })

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, tube, 16, 100]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
