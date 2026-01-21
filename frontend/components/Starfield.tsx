"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Detect reduced motion preference
const prefersReducedMotion = typeof window !== "undefined"
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;

function Stars() {
  const pointsRef = useRef<THREE.Points>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const rafRef = useRef<number | null>(null);

  // Reduced star count for better performance (was 3000)
  const STAR_COUNT = 1500;
  const SPREAD = 200;

  // Create circular texture for stars
  const starTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Track scroll for warp effect
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const velocity = Math.abs(currentScrollY - lastScrollY);
      setScrollVelocity(Math.min(velocity * 0.5, 10));
      lastScrollY = currentScrollY;

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setScrollVelocity(0);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  // Throttled mouse tracking for warp effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        setMousePosition({ x, y });
        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Generate star positions and colors
  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);
    const velocities = new Float32Array(STAR_COUNT);

    // Silver: #94A3B8 = rgb(148, 163, 184)
    // Cool Slate: #475569 = rgb(71, 85, 105)
    const silverColor = new THREE.Color(0x94a3b8);
    const slateColor = new THREE.Color(0x475569);

    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;

      // Random position in cylindrical distribution
      const radius = Math.random() * SPREAD;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;
      const z = (Math.random() - 0.5) * SPREAD * 2;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // Mix between silver and slate
      const colorMix = Math.random();
      const starColor = silverColor.clone().lerp(slateColor, colorMix);
      colors[i3] = starColor.r;
      colors[i3 + 1] = starColor.g;
      colors[i3 + 2] = starColor.b;

      // Random initial velocity
      velocities[i] = Math.random() * 0.3 + 0.1;
    }

    return { positions, colors, velocities };
  }, []);

  // Animation loop - respects reduced motion preference
  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    // Skip heavy animations if user prefers reduced motion
    if (prefersReducedMotion) {
      pointsRef.current.rotation.y += delta * 0.01;
      return;
    }

    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    // Calculate warp speed based on mouse distance from center
    const mouseDistance = Math.sqrt(
      mousePosition.x * mousePosition.x + mousePosition.y * mousePosition.y
    );
    const warpMultiplier = 1 + mouseDistance * 0.5 + scrollVelocity * 0.2;

    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;

      // Move stars toward camera (positive Z)
      positions[i3 + 2] += velocities[i] * warpMultiplier * 60 * delta;

      // Reset star position when it passes the camera
      if (positions[i3 + 2] > 100) {
        positions[i3 + 2] = -SPREAD;

        // Reposition in cylinder
        const radius = Math.random() * SPREAD;
        const theta = Math.random() * Math.PI * 2;
        positions[i3] = Math.cos(theta) * radius;
        positions[i3 + 1] = Math.sin(theta) * radius;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Parallax rotation based on mouse
    pointsRef.current.rotation.x = mousePosition.y * 0.05;
    pointsRef.current.rotation.y = mousePosition.x * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={starTexture}
        size={0.6}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function Starfield() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75, near: 0.1, far: 1000 }}
        style={{ background: "#0A1929" }}
        gl={{ alpha: false, antialias: true, powerPreference: "high-performance" }}
      >
        <Stars />
      </Canvas>
    </div>
  );
}
