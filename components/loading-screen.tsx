"use client"

import { useState, useEffect } from "react"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("LOADING")

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onLoadingComplete, 500)
          return 100
        }
        return prev + Math.random() * 3 + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const dots = prev.split("LOADING")[1] || ""
        if (dots.length >= 3) return "LOADING"
        return "LOADING" + ".".repeat(dots.length + 1)
      })
    }, 500)

    return () => clearInterval(textInterval)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center z-50">
      <div className="relative">
        {/* Main loading frame */}
        <div className="border-2 border-white transform -skew-y-1 bg-transparent">
          <div className="px-16 py-8">
            <div className="text-white text-2xl font-light tracking-[0.3em] transform skew-y-1">{loadingText}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 h-1 bg-white/30 transform -skew-y-1">
          <div className="h-full bg-white transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
        </div>

        {/* Percentage */}
        <div className="text-white text-sm font-light mt-4 text-center tracking-wider">{Math.round(progress)}%</div>
      </div>
    </div>
  )
}
