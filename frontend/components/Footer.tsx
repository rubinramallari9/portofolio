"use client";

import { motion } from "framer-motion";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { HiArrowUp } from "react-icons/hi";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/rubinramallari9", label: "GitHub" },
    { icon: FaInstagram, href: "https://www.instagram.com/ramallarirubin/", label: "Instagram" },
  ];

  return (
    <footer className="relative mt-32 pb-8">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo/Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-mono font-bold mb-2">
              <span
                className="text-blue-400"
                style={{ textShadow: '0 0 10px rgba(96, 165, 250, 0.5)' }}
              >
                &lt;
              </span>
              <span className="text-slate-400">
                Rubin
              </span>
              <span
                className="text-blue-400"
                style={{ textShadow: '0 0 10px rgba(96, 165, 250, 0.5)' }}
              >
                {' '}/&gt;
              </span>
            </h3>
            <p className="text-text-tertiary text-sm">
              &copy; 2026 Rubin Ramallari. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass glass-hover group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="text-xl text-text-secondary group-hover:text-blue-400 transition-colors" />
              </motion.a>
            ))}
          </div>

          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            className="p-3 rounded-full glass glass-hover group"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <HiArrowUp className="text-xl text-text-secondary group-hover:text-purple-400 transition-colors" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
