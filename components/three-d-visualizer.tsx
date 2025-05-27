"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Box, Sphere, Cylinder, Cone } from "@react-three/drei"
import type * as THREE from "three"

interface ModelComponentProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  color: string
  label: string
  type: "box" | "sphere" | "cylinder" | "cone"
  scale?: number
}

function ModelComponent({ position, rotation = [0, 0, 0], color, label, type, scale = 1 }: ModelComponentProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      if (hovered) {
        meshRef.current.scale.setScalar(scale * 1.1)
      } else {
        meshRef.current.scale.setScalar(scale)
      }
    }
  })

  const renderGeometry = () => {
    switch (type) {
      case "sphere":
        return <Sphere ref={meshRef} args={[1]} />
      case "cylinder":
        return <Cylinder ref={meshRef} args={[0.5, 0.5, 2]} />
      case "cone":
        return <Cone ref={meshRef} args={[0.8, 2]} />
      default:
        return <Box ref={meshRef} args={[1.5, 1.5, 1.5]} />
    }
  }

  return (
    <group position={position} rotation={rotation}>
      <mesh onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)} castShadow receiveShadow>
        {renderGeometry()}
        <meshStandardMaterial
          color={hovered ? "#ff6b6b" : color}
          metalness={0.7}
          roughness={0.3}
          emissive={hovered ? "#ff6b6b" : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {hovered && (
        <Text position={[0, 2.5, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
          {label}
        </Text>
      )}
    </group>
  )
}

function CameraController() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(8, 6, 8)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return null
}

function Scene() {
  const engineeringModels = [
    { position: [-3, 0, -3] as [number, number, number], color: "#3498db", label: "CAD Model A", type: "box" as const },
    {
      position: [3, 0, -3] as [number, number, number],
      color: "#e74c3c",
      label: "Assembly B",
      type: "cylinder" as const,
    },
    {
      position: [-3, 0, 3] as [number, number, number],
      color: "#9b59b6",
      label: "Component C",
      type: "sphere" as const,
    },
    { position: [3, 0, 3] as [number, number, number], color: "#f39c12", label: "Part D", type: "cone" as const },
    {
      position: [0, 2, 0] as [number, number, number],
      color: "#27ae60",
      label: "Main Assembly",
      type: "box" as const,
      scale: 1.5,
    },
  ]

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4ecdc4" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Engineering Models */}
      {engineeringModels.map((model, index) => (
        <ModelComponent key={index} {...model} />
      ))}

      {/* Central Platform */}
      <mesh position={[0, -1.5, 0]} receiveShadow>
        <cylinderGeometry args={[4, 4, 0.2]} />
        <meshStandardMaterial color="#34495e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Title */}
      <Text
        position={[0, 5, 0]}
        fontSize={1}
        color="#2c3e50"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Geist_Bold.json"
      >
        3D Engineering Models
      </Text>

      <Text
        position={[0, 4, 0]}
        fontSize={0.4}
        color="#7f8c8d"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Geist_Regular.json"
      >
        Interactive CAD Visualization
      </Text>
    </>
  )
}

interface ThreeDVisualizerProps {
  className?: string
}

export default function ThreeDVisualizer({ className = "" }: ThreeDVisualizerProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading 3D Models...</p>
          </div>
        </div>
      )}

      <Canvas
        camera={{ position: [8, 6, 8], fov: 50 }}
        shadows
        gl={{ antialias: true }}
        dpr={[1, 2]}
        className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <CameraController />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
        />
        <Scene />
        <fog attach="fog" args={["#f0f0f0", 10, 30]} />
      </Canvas>

      {/* Controls Info */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg text-sm">
        <p className="font-medium mb-1">3D Controls:</p>
        <p>• Drag to rotate</p>
        <p>• Scroll to zoom</p>
        <p>• Hover models for info</p>
      </div>

      {/* Performance Info */}
      <div className="absolute top-4 right-4 bg-black/70 text-white p-3 rounded-lg text-sm">
        <p className="font-medium">Interactive CAD Models</p>
        <p className="text-gray-300">Real-time 3D Visualization</p>
      </div>
    </div>
  )
}
