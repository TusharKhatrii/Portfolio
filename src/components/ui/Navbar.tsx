"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { resumeData } from "@/data/resume";
import { Menu, X } from "lucide-react";

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
  const [showStickyLogo, setShowStickyLogo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 150);
    setAtTop(latest < 10);
    // Show sticky logo only after scrolling past hero section (approx 500px)
    setShowStickyLogo(latest > 500);
  });

  return (
    <>
      {/* Sticky Logo — appears only after hero section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showStickyLogo ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 z-50 px-6 sm:px-12 md:px-24 h-16 flex items-center pointer-events-none"
      >
        <a
          href="#"
          className="text-xl font-black text-white tracking-tighter uppercase hover:text-electric-cyan transition-colors pointer-events-auto"
        >
          {resumeData.personal.name.split(" ")[0]}
          <span className="text-electric-cyan">.</span>
        </a>
      </motion.div>

      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          atTop ? "bg-transparent" : "bg-[#050505]/80 backdrop-blur-md border-b border-[#1e1e1e]"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-24 h-16 flex items-center justify-between">
          
          {/* Logo — hidden, shown as sticky overlay instead */}
          <div className="invisible w-1/3"></div>

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

          {/* Desktop CTA */}
          <a
            href={resumeData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-lg border border-electric-cyan/40 bg-electric-cyan/5 text-electric-cyan hover:bg-electric-cyan/10 hover:border-electric-cyan/70 transition-all font-mono text-sm z-20 flex-shrink-0"
          >
            GitHub
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-20 flex-shrink-0 p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className={`fixed top-16 left-0 right-0 z-40 md:hidden bg-[#050505]/95 backdrop-blur-md border-b border-[#1e1e1e] ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white font-mono text-sm transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href={resumeData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-electric-cyan/40 bg-electric-cyan/5 text-electric-cyan hover:bg-electric-cyan/10 hover:border-electric-cyan/70 transition-all font-mono text-sm text-center justify-center"
          >
            GitHub
          </a>
        </div>
      </motion.div>
    </>
  );
}
