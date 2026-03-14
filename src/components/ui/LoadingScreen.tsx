"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds total
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      
      // Easing out function for a modern feel
      const easedProgress = 100 - 100 * Math.pow(1 - newProgress / 100, 3);
      
      setProgress(easedProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-space-black pointer-events-none"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <motion.svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="absolute text-white/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        >
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </motion.svg>

        {/* Inner Glowing Ring */}
        <motion.svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          className="absolute text-electric-cyan"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, ease: "linear", repeat: Infinity }}
        >
          <circle 
            cx="80" 
            cy="80" 
            r="70" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeDasharray="100 120" 
            strokeLinecap="round" 
            className="drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" 
          />
        </motion.svg>

        {/* Center Progress Text */}
        <div className="relative z-10 font-sans text-4xl font-light tracking-tighter text-white tabular-nums flex items-center justify-center">
          {Math.round(progress)}
          <span className="text-electric-cyan/50 text-xl ml-1">%</span>
        </div>
      </div>

      {/* Loading Text */}
      <div className="absolute bottom-24 flex flex-col items-center gap-2">
        <motion.div 
          className="text-white/40 text-xs tracking-[0.3em] font-medium"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          INITIALIZING PORTFOLIO
        </motion.div>
        
        {/* Very thin sleek progress line */}
        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden mt-4">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-electric-cyan to-neon-purple shadow-[0_0_10px_#00f0ff]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_120%)]" />
    </motion.div>
  );
}
