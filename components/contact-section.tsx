"use client"

export default function ContactSection() {
  const contactInfo = [
    {
      label: "Email",
      value: "rodriguezjonathan467@gmail.com",
      icon: "📧",
      link: "mailto:rodriguezjonathan467@gmail.com",
    },
    {
      label: "Phone",
      value: "(902) 978-0118",
      icon: "📱",
      link: "tel:+19029780118",
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
      value: "Ottawa, ON",
      icon: "🌍",
      link: null,
    },
  ]

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-black/20 backdrop-blur-sm">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/50 shadow-xl max-h-[85vh] overflow-y-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Get In Touch</h2>

            <div className="text-center mb-8">
              <p className="text-xl text-gray-700 leading-relaxed">
                Let's collaborate on engineering projects, sustainable design solutions, or innovative technical
                challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg hover:border-orange-400 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="text-orange-600 font-semibold">{item.label}</div>
                      {item.link ? (
                        <a
                          href={item.link}
                          target={item.link.startsWith("http") ? "_blank" : undefined}
                          rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-gray-700 hover:text-orange-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-gray-700">{item.value}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-8 rounded-lg border border-orange-200">
              <h3 className="text-2xl font-semibold text-orange-800 mb-4 text-center">
                🚀 Ready to Build Something Amazing?
              </h3>
              <p className="text-gray-700 text-center mb-6 leading-relaxed">
                Interested in sustainable engineering solutions, CAD design, or innovative technical projects? I'm
                passionate about solving complex engineering challenges and creating impactful solutions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:rodriguezjonathan467@gmail.com"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full transition-all duration-300 font-medium"
                >
                  Send Email
                </a>
                <a
                  href="https://www.linkedin.com/in/jonathan-rodriguez-del-aguila/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-full transition-all duration-300 font-medium border border-gray-300"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
