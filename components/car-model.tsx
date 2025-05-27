"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { Vector3, type Group } from "three"

interface CarModelProps {
  onPositionChange?: (position: Vector3) => void
  onSpeedChange?: (speed: number) => void
}

export default function CarModel({ onPositionChange, onSpeedChange }: CarModelProps) {
  const carRef = useRef<RapierRigidBody>(null)
  const meshRef = useRef<Group>(null)
  const wheelsRef = useRef<Group[]>([])
  const speed = useRef(0)
  const maxSpeed = 15
  const acceleration = 0.5
  const friction = 0.92
  const turnSpeed = 0.05

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

    // Animate wheels
    wheelsRef.current.forEach((wheel) => {
      if (wheel) {
        wheel.rotation.x -= speed.current * delta * 2
      }
    })

    // Move car
    const direction = new Vector3(0, 0, -1)
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
      onPositionChange(new Vector3(pos.x, pos.y, pos.z))
    }
    if (onSpeedChange) {
      onSpeedChange(Math.abs(speed.current))
    }
  })

  return (
    <RigidBody ref={carRef} position={[0, 1, 0]} type="dynamic" mass={1.5}>
      <group ref={meshRef}>
        {/* Main car body */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[2, 0.8, 4.2]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Car hood */}
        <mesh position={[0, 0.4, 1.5]} castShadow>
          <boxGeometry args={[1.8, 0.3, 1.2]} />
          <meshStandardMaterial color="#34495e" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Car roof */}
        <mesh position={[0, 0.8, -0.3]} castShadow>
          <boxGeometry args={[1.6, 0.6, 2.2]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Windshield */}
        <mesh position={[0, 0.9, 0.8]} castShadow>
          <boxGeometry args={[1.5, 0.5, 0.1]} />
          <meshStandardMaterial color="#87ceeb" transparent opacity={0.7} metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Wheels */}
        {[
          [-0.8, -0.1, 1.6],
          [0.8, -0.1, 1.6],
          [-0.8, -0.1, -1.6],
          [0.8, -0.1, -1.6],
        ].map((pos, i) => (
          <group key={i} position={pos as [number, number, number]} ref={(el) => (wheelsRef.current[i] = el!)}>
            {/* Tire */}
            <mesh castShadow>
              <cylinderGeometry args={[0.35, 0.35, 0.25]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
            </mesh>
            {/* Rim */}
            <mesh>
              <cylinderGeometry args={[0.25, 0.25, 0.3]} />
              <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        ))}

        {/* Headlights */}
        <mesh position={[-0.6, 0.2, 2.2]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.6, 0.2, 2.2]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </RigidBody>
  )
}
