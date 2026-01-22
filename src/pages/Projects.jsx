import React from "react";

export default function Projects() {
  return (
    <section>
      <h1 style={{ marginBottom: "1rem" }}>Projects</h1>

      <p style={{ color: "var(--text-muted)" }}>
        Browse showcased projects below. Click a project link to jump to its showcase section.
      </p>

      <div className="project-links" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <a key={i} href={`#project-${i + 1}`} className="top-box" style={{ minWidth: 140 }}>
            Project {i + 1}
          </a>
        ))}
      </div>

      <div style={{ marginTop: 28 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <article id={`project-${i + 1}`} key={i} style={{ padding: 20, marginBottom: 20, background: 'linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005))', borderRadius: 12, border: '1px solid rgba(255,255,255,0.03)' }}>
            <h2>Project {i + 1} — Showcase</h2>
            <p style={{ color: 'var(--text-muted)' }}>Detailed description, images, links and highlights for project {i + 1}.</p>
            <div style={{ height: 160, background: 'rgba(0,0,0,0.2)', borderRadius: 8, marginTop: 12 }} />
          </article>
        ))}
      </div>
    </section>
  );
}
