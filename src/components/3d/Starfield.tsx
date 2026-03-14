"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;

  // Generate star positions
  const { positions, colors, sizes, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Cylindrical distribution around Z axis (flying toward camera)
      const radius = 5 + Math.random() * 45; // Avoid dead center
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 200; // Deep Z space
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = z;

      // Realistic, softer star colors to stop flashing
      const randType = Math.random();
      if (randType > 0.95) {
        // Very faint purple
        color.setHSL(0.78, 0.8, 0.6); 
      } else if (randType > 0.8) {
        // Faint cyan
        color.setHSL(0.5, 0.8, 0.6);
      } else {
        // Soft white, capped intensity
        color.setHSL(0, 0, 0.4 + Math.random() * 0.3); 
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Maintain very small sizes so they don't blow perfectly
      sizes[i] = Math.random() * 1.0 + 0.2;

      // Varying speeds for depth effect
      speeds[i] = Math.random() * 2 + 0.5;
    }

    return { positions, colors, sizes, speeds };
  }, []);

  const mouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    // Map normalize screen coordinates to world coordinates
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, (state.pointer.x * state.viewport.width) / 2, 0.1);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, (state.pointer.y * state.viewport.height) / 2, 0.1);

    if (pointsRef.current) {
      // Base rotation based on mouse for a looking-around effect
      pointsRef.current.rotation.x = -state.pointer.y * 0.05;
      pointsRef.current.rotation.y = state.pointer.x * 0.05;

      const positionsAttr = pointsRef.current.geometry.attributes.position;
      const arr = positionsAttr.array as Float32Array;
      
      const gravityRadius = 15;
      const baseSpeed = 8; // Slower speed of flying through space to reduce flash

      // Simulate flying forward by moving stars backward
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        let px = arr[i3];
        let py = arr[i3 + 1];
        let pz = arr[i3 + 2];

        // Move stars toward the camera (+Z)
        pz += delta * baseSpeed * speeds[i];

        // If star passes the camera, reset it far back
        if (pz > 50) {
          pz = -150;
          // Randomize X and Y slightly on reset to avoid patterns
          const radius = 5 + Math.random() * 45;
          const angle = Math.random() * Math.PI * 3;
          px = Math.cos(angle) * radius;
          py = Math.sin(angle) * radius;
        }

        // Gravity well effect (warp stars toward cursor horizontally/vertically)
        const dx = mouse.current.x - px;
        const dy = mouse.current.y - py;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

        // If star is near the mouse line of sight, pull it in (warp effect)
        // if (distanceToMouse < gravityRadius) {
        //   const pull = (gravityRadius - distanceToMouse) / gravityRadius;
        //   // Subtly curve the path toward the mouse - scaled down to be smoother
        //   px += dx * pull * delta;
        //   py += dy * pull * delta;
        // }

        arr[i3] = px;
        arr[i3 + 1] = py;
        arr[i3 + 2] = pz;
      }
      
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      {/* 
        Custom shader material to allow per-particle sizing without
        harsh additive blending
      */}
      <shaderMaterial
        transparent
        depthWrite={false}
        // Normal blending instead of Additive to prevent bright flashes
        blending={THREE.NormalBlending} 
        vertexShader={`
          attribute float size;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            // Distant stars should appear smaller, close stars slightly larger
            gl_PointSize = size * (200.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() {
            // Soft circular glow rather than harsh squares
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = smoothstep(0.5, 0.1, dist);
            gl_FragColor = vec4(vColor, alpha * 0.7); // Cap opacity at 0.7
          }
        `}
        vertexColors={true}
      />
    </points>
  );
}




