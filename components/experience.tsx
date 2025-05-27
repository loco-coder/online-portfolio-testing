export default function Experience() {
  const experiences = [
    {
      title: "Mechanical Engineer-in-Training",
      company: "Current Role",
      location: "Ottawa, ON",
      period: "2024 - Present",
      description: [
        "Developing mechanical systems and custom tooling for production and R&D environments",
        "Creating parametric models and technical drawings using SolidWorks and FreeCAD",
        "Collaborating across multidisciplinary teams to optimize manufacturing processes",
        "Implementing sustainability-focused design principles in mechanical systems",
      ],
    },
    {
      title: "Engineering Project Lead",
      company: "Atlantic Beef Products",
      location: "PEI",
      period: "2024",
      description: [
        "Led full CAD design of second-storey packaging mezzanine integrating Wexxar WF20 case erector",
        "Achieved $58,892 annual savings through automation and labor reduction",
        "Reduced manual labor by 3,692 hours annually through process optimization",
        "Designed complete mezzanine structural system with equipment integration planning",
      ],
    },
    {
      title: "Sustainability Engineering Researcher",
      company: "Cavendish Farms",
      location: "PEI",
      period: "2023-2024",
      description: [
        "Engineered sustainable solution converting potato digestate into high-energy pellets (18.5 MJ/kg)",
        "Achieved 68% to 12% moisture reduction with 92% pellet durability in abrasion tests",
        "Designed custom CNC die for pelletization process optimization",
        "Conducted CHNS/O analysis and calorimetry for nutrient-rich fertilizer development",
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Professional Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                  <p className="text-orange-600 font-medium">{exp.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">{exp.location}</p>
                  <p className="text-gray-500 text-sm">{exp.period}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {exp.description.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
