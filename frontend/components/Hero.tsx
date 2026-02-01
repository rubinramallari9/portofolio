"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";
import StarfieldCSS from "./StarfieldCSS";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rafRef = useRef<number | null>(null);

  // Throttled mouse follower effect using RAF
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Magnetic button effect
  const buttonX = useMotionValue(0);
  const buttonY = useMotionValue(0);
  const buttonSpringX = useSpring(buttonX, { stiffness: 300, damping: 20 });
  const buttonSpringY = useSpring(buttonY, { stiffness: 300, damping: 20 });

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    buttonX.set(distanceX * 0.2);
    buttonY.set(distanceY * 0.2);
  };

  const handleButtonMouseLeave = () => {
    buttonX.set(0);
    buttonY.set(0);
  };

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 12,
        mass: 1,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* CSS Starfield Background - No JS, GPU accelerated */}
      <StarfieldCSS />

      {/* Mouse Follower Light Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(96, 165, 250, 0.25), transparent 60%)`,
        }}
      />

      {/* Ambient background effects - reduced blur for performance */}
      <div className="absolute inset-0">
        {/* Gradient mesh background - Minimalist Slate */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-60" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-slate-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-60" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-60" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-xl md:text-2xl mb-6 font-mono"
          >
            {"<"}Hi, I'm{"/>"}
          </motion.p>

          {/* Name with gradient and shimmer */}
          <motion.h1
            variants={titleVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight"
          >
            <span className="relative inline-block">
              <span className="gradient-text bg-[length:200%_auto]">
                Rubin Ramallari
              </span>
              {/* Shimmer overlay - limited repeats for performance */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%]"
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  backgroundPosition: "-200% 0",
                }}
                animate={{
                  backgroundPosition: ["200% 0", "-200% 0"],
                }}
                transition={{
                  duration: 2,
                  repeat: 2,
                  repeatDelay: 8,
                  ease: "linear",
                }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl text-text-secondary mb-8 font-medium"
          >
            Software Developer
            <span className="text-slate-400 mx-3">|</span>
            Creative Technologist
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-text-tertiary mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Crafting digital experiences from interactive
            <span className="text-blue-400 font-semibold"> web apps </span>
            to immersive
            <span className="text-blue-400 font-semibold"> 3D game worlds</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            {/* Magnetic Button */}
            <motion.button
              ref={buttonRef}
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 bg-blue-400 rounded-xl font-semibold text-black overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(96,165,250,0.5)] hover:bg-blue-300 transition-all duration-300"
              style={{
                x: buttonSpringX,
                y: buttonSpringY,
              }}
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 bg-transparent rounded-xl font-semibold text-text-primary border-2 border-slate-600 hover:border-slate-400 hover:bg-slate-900/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-2 text-text-tertiary"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <HiArrowDown className="text-2xl text-slate-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
