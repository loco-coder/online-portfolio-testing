"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Vector3 } from "three"

interface CameraControllerProps {
  target: Vector3
}

export default function CameraController({ target }: CameraControllerProps) {
  const { camera } = useThree()
  const cameraPosition = useRef(new Vector3(0, 20, 12))
  const cameraTarget = useRef(new Vector3(0, 0, 0))

  useFrame(() => {
    // Bruno Simon style camera - slightly angled top-down view
    const idealPosition = new Vector3(target.x, target.y + 20, target.z + 12)

    cameraPosition.current.lerp(idealPosition, 0.02)
    cameraTarget.current.lerp(target, 0.02)

    camera.position.copy(cameraPosition.current)
    camera.lookAt(cameraTarget.current)
  })

  return null
}
