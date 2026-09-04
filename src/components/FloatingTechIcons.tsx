import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const TECH_ITEMS = [
  { name: 'Python', color: '#3776AB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js', color: '#339933' },
  { name: 'React', color: '#61DAFB' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'Express', color: '#00d4ff' },
  { name: 'LangGraph', color: '#FF6B6B' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'ChromaDB', color: '#FFB800' },
  { name: 'SQLite', color: '#003B57' },
  { name: 'React Native', color: '#61DAFB' },
  { name: 'Supabase', color: '#3ECF8E' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Ollama', color: '#FFFFFF' },
  { name: 'Gemini', color: '#8B5CF6' },
]

export default function FloatingTechIcons() {
  const groupRef = useRef<THREE.Group>(null)

  const itemData = useMemo(() => {
    return TECH_ITEMS.map((tech, i) => {
      const angle = (i / TECH_ITEMS.length) * Math.PI * 2
      const radius = 5 + Math.random() * 3
      const y = (Math.random() - 0.5) * 6
      const speed = 0.05 + Math.random() * 0.08
      const phaseOffset = Math.random() * Math.PI * 2
      return { ...tech, angle, radius, y, speed, phaseOffset }
    })
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.03
  })

  return (
    <group ref={groupRef}>
      {itemData.map((item, i) => (
        <FloatingLabel key={i} item={item} index={i} />
      ))}
    </group>
  )
}

function FloatingLabel({ item, index }: {
  item: {
    name: string
    color: string
    angle: number
    radius: number
    y: number
    speed: number
    phaseOffset: number
  }
  index: number
}) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const angle = item.angle + t * item.speed
    meshRef.current.position.x = Math.cos(angle) * item.radius
    meshRef.current.position.z = Math.sin(angle) * item.radius
    meshRef.current.position.y = item.y + Math.sin(t * 0.5 + item.phaseOffset) * 0.5

    // Always face camera
    meshRef.current.lookAt(0, meshRef.current.position.y, 0)
    meshRef.current.rotateY(Math.PI)

    // Pulsing opacity
    const mat = meshRef.current.children[0] as THREE.Mesh
    if (mat?.material && 'opacity' in (mat.material as THREE.MeshBasicMaterial)) {
      ;(mat.material as THREE.MeshBasicMaterial).opacity = 0.4 + Math.sin(t + index) * 0.2
    }
  })

  return (
    <group ref={meshRef}>
      {/* Background hexagon */}
      <mesh>
        <circleGeometry args={[0.5, 6]} />
        <meshBasicMaterial
          color={item.color}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Hex border */}
      <mesh>
        <ringGeometry args={[0.48, 0.52, 6]} />
        <meshBasicMaterial
          color={item.color}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Tech name */}
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.15}
        color={item.color}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sJVD7Ng.woff2"
      >
        {item.name}
      </Text>
    </group>
  )
}
