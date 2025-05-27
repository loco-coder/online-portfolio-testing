"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { MathUtils, Vector3, BufferGeometry, BackSide, BufferAttribute, AdditiveBlending } from "three"
import type * as THREE from "three"

interface BubbleProps {
  position: [number, number, number]
  scale: number
  speed: number
  orbitRadius: number
  color: string
  link: string
  label: string
  onClick: (link: string) => void
  onHover: (link: string | null) => void
  mousePosition: Vector3
  isPaused: boolean
}

interface ParticleProps {
  position: Vector3
  velocity: Vector3
  life: number
  maxLife: number
}

function ParticleSystem({ bubblePositions }: { bubblePositions: Vector3[] }) {
  const particlesRef = useRef<THREE.Points>(null)
  const particles = useRef<ParticleProps[]>([])
  const maxParticles = 50

  const particleGeometry = useMemo(() => {
    const geometry = new BufferGeometry()
    const positions = new Float32Array(maxParticles * 3)
    const colors = new Float32Array(maxParticles * 3)
    const sizes = new Float32Array(maxParticles)

    for (let i = 0; i < maxParticles * 3; i++) {
      positions[i] = 0
      colors[i] = 1
    }
    for (let i = 0; i < maxParticles; i++) {
      sizes[i] = 1
    }

    geometry.setAttribute("position", new BufferAttribute(positions, 3))
    geometry.setAttribute("color", new BufferAttribute(colors, 3))
    geometry.setAttribute("size", new BufferAttribute(sizes, 1))

    return geometry
  }, [])

  useFrame(() => {
    if (!particlesRef.current) return

    const positionAttribute = particleGeometry.attributes.position
    const colorAttribute = particleGeometry.attributes.color
    const sizeAttribute = particleGeometry.attributes.size

    if (!positionAttribute || !colorAttribute || !sizeAttribute) return

    const positions = positionAttribute.array as Float32Array
    const colors = colorAttribute.array as Float32Array
    const sizes = sizeAttribute.array as Float32Array

    // Add new particles near bubbles
    if (particles.current.length < maxParticles && Math.random() < 0.05 && bubblePositions.length > 0) {
      const bubblePos = bubblePositions[Math.floor(Math.random() * bubblePositions.length)]
      if (bubblePos && bubblePos instanceof Vector3) {
        particles.current.push({
          position: bubblePos
            .clone()
            .add(new Vector3((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5)),
          velocity: new Vector3(
            (Math.random() - 0.5) * 0.005,
            (Math.random() - 0.5) * 0.005,
            (Math.random() - 0.5) * 0.005,
          ),
          life: 0,
          maxLife: Math.random() * 3 + 2,
        })
      }
    }

    // Update particles
    particles.current = particles.current.filter((particle, index) => {
      if (!particle?.position || !particle?.velocity) return false

      particle.life += 0.016
      particle.position.add(particle.velocity)
      particle.velocity.multiplyScalar(0.99)

      const alpha = 1 - particle.life / particle.maxLife

      if (alpha > 0 && index < maxParticles) {
        const i = index * 3
        if (i + 2 < positions.length) {
          positions[i] = particle.position.x
          positions[i + 1] = particle.position.y
          positions[i + 2] = particle.position.z

          colors[i] = 0.8
          colors[i + 1] = 0.6
          colors[i + 2] = 1.0

          if (index < sizes.length) {
            sizes[index] = alpha * 1.5
          }
        }
        return true
      }
      return false
    })

    positionAttribute.needsUpdate = true
    colorAttribute.needsUpdate = true
    sizeAttribute.needsUpdate = true
  })

  return (
    <points ref={particlesRef} geometry={particleGeometry}>
      <pointsMaterial size={2} transparent opacity={0.6} vertexColors sizeAttenuation blending={AdditiveBlending} />
    </points>
  )
}

function Bubble({
  position,
  scale,
  speed,
  orbitRadius,
  color,
  link,
  label,
  onClick,
  onHover,
  mousePosition,
  isPaused,
}: BubbleProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const currentPosition = useRef(new Vector3(...position))
  const velocity = useRef(new Vector3(0, 0, 0))
  const baseOrbitAngle = useRef(Math.random() * Math.PI * 2)

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return

    const time = state.clock.getElapsedTime()

    // Calculate base orbital position
    if (!isPaused) {
      baseOrbitAngle.current += speed * 0.01
    }

    const baseX = Math.cos(baseOrbitAngle.current) * orbitRadius
    const baseZ = Math.sin(baseOrbitAngle.current) * orbitRadius
    const baseY = Math.sin(time * speed * 0.5) * 0.3

    const targetPosition = new Vector3(baseX, baseY, baseZ)

    // Mouse attraction/repulsion
    const mouseDistance = currentPosition.current.distanceTo(mousePosition)
    if (mouseDistance < 3) {
      const attractionForce = (3 - mouseDistance) / 3
      const direction = currentPosition.current.clone().sub(mousePosition).normalize()

      // Attraction for hover, repulsion for others
      const forceMultiplier = hovered ? -0.5 : 1.0
      targetPosition.add(direction.multiplyScalar(attractionForce * forceMultiplier))
    }

    // Smooth physics movement
    const force = targetPosition.clone().sub(currentPosition.current).multiplyScalar(0.02)
    velocity.current.add(force)
    velocity.current.multiplyScalar(0.95) // Damping

    currentPosition.current.add(velocity.current)
    groupRef.current.position.copy(currentPosition.current)

    // Rotation
    meshRef.current.rotation.x += 0.005
    meshRef.current.rotation.y += 0.003

    // Scale animation
    const targetScale = hovered ? scale * 1.3 : scale
    meshRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1)
  })

  // FIXED: Accept event parameter but handle it safely
  const handlePointerEnter = (event: any) => {
    setHovered(true)
    document.body.style.cursor = "pointer"
    if (["about", "projects", "skills", "contact"].includes(link)) {
      onHover(link)
    }
  }

  const handlePointerLeave = (event: any) => {
    setHovered(false)
    document.body.style.cursor = "auto"
    if (["about", "projects", "skills", "contact"].includes(link)) {
      onHover(null)
    }
  }

  const handleClick = (event: any) => {
    onClick(link)
  }

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={meshRef}
        scale={scale}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          reflectivity={0.8}
          transparent
          opacity={hovered ? 0.95 : 0.85}
        />
      </mesh>

      {/* Larger invisible collision sphere for easier interaction */}
      <mesh
        scale={[1.8, 1.8, 1.8]}
        visible={false}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Hover label */}
      {hovered && (
        <group position={[0, 1.8, 0]}>
          <mesh>
            <planeGeometry args={[2.5, 0.5]} />
            <meshBasicMaterial color="rgba(0,0,0,0.8)" transparent />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[2.3, 0.4]} />
            <meshBasicMaterial color="white" />
          </mesh>
        </group>
      )}
    </group>
  )
}

interface BubbleSceneProps {
  onBubbleClick: (link: string) => void
  onBubbleHover: (link: string | null) => void
}

export default function BubbleScene({ onBubbleClick, onBubbleHover }: BubbleSceneProps) {
  const { mouse, viewport } = useThree()
  const bubblePositions = useRef<Vector3[]>([])
  const mouseWorldPosition = useRef(new Vector3(0, 0, 0))
  const [isPaused, setIsPaused] = useState(false)

  const bubbles = useMemo(() => {
    const portfolioLinks = [
      { link: "about", label: "About", color: "#3498db", orbitRadius: 3.5 },
      { link: "projects", label: "Projects", color: "#e74c3c", orbitRadius: 4.2 },
      { link: "skills", label: "Skills", color: "#9b59b6", orbitRadius: 3.8 },
      { link: "contact", label: "Contact", color: "#f39c12", orbitRadius: 4.5 },
      { link: "github", label: "GitHub", color: "#2c3e50", orbitRadius: 2.8 },
      { link: "linkedin", label: "LinkedIn", color: "#0077b5", orbitRadius: 5.2 },
      { link: "resume", label: "Resume", color: "#27ae60", orbitRadius: 3.2 },
    ]

    return portfolioLinks.map((item, index) => ({
      position: [
        Math.cos((index / portfolioLinks.length) * Math.PI * 2) * item.orbitRadius,
        (Math.random() - 0.5) * 0.8,
        Math.sin((index / portfolioLinks.length) * Math.PI * 2) * item.orbitRadius,
      ] as [number, number, number],
      scale: MathUtils.randFloat(0.7, 1.0),
      speed: MathUtils.randFloat(0.8, 1.5),
      orbitRadius: item.orbitRadius,
      color: item.color,
      link: item.link,
      label: item.label,
    }))
  }, [])

  useFrame(() => {
    // Convert mouse position to world coordinates
    if (mouse && viewport) {
      const mouseX = (mouse.x * viewport.width) / 2
      const mouseY = (mouse.y * viewport.height) / 2
      mouseWorldPosition.current.set(mouseX, mouseY, 0)
    }

    // Update bubble positions for particle system
    const newPositions: Vector3[] = []
    bubbles.forEach((bubble, index) => {
      const pos = new Vector3(
        Math.cos((index / bubbles.length) * Math.PI * 2) * bubble.orbitRadius,
        0,
        Math.sin((index / bubbles.length) * Math.PI * 2) * bubble.orbitRadius,
      )
      newPositions.push(pos)
    })
    bubblePositions.current = newPositions
  })

  const handleBubbleClick = (link: string) => {
    onBubbleClick(link)
  }

  const handleBubbleHover = (link: string | null) => {
    setIsPaused(link !== null)
    onBubbleHover(link)
  }

  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, 5, 5]} intensity={0.8} color="#ff6b6b" />
      <pointLight position={[5, -5, -5]} intensity={0.8} color="#4ecdc4" />
      <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} />

      {/* Environment sphere */}
      <mesh visible={false}>
        <sphereGeometry args={[100]} />
        <meshBasicMaterial color="#f8f9fa" side={BackSide} />
      </mesh>

      {/* Bubbles */}
      {bubbles.map((bubble, index) => (
        <group key={index} data-bubble-index={index}>
          <Bubble
            {...bubble}
            onClick={handleBubbleClick}
            onHover={handleBubbleHover}
            mousePosition={mouseWorldPosition.current}
            isPaused={isPaused}
          />
        </group>
      ))}

      {/* Particle System */}
      <ParticleSystem bubblePositions={bubblePositions.current} />

      {/* Central gravitational point */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.02]} />
        <meshBasicMaterial color="#999999" transparent opacity={0.3} />
      </mesh>

      {/* Orbital rings (subtle) */}
      {bubbles.map((bubble, index) => (
        <mesh key={`ring-${index}`} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[bubble.orbitRadius - 0.02, bubble.orbitRadius + 0.02, 64]} />
          <meshBasicMaterial color="#cccccc" transparent opacity={0.1} />
        </mesh>
      ))}

      {/* Atmospheric fog */}
      <fog attach="fog" args={["#f8f9fa", 8, 25]} />
    </>
  )
}
