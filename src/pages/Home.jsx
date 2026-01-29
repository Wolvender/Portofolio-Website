import { siteConfig } from "../siteConfig";
import ProjectCard from "../components/ProjectCard";
import projectData from "../data/projectdata.json";

export default function Home() {
  const projects = projectData.projects;
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 px-4">

        {/* Decorative gradient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-(--accent) rounded-full blur-3xl opacity-10" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-(--accent-secondary) rounded-full blur-3xl opacity-10" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto flex flex-col items-center text-center relative z-10">

          {/* Name with accent */}
          <p className="text-sm uppercase tracking-widest text-(--accent) font-semibold mb-4 opacity-80">
            {siteConfig.name}
          </p>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold text-(--text) mb-6 leading-tight">
            Creative Software Developer
            <br />
            <span className="text-(--accent)">Building Experiences</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl text-(--muted) max-w-2xl mb-12 leading-relaxed">
            {siteConfig.tagline}
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-(--text) mb-12 text-center">
            Featured Projects
          </h2>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={index === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}