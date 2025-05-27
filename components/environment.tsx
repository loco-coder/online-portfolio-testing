"use client"

import { Text3D } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import * as THREE from "three"

interface EnvironmentProps {
  onSectionEnter?: (section: string) => void
  onSectionExit?: () => void
  carPosition?: THREE.Vector3
}

export default function Environment({ onSectionEnter, onSectionExit, carPosition }: EnvironmentProps) {
  // Load realistic textures
  const grassTexture = useLoader(TextureLoader, "/placeholder.svg?height=512&width=512")
  const concreteTexture = useLoader(TextureLoader, "/placeholder.svg?height=256&width=256")
  const brickTexture = useLoader(TextureLoader, "/placeholder.svg?height=512&width=512")
  const woodTexture = useLoader(TextureLoader, "/placeholder.svg?height=256&width=256")
  const metalTexture = useLoader(TextureLoader, "/placeholder.svg?height=128&width=128")

  // Set texture repeat for tiling
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping
  grassTexture.repeat.set(50, 50)

  concreteTexture.wrapS = concreteTexture.wrapT = THREE.RepeatWrapping
  concreteTexture.repeat.set(2, 2)

  brickTexture.wrapS = brickTexture.wrapT = THREE.RepeatWrapping
  brickTexture.repeat.set(3, 2)

  const checkProximity = (sectionPosition: [number, number, number], sectionName: string) => {
    if (!carPosition) return

    const distance = carPosition.distanceTo(new THREE.Vector3(...sectionPosition))
    if (distance < 8) {
      onSectionEnter?.(sectionName)
    } else if (distance > 10) {
      onSectionExit?.()
    }
  }

  // Check proximity for all sections
  if (carPosition) {
    checkProximity([-15, 0, -10], "about")
    checkProximity([15, 0, -10], "projects")
    checkProximity([0, 0, -25], "skills")
    checkProximity([0, 0, 15], "contact")
  }

  return (
    <>
      {/* Infinite Ground - Much larger surface */}
      <RigidBody type="fixed">
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial map={grassTexture} color="#2d5a27" roughness={0.8} metalness={0.1} />
        </mesh>
      </RigidBody>

      {/* Invisible walls to prevent falling off the world */}
      <RigidBody type="fixed" position={[500, 10, 0]}>
        <mesh visible={false}>
          <boxGeometry args={[1, 20, 1000]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[-500, 10, 0]}>
        <mesh visible={false}>
          <boxGeometry args={[1, 20, 1000]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[0, 10, 500]}>
        <mesh visible={false}>
          <boxGeometry args={[1000, 20, 1]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[0, 10, -500]}>
        <mesh visible={false}>
          <boxGeometry args={[1000, 20, 1]} />
        </mesh>
      </RigidBody>

      {/* Portfolio sections with realistic materials */}

      {/* About section - Brick building */}
      <RigidBody type="fixed" position={[-15, 2, -10]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[6, 4, 2]} />
          <meshStandardMaterial map={brickTexture} color="#4a90e2" roughness={0.7} metalness={0.1} />
        </mesh>
      </RigidBody>
      <Text3D font="/fonts/Geist_Bold.json" size={0.8} height={0.1} position={[-17, 5, -8.9]}>
        ABOUT
        <meshStandardMaterial color="#fff" />
      </Text3D>

      {/* Projects section - Metal building */}
      <RigidBody type="fixed" position={[15, 2, -10]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[6, 4, 2]} />
          <meshStandardMaterial map={metalTexture} color="#e74c3c" roughness={0.3} metalness={0.8} />
        </mesh>
      </RigidBody>
      <Text3D font="/fonts/Geist_Bold.json" size={0.6} height={0.1} position={[12.5, 5, -8.9]}>
        PROJECTS
        <meshStandardMaterial color="#fff" />
      </Text3D>

      {/* Skills section - Concrete building */}
      <RigidBody type="fixed" position={[0, 2, -25]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[6, 4, 2]} />
          <meshStandardMaterial map={concreteTexture} color="#9b59b6" roughness={0.9} metalness={0.1} />
        </mesh>
      </RigidBody>
      <Text3D font="/fonts/Geist_Bold.json" size={0.8} height={0.1} position={[-2, 5, -23.9]}>
        SKILLS
        <meshStandardMaterial color="#fff" />
      </Text3D>

      {/* Contact section - Wood building */}
      <RigidBody type="fixed" position={[0, 2, 15]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[6, 4, 2]} />
          <meshStandardMaterial map={woodTexture} color="#f39c12" roughness={0.8} metalness={0.1} />
        </mesh>
      </RigidBody>
      <Text3D font="/fonts/Geist_Bold.json" size={0.6} height={0.1} position={[-2.5, 5, 16.1]}>
        CONTACT
        <meshStandardMaterial color="#fff" />
      </Text3D>

      {/* Decorative objects with varied materials */}
      {Array.from({ length: 20 }, (_, i) => {
        const position: [number, number, number] = [
          (Math.random() - 0.5) * 200,
          Math.random() * 3 + 1,
          (Math.random() - 0.5) * 200,
        ]
        const size: [number, number, number] = [Math.random() * 2 + 1, Math.random() * 4 + 2, Math.random() * 2 + 1]
        const materialType = Math.floor(Math.random() * 3)

        return (
          <RigidBody key={i} type="fixed" position={position}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={size} />
              <meshStandardMaterial
                map={materialType === 0 ? brickTexture : materialType === 1 ? concreteTexture : metalTexture}
                color={`hsl(${Math.random() * 360}, 70%, 60%)`}
                roughness={materialType === 2 ? 0.3 : 0.8}
                metalness={materialType === 2 ? 0.8 : 0.1}
              />
            </mesh>
          </RigidBody>
        )
      })}

      {/* Trees with realistic bark texture */}
      {Array.from({ length: 15 }, (_, i) => {
        const position: [number, number, number] = [(Math.random() - 0.5) * 300, 0, (Math.random() - 0.5) * 300]

        return (
          <group key={`tree-${i}`} position={position}>
            {/* Trunk with collision */}
            <RigidBody type="fixed" position={[0, 2, 0]}>
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.3, 0.5, 4]} />
                <meshStandardMaterial map={woodTexture} color="#8b4513" roughness={0.9} metalness={0.1} />
              </mesh>
            </RigidBody>
            {/* Leaves */}
            <mesh position={[0, 5, 0]} castShadow receiveShadow>
              <sphereGeometry args={[2]} />
              <meshStandardMaterial color="#228b22" roughness={0.8} metalness={0.1} />
            </mesh>
          </group>
        )
      })}
    </>
  )
}
