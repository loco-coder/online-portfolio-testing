"use client"

import { useEffect, useRef } from "react"

interface SoundManagerProps {
  speed: number
  isMoving: boolean
}

export default function SoundManager({ speed, isMoving }: SoundManagerProps) {
  const engineIdleRef = useRef<HTMLAudioElement | null>(null)
  const engineRevRef = useRef<HTMLAudioElement | null>(null)
  const ambientRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio elements
    engineIdleRef.current = new Audio("/audio/engine-idle.mp3")
    engineRevRef.current = new Audio("/audio/engine-rev.mp3")
    ambientRef.current = new Audio("/audio/ambient.mp3")

    // Set volume to 45%
    if (engineIdleRef.current) {
      engineIdleRef.current.volume = 0.45
      engineIdleRef.current.loop = true
    }
    if (engineRevRef.current) {
      engineRevRef.current.volume = 0.45
      engineRevRef.current.loop = true
    }
    if (ambientRef.current) {
      ambientRef.current.volume = 0.2 // Lower ambient volume
      ambientRef.current.loop = true
      ambientRef.current.play().catch(() => {
        // Handle autoplay restrictions
      })
    }

    return () => {
      // Cleanup
      if (engineIdleRef.current) {
        engineIdleRef.current.pause()
        engineIdleRef.current = null
      }
      if (engineRevRef.current) {
        engineRevRef.current.pause()
        engineRevRef.current = null
      }
      if (ambientRef.current) {
        ambientRef.current.pause()
        ambientRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!engineIdleRef.current || !engineRevRef.current) return

    if (isMoving) {
      // Start engine sounds
      engineIdleRef.current.play().catch(() => {})

      if (speed > 2) {
        engineRevRef.current.play().catch(() => {})
        // Adjust playback rate based on speed
        engineRevRef.current.playbackRate = Math.min(1 + speed * 0.1, 2)
        engineRevRef.current.volume = Math.min(0.45 * (speed / 8), 0.45)
      } else {
        engineRevRef.current.pause()
        engineRevRef.current.currentTime = 0
      }
    } else {
      // Stop engine sounds when not moving
      engineIdleRef.current.pause()
      engineIdleRef.current.currentTime = 0
      engineRevRef.current.pause()
      engineRevRef.current.currentTime = 0
    }
  }, [isMoving, speed])

  useEffect(() => {
    // Adjust engine rev volume and pitch based on speed
    if (engineRevRef.current && isMoving && speed > 2) {
      const normalizedSpeed = Math.min(speed / 8, 1)
      engineRevRef.current.volume = 0.45 * normalizedSpeed
      engineRevRef.current.playbackRate = 1 + normalizedSpeed * 0.5
    }
  }, [speed, isMoving])

  return null
}
