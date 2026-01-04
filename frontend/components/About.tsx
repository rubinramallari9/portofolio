"use client";

import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

interface Recognition {
  institution: string;
  title: string;
  caption: string;
  image?: string;
  link?: string;
  badge: string;
}

export default function About() {
  const recognitions: Recognition[] = [
    {
      institution: "STEAM+ & Barleti University",
      badge: "Barleti University",
      title: "🏅Sukses në Konkursin Kombëtar STEAM+ 2025!",
      caption:
        "Jemi krenarë për nxënësit tanë që u shpërblyen si fitues në konkursin  kombëtar për talentet e reja, organizuar nga STEAM+ Albania dhe Universiteti Barleti!\n\n🏆 Tenderly – një platformë inovative për menaxhimin e tenderave me AI, zhvilluar nga Rubin Ramallari, Aron Gjoka, Rexhino Durro dhe Andrin Gjana.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ESF9FADxJhGkBpIb3LiHvBZdU8hPIZK2sw&s",
      link: "https://www.instagram.com/p/DKZJBxZtSSs/?img_index=3",
    },
    {
      institution: "TUMO Tirana",
      badge: "TUMO",
      title: "Student Spotlight: Progresi në Programim & Game Dev",
      caption:
        "Rubini është një nga studentët tanë më krijues. Prej më se një viti, ai na ka treguar se është mjaft i talentuar dhe ambicioz në Programim, Robotikë dhe Game Development.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfQVjhHyRCFn2g7n9hcJrGZ6497ZK_tF6tPw&s",
      link: "https://www.instagram.com/p/CenpxqntPTu/",
    },
  ];

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

        {/* Press & Recognition Section */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-4xl md:text-5xl font-black text-center mb-4">
            <span className="gradient-text">Press & Recognition</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {recognitions.map((recognition, index) => (
              <motion.div
                key={index}
                className="group relative bg-[#0B0E14] border border-slate-700 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                {/* Institution Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs font-semibold text-blue-400">
                    {recognition.badge}
                  </span>
                </div>

                {/* External Link Icon */}
                {recognition.link && (
                  <a
                    href={recognition.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 z-10 p-2 bg-slate-800/50 rounded-full border border-slate-700 hover:border-blue-400 hover:bg-blue-500/10 transition-all group/link"
                  >
                    <FiExternalLink className="text-slate-400 group-hover/link:text-blue-400 transition-colors" />
                  </a>
                )}

                {/* Image if available */}
                {recognition.image && (
                  <div className="w-full h-48 overflow-hidden bg-slate-900">
                    <img
                      src={recognition.image}
                      alt={recognition.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#60A5FA] mb-3">
                    {recognition.title}
                  </h3>
                  <p className="text-[#94A3B8] italic text-sm leading-relaxed whitespace-pre-line">
                    &ldquo;{recognition.caption}&rdquo;
                  </p>
                </div>

                {/* Decorative gradient overlay */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full blur-2xl" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
