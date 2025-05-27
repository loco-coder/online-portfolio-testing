"use client"

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "CAD & Design",
      skills: ["SolidWorks", "FreeCAD", "AutoCAD", "Blender", "Parametric Modeling", "Technical Drawing"],
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Programming",
      skills: ["Python", "MATLAB", "JavaScript", "Three.js", "TouchDesigner", "Hydra"],
      color: "from-green-400 to-green-600",
    },
    {
      title: "Analysis & Simulation",
      skills: ["ANSYS", "COMSOL", "Data Analysis", "Experimental Design", "CHNS/O Analysis", "Calorimetry"],
      color: "from-purple-400 to-purple-600",
    },
    {
      title: "Visualization",
      skills: ["TouchDesigner", "Adobe Suite", "Plotly", "Real-time Graphics", "Technical Documentation"],
      color: "from-orange-400 to-orange-600",
    },
    {
      title: "Project Management",
      skills: ["GitHub", "JIRA", "Google Workspace", "ROI Analysis", "Process Optimization"],
      color: "from-gray-400 to-gray-600",
    },
  ]

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-black/20 backdrop-blur-sm">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/50 shadow-xl max-h-[85vh] overflow-y-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Technical Skills</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`bg-gradient-to-r ${category.color} rounded-lg p-4 mb-4`}>
                    <h3 className="text-xl font-semibold text-white text-center">{category.title}</h3>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="bg-white rounded-lg p-3 border border-gray-200 hover:border-orange-400 transition-all duration-300"
                      >
                        <span className="text-gray-800 font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg p-6 border border-orange-400/30">
                <h3 className="text-xl font-semibold text-orange-600 mb-3">🚀 Always Learning & Growing</h3>
                <p className="text-gray-700">
                  Passionate about staying current with emerging technologies and continuously expanding my engineering
                  toolkit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
