import { motion } from "framer-motion";
import { ChevronDown } from "../Icons/icons";

export default function ProjectHeader({ project }) {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight - 100, behavior: "smooth" });
  };

  return (
    <div className="relative w-full h-[85vh] mb-12 overflow-hidden flex items-end">
      {/* Parallax Background Image / Video */}
      <div className="absolute inset-0 z-0">
        {project.headerVideo ? (
          <video
            src={project.headerVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : project.codeThumb ? (
          <div
            className="w-full h-full bg-gray-950"
            style={{
              backgroundImage: 'linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.06) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          >
            <pre className="w-full h-full p-12 text-emerald-400/35 text-sm md:text-base font-mono leading-relaxed overflow-hidden pointer-events-none select-none">
              {project.codeThumb}
            </pre>
          </div>
        ) : (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        )}
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/40" /> {/* General dim */}
        <div className="absolute inset-0 bg-gradient-to-t from-(--bg) via-transparent to-transparent opacity-90" /> {/* Fade to bottom */}
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-6"
          >
            <span className="text-sm font-medium text-white/90 uppercase tracking-widest">{project.tagline}</span>
          </motion.div>

          {/* Title - Apple Style Big Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            {project.title}
          </motion.h1>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            onClick={scrollDown}
            className="animate-bounce mt-8 text-white/50 hover:text-white transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}