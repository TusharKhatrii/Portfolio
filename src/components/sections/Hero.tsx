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

      </div>

      {/* Animated Mouse Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer z-20"
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <motion.div 
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[34px] h-[54px] rounded-[30px] border-[2px] border-slate-500/60 flex justify-center pt-2"
        >
          {/* Static Inner Wheel */}
          <div className="w-1.5 h-3.5 rounded-full bg-slate-400/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
