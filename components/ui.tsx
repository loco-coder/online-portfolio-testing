"use client"

import PortfolioContent from "./portfolio-content"

interface UIProps {
  activeSection: string | null
}

export default function UI({ activeSection }: UIProps) {
  return (
    <>
      {/* Top left - Name and title */}
      <div className="absolute top-8 left-8 text-white z-10">
        <h1 className="text-3xl font-light tracking-wider">JONATHAN RODRIGUEZ</h1>
        <p className="text-sm opacity-70 mt-1 tracking-wide">ENGINEER-IN-TRAINING</p>
      </div>

      {/* Top right - Navigation */}
      <div className="absolute top-8 right-8 z-10">
        <nav className="flex space-x-8 text-white text-sm tracking-wide">
          <button className="hover:text-orange-400 transition-colors">ABOUT</button>
          <button className="hover:text-orange-400 transition-colors">PROJECTS</button>
          <button className="hover:text-orange-400 transition-colors">SKILLS</button>
          <button className="hover:text-orange-400 transition-colors">CONTACT</button>
        </nav>
      </div>

      {/* Bottom left - Instructions */}
      <div className="absolute bottom-8 left-8 text-white text-sm z-10">
        <div className="bg-black/30 backdrop-blur-sm p-4 rounded border border-orange-500/20">
          <p className="mb-2 opacity-70">DRIVE TO EXPLORE PROJECTS</p>
          <div className="grid grid-cols-3 gap-1 w-24">
            <div></div>
            <div className="bg-orange-500/30 p-2 text-center text-xs rounded border border-orange-400/50">W</div>
            <div></div>
            <div className="bg-orange-500/30 p-2 text-center text-xs rounded border border-orange-400/50">A</div>
            <div className="bg-orange-500/30 p-2 text-center text-xs rounded border border-orange-400/50">S</div>
            <div className="bg-orange-500/30 p-2 text-center text-xs rounded border border-orange-400/50">D</div>
          </div>
        </div>
      </div>

      {/* Bottom right - Quick links */}
      <div className="absolute bottom-8 right-8 text-white text-sm z-10">
        <div className="bg-black/30 backdrop-blur-sm p-4 rounded border border-orange-500/20">
          <div className="flex space-x-4">
            <a href="https://github.com/loco-coder" className="hover:text-orange-400 transition-colors">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/jonathan-rodriguez-del-aguila/"
              className="hover:text-orange-400 transition-colors"
            >
              LinkedIn
            </a>
            <a href="mailto:rodriguezjonathan467@gmail.com" className="hover:text-orange-400 transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Section content overlay */}
      {activeSection && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="bg-black/90 backdrop-blur-md p-8 rounded-lg max-w-6xl max-h-[85vh] overflow-y-auto mx-4 border border-orange-500/30">
            <PortfolioContent section={activeSection} />
            <div className="mt-8 text-sm text-gray-400 text-center border-t border-orange-500/20 pt-4">
              Drive away to close this panel • Use WASD to navigate
            </div>
          </div>
        </div>
      )}
    </>
  )
}
