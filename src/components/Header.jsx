import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "../siteConfig";
import { useState, useEffect } from "react";

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for header shrinking effect
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //Helper functie om te checken of een link actief is
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/projects");
    }
    return location.pathname.startsWith(path);
  };

  //Scroll naar boven bij navigatie
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header className={`glass-header sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'
      }`}>
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Left Navigation */}
        <div className="flex gap-8 flex-1">
          <Link
            to="/"
            onClick={scrollToTop}
            className={`nav-link transition-all duration-300 text-sm font-medium ${isActive("/")
                ? "text-(--accent)"
                : "text-(--muted) hover:text-(--text)"
              }`}
          >
            Projects
          </Link>
          <Link
            to="/about"
            onClick={scrollToTop}
            className={`nav-link transition-all duration-300 text-sm font-medium ${isActive("/about")
                ? "text-(--accent)"
                : "text-(--muted) hover:text-(--text)"
              }`}
          >
            About
          </Link>
        </div>

        {/* Center Logo/Name */}
        <Link
          to="/"
          onClick={scrollToTop}
          className="flex items-center gap-3 group"
        >
          <img
            src={siteConfig.aboutImage}
            alt={siteConfig.name}
            className={`rounded-full object-cover border-2 border-(--accent) transition-all duration-300 ${scrolled ? 'w-8 h-8' : 'w-10 h-10'
              } group-hover:scale-110 group-hover:border-(--accent-secondary)`}
          />
          <span className={`font-bold text-(--text) transition-all duration-300 ${scrolled ? 'text-base' : 'text-lg'
            } group-hover:text-(--accent)`}>
            {siteConfig.name}
          </span>
        </Link>

        {/* Right Navigation */}
        <div className="flex gap-8 flex-1 justify-end">
          <Link
            to="/contact"
            onClick={scrollToTop}
            className={`nav-link transition-all duration-300 text-sm font-medium ${isActive("/contact")
                ? "text-(--accent)"
                : "text-(--muted) hover:text-(--text)"
              }`}
          >
            Contact
          </Link>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link transition-all duration-300 text-sm font-medium text-(--muted) hover:text-(--text)"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}

