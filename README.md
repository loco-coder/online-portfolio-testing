# Jonathan Rodriguez - Interactive Portfolio

An interactive 3D portfolio website featuring floating bubble animations and immersive user experience, showcasing Jonathan Rodriguez's engineering expertise and projects.

## ✨ Features

- **Interactive 3D Bubbles** - Mouse-responsive floating spheres using Three.js
- **Smooth Animations** - Fluid transitions and hover effects
- **Glass Morphism Design** - Modern translucent UI elements
- **Responsive Layout** - Optimized for all devices
- **Section Navigation** - Seamless content switching
- **Professional Content** - Complete engineering portfolio

## 🛠️ Technologies

 - **Next.js 15** - React framework with App Router
- **Three.js** - 3D graphics and animations
- **React Three Fiber** - React renderer for Three.js
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **GitHub Pages** - Deployment platform

## 🚀 Quick Start

\`\`\`bash
# Clone repository
git clone https://github.com/loco-coder/jonathan-rodriguez-portfolio.git

# Install dependencies
cd jonathan-rodriguez-portfolio
pnpm install

# Start development server
pnpm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see the portfolio.

## Implementation Guide

This project follows a modular structure for building the 3D portfolio. The key steps are:

1. **Project Setup** – Install the dependencies listed in `package.json` and structure the `app` and `components` directories as shown in this README.
2. **Main Layout** – Create `app/layout.tsx` with global styles and a simple `<html>` skeleton.
3. **Entry Point** – Use `app/page.tsx` to render the `InteractivePortfolio` component.
4. **Portfolio Component** – Manage navigation state and orchestrate the 3D scene alongside content overlays.
5. **Bubble Scene** – Implement mouse-responsive bubbles, lighting, and particle effects with React Three Fiber.
6. **Content Sections** – Build `About`, `Projects`, `Skills`, and `Contact` components that render inside overlays.
7. **Event Handling** – Wrap Three.js interactions in try/catch blocks to avoid runtime errors.
8. **Animation Loop** – Update bubble positions and particle systems inside `useFrame` callbacks.
9. **Styling** – Extend Tailwind CSS with custom colors and animations in `tailwind.config.js`.
10. **Data Structure** – Store portfolio data in a single object for easy updates.
11. **Performance** – Use `useMemo` and `useCallback` to keep renders smooth on mobile devices.
12. **Testing** – Ensure bubbles are clickable, navigation works, and responsive layouts look good before deploying.

## 📱 Sections

1. **Home** - Interactive hero with floating bubbles
2. **About** - Professional background and specializations
3. **Projects** - Featured engineering projects with details
4. **Skills** - Technical expertise by category
5. **Contact** - Professional contact information

## 🎨 Interactive Elements

- **Bubble Physics** - Spheres respond to mouse movement
- **Smooth Transitions** - Animated section changes
- **Hover Effects** - Interactive UI components
- **Glass Morphism** - Translucent design elements

## 🌐 Deployment

Automatically deploys to GitHub Pages on push to main branch.

**Live Site:** `https://loco-coder.github.io/jonathan-rodriguez-portfolio/`

## 📞 Contact

**Jonathan Rodriguez**  
Engineer-in-Training  
📧 rodriguezjonathan467@gmail.com  
📱 (902) 978-0118  
🔗 [LinkedIn](https://www.linkedin.com/in/jonathan-rodriguez-del-aguila/)  
🐙 [GitHub](https://github.com/loco-coder)

---

Built with ❤️ using Three.js, Next.js, and React Three Fiber
