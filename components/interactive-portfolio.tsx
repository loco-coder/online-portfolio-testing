"use client"

import { useState, useEffect, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import Navigation from "./navigation"
import AboutSection from "./about-section"
import ProjectsSection from "./projects-section"
import SkillsSection from "./skills-section"
import ContactSection from "./contact-section"
import BubbleScene from "./bubble-scene"

const resumeContent = `Jonathan Rodriguez - Engineer-in-Training
Ottawa, ON | (902) 978-0118 | rodriguezjonathan467@gmail.com

EDUCATION
Bachelor of Engineering in Sustainable Design Engineering
University of Prince Edward Island (UPEI) - 2024

EXPERIENCE
Mechanical Engineer-in-Training | Ottawa, ON | 2024 - Present
• Developing mechanical systems and custom tooling for production and R&D
• Creating parametric models and technical drawings using SolidWorks and FreeCAD
• Collaborating across teams to optimize manufacturing processes

Engineering Project Lead | Atlantic Beef Products | 2024
• Led full CAD design of second-storey packaging mezzanine
• Achieved $58,892 annual savings through automation
• Reduced manual labor by 3,692 hours annually

SKILLS
CAD & Design: SolidWorks, FreeCAD, AutoCAD, Blender
Programming: Python, MATLAB, JavaScript, Three.js
Analysis: ANSYS, COMSOL, Data Analysis, CHNS/O Analysis`

export default function InteractivePortfolio() {
  const [currentSection, setCurrentSection] = useState("home")
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentProfileSource, setCurrentProfileSource] = useState<"linkedin" | "github">("linkedin")

  useEffect(() => {
    const profileInterval = setInterval(() => {
      setCurrentProfileSource((prev) => (prev === "linkedin" ? "github" : "linkedin"))
    }, 10000)

    return () => clearInterval(profileInterval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleBubbleHover = (link: string | null) => {
    try {
      if (link && ["about", "projects", "skills", "contact"].includes(link)) {
        setCurrentSection(link)
      } else if (link === null) {
        setCurrentSection("home")
      }
    } catch (error) {
      // Silently handle hover errors
    }
  }

  const handleBubbleClick = (link: string) => {
    try {
      switch (link) {
        case "github":
          if (typeof window !== "undefined") {
            window.open("https://github.com/loco-coder", "_blank")
          }
          break
        case "linkedin":
          if (typeof window !== "undefined") {
            window.open("https://www.linkedin.com/in/jonathan-rodriguez-del-aguila/", "_blank")
          }
          break
        case "email":
          if (typeof window !== "undefined") {
            window.open("mailto:rodriguezjonathan467@gmail.com", "_blank")
          }
          break
        case "resume":
          if (typeof window !== "undefined" && typeof document !== "undefined") {
            try {
              const blob = new Blob([resumeContent], { type: "text/plain" })
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = "Jonathan_Rodriguez_Resume.txt"
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
              URL.revokeObjectURL(url)
            } catch (downloadError) {
              // Fallback: just log the resume content
              console.log("Resume download failed, content:", resumeContent)
            }
          }
          break
        default:
          setCurrentSection(link)
      }
    } catch (error) {
      // Silently handle click errors
    }
  }

  const handleBackToHome = () => {
    try {
      setCurrentSection("home")
    } catch (error) {
      // Silently handle navigation errors
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            try {
              gl.setClearColor("#f8f9fa", 0)
            } catch (error) {
              // Silently handle WebGL errors
            }
          }}
        >
          <Suspense fallback={null}>
            <BubbleScene onBubbleClick={handleBubbleClick} onBubbleHover={handleBubbleHover} />
          </Suspense>
        </Canvas>
      </div>

      {/* Profile Picture Gallery */}
      <div className="absolute top-8 left-8 z-20">
        <div className="relative w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 shadow-lg overflow-hidden group">
          {/* LinkedIn Profile Picture */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${currentProfileSource === "linkedin" ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src="https://github.com/loco-coder.png"
              alt="Jonathan Rodriguez LinkedIn Profile"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                try {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                } catch (error) {
                  // Silently handle image errors
                }
              }}
            />
          </div>

          {/* GitHub Profile Picture */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${currentProfileSource === "github" ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src="https://github.com/loco-coder.png"
              alt="Jonathan Rodriguez GitHub Profile"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                try {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                } catch (error) {
                  // Silently handle image errors
                }
              }}
            />
          </div>

          {/* Fallback initials */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 rounded-full">
            <span className="text-white font-bold text-lg">JR</span>
          </div>
        </div>

        {/* Profile source indicator */}
        <div
          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center transition-colors duration-500 ${
            currentProfileSource === "linkedin" ? "bg-blue-600" : "bg-gray-800"
          }`}
        >
          <span className="text-white text-xs font-bold">{currentProfileSource === "linkedin" ? "L" : "G"}</span>
        </div>
      </div>

      {/* Back Button */}
      {currentSection !== "home" && (
        <div className="absolute top-8 left-24 z-20">
          <button
            onClick={handleBackToHome}
            className="bg-white/30 backdrop-blur-sm rounded-full p-3 border border-white/50 shadow-lg hover:bg-white/40 transition-all duration-300 group"
            title="Back to Home"
          >
            <svg
              className="w-5 h-5 text-gray-800 group-hover:text-orange-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>
      )}

      {/* Navigation */}
      <Navigation currentSection={currentSection} onSectionChange={setCurrentSection} />

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {currentSection === "home" && (
          <div
            className={`text-center transition-all duration-1000 pointer-events-none ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 tracking-wider drop-shadow-lg">
              JONATHAN
            </h1>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 tracking-wider drop-shadow-lg">
              RODRIGUEZ
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-light tracking-wide">engineer-in-training.</p>
          </div>
        )}

        {currentSection === "about" && <AboutSection />}
        {currentSection === "projects" && <ProjectsSection />}
        {currentSection === "skills" && <SkillsSection />}
        {currentSection === "contact" && <ContactSection />}
      </div>

      {/* Section Indicator */}
      {currentSection !== "home" && (
        <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
          <div className="bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/50 shadow-lg">
            <p className="text-gray-800 font-medium text-sm capitalize">
              📍 Currently viewing: <span className="text-orange-600">{currentSection}</span>
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
        <div className="text-center space-y-2 mb-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30 shadow-lg">
            <div className="text-gray-700 text-sm space-y-1">
              <p>
                🎯 <strong>Hover</strong> over colored spheres to explore portfolio sections
              </p>
              <p>
                🖱️ <strong>Click</strong> green/dark spheres for resume and external links
              </p>
              <p>⏸️ Hover pauses sphere orbit for easier interaction</p>
            </div>
          </div>
        </div>

        <div className="text-gray-600 text-xs text-center">
          Made with{" "}
          <a
            href="https://threejs.org/"
            className="text-gray-800 hover:text-orange-600 transition-colors pointer-events-auto"
          >
            three.js
          </a>
          ,{" "}
          <a
            href="https://nextjs.org/"
            className="text-gray-800 hover:text-orange-600 transition-colors pointer-events-auto"
          >
            next.js
          </a>
          , and{" "}
          <a
            href="https://react-three-fiber.docs.pmnd.rs/"
            className="text-gray-800 hover:text-orange-600 transition-colors pointer-events-auto"
          >
            react-three-fiber
          </a>
        </div>
      </div>
    </div>
  )
}
