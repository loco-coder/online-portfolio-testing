export default function Skills() {
  const skillCategories = [
    {
      title: "CAD & Design",
      skills: ["SolidWorks", "FreeCAD", "AutoCAD", "Blender", "Parametric Modeling", "Technical Drawing"],
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      title: "Programming",
      skills: ["Python", "MATLAB", "JavaScript", "Three.js", "TouchDesigner", "Hydra"],
      color: "bg-green-100 text-green-800 border-green-200",
    },
    {
      title: "Analysis & Simulation",
      skills: ["ANSYS", "COMSOL", "Data Analysis", "Experimental Design", "CHNS/O Analysis", "Calorimetry"],
      color: "bg-purple-100 text-purple-800 border-purple-200",
    },
    {
      title: "Visualization",
      skills: [
        "TouchDesigner",
        "Adobe Suite",
        "Plotly",
        "Real-time Graphics",
        "Technical Documentation",
        "3D Visualization",
      ],
      color: "bg-orange-100 text-orange-800 border-orange-200",
    },
    {
      title: "Project Tools",
      skills: ["GitHub", "JIRA", "Google Workspace", "Project Management", "ROI Analysis", "Process Optimization"],
      color: "bg-gray-100 text-gray-800 border-gray-200",
    },
  ]

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${category.color}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
