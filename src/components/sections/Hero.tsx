"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { HeroScene } from "@/components/3d/HeroScene";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import Typewriter from "typewriter-effect";
import { VT323 } from "next/font/google";
import { ChevronDown } from "lucide-react";

const pixelFont = VT323({
  weight: "400",
  subsets: ["latin"],
});

export function Hero() {

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center">
      {/* 3D Scene Container - Full Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none md:pointer-events-auto opacity-40 md:opacity-100">
        <div className="w-full h-full">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <HeroScene />
            <Preload all />
          </Canvas>
        </div>
      </div>

      {/* Text Content - Absolute Center Overlay */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center mt-20">
        
        {/* Name Header - Sci-Fi styling with Pixel Font */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className={`text-6xl sm:text-8xl md:text-[8rem] mb-4 leading-none tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-br from-white via-electric-cyan to-neon-purple drop-shadow-[0_0_15px_rgba(0,240,255,0.4)] ${pixelFont.className}`}
        >
          {resumeData.personal.name}
        </motion.h1>

        {/* Typewriter Effect for Role */}
        <div className="text-lg sm:text-2xl md:text-3xl text-electric-cyan font-mono mb-12 h-10 flex justify-center tracking-wide">
          <Typewriter
            options={{
              strings: resumeData.personal.role.split(" & "),
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </div>

        {/* Animated Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center justify-center mt-12 gap-2"
        >
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-electric-cyan"
          >
            <ChevronDown size={32} className="drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] opacity-80" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
