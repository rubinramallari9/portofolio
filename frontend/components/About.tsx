"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-center mb-6">
            <span className="gradient-text">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-16" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass glass-hover rounded-3xl p-8 md:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 space-y-6 text-lg leading-relaxed">
              <motion.p
                className="text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                I'm a <span className="text-blue-400 font-semibold">passionate teen developer</span> with a love for creating web
                applications that solve real-world problems. My journey in programming
                started with curiosity, and it has grown into a passion for
                web development.
              </motion.p>

              <motion.p
                className="text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                I specialize in building modern web applications using{" "}
                <span className="text-purple-400 font-semibold">Next.js & React</span> for creating beautiful,
                responsive user interfaces with <span className="text-blue-400 font-semibold">TypeScript</span> and{" "}
                <span className="text-purple-400 font-semibold">Tailwind CSS</span>.
              </motion.p>

              <motion.p
                className="text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing what I've learned
                with the developer community. I believe in{" "}
                <span className="text-blue-400 font-semibold">continuous learning</span> and love tackling new
                challenges.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
