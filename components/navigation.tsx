"use client"

interface NavigationProps {
  currentSection: string
  onSectionChange: (section: string) => void
}

export default function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <nav className="absolute top-8 right-8 z-20">
      <div className="bg-white/30 backdrop-blur-sm rounded-full px-6 py-3 border border-white/50 shadow-lg">
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`text-sm font-medium transition-all duration-300 ${
                currentSection === item.id ? "text-orange-600 font-semibold" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
