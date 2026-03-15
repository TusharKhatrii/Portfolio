"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { resumeData } from "@/data/resume";
import { GraduationCap, ExternalLink, ChevronsUpDown, ChevronsDownUp } from "lucide-react";
import { SiCoursera, SiHackerrank } from "react-icons/si";

export function Education() {
  // All cards minimized by default
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="relative w-full min-h-screen py-32 px-6 sm:px-12 md:px-24 z-10" id="education">
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
              <span className="text-electric-cyan">EDUCATION</span>
            </h2>
            <div className="h-[2px] w-full bg-gradient-to-r from-electric-cyan to-transparent flex-1" />
          </div>
        </motion.div>

        {/* Education Cards */}
        {resumeData.education.map((edu, index) => {
          const isOpen = !!expanded[index];
          return (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative mb-8 group"
            >
              <div className="p-[1px] rounded-2xl bg-gradient-to-br from-electric-cyan/30 via-transparent to-neon-purple/30 group-hover:from-electric-cyan/60 group-hover:to-neon-purple/60 transition-all duration-500">
                <div className="bg-[#0a0a0a]/90 backdrop-blur-md rounded-2xl overflow-hidden">

                  {/* Always-visible top row — clickable to toggle */}
                  <button
                    onClick={() => toggle(index)}
                    className="w-full p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center text-left"
                  >
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-electric-cyan/10 border border-electric-cyan/20 shrink-0">
                      <GraduationCap className="text-electric-cyan" size={28} />
                    </div>

                    <div className="flex flex-col gap-1 flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">{edu.degree}</h3>
                      <p className="text-gray-400 font-mono text-sm">{edu.field}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="text-gray-400 font-mono text-xs">{edu.shortInstitution}</span>
                        <span className="text-gray-600">|</span>
                        <span className="text-gray-300 font-mono text-xs">{edu.period}</span>
                        {edu.flag === true && (
                          <span className="inline-block w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* Expand / collapse icon */}
                    <div className="text-gray-500 group-hover:text-electric-cyan transition-colors shrink-0">
                      {isOpen ? <ChevronsDownUp size={20} /> : <ChevronsUpDown size={20} />}
                    </div>
                  </button>

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
                        <div className="px-8 md:px-10 pb-8 md:pb-10 flex flex-col gap-6 border-t border-[#1e1e1e]">

                          {/* Description */}
                          <p className="text-gray-400 font-mono text-sm leading-relaxed border-l-2 border-[#333] pl-4 pt-6">
                            {edu.description}
                          </p>

                          {/* Highlights */}
                          {edu.highlights && edu.highlights.length > 0 && (
                            <ul className="flex flex-col gap-3">
                              {edu.highlights.map((point, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                                  <span className="text-electric-cyan opacity-60 mt-1 shrink-0">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Achievements */}
                          <div className="flex flex-col gap-3 pt-4 border-t border-[#222]">
                            <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">Achievements</span>
                            <div className="flex flex-wrap gap-2">
                              {edu.achievements.map((badge, i) => (
                                <span key={i} className="px-3 py-1 rounded-full border border-[#333] bg-[#141414] text-gray-300 font-mono text-xs hover:border-electric-cyan/40 transition-colors">
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Certifications */}
        <motion.div
          className="flex flex-col w-full mt-8 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">
              <span className="text-neon-purple">Certifications</span>
            </h3>
            <div className="h-[1px] w-full bg-gradient-to-r from-neon-purple to-transparent flex-1" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.certifications.map((cert, index) => (
            <motion.a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex items-start gap-4 p-6 rounded-xl border border-[#222] bg-[#0a0a0a]/70 backdrop-blur-sm hover:border-neon-purple/50 hover:shadow-[0_0_20px_rgba(176,38,255,0.1)] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-neon-purple/10 border border-neon-purple/20 shrink-0 mt-0.5 text-xl">
                {cert.issuer === "Coursera" && <SiCoursera color="#0056D2" />}
                {cert.issuer === "HackerRank" && <SiHackerrank color="#00EA64" />}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-white font-medium text-base group-hover:text-neon-purple transition-colors leading-snug">{cert.title}</span>
                <span className="text-gray-500 font-mono text-xs mt-1">{cert.issuer}</span>
              </div>
              <ExternalLink size={16} className="text-gray-600 group-hover:text-neon-purple transition-colors shrink-0 mt-1" />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
