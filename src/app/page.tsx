"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-space-black text-white selection:bg-electric-cyan selection:text-space-black">
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen
            key="loading-screen"
            onComplete={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      {!loading && (
        <div className="flex min-h-screen items-center justify-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan to-neon-purple mt-20">
            Tushar Khatri
          </h1>
        </div>
      )}
    </main>
  );
}
