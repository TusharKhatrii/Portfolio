"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Starfield } from "./Starfield";
import { Preload } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Starfield />
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.2} 
              luminanceSmoothing={0.9} 
              intensity={1.5} 
            />
          </EffectComposer>
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
