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
          <div className="w-24 h-1 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full mx-auto mb-16" />
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-slate-500/10 to-blue-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 space-y-6 text-lg leading-relaxed">
              <motion.p
                className="text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Hi, I'm <span className="text-slate-300 font-semibold">Rubin Ramallari</span>, a driven software developer
                with a strong foundation built through hands-on, intensive learning experiences. Through{" "}
                <span className="text-blue-400 font-semibold">3 specialized workshops</span>,{" "}
                <span className="text-blue-400 font-semibold">2 lab residencies</span>, and numerous focused courses,
                I've developed comprehensive skills across multiple technology domains.
              </motion.p>

              <motion.p
                className="text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                My expertise spans from core programming languages including{" "}
                <span className="text-blue-400 font-semibold">Python</span>,{" "}
                <span className="text-blue-400 font-semibold">C++</span>, and{" "}
                <span className="text-blue-400 font-semibold">C#</span>, to modern web development with{" "}
                <span className="text-blue-400 font-semibold">React</span> and{" "}
                <span className="text-blue-400 font-semibold">Next.js</span>. I've also gained creative technical
                skills through dedicated training in{" "}
                <span className="text-slate-300 font-semibold">Unity game development</span>,{" "}
                <span className="text-slate-300 font-semibold">3D modeling</span>, and{" "}
                <span className="text-slate-300 font-semibold">graphic design</span>.
              </motion.p>

              <motion.p
                className="text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                I'm continuously expanding my skill set—currently diving deeper into{" "}
                <span className="text-blue-400 font-semibold">Java</span> to strengthen my backend and enterprise
                development capabilities. I thrive on tackling complex challenges and transforming ideas into
                functional, elegant solutions through{" "}
                <span className="text-slate-300 font-semibold">continuous learning</span> and practical application.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
