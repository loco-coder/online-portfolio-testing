"use client"

interface PortfolioContentProps {
  section: string
}

const portfolioData = {
  about: {
    title: "ABOUT ME",
    content: `Engineer-in-Training based in Ottawa. Specializing in SolidWorks, Blender, and data-driven design with FreeCAD, TouchDesigner, and Python. Focused on sustainability, visual storytelling, and innovative problem-solving.`,
    details: [
      "🎓 Bachelor of Engineering in Sustainable Design Engineering (UPEI, 2024)",
      "⚙️ Mechanical Engineer-in-Training | Ottawa, ON",
      "🌱 Specialized in sustainability-focused mechanical and systems design",
      "🔧 Developing mechanical systems and custom tooling for production and R&D",
      "📐 Creating parametric models and drawings using SolidWorks and FreeCAD",
      "🤝 Collaborating across teams to optimize manufacturing processes",
    ],
  },
  projects: {
    title: "FEATURED PROJECTS",
    content: "Engineering projects showcasing CAD design, sustainability solutions, and data-driven analysis:",
    projects: [
      {
        name: "Atlantic Beef Products – Box Forming Line",
        tech: "SolidWorks, CAD Design, ROI Analysis",
        description:
          "Led full CAD design of second-storey packaging mezzanine integrating Wexxar WF20 case erector. Achieved $58,892 annual savings through automation.",
        details: [
          "Labor reduction: 3,692 hours annually",
          "Cost savings: $59,075 in labor costs",
          "Full mezzanine structural design",
          "Equipment integration planning",
        ],
      },
      {
        name: "Cavendish Farms – Bio-Solids Pelletization",
        tech: "Experimental Design, CHNS/O Analysis, Calorimetry",
        description:
          "Engineered sustainable solution converting potato digestate into high-energy pellets (18.5 MJ/kg) and nutrient-rich fertilizer.",
        details: [
          "Moisture reduction: 68% → 12%",
          "Pellet density: 1.1 g/cm³",
          "Durability: 92% in abrasion tests",
          "Custom CNC die design",
        ],
      },
      {
        name: "TouchDesigner/Hydra Visuals",
        tech: "TouchDesigner, Hydra, Real-time Graphics",
        description:
          "Designed real-time visuals for 4-hour electronic music performance using audio-reactive shaders and synced lighting.",
        details: [
          "Live coding with Hydra",
          "Audio-reactive shaders",
          "Kaleidoscopic transitions",
          "Real-time performance optimization",
        ],
      },
      {
        name: "3D Interactive Experience",
        tech: "Three.js, WebGL, Interactive Design",
        description:
          "Interactive 3D web experience showcasing engineering models and technical visualization capabilities.",
        details: [
          "Three.js implementation",
          "Interactive 3D models",
          "Web-based CAD visualization",
          "Real-time rendering",
        ],
      },
    ],
  },
  skills: {
    title: "TECHNICAL SKILLS",
    content: "Comprehensive engineering and technical expertise across multiple domains:",
    categories: {
      "CAD & Design": ["SolidWorks", "FreeCAD", "AutoCAD", "Blender", "Parametric Modeling", "Technical Drawing"],
      Programming: ["Python", "MATLAB", "JavaScript", "Three.js", "TouchDesigner", "Hydra"],
      "Analysis & Simulation": [
        "ANSYS",
        "COMSOL",
        "Data Analysis",
        "Experimental Design",
        "CHNS/O Analysis",
        "Calorimetry",
      ],
      Visualization: [
        "TouchDesigner",
        "Adobe Suite",
        "Plotly",
        "Real-time Graphics",
        "Technical Documentation",
        "3D Visualization",
      ],
      "Project Tools": [
        "GitHub",
        "JIRA",
        "Google Workspace",
        "Project Management",
        "ROI Analysis",
        "Process Optimization",
      ],
    },
  },
  contact: {
    title: "GET IN TOUCH",
    content:
      "Let's collaborate on engineering projects, sustainable design solutions, or innovative technical challenges.",
    info: [
      {
        label: "Email",
        value: "rodriguezjonathan467@gmail.com",
        icon: "📧",
      },
      {
        label: "Phone",
        value: "(902) 978-0118",
        icon: "📱",
      },
      {
        label: "LinkedIn",
        value: "Jonathan Rodriguez",
        icon: "💼",
        link: "https://www.linkedin.com/in/jonathan-rodriguez-del-aguila/",
      },
      {
        label: "GitHub",
        value: "github.com/loco-coder",
        icon: "🐙",
        link: "https://github.com/loco-coder",
      },
      {
        label: "Location",
        value: "Ottawa, ON - Available for Engineering Projects",
        icon: "🌍",
      },
    ],
  },
}

export default function PortfolioContent({ section }: PortfolioContentProps) {
  const data = portfolioData[section as keyof typeof portfolioData]

  if (!data) return null

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-light mb-6 tracking-wider text-white">{data.title}</h2>
      <p className="text-gray-300 leading-relaxed mb-6">{data.content}</p>

      {section === "about" && (
        <div className="space-y-3">
          {data.details.map((detail, index) => (
            <div key={index} className="text-gray-300 flex items-start">
              <span className="mr-2">{detail}</span>
            </div>
          ))}
        </div>
      )}

      {section === "projects" && (
        <div className="space-y-8">
          {data.projects.map((project, index) => (
            <div key={index} className="bg-black/30 p-6 rounded-lg border border-orange-500/20">
              <h3 className="text-xl font-semibold text-orange-400 mb-2">{project.name}</h3>
              <p className="text-blue-400 text-sm mb-3">{project.tech}</p>
              <p className="text-gray-300 mb-4">{project.description}</p>

              {project.details && (
                <div className="space-y-2">
                  <h4 className="text-orange-300 font-medium">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {project.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-gray-400 text-sm flex items-center">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <div className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 p-6 rounded-lg border border-orange-500/30">
            <h3 className="text-lg font-semibold text-orange-400 mb-3">🔗 Interactive Project Links</h3>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="text-orange-300">3D Interactive Site:</span>{" "}
                <a
                  href="https://loco-coder.github.io/3D-interactive-site/"
                  className="text-blue-400 hover:text-blue-300"
                >
                  View Live Demo
                </a>
              </p>
              <p className="text-gray-300">
                <span className="text-orange-300">Hydra Live Coding:</span>{" "}
                <a href="https://hydra.ojack.xyz/" className="text-blue-400 hover:text-blue-300">
                  Try Interactive Visuals
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {section === "skills" && (
        <div className="space-y-6">
          {Object.entries(data.categories).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold text-orange-400 mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-orange-600/20 border border-orange-500/30 px-3 py-1 rounded-full text-sm text-orange-300 hover:bg-orange-600/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {section === "contact" && (
        <div className="space-y-6">
          {data.info.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-black/20 rounded-lg border border-orange-500/20"
            >
              <span className="text-3xl">{item.icon}</span>
              <div className="flex-1">
                <div className="text-orange-400 font-medium">{item.label}</div>
                {item.link ? (
                  <a href={item.link} className="text-blue-400 hover:text-blue-300 transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <div className="text-gray-300">{item.value}</div>
                )}
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 p-6 rounded-lg border border-orange-500/30 mt-6">
            <h3 className="text-lg font-semibold text-orange-400 mb-3">🚀 Let's Build Something Amazing</h3>
            <p className="text-gray-300">
              Interested in sustainable engineering solutions, CAD design, or innovative technical projects? I'm always
              excited to collaborate on challenging engineering problems and creative technical solutions.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
