"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { resumeData } from "@/data/resume";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 150);
    setAtTop(latest < 10);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        atTop ? "bg-transparent" : "bg-[#050505]/80 backdrop-blur-md border-b border-[#1e1e1e]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-24 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <a
          href="#"
          className="text-xl font-black text-white tracking-tighter uppercase hover:text-electric-cyan transition-colors"
        >
          {resumeData.personal.name.split(" ")[0]}
          <span className="text-electric-cyan">.</span>
        </a>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-white font-mono text-sm transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-electric-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={resumeData.personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-lg border border-electric-cyan/40 bg-electric-cyan/5 text-electric-cyan hover:bg-electric-cyan/10 hover:border-electric-cyan/70 transition-all font-mono text-sm"
        >
          GitHub
        </a>

      </div>
    </motion.header>
  );
}
