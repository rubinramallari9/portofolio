"use client";

import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0">
        {/* Gradient mesh background - Minimalist Slate */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-slate-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: "4s" }} />

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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Greeting */}
          <motion.p
            className="text-text-secondary text-xl md:text-2xl mb-6 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {"<"}Hi, I'm{"/>"}
          </motion.p>

          {/* Name with gradient */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="gradient-text bg-[length:200%_auto] animate-gradient-bg">
              Rubin Ramallari
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-2xl md:text-3xl lg:text-4xl text-text-secondary mb-8 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Teen Developer
            <span className="text-slate-400 mx-3">|</span>
            Frontend Enthusiast
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-text-tertiary mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Building awesome web applications with
            <span className="text-blue-400 font-semibold"> Next.js </span>
            and
            <span className="text-blue-400 font-semibold"> React</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 bg-blue-400 rounded-xl font-semibold text-black overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(96,165,250,0.5)] hover:bg-blue-300 transition-all duration-300"
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
            className="flex flex-col items-center gap-2 text-text-tertiary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
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
