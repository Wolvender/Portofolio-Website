import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import OptimizedImage from "../OptimizedImage";

function MechanicCard({ mechanic }) {
  const [activeTab, setActiveTab] = useState("code");

  return (
    <div className="bg-(--surface) border border-(--bordercolor) rounded-xl overflow-hidden mb-12 shadow-sm hover:border-(--accent) transition-all duration-300">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-(--text) mb-3 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-(--accent) rounded-full" />
              {mechanic.subtitle}
            </h3>
            <p className="text-(--muted) leading-relaxed text-base">
              {mechanic.description}
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex bg-black/40 p-1 rounded-xl shrink-0 self-start border border-white/5">
            {["code", "preview"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2 text-sm font-bold rounded-lg transition-all duration-300 capitalize flex items-center gap-2 ${activeTab === tab
                  ? "text-white shadow-lg"
                  : "text-(--muted) hover:text-(--text)"
                  }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId={`tab-bubble-${mechanic.subtitle}`}
                    className="absolute inset-0 bg-(--accent) rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === "code" ? "Source Code" : "Preview & Result"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === "code" ? (
              <motion.div
                key="code"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl overflow-hidden border border-white/5 bg-[#0d0d0d] shadow-2xl"
              >
                <div className="flex items-center justify-between bg-[#1a1a1a] px-5 py-3 border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                    <div className="w-3 h-3 rounded-full bg-green-500/30" />
                  </div>
                  <span className="text-[10px] text-white/30 font-mono tracking-[0.2em] font-bold">RAW_LOGIC.CS</span>
                </div>
                <div className="h-[400px] md:h-[500px] overflow-auto custom-scrollbar">
                  <SyntaxHighlighter
                    language="csharp"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: "2rem",
                      borderRadius: "0",
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                      backgroundColor: "transparent",
                    }}
                    showLineNumbers={true}
                  >
                    {mechanic.code}
                  </SyntaxHighlighter>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[500px]"
              >
                {/* Code Screenshot */}
                <div className="relative rounded-xl overflow-hidden border border-(--bordercolor) bg-black/20 group/media shadow-inner flex flex-col">
                  <div className="absolute top-3 left-3 z-10 text-[10px] font-bold text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded">Visual Code</div>
                  <OptimizedImage
                    src={mechanic.image}
                    alt="Code Screenshot"
                    className="w-full h-full object-contain p-4 group-hover/media:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Result GIF / Video */}
                <div className="relative rounded-xl overflow-hidden border border-(--bordercolor) bg-black/20 group/media shadow-inner">
                  <div className="absolute top-3 left-3 z-10 text-[10px] font-bold text-(--accent) uppercase tracking-widest bg-black/40 px-2 py-1 rounded">Behavior Result</div>
                  
                  {mechanic.gif && mechanic.gif.endsWith('.mp4') ? (
                    <video
                      src={mechanic.gif}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <OptimizedImage
                      src={mechanic.gif || mechanic.image} // Fallback
                      alt="Result Preview"
                      className="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-700"
                    />
                  )}
                  
                  {!mechanic.gif && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 group-hover/media:opacity-100 transition-opacity">
                      <span className="text-white/60 text-xs text-center px-4 font-mono">Ready for .gif/.mp4 upload!<br />Point 'gif' in JSON to show action.</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function ProjectMechanics({ project }) {
  if (!project.mechanics || project.mechanics.length === 0) {
    return null;
  }

  return (
    <div className="mx-4 mt-20">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-(--text) mb-4 tracking-tight text-center">Technical Deep Dive</h2>
        <div className="h-1.5 w-32 bg-(--accent) rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
      </div>

      <div className="space-y-12 max-w-7xl mx-auto pb-12">
        {project.mechanics.map((m, i) => (
          <MechanicCard key={i} mechanic={m} />
        ))}
      </div>
    </div>
  );
}