"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Throttled scroll handler using RAF
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-4"
          : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`glass rounded-2xl transition-all duration-300 ${
            scrolled ? "shadow-lg glow-blue" : ""
          }`}
        >
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <motion.div
                className="text-xl font-mono font-bold group/logo cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <span
                  className="text-blue-400"
                  style={{ textShadow: '0 0 10px rgba(96, 165, 250, 0.5)' }}
                >
                  &lt;
                </span>
                <span className="text-slate-400 group-hover/logo:text-white transition-colors duration-300">
                  Rubin
                </span>
                <span
                  className="text-blue-400"
                  style={{ textShadow: '0 0 10px rgba(96, 165, 250, 0.5)' }}
                >
                  {' '}/&gt;
                </span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative px-4 py-2 text-text-secondary hover:text-text-primary transition-colors group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 text-text-primary hover:text-slate-400 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                </motion.button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pt-4 border-t border-white/10"
              >
                <div className="flex flex-col space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-all"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
