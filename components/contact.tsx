export default function Contact() {
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
      value: "Ottawa, ON - Available for Engineering Projects",
      icon: "🌍",
      link: null,
    },
  ]

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Get In Touch</h2>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              Let's collaborate on engineering projects, sustainable design solutions, or innovative technical
              challenges. I'm always excited to work on challenging engineering problems and creative technical
              solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
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
            <h3 className="text-xl font-semibold text-orange-800 mb-4 text-center">
              🚀 Ready to Build Something Amazing?
            </h3>
            <p className="text-gray-700 text-center mb-6">
              Interested in sustainable engineering solutions, CAD design, or innovative technical projects? I'm
              passionate about solving complex engineering challenges and creating impactful solutions.
            </p>
            <div className="flex justify-center">
              <a
                href="mailto:rodriguezjonathan467@gmail.com"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Start a Conversation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
