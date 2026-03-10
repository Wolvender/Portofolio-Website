import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "../siteConfig";
import { useState, useEffect } from "react";
import { Menu, X } from "./Icons/icons";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll position for header effect
  useEffect(() => {
    const handleScroll = () => {
      // Use a slightly larger threshold and check if it's already scrolled to avoid flickering
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/projects");
    }
    return location.pathname.startsWith(path);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Projects", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header 
        className={`glass-header sticky top-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled 
            ? 'h-16 bg-(--bg)/90 border-b border-(--accent)/30' 
            : 'h-24 bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="container mx-auto px-6 h-full grid grid-cols-3 items-center relative">

          {/* Left Section */}
          <div className="flex justify-start">
            <button
              className="lg:hidden text-(--text) p-1 hover:text-(--accent) transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden lg:flex gap-8">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={scrollToTop}
                  className={`nav-link transition-all duration-300 text-sm font-medium ${
                    isActive(link.path) ? "text-(--accent)" : "text-(--muted) hover:text-(--text)"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Center Section: Logo */}
          <div className="flex justify-center">
            <Link
              to="/"
              onClick={scrollToTop}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className={`absolute -inset-1 bg-(--accent) rounded-full blur opacity-0 group-hover:opacity-40 transition duration-500`} />
                <img
                  src={siteConfig.aboutImage}
                  alt={siteConfig.name}
                  className={`relative rounded-full object-cover border-2 border-(--accent) transition-all duration-500 ${
                    scrolled ? 'w-8 h-8' : 'w-12 h-12'
                  } group-hover:border-(--accent-secondary)`}
                />
              </div>
              <span className={`font-bold text-(--text) transition-all duration-500 hidden lg:block ${
                scrolled ? 'text-base opacity-80' : 'text-xl opacity-100'
              } group-hover:text-(--accent) font-mono`}>
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex justify-end">
            <div className="hidden lg:flex gap-8 items-center">
              <Link
                to="/contact"
                onClick={scrollToTop}
                className={`nav-link transition-all duration-300 text-sm font-medium ${
                  isActive("/contact") ? "text-(--accent)" : "text-(--muted) hover:text-(--text)"
                }`}
              >
                Contact
              </Link>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-(--surface) border border-(--bordercolor) rounded-md text-(--muted) hover:text-(--accent) hover:border-(--accent) transition-all"
                title="GitHub Source"
              >
                <GitHub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-(--bg) bg-opacity-98 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center space-y-10"
          >
            <button
              className="absolute top-6 left-6 text-(--muted) hover:text-(--accent) p-2 border border-(--bordercolor) rounded-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => {
                  scrollToTop();
                  setMobileMenuOpen(false);
                }}
                className={`text-4xl font-bold tracking-tighter ${
                  isActive(link.path) ? "text-(--accent)" : "text-(--text)"
                } hover:scale-110 transition-transform`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex gap-6 mt-8">
              <a href={siteConfig.socials.github} target="_blank" className="text-(--muted) hover:text-(--accent)"><GitHub className="w-8 h-8" /></a>
              <a href={siteConfig.socials.linkedin} target="_blank" className="text-(--muted) hover:text-(--accent)"><LinkedIn className="w-8 h-8" /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Ensure GitHub/LinkedIn are imported if used
import { GitHub, LinkedIn } from "./Icons/icons";
