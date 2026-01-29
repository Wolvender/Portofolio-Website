import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "../siteConfig";
import { useState, useEffect } from "react";
import { Menu, X } from "./Icons/icons";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

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

  const navLinks = [
    { name: "Projects", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className={`glass-header sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'
        }`}>
        <nav className="container mx-auto px-6 grid grid-cols-3 items-center relative">

          {/* Left Section: Mobile Menu Button OR Desktop Nav */}
          <div className="flex justify-start">
            <button
              className="lg:hidden text-(--text) p-1"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden lg:flex gap-8">
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
          </div>

          {/* Center Section: Logo */}
          <div className="flex justify-center">
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
              <span className={`font-bold text-(--text) transition-all duration-300 hidden lg:block ${scrolled ? 'text-base' : 'text-lg'
                } group-hover:text-(--accent)`}>
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* Right Section: Desktop Nav OR Spacer */}
          <div className="flex justify-end">
            <div className="hidden lg:flex gap-8">
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
          </div>

        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-(--bg) bg-opacity-95 backdrop-blur-xl lg:hidden flex flex-col items-center justify-center space-y-8"
          >
            <button
              className="absolute top-6 right-6 text-(--muted) hover:text-(--text)"
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
                className={`text-3xl font-bold ${isActive(link.path) ? "text-(--accent)" : "text-(--text)"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-(--muted) mt-4 font-mono"
            >
              GitHub
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
