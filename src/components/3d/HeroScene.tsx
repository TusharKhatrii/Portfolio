"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function HeroScene() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const particleRef = useRef<THREE.Points>(null);

  // Holographic Core Material
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.5,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      }),
    []
  );

  // Neural Network Particles surrounding the core
  const particleCount = 200;
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      // Points on a sphere surface
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      
      const r = 2.5 + Math.random() * 0.5; // Slightly larger than core
      positions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const isPurple = Math.random() > 0.7;
      color.setHex(isPurple ? 0xb026ff : 0x00f0ff);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, []);

  const mouse = useRef(new THREE.Vector2(0, 0));
  const targetRotation = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    // Track mouse for 3D interaction
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.1);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.1);

    if (groupRef.current) {
      // Idle rotation
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x += delta * 0.1;

      // 3D Touch/Hover reaction (tilt towards mouse)
      targetRotation.current.x = mouse.current.y * 0.5;
      targetRotation.current.y = mouse.current.x * 0.5;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.current.x, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -targetRotation.current.y, 0.05);
    }

    if (meshRef.current) {
      // Pulse effect on the core
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
    
    if (particleRef.current) {
      // Counter-rotate particles
      particleRef.current.rotation.y -= delta * 0.1;
      particleRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Holographic Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 2]} />
        <primitive object={material} attach="material" />
      </mesh>

      {/* Another inner layer for complexity */}
      <mesh>
        <octahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color={0xb026ff} wireframe transparent opacity={0.1} />
      </mesh>

      {/* Neural Network Particles */}
      <points ref={particleRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Lights to make it pop */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#00f0ff" distance={5} />
      <ambientLight intensity={0.2} />
    </group>
  );
}
