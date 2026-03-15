"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { resumeData } from "@/data/resume";
import { Github, ExternalLink } from "lucide-react";

// 3D Card implementation from previous iterations, very performant and crash-free
function ProjectCard({ project, index }: { project: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative w-full group cursor-pointer"
    >
      <div 
        className="absolute inset-0 rounded-2xl border border-[#222] bg-[#0a0a0a] transition-colors duration-500 group-hover:border-electric-cyan/50 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
        style={{ transform: "translateZ(0px)" }}
      />
        
      <div 
        className="relative z-10 p-8 flex flex-col h-full gap-6"
        style={{ transform: "translateZ(30px)", transition: "transform 0.3s ease-out" }}
      >
        {/* Header: Title & Links */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-white group-hover:text-electric-cyan transition-colors">{project.title}</h3>
            <span className="text-neon-purple font-mono text-xs mt-1">{project.date}</span>
          </div>
          <div className="flex gap-3 text-gray-500">
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                <Github size={20} />
              </a>
            )}
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="hover:text-electric-cyan transition-colors" onClick={(e) => e.stopPropagation()}>
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Description List */}
        <ul className="flex-1 space-y-3">
          {project.description.map((desc: string, i: number) => (
            <li key={i} className="text-gray-400 text-sm leading-relaxed flex items-start gap-2">
              <span className="text-electric-cyan mt-1 opacity-50">{">"}</span>
              <span className="flex-1">{desc}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[#222]">
          {project.techStack.map((tech: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-[#141414] border border-[#333] rounded-full text-xs font-mono text-gray-300 group-hover:border-electric-cyan/30 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  
  // Inject the current portfolio as requested
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
      githubLink: "https://github.com/TusharKhatrii/Portfolio", // Default to user profile unless specific repo exists
      liveLink: "about:blank" // Placeholder deployment
    },
    ...resumeData.projects
  ];

  return (
    <section className="relative w-full min-h-screen py-32 px-6 sm:px-12 md:px-24 z-10 " id="projects">
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {allProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
