"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Terminal } from "lucide-react";
import { IconType } from "react-icons";
import {
  SiCplusplus,
  SiJavascript,
  SiPython,
  SiDart,
  SiNodedotjs,
  SiExpress,
  SiFlutter,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiHtml5,
  SiVercel,
  SiTypescript,
  SiGithubactions,
  SiGithub,
  SiPostman,
} from "react-icons/si";
import { FaJava, FaAws, FaCss3Alt } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";

// Map skills to icons and URLs
const getIconForSkill = (skill: string): { icon: IconType; url: string; color: string } | null => {
  const s = skill.toLowerCase();
  
  const skillMap: Record<string, { icon: IconType; url: string; color: string }> = {
    "github actions": { icon: SiGithubactions, url: "https://github.com/features/actions", color: "#2088FF" },
    "c/c++": { icon: SiCplusplus, url: "https://isocpp.org/", color: "#00599C" },
    "c++": { icon: SiCplusplus, url: "https://isocpp.org/", color: "#00599C" },
    javascript: { icon: SiJavascript, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "#F7DF1E" },
    typescript: { icon: SiTypescript, url: "https://www.typescriptlang.org/", color: "#3178C6" },
    python: { icon: SiPython, url: "https://www.python.org/", color: "#3776AB" },
    dart: { icon: SiDart, url: "https://dart.dev/", color: "#0175C2" },
    java: { icon: FaJava, url: "https://www.java.com/", color: "#007396" },
    node: { icon: SiNodedotjs, url: "https://nodejs.org/", color: "#339933" },
    express: { icon: SiExpress, url: "https://expressjs.com/", color: "#FFFFFF" },
    flutter: { icon: SiFlutter, url: "https://flutter.dev/", color: "#02569B" },
    postgres: { icon: SiPostgresql, url: "https://www.postgresql.org/", color: "#336791" },
    mysql: { icon: SiMysql, url: "https://www.mysql.com/", color: "#00758F" },
    supabase: { icon: SiSupabase, url: "https://supabase.com/", color: "#3ECF8E" },
    html: { icon: SiHtml5, url: "https://developer.mozilla.org/en-US/docs/Web/HTML", color: "#E34C26" },
    css: { icon: FaCss3Alt, url: "https://developer.mozilla.org/en-US/docs/Web/CSS", color: "#1572B6" },
    vercel: { icon: SiVercel, url: "https://vercel.com/", color: "#FFFFFF" },
    aws: { icon: FaAws, url: "https://aws.amazon.com/", color: "#FF9900" },
    github: { icon: SiGithub, url: "https://github.com/", color: "#FFFFFF" },
    postman: { icon: SiPostman, url: "https://www.postman.com/", color: "#FF6C37" },
    "vs code": { icon: VscCode, url: "https://code.visualstudio.com/", color: "#007ACC" },
  };

  // Check longer/more specific keys first to prioritize exact matches
  const sortedKeys = Object.keys(skillMap).sort((a, b) => b.length - a.length);
  
  for (const key of sortedKeys) {
    if (s.includes(key)) return skillMap[key];
  }
  
  return null;
};

// Flatten all skills into a single array
const allSkills = [
  ...resumeData.skills.languages,
  ...resumeData.skills.frameworks,
  ...resumeData.skills.databases,
  ...resumeData.skills.frontend,
  ...resumeData.skills.cloudAndDeployment.flatMap(skill => skill.split(/,|\//).map(s => s.trim())),
  ...resumeData.skills.tools,
].filter((skill) => skill && getIconForSkill(skill) !== null);

export function Skills() {
  return (
    <section className="relative w-full min-h-screen py-32 px-6 sm:px-12 md:px-24 z-10 flex flex-col items-center justify-center" id="skills">
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center">
        
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
              <span className="text-electric-cyan">STACK</span>
            </h2>
            <div className="h-[2px] w-full bg-gradient-to-r from-electric-cyan to-transparent flex-1" />
          </div>
        </motion.div>

        {/* Simple Unified Grid of Icons */}
        <motion.div 
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-8 md:gap-12 w-full place-items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {allSkills.map((skill, index) => {
            const skillData = getIconForSkill(skill);
            if (!skillData) return null;
            const { icon: Icon, url, color } = skillData;
            
            return (
              <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                key={skill}
                className="flex items-center justify-center text-4xl hover:scale-110 transition-transform duration-300 group relative cursor-pointer"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.03, // quick stagger
                  type: "spring",
                  stiffness: 200 
                }}
              >
                <Icon style={{ color }} />
                
                {/* Minimal tooltip on hover */}
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap pointer-events-none border border-[#333]">
                  {skill}
                </span>
              </motion.a>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
