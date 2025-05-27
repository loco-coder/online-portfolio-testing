"use client"

export default function AboutSection() {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-black/20 backdrop-blur-sm">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/50 shadow-xl max-h-[85vh] overflow-y-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">About Me</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-orange-600">Background</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Engineer-in-Training based in Ottawa, specializing in SolidWorks, Blender, and data-driven design with
                  FreeCAD, TouchDesigner, and Python. Focused on sustainability, visual storytelling, and innovative
                  problem-solving.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Bachelor of Engineering in Sustainable Design Engineering (UPEI, 2024). Currently developing
                  mechanical systems and custom tooling for production and R&D.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-orange-600">Specializations</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Sustainability-focused mechanical design
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    CAD design and parametric modeling
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Systems engineering and optimization
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Data-driven engineering analysis
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Interactive visualization systems
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-gray-100 px-4 py-2 rounded-full">
                  <span className="text-orange-600 font-medium">📧</span>
                  <span className="ml-2 text-gray-700">rodriguezjonathan467@gmail.com</span>
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-full">
                  <span className="text-orange-600 font-medium">📍</span>
                  <span className="ml-2 text-gray-700">Ottawa, ON</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
