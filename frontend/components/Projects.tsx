"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

type Category = "All" | "Web Development" | "Game Development" | "3D & Graphic Design" | "Robotics" | "AI";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const categories: Category[] = [
    "All",
    "Web Development",
    "AI",
    "Game Development",
    "3D & Graphic Design",
    "Robotics",
  ];

  const projects = [
    {
      title: "Portfolio Website",
      description:
        "A modern portfolio website built with Next.js featuring a contact form, project showcase, and modern glassmorphism design.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "#",
      demo: "#",
      featured: true,
      category: "Web Development" as Category,
    },
    {
      title: "Project Two",
      description:
        "Add your second project here. Describe what it does and what technologies you used to build it.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      github: "#",
      demo: "#",
      category: "Web Development" as Category,
    },
    {
      title: "Project Three",
      description:
        "Add your third project here. Showcase your skills and what makes this project unique and interesting.",
      technologies: ["Next.js", "React", "JavaScript"],
      github: "#",
      demo: "#",
      category: "Game Development" as Category,
    },
    {
      title: "Graphic Design Workshop",
      description:
        "Creative graphic design projects completed during TUMO workshop, showcasing visual design principles, typography, and digital illustration skills.",
      technologies: ["Photoshop", "Illustrator", "Design Principles"],
      github: "#",
      demo: "https://filealtumoworld.blob.core.windows.net/60a7b0bacce446000b570d4d/cd7073f1-9823-43b7-af99-52f0c2220cc0",
      category: "3D & Graphic Design" as Category,
    },
    {
      title: "3D Workshop 1",
      description:
        "First 3D modeling workshop project exploring fundamental 3D modeling techniques, texturing, and rendering in a professional 3D environment.",
      technologies: ["Blender", "3D Modeling", "Texturing"],
      github: "#",
      demo: "https://portfolio.al.tumo.world/p/qy2p486xv3we1dz81yg8e7nrgl1j5moz/project/61a10fdc44ed9206970e5005",
      category: "3D & Graphic Design" as Category,
    },
    {
      title: "3D Workshop 2",
      description:
        "Advanced 3D modeling workshop project demonstrating improved skills in complex modeling, lighting, and material creation.",
      technologies: ["Blender", "3D Modeling", "Lighting", "Materials"],
      github: "#",
      demo: "https://portfolio.al.tumo.world/p/qy2p486xv3we1dz81yg8e7nrgl1j5moz/project/61a10bb544ed9206887fecd0",
      category: "3D & Graphic Design" as Category,
    },
    {
      title: "Coin Watcher",
      description:
        "Real-time Bitcoin price tracker combining Python and Arduino. Fetches live BTC prices and displays them on a 16x2 LCD screen connected to Arduino microcontroller.",
      technologies: ["Python", "Arduino", "C++", "IoT"],
      github: "https://github.com/rubinramallari9/CoinWatcher",
      demo: "https://github.com/rubinramallari9/CoinWatcher",
      category: "Robotics" as Category,
    },
    {
      title: "Robotics Workshop 2",
      description:
        "Advanced robotics workshop project from TUMO, exploring robotics principles, hardware integration, and automation systems.",
      technologies: ["Robotics", "Arduino", "Electronics"],
      github: "#",
      demo: "https://portfolio.al.tumo.world/p/qy2p486xv3we1dz81yg8e7nrgl1j5moz/project/61a119b044ed9206c4632db6",
      category: "Robotics" as Category,
    },
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-center mb-6">
            <span className="gradient-text">My Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full mx-auto mb-12" />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-blue-400 hover:text-blue-400"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-2xl glass glass-hover ${
                project.featured ? "md:col-span-2" : ""
              }`}
              whileHover={{ y: -5 }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-500/0 to-blue-500/0 group-hover:from-slate-500/5 group-hover:to-blue-500/10 transition-all duration-500" />

              {/* Content */}
              <div className="relative z-10 p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="px-3 py-1 text-xs font-semibold bg-blue-400 rounded-full text-black">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-text-secondary mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="px-3 py-1 text-sm rounded-lg bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-blue-400 hover:text-blue-400 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.github !== "#" && (
                    <motion.a
                      href={project.github}
                      className="flex items-center gap-2 text-text-secondary hover:text-blue-400 transition-colors group/link"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub className="text-xl" />
                      <span className="font-semibold">Code</span>
                    </motion.a>
                  )}
                  <motion.a
                    href={project.demo}
                    className="flex items-center gap-2 text-text-secondary hover:text-blue-400 transition-colors group/link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HiExternalLink className="text-xl" />
                    <span className="font-semibold">Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
