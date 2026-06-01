import { motion } from "framer-motion";
import { siteConfig } from "../siteConfig";
import { Download, Users, Tech, Terminal, Cpu, Layers } from "../components/Icons/icons.jsx";

export default function About() {
  const paragraphs = siteConfig.aboutLong
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 border-l-4 border-(--accent) pl-6"
      >
        <h1 className="text-6xl font-bold text-(--text) tracking-tighter mb-2">
          SYSTEM.<span className="text-(--accent)">PROFILE</span>
        </h1>
        <p className="text-xl text-(--muted) font-mono uppercase tracking-widest opacity-70">
          {siteConfig.role} // SENNA_VAN_MAREN
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Bio & Story */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-8 space-y-12"
        >
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="w-6 h-6 text-(--accent)" />
              <h2 className="text-2xl font-bold uppercase tracking-tight">The_Narrative</h2>
            </div>
            <div className="space-y-6 text-lg text-(--muted) leading-relaxed font-light">
              {paragraphs.map((text, i) => (
                <motion.p key={i} variants={itemVariants}>
                  {text}
                </motion.p>
              ))}
            </div>
          </section>

          {/* Hard Skills: The Tech Stack */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Cpu className="w-6 h-6 text-(--accent)" />
              <h2 className="text-2xl font-bold uppercase tracking-tight">Tech_Stack</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {siteConfig.hardSkills.map((skill) => (
                <motion.div 
                  key={skill}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, borderColor: "var(--accent)" }}
                  className="p-4 bg-(--surface) border border-(--bordercolor) rounded-md flex flex-col gap-2 group transition-colors"
                >
                  <span className="text-xs font-mono text-(--accent) opacity-50">SKILL_MODULE</span>
                  <span className="text-lg font-bold group-hover:text-(--accent)">{skill}</span>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>

        {/* Right Column: Stats & Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-4 space-y-8"
        >
          {/* Portrait Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-b from-(--accent) to-(--accent-secondary) rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-(--bg) border border-(--bordercolor) rounded-lg p-2">
              <img
                src={siteConfig.aboutImage}
                alt={siteConfig.name}
                className="w-full grayscale hover:grayscale-0 transition-all duration-500 rounded-md"
              />
            </div>
          </div>

          {/* Soft Skills: Passive Abilities */}
          <div className="bg-(--surface) border border-(--bordercolor) p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="w-5 h-5 text-(--accent-secondary)" />
              <h3 className="font-bold uppercase tracking-wider text-sm">Passive_Abilities</h3>
            </div>
            <ul className="space-y-3">
              {siteConfig.softSkills.map((skill) => (
                <li key={skill} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--accent) shrink-0" />
                  <span className="text-sm font-mono text-(--muted) uppercase tracking-tighter">{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability */}
          {siteConfig.availability && (
            <div className="flex items-center gap-3 px-5 py-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-sm font-mono text-emerald-300">{siteConfig.availability}</span>
            </div>
          )}

          {/* Action: Download CV */}
          <a
            href={siteConfig.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-3 w-full py-4 bg-(--accent) text-(--accent-text) font-bold uppercase tracking-widest rounded-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
          >
            <Download className="w-5 h-5" />
            Initialize_Download (CV)
          </a>
        </motion.div>
      </div>
    </div>
  );
}
