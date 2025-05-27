import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Jonathan Rodriguez - Engineer-in-Training",
  description:
    "Interactive portfolio of Jonathan Rodriguez, Engineer-in-Training specializing in sustainable design engineering, CAD design, and innovative technical solutions.",
  keywords:
    "Jonathan Rodriguez, Engineer, SolidWorks, CAD Design, Sustainable Engineering, Ottawa, UPEI, Interactive Portfolio",
  authors: [{ name: "Jonathan Rodriguez" }],
  openGraph: {
    title: "Jonathan Rodriguez - Engineer-in-Training",
    description: "Interactive portfolio showcasing engineering projects, CAD design, and sustainable solutions.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
