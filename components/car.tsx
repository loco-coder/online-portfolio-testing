"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import * as THREE from "three"

interface CarProps {
  onPositionChange?: (position: THREE.Vector3) => void
  onSpeedChange?: (speed: number) => void
}

export default function Car({ onPositionChange, onSpeedChange }: CarProps) {
  const carRef = useRef<RapierRigidBody>(null)
  const meshRef = useRef<THREE.Group>(null)
  const speed = useRef(0)
  const maxSpeed = 12
  const acceleration = 0.4
  const friction = 0.92
  const turnSpeed = 0.04

  const [, get] = useKeyboardControls()

  useFrame((state, delta) => {
    if (!carRef.current || !meshRef.current) return

    const { forward, backward, left, right } = get()

    // Handle acceleration
    if (forward) {
      speed.current = Math.min(speed.current + acceleration, maxSpeed)
    } else if (backward) {
      speed.current = Math.max(speed.current - acceleration, -maxSpeed * 0.6)
    } else {
      speed.current *= friction
    }

    // Handle turning (only when moving)
    if (Math.abs(speed.current) > 0.1) {
      if (left) {
        meshRef.current.rotation.y += turnSpeed * (speed.current / maxSpeed)
      }
      if (right) {
        meshRef.current.rotation.y -= turnSpeed * (speed.current / maxSpeed)
      }
    }

    // Move car
    const direction = new THREE.Vector3(0, 0, -1)
    direction.applyQuaternion(meshRef.current.quaternion)
    direction.multiplyScalar(speed.current * delta)

    const currentVel = carRef.current.linvel()
    carRef.current.setLinvel(
      {
        x: direction.x,
        y: currentVel.y,
        z: direction.z,
      },
      true,
    )

    carRef.current.setRotation(meshRef.current.quaternion, true)

    // Update position and speed
    const pos = carRef.current.translation()
    if (onPositionChange) {
      onPositionChange(new THREE.Vector3(pos.x, pos.y, pos.z))
    }
    if (onSpeedChange) {
      onSpeedChange(Math.abs(speed.current))
    }
  })

  return (
    <RigidBody ref={carRef} position={[0, 0.5, 0]} type="dynamic" mass={1}>
      <group ref={meshRef}>
        {/* Car body - Bruno Simon style */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.8, 0.6, 3.6]} />
          <meshStandardMaterial color="#ff4444" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Car roof */}
        <mesh position={[0, 0.5, -0.4]} castShadow>
          <boxGeometry args={[1.4, 0.6, 1.8]} />
          <meshStandardMaterial color="#ff4444" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Windshield */}
        <mesh position={[0, 0.6, 0.5]} castShadow>
          <boxGeometry args={[1.4, 0.4, 0.1]} />
          <meshStandardMaterial color="#87ceeb" transparent opacity={0.7} metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Wheels */}
        {[
          [-0.7, -0.2, 1.4],
          [0.7, -0.2, 1.4],
          [-0.7, -0.2, -1.4],
          [0.7, -0.2, -1.4],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.15]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
          </mesh>
        ))}

        {/* Headlights */}
        <mesh position={[-0.5, 0.1, 1.9]}>
          <sphereGeometry args={[0.12]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0.5, 0.1, 1.9]}>
          <sphereGeometry args={[0.12]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </RigidBody>
  )
}
