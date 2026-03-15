"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Terminal } from "lucide-react";

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
  SiGit, 
  SiGithub, 
  SiPostman
} from "react-icons/si";
import { FaJava, FaAws, FaCss3Alt } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import { IconType } from "react-icons";

// Map skills to icons and URLs
const getIconForSkill = (skill: string): { icon: IconType; color: string; url: string } | null => {
  const s = skill.toLowerCase();
  if (s.includes("c/c++") || s.includes("c++")) return { icon: SiCplusplus, color: "#00599C", url: "https://isocpp.org/" };
  if (s.includes("typescript")) return { icon: SiTypescript, color: "#3178C6", url: "https://www.typescriptlang.org/" };
  if (s.includes("javascript")) return { icon: SiJavascript, color: "#F7DF1E", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" };
  if (s.includes("python")) return { icon: SiPython, color: "#3776AB", url: "https://www.python.org/" };
  if (s.includes("dart")) return { icon: SiDart, color: "#0175C2", url: "https://dart.dev/" };
  if (s.includes("java")) return { icon: FaJava, color: "#007396", url: "https://www.java.com/" };
  if (s.includes("node")) return { icon: SiNodedotjs, color: "#339933", url: "https://nodejs.org/" };
  if (s.includes("express")) return { icon: SiExpress, color: "#FFFFFF", url: "https://expressjs.com/" };
  if (s.includes("flutter")) return { icon: SiFlutter, color: "#02569B", url: "https://flutter.dev/" };
  if (s.includes("postgres")) return { icon: SiPostgresql, color: "#4169E1", url: "https://www.postgresql.org/" };
  if (s.includes("mysql")) return { icon: SiMysql, color: "#4479A1", url: "https://www.mysql.com/" };
  if (s.includes("supabase")) return { icon: SiSupabase, color: "#3ECF8E", url: "https://supabase.com/" };
  if (s.includes("html")) return { icon: SiHtml5, color: "#E34F26", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" };
  if (s.includes("css")) return { icon: FaCss3Alt, color: "#1572B6", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" };
  if (s.includes("vercel")) return { icon: SiVercel, color: "#EAEAEA", url: "https://vercel.com/" };
  if (s.includes("aws")) return { icon: FaAws, color: "#FF9900", url: "https://aws.amazon.com/" };
  if (s.includes("git/github") || s.includes("github")) return { icon: SiGithub, color: "#FFFFFF", url: "https://github.com/" };
  if (s.includes("postman")) return { icon: SiPostman, color: "#FF6C37", url: "https://www.postman.com/" };
  if (s.includes("vs code")) return { icon: VscCode, color: "#007ACC", url: "https://code.visualstudio.com/" };
  return null;
};

// Flatten all skills into a single array
const allSkills = [
  ...resumeData.skills.languages,
  ...resumeData.skills.frameworks,
  ...resumeData.skills.databases,
  ...resumeData.skills.frontend,
  ...resumeData.skills.cloudAndDeployment,
  ...resumeData.skills.tools,
].filter((skill) => getIconForSkill(skill) !== null);

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
            const { icon: Icon, color, url } = skillData;
            
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
                <Icon color={color} />
                
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
