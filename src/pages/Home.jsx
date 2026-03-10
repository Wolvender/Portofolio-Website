import { siteConfig } from "../siteConfig";
import ProjectCard from "../components/ProjectCard";
import projectData from "../data/projectdata.json";
import { motion } from "framer-motion";

export default function Home() {
  const projects = projectData.projects;

  const scrollToFeatured = () => {
    const element = document.getElementById("featured-projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 px-4 min-h-[70vh] flex items-center">

        {/* Decorative gradient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-(--accent) rounded-full blur-3xl opacity-10" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-(--accent-secondary) rounded-full blur-3xl opacity-10" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto flex flex-col items-center text-center relative z-10">

          {/* Name with accent - Clickable to scroll */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToFeatured}
            className="text-sm uppercase tracking-[0.3em] text-(--accent) font-semibold mb-6 opacity-80 cursor-pointer hover:text-(--accent-secondary) transition-colors"
          >
            // {siteConfig.name}
          </motion.button>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-7xl font-bold text-(--text) mb-8 leading-tight tracking-tighter">
            Creative Software Developer
            <br />
            <span className="text-(--accent) animate-pulse font-mono">></span> Building Experiences
          </h1>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-12 opacity-30"
          >
            <div className="w-px h-16 bg-gradient-to-b from-(--accent) to-transparent mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="featured-projects" className="py-20 px-4 scroll-mt-24">
        <div className="container mx-auto">
          {/* Featured Projects Header */}
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-bold text-(--text) tracking-tight uppercase">
              Featured_Works
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-(--accent) to-transparent opacity-30" />
          </div>

          {/* Featured Highlights Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={index === 0}
              />
            ))}
          </div>

          {/* Other Projects Section */}
          {projects.length > 3 && (
            <>
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold text-(--text) tracking-tight uppercase">
                  Archive_Nodes
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-(--accent-secondary) to-transparent opacity-30" />
              </div>

              <div className="flex flex-col gap-6">
                {projects.slice(3).map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    featured={false}
                    layout="list"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
