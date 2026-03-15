"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative min-h-screen text-white selection:bg-electric-cyan selection:text-space-black z-10">
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen
            key="loading-screen"
            onComplete={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      {!loading && (
        <div className="w-full">
          <Hero />
        </div>
      )}
    </main>
  );
}
