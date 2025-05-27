export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Hello, I'm <span className="text-orange-600">Jonathan Rodriguez</span>
            </h2>
            <h3 className="text-xl text-gray-600 mb-6">Engineer-in-Training | Ottawa, ON</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Specializing in SolidWorks, Blender, and data-driven design with FreeCAD, TouchDesigner, and Python.
              Focused on sustainability, visual storytelling, and innovative problem-solving.
            </p>
            <p className="text-gray-600 mb-8">
              Bachelor of Engineering in Sustainable Design Engineering (UPEI, 2024). Currently developing mechanical
              systems and custom tooling for production and R&D, creating parametric models and drawings, and
              collaborating across teams to optimize manufacturing processes.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:rodriguezjonathan467@gmail.com"
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Get In Touch
              </a>
              <a
                href="https://github.com/loco-coder"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors"
              >
                View Projects
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">JR</span>
                </div>
                <p className="text-orange-800 font-medium">Engineer-in-Training</p>
                <p className="text-orange-600">Sustainable Design Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
