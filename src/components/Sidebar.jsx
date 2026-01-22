import React, { useState, useEffect } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  // close sidebar on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="left-trigger">
      {/* click toggle button (visible) */}
      <button
        className="sidebar-toggle"
        aria-expanded={open}
        aria-controls="site-sidebar"
        onClick={() => setOpen((s) => !s)}
        title="Toggle sidebar"
      >
        ☰
      </button>

      <div id="site-sidebar" className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <h4>Projects</h4>
          <button className="sidebar-close" onClick={() => setOpen(false)} aria-label="Close sidebar">✕</button>
        </div>

        <nav className="sidebar-list projects sidebar-list-cards">
          {Array.from({ length: 6 }).map((_, i) => (
            <a key={i} href="#" className={`project-card ${i === 5 ? "dark" : ""} small`}>
              <h3>Project {i + 1}</h3>
              <p>Short description of project {i + 1}.</p>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

