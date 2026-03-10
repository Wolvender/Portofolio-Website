import React from "react";
import { motion } from "framer-motion";
import projectData from "../data/projectdata.json";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const { projects } = projectData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      filter: "blur(10px)",
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col mb-16"
        >
          <h1 className="text-5xl font-bold text-(--text) mb-4 font-mono tracking-tighter uppercase">
            <span className="text-(--accent)">[</span> data_logs <span className="text-(--accent)">]</span>
          </h1>
          <p className="text-xl text-(--muted) max-w-2xl font-mono opacity-80">
            A linear archive of all projects, technical prototypes, and experiments.
          </p>
          <div className="h-px w-full bg-gradient-to-r from-(--accent) to-transparent opacity-20 mt-8" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard
                project={project}
                featured={false}
                layout="list"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
