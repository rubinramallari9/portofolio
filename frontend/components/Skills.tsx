"use client";

import { motion } from "framer-motion";

export default function Skills() {
  const skillCategories = [
    {
      category: "Software Engineering",
      skills: [
        "Python",
        "C++",
        "C#",
        "JavaScript",
      ],
      icon: "💻",
      description: "3 intensive workshops, 2 lab residencies, and specialized courses",
    },
    {
      category: "Web Technologies",
      skills: [
        "HTML & CSS",
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
      ],
      icon: "🌐",
      description: "Building modern, responsive web applications",
    },
    {
      category: "Game Development & 3D",
      skills: [
        "Unity",
        "3D Modeling",
        "Graphic Design",
        "C# (Unity)",
      ],
      icon: "🎮",
      description: "3 Unity workshops, 2 3D modeling workshops, 1 graphic design workshop",
    },
    {
      category: "Currently Learning",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Java",
      ],
      icon: "🚀",
      description: "Deepening modern web development expertise",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-center mb-6">
            <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full mx-auto mb-16" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="glass glass-hover rounded-2xl p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              whileHover={{ y: -5 }}
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-500/10 to-blue-500/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{category.icon}</span>
                    <h3 className="text-2xl font-bold">
                      {category.category}
                    </h3>
                  </div>
                  <p className="text-sm text-text-tertiary italic ml-14">
                    {category.description}
                  </p>
                </div>

                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      variants={itemVariants}
                      className="px-4 py-2 rounded-lg bg-slate-800/50 text-slate-300 border border-slate-700 font-medium hover:border-blue-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all cursor-default"
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                      }}
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        y: {
                          duration: 3 + skillIndex * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut" as const,
                        },
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
