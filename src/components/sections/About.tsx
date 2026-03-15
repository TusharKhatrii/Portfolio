"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { useState, useEffect } from "react";
import { Copy, Terminal, Github, Linkedin, Mail, Phone } from "lucide-react";

export function About() {
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCopyEmail = () => {
    const email = resumeData.personal.email.replace("mailto:", "");
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isMounted) return null;

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-32 px-6 sm:px-12 md:px-24 z-10" id="about">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Side: Terminal Style About Text */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              ABOUT<span className="text-electric-cyan"> ME</span>
            </h2>
            <div className="h-[2px] w-full bg-gradient-to-r from-electric-cyan to-transparent flex-1" />
          </div>

          <div className="relative group">
            {/* Terminal Window Header */}
            <div className="bg-[#1a1a1a] border-t border-l border-r border-[#333] rounded-t-lg p-3 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <Terminal size={14} />
                <span>guest@tushar:~/about</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="bg-[#0f0f0f] border border-[#333] rounded-b-lg p-6 md:p-8 font-mono relative overflow-hidden group-hover:border-electric-cyan/50 transition-colors duration-500 shadow-2xl">

              {/* Scanline Effect Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.03)_50%,rgba(255,255,255,0))] bg-[length:100%_4px] pointer-events-none opacity-20"></div>

              <div className="text-gray-300 leading-relaxed space-y-4 text-sm md:text-base relative z-10">
                <p>
                  <span className="text-neon-purple">{"const"}</span> <span className="text-electric-cyan">profile</span> = <span className="text-yellow-300">"Computer Science Student"</span>;
                </p>
                <div className="text-gray-400 mt-4 leading-loose">
                  {resumeData.summary.split(". ").map((sentence, idx, arr) => {
                    if (idx === arr.length - 1 && sentence === "") return null;
                    const text = sentence.endsWith(".") ? sentence : sentence + ".";
                    return (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.4 }}
                        className="block mb-2"
                      >
                        <span className="text-electric-cyan opacity-50 mr-2">{">"}</span>
                        {text}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Data/Contact UI */}
        <motion.div
          className="lg:col-span-5 flex flex-col gap-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Neon Card 1: Status */}
          <div className="p-[1px] bg-gradient-to-b from-electric-cyan/40 to-transparent rounded-xl hover:from-electric-cyan/70 transition-colors duration-500">
            <div className="bg-[#0a0a0a] p-6 rounded-xl flex flex-col gap-2 h-full justify-center shadow-[0_0_15px_rgba(0,240,255,0.05)]">
              <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">Current Status</span>
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-electric-cyan"></span>
                </div>
                <span className="text-white font-medium text-lg">Available for opportunities</span>
              </div>
            </div>
          </div>

          {/* Neon Card 2: Contact */}
          <div className="p-[1px] bg-gradient-to-b from-neon-purple/40 to-transparent rounded-xl hover:from-neon-purple/70 transition-colors duration-500">
            <div className="bg-[#0a0a0a] p-6 rounded-xl flex flex-col gap-4 shadow-[0_0_15px_rgba(176,38,255,0.05)]">
              <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">Connect</span>

              {/* Email Row */}
              <div className="flex items-center justify-between bg-[#141414] border border-[#222] p-3 rounded-lg hover:border-electric-cyan transition-colors group cursor-pointer" onClick={handleCopyEmail}>
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail size={16} className="text-gray-400 group-hover:text-electric-cyan shrink-0" />
                  <span className="text-gray-300 font-mono text-sm truncate group-hover:text-white transition-colors">
                    {resumeData.personal.email.replace("mailto:", "")}
                  </span>
                </div>
                <button
                  className="text-gray-400 group-hover:text-electric-cyan transition-colors p-2 flex items-center gap-2 shrink-0 ml-2"
                  title="Copy Email"
                >
                  {copied ? <span className="text-xs font-bold font-mono">COPIED!</span> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone Row */}
              <div className="flex items-center gap-3 bg-[#141414] border border-[#222] p-3 rounded-lg hover:border-electric-cyan transition-colors group text-gray-300 hover:text-white">
                <Phone size={16} className="text-gray-400 group-hover:text-electric-cyan shrink-0" />
                <span className="font-mono text-sm truncate">
                  {resumeData.personal.phone}
                </span>
              </div>

              {/* Socials Row */}
              <div className="grid grid-cols-2 gap-3 mt-1">
                <a href={resumeData.personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 px-4 bg-[#141414] border border-[#222] rounded-lg text-sm font-mono text-gray-300 hover:text-white hover:border-neon-purple transition-all shadow-md">
                  <Github size={16} />
                  GitHub
                </a>
                <a href={resumeData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 px-4 bg-[#141414] border border-[#222] rounded-lg text-sm font-mono text-gray-300 hover:text-white hover:border-electric-cyan transition-all shadow-md">
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
