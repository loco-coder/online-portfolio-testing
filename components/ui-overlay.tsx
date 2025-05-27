"use client"

export default function UIOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Top left info */}
      <div className="absolute top-4 left-4 text-white">
        <h1 className="text-2xl font-bold mb-2">Bruno Simon</h1>
        <p className="text-sm opacity-80">Creative Developer</p>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 text-white text-sm">
        <div className="bg-black/50 p-4 rounded-lg">
          <p className="mb-2 font-semibold">Controls:</p>
          <p>WASD or Arrow Keys - Drive</p>
          <p>Drive to colored sections to explore!</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute top-4 right-4">
        <nav className="bg-black/50 p-4 rounded-lg">
          <ul className="text-white text-sm space-y-2">
            <li className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              About
            </li>
            <li className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
              Projects
            </li>
            <li className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              Skills
            </li>
            <li className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
              Contact
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
