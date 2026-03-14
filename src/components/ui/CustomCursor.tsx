"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  // Main dot position (fast spring)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Trail position (slower spring)
  const trailX = useSpring(mouseX, { stiffness: 60, damping: 15, mass: 0.5 });
  const trailY = useSpring(mouseY, { stiffness: 60, damping: 15, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setIsHidden(false);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      );
    };

    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (isHidden) return null;

  return (
    <>
      {/* Trailing Glow Ring/Dot */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-electric-cyan pointer-events-none z-[100] mix-blend-screen shadow-[0_0_15px_rgba(0,240,255,0.7)]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 1.5 : 0.8,
          opacity: isPointer ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Tiny Sharp Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[101] shadow-[0_0_5px_#fff]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 0 : 1, // Flattens into the ring on hover
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
