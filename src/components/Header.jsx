import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "../siteConfig";

export default function Header() {
  const location = useLocation();

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
    <header className="sticky top-0 z-50 bg-(--surface) border-b border-(--bordercolor)">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Projects link on LEFT */}
        <Link
          to="/"
          onClick={scrollToTop}
          className={`transition-colors text-sm ${
            isActive("/") 
              ? "text-(--accent) font-semibold" 
              : "text-(--muted) hover:text-(--text)"
          }`}
        >
          Projects
        </Link>

        {/* About and Contact on RIGHT */}
        <div className="flex gap-6">
          <Link
            to="/about"
            onClick={scrollToTop}
            className={`transition-colors text-sm ${
              isActive("/about") 
                ? "text-(--accent) font-semibold" 
                : "text-(--muted) hover:text-(--text)"
            }`}
          >
            Over Mij
          </Link>

          <Link
            to="/contact"
            onClick={scrollToTop}
            className={`transition-colors text-sm ${
              isActive("/contact") 
                ? "text-(--accent) font-semibold" 
                : "text-(--muted) hover:text-(--text)"
            }`}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}

