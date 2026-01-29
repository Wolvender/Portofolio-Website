import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function MechanicCard({ mechanic }) {
  const [activeTab, setActiveTab] = useState("code");

  return (
    <div className="bg-(--surface) border border-(--bordercolor) rounded-xl overflow-hidden mb-8 shadow-sm hover:border-(--accent) transition-colors duration-300">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-(--text) mb-2">{mechanic.subtitle}</h3>
            <p className="text-(--muted) leading-relaxed text-sm md:text-base max-w-2xl">
              {mechanic.description}
            </p>
          </div>

          {/* Segmented Control - Only show if image exists */}
          {mechanic.image && (
            <div className="flex bg-black/20 p-1 rounded-lg shrink-0 self-start">
              {["code", "preview"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 capitalize ${activeTab === tab
                    ? "text-white shadow-sm"
                    : "text-(--muted) hover:text-(--text)"
                    }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId={`bubble-${mechanic.subtitle}`} // Unique layoutId per card
                      className="absolute inset-0 bg-white/10 rounded-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === "code" ? (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="rounded-lg overflow-hidden border border-(--bordercolor)"
              >
                <div className="flex items-center gap-2 bg-[#1e1e1e] px-4 py-2 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                  </div>
                  <span className="text-xs text-white/30 font-mono ml-2">source.cs</span>
                </div>
                <div className="h-[400px] overflow-auto"> {/* Fixed height scrollable */}
                  <SyntaxHighlighter
                    language="csharp"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: "1.5rem",
                      borderRadius: "0",
                      fontSize: "0.9rem",
                      height: "100%",
                      backgroundColor: "#1e1e1e", // Force matches header
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-black/20 rounded-lg overflow-hidden border border-(--bordercolor) aspect-video flex items-center justify-center relative"
              >
                <img
                  src={mechanic.image}
                  alt={mechanic.subtitle}
                  className="w-full h-full object-contain"
                  onClick={() => window.open(mechanic.image, "_blank")}
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors pointer-events-none" />
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
    <div className="mx-4">
      <h2 className="text-xl font-semibold text-(--text) mb-8">Technical Deep Dive</h2>
      <div className="space-y-4"> {/* Increased spacing */}
        {project.mechanics.map((m, i) => (
          <MechanicCard key={i} mechanic={m} />
        ))}
      </div>
    </div>
  );
}