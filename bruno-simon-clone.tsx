"use client"

import { Canvas } from "@react-three/fiber"
import { KeyboardControls, Environment } from "@react-three/drei"
import { Physics } from "@react-three/rapier"
import { Suspense, useState, useRef } from "react"
import { Vector3 } from "three"
import LoadingScreen from "./components/loading-screen"
import CarModel from "./components/car-model"
import World from "./components/world"
import CameraController from "./components/camera-controller"
import UI from "./components/ui"
import SoundSystem from "./components/sound-system"

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
]

export default function Component() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [carSpeed, setCarSpeed] = useState(0)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const carPosition = useRef(new Vector3(0, 1, 0))

  const handleCarPositionChange = (position: Vector3) => {
    carPosition.current.copy(position)
  }

  const handleSectionEnter = (section: string) => {
    setActiveSection(section)
    setTimeout(() => setActiveSection(null), 8000)
  }

  if (!isLoaded) {
    return <LoadingScreen onLoadingComplete={() => setIsLoaded(true)} />
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden">
      <KeyboardControls map={keyboardMap}>
        <Canvas camera={{ position: [0, 20, 12], fov: 50 }} shadows gl={{ antialias: true }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Physics gravity={[0, -9.81, 0]} debug={false}>
              {/* Lighting */}
              <ambientLight intensity={0.4} />
              <directionalLight
                position={[30, 30, 15]}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={100}
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
              />

              {/* Point lights for better illumination */}
              <pointLight position={[0, 10, 0]} intensity={0.5} />
              <pointLight position={[20, 10, 20]} intensity={0.3} />
              <pointLight position={[-20, 10, -20]} intensity={0.3} />

              {/* Environment */}
              <Environment preset="night" />

              {/* World */}
              <World carPosition={carPosition.current} onSectionEnter={handleSectionEnter} />

              {/* Car */}
              <CarModel onPositionChange={handleCarPositionChange} onSpeedChange={setCarSpeed} />

              {/* Camera */}
              <CameraController target={carPosition.current} />
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>

      {/* Sound System */}
      <SoundSystem speed={carSpeed} isMoving={carSpeed > 0.1} />

      {/* UI */}
      <UI activeSection={activeSection} />
    </div>
  )
}
