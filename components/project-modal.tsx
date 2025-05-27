"use client"

import { useState } from "react"
import PlotlyChart from "./plotly-chart"

interface ProjectModalProps {
  projectId: string
  onClose: () => void
}

export default function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const projectData = {
    "atlantic-beef": {
      title: "Atlantic Beef Products – Box Forming Line",
      category: "Industrial Automation",
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      overview: {
        description:
          "Led full CAD design of second-storey packaging mezzanine integrating Wexxar WF20 case erector. Achieved $58,892 annual savings through automation.",
        objectives: [
          "Design automated packaging solution",
          "Reduce manual labor requirements",
          "Integrate existing equipment",
          "Ensure safety compliance",
        ],
        results: [
          "58% reduction in manual packaging labor",
          "$58,892 annual cost savings",
          "3,692 hours labor reduction annually",
          "Zero safety incidents post-implementation",
        ],
      },
      data: {
        costSavings: [
          { month: "Jan", manual: 15000, automated: 6300 },
          { month: "Feb", manual: 15000, automated: 6300 },
          { month: "Mar", manual: 15000, automated: 6300 },
          { month: "Apr", manual: 15000, automated: 6300 },
          { month: "May", manual: 15000, automated: 6300 },
          { month: "Jun", manual: 15000, automated: 6300 },
        ],
        efficiency: [
          { metric: "Throughput (cases/hour)", before: 120, after: 285, improvement: 137.5 },
          { metric: "Error Rate (%)", before: 3.2, after: 0.8, improvement: -75.0 },
          { metric: "Labor Hours (per shift)", before: 8, after: 3.4, improvement: -57.5 },
          { metric: "Energy Usage (kWh)", before: 45, after: 38, improvement: -15.6 },
        ],
      },
      specifications: {
        Equipment: "Wexxar WF20 Case Erector",
        Capacity: "285 cases/hour",
        Dimensions: "12m x 8m x 4m",
        Power: "15kW",
        "Safety Rating": "Category 3 (ISO 13849)",
        "ROI Period": "14 months",
      },
    },
    "cavendish-farms": {
      title: "Cavendish Farms – Bio-Solids Pelletization",
      category: "Sustainability Engineering",
      images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      overview: {
        description:
          "Engineered sustainable solution converting potato digestate into high-energy pellets (18.5 MJ/kg) and nutrient-rich fertilizer.",
        objectives: [
          "Convert waste into valuable products",
          "Reduce environmental impact",
          "Create revenue stream from waste",
          "Optimize pellet quality",
        ],
        results: [
          "Zero-waste solution implemented",
          "18.5 MJ/kg energy content achieved",
          "92% pellet durability rating",
          "68% to 12% moisture reduction",
        ],
      },
      data: {
        pelletQuality: [
          { property: "Energy Content", value: 18.5, unit: "MJ/kg", target: 18.0 },
          { property: "Moisture Content", value: 12, unit: "%", target: 15 },
          { property: "Density", value: 1.1, unit: "g/cm³", target: 1.0 },
          { property: "Durability", value: 92, unit: "%", target: 85 },
        ],
        processEfficiency: [
          { stage: "Drying", input: 68, output: 12, efficiency: 82 },
          { stage: "Pelletizing", input: 12, output: 12, efficiency: 95 },
          { stage: "Cooling", input: 12, output: 12, efficiency: 98 },
          { stage: "Screening", input: 12, output: 11.5, efficiency: 96 },
        ],
      },
      specifications: {
        "Input Material": "Potato Digestate",
        "Output Rate": "500 kg/hour",
        "Energy Content": "18.5 MJ/kg",
        "Pellet Size": "6mm diameter",
        "Moisture Content": "12%",
        "Durability Index": "92%",
      },
    },
    "touchdesigner-visuals": {
      title: "TouchDesigner/Hydra Visuals",
      category: "Creative Technology",
      images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      overview: {
        description:
          "Designed real-time visuals for 4-hour electronic music performance using audio-reactive shaders and synced lighting.",
        objectives: [
          "Create immersive visual experience",
          "Sync visuals with live audio",
          "Maintain 60fps performance",
          "Enable live coding capabilities",
        ],
        results: [
          "Seamless 4-hour live performance",
          "Zero frame drops during show",
          "Real-time audio-reactive shaders",
          "Multi-screen projection mapping",
        ],
      },
      data: {
        performance: [
          { metric: "Frame Rate", value: 60, unit: "fps", target: 60 },
          { metric: "Latency", value: 12, unit: "ms", target: 20 },
          { metric: "CPU Usage", value: 65, unit: "%", target: 80 },
          { metric: "GPU Usage", value: 78, unit: "%", target: 85 },
        ],
        audioAnalysis: [
          { frequency: "Bass (20-250Hz)", responsiveness: 95, complexity: 8 },
          { frequency: "Mid (250-4kHz)", responsiveness: 88, complexity: 6 },
          { frequency: "High (4-20kHz)", responsiveness: 92, complexity: 7 },
        ],
      },
      specifications: {
        Software: "TouchDesigner, Hydra",
        Resolution: "4K (3840x2160)",
        Projection: "Multi-screen mapping",
        "Audio Input": "Real-time FFT analysis",
        Performance: "4-hour continuous",
        Latency: "< 20ms",
      },
    },
    "3d-interactive": {
      title: "3D Interactive Experience",
      category: "Web Development",
      images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      overview: {
        description:
          "Interactive 3D web experience showcasing engineering models and technical visualization capabilities.",
        objectives: [
          "Create engaging web experience",
          "Showcase 3D engineering models",
          "Optimize for web performance",
          "Enable cross-platform access",
        ],
        results: [
          "Enhanced technical communication",
          "Cross-platform compatibility",
          "Optimized loading performance",
          "Interactive model exploration",
        ],
      },
      data: {
        performance: [
          { metric: "Load Time", value: 2.3, unit: "seconds", target: 3.0 },
          { metric: "Frame Rate", value: 58, unit: "fps", target: 60 },
          { metric: "Model Complexity", value: 125, unit: "k polygons", target: 150 },
          { metric: "Bundle Size", value: 1.2, unit: "MB", target: 2.0 },
        ],
        compatibility: [
          { platform: "Desktop Chrome", support: 100, performance: 95 },
          { platform: "Mobile Safari", support: 98, performance: 85 },
          { platform: "Firefox", support: 100, performance: 92 },
          { platform: "Edge", support: 100, performance: 90 },
        ],
      },
      specifications: {
        Framework: "Three.js, React",
        Models: "GLTF/GLB format",
        Optimization: "LOD, Frustum culling",
        Interaction: "Mouse, Touch, Keyboard",
        Deployment: "GitHub Pages",
        Performance: "60fps target",
      },
    },
  }

  const project = projectData[projectId as keyof typeof projectData]
  if (!project) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 md:p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">{project.title}</h2>
              <p className="text-orange-100">{project.category}</p>
            </div>
            <div className="flex items-center space-x-2">
              {activeTab !== "overview" && (
                <button
                  onClick={() => setActiveTab("overview")}
                  className="text-white hover:text-orange-200 transition-colors p-2 rounded-lg hover:bg-white/10"
                  title="Back to Overview"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={onClose}
                className="text-white hover:text-orange-200 transition-colors p-2 rounded-lg hover:bg-white/10"
                title="Close Modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 px-4 md:px-6 py-2 border-b border-gray-200">
          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => setActiveTab("overview")}
              className={`hover:text-orange-600 transition-colors ${activeTab === "overview" ? "text-orange-600 font-medium" : "text-gray-500"}`}
            >
              Overview
            </button>
            {activeTab !== "overview" && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-gray-700 font-medium capitalize">{activeTab}</span>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex space-x-4 md:space-x-8 px-4 md:px-6 min-w-max">
            {["overview", "data", "specifications", "gallery"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Project Description</h3>
                <p className="text-gray-700 leading-relaxed">{project.overview.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Objectives</h3>
                  <ul className="space-y-2">
                    {project.overview.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700 text-sm md:text-base">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Results</h3>
                  <ul className="space-y-2">
                    {project.overview.results.map((result, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700 text-sm md:text-base">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "data" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Performance Analytics</h3>
                <PlotlyChart data={project.data} projectId={projectId} />
              </div>

              {projectId === "atlantic-beef" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Efficiency Metrics</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Metric
                          </th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Before
                          </th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            After
                          </th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Improvement
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {project.data.efficiency.map((row, index) => (
                          <tr key={index}>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {row.metric}
                            </td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.before}</td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.after}</td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                              {row.improvement > 0 ? "+" : ""}
                              {row.improvement.toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {projectId === "cavendish-farms" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Process Efficiency</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Process Stage
                          </th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Input (%)
                          </th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Output (%)
                          </th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Efficiency
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {project.data.processEfficiency.map((row, index) => (
                          <tr key={index}>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {row.stage}
                            </td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.input}</td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.output}</td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                              {row.efficiency}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "specifications" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(project.specifications).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">{key}</div>
                    <div className="text-lg font-semibold text-gray-900">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Project Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {project.images.map((image, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-48 md:h-64 object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Embedded Content */}
              <div className="mt-8">
                <h4 className="text-md font-semibold mb-4">Interactive Models & Demos</h4>

                {projectId === "3d-interactive" && (
                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <h5 className="font-medium mb-2">3D Interactive Site</h5>
                    <iframe
                      src="https://loco-coder.github.io/3D-interactive-site/"
                      className="w-full h-64 md:h-96 rounded-lg border"
                      title="3D Interactive Model"
                    />
                  </div>
                )}

                {projectId === "touchdesigner-visuals" && (
                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <h5 className="font-medium mb-2">Hydra Live Coding Environment</h5>
                    <iframe
                      src="https://hydra.ojack.xyz/"
                      className="w-full h-64 md:h-96 rounded-lg border"
                      title="Hydra Live Coding"
                    />
                  </div>
                )}

                {(projectId === "atlantic-beef" || projectId === "cavendish-farms") && (
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h5 className="font-medium mb-2">CAD Model Viewer</h5>
                    <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">3D CAD Model Viewer (Placeholder)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
