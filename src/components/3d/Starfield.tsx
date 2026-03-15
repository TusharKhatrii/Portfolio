"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Stellar color palette (realistic spectral classes) ────────────────────
const STELLAR_COLORS = [
  { hex: "#cce8ff", weight: 30 }, // B-type — blue-white
  { hex: "#f0f4ff", weight: 28 }, // A-type — pure white
  { hex: "#fff8e0", weight: 20 }, // G-type — sun-like pale yellow
  { hex: "#ffd090", weight: 12 }, // K-type — orange
  { hex: "#9ec8ff", weight: 6  }, // O-type — hot blue
  { hex: "#ffb07a", weight: 3  }, // M-type — reddish orange
  { hex: "#aaddff", weight: 1  }, // special bright blue
];
const COLOR_TOTAL = STELLAR_COLORS.reduce((a, c) => a + c.weight, 0);

function pickStarColor() {
  let r = Math.random() * COLOR_TOTAL;
  for (const sc of STELLAR_COLORS) {
    r -= sc.weight;
    if (r <= 0) return new THREE.Color(sc.hex);
  }
  return new THREE.Color("#ffffff");
}

// ─── Vertex shader: per-point size + seed for twinkling ────────────────────
const VERT = `
  attribute float size;
  attribute float seed;
  varying vec3  vColor;
  varying float vSeed;
  uniform float uTime;

  void main() {
    vColor = color;
    vSeed  = seed;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    // perspective size — larger when close
    gl_PointSize = size * (280.0 / -mvPos.z);
    gl_Position  = projectionMatrix * mvPos;
  }
`;

// ─── Fragment shader: glowing core + soft outer halo + twinkle ────────────
const FRAG = `
  varying vec3  vColor;
  varying float vSeed;
  uniform float uTime;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Bright tight core
    float core = 1.0 - smoothstep(0.0, 0.18, dist);
    // Wide soft halo
    float halo = 1.0 - smoothstep(0.18, 0.5, dist);
    float alpha = core * 1.0 + halo * 0.25;

    // Gentle twinkle per star (seed breaks up uniformity)
    float twinkle = 0.82 + 0.18 * sin(uTime * (2.0 + vSeed * 4.0) + vSeed * 47.3);
    alpha *= twinkle;

    gl_FragColor = vec4(vColor, alpha);
  }
`;

// ─── Nebula fragment: large, very soft colored blobs ──────────────────────
const NEBULA_FRAG = `
  varying vec3 vColor;
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha = alpha * alpha * 0.06; // very transparent
    gl_FragColor = vec4(vColor, alpha);
  }
`;

const NEBULA_VERT = `
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 600.0 / -mvPos.z;
    gl_Position  = projectionMatrix * mvPos;
  }
`;

// ─── Stars component ───────────────────────────────────────────────────────
const STAR_COUNT = 5000;
const DEPTH = 250;
const SPREAD = 120;
const FLY_SPEED = 3.5; // slow, like a spacecraft gliding

function Stars() {
  const ref = useRef<THREE.Points>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const { positions, colors, sizes, seeds, speeds } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors    = new Float32Array(STAR_COUNT * 3);
    const sizes     = new Float32Array(STAR_COUNT);
    const seeds     = new Float32Array(STAR_COUNT);
    const speeds    = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      // Slightly more density toward galactic-center direction (right side)
      const xBias = (Math.random() - 0.4) * SPREAD;
      const y     = (Math.random() - 0.5) * SPREAD * 0.65; // flattened like galactic disk
      const z     = -Math.random() * DEPTH;

      positions[i * 3]     = xBias;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const c = pickStarColor();
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      // 95% small, 4% medium, 1% bright giant
      const roll = Math.random();
      sizes[i]  = roll > 0.99 ? 3.2 + Math.random() * 1.5
                : roll > 0.95 ? 1.4 + Math.random() * 0.8
                :               0.3 + Math.random() * 0.8;

      seeds[i]  = Math.random();
      speeds[i] = 0.6 + Math.random() * 0.8; // speed spread for parallax depth
    }
    return { positions, colors, sizes, seeds, speeds };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    // Subtle mouse parallax
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.04, 0.04);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y,  state.pointer.x * 0.04, 0.04);

    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < STAR_COUNT; i++) {
      pos[i * 3 + 2] += delta * FLY_SPEED * speeds[i];
      if (pos[i * 3 + 2] > 18) {
        // Reset star to far distance, randomise x/y to keep scene fresh
        pos[i * 3]     = (Math.random() - 0.4) * SPREAD;
        pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 0.65;
        pos[i * 3 + 2] = -DEPTH;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
        <bufferAttribute attach="attributes-size"     args={[sizes,     1]} />
        <bufferAttribute attach="attributes-seed"     args={[seeds,     1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
      />
    </points>
  );
}

// ─── Nebula dust component ─────────────────────────────────────────────────
const NEBULA_COUNT = 320;
const NEBULA_COLORS = ["#00d4ff", "#9b30ff", "#ff3fa4", "#00ffb0", "#5060ff"];

function Nebula() {
  const ref = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(NEBULA_COUNT * 3);
    const colors    = new Float32Array(NEBULA_COUNT * 3);
    for (let i = 0; i < NEBULA_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * SPREAD * 1.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 0.8;
      positions[i * 3 + 2] = -30 - Math.random() * 120; // mid-far range only
      const c = new THREE.Color(NEBULA_COLORS[Math.floor(Math.random() * NEBULA_COLORS.length)]);
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    // Nebula drifts very slowly forward (much slower than stars — gives depth)
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < NEBULA_COUNT; i++) {
      pos[i * 3 + 2] += delta * 0.6;
      if (pos[i * 3 + 2] > 10) {
        pos[i * 3]     = (Math.random() - 0.5) * SPREAD * 1.5;
        pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 0.8;
        pos[i * 3 + 2] = -120;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={NEBULA_VERT}
        fragmentShader={NEBULA_FRAG}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Default export wrapper ────────────────────────────────────────────────
export function Starfield() {
  return (
    <>
      <Stars />
      <Nebula />
    </>
  );
}
