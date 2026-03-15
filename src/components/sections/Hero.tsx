"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { HeroScene } from "@/components/3d/HeroScene";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import Typewriter from "typewriter-effect";
import { VT323 } from "next/font/google";

const pixelFont = VT323({
  weight: "400",
  subsets: ["latin"],
});

export function Hero() {

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-wrap gap-6 justify-center"
        >
          <button className="px-10 py-4 bg-transparent border border-gray-700 text-white font-mono text-sm uppercase tracking-widest hover:border-electric-cyan hover:text-electric-cyan transition-all duration-300 backdrop-blur-sm relative group overflow-hidden">
            <span className="relative z-10 block mix-blend-difference text-white">View Work</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out z-0"></div>
          </button>
        </motion.div>

        {/* Minimal Scroll Indicator centered at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gray-500 to-transparent animate-pulse"></div>
        </motion.div>
      </div>
    </section>
  );
}
