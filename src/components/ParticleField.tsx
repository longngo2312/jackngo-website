import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 2000

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const vel = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 30
      pos[i3 + 1] = (Math.random() - 0.5) * 30
      pos[i3 + 2] = (Math.random() - 0.5) * 30
      vel[i3] = (Math.random() - 0.5) * 0.005
      vel[i3 + 1] = (Math.random() - 0.5) * 0.005
      vel[i3 + 2] = (Math.random() - 0.5) * 0.005
    }
    return [pos, vel]
  }, [])

  const colors = useMemo(() => {
    const col = new Float32Array(PARTICLE_COUNT * 3)
    const cyan = new THREE.Color('#00d4ff')
    const blue = new THREE.Color('#1e90ff')
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const c = Math.random() > 0.3 ? cyan : blue
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return col
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
    const t = clock.getElapsedTime()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      pos[i3] += velocities[i3] + Math.sin(t * 0.3 + i * 0.01) * 0.002
      pos[i3 + 1] += velocities[i3 + 1] + Math.cos(t * 0.2 + i * 0.01) * 0.002
      pos[i3 + 2] += velocities[i3 + 2]

      // Wrap particles
      for (let j = 0; j < 3; j++) {
        if (pos[i3 + j] > 15) pos[i3 + j] = -15
        if (pos[i3 + j] < -15) pos[i3 + j] = 15
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y = t * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
