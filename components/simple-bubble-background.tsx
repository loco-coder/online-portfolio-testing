"use client"

import { useEffect, useRef, useState } from "react"

interface Bubble {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  link: string
  label: string
  targetX: number
  targetY: number
  orbitAngle: number
  orbitRadius: number
  orbitSpeed: number
  mass: number
  isHovered: boolean
  isPaused: boolean
}

interface SimpleBubbleBackgroundProps {
  onBubbleHover: (link: string | null) => void
  onBubbleClick: (link: string) => void
  currentSection: string
}

export default function SimpleBubbleBackground({
  onBubbleHover,
  onBubbleClick,
  currentSection,
}: SimpleBubbleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const hoverTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize bubbles with resume bubble
    const portfolioLinks = [
      { link: "about", label: "About", color: "#3498db" },
      { link: "projects", label: "Projects", color: "#e74c3c" },
      { link: "skills", label: "Skills", color: "#9b59b6" },
      { link: "contact", label: "Contact", color: "#f39c12" },
      { link: "resume", label: "Resume", color: "#27ae60" },
      { link: "github", label: "GitHub", color: "#2c3e50" },
      { link: "linkedin", label: "LinkedIn", color: "#0077b5" },
    ]

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    const initialBubbles: Bubble[] = portfolioLinks.map((item, index) => {
      const angle = (index / portfolioLinks.length) * Math.PI * 2
      const orbitRadius = 150 + Math.random() * 100
      return {
        id: index,
        x: centerX + Math.cos(angle) * orbitRadius,
        y: centerY + Math.sin(angle) * orbitRadius,
        vx: 0,
        vy: 0,
        radius: 30 + Math.random() * 20,
        color: item.color,
        link: item.link,
        label: item.label,
        targetX: centerX + Math.cos(angle) * orbitRadius,
        targetY: centerY + Math.sin(angle) * orbitRadius,
        orbitAngle: angle,
        orbitRadius: orbitRadius,
        orbitSpeed: 0.005 + Math.random() * 0.01,
        mass: 1 + Math.random() * 0.5,
        isHovered: false,
        isPaused: false,
      }
    })

    setBubbles(initialBubbles)

    // Mouse tracking with hover detection
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      let hoveredBubble = null
      let isOverAnyBubble = false

      // Check for hover states
      initialBubbles.forEach((bubble) => {
        const distance = Math.sqrt((mouseRef.current.x - bubble.x) ** 2 + (mouseRef.current.y - bubble.y) ** 2)
        const wasHovered = bubble.isHovered
        bubble.isHovered = distance < bubble.radius + 20
        bubble.isPaused = bubble.isHovered

        if (bubble.isHovered) {
          hoveredBubble = bubble
          isOverAnyBubble = true

          // Only trigger hover if this is a new hover
          if (!wasHovered) {
            // Clear any existing timeout
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current)
            }

            // Set a small delay before showing content to prevent flickering
            hoverTimeoutRef.current = setTimeout(() => {
              if (bubble.isHovered && ["about", "projects", "skills", "contact"].includes(bubble.link)) {
                onBubbleHover(bubble.link)
              }
            }, 300)
          }
        } else if (wasHovered) {
          // Clear timeout if we're no longer hovering
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
          }
        }
      })

      // If not hovering over any bubble, clear the section after a delay
      if (!isOverAnyBubble && currentSection !== "home") {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
        }
        hoverTimeoutRef.current = setTimeout(() => {
          onBubbleHover(null)
        }, 500)
      }

      // Update cursor style
      canvas.style.cursor = isOverAnyBubble ? "pointer" : "crosshair"
    }

    // Click handling for external links and resume
    const handleClick = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const rect = canvas.getBoundingClientRect()
      let clickX, clickY

      if (e instanceof MouseEvent) {
        clickX = e.clientX - rect.left
        clickY = e.clientY - rect.top
      } else {
        const touch = e.touches[0] || e.changedTouches[0]
        clickX = touch.clientX - rect.left
        clickY = touch.clientY - rect.top
      }

      let clickedBubble = null
      let minDistance = Number.POSITIVE_INFINITY

      // Find the closest bubble to click point
      initialBubbles.forEach((bubble) => {
        const distance = Math.sqrt((clickX - bubble.x) ** 2 + (clickY - bubble.y) ** 2)
        const hitRadius = bubble.radius + 10

        if (distance < hitRadius && distance < minDistance) {
          minDistance = distance
          clickedBubble = bubble
        }
      })

      if (clickedBubble) {
        // Only handle clicks for external links and resume
        if (["github", "linkedin", "resume"].includes(clickedBubble.link)) {
          onBubbleClick(clickedBubble.link)
        }
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("click", handleClick)
    canvas.addEventListener("touchend", handleClick)
    canvas.style.pointerEvents = "auto"

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      initialBubbles.forEach((bubble) => {
        // Only update orbit if not paused
        if (!bubble.isPaused) {
          bubble.orbitAngle += bubble.orbitSpeed
        }

        const baseX = centerX + Math.cos(bubble.orbitAngle) * bubble.orbitRadius
        const baseY = centerY + Math.sin(bubble.orbitAngle) * bubble.orbitRadius

        // Mouse attraction (only if not hovered)
        let attractionX = baseX
        let attractionY = baseY

        if (!bubble.isHovered) {
          const mouseDistance = Math.sqrt((mouseRef.current.x - bubble.x) ** 2 + (mouseRef.current.y - bubble.y) ** 2)
          if (mouseDistance < 200) {
            const attractionForce = ((200 - mouseDistance) / 200) * 0.3
            const angle = Math.atan2(mouseRef.current.y - bubble.y, mouseRef.current.x - bubble.x)
            attractionX = baseX + Math.cos(angle) * attractionForce * 80
            attractionY = baseY + Math.sin(angle) * attractionForce * 80
          }
        }

        // Apply physics with momentum (only if not paused)
        if (!bubble.isPaused) {
          const forceX = (attractionX - bubble.x) * 0.02
          const forceY = (attractionY - bubble.y) * 0.02

          bubble.vx += forceX
          bubble.vy += forceY

          // Apply friction
          bubble.vx *= 0.95
          bubble.vy *= 0.95

          // Update position
          bubble.x += bubble.vx
          bubble.y += bubble.vy
        }

        // Bubble-to-bubble physics (only if not paused)
        if (!bubble.isPaused) {
          initialBubbles.forEach((otherBubble) => {
            if (bubble.id !== otherBubble.id && !otherBubble.isPaused) {
              const dx = otherBubble.x - bubble.x
              const dy = otherBubble.y - bubble.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              const minDistance = bubble.radius + otherBubble.radius + 10

              if (distance < minDistance && distance > 0) {
                const force = ((minDistance - distance) / minDistance) * 0.5
                const angle = Math.atan2(dy, dx)
                bubble.vx -= Math.cos(angle) * force
                bubble.vy -= Math.sin(angle) * force
              }
            }
          })
        }

        // Enhanced bubble rendering
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          0,
          bubble.x,
          bubble.y,
          bubble.radius,
        )
        gradient.addColorStop(0, "#ffffff")
        gradient.addColorStop(0.2, bubble.color + "CC")
        gradient.addColorStop(0.7, bubble.color)
        gradient.addColorStop(1, "#000000")

        // Scale bubble if hovered
        const currentRadius = bubble.isHovered ? bubble.radius * 1.2 : bubble.radius

        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Enhanced metallic shine
        const shineGradient = ctx.createRadialGradient(
          bubble.x - currentRadius * 0.4,
          bubble.y - currentRadius * 0.4,
          0,
          bubble.x - currentRadius * 0.4,
          bubble.y - currentRadius * 0.4,
          currentRadius * 0.6,
        )
        shineGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)")
        shineGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.3)")
        shineGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = shineGradient
        ctx.fill()

        // Enhanced border for better definition
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, currentRadius, 0, Math.PI * 2)
        ctx.strokeStyle = bubble.isHovered ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.2)"
        ctx.lineWidth = bubble.isHovered ? 3 : 2
        ctx.stroke()

        // Show label on hover with enhanced styling
        if (bubble.isHovered) {
          const labelWidth = ctx.measureText(bubble.label).width + 20
          const labelHeight = 25
          const labelX = bubble.x - labelWidth / 2
          const labelY = bubble.y - currentRadius - 40

          // Label background with better styling
          ctx.fillStyle = "rgba(0, 0, 0, 0.9)"
          ctx.fillRect(labelX, labelY, labelWidth, labelHeight)

          // Label border
          ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
          ctx.lineWidth = 1
          ctx.strokeRect(labelX, labelY, labelWidth, labelHeight)

          // Label text
          ctx.fillStyle = "white"
          ctx.font = "bold 14px Arial"
          ctx.textAlign = "center"
          ctx.fillText(bubble.label, bubble.x, labelY + 16)

          // Show interaction hint based on bubble type
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
          ctx.font = "10px Arial"
          if (["about", "projects", "skills", "contact"].includes(bubble.link)) {
            ctx.fillText("HOVER TO VIEW", bubble.x, labelY + labelHeight + 15)
          } else {
            ctx.fillText("CLICK TO OPEN", bubble.x, labelY + labelHeight + 15)
          }
        }

        // Enhanced particle trail effect (only if not paused)
        if (!bubble.isPaused && Math.random() < 0.15) {
          const particleX = bubble.x + (Math.random() - 0.5) * currentRadius * 1.5
          const particleY = bubble.y + (Math.random() - 0.5) * currentRadius * 1.5
          const particleSize = 1 + Math.random() * 3

          ctx.beginPath()
          ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2)
          ctx.fillStyle = `${bubble.color}60`
          ctx.fill()
        }
      })

      // Draw central gravitational point with pulsing effect
      const time = Date.now() * 0.001
      const pulseSize = 3 + Math.sin(time * 2) * 1
      ctx.beginPath()
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)"
      ctx.fill()

      // Draw orbital paths (faint) - only for non-paused bubbles
      ctx.strokeStyle = "rgba(0, 0, 0, 0.05)"
      ctx.lineWidth = 1
      initialBubbles.forEach((bubble) => {
        if (!bubble.isPaused) {
          ctx.beginPath()
          ctx.arc(centerX, centerY, bubble.orbitRadius, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("click", handleClick)
      canvas.removeEventListener("touchend", handleClick)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [onBubbleHover, onBubbleClick, currentSection])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        touchAction: "none",
      }}
    />
  )
}
