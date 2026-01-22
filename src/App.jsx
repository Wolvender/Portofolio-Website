import { Outlet, NavLink } from "react-router-dom";
import TopBar from "./components/TopBar";

export default function App() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* Top hover trigger + branding */}
      <TopBar />

      {/* content */}

      {/* Pagina content via Outlet */}
      <main className="flex-1 container mx-auto" style={{ paddingTop: 24 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="p-6" style={{ background: "var(--surface)", borderTop: "1px solid var(--bordercolor)" }}>
        <div className="container mx-auto flex items-center justify-between" style={{ gap: 12 }}>
          <div>
            <p style={{ margin: 0, color: 'var(--text)' , fontWeight: 700}}>YourName.dev</p>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 13 }}>Full-stack developer • Interactive projects</p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ marginBottom: 6 }}>
              <a href="#" style={{ color: 'var(--text-muted)', marginRight: 12 }}>GitHub</a>
              <a href="#" style={{ color: 'var(--text-muted)', marginRight: 12 }}>LinkedIn</a>
              <a href="#" style={{ color: 'var(--text-muted)' }}>Twitter</a>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>© {new Date().getFullYear()}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}