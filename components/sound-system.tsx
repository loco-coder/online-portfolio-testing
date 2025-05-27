"use client"

import { useEffect, useRef } from "react"

interface SoundSystemProps {
  speed: number
  isMoving: boolean
}

export default function SoundSystem({ speed, isMoving }: SoundSystemProps) {
  const engineRef = useRef<HTMLAudioElement | null>(null)
  const ambientRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio elements
    engineRef.current = new Audio()
    ambientRef.current = new Audio()

    // Set properties
    if (engineRef.current) {
      engineRef.current.loop = true
      engineRef.current.volume = 0.45
    }

    if (ambientRef.current) {
      ambientRef.current.loop = true
      ambientRef.current.volume = 0.2
      // Start ambient sound
      ambientRef.current.play().catch(() => {})
    }

    return () => {
      if (engineRef.current) {
        engineRef.current.pause()
      }
      if (ambientRef.current) {
        ambientRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    if (!engineRef.current) return

    if (isMoving && speed > 0.5) {
      engineRef.current.play().catch(() => {})
      // Adjust pitch and volume based on speed
      engineRef.current.playbackRate = 0.8 + (speed / 12) * 0.7
      engineRef.current.volume = Math.min(0.45 * (speed / 8), 0.45)
    } else {
      engineRef.current.pause()
      engineRef.current.currentTime = 0
    }
  }, [isMoving, speed])

  return null
}
