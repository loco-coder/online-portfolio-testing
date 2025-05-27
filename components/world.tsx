"use client"

import { RigidBody } from "@react-three/rapier"
import { Text } from "@react-three/drei"
import { Vector3 } from "three"

interface WorldProps {
  carPosition?: Vector3
  onSectionEnter?: (section: string) => void
}

export default function World({ carPosition, onSectionEnter }: WorldProps) {
  // Check proximity to sections
  const checkProximity = (position: [number, number, number], section: string) => {
    if (!carPosition) return
    const distance = carPosition.distanceTo(new Vector3(...position))
    if (distance < 8) {
      onSectionEnter?.(section)
    }
  }

  if (carPosition) {
    checkProximity([0, 0, -25], "about")
    checkProximity([25, 0, 0], "projects")
    checkProximity([0, 0, 25], "skills")
    checkProximity([-25, 0, 0], "contact")
  }

  return (
    <>
      {/* Ground */}
      <RigidBody type="fixed">
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[300, 300]} />
          <meshStandardMaterial color="#2d5a27" />
        </mesh>
      </RigidBody>

      {/* About Section - Engineering Building */}
      <group position={[0, 0, -25]}>
        <RigidBody type="fixed" position={[0, 2.5, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[12, 5, 4]} />
            <meshStandardMaterial color="#3498db" metalness={0.3} roughness={0.7} />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" position={[0, 6, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[8, 2, 3]} />
            <meshStandardMaterial color="#2980b9" metalness={0.3} roughness={0.7} />
          </mesh>
        </RigidBody>
        <Text position={[0, 8.5, 2.1]} fontSize={1.5} color="white" anchorX="center" anchorY="middle">
          ABOUT
        </Text>
        <Text position={[0, 7, 2.1]} fontSize={0.8} color="#ffb347" anchorX="center" anchorY="middle">
          ENGINEER-IN-TRAINING
        </Text>
      </group>

      {/* Projects Section - Industrial Complex */}
      <group position={[25, 0, 0]}>
        <RigidBody type="fixed" position={[0, 2.5, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4, 5, 12]} />
            <meshStandardMaterial color="#e74c3c" metalness={0.5} roughness={0.5} />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" position={[0, 6, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3, 2, 8]} />
            <meshStandardMaterial color="#c0392b" metalness={0.5} roughness={0.5} />
          </mesh>
        </RigidBody>
        {/* Smokestacks for industrial look */}
        <RigidBody type="fixed" position={[1, 8, 2]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.3, 4]} />
            <meshStandardMaterial color="#7f8c8d" metalness={0.8} roughness={0.2} />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" position={[-1, 8, -2]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.3, 4]} />
            <meshStandardMaterial color="#7f8c8d" metalness={0.8} roughness={0.2} />
          </mesh>
        </RigidBody>
        <Text
          position={[2.1, 8.5, 0]}
          fontSize={1.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI / 2, 0]}
        >
          PROJECTS
        </Text>
        <Text
          position={[2.1, 7, 0]}
          fontSize={0.6}
          color="#ffb347"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI / 2, 0]}
        >
          CAD • SUSTAINABILITY • ANALYSIS
        </Text>
      </group>

      {/* Skills Section - Tech Laboratory */}
      <group position={[0, 0, 25]}>
        <RigidBody type="fixed" position={[0, 2.5, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[12, 5, 4]} />
            <meshStandardMaterial color="#9b59b6" metalness={0.7} roughness={0.3} />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" position={[0, 6.5, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[3, 4, 3]} />
            <meshStandardMaterial color="#8e44ad" metalness={0.7} roughness={0.3} />
          </mesh>
        </RigidBody>
        {/* Tech antennas */}
        <RigidBody type="fixed" position={[2, 9, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.1, 0.1, 2]} />
            <meshStandardMaterial color="#ecf0f1" metalness={0.9} roughness={0.1} />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" position={[-2, 9, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.1, 0.1, 2]} />
            <meshStandardMaterial color="#ecf0f1" metalness={0.9} roughness={0.1} />
          </mesh>
        </RigidBody>
        <Text
          position={[0, 9.5, -2.1]}
          fontSize={1.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI, 0]}
        >
          SKILLS
        </Text>
        <Text
          position={[0, 8, -2.1]}
          fontSize={0.6}
          color="#ffb347"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI, 0]}
        >
          SOLIDWORKS • PYTHON • TOUCHDESIGNER
        </Text>
      </group>

      {/* Contact Section - Communication Hub */}
      <group position={[-25, 0, 0]}>
        <RigidBody type="fixed" position={[0, 2.5, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4, 5, 12]} />
            <meshStandardMaterial color="#f39c12" metalness={0.4} roughness={0.6} />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" position={[0, 6, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1, 2, 4]} />
            <meshStandardMaterial color="#e67e22" metalness={0.4} roughness={0.6} />
          </mesh>
        </RigidBody>
        {/* Communication dish */}
        <RigidBody type="fixed" position={[0, 9, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 0.1, 0.2]} />
            <meshStandardMaterial color="#ecf0f1" metalness={0.8} roughness={0.2} />
          </mesh>
        </RigidBody>
        <Text
          position={[-2.1, 8.5, 0]}
          fontSize={1.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[0, -Math.PI / 2, 0]}
        >
          CONTACT
        </Text>
        <Text
          position={[-2.1, 7, 0]}
          fontSize={0.6}
          color="#ffb347"
          anchorX="center"
          anchorY="middle"
          rotation={[0, -Math.PI / 2, 0]}
        >
          OTTAWA • ENGINEERING • COLLABORATION
        </Text>
      </group>

      {/* Engineering equipment scattered around */}
      {Array.from({ length: 25 }, (_, i) => {
        const x = (Math.random() - 0.5) * 180
        const z = (Math.random() - 0.5) * 180
        const height = Math.random() * 4 + 1

        // Avoid placing near main sections
        if (Math.abs(x) < 20 && Math.abs(z) < 20) return null
        if (Math.abs(x - 25) < 12 && Math.abs(z) < 12) return null
        if (Math.abs(x + 25) < 12 && Math.abs(z) < 12) return null
        if (Math.abs(x) < 12 && Math.abs(z - 25) < 12) return null
        if (Math.abs(x) < 12 && Math.abs(z + 25) < 12) return null

        const isIndustrial = Math.random() > 0.6

        return (
          <RigidBody key={i} type="fixed" position={[x, height / 2, z]}>
            <mesh castShadow receiveShadow>
              {isIndustrial ? (
                <cylinderGeometry args={[0.8, 1.2, height]} />
              ) : (
                <boxGeometry args={[1.2, height, 1.2]} />
              )}
              <meshStandardMaterial
                color={`hsl(${Math.random() * 60 + 200}, 60%, 50%)`}
                metalness={0.7}
                roughness={0.4}
              />
            </mesh>
          </RigidBody>
        )
      })}

      {/* Road markers with engineering theme */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2
        const radius = 15
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <mesh key={`marker-${i}`} position={[x, 0.1, z]}>
            <cylinderGeometry args={[0.4, 0.4, 0.2]} />
            <meshStandardMaterial color="#ffb347" emissive="#ffb347" emissiveIntensity={0.3} />
          </mesh>
        )
      })}
    </>
  )
}
