"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface TerminalLine {
  text: string;
  color: string;
  isPrompt?: boolean;
  empty?: boolean;
}

const LINES: TerminalLine[] = [
  { text: "npm install @tusharkhatri/portfolio",              color: "text-white",         isPrompt: true },
  { text: "⠧ resolving packages...",                         color: "text-electric-cyan" },
  { text: "+ next@14 framer-motion@11 @react-three/fiber@8", color: "text-green-400" },
  { text: "+ tailwindcss@3.4 react-icons@5 lenis@1",         color: "text-green-400" },
  { text: "✓ 1,024 packages installed in 1s",               color: "text-green-400" },
  { text: "",                                                 color: "",                   empty: true },
  { text: "Launching Portfolio...",                          color: "text-neon-purple" },
];

// Speed in ms per character for each line index
const CHAR_SPEED: Record<number, number> = {
  0: 30, // npm install command — slightly slower
};
const DEFAULT_SPEED = 8;

// Pause in ms AFTER each line finishes before next starts
const LINE_PAUSE: Record<number, number> = {
  0: 60,
  4: 60,
  5: 30,  // empty spacer
  6: 350, // last line — brief linger before exit
};
const DEFAULT_PAUSE = 20;

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  // shownLines[i] = the partial text currently displayed for line i
  const [shownLines, setShownLines] = useState<string[]>([]);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms: number) =>
      new Promise<void>((res) => setTimeout(res, ms));

    async function run() {
      for (let i = 0; i < LINES.length; i++) {
        if (cancelled) return;
        const line = LINES[i];

        if (line.empty) {
          // Add empty line instantly
          setShownLines((prev) => [...prev, ""]);
          await sleep(LINE_PAUSE[i] ?? DEFAULT_PAUSE);
          continue;
        }

        const speed = CHAR_SPEED[i] ?? DEFAULT_SPEED;
        const fullText = line.text;

        // Add the line with empty string to "open" the slot
        setShownLines((prev) => [...prev, ""]);

        // Type out each character
        for (let c = 1; c <= fullText.length; c++) {
          if (cancelled) return;
          const partial = fullText.slice(0, c);
          setShownLines((prev) => {
            const next = [...prev];
            next[i] = partial;
            return next;
          });
          await sleep(speed);
        }

        // Pause before next line
        await sleep(LINE_PAUSE[i] ?? DEFAULT_PAUSE);
      }

      if (!cancelled) {
        setExiting(true);
        await sleep(450);
        onComplete();
      }
    }

    run();
    return () => { cancelled = true; };
  // onComplete is stable (passed from parent useState setter wrapper), safe to omit
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#0d0d0d] flex items-center justify-center p-4"
        >
          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-2xl rounded-xl overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.07)] border border-[#2a2a2a]"
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1c1c1c] border-b border-[#252525]">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="flex-1 text-center text-gray-500 font-mono text-xs select-none">
                tusharkhatri — zsh — 80×24
              </span>
            </div>

            {/* Terminal body */}
            <div className="bg-[#0d0d0d] px-5 pt-5 pb-6 font-mono text-sm min-h-[300px]">
              {LINES.map((line, i) => {
                if (i >= shownLines.length) return null;
                const text = shownLines[i];

                if (line.empty) return <div key={i} className="h-3" />;

                // Is this line currently being typed?
                const isActive = i === shownLines.length - 1 && text.length < line.text.length;

                return (
                  <div key={i} className={`leading-6 ${line.color}`}>
                    {line.isPrompt && (
                      <span className="text-green-400 mr-2 select-none">❯</span>
                    )}
                    <span>{text}</span>
                    {isActive && (
                      <span className="inline-block w-1.5 h-[1em] bg-current opacity-70 animate-pulse ml-px translate-y-0.5" />
                    )}
                  </div>
                );
              })}

              {/* Final idle cursor */}
              {shownLines.length === LINES.length && (
                <span className="inline-block w-2 h-4 bg-electric-cyan opacity-80 animate-pulse ml-0.5" />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
