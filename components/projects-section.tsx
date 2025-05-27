"use client"

import { useState } from "react"
import ProjectModal from "./project-modal"
import ThreeDVisualizer from "./three-d-visualizer"

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(0)
  const [modalProject, setModalProject] = useState<string | null>(null)

  const projects = [
    {
      id: "atlantic-beef",
      title: "Atlantic Beef Products – Box Forming Line",
      category: "Industrial Automation",
      description: "Led full CAD design of second-storey packaging mezzanine integrating Wexxar WF20 case erector.",
      impact: "$58,892 annual savings through automation",
      tech: ["SolidWorks", "CAD Design", "ROI Analysis"],
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Labor reduction: 3,692 hours annually",
        "Full mezzanine structural design",
        "Equipment integration planning",
        "Safety system design and compliance",
      ],
    },
    {
      id: "cavendish-farms",
      title: "Cavendish Farms – Bio-Solids Pelletization",
      category: "Sustainability Engineering",
      description: "Engineered sustainable solution converting potato digestate into high-energy pellets (18.5 MJ/kg).",
      impact: "Zero-waste solution for agricultural by-products",
      tech: ["Experimental Design", "CHNS/O Analysis", "Calorimetry"],
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Moisture reduction: 68% → 12%",
        "Pellet density: 1.1 g/cm³",
        "92% durability in abrasion tests",
        "Custom CNC die design",
      ],
    },
    {
      id: "touchdesigner-visuals",
      title: "TouchDesigner/Hydra Visuals",
      category: "Creative Technology",
      description: "Designed real-time visuals for 4-hour electronic music performance using audio-reactive shaders.",
      impact: "Seamless 4-hour live performance",
      tech: ["TouchDesigner", "Hydra", "Real-time Graphics"],
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Live coding with Hydra",
        "Audio-reactive shaders",
        "Kaleidoscopic transitions",
        "Multi-screen projection mapping",
      ],
    },
    {
      id: "3d-interactive",
      title: "3D Interactive Experience",
      category: "Web Development",
      description: "Interactive 3D web experience showcasing engineering models and technical visualization.",
      impact: "Enhanced technical communication",
      tech: ["Three.js", "WebGL", "JavaScript"],
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Three.js implementation",
        "Interactive 3D models",
        "Web-based CAD visualization",
        "Performance optimization",
      ],
    },
  ]

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-black/20 backdrop-blur-sm">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/50 shadow-xl max-h-[85vh] overflow-y-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Featured Projects</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Project List */}
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedProject(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                      selectedProject === index
                        ? "bg-orange-500/20 border border-orange-400/50 shadow-md"
                        : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">{project.title}</h3>
                    <p className="text-orange-600 text-xs md:text-sm">{project.category}</p>
                  </button>
                ))}
              </div>

              {/* Project Details */}
              <div className="lg:col-span-2">
                <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
                  <div className="mb-4">
                    {projects[selectedProject].id === "3d-interactive" ? (
                      <div className="mb-4">
                        <ThreeDVisualizer className="w-full h-48 md:h-64" />
                      </div>
                    ) : (
                      <img
                        src={projects[selectedProject].image || "/placeholder.svg"}
                        alt={projects[selectedProject].title}
                        className="w-full h-32 md:h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                      {projects[selectedProject].title}
                    </h3>
                    <p className="text-orange-600 font-medium mb-4">{projects[selectedProject].category}</p>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
                    {projects[selectedProject].description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Impact</h4>
                    <div className="bg-orange-500/20 border border-orange-400/50 rounded-lg p-4">
                      <p className="text-orange-800 font-medium text-sm md:text-base">
                        {projects[selectedProject].impact}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[selectedProject].tech.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs md:text-sm border border-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {projects[selectedProject].details.map((detail, index) => (
                        <li key={index} className="flex items-start text-gray-700 text-sm md:text-base">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setModalProject(projects[selectedProject].id)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg transition-colors font-medium text-sm md:text-base"
                  >
                    View Detailed Analysis & Charts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {modalProject && <ProjectModal projectId={modalProject} onClose={() => setModalProject(null)} />}
    </div>
  )
}
