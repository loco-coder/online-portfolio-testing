"use client"

import { useState, useEffect } from "react"

interface PortfolioOverlayProps {
  activeSection: string | null
}

const portfolioContent = {
  about: {
    title: "About Me",
    content:
      "Creative developer passionate about interactive experiences and 3D web development. I love bringing ideas to life through code and design.",
    skills: ["Three.js", "React", "WebGL", "Creative Coding"],
  },
  projects: {
    title: "Featured Projects",
    content: "Explore my latest work in interactive web experiences, 3D visualizations, and creative coding projects.",
    items: ["3D Portfolio Website", "Interactive Data Visualization", "WebGL Particle System", "AR Web Experience"],
  },
  skills: {
    title: "Technical Skills",
    content: "Specialized in modern web technologies with a focus on 3D graphics and interactive experiences.",
    categories: {
      Frontend: ["React", "Three.js", "TypeScript", "Next.js"],
      "3D/Graphics": ["WebGL", "GLSL", "Blender", "Three.js"],
      Tools: ["Git", "Figma", "Adobe Creative Suite"],
    },
  },
  contact: {
    title: "Get In Touch",
    content:
      "Let's collaborate on your next creative project. I'm always excited to work on innovative web experiences.",
    links: ["hello@brunosimon.com", "LinkedIn", "GitHub", "Twitter"],
  },
}

export default function PortfolioOverlay({ activeSection }: PortfolioOverlayProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(!!activeSection)
  }, [activeSection])

  if (!activeSection || !isVisible) return null

  const content = portfolioContent[activeSection as keyof typeof portfolioContent]

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      <div
        className={`bg-black/80 backdrop-blur-md text-white p-8 rounded-lg max-w-md mx-4 transform transition-all duration-500 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">{content.title}</h2>
        <p className="text-gray-300 mb-6">{content.content}</p>

        {activeSection === "about" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {content.skills.map((skill, index) => (
                <span key={index} className="bg-orange-500 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeSection === "projects" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Recent Work</h3>
            <ul className="space-y-2">
              {content.items.map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === "skills" && (
          <div>
            {Object.entries(content.categories).map(([category, skills]) => (
              <div key={category} className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="bg-purple-500 px-2 py-1 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === "contact" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Connect With Me</h3>
            <div className="space-y-2">
              {content.links.map((link, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  {link}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-400">Drive away to close this panel</div>
      </div>
    </div>
  )
}
