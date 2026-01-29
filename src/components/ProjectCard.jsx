import { Link } from "react-router-dom";
import { useState, useRef } from "react";

export default function ProjectCard({ project, featured = false }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    setMousePosition({ x, y, rotateX, rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  return (
    <Link
      ref={cardRef}
      to={`/projects/${project.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`card-3d group block bg-(--surface) rounded-xl overflow-hidden border border-(--bordercolor) hover:border-(--accent) transition-all duration-300 ${featured ? 'md:col-span-2 md:row-span-2' : ''
        }`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${mousePosition.rotateX}deg) rotateY(${mousePosition.rotateY}deg) translateY(-8px) scale(1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        boxShadow: isHovered
          ? '0 20px 60px rgba(16, 185, 129, 0.3), 0 0 40px rgba(6, 182, 212, 0.2)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Shimmer Effect */}
      <div className="shimmer-effect" />

      {/* Glow Trail */}
      {isHovered && (
        <div
          className="glow-trail"
          style={{
            left: `${mousePosition.x - 100}px`,
            top: `${mousePosition.y - 100}px`,
          }}
        />
      )}

      {/* Thumbnail with parallax */}
      <div className={`relative overflow-hidden ${featured ? 'aspect-[16/10]' : 'aspect-video'}`}>
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered
              ? `scale(1.1) translateX(${mousePosition.rotateY * -2}px) translateY(${mousePosition.rotateX * 2}px)`
              : 'scale(1)',
          }}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-(--overlay) opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-(--text) font-semibold text-lg">View Project →</span>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${featured ? 'md:p-8' : ''}`}>
        <h3 className={`font-bold text-(--text) mb-2 group-hover:text-(--accent) transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}>
          {project.title}
        </h3>
        <p className={`text-(--muted) ${featured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}>
          {project.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.slice(0, featured ? 5 : 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-300 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}