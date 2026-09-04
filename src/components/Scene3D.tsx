import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import ParticleField from './ParticleField'
import HolographicRings from './HolographicRings'
import FloatingTechIcons from './FloatingTechIcons'

export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: '#060b18' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <ParticleField />
          <HolographicRings />
          <FloatingTechIcons />
        </Suspense>
      </Canvas>
    </div>
  )
}
