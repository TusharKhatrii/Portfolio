# Tushar Khatri — Portfolio

A high-end, futuristic 3D portfolio website built with a sci-fi terminal aesthetic. Featuring interactive WebGL scenes, smooth scroll, a CLI-style About section, and a fully animated npm-install loading screen.

🌐 **[Live Site](https://tusharkhatrii.github.io/Portfolio/)** — View the live portfolio
---

## ✨ Features

- **Terminal Loading Screen** — Simulates `npm install` with a typewriter effect in a macOS-style terminal window
- **3D Starfield Background** — GPU-optimized WebGL particle system rendered with React Three Fiber
- **Interactive Hero** — Neural Network Orb that reacts to mouse movement, with looping typewriter role text
- **CLI About Section** — Pure command-line interface simulation with animated command execution
- **Skills Grid** — Color-accurate brand icons with hover tooltips and clickable documentation links
- **Projects Accordion** — Collapsible cards with tech stack pills and GitHub links
- **Education Accordion** — Expandable degree cards with highlights, achievements, and certification badges
- **Contact Section** — Unified 2×2 card grid with one-click copy (email/phone), WhatsApp deep link, and social cards
- **Sticky Auto-hiding Navbar** — Hides on scroll-down, reappears on scroll-up, frosted glass on scroll
- **Custom Cursor** — Minimalist Tron-style cursor that expands on hover
- **Smooth Scroll** — Powered by Lenis for a jank-free experience

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Vanilla CSS |
| 3D / WebGL | React Three Fiber, @react-three/drei, Three.js |
| Animation | Framer Motion |
| Smooth Scroll | Lenis |
| Icons | Lucide React, React Icons (si, fa, vsc) |
| Fonts | Inter, Geist Mono (Google Fonts) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (cursor, background, smooth scroll)
│   ├── page.tsx            # Main page — assembles all sections
│   └── globals.css         # Design tokens, Tailwind config
├── components/
│   ├── 3d/
│   │   ├── BackgroundCanvas.tsx   # R3F canvas wrapper
│   │   └── Starfield.tsx          # 3D particle starfield
│   ├── sections/
│   │   ├── Hero.tsx         # Hero with Neural Network Orb
│   │   ├── About.tsx        # CLI terminal simulation
│   │   ├── Skills.tsx       # Icon grid with brand colors
│   │   ├── Projects.tsx     # Collapsible project cards
│   │   ├── Education.tsx    # Accordion degree + certifications
│   │   ├── Contact.tsx      # Contact cards + social links
│   │   └── Footer.tsx       # Nav links + social icons
│   ├── ui/
│   │   ├── LoadingScreen.tsx  # Terminal npm install animation
│   │   ├── Navbar.tsx         # Sticky auto-hiding navbar
│   │   └── CustomCursor.tsx   # Tron-style custom cursor
│   └── providers/
│       └── SmoothScrollProvider.tsx  # Lenis wrapper
└── data/
    └── resume.ts            # Single source of truth for all content
```

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/TusharKhatrii/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

MIT — feel free to use this as inspiration for your own portfolio.

---

<p align="center">Built with ❤️ by <a href="https://github.com/TusharKhatrii">Tushar Khatri</a></p>
