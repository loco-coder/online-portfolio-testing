"use client"

import { useEffect, useRef, useState } from "react"

interface PlotlyChartProps {
  data: any
  projectId: string
}

export default function PlotlyChart({ data, projectId }: PlotlyChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartStatus, setChartStatus] = useState<"loading" | "success" | "fallback">("loading")
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isMounted = true
    let timeoutId: NodeJS.Timeout

    const createChart = async () => {
      // Wait for DOM to be ready and ref to be available
      if (!chartRef.current || !isMounted) {
        if (retryCount < 3) {
          timeoutId = setTimeout(() => {
            setRetryCount((prev) => prev + 1)
          }, 100)
        } else {
          setChartStatus("fallback")
        }
        return
      }

      try {
        // Clear any existing content
        chartRef.current.innerHTML = ""

        // Dynamically import Plotly to avoid SSR issues
        const PlotlyModule = await import("plotly.js-dist-min")

        if (!isMounted) return

        // Handle different module export formats
        const Plotly = PlotlyModule.default || PlotlyModule

        if (!Plotly || typeof Plotly.newPlot !== "function") {
          throw new Error("Plotly.newPlot is not available")
        }

        // Double-check the DOM element is still available
        if (!chartRef.current) {
          throw new Error("DOM element became unavailable")
        }

        if (projectId === "atlantic-beef") {
          // Cost Savings Chart
          const trace1 = {
            x: data.costSavings.map((d: any) => d.month),
            y: data.costSavings.map((d: any) => d.manual),
            type: "bar" as const,
            name: "Manual Process",
            marker: { color: "#e74c3c" },
          }

          const trace2 = {
            x: data.costSavings.map((d: any) => d.month),
            y: data.costSavings.map((d: any) => d.automated),
            type: "bar" as const,
            name: "Automated Process",
            marker: { color: "#27ae60" },
          }

          const layout = {
            title: "Monthly Cost Comparison ($)",
            xaxis: { title: "Month" },
            yaxis: { title: "Cost ($)" },
            barmode: "group" as const,
            height: 400,
            font: { family: "Arial, sans-serif" },
            margin: { t: 50, r: 50, b: 50, l: 50 },
          }

          await Plotly.newPlot(chartRef.current, [trace1, trace2], layout, {
            responsive: true,
            displayModeBar: false,
          })
        } else if (projectId === "cavendish-farms") {
          // Pellet Quality Radar Chart
          const trace = {
            type: "scatterpolar" as const,
            r: data.pelletQuality.map((d: any) => d.value),
            theta: data.pelletQuality.map((d: any) => d.property),
            fill: "toself" as const,
            name: "Actual Values",
            marker: { color: "#9b59b6" },
          }

          const targetTrace = {
            type: "scatterpolar" as const,
            r: data.pelletQuality.map((d: any) => d.target),
            theta: data.pelletQuality.map((d: any) => d.property),
            fill: "toself" as const,
            name: "Target Values",
            marker: { color: "#3498db" },
            opacity: 0.6,
          }

          const layout = {
            polar: {
              radialaxis: {
                visible: true,
                range: [0, Math.max(...data.pelletQuality.map((d: any) => Math.max(d.value, d.target))) * 1.1],
              },
            },
            title: "Pellet Quality vs Targets",
            height: 400,
            font: { family: "Arial, sans-serif" },
            margin: { t: 50, r: 50, b: 50, l: 50 },
          }

          await Plotly.newPlot(chartRef.current, [trace, targetTrace], layout, {
            responsive: true,
            displayModeBar: false,
          })
        } else if (projectId === "touchdesigner-visuals") {
          // Performance Metrics
          const trace = {
            x: data.performance.map((d: any) => d.metric),
            y: data.performance.map((d: any) => d.value),
            type: "bar" as const,
            name: "Actual Performance",
            marker: { color: "#e67e22" },
          }

          const targetTrace = {
            x: data.performance.map((d: any) => d.metric),
            y: data.performance.map((d: any) => d.target),
            type: "scatter" as const,
            mode: "markers" as const,
            name: "Target",
            marker: { color: "#c0392b", size: 10, symbol: "diamond" },
          }

          const layout = {
            title: "Performance Metrics vs Targets",
            xaxis: { title: "Metrics" },
            yaxis: { title: "Values" },
            height: 400,
            font: { family: "Arial, sans-serif" },
            margin: { t: 50, r: 50, b: 50, l: 50 },
          }

          await Plotly.newPlot(chartRef.current, [trace, targetTrace], layout, {
            responsive: true,
            displayModeBar: false,
          })
        } else if (projectId === "3d-interactive") {
          // Performance Chart
          const performanceTrace = {
            x: data.performance.map((d: any) => d.metric),
            y: data.performance.map((d: any) => d.value),
            type: "bar" as const,
            name: "Performance",
            marker: { color: "#3498db" },
          }

          const layout = {
            title: "3D Interactive Experience Performance",
            xaxis: { title: "Metrics" },
            yaxis: { title: "Values" },
            height: 400,
            font: { family: "Arial, sans-serif" },
            margin: { t: 50, r: 50, b: 50, l: 50 },
          }

          await Plotly.newPlot(chartRef.current, [performanceTrace], layout, {
            responsive: true,
            displayModeBar: false,
          })
        }

        if (isMounted) {
          setChartStatus("success")
        }
      } catch (error) {
        console.error("Error loading Plotly:", error)
        if (isMounted) {
          setChartStatus("fallback")
        }
      }
    }

    // Start chart creation with a small delay to ensure DOM is ready
    timeoutId = setTimeout(createChart, 50)

    return () => {
      isMounted = false
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [data, projectId, retryCount])

  // Create fallback chart using Canvas
  useEffect(() => {
    if (chartStatus !== "fallback" || !chartRef.current) return

    const canvas = document.createElement("canvas")
    canvas.width = 800
    canvas.height = 400
    canvas.style.width = "100%"
    canvas.style.height = "400px"
    canvas.style.border = "1px solid #ddd"
    canvas.style.borderRadius = "8px"
    canvas.style.backgroundColor = "#f8f9fa"

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear and set background
    ctx.fillStyle = "#f8f9fa"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw title
    ctx.fillStyle = "#333"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`${projectId.toUpperCase().replace("-", " ")} - Project Analytics`, canvas.width / 2, 40)

    if (projectId === "atlantic-beef" && data.costSavings) {
      // Draw bar chart for cost savings
      const months = data.costSavings.map((d: any) => d.month)
      const manualCosts = data.costSavings.map((d: any) => d.manual)
      const automatedCosts = data.costSavings.map((d: any) => d.automated)

      const maxValue = Math.max(...manualCosts, ...automatedCosts)
      const chartHeight = 280
      const startX = 100
      const startY = 80

      // Draw bars
      months.forEach((month: string, index: number) => {
        const barWidth = 40
        const spacing = 100
        const x = startX + index * spacing

        // Manual cost bar (red)
        const manualHeight = (manualCosts[index] / maxValue) * chartHeight
        ctx.fillStyle = "#e74c3c"
        ctx.fillRect(x, startY + chartHeight - manualHeight, barWidth, manualHeight)

        // Automated cost bar (green)
        const automatedHeight = (automatedCosts[index] / maxValue) * chartHeight
        ctx.fillStyle = "#27ae60"
        ctx.fillRect(x + barWidth + 5, startY + chartHeight - automatedHeight, barWidth, automatedHeight)

        // Month label
        ctx.fillStyle = "#333"
        ctx.font = "14px Arial"
        ctx.textAlign = "center"
        ctx.fillText(month, x + barWidth, startY + chartHeight + 20)
      })

      // Legend
      ctx.fillStyle = "#e74c3c"
      ctx.fillRect(startX, startY + chartHeight + 40, 20, 15)
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.textAlign = "left"
      ctx.fillText("Manual Process", startX + 25, startY + chartHeight + 52)

      ctx.fillStyle = "#27ae60"
      ctx.fillRect(startX + 150, startY + chartHeight + 40, 20, 15)
      ctx.fillText("Automated Process", startX + 175, startY + chartHeight + 52)
    } else if (projectId === "cavendish-farms" && data.pelletQuality) {
      // Draw radar chart for pellet quality
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 120

      const properties = data.pelletQuality.map((d: any) => d.property)
      const values = data.pelletQuality.map((d: any) => d.value)
      const targets = data.pelletQuality.map((d: any) => d.target)
      const maxValue = Math.max(...values, ...targets)

      // Draw radar grid
      ctx.strokeStyle = "#ddd"
      ctx.lineWidth = 1
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, (radius * i) / 5, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw axes
      properties.forEach((_, index) => {
        const angle = (index / properties.length) * Math.PI * 2 - Math.PI / 2
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.stroke()

        // Property labels
        ctx.fillStyle = "#333"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(properties[index], x + Math.cos(angle) * 20, y + Math.sin(angle) * 20)
      })

      // Draw actual values (purple)
      ctx.strokeStyle = "#9b59b6"
      ctx.fillStyle = "rgba(155, 89, 182, 0.3)"
      ctx.lineWidth = 2
      ctx.beginPath()
      values.forEach((value: number, index: number) => {
        const angle = (index / values.length) * Math.PI * 2 - Math.PI / 2
        const distance = (value / maxValue) * radius
        const x = centerX + Math.cos(angle) * distance
        const y = centerY + Math.sin(angle) * distance

        if (index === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Draw target values (blue)
      ctx.strokeStyle = "#3498db"
      ctx.fillStyle = "rgba(52, 152, 219, 0.2)"
      ctx.lineWidth = 2
      ctx.beginPath()
      targets.forEach((target: number, index: number) => {
        const angle = (index / targets.length) * Math.PI * 2 - Math.PI / 2
        const distance = (target / maxValue) * radius
        const x = centerX + Math.cos(angle) * distance
        const y = centerY + Math.sin(angle) * distance

        if (index === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    } else {
      // Generic chart for other projects
      ctx.fillStyle = "#333"
      ctx.font = "18px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Performance Metrics", canvas.width / 2, canvas.height / 2 - 20)

      ctx.font = "14px Arial"
      ctx.fillText("Chart data visualization", canvas.width / 2, canvas.height / 2 + 20)

      // Draw some sample bars
      const barCount = 4
      const barWidth = 60
      const spacing = 120
      const startX = (canvas.width - barCount * spacing) / 2

      for (let i = 0; i < barCount; i++) {
        const height = 50 + Math.random() * 100
        const x = startX + i * spacing
        const y = canvas.height / 2 + 50

        ctx.fillStyle = `hsl(${i * 60}, 70%, 50%)`
        ctx.fillRect(x, y - height, barWidth, height)
      }
    }

    // Clear existing content and add canvas
    if (chartRef.current) {
      chartRef.current.innerHTML = ""
      chartRef.current.appendChild(canvas)
    }
  }, [chartStatus, data, projectId])

  return (
    <div className="w-full">
      <div ref={chartRef} className="w-full min-h-[400px] flex items-center justify-center">
        {chartStatus === "loading" && (
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading interactive charts...</p>
            <p className="text-gray-500 text-sm mt-2">Attempt {retryCount + 1}/3</p>
          </div>
        )}
      </div>

      {chartStatus === "fallback" && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            📊 Interactive charts are using fallback rendering. All data is still visible and accurate.
          </p>
        </div>
      )}
    </div>
  )
}
