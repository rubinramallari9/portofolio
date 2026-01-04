"use client";

import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

interface Recognition {
  institution: string;
  title: string;
  caption: string;
  image?: string;
  link?: string;
  keyInsight?: string;
  badge: string;
}

export default function FeaturedIn() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="featured" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-center mb-6">
            <span className="gradient-text">Press & Recognition</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full mx-auto mb-16" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {recognitions.map((recognition, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative bg-[#0B0E14] border border-slate-700 rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.3 }}
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
                <p className="text-[#94A3B8] italic text-sm leading-relaxed mb-4">
                  &ldquo;{recognition.caption}&rdquo;
                </p>
                {recognition.keyInsight && (
                  <p className="text-slate-400 text-xs font-medium">
                    {recognition.keyInsight}
                  </p>
                )}
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full blur-2xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
