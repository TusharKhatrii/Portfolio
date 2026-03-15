"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

const navLinks = [
  { label: "Hero", href: "#" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative w-full z-10 border-t border-[#1e1e1e] mt-0">
      <div className="max-w-6xl w-full mx-auto px-6 sm:px-12 md:px-24 py-16 flex flex-col gap-12">

        {/* Top row: Name + nav */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <span className="text-2xl font-black text-white tracking-tighter uppercase">
              {resumeData.personal.name.split(" ")[0]}
              <span className="text-electric-cyan">.</span>
            </span>
            <span className="text-gray-500 font-mono text-xs mt-1">
              Software Engineer · CS Student · Builder
            </span>
          </motion.div>

          {/* Nav links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-500 hover:text-electric-cyan font-mono text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#333] to-transparent" />

        {/* Bottom row: copyright + socials */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gray-600 font-mono text-xs flex items-center gap-1.5"
          >
            Built with <Heart size={11} className="text-electric-cyan fill-electric-cyan" /> by{" "}
            <span className="text-gray-400">{resumeData.personal.name}</span> · {new Date().getFullYear()}
          </motion.p>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <a
              href={resumeData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={resumeData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#0A66C2] transition-colors"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={resumeData.personal.email}
              className="text-gray-500 hover:text-electric-cyan transition-colors"
              title="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href={resumeData.personal.Leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#FFA116] transition-colors text-lg"
              title="LeetCode"
            >
              <SiLeetcode />
            </a>
          </motion.div>
        </div>

      </div>
    </footer>
  );
}
