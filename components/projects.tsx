"use client"

import { useState } from "react"

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  const projects = [
    {
      title: "Atlantic Beef Products – Box Forming Line",
      tech: ["SolidWorks", "CAD Design", "ROI Analysis", "Industrial Automation"],
      description:
        "Led full CAD design of second-storey packaging mezzanine integrating Wexxar WF20 case erector. Achieved $58,892 annual savings through automation.",
      details: [
        "Labor reduction: 3,692 hours annually",
        "Cost savings: $59,075 in labor costs",
        "Full mezzanine structural design with load calculations",
        "Equipment integration planning and workflow optimization",
        "Safety system design and compliance verification",
      ],
      impact: "58% reduction in manual packaging labor",
      link: null,
    },
    {
      title: "Cavendish Farms – Bio-Solids Pelletization",
      tech: ["Experimental Design", "CHNS/O Analysis", "Calorimetry", "CNC Design"],
      description:
        "Engineered sustainable solution converting potato digestate into high-energy pellets (18.5 MJ/kg) and nutrient-rich fertilizer.",
      details: [
        "Moisture reduction: 68% → 12% through optimized drying process",
        "Pellet density: 1.1 g/cm³ with 92% durability in abrasion tests",
        "Custom CNC die design for consistent pellet formation",
        "Comprehensive material characterization using CHNS/O analysis",
        "Energy content optimization achieving 18.5 MJ/kg heating value",
      ],
      impact: "Zero-waste solution for agricultural by-products",
      link: null,
    },
    {
      title: "TouchDesigner/Hydra Visuals",
      tech: ["TouchDesigner", "Hydra", "Real-time Graphics", "Audio Processing"],
      description:
        "Designed real-time visuals for 4-hour electronic music performance using audio-reactive shaders and synced lighting.",
      details: [
        "Live coding with Hydra for dynamic visual generation",
        "Audio-reactive shaders responding to frequency analysis",
        "Kaleidoscopic transitions synchronized with beat detection",
        "Real-time performance optimization for 60fps rendering",
        "Multi-screen projection mapping and lighting control",
      ],
      impact: "Seamless 4-hour live performance",
      link: "https://hydra.ojack.xyz/",
    },
    {
      title: "3D Interactive Experience",
      tech: ["Three.js", "WebGL", "Interactive Design", "JavaScript"],
      description:
        "Interactive 3D web experience showcasing engineering models and technical visualization capabilities.",
      details: [
        "Three.js implementation with optimized rendering pipeline",
        "Interactive 3D models with real-time manipulation",
        "Web-based CAD visualization for engineering presentations",
        "Responsive design supporting mobile and desktop platforms",
        "Performance optimization for complex 3D scenes",
      ],
      impact: "Enhanced technical communication through visualization",
      link: "https://loco-coder.github.io/3D-interactive-site/",
    },
  ]

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index)
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Featured Projects</h2>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 md:mb-0">{project.title}</h3>
                  <div className="flex items-center space-x-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                      >
                        View Live →
                      </a>
                    )}
                    <button
                      onClick={() => toggleProject(index)}
                      className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                    >
                      {expandedProject === index ? "Show Less" : "Show More"}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 mb-4">{project.description}</p>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-800 font-medium">Impact: {project.impact}</p>
                </div>

                {expandedProject === index && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h4>
                    <ul className="space-y-3">
                      {project.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
