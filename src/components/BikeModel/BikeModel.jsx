import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import * as THREE from 'three'

function Motorcycle() {
  const bike = useRef()
  const scroll = useScroll()

  useFrame((state, delta) => {
    const scrollOffset = scroll.offset
    bike.current.rotation.y = scrollOffset * Math.PI * 2
    bike.current.position.y = Math.sin(scrollOffset * Math.PI) * 2
  })

  return (
    <group ref={bike}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 1, 1]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Front Wheel */}
      <mesh position={[1.5, -0.5, 0]}>
        <torusGeometry args={[0.5, 0.1, 16, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Back Wheel */}
      <mesh position={[-1.5, -0.5, 0]}>
        <torusGeometry args={[0.5, 0.1, 16, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Seat */}
      <mesh position={[-0.5, 0.6, 0]}>
        <boxGeometry args={[1, 0.2, 0.8]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Handlebar */}
      <mesh position={[1.2, 0.8, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Engine Block */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.5, 0.8, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  )
}

export default function BikeModel() {
  return (
    <div className="bike-model">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <ScrollControls pages={3} damping={0.1}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Motorcycle />
        </ScrollControls>
      </Canvas>
    </div>
  )
}