"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/ui/Navbar";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative min-h-screen text-white selection:bg-electric-cyan selection:text-space-black z-10">
      <Navbar />
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen
            key="loading-screen"
            onComplete={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      {!loading && (
        <div className="w-full flex flex-col items-center">
          <Hero />
          
          {/* Subtle separator line to delineate sections clearly */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
          
          <About />
          
          {/* Subtle separator line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
          
          <Skills />

          {/* Subtle separator line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

          <Projects />

          {/* Subtle separator line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

          <Education />

          {/* Subtle separator line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

          <Contact />

          <Footer />
        </div>
      )}
    </main>
  );
}
