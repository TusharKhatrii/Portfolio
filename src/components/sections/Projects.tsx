"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { resumeData } from "@/data/resume";
import { Github, ExternalLink, ChevronsUpDown, ChevronsDownUp } from "lucide-react";

export function Projects() {

  // All cards minimized by default
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const allProjects = [
    {
      title: "Portfolio",
      date: "Mar 2026",
      techStack: ["Next.js 14", "React Three Fiber", "Tailwind CSS", "Framer Motion"],
      description: [
        "Architected a high-end, immersive 3D portfolio utilizing React Three Fiber for a customized WebGL experience.",
        "Implemented a highly performant CSS 3D rendering pipeline for UI cards to bypass strict browser WebGL context limits.",
        "Integrated a pure CLI-style interactive terminal for the 'About' section, demonstrating command-line proficiency.",
      ],
      githubLink: "https://github.com/TusharKhatrii/Portfolio",
      liveLink: "about:blank",
    },
    ...resumeData.projects,
  ];

  return (
    <section className="relative w-full py-32 px-6 sm:px-12 md:px-24 z-10" id="projects">
      <div className="max-w-6xl w-full mx-auto flex flex-col">

        {/* Header */}
        <motion.div
          className="flex flex-col w-full mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
              <span className="text-electric-cyan">PROJECTS</span>
            </h2>
            <div className="h-[2px] w-full bg-gradient-to-r from-electric-cyan to-transparent flex-1" />
          </div>
        </motion.div>

        {/* Project Cards */}
        <div className="flex flex-col gap-6">
          {allProjects.map((project, index) => {
            const isOpen = !!expanded[index];
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group"
              >
                <div className="p-[1px] rounded-2xl bg-gradient-to-br from-electric-cyan/30 via-transparent to-neon-purple/20 hover:from-electric-cyan/60 hover:to-neon-purple/50 transition-all duration-500">
                  <div className="bg-[#0a0a0a]/90 backdrop-blur-md rounded-2xl overflow-hidden">

                    {/* Always-visible header row */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 md:p-8">
                      
                      {/* Title + Date */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-electric-cyan transition-colors truncate">
                          {project.title}
                        </h3>
                        <span className="text-neon-purple font-mono text-xs mt-1">{project.date}</span>
                      </div>

                      {/* Right side: links + toggle */}
                      <div className="flex items-center gap-3 shrink-0">
                        {/* GitHub */}
                        {project.githubLink && project.githubLink !== "about:blank" && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#333] bg-[#141414] text-gray-400 hover:text-white hover:border-gray-500 transition-all text-xs font-mono"
                          >
                            <Github size={13} />
                            Code
                          </a>
                        )}
                        {/* Live */}
                        {project.liveLink && project.liveLink !== "about:blank" && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-electric-cyan/30 bg-electric-cyan/5 text-electric-cyan hover:bg-electric-cyan/10 transition-all text-xs font-mono"
                          >
                            <ExternalLink size={13} />
                            Live
                          </a>
                        )}

                        {/* Expand / Collapse toggle button */}
                        <button
                          onClick={() => toggle(index)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#333] bg-[#141414] text-gray-400 hover:text-electric-cyan hover:border-electric-cyan/40 transition-all text-xs font-mono"
                        >
                          {isOpen ? <ChevronsDownUp size={14} /> : <ChevronsUpDown size={14} />}
                        </button>
                      </div>
                    </div>

                    {/* Tech stack pills — always visible */}
                    <div className="flex flex-wrap gap-2 px-6 md:px-8 pb-5">
                      {project.techStack.map((tech: string, i: number) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-[#141414] border border-[#2a2a2a] rounded-full text-xs font-mono text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Collapsible body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <ul className="flex flex-col gap-3 px-6 md:px-8 pb-8 pt-2 border-t border-[#1e1e1e]">
                            {project.description.map((desc: string, i: number) => (
                              <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed pt-3 first:pt-4">
                                <span className="text-electric-cyan opacity-60 mt-1 shrink-0">{">"}</span>
                                <span>{desc}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
